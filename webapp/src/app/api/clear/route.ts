import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.auditLog.deleteMany();
    await db.session.deleteMany();
    await db.rolePermission.deleteMany();
    await db.userRole.deleteMany();
    await db.permission.deleteMany();
    await db.appRole.deleteMany();
    await db.payment.deleteMany();
    await db.obligation.deleteMany();
    await db.residencyEvent.deleteMany();
    await db.resident.deleteMany();
    await db.feePeriod.deleteMany();
    await db.feeType.deleteMany();
    await db.communicationLog.deleteMany();
    await db.household.deleteMany();
    await db.user.deleteMany();
    return NextResponse.json({ ok: true, message: "All data cleared" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Clear failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
