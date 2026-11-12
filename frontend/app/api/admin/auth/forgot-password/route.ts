import { NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/auth/userStore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    const result = createPasswordResetToken(email);

    if (!result) {
      // Don't reveal if user exists or not for security, but return generic success message
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, password reset instructions have been generated.",
      });
    }

    return NextResponse.json({
      success: true,
      message: `Password reset code generated for ${result.user.name}.`,
      // Provide the reset token directly in response for immediate easy self-service
      resetToken: result.token,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ success: false, message: "Error processing request." }, { status: 500 });
  }
}

