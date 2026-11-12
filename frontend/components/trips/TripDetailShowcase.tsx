"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PUBLIC_ROUTES } from "@/lib/config/site";
import { BackButton } from "@/components/ui/BackButton";
import { WhatsAppIcon } from "@/components/layout/BrandIcons";
import { OceanAtmosphere } from "@/components/ui/OceanAtmosphere";
import type { CuratedTrip } from "@/lib/data/curatedTrips";
import {
  Calendar,
  MapPin,
  Clock,
  Waves,
  Award,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Camera,
  Share2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const NAV_TABS = [
  { id: "overview", label: "Overview" },
  { id: "gallery", label: "Gallery" },
  { id: "highlights", label: "Highlights" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Package" },
  { id: "requirements", label: "Checklist" },
];

export function TripDetailShowcase({
  trip,
  whatsappLink,
}: {
  trip: CuratedTrip;
  whatsappLink: string;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });

  // Gallery photos
  const gallery =
    trip.galleryImages && trip.galleryImages.length > 0
      ? trip.galleryImages
      : [trip.coverImage, "/media/P1.jpg", "/media/P2.jpg", "/media/P3.jpg", "/media/P4.jpg"];

  // Pre-filled WhatsApp link specific to this trip
  const tailoredWhatsAppUrl = `https://wa.me/916262323232?text=${encodeURIComponent(
    `Hello Purva Ocean Adventures! I'm interested in booking the "${trip.name}" expedition (${trip.destination}, ${trip.dates}). Please share availability and full booking details.`
  )}`;

  // Share link handler
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${trip.name} | Purva Ocean Adventures`,
          text: trip.tagline,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, gallery.length]);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <article className="min-h-screen bg-[#010f20] text-slate-100 pb-24 selection:bg-gold selection:text-abyss relative overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          AMBIENT OCEAN ATMOSPHERE (Bubbles & Caustics)
      ───────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#02182c] via-[#011427] to-[#010f20]" />
      <OceanAtmosphere className="z-0 opacity-80" />

      {/* ─────────────────────────────────────────────────────────────
          CINEMATIC HERO HEADER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden text-white border-b border-sky-400/15">
        {/* Cover backdrop with subtle cinematic Ken Burns effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={trip.coverImage}
            alt={trip.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010f20] via-[#011427]/85 to-[#02182c]/75" />
          {/* Subtle animated ocean shimmer overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14),transparent_70%)] pointer-events-none" />
        </div>

        <Container className="relative z-10">
          {/* Top Bar: Breadcrumb & Share Button */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold tracking-wider uppercase text-sky-300">
            <div className="flex items-center gap-3">
              <BackButton
                fallbackHref={PUBLIC_ROUTES.trips}
                label="Back to Upcoming Trips"
                className="text-sky-300 hover:text-white transition-colors flex items-center gap-1.5"
              />
              <span className="text-white/30">/</span>
              <span className="text-white/60">{trip.destination}</span>
            </div>

            {/* Quick Share Action with Feedback */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3.5 py-1 text-xs font-semibold text-sky-200 transition-all hover:bg-sky-400/20 hover:border-sky-400/40 cursor-pointer active:scale-95 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3.5 text-sky-300" />
                  <span>Share Trip</span>
                </>
              )}
            </button>
          </div>

          {/* Badges with Soft Pulsing Light */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/15 px-3.5 py-1 text-xs font-bold text-sky-200 border border-sky-400/30 backdrop-blur-sm shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
              {trip.available ? "Confirmed Departure" : "Dates Announcing Soon"}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm border border-white/15">
              <MapPin className="size-3.5 text-sky-300" />
              {trip.destination}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm border border-white/15">
              <Calendar className="size-3.5 text-sky-300" />
              {trip.dates}
            </span>

            <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[0.68rem] font-medium text-white/60 backdrop-blur-sm border border-white/10">
              Last updated: November 2026
            </span>
          </div>

          {/* Title & Tagline with Display Typography */}
          <h1 className="mt-5 font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold uppercase tracking-tight text-white leading-tight drop-shadow-md">
            {trip.name}
          </h1>
          <p className="mt-3 max-w-3xl font-serif text-lg sm:text-xl font-light italic text-[#bae6fd] leading-relaxed">
            {trip.tagline}
          </p>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          QUICK SPECS STRIP (Glassmorphic Micro-Interactions)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 border-b border-sky-400/15 bg-[#02182e]/85 backdrop-blur-md py-6 shadow-lg">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {/* Spec 1 */}
            <div className="group flex items-center gap-3.5 p-2 rounded-2xl transition-all duration-300 hover:bg-sky-400/[0.08] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(56,189,248,0.12)]">
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-300 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-400/25 group-hover:border-sky-400/40">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-sky-300/70">Duration</p>
                <p className="text-sm sm:text-base font-bold text-white">{trip.duration}</p>
              </div>
            </div>

            {/* Spec 2 */}
            <div className="group flex items-center gap-3.5 p-2 rounded-2xl transition-all duration-300 hover:bg-sky-400/[0.08] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(56,189,248,0.12)]">
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-300 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-400/25 group-hover:border-sky-400/40">
                <Waves className="size-5" />
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-sky-300/70">Dives</p>
                <p className="text-sm sm:text-base font-bold text-white">{trip.dives}</p>
              </div>
            </div>

            {/* Spec 3 */}
            <div className="group flex items-center gap-3.5 p-2 rounded-2xl transition-all duration-300 hover:bg-sky-400/[0.08] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(56,189,248,0.12)]">
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-300 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-400/25 group-hover:border-sky-400/40">
                <Award className="size-5" />
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-sky-300/70">Experience</p>
                <p className="text-sm sm:text-base font-bold text-white">{trip.experienceLevel}</p>
              </div>
            </div>

            {/* Spec 4 */}
            <div className="group flex items-center gap-3.5 p-2 rounded-2xl transition-all duration-300 hover:bg-sky-400/[0.08] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(56,189,248,0.12)]">
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-300 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-400/25 group-hover:border-sky-400/40">
                <Users className="size-5" />
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-sky-300/70">Group Size</p>
                <p className="text-sm sm:text-base font-bold text-white">{trip.groupSize}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          STICKY SECTION QUICK NAVIGATION TABS
      ───────────────────────────────────────────────────────────── */}
      <nav aria-label="Section tabs" className="sticky top-16 z-30 border-b border-sky-400/15 bg-[#011427]/90 backdrop-blur-lg py-2.5 shadow-md">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#E8C58F] text-[#010F20] shadow-[0_2px_12px_rgba(232,197,143,0.4)] scale-105"
                      : "bg-white/5 text-sky-200/80 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Container>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT & STICKY BOOKING CARD
      ───────────────────────────────────────────────────────────── */}
      <Container className="relative z-10 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          {/* Left 7 Columns */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-12">
            {/* Overview Card */}
            <section
              id="overview"
              className="scroll-mt-36 group rounded-3xl bg-[#021b33]/70 border border-sky-400/15 p-6 sm:p-9 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-sky-400/40" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-sky-300">
                  THE JOURNEY
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
                Expedition Overview
              </h2>
              <p className="mt-4 text-sm sm:text-base text-sky-100/85 leading-relaxed font-light">
                {trip.overview}
              </p>
            </section>

            {/* Interactive Photo Showcase with Click-to-Lightbox */}
            <section
              id="gallery"
              className="scroll-mt-36 rounded-3xl bg-[#021b33]/70 border border-sky-400/15 p-6 sm:p-9 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)]"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-px w-8 bg-sky-400/40" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-sky-300">
                      UNDERWATER GALLERY
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold uppercase text-white tracking-tight">
                    Expedition Moments
                  </h2>
                </div>
                <span className="text-xs font-semibold text-sky-300/80 flex items-center gap-1.5 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/20">
                  <Camera className="size-3.5 text-sky-300" /> Click to enlarge
                </span>
              </div>

              {/* 4-Image Grid with Hover Zoom & Click */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                {gallery.slice(0, 4).map((imgSrc, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative h-44 sm:h-56 rounded-2xl overflow-hidden border border-sky-400/20 bg-[#021427] cursor-pointer shadow-md transition-all duration-300 hover:border-sky-400/40 hover:shadow-[0_8px_25px_rgba(56,189,248,0.2)]"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${trip.name} photo ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Hover gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                      <span className="text-xs font-medium text-white/95">View High-Res</span>
                      <ZoomIn className="size-4 text-sky-300" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Highlights */}
            <section
              id="highlights"
              className="scroll-mt-36 rounded-3xl bg-[#021b33]/70 border border-sky-400/15 p-6 sm:p-9 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-sky-400/40" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-sky-300">
                  EXPEDITION ADVANTAGES
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold uppercase text-white tracking-tight">
                What Makes This Special
              </h2>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {trip.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 rounded-2xl bg-[#021427]/80 p-4 border border-sky-400/15 transition-all duration-300 hover:bg-[#021c38] hover:border-sky-400/35 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <ShieldCheck className="size-5 text-sky-300 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#E8C58F]" />
                    <span className="text-xs sm:text-sm font-medium text-sky-100/90 leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Day by Day Itinerary with Click-to-Expand Accordion */}
            <section
              id="itinerary"
              className="scroll-mt-36 rounded-3xl bg-[#021b33]/70 border border-sky-400/15 p-6 sm:p-9 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-px w-8 bg-sky-400/40" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-sky-300">
                      SCHEDULE
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold uppercase text-white tracking-tight">
                    Day-by-Day Itinerary
                  </h2>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/20">
                  {trip.itinerary.length} Days
                </span>
              </div>

              <div className="mt-8 space-y-6 border-l-2 border-sky-400/30 pl-6 sm:pl-8 ml-3 sm:ml-4">
                {trip.itinerary.map((day) => {
                  const isOpen = expandedDays[day.day] ?? true;
                  return (
                    <div
                      key={day.day}
                      className="relative group rounded-2xl bg-[#021427]/60 border border-sky-400/15 p-4 sm:p-5 transition-all duration-300 hover:bg-[#02172f] hover:border-sky-400/30"
                    >
                      {/* Glowing Timeline Node */}
                      <span className="absolute -left-[2.1rem] sm:-left-[2.6rem] top-5 size-5 rounded-full border-4 border-[#021b33] bg-sky-400 shadow-md transition-all duration-300 group-hover:scale-125 group-hover:bg-[#E8C58F] group-hover:shadow-[0_0_15px_rgba(232,197,143,0.7)]" />

                      <div
                        onClick={() => toggleDay(day.day)}
                        className="flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-[#E8C58F] px-2.5 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-widest text-[#010F20] shadow-sm">
                            Day {day.day}
                          </span>
                          <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
                            {day.subtitle}
                          </span>
                        </div>
                        <ChevronDown
                          className={`size-4 text-sky-300/80 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <h3
                        onClick={() => toggleDay(day.day)}
                        className="mt-2.5 font-serif text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-[#bae6fd] cursor-pointer"
                      >
                        {day.title}
                      </h3>

                      {isOpen && (
                        <div className="animate-fade-in pt-1">
                          <p className="mt-2 text-xs sm:text-sm text-sky-100/80 leading-relaxed font-light">
                            {day.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {day.highlights.map((dh, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center rounded-full bg-[#010f20] px-3 py-1 text-[0.7rem] font-medium text-sky-200 border border-sky-400/20 transition-colors group-hover:border-sky-400/40"
                              >
                                &bull; {dh}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Package Breakdown */}
            <section
              id="inclusions"
              className="scroll-mt-36 rounded-3xl bg-[#021b33]/70 border border-sky-400/15 p-6 sm:p-9 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)]"
            >
              <h2 className="font-serif text-2xl font-bold uppercase text-white tracking-tight mb-6">
                Package Breakdown
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {/* Inclusions */}
                <div className="rounded-2xl bg-emerald-950/25 p-5 sm:p-6 border border-emerald-400/25 shadow-inner transition-all duration-300 hover:border-emerald-400/40">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    <span>What&apos;s Included</span>
                  </h3>
                  <ul className="space-y-3">
                    {trip.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="rounded-2xl bg-white/[0.02] p-5 sm:p-6 border border-white/10 transition-all duration-300 hover:border-white/20">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-rose-300 mb-4">
                    <XCircle className="size-4 text-rose-400" />
                    <span>What&apos;s Excluded</span>
                  </h3>
                  <ul className="space-y-3">
                    {trip.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-sky-100/70 leading-relaxed">
                        <XCircle className="size-4 text-rose-400/70 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Requirements & Diver Checklist */}
            <section
              id="requirements"
              className="scroll-mt-36 rounded-3xl bg-[#021b33]/70 border border-sky-400/15 p-6 sm:p-9 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)]"
            >
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold uppercase text-white">
                <AlertCircle className="size-5 text-amber-400" />
                <span>Diver Requirements & Checklist</span>
              </h2>
              <ul className="mt-4 space-y-2.5">
                {trip.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-sky-100/85">
                    <span className="size-1.5 rounded-full bg-sky-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right 5 Columns: Sticky Booking & Pricing Card with Shimmer Button */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="relative rounded-3xl bg-[#02182e]/90 p-6 sm:p-8 shadow-2xl border border-sky-400/25 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-sky-400/40 hover:shadow-[0_16px_50px_rgba(56,189,248,0.18)]">
                {/* Ambient glow highlight in card corner */}
                <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-sky-400/15 blur-2xl" />

                <div className="flex items-center justify-between pb-4 border-b border-sky-400/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300/70">
                    Expedition Price
                  </span>
                  <span className="rounded-full bg-emerald-950/60 px-3 py-1 text-[0.7rem] font-bold uppercase text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {trip.available ? "Bookings Open" : "Waitlist Open"}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#E8C58F] tracking-tight">
                    {trip.pricing.displayText}
                  </p>
                  <p className="mt-2 text-xs text-sky-100/70 leading-relaxed font-light">
                    {trip.pricing.note}
                  </p>
                </div>

                {/* Actions: Shimmer Effect on Champagne Gold Button */}
                <div className="mt-7 space-y-3">
                  {/* Primary Button with Diagonal Sheen Sweep */}
                  <a
                    href={tailoredWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#E8C58F] text-[#010F20] py-3.5 sm:py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_8px_25px_rgba(232,197,143,0.3)] transition-all duration-300 hover:bg-white hover:shadow-[0_12px_32px_rgba(232,197,143,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer overflow-hidden"
                  >
                    {/* Shimmer / light sweep animation */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-[280%]" />
                    <WhatsAppIcon className="size-5 fill-current text-[#010F20] shrink-0" />
                    <span className="relative z-10">Inquire / Reserve on WhatsApp</span>
                  </a>

                  {/* Secondary Action: Oceanic Glass */}
                  <Link
                    href={`${PUBLIC_ROUTES.contact}?trip=${trip.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-sky-300/40 bg-sky-400/10 hover:bg-sky-400/20 py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-100 transition-all hover:scale-[1.01]"
                  >
                    <span>Send Email Inquiry</span>
                  </Link>
                </div>

                {/* Trust Guarantees */}
                <div className="mt-7 pt-6 border-t border-sky-400/15 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-sky-100/85">
                    <ShieldCheck className="size-4 text-sky-300 shrink-0" />
                    <span>Certified PADI Divemasters & Lead Guides</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-sky-100/85">
                    <Users className="size-4 text-sky-300 shrink-0" />
                    <span>Strict small-group ratio guarantee (max 4:1)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-sky-100/85">
                    <Camera className="size-4 text-sky-300 shrink-0" />
                    <span>Complimentary high-res underwater photos & footage</span>
                  </div>
                </div>
              </div>

              {/* Back to all trips */}
              <div className="text-center pt-1">
                <BackButton
                  fallbackHref={PUBLIC_ROUTES.trips}
                  label="Back to upcoming trips"
                  className="text-sky-300 hover:text-white transition-colors"
                />
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN HIGH-RES LIGHTBOX MODAL WITH FILMSTRIP
      ───────────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar: Title & Close Button */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white/90 z-50 pt-2 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E8C58F]">
                {trip.name}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/70">
                Photo {lightboxIndex + 1} of {gallery.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Center Image Container with Prev/Next Navigation */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0));
              }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-50 inline-flex size-12 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white transition-all cursor-pointer hover:scale-110"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Active Image */}
            <div className="relative size-full max-h-[70vh] flex items-center justify-center">
              <Image
                src={gallery[lightboxIndex]}
                alt={`${trip.name} high-res preview`}
                fill
                className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                sizes="95vw"
                priority
              />
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
              }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-50 inline-flex size-12 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white transition-all cursor-pointer hover:scale-110"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Bottom Filmstrip Thumbnails */}
          <div
            className="w-full max-w-md flex items-center justify-center gap-2.5 z-50 pt-3"
            onClick={(e) => e.stopPropagation()}
          >
            {gallery.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={`relative size-12 sm:size-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  lightboxIndex === idx
                    ? "border-[#E8C58F] scale-110 shadow-[0_0_12px_rgba(232,197,143,0.5)]"
                    : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/50"
                }`}
              >
                <Image src={thumb} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
