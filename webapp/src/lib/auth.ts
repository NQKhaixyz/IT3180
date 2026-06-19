import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError } from "@/lib/errors";

export type AuthUser = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  address: string;
  role: "ADMIN" | "ACCOUNTANT" | "TEAM_LEADER";
  roleCodes: string[];
  permissionCodes: string[];
  status: "ACTIVE" | "BLOCKED";
  createdAt?: Date;
};

const SESSION_COOKIE = "bm_session";
const mockAuthEnabled = process.env.ALLOW_MOCK_AUTH === "true" || process.env.NODE_ENV !== "production";

const mockUsers: Array<AuthUser & { password: string }> = [
  {
    id: 1,
    username: "admin",
    fullName: "Admin",
    email: "admin@bluemoon.vn",
    phone: "0912.000.001",
    avatarUrl: "",
    address: "",
    role: "ADMIN",
    roleCodes: ["ADMIN"],
    permissionCodes: [
      "SYSTEM_READ",
      "SYSTEM_WRITE",
      "SYSTEM_ADMIN",
      "FEE_READ",
      "FEE_WRITE",
      "FEE_ADMIN",
      "RESIDENT_READ",
      "RESIDENT_WRITE",
      "RESIDENT_ADMIN",
      "REPORT_READ",
      "REPORT_WRITE",
      "REPORT_ADMIN",
    ],
    status: "ACTIVE",
    createdAt: new Date("2026-01-02T00:00:00.000Z"),
    password: "admin",
  },
  {
    id: 2,
    username: "accountant",
    fullName: "Accountant",
    email: "ketoan@bluemoon.vn",
    phone: "0912.000.002",
    avatarUrl: "",
    address: "",
    role: "ACCOUNTANT",
    roleCodes: ["ACCOUNTANT"],
    permissionCodes: ["FEE_READ", "FEE_WRITE", "REPORT_READ"],
    status: "ACTIVE",
    createdAt: new Date("2026-01-02T00:00:00.000Z"),
    password: "accountant",
  },
  {
    id: 3,
    username: "leader",
    fullName: "Team Leader",
    email: "totruong@bluemoon.vn",
    phone: "0912.000.003",
    avatarUrl: "",
    address: "",
    role: "TEAM_LEADER",
    roleCodes: ["TEAM_LEADER"],
    permissionCodes: ["RESIDENT_READ", "RESIDENT_WRITE", "REPORT_READ"],
    status: "ACTIVE",
    createdAt: new Date("2026-01-02T00:00:00.000Z"),
    password: "leader",
  },
];

function findMockUserByToken(token: string): AuthUser | null {
  if (!token.startsWith("mock:")) return null;
  const username = token.slice(5).split(":")[0] ?? "";
  const user = mockUsers.find((u) => u.username === username);
  if (!user) return null;
  return {
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
  };
}

export function findMockUserByCredentials(id: string, password: string): AuthUser | null {
  if (!mockAuthEnabled) return null;
  const user = mockUsers.find(
    (u) => (u.username === id || u.email === id) && u.password === password,
  );
  if (!user) return null;
  return {
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
  };
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const mockUser = findMockUserByToken(token);
  if (mockUser) return mockUser;

  const now = new Date();
  let session;
  try {
    session = await db.session.findUnique({
      where: { token },
      include: {
        user: {
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
        },
      },
    });
  } catch {
    return null;
  }

  if (!session) return null;
  if (session.revokedAt) return null;
  if (session.expiresAt <= now) return null;
  if (session.user.status !== "ACTIVE") return null;

  const roleCodes = session.user.userRoles.map((x) => x.role.code);
  const permissionCodes = Array.from(
    new Set(
      session.user.userRoles.flatMap((x) => x.role.permissions.map((rp) => rp.permission.code)),
    ),
  );

  return {
    id: session.user.id,
    username: session.user.username,
    fullName: session.user.fullName,
    email: session.user.email,
    phone: session.user.phone,
    avatarUrl: session.user.avatarUrl,
    address: session.user.address,
    role: session.user.role,
    roleCodes,
    permissionCodes,
    status: session.user.status,
    createdAt: session.user.createdAt,
  };
}

export async function requireAuth(): Promise<{ user: AuthUser | null; error?: NextResponse }> {
  const user = await getAuthUser();
  if (!user) {
    return {
      user: null,
      error: apiError("AUTH_REQUIRED", "Authentication required", 401),
    };
  }
  return { user };
}

export function requireRole(user: AuthUser, allowed: Array<"ADMIN" | "ACCOUNTANT" | "TEAM_LEADER">): NextResponse | null {
  if (!allowed.includes(user.role)) {
    return apiError("PERMISSION_DENIED", "Permission denied", 403);
  }
  return null;
}

export function requirePermission(user: AuthUser, module: "SYSTEM" | "FEE" | "RESIDENT" | "REPORT", action: "READ" | "WRITE" | "ADMIN"): NextResponse | null {
  if (user.roleCodes.includes("ADMIN")) return null;
  const direct = `${module}_${action}`;
  const broad = `${module}_ADMIN`;
  const hasPermission = user.permissionCodes.includes(direct) || user.permissionCodes.includes(broad);
  if (!hasPermission) {
    return apiError("PERMISSION_DENIED", "Permission denied", 403);
  }
  return null;
}

export function sessionCookieName(): string {
  return SESSION_COOKIE;
}
