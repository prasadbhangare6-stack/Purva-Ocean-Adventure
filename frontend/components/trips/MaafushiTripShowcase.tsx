"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Compass,
  MapPin,
  Moon,
  Palmtree,
  Ship,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { PUBLIC_ROUTES } from "@/lib/config/site";
import type { CuratedTrip } from "@/lib/data/curatedTrips";

type GlanceIconKey =
  | "dive"
  | "stay"
  | "learn"
  | "explore"
  | "permits"
  | "sail"
  | "pelagics"
  | "calendar";

type JourneyIconKey = "ow" | "aow" | "fun";
type SpeciesIconKey = "sharks" | "rays" | "turtles" | "octopus" | "reefs";

type TripEditorialConfig = {
  breadcrumbLabel: string;
  eyebrow: string;
  titleLine1: string;
  titleItalic: string;
  heroDescription: string;
  heroImage: string;
  heroAlt: string;
  heroObjectPosition: string;
  whatsappBrochureText: string;
  facts: {
    top: string;
    bottom: string;
    icon: "calendar" | "moon" | "pin" | "users";
  }[];
  glanceDescription: string;
  glanceItems: {
    icon: GlanceIconKey;
    title: string;
    subtitle: string;
  }[];
  journeyBannerImage: string;
  journeyBannerAlt: string;
  journeyBannerPos: string;
  journeyItems: {
    icon: JourneyIconKey;
    title: string;
    description: string;
  }[];
  includedItems: string[];
  notIncludedItems: string[];
  featurePhoto: string;
  featurePhotoAlt: string;
  marineBannerImage: string;
  marineBannerAlt: string;
  marineSpecies: {
    icon: SpeciesIconKey;
    label: string;
  }[];
};

function DiveMaskIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M5 7C5 5 7 4 10 4H26C29 4 31 5 31 7V13C31 16 28.5 18 25 18H22.5C20.5 18 19.8 15 18 15C16.2 15 15.5 18 13.5 18H11C7.5 18 5 16 5 13V7Z" />
      <circle cx="12" cy="11" r="3.2" />
      <circle cx="24" cy="11" r="3.2" />
    </svg>
  );
}

function CoralIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 27V12" />
      <path d="M16 18C12 16 9 13 9 8" />
      <path d="M9 11C7 10 6 8 6 6" />
      <path d="M16 14C20 12 23 9 23 5" />
      <path d="M21 10C24 10 26 8 26 6" />
      <path d="M16 22C13 21 10 20 8 17" />
      <path d="M16 21C19 20 22 19 24 16" />
      <path d="M11 27H21" />
    </svg>
  );
}

function TwinTanksIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="8" y="9" width="6.5" height="17" rx="3" />
      <rect x="17.5" y="9" width="6.5" height="17" rx="3" />
      <path d="M11.2 9V5.5M20.8 9V5.5M9.5 5.5H22.5" />
    </svg>
  );
}

function ReefSharkIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 42 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 14C11 9 20 8 30 11L37 6L35 12L38 17L30 14C22 16 14 16 6 14Z" />
      <path d="M17 9L20 3L23 9" />
      <path d="M15 15L13 19L19 15" />
    </svg>
  );
}

function MantaRayIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 42 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 9C11 10 15 8 21 12C27 8 31 10 38 9C33 13 28 16 21 15C14 16 9 13 4 9Z" />
      <path d="M21 15V22" />
      <path d="M18 10L16 7M24 10L26 7" />
    </svg>
  );
}

function SeaTurtleIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <ellipse cx="17" cy="14" rx="8" ry="6" />
      <path d="M25 13C28 11 31 12 31 14C31 16 28 17 25 15" />
      <path d="M19 8C21 4 24 4 25 7" />
      <path d="M19 20C21 24 24 24 25 21" />
      <path d="M11 10C8 8 6 9 7 12" />
      <path d="M11 18C8 20 6 19 7 16" />
      <path d="M14 11L17 14L14 17M20 11L17 14L20 17" />
    </svg>
  );
}

function OctopusIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10 14C10 8.5 13 5 16 5C19 5 22 8.5 22 14C22 16 20.5 18 16 18C11.5 18 10 16 10 14Z" />
      <path d="M12 17C10 21 7 21 6 24" />
      <path d="M14 18C13 22 11 24 11 27" />
      <path d="M18 18C19 22 21 24 21 27" />
      <path d="M20 17C22 21 25 21 26 24" />
      <circle cx="14" cy="12" r="0.8" fill="currentColor" />
      <circle cx="18" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

const TRIP_EDITORIAL_CONFIGS: Record<string, TripEditorialConfig> = {
  "maafushi-madness-maldives": {
    breadcrumbLabel: "Maafushi, Maldives",
    eyebrow: "GROUP DIVE TRIP",
    titleLine1: "Maafushi,",
    titleItalic: "Maldives",
    heroDescription:
      "A 5-night ocean escape to dive, learn, explore and experience island life in the Maldives.",
    heroImage: "/media/maafushi-hero-turtle.jpg",
    heroAlt: "Green sea turtle gliding above colorful Maldivian coral reef under sunlight rays",
    heroObjectPosition: "object-[72%_42%]",
    whatsappBrochureText:
      "Hello Purva Ocean Adventures! Please send me the brochure with pricing details for the Maafushi, Maldives trip (22–27 Nov 2026).",
    facts: [
      { icon: "calendar", top: "22 – 27", bottom: "Nov 2026" },
      { icon: "moon", top: "5 Nights", bottom: "/ 6 Days" },
      { icon: "pin", top: "Maafushi,", bottom: "Maldives" },
      { icon: "users", top: "Only", bottom: "10 Spots" },
    ],
    glanceDescription:
      "A curated dive trip to Maafushi, Maldives, combining world-class diving, PADI certification options and the charm of island life.",
    glanceItems: [
      { icon: "dive", title: "Dive", subtitle: "in clear blue waters" },
      { icon: "stay", title: "Stay", subtitle: "on a tropical island" },
      { icon: "learn", title: "Learn / Advance", subtitle: "with PADI courses" },
      { icon: "explore", title: "Explore", subtitle: "vibrant reefs & marine life" },
    ],
    journeyBannerImage: "/media/maafushi-manta-banner.jpg",
    journeyBannerAlt: "Giant oceanic manta ray gliding through ocean sunbeams over coral reef",
    journeyBannerPos: "object-[22%_45%]",
    journeyItems: [
      {
        icon: "ow",
        title: "Open Water Diver",
        description: "Start your scuba journey and get PADI certified.",
      },
      {
        icon: "aow",
        title: "Advanced Open Water",
        description: "Build new skills, go deeper and explore more.",
      },
      {
        icon: "fun",
        title: "Fun Diver",
        description: "Already certified? Join for an unforgettable dive vacation.",
      },
    ],
    includedItems: [
      "PADI course & dive training (as per package)",
      "Diving equipment (BCD, regulator, mask, fins, wetsuit)",
      "Tanks & weights",
      "5-night accommodation (Twin Sharing)",
      "Daily breakfast",
      "Private speedboat transfers (Malé ↔ Maafushi)",
      "Experienced, certified dive team",
    ],
    notIncludedItems: [
      "Flights to/from Malé",
      "Lunches & dinners",
      "Dive computer rental",
      "Nitrox (optional)",
      "Dive insurance (mandatory)",
      "Personal expenses",
    ],
    featurePhoto: "/media/maafushi-maldives.jpg",
    featurePhotoAlt:
      "Aerial view of Maafushi Island white sandy beach, palm trees, turquoise lagoon, and dive boat",
    marineBannerImage: "/media/maafushi-clownfish.jpg",
    marineBannerAlt: "Vibrant orange clownfish nestled inside sea anemone tentacles",
    marineSpecies: [
      { icon: "sharks", label: "Reef & White-tip Sharks" },
      { icon: "rays", label: "Manta & Eagle Rays" },
      { icon: "turtles", label: "Turtles" },
      { icon: "octopus", label: "Octopus" },
      { icon: "reefs", label: "Vibrant Coral Reefs" },
    ],
  },

  "lakshadweep-love": {
    breadcrumbLabel: "Lakshadweep, India",
    eyebrow: "GROUP DIVE TRIP",
    titleLine1: "Lakshadweep,",
    titleItalic: "Love",
    heroDescription:
      "A 5-night boutique island expedition to dive untouched table coral gardens, sunlit swim-throughs and sea turtle lagoons in India.",
    heroImage: "/media/lakshadweep-love.jpg",
    heroAlt: "Green sea turtle soaring gracefully over thriving coral reef gardens in Lakshadweep",
    heroObjectPosition: "object-[65%_42%]",
    whatsappBrochureText:
      "Hello Purva Ocean Adventures! Please send me the brochure with pricing details for the Lakshadweep Love dive expedition (26–31 Jan 2027).",
    facts: [
      { icon: "calendar", top: "26 – 31", bottom: "Jan 2027" },
      { icon: "moon", top: "5 Nights", bottom: "/ 6 Days" },
      { icon: "pin", top: "Lakshadweep,", bottom: "India" },
      { icon: "users", top: "Only", bottom: "8 Spots" },
    ],
    glanceDescription:
      "A curated ocean journey across India's best-kept marine sanctuary — combining 35m+ visibility reefs, turtle sanctuaries, and permit logistics handled door-to-door.",
    glanceItems: [
      { icon: "dive", title: "Dive", subtitle: "in 35m+ crystal visibility" },
      { icon: "stay", title: "Stay", subtitle: "in beachfront atoll cottages" },
      { icon: "explore", title: "Explore", subtitle: "caverns & outer barrier reefs" },
      { icon: "permits", title: "Permits", subtitle: "100% handled for guests" },
    ],
    journeyBannerImage: "/media/lakshadweep-cavern.jpg",
    journeyBannerAlt: "Scuba diver descending into a deep crystal-blue reef cavern swim-through",
    journeyBannerPos: "object-[46%_45%]",
    journeyItems: [
      {
        icon: "ow",
        title: "Open Water Diver",
        description: "Experience your first ocean breaths in calm lagoons.",
      },
      {
        icon: "aow",
        title: "Advanced Open Water",
        description: "Master outer drop-offs, cavern walls & deeper reefs.",
      },
      {
        icon: "fun",
        title: "Fun Diver",
        description: "Enjoy 12 guided boat & lagoon dives across pristine reefs.",
      },
    ],
    includedItems: [
      "5-night beachfront cottage stay in Lakshadweep",
      "12 guided boat & lagoon dives with PADI pros",
      "Restricted Lakshadweep entry permits & police clearance",
      "All daily coastal meals & boat refreshments",
      "Tanks, weights & surface marker buoys",
      "Inter-island boat charters & transfers",
      "Complimentary lagoon kayaking & paddleboarding",
    ],
    notIncludedItems: [
      "Flights to/from Agatti (Kochi ↔ Agatti)",
      "Personal scuba gear rental (BCD, regulator, fins)",
      "Dive insurance (mandatory)",
      "Personal expenses & souvenirs",
      "Extra specialty equipment",
    ],
    featurePhoto: "/media/lakshadweep-atoll.jpg",
    featurePhotoAlt:
      "Aerial turquoise coral shelf dropping into deep indigo ocean along an untouched island beach",
    marineBannerImage: "/media/P3.jpg",
    marineBannerAlt: "Scuba diver surrounded by schooling reef fish beside dramatic coral overhangs",
    marineSpecies: [
      { icon: "sharks", label: "Blacktip Reef Sharks" },
      { icon: "rays", label: "Mobula & Sting Rays" },
      { icon: "turtles", label: "Green & Hawksbill Turtles" },
      { icon: "octopus", label: "Octopus & Moray Eels" },
      { icon: "reefs", label: "Table Coral Gardens" },
    ],
  },

  "maldives-dive-expedition": {
    breadcrumbLabel: "Central Atolls, Maldives",
    eyebrow: "LIVEABOARD EXPEDITION",
    titleLine1: "Maldives,",
    titleItalic: "Expedition",
    heroDescription:
      "A 6-night luxury safari yacht voyage across Ari, Vaavu & Malé atolls — planned for February 2027 with official departure dates releasing soon.",
    heroImage: "/media/maldives-liveaboard.jpg",
    heroAlt:
      "Giant oceanic manta ray gliding above a Maldivian coral cleaning station beside scuba divers",
    heroObjectPosition: "object-[58%_40%]",
    whatsappBrochureText:
      "Hello Purva Ocean Adventures! Please send me the February 2027 Maldives Dive Expedition brochure with pricing & priority date updates.",
    facts: [
      { icon: "calendar", top: "Feb 2027", bottom: "Dates TBA" },
      { icon: "moon", top: "6 Nights", bottom: "/ 7 Days" },
      { icon: "pin", top: "Central Atolls,", bottom: "Maldives" },
      { icon: "users", top: "Exclusive", bottom: "Liveaboard" },
    ],
    glanceDescription:
      "Our signature pelagic expedition living aboard a dedicated dive yacht — navigating Ari, Vaavu & Malé channels as February 2027 dates finalize.",
    glanceItems: [
      { icon: "dive", title: "15+ Dives", subtitle: "channels, thilas & night dive" },
      { icon: "sail", title: "Liveaboard", subtitle: "luxury safari yacht cabins" },
      { icon: "pelagics", title: "Pelagic Giants", subtitle: "whale sharks & manta stations" },
      { icon: "calendar", title: "Feb 2027", subtitle: "dates announcing soon" },
    ],
    journeyBannerImage: "/media/maldives-whale-shark.jpg",
    journeyBannerAlt: "Spotted whale shark gliding smoothly beneath shimmering ocean surface",
    journeyBannerPos: "object-[38%_45%]",
    journeyItems: [
      {
        icon: "aow",
        title: "Advanced Open Water",
        description: "Recommended certification for deep channels & currents.",
      },
      {
        icon: "ow",
        title: "Specialty & Nitrox",
        description: "Upgrade with Deep, Drift, Enriched Air & Night skills.",
      },
      {
        icon: "fun",
        title: "Seasoned Fun Diver",
        description: "Wake up on the open sea and dive legendary thilas daily.",
      },
    ],
    includedItems: [
      "6 nights aboard a luxury Maldivian safari yacht",
      "15+ guided ocean dives including Alimatha night dive",
      "Full board gourmet meals, snacks, tea & coffee",
      "Private Malé airport dhoni transfers",
      "12L aluminum tanks, weights & dedicated dive dhoni",
      "Maldivian green tax & bed taxes",
      "Experienced PADI expedition leaders onboard",
    ],
    notIncludedItems: [
      "International flights to Malé (MLE)",
      "Full scuba equipment rental",
      "Nitrox fills (optional add-on)",
      "Dive insurance (mandatory)",
      "Alcoholic & specialty beverages",
      "Boat crew gratuities",
    ],
    featurePhoto: "/media/maldives-atoll-channel.jpg",
    featurePhotoAlt:
      "Aerial turquoise coral channel and white sandbar boat drop-off in Maldivian waters",
    marineBannerImage: "/media/course-coral-banner.jpg",
    marineBannerAlt: "Vibrant orange reef anthias schooling above healthy tropical coral reefs",
    marineSpecies: [
      { icon: "sharks", label: "Whale & Nurse Sharks" },
      { icon: "rays", label: "Manta & Eagle Rays" },
      { icon: "turtles", label: "Hawksbill Turtles" },
      { icon: "octopus", label: "Channel Reef Sharks" },
      { icon: "reefs", label: "Soft Coral Thilas" },
    ],
  },
};

