import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { seedAll } from "@/lib/seed-data";

export async function GET() {
  try {
    await seedAll(db);
    return NextResponse.json({ ok: true, message: "Database seeded successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
