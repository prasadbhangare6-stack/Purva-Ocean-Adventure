import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getSiteContentStore } from "@/lib/data/siteStore";
import { InstagramManager } from "@/components/admin/InstagramManager";

export const metadata: Metadata = { title: "Instagram Management", robots: { index: false, follow: false } };

export default async function InstagramAdminPage() {
  await requirePermission("instagram", "read");
  const store = getSiteContentStore();

  return <InstagramManager initialInstagram={store.instagram} />;
}
