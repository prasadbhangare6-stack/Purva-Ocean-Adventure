import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { ActivityLogManager } from "@/components/admin/ActivityLogManager";

export const metadata: Metadata = { title: "Activity Log", robots: { index: false, follow: false } };

export default async function ActivityAdminPage() {
  await requirePermission("activity", "read");
  return <ActivityLogManager />;
}
