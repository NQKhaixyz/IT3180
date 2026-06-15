import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requirePermission } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiError } from "@/lib/errors";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const deny = requirePermission(auth.user!, "RESIDENT", "WRITE");
  if (deny) return deny;

  const { id } = await ctx.params;
  const eventId = Number(id);
  if (!Number.isFinite(eventId)) return apiError("VALIDATION_ERROR", "Invalid event id", 400);

  const body = (await req.json()) as {
    eventType?: "TEMP_RESIDENCE" | "TEMP_ABSENCE" | "MOVE_IN" | "MOVE_OUT";
    fromDate?: string;
    toDate?: string;
    note?: string;
  };

  const fromDate = body.fromDate ? new Date(body.fromDate) : undefined;
  const toDate = body.toDate ? new Date(body.toDate) : undefined;

  if (fromDate && Number.isNaN(fromDate.getTime())) {
    return apiError("VALIDATION_ERROR", "Invalid from date", 400, { field: "fromDate" });
  }
  if (toDate && Number.isNaN(toDate.getTime())) {
    return apiError("VALIDATION_ERROR", "Invalid to date", 400, { field: "toDate" });
  }

  const row = await db.residencyEvent.update({
    where: { id: eventId },
    data: {
      eventType: body.eventType,
      fromDate,
      toDate,
      note: body.note,
    },
  });
  return NextResponse.json(row);
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const deny = requirePermission(auth.user!, "RESIDENT", "WRITE");
  if (deny) return deny;

  const { id } = await ctx.params;
  const eventId = Number(id);
  if (!Number.isFinite(eventId)) return apiError("VALIDATION_ERROR", "Invalid event id", 400);

  await db.residencyEvent.delete({ where: { id: eventId } });
  return NextResponse.json({ ok: true });
}
