import "server-only";
import type { Action, Resource } from "@/lib/auth/roles";

/**
 * Activity tracking foundation.
 *
 * Every privileged mutation should call recordActivity() AFTER the permission
 * check. STATUS: the sink is not yet configured — events are written to the
 * server console in development only. A persistent sink (a Sanity `activityLog`
 * document, or a database table) is planned once the auth provider is approved.
 */

export type ActivityEvent = {
  actorId: string;
  actorEmail: string;
  action: Action;
  resource: Resource;
  targetId?: string;
  summary: string;
  at?: string;
};

export async function recordActivity(event: ActivityEvent): Promise<void> {
  const entry = { ...event, at: event.at ?? new Date().toISOString() };

  if (process.env.NODE_ENV !== "production") {
    console.info("[activity]", entry);
  }

  // TODO(activity): persist `entry` to the approved sink. Never store secrets or
  // full visitor message bodies in the activity log.
}
