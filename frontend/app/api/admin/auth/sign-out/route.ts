import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);

    return NextResponse.json({ success: true, message: "Signed out successfully." });
  } catch (err) {
    console.error("Sign-out error:", err);
    return NextResponse.json({ success: false, message: "Error signing out." }, { status: 500 });
  }
}

