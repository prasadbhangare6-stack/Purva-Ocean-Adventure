import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware:
 *  1. Security headers on every response.
 *  2. Optimistic redirect for /admin routes without a session cookie.
 *
 * NOTE: This is a convenience check only. The cookie's presence is NOT proof of
 * authentication. Every protected page and route handler re-verifies the session
 * on the server (see lib/auth/guards.ts). Do not rely on middleware alone.
 */

const SESSION_COOKIE = "purva_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/sign-in")) {
    const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE));
    const devPreview = process.env.NODE_ENV !== "production" && Boolean(process.env.ADMIN_DEV_PREVIEW_ROLE);
    if (!hasSessionCookie && !devPreview) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/sign-in";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (pathname.startsWith("/admin")) {
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|media/).*)"],
};
