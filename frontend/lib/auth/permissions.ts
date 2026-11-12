import { ACTIONS, RESOURCES, type Action, type Resource, type Role } from "./roles";

/**
 * Permission matrix — the single source of truth for what each role may do.
 *
 * Changing access = changing this file (reviewed in code). Any new resource
 * must be added to RESOURCES and given an explicit entry for every role.
 */

type Matrix = Record<Role, Partial<Record<Resource, readonly Action[]>>>;

const CONTENT_RESOURCES = ["trips", "courses", "gallery", "instagram", "about", "faq", "policies"] as const;

const ALL: readonly Action[] = ACTIONS;
const CRUD_NO_DELETE: readonly Action[] = ["read", "create", "update"];
const READ: readonly Action[] = ["read"];

function grant(resources: readonly Resource[], actions: readonly Action[]) {
  return Object.fromEntries(resources.map((r) => [r, actions])) as Partial<Record<Resource, readonly Action[]>>;
}

export const PERMISSION_MATRIX: Matrix = {
  // Complete access, including user management and role assignment.
  owner: grant(RESOURCES, ALL),

  // Manage authorised website content, media and enquiries; no user management.
  admin: {
    ...grant(CONTENT_RESOURCES, ALL),
    media: ALL,
    enquiries: ["read", "update", "delete"],
    settings: ["read", "update"],
    activity: READ,
  },

  // Add and edit content. Cannot publish, delete, or manage permissions.
  editor: {
    ...grant(CONTENT_RESOURCES, CRUD_NO_DELETE),
    media: CRUD_NO_DELETE,
  },

  // Manage contact enquiries only.
  enquiry_manager: {
    enquiries: ["read", "update"],
  },

  // Read-only visibility of public-facing content and media.
  viewer: {
    ...grant(CONTENT_RESOURCES, READ),
    media: READ,
  },
};

export function can(role: Role, resource: Resource, action: Action): boolean {
  return PERMISSION_MATRIX[role]?.[resource]?.includes(action) ?? false;
}

export function allowedResources(role: Role): Resource[] {
  return RESOURCES.filter((resource) => can(role, resource, "read"));
}
