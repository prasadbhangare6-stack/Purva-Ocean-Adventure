import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyUserCredentials } from "@/lib/auth/userStore";
import { createSessionToken } from "@/lib/auth/tokens";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const user = verifyUserCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: "Sign-in successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during sign in." },
      { status: 500 }
    );
  }
}

