import "server-only";
import { redirect } from "next/navigation";
import { getAdminSession, type AdminSession } from "./session";
import { can } from "./permissions";
import type { Action, Resource } from "./roles";

export class ForbiddenError extends Error {
  constructor(resource: Resource, action: Action) {
    super(`Forbidden: ${action} on ${resource}`);
    this.name = "ForbiddenError";
  }
}

/** Requires a signed-in admin. Redirects to sign-in otherwise. */
export async function requireSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/sign-in");
  return session;
}

/**
 * Requires a signed-in admin whose role allows `action` on `resource`.
 * Use in every protected server component, route handler and server action.
 * Throws ForbiddenError for server actions; redirects for pages.
 */
export async function requirePermission(
  resource: Resource,
  action: Action,
  { mode = "redirect" }: { mode?: "redirect" | "throw" } = {},
): Promise<AdminSession> {
  const session = await requireSession();
  if (!can(session.role, resource, action)) {
    if (mode === "throw") throw new ForbiddenError(resource, action);
    redirect("/admin?forbidden=1");
  }
  return session;
}
