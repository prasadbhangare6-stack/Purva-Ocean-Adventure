import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { updateUserPassword, verifyUserCredentials } from "@/lib/auth/userStore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body as {
      currentPassword?: string;
      newPassword?: string;
    };

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Current and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Verify current password unless it's dev preview
    if (!session.isDevPreview) {
      const verified = verifyUserCredentials(session.email, currentPassword);
      if (!verified) {
        return NextResponse.json(
          { success: false, message: "Incorrect current password." },
          { status: 400 }
        );
      }
    }

    const updated = updateUserPassword(session.userId, newPassword);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "User account not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { success: false, message: "Error changing password." },
      { status: 500 }
    );
  }
}

