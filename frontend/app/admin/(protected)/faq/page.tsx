import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getLiveSiteContentStore } from "@/lib/data/siteStore";
import { FaqManager } from "@/components/admin/FaqManager";

export const metadata: Metadata = { title: "FAQ Management", robots: { index: false, follow: false } };

export default async function FaqAdminPage() {
  await requirePermission("faq", "read");
  const store = await getLiveSiteContentStore();

  return <FaqManager initialFaqs={store.faqs} />;
}
