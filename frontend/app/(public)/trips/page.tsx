import type { Metadata } from "next";
import { UpcomingTripsShowcase, type UpcomingTripItem } from "@/components/trips/UpcomingTripsShowcase";
import { getSiteContentStore } from "@/lib/data/siteStore";

export const metadata: Metadata = {
  title: "Upcoming Trips | Purva Ocean Adventures",
  description:
    "Explore upcoming dive trips by Purva Ocean Adventures: Maafushi Madness Maldives, Lakshadweep Love, and Maldives Liveaboard expeditions.",
};

export default function TripsPage() {
  const store = getSiteContentStore();
  const initialTrips: UpcomingTripItem[] = store.trips.map((t) => ({
    id: t.slug,
    name: t.name,
    destination: t.destination,
    dates: t.dates,
    meta: `${t.duration} | ${t.dives}`,
    description: t.summary || t.overview,
    image: t.coverImage,
    tag: t.available ? "Upcoming Trip" : "Waitlist Only",
    highlights: t.highlights || [],
    slug: t.slug,
    available: t.available,
    priceEstimate: t.pricing?.displayText || "Available on request",
  }));

  return <UpcomingTripsShowcase initialTrips={initialTrips} />;
}
