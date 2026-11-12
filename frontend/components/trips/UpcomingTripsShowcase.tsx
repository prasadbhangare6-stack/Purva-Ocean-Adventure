"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export type UpcomingTripItem = {
  id: string;
  name: string;
  destination: string;
  dates: string;
  meta: string;
  description: string;
  image: string;
  tag: string;
  highlights: string[];
  slug: string;
  priceEstimate?: string;
  available?: boolean;
};

export const UPCOMING_TRIPS_DATA: UpcomingTripItem[] = [
  {
    id: "maafushi-madness",
    name: "MAAFUSHI MADNESS",
    destination: "MALDIVES",
    dates: "22–27 November 2026",
    meta: "6 Days | Liveaboard & Island | 10 Dives | Marine Life",
    description:
      "Join us on an unforgettable dive expedition to Maafushi, Maldives. Explore pristine reefs, vibrant marine life, and crystal clear waters in one of the world's most iconic dive destinations.",
    image: "/media/maafushi-maldives.jpg",
    tag: "Upcoming Trip",
    highlights: [
      "Nurse Shark Channel Gatherings",
      "Manta Ray Cleaning Stations",
      "Crystal Turquoise Sandbanks",
      "PADI Certified Guides & Nitrox",
    ],
    slug: "maafushi-madness-maldives",
    priceEstimate: "All Inclusions Available On Request",
    available: true,
  },
  {
    id: "lakshadweep-love",
    name: "LAKSHADWEEP LOVE",
    destination: "INDIA",
    dates: "26–31 January 2027",
    meta: "6 Days | Pristine Atolls | 12 Dives | Turtle Lagoons",
    description:
      "Discover the untouched paradise of Lakshadweep. Dive into crystal clear waters with vibrant sea turtles, pristine coral formations, dramatic drop-offs, and remote tropical atoll adventures.",
    image: "/media/lakshadweep-love.jpg",
    tag: "Upcoming Trip",
    highlights: [
      "Resident Green Sea Turtles",
      "Untouched Coral Reef Gardens",
      "Lagoon & Channel Drift Dives",
      "Permits & Gear Handled",
    ],
    slug: "lakshadweep-love",
    priceEstimate: "Limited Spots Available",
    available: true,
  },
  {
    id: "maldives-feb",
    name: "MALDIVES EXPEDITION",
    destination: "MALDIVES",
    dates: "February 2027 (Dates will be out soon)",
    meta: "Liveaboard Expedition | 15+ Dives | Pelagic Encounters",
    description:
      "A signature ocean journey through world-famous Maldivian reefs and deep channels. Encounter whale sharks, eagle rays, and night dives with hunting nurse sharks in paradise.",
    image: "/media/maldives-liveaboard.jpg",
    tag: "Dates Will Be Out Soon",
    highlights: [
      "Pelagic Whale Shark Searches",
      "Oceanic Manta Ray Encounters",
      "Signature Night Channel Dives",
      "Full Board Luxury Liveaboard",
    ],
    slug: "maldives-dive-expedition",
    priceEstimate: "Dates Announcing Soon",
    available: false,
  },
];

