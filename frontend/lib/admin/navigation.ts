import type { Resource } from "@/lib/auth/roles";

/**
 * Admin navigation data. Pure data, importable from server and client code.
 * Icons are attached in the sidebar component (client), keyed by `key`.
 * Order follows the brief. Visibility here is cosmetic; pages enforce access.
 */
export type AdminNavKey =
  | "overview"
  | "trips"
  | "courses"
  | "gallery"
  | "instagram"
  | "about"
  | "faq"
  | "enquiries"
  | "media"
  | "users"
  | "settings"
  | "policies"
  | "activity";

export type AdminNavItem = {
  key: AdminNavKey;
  label: string;
  href: string;
  /** Permission resource that gates this item. Overview requires only a session. */
  resource: Resource | "overview";
};

export const ADMIN_NAV: AdminNavItem[] = [
  { key: "overview", label: "Overview", href: "/admin", resource: "overview" },
  { key: "trips", label: "Trips Management", href: "/admin/trips", resource: "trips" },
  { key: "courses", label: "Courses Management", href: "/admin/courses", resource: "courses" },
  { key: "gallery", label: "Gallery Management", href: "/admin/gallery", resource: "gallery" },
  { key: "instagram", label: "Instagram Management", href: "/admin/instagram", resource: "instagram" },
  { key: "about", label: "About Page Management", href: "/admin/about", resource: "about" },
  { key: "faq", label: "FAQ Management", href: "/admin/faq", resource: "faq" },
  { key: "enquiries", label: "Contact Enquiries", href: "/admin/enquiries", resource: "enquiries" },
  { key: "media", label: "Media Library", href: "/admin/media", resource: "media" },
  { key: "users", label: "User Management", href: "/admin/users", resource: "users" },
  { key: "settings", label: "Website Settings", href: "/admin/settings", resource: "settings" },
  { key: "policies", label: "Legal & Policies Management", href: "/admin/policies", resource: "policies" },
  { key: "activity", label: "Activity Log", href: "/admin/activity", resource: "activity" },
];