function FactIcon({ type }: { type: TripEditorialConfig["facts"][number]["icon"] }) {
  const cls = "h-5 w-5 shrink-0 text-[#7CC0DF] stroke-[1.6]";
  switch (type) {
    case "calendar":
      return <Calendar className={cls} />;
    case "moon":
      return <Moon className={cls} />;
    case "pin":
      return <MapPin className={cls} />;
    case "users":
      return <Users className={cls} />;
  }
}

function GlanceIcon({ type }: { type: GlanceIconKey }) {
  switch (type) {
    case "dive":
      return <DiveMaskIcon className="h-7 w-7" />;
    case "stay":
      return <Palmtree className="h-7 w-7 stroke-[1.4]" />;
    case "learn":
      return <Users className="h-7 w-7 stroke-[1.4]" />;
    case "explore":
      return <CoralIcon className="h-7 w-7" />;
    case "permits":
      return <Compass className="h-7 w-7 stroke-[1.4]" />;
    case "sail":
      return <Ship className="h-7 w-7 stroke-[1.4]" />;
    case "pelagics":
      return <Sparkles className="h-7 w-7 stroke-[1.4]" />;
    case "calendar":
      return <Calendar className="h-7 w-7 stroke-[1.4]" />;
  }
}

function JourneyIcon({ type }: { type: JourneyIconKey }) {
  switch (type) {
    case "ow":
      return <DiveMaskIcon className="h-7 w-7" />;
    case "aow":
      return <TwinTanksIcon className="h-7 w-7" />;
    case "fun":
      return <ReefSharkIcon className="h-7 w-9" />;
  }
}