export function UpcomingTripsShowcase({ initialTrips }: { initialTrips?: UpcomingTripItem[] } = {}) {
  const [trips, setTrips] = useState<UpcomingTripItem[]>(initialTrips && initialTrips.length > 0 ? initialTrips : UPCOMING_TRIPS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Sync with live store in browser
  useEffect(() => {
    fetch("/api/admin/content?resource=trips")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.trips?.length) {
          const mapped: UpcomingTripItem[] = data.data.trips.map((t: Record<string, unknown>) => {
            const pricing = t.pricing as { displayText?: string } | undefined;
            return {
              id: (t.slug as string) || "trip",
              name: (t.name as string) || "",
              destination: (t.destination as string) || "",
              dates: (t.dates as string) || "",
              meta: `${(t.duration as string) || ""} | ${(t.dives as string) || ""}`,
              description: ((t.summary as string) || (t.overview as string)) || "",
              image: (t.coverImage as string) || "/media/maafushi-maldives.jpg",
              tag: t.available ? "Upcoming Trip" : "Waitlist Only",
              highlights: (t.highlights as string[]) || [],
              slug: (t.slug as string) || "",
              available: Boolean(t.available),
              priceEstimate: pricing?.displayText || "Available on request",
            };
          });
          setTrips(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const total = trips.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Pop up cycle: trips cycle one after another every 3 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  const activeTrip = trips[currentIndex];
  const prevTrip = trips[(currentIndex - 1 + total) % total];
  const nextTrip = trips[(currentIndex + 1) % total];

  return (
    <section
      id="upcoming-trips"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-between overflow-hidden bg-white pt-20 sm:pt-22 pb-6 sm:pb-8 select-none scroll-mt-20"
    >
      {/* Diver backdrop positioned strictly at the top-right corner with soft white feathering */}
      <div className="pointer-events-none absolute right-0 top-0 h-[50vh] sm:h-[58vh] md:h-[65vh] w-[50vw] sm:w-[58vw] md:w-[65vw] lg:w-[68vw] xl:max-w-[1050px] overflow-hidden select-none z-0">
        <Image
          src="/media/clean-diver-backdrop.jpg"
          alt="Scuba diver swimming with school of fish"
          fill
          priority
          sizes="(max-width: 1024px) 70vw, 1050px"
          className="object-cover object-right-top"
        />
        {/* Generous soft white gradient feathering to the left into pure white */}
        <div className="absolute inset-y-0 left-0 w-1/2 sm:w-2/5 bg-gradient-to-r from-white via-white/90 to-transparent" />
        {/* Generous soft white gradient feathering to the bottom into pure white */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 sm:h-2/5 bg-gradient-to-t from-white via-white/90 to-transparent" />
        {/* Very soft white mist overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/15" />
      </div>

      {/* Top Header Row: Section Title */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 shrink-0">
        <div className="max-w-xl">
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
            Upcoming Trips
          </h1>
          <p className="mt-1 text-[0.65rem] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#0284c7]">
            Curated Expeditions • Limited Group Sizes
          </p>
        </div>
      </div>

      {/* 3-Card Carousel + Pagination Container: Vertically centered together */}
      <div className="relative z-10 my-auto flex w-full max-w-7xl mx-auto flex-col items-center justify-center px-6 sm:px-10 lg:px-16 select-none flex-1 min-h-0">
        <div
          className="relative flex w-full items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
        {/* LEFT PEEK CARD (Previous Slide - as it was showing before) */}
        <div
          onClick={prevSlide}
          role="button"
          tabIndex={0}
          aria-label={`View previous trip: ${prevTrip.name}`}
          className="hidden lg:block absolute left-4 xl:left-8 w-[240px] xl:w-[280px] aspect-[16/10] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 cursor-pointer scale-[0.85] opacity-75 hover:opacity-95 hover:scale-[0.88] z-10"
        >
          <Image
            src={prevTrip.image}
            alt={prevTrip.name}
            fill
            sizes="300px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021836]/90 via-[#021836]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <span className="inline-block rounded-full bg-[#0284c7]/80 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider mb-1">
              {prevTrip.destination}
            </span>
            <h3 className="font-serif text-base font-bold uppercase tracking-tight leading-tight">
              {prevTrip.name}
            </h3>
            <p className="text-[0.65rem] text-sky-200 mt-0.5 line-clamp-1">{prevTrip.meta}</p>
          </div>
        </div>

        {/* CENTER FEATURED CARD (Active Slide - Pops up smoothly in cycle) */}
        <div
          key={activeTrip.id}
          className="relative z-20 w-full max-w-[440px] sm:max-w-[500px] md:max-w-[540px] lg:max-w-[580px] rounded-2xl sm:rounded-3xl bg-white shadow-[0_16px_45px_rgba(2,24,54,0.15),0_4px_12px_rgba(2,24,54,0.06)] border border-slate-100 overflow-hidden flex flex-col animate-trip-pop"
        >
          {/* Top Media Half */}
          <div className="relative aspect-[16/8.5] w-full overflow-hidden bg-slate-900">
            <Image
              src={activeTrip.image}
              alt={activeTrip.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 580px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#021836]/95 via-[#021836]/45 to-transparent" />

            {/* Status Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[0.65rem] sm:text-xs font-semibold text-white border border-white/30 shadow-sm">
                <span className="size-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                {activeTrip.tag}
              </span>
            </div>

            {/* Overlaid Headline & Subtitle matching design mock */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 text-white">
              <div className="flex items-center gap-1.5 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-sky-200 mb-0.5">
                <Calendar className="size-3 text-sky-300" />
                <span>{activeTrip.dates}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight drop-shadow-md">
                {activeTrip.name}
              </h2>
              <p className="mt-0.5 text-[0.68rem] sm:text-xs font-medium text-sky-100/90 line-clamp-1">
                {activeTrip.meta}
              </p>
            </div>
          </div>

          {/* Bottom Content Half matching design mock */}
          <div className="p-4 sm:p-5 md:p-6 bg-white flex flex-col justify-between gap-3 sm:gap-4">
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
              {activeTrip.description}
            </p>

            {/* Action Buttons: KNOW MORE directs user to the dedicated trip brief info page in the same window */}
            <div className="pt-1">
              <Link
                href={`/trips/${activeTrip.slug}`}
                className="group relative w-full rounded-xl border-2 border-[#051E3C] py-2.5 sm:py-3 px-5 text-center text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-[#051E3C] transition-all duration-300 hover:bg-[#051E3C] hover:text-white active:scale-[0.99] shadow-sm hover:shadow-[0_4px_16px_rgba(5,30,60,0.2)] flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Diagonal light sheen effect on hover */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-[280%]" />
                <span className="relative z-10">KNOW MORE</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Circular Arrow Buttons on the left and right borders matching mock */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous trip"
            className="absolute left-2 sm:left-3 top-[35%] -translate-y-1/2 z-30 inline-flex size-9 sm:size-10 items-center justify-center rounded-full bg-[#071D36] text-white shadow-xl backdrop-blur-md transition-all hover:bg-[#0284c7] hover:scale-110 active:scale-95 border border-white/20"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next trip"
            className="absolute right-2 sm:right-3 top-[35%] -translate-y-1/2 z-30 inline-flex size-9 sm:size-10 items-center justify-center rounded-full bg-[#071D36] text-white shadow-xl backdrop-blur-md transition-all hover:bg-[#0284c7] hover:scale-110 active:scale-95 border border-white/20"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>

        {/* RIGHT PEEK CARD (Next Slide - as it was showing before) */}
        <div
          onClick={nextSlide}
          role="button"
          tabIndex={0}
          aria-label={`View next trip: ${nextTrip.name}`}
          className="hidden lg:block absolute right-4 xl:right-8 w-[240px] xl:w-[280px] aspect-[16/10] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 cursor-pointer scale-[0.85] opacity-75 hover:opacity-95 hover:scale-[0.88] z-10"
        >
          <Image
            src={nextTrip.image}
            alt={nextTrip.name}
            fill
            sizes="300px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021836]/90 via-[#021836]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <span className="inline-block rounded-full bg-[#0284c7]/80 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider mb-1">
              {nextTrip.destination}
            </span>
            <h3 className="font-serif text-base font-bold uppercase tracking-tight leading-tight">
              {nextTrip.name}
            </h3>
            <p className="text-[0.65rem] text-sky-200 mt-0.5 line-clamp-1">{nextTrip.meta}</p>
          </div>
        </div>
        </div>

        {/* Pagination Dots: Shifted up cleanly right underneath the featured card */}
        <div className="relative z-10 mt-4 sm:mt-5 flex items-center justify-center gap-2 shrink-0">
          {trips.map((trip, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={trip.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${trip.name}`}
                className={`transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "h-2 w-7 rounded-full bg-[#0284c7] shadow-sm"
                    : "size-2 rounded-full bg-sky-200 hover:bg-sky-400"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
