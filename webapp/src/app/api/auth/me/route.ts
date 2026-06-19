import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { apiError } from "@/lib/errors";
import { db } from "@/lib/db";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return apiError("AUTH_REQUIRED", "Authentication required", 401);

  if (user.username === "admin" || user.username === "accountant" || user.username === "leader") {
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        address: user.address,
        role: user.role,
        roleCodes: user.roleCodes,
        permissionCodes: user.permissionCodes,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  }

  const profile = await db.user.findUnique({
    where: { id: user.id },
    select: { avatarUrl: true, address: true, email: true, phone: true, createdAt: true },
  });

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: profile?.email ?? "",
      phone: profile?.phone ?? "",
      avatarUrl: profile?.avatarUrl ?? user.avatarUrl,
      address: profile?.address ?? user.address,
      role: user.role,
      roleCodes: user.roleCodes,
      permissionCodes: user.permissionCodes,
      status: user.status,
      createdAt: profile?.createdAt,
    },
  });
}
