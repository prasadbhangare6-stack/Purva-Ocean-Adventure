import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getSiteContentStore } from "@/lib/data/siteStore";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const metadata: Metadata = { title: "Gallery Management", robots: { index: false, follow: false } };

export default async function GalleryAdminPage() {
  await requirePermission("gallery", "read");
  const store = getSiteContentStore();

  return <GalleryManager initialItems={store.gallery} />;
}
