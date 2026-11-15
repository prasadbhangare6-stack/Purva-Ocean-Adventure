import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getLiveSiteContentStore } from "@/lib/data/siteStore";
import { AboutManager } from "@/components/admin/AboutManager";

export const metadata: Metadata = { title: "About Page Management", robots: { index: false, follow: false } };

export default async function AboutAdminPage() {
  await requirePermission("about", "read");
  const store = await getLiveSiteContentStore();

  return <AboutManager initialAbout={store.about} />;
}