function MarineSpeciesIcon({ type }: { type: SpeciesIconKey }) {
  switch (type) {
    case "sharks":
      return <ReefSharkIcon className="h-7 w-9" />;
    case "rays":
      return <MantaRayIcon className="h-7 w-9" />;
    case "turtles":
      return <SeaTurtleIcon className="h-7 w-8" />;
    case "octopus":
      return <OctopusIcon className="h-7 w-7" />;
    case "reefs":
      return <CoralIcon className="h-7 w-7" />;
  }
}

export function MaafushiTripShowcase({
  trip,
  whatsappLink,
}: {
  trip: CuratedTrip;
  whatsappLink: string;
}) {
  const cfg =
    TRIP_EDITORIAL_CONFIGS[trip.slug] ?? TRIP_EDITORIAL_CONFIGS["maafushi-madness-maldives"];

  const brochureText = encodeURIComponent(cfg.whatsappBrochureText);
  const brochureWhatsAppUrl = whatsappLink.includes("text=")
    ? whatsappLink.replace(/text=[^&]*/, `text=${brochureText}`)
    : `https://wa.me/916262323232?text=${brochureText}`;

  return (
    <div className="min-h-screen bg-white text-[#0B233B]">
      {/* 1. Ocean Hero Banner */}
      <section className="relative overflow-hidden bg-[#02152a] pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
        <div className="absolute inset-0">
          <img
            src={cfg.heroImage}
            alt={cfg.heroAlt}
            className={`h-full w-full object-cover ${cfg.heroObjectPosition}`}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #02152a 0%, rgba(2,21,42,0.92) 33%, rgba(2,21,42,0.48) 57%, rgba(2,21,42,0.08) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{
              background: "linear-gradient(180deg, rgba(2,21,42,0.85) 0%, rgba(2,21,42,0) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1160px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <BackButton
              fallbackHref={PUBLIC_ROUTES.trips}
              label="Back"
              className="text-sky-300 hover:text-white"
            />
            <span className="text-white/30">/</span>
            <span className="text-white/65">{cfg.breadcrumbLabel}</span>
          </div>

          <div className="max-w-[540px]">
            <div className="flex items-center gap-4">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                {cfg.eyebrow}
              </span>
              <span className="h-[1px] w-16 bg-white/45" />
              {trip.remainingSpots !== undefined && (
                <span className="rounded-full bg-[#E8C58F]/20 border border-[#E8C58F]/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F3E2C7]">
                  {trip.remainingSpots > 0 ? `${trip.remainingSpots} spots left` : "Waitlist Only"}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-serif text-[44px] font-normal leading-[1.02] tracking-[-0.01em] text-white sm:text-[56px] lg:text-[64px]">
              {cfg.titleLine1}
              <span className="block italic text-[#7CC0DF]">{cfg.titleItalic}</span>
            </h1>

            <p className="mt-4 max-w-[385px] font-sans text-[14.5px] leading-[1.6] text-white/90 sm:text-[15.5px]">
              {cfg.heroDescription}
            </p>

            {/* Quick Facts Row */}
            <div className="mt-7 grid max-w-[490px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3">
              {cfg.facts.map((fact) => {
                const isUsersFact = fact.icon === "users";
                const displayTop =
                  isUsersFact && trip.remainingSpots !== undefined
                    ? trip.remainingSpots === 0
                      ? "Waitlist"
                      : "Only"
                    : fact.top;
                const displayBottom =
                  isUsersFact && trip.remainingSpots !== undefined
                    ? trip.remainingSpots === 0
                      ? "Sold Out"
                      : `${trip.remainingSpots} Spots`
                    : fact.bottom;
                return (
                  <div key={fact.top + fact.bottom} className="flex items-center gap-2.5 text-white">
                    <FactIcon type={fact.icon} />
                    <span className="font-sans text-[12px] leading-tight">
                      <span className="block font-semibold">{displayTop}</span>
                      <span className="text-white/80">{displayBottom}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Brochure + Price Request Button */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={brochureWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#F3E2C7] px-6 py-2.5 font-sans text-[13.5px] font-semibold text-[#0B233B] shadow-[0_10px_28px_rgba(2,21,42,0.38)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <span>Request the brochure with price</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href={PUBLIC_ROUTES.contact}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 font-sans text-[12.5px] font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Enquire Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Bottom Ocean Wave into White */}
      <div className="pointer-events-none relative -mt-12 w-full overflow-hidden leading-none sm:-mt-16">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-[48px] w-full sm:h-[68px]"
          aria-hidden="true"
        >
          <path
            d="M0,42 C280,10 520,10 780,44 C1040,76 1250,70 1440,34 L1440,90 L0,90 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* 2. The Trip at a Glance */}
      <section className="bg-white px-6 pb-14 pt-6 sm:px-10 sm:pb-16 sm:pt-8">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-8 lg:grid-cols-[360px_1fr] lg:gap-10">
          <div>
            <h2 className="font-serif text-[32px] font-normal leading-tight text-[#0A223B] sm:text-[38px]">
              The Trip{" "}
              <span className="italic text-[#3A84AE]">at a Glance</span>
            </h2>
            <p className="mt-2.5 font-sans text-[13.5px] leading-[1.65] text-[#2F465E]">
              {cfg.glanceDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 divide-y divide-[#D0DFEB] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {cfg.glanceItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center justify-center px-4 py-4 text-center"
              >
                <div className="mb-2.5 text-[#0E243B]">
                  <GlanceIcon type={item.icon} />
                </div>
                <h3 className="font-sans text-[14px] font-bold text-[#0A223B]">{item.title}</h3>
                <p className="mt-0.5 font-sans text-[12px] leading-snug text-[#39526A]">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Choose Your Dive Journey */}
      <section className="relative overflow-hidden bg-[#021C35]">
        <div className="pointer-events-none relative z-10 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 70"
            preserveAspectRatio="none"
            className="block h-[36px] w-full sm:h-[52px]"
            aria-hidden="true"
          >
            <path
              d="M0,0 L1440,0 L1440,36 C1160,64 820,56 540,26 C280,0 120,10 0,34 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <div className="relative min-h-[290px] sm:min-h-[330px]">
          <img
            src={cfg.journeyBannerImage}
            alt={cfg.journeyBannerAlt}
            className={`absolute inset-0 h-full w-full object-cover ${cfg.journeyBannerPos}`}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,21,42,0.08) 0%, rgba(2,21,42,0.42) 44%, rgba(2,24,46,0.74) 100%)",
            }}
          />

          <div className="relative z-10 mx-auto flex max-w-[1140px] items-center justify-end px-6 py-10 sm:px-10 sm:py-12">
            <div className="w-full rounded-2xl border border-white/15 bg-[#021A32]/78 px-5 py-6 text-white shadow-[0_18px_45px_rgba(1,14,28,0.45)] backdrop-blur-md sm:px-8 sm:py-7 lg:w-[63%]">
              <h2 className="text-center font-serif text-[26px] font-normal text-white sm:text-[32px]">
                Choose{" "}
                <span className="italic text-[#7CC0DF]">Your Dive Journey</span>
              </h2>

              <div className="mt-6 grid grid-cols-1 divide-y divide-white/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {cfg.journeyItems.map((path) => (
                  <div
                    key={path.title}
                    className="flex flex-col items-center px-4 py-4 text-center sm:py-1"
                  >
                    <div className="mb-2.5 text-white/95">
                      <JourneyIcon type={path.icon} />
                    </div>
                    <h3 className="font-sans text-[14.5px] font-bold leading-snug text-white">
                      {path.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[12px] leading-[1.45] text-white/85">
                      {path.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none relative z-10 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 70"
            preserveAspectRatio="none"
            className="block h-[36px] w-full sm:h-[52px]"
            aria-hidden="true"
          >
            <path
              d="M0,34 C280,10 620,6 920,38 C1180,62 1320,48 1440,26 L1440,70 L0,70 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* 4. What's Included & Not Included + Destination Photo */}
      <section className="bg-white px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-9 lg:grid-cols-[1.05fr_0.9fr_1fr] lg:gap-10">
          <div>
            <h2 className="font-serif text-[30px] font-normal text-[#0A223B] sm:text-[34px]">
              What’s{" "}
              <span className="italic text-[#3A84AE]">Included</span>
            </h2>
            <ul className="mt-5 space-y-3">
              {cfg.includedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.5] text-[#17324D]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4E73] stroke-[1.8]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-[#D4E2ED] lg:pl-8">
            <h2 className="font-serif text-[30px] font-normal text-[#0A223B] sm:text-[34px]">
              Not{" "}
              <span className="italic text-[#3A84AE]">Included</span>
            </h2>
            <ul className="mt-5 space-y-3">
              {cfg.notIncludedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.5] text-[#17324D]"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#46637D] stroke-[1.8]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_14px_34px_rgba(9,30,54,0.14)]">
            <img
              src={cfg.featurePhoto}
              alt={cfg.featurePhotoAlt}
              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* 5. Marine Life You Can Expect */}
      <section className="relative overflow-hidden bg-[#043358]">
        <div className="pointer-events-none relative z-10 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 70"
            preserveAspectRatio="none"
            className="block h-[36px] w-full sm:h-[52px]"
            aria-hidden="true"
          >
            <path
              d="M0,0 L1440,0 L1440,34 C1180,62 840,56 540,26 C260,0 110,12 0,38 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <div className="relative min-h-[260px] sm:min-h-[300px]">
          <img
            src={cfg.marineBannerImage}
            alt={cfg.marineBannerAlt}
            className="absolute inset-0 h-full w-full object-cover object-left"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,21,42,0.12) 0%, rgba(3,33,62,0.68) 38%, rgba(4,51,88,0.96) 66%, #043358 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{
              background: "linear-gradient(180deg, rgba(4,51,88,0) 0%, #043358 100%)",
            }}
          />

          <div className="relative z-10 mx-auto flex max-w-[1140px] items-center justify-end px-6 py-10 sm:px-10 sm:py-12">
            <div className="w-full rounded-2xl border border-white/15 bg-[#021A32]/82 px-5 py-6 text-white shadow-[0_18px_45px_rgba(1,14,28,0.45)] backdrop-blur-md sm:px-8 sm:py-7 lg:w-[70%]">
              <h2 className="text-center font-serif text-[25px] font-normal text-white sm:text-[31px]">
                Marine Life{" "}
                <span className="italic text-[#7CC0DF]">You Can Expect</span>
              </h2>

              <div className="mt-6 grid grid-cols-2 divide-y divide-white/20 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
                {cfg.marineSpecies.map((species) => (
                  <div
                    key={species.label}
                    className="flex flex-col items-center px-3 py-3 text-center sm:py-1"
                  >
                    <div className="mb-2 text-white/95">
                      <MarineSpeciesIcon type={species.icon} />
                    </div>
                    <p className="font-sans text-[12px] font-medium leading-snug text-white/90">
                      {species.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
