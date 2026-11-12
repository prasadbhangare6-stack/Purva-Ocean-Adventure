import { NextResponse } from "next/server";
import { resetPasswordWithToken } from "@/lib/auth/userStore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, newPassword } = body as { token?: string; newPassword?: string };

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Reset token and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const success = resetPasswordWithToken(token, newPassword);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired reset code. Please request a new one." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully! You can now sign in with your new password.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ success: false, message: "Error resetting password." }, { status: 500 });
  }
}

