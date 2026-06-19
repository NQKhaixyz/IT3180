import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findMockUserByCredentials, sessionCookieName } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { verifyPassword } from "@/lib/password";
import { apiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { usernameOrEmail: string; password: string };
  const id = (body.usernameOrEmail ?? "").trim();
  const pwd = body.password ?? "";

  if (!id || !pwd) return apiError("VALIDATION_ERROR", "Missing credentials", 400);

  const mockUser = findMockUserByCredentials(id, pwd);
  if (mockUser) {
    const token = `mock:${mockUser.username}:${randomBytes(8).toString("hex")}`;
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12);
    const response = NextResponse.json({
      ok: true,
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        phone: mockUser.phone,
        fullName: mockUser.fullName,
        avatarUrl: mockUser.avatarUrl,
        address: mockUser.address,
        role: mockUser.role,
        roleCodes: mockUser.roleCodes,
        permissionCodes: mockUser.permissionCodes,
        status: mockUser.status,
        createdAt: mockUser.createdAt,
      },
    });
    response.cookies.set(sessionCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });
    return response;
  }

  let user;
  try {
    user = await db.user.findFirst({
      where: {
        OR: [{ username: id }, { email: id }],
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch {
    return apiError("AUTH_BACKEND_UNAVAILABLE", "Authentication backend unavailable", 503);
  }

  if (!user) {
    return apiError("AUTH_INVALID_CREDENTIALS", "Invalid credentials", 401);
  }

  const ok = verifyPassword(pwd, user.passwordHash);
  if (!ok) {
    const nextFailed = user.failedLoginCount + 1;
    const shouldLock = nextFailed >= 5;
    try {
      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginCount: shouldLock ? 0 : nextFailed,
          lockedUntil: shouldLock ? new Date(Date.now() + 1000 * 60 * 10) : null,
        },
      });
      await writeAudit({
        actorUserId: user.id,
        action: shouldLock ? "LOCK" : "UPDATE",
        entity: "USER",
        entityId: String(user.id),
        detail: shouldLock ? "Locked account due to failed logins" : "Failed login attempt",
      });
    } catch {}
    return apiError("AUTH_INVALID_CREDENTIALS", "Invalid credentials", 401);
  }

  if (user.status !== "ACTIVE") {
    return apiError("AUTH_INVALID_CREDENTIALS", "Invalid credentials", 401);
  }

  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12);

  try {
    await db.user.update({ where: { id: user.id }, data: { failedLoginCount: 0, lockedUntil: null } });
    await db.session.create({ data: { userId: user.id, token, expiresAt } });
    await writeAudit({
      actorUserId: user.id,
      action: "LOGIN",
      entity: "USER",
      entityId: String(user.id),
      detail: `User ${user.username} logged in`,
    });
  } catch {
    return apiError("AUTH_BACKEND_UNAVAILABLE", "Authentication backend unavailable", 503);
  }

  const roleCodes = user.userRoles.map((x) => x.role.code);
  const permissionCodes = Array.from(
    new Set(
      user.userRoles.flatMap((x) => x.role.permissions.map((rp) => rp.permission.code)),
    ),
  );

  const response = NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      address: user.address,
      role: user.role,
      roleCodes,
      permissionCodes,
      status: user.status,
      createdAt: user.createdAt,
    },
  });
  response.cookies.set(sessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
  return response;
}
