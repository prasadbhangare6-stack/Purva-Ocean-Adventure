import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTripBySlug, getSiteSettings } from "@/lib/sanity/data";
import { getCuratedTrip, CURATED_TRIPS } from "@/lib/data/curatedTrips";
import { getSiteContentStore, getLiveSiteContentStore } from "@/lib/data/siteStore";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppUrl } from "@/lib/integrations/whatsapp";
import { TripDetailShowcase } from "@/components/trips/TripDetailShowcase";
import { MaafushiTripShowcase } from "@/components/trips/MaafushiTripShowcase";

type Params = { slug: string };

export async function generateStaticParams() {
  const store = getSiteContentStore();
  const dynamicSlugs = store.trips.map((t) => ({ slug: t.slug }));
  const curatedSlugs = Object.keys(CURATED_TRIPS).map((slug) => ({ slug }));
  return [...dynamicSlugs, ...curatedSlugs];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const store = await getLiveSiteContentStore();
  const curated = store.trips.find((t) => t.slug === slug) || getCuratedTrip(slug);
  if (curated) {
    return {
      title: `${curated.name} | Purva Ocean Adventures`,
      description: curated.summary,
    };
  }

  const trip = await getTripBySlug(slug).catch(() => null);
  if (!trip) return { title: "Trip Not Found | Purva Ocean Adventures" };

  return {
    title: trip.seo?.title ?? `${trip.name} | Purva Ocean Adventures`,
    description: trip.seo?.description ?? trip.summary,
  };
}

export default async function TripDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const store = await getLiveSiteContentStore();
  const curated = store.trips.find((t) => t.slug === slug) || getCuratedTrip(slug);
  const settings = await getSiteSettings().catch(() => null);

  // If this is one of our curated upcoming expeditions:
  if (curated) {
    const whatsappMsg = encodeURIComponent(
      `Hello Purva Ocean Adventures! I am interested in booking / receiving the detailed brochure for the "${curated.name}" expedition (${curated.dates}).`,
    );
    const whatsappLink =
      buildWhatsAppUrl(settings?.whatsappNumber, { kind: "trip", tripName: curated.name }) ||
      `https://wa.me/916262323232?text=${whatsappMsg}`;

    const EDITORIAL_SLUGS = new Set([
      "maafushi-madness-maldives",
      "lakshadweep-love",
      "maldives-dive-expedition",
    ]);

    if (EDITORIAL_SLUGS.has(curated.slug) || curated.slug.includes("maafushi")) {
      return <MaafushiTripShowcase trip={curated} whatsappLink={whatsappLink} />;
    }

    return <TripDetailShowcase trip={curated} whatsappLink={whatsappLink} />;
  }

  // Fallback to Sanity CMS rendering if trip was created in Sanity
  const trip = await getTripBySlug(slug).catch(() => null);
  if (!trip) notFound();

  return (
    <div className="min-h-screen bg-[#010f20] text-white py-24">
      <Container>
        <h1 className="font-serif text-4xl font-bold">{trip.name}</h1>
        <p className="mt-4 text-sky-200">{trip.summary}</p>
      </Container>
    </div>
  );
}
