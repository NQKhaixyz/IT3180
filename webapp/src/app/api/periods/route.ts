import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, requirePermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { apiError } from "@/lib/errors";
import { parsePagination } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const deny = requirePermission(auth.user!, "FEE", "READ");
  if (deny) return deny;
  const { skip, take } = parsePagination(req.nextUrl.searchParams);
  const rows = await db.feePeriod.findMany({ orderBy: { id: "asc" }, skip, take });
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const deny = requirePermission(auth.user!, "FEE", "WRITE");
  if (deny) return deny;

  const body = (await req.json()) as { feeTypeId: number; month: number; year: number };
  if (!Number.isFinite(body.feeTypeId) || !Number.isFinite(body.month) || !Number.isFinite(body.year)) {
    return apiError("VALIDATION_ERROR", "Invalid period payload", 400);
  }
  const existed = await db.feePeriod.findFirst({ where: { feeTypeId: body.feeTypeId, month: body.month, year: body.year } });
  if (existed) {
    return apiError("DUPLICATE_DATA", "Fee period already exists", 409, { field: "monthYear" });
  }
  const feeType = await db.feeType.findUnique({ where: { id: body.feeTypeId } });
  if (!feeType) {
    return apiError("NOT_FOUND", "Fee type not found", 404, { field: "feeTypeId" });
  }

  const households = await db.household.findMany({
    select: { id: true, areaM2: true },
  });

  const { period, obligationsCreated } = await db.$transaction(async (tx) => {
    const createdPeriod = await tx.feePeriod.create({
      data: { feeTypeId: body.feeTypeId, month: body.month, year: body.year, status: "OPEN" },
    });

    if (households.length === 0) {
      return { period: createdPeriod, obligationsCreated: 0 };
    }

    const obligationRows = households.map((h) => ({
      periodId: createdPeriod.id,
      householdId: h.id,
      amountDue: feeType.calcMethod === "PER_M2" ? h.areaM2 * feeType.rate : feeType.rate,
      amountPaid: 0,
    }));

    const created = await tx.obligation.createMany({ data: obligationRows });
    return { period: createdPeriod, obligationsCreated: created.count };
  });

  await writeAudit({
    actorUserId: auth.user!.id,
    action: "CREATE",
    entity: "FEE_PERIOD",
    entityId: String(period.id),
    detail: `Created period ${period.month}/${period.year} with ${obligationsCreated} obligations`,
  });

  return NextResponse.json(period);
}
