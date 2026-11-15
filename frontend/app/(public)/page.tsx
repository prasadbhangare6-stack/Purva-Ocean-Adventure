import type { Metadata } from "next";
import Link from "next/link";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { Container } from "@/components/ui/Container";
import { PUBLIC_ROUTES } from "@/lib/config/site";
import { UpcomingTripsShowcase } from "@/components/trips/UpcomingTripsShowcase";
import { DiveCertificationsShowcase } from "@/components/courses/DiveCertificationsShowcase";
import { OceanQuoteShowcase } from "@/components/quote/OceanQuoteShowcase";
import { AboutShowcase } from "@/components/about/AboutShowcase";
import { OceanGalleryShowcase } from "@/components/gallery/OceanGalleryShowcase";
import { InstagramShowcase } from "@/components/instagram/InstagramShowcase";
import { FaqShowcase } from "@/components/faq/FaqShowcase";
import { ContactShowcase } from "@/components/contact/ContactShowcase";

export const metadata: Metadata = {
  title: "Ocean Adventures That Bring You Closer | Purva Ocean Adventures",
  description:
    "Curated scuba diving and ocean travel experiences for curious souls. From your first breath underwater to unforgettable dive journeys around the world.",
};

const BACKGROUND_VIDEOS = [
  "/media/V4.mp4",
  "/media/V5.mp4",
  "/media/V3.mp4",
];

export default function HomePage() {
  return (
    <>
      {/* First Section: Video Hero Background */}
      <section className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-3 sm:pb-5">
        {/* Fullscreen Video Background */}
        <VideoBackground
          sources={BACKGROUND_VIDEOS}
          poster="/media/hero-design.jpg"
        />

        {/* Main Hero Content (Eyebrow, Headline, Body, Button) */}
        <Container className="relative z-10 my-auto animate-fade-up">
          <p className="label-caps mb-3 sm:mb-4 text-xs sm:text-sm font-semibold tracking-[0.28em] text-sky-200">
            EXPLORE • DIVE • CONNECT
          </p>

          <h1 className="max-w-4xl font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold uppercase tracking-tight text-foam leading-[1.02]">
            OCEAN<br />
            ADVENTURES<br />
            THAT BRING<br />
            <span className="italic font-light text-[#7ec5eb]">YOU CLOSER</span>
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-foam/90 font-normal leading-relaxed">
            Curated scuba diving and ocean travel experiences for curious souls. From your first breath underwater to unforgettable dive journeys around the world.
          </p>

          <div className="mt-5 sm:mt-7">
            <a
              href="#upcoming-trips"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#E8C58F] px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#010F20] shadow-lg transition-all hover:bg-foam hover:shadow-sky/20 active:scale-[0.98]"
            >
              <span>EXPLORE OUR TRIPS</span>
              <span aria-hidden="true" className="text-base leading-none">&rarr;</span>
            </a>
          </div>
        </Container>

        {/* Bottom Feature Badges matching the design artwork */}
        <Container className="relative z-10 pt-3 sm:pt-4 shrink-0">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-t border-foam/20 pt-3 sm:pt-4">
            {/* Badge 1: Curated Dive Trips */}
            <div className="flex items-center gap-3 pr-4 sm:pr-8 sm:border-r border-foam/25">
              <svg
                viewBox="0 0 24 24"
                className="size-5 sm:size-6 text-foam shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 6c3-2 5-2 8 0s5 2 8 0 4-1 4-1" />
                <path d="M2 12c3-2 5-2 8 0s5 2 8 0 4-1 4-1" />
                <path d="M2 18c3-2 5-2 8 0s5 2 8 0 4-1 4-1" />
              </svg>
              <div className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
                CURATED<br />DIVE TRIPS
              </div>
            </div>

            {/* Badge 2: PADI Courses */}
            <div className="flex items-center gap-3 pr-4 sm:pr-8 sm:border-r border-foam/25">
              <svg
                viewBox="0 0 24 24"
                className="size-5 sm:size-6 text-foam shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 9h9c1.5 0 2.5 1 2.5 2.5v1c0 1.5-1 2.5-2.5 2.5H3c-1.5 0-2.5-1-2.5-2.5v-1C0.5 10 1.5 9 3 9z" />
                <path d="M12 9h9c1.5 0 2.5 1 2.5 2.5v1c0 1.5-1 2.5-2.5 2.5h-9" />
                <path d="M19 9V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v12a3 3 0 0 1-3 3h-2" />
              </svg>
              <div className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
                PADI<br />COURSES
              </div>
            </div>

            {/* Badge 3: Incredible Marine Life */}
            <div className="flex items-center gap-3 pr-4 sm:pr-8 sm:border-r border-foam/25">
              <svg
                viewBox="0 0 24 24"
                className="size-5 sm:size-6 text-foam shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22V11" />
                <path d="M12 15c-3 0-5-2-5-5V7c0-1.5 2-2 3-1" />
                <path d="M12 13c3 0 5-2 5-5V5c0-1.5-2-2-3-1" />
                <path d="M7 10c-2 0-3-1-3-2V6c0-1 1-2 2-1" />
                <path d="M17 11c2 0 3-1 3-2V7c0-1-1-2-2-1" />
              </svg>
              <div className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
                INCREDIBLE<br />MARINE LIFE
              </div>
            </div>

            {/* Badge 4: Ocean Community */}
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                className="size-5 sm:size-6 text-foam shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <div className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
                OCEAN<br />COMMUNITY
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Second Section: Upcoming Trips 3D Showcase matching design mock */}
      <UpcomingTripsShowcase />

      {/* Third Section: Dive Certifications Showcase matching design mock */}
      <DiveCertificationsShowcase />

      {/* Fourth Section: Ocean Quote matching design mock */}
      <OceanQuoteShowcase />

      {/* Fifth Section: About Us matching design mock */}
      <AboutShowcase />

      {/* Sixth Section: Ocean Gallery matching design mock */}
      <OceanGalleryShowcase />

      {/* Seventh Section: Instagram Showcase matching design mock */}
      <InstagramShowcase />

      {/* Eighth Section: FAQ Showcase matching design mock */}
      <FaqShowcase />

      {/* Ninth Section: Contact Showcase matching design mock */}
      <ContactShowcase />
    </>
  );
}
