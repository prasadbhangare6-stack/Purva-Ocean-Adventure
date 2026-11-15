import type { Metadata } from "next";
import { UpcomingTripsShowcase, type UpcomingTripItem } from "@/components/trips/UpcomingTripsShowcase";
import { getLiveSiteContentStore } from "@/lib/data/siteStore";

export const metadata: Metadata = {
  title: "Upcoming Trips | Purva Ocean Adventures",
  description:
    "Explore upcoming dive trips by Purva Ocean Adventures: Maafushi Madness Maldives, Lakshadweep Love, and Maldives Liveaboard expeditions.",
};

export default async function TripsPage() {
  const store = await getLiveSiteContentStore();
  const initialTrips: UpcomingTripItem[] = store.trips.map((t) => {
    const spots = typeof t.remainingSpots === "number" ? t.remainingSpots : undefined;
    return {
      id: t.slug,
      name: t.name,
      destination: t.destination,
      dates: t.dates,
      meta: `${t.duration} | ${t.dives}`,
      description: t.summary || t.overview,
      image: t.coverImage,
      tag: spots !== undefined
        ? (spots > 0 ? `${spots} spots left` : "Waitlist Only")
        : (t.available ? "Upcoming Trip" : "Waitlist Only"),
      highlights: t.highlights || [],
      slug: t.slug,
      available: t.available,
      priceEstimate: t.pricing?.displayText || "Available on request",
      remainingSpots: spots,
    };
  });

  return <UpcomingTripsShowcase initialTrips={initialTrips} />;
}
