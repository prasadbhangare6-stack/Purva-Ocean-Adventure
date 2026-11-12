import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getSiteContentStore } from "@/lib/data/siteStore";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const metadata: Metadata = { title: "Website Settings", robots: { index: false, follow: false } };

export default async function SettingsAdminPage() {
  await requirePermission("settings", "read");
  const store = getSiteContentStore();

  return <SettingsManager initialSettings={store.settings} />;
}
