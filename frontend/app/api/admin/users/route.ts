import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/guards";
import { getStoredUsers, saveStoredUsers, generateSalt, hashPassword, type StoredUser } from "@/lib/auth/userStore";
import type { Role } from "@/lib/auth/roles";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requirePermission("users", "read", { mode: "throw" });
    const users = getStoredUsers().map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
    }));

    return NextResponse.json({ success: true, users });
  } catch (err) {
    const isForbidden = err instanceof Error && err.name === "ForbiddenError";
    return NextResponse.json(
      { success: false, message: isForbidden ? "Forbidden: Insufficient permissions." : "Unauthorized." },
      { status: isForbidden ? 403 : 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requirePermission("users", "assign_roles", { mode: "throw" });

    const body = await request.json();
    const { action, userId, name, email, role, defaultPassword } = body as {
      action: "add" | "update_role" | "delete";
      userId?: string;
      name?: string;
      email?: string;
      role?: Role;
      defaultPassword?: string;
    };

    const users = getStoredUsers();

    if (action === "update_role" && userId && role) {
      const user = users.find((u) => u.id === userId);
      if (!user) {
        return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
      }
      user.role = role;
      saveStoredUsers(users);
      return NextResponse.json({ success: true, message: `Updated role for ${user.name} to ${role}.` });
    }

    if (action === "add" && name && email && role) {
      const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (existing) {
        return NextResponse.json(
          { success: false, message: "A user with this email address already exists." },
          { status: 400 }
        );
      }

      const salt = generateSalt();
      const initialPassword = defaultPassword || "PurvaOcean@2025";
      const newUser: StoredUser = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        status: "active",
        salt,
        passwordHash: hashPassword(initialPassword, salt),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveStoredUsers(users);

      return NextResponse.json({
        success: true,
        message: `User ${name} added successfully with temporary password: ${initialPassword}`,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
        },
      });
    }

    if (action === "delete" && userId) {
      // Prevent deleting the owner
      const targetUser = users.find((u) => u.id === userId);
      if (targetUser?.role === "owner") {
        return NextResponse.json(
          { success: false, message: "Cannot delete the account owner." },
          { status: 400 }
        );
      }

      const filtered = users.filter((u) => u.id !== userId);
      saveStoredUsers(filtered);
      return NextResponse.json({ success: true, message: "User removed successfully." });
    }

    return NextResponse.json({ success: false, message: "Invalid action or parameters." }, { status: 400 });
  } catch (err) {
    const isForbidden = err instanceof Error && err.name === "ForbiddenError";
    return NextResponse.json(
      { success: false, message: isForbidden ? "Forbidden: Cannot manage users." : "Server error." },
      { status: isForbidden ? 403 : 500 }
    );
  }
}

