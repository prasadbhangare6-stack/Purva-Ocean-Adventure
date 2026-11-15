import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getLiveSiteContentStore } from "@/lib/data/siteStore";
import { TripsManager } from "@/components/admin/TripsManager";

export const metadata: Metadata = { title: "Trips Management", robots: { index: false, follow: false } };

export default async function TripsAdminPage() {
  await requirePermission("trips", "read");
  const store = await getLiveSiteContentStore();

  return <TripsManager initialTrips={store.trips} />;
}
