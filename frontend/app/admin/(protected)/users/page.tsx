import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { UsersManager } from "@/components/admin/UsersManager";

export const metadata: Metadata = { title: "User & Permission Management", robots: { index: false, follow: false } };

export default async function UsersAdminPage() {
  await requirePermission("users", "read");
  return <UsersManager />;
}
