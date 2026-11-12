import "server-only";
import { cookies } from "next/headers";
import { serverEnv } from "@/lib/env";
import type { Role } from "./roles";
import { verifySessionToken } from "./tokens";

export const SESSION_COOKIE_NAME = "purva_admin_session";

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
  role: Role;
  /** True when the session comes from the local design-preview switch. */
  isDevPreview: boolean;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      const payload = verifySessionToken(token);
      if (payload) {
        return {
          userId: payload.userId,
          email: payload.email,
          name: payload.name,
          role: payload.role,
          isDevPreview: false,
        };
      }
    }
  } catch (err) {
    console.error("Error reading session cookie:", err);
  }

  // Fallback for local design preview in development
  if (process.env.NODE_ENV !== "production" && serverEnv.ADMIN_DEV_PREVIEW_ROLE) {
    return {
      userId: "usr-drpurva",
      email: "purvaoceanadventures@gmail.com",
      name: "Dr. Purva",
      role: "owner",
      isDevPreview: true,
    };
  }

  return null;
}

export function isAuthProviderConfigured(): boolean {
  // Email + Password provider is now active
  return true;
}
