/**
 * Roles and resources. Pure data — safe to import on server and client.
 * The enforcement lives in ./permissions.ts and is applied on the SERVER
 * (server components, route handlers and server actions). Hiding a menu item
 * is a UX convenience only.
 */

export const ROLES = ["owner", "admin", "editor", "enquiry_manager", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
  enquiry_manager: "Enquiry Manager",
  viewer: "Viewer",
};

export const RESOURCES = [
  "trips",
  "courses",
  "gallery",
  "instagram",
  "about",
  "faq",
  "enquiries",
  "media",
  "users",
  "settings",
  "activity",
  "policies",
] as const;
export type Resource = (typeof RESOURCES)[number];

export const ACTIONS = ["read", "create", "update", "publish", "delete", "assign_roles"] as const;
export type Action = (typeof ACTIONS)[number];
