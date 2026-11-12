"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/sanity/types";

interface PolicyModalData {
  title: string;
  subtitle: string;
  sections: { heading: string; text: string }[];
}

const POLICY_DETAILS: Record<string, PolicyModalData> = {
  terms: {
    title: "Terms & Conditions",
    subtitle: "Purva Ocean Adventures Expedition & Diving Agreement",
    sections: [
      {
        heading: "1. Booking & Expedition Confirmation",
        text: "Expedition reservations are confirmed upon receipt of the deposit. Full payment is due prior to trip departure. By confirming, guests agree to follow all safety guidelines established by our expedition leaders.",
      },
      {
        heading: "2. Scuba Diver Health & Certification",
        text: "All certified divers must present proof of scuba certification (PADI, SSI, or equivalent) and logbook. Divers must complete a standard PADI Medical Statement. A medical clearance signed by a physician may be required if indicated.",
      },
      {
        heading: "3. Safety & Divemaster Authority",
        text: "Our lead divemasters and captains maintain absolute authority regarding dive site selection, weather evaluation, diver readiness, and dive profiles. Dive plans prioritize ocean conditions and diver safety at all times.",
      },
      {
        heading: "4. Ocean Conservation & Responsible Diving",
        text: "Purva Ocean Adventures strictly enforces reef conservation. Divers must maintain neutral buoyancy, never touch or harass marine life, collect ocean specimens, or step on living corals.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "How We Protect and Handle Your Personal Information",
    sections: [
      {
        heading: "1. Information We Collect",
        text: "We collect only the essential personal details needed to arrange your dive expeditions: full name, contact information (email and WhatsApp/phone), dive experience, and equipment sizing.",
      },
      {
        heading: "2. Use of Information",
        text: "Your data is used strictly to coordinate your travel bookings, submit safety passenger manifests required by local maritime authorities, and communicate trip updates. We will never sell or rent your personal information to third parties.",
      },
      {
        heading: "3. Data Security & Storage",
        text: "Inquiries submitted through our website are transmitted via secure HTTPS encryption and stored securely. You may request deletion or correction of your information at any time.",
      },
    ],
  },
  cancellation: {
    title: "Cancellation & Refund Policy",
    subtitle: "Clear, Fair Guidelines for Trip Bookings and Rescheduling",
    sections: [
      {
        heading: "1. 30+ Days Prior to Departure",
        text: "Cancellations made 30 days or more prior to the expedition date receive a full 100% refund, less standard payment processing fees, or a 100% transferable expedition credit.",
      },
      {
        heading: "2. 15 to 29 Days Prior to Departure",
        text: "Cancellations made 15–29 days prior receive a 50% refund, or a 75% expedition credit valid for 12 months on any upcoming dive trip.",
      },
      {
        heading: "3. Less Than 14 Days",
        text: "Cancellations made less than 14 days before departure are non-refundable due to reserved liveaboard berths, island lodging, and boat logistics. Bookings are fully transferable to another eligible diver.",
      },
      {
        heading: "4. Weather & Safety Cancellations",
        text: "If an expedition or dive excursion is canceled by Purva Ocean Adventures due to severe sea conditions or maritime authority restrictions, guests will receive a priority reschedule or full refund for unrendered dives.",
      },
    ],
  },
};

/**
 * Site Ending / Footer:
 * - Architectural curved top transition from dark ocean to ocean mist.
 * - Official brand logo lockup matching user's reference image (/brand/purva-navy-logo.png).
 * - Three-column layout: Quick Links, Contact, and Social Links.
 * - Removed unwanted DAN & PADI badges per red-pen markup.
 * - Removed bottom right "Maafushi, Maldives..." tag per red-pen markup.
 * - Clean copyright bar.
 */
export function SiteFooter({
  settings,
  whatsappUrl,
}: {
  settings: SiteSettings | null;
  whatsappUrl?: string | null;
}) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const activePolicy = activeModal ? POLICY_DETAILS[activeModal] : null;
  const waLink = whatsappUrl && whatsappUrl !== "https://wa.me/" ? whatsappUrl : "https://wa.me/916262323232";
  const igLink = settings?.socialLinks?.instagram || "https://instagram.com/purvaoceanadventures";
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="relative w-full bg-[#043358] select-none text-[#011832] overflow-hidden">
        {/* ─────────────────────────────────────────────────────────────
            CURVED ARCH TRANSITION:
            Graceful downward concave curve separating the dark ocean above
            from the serene ocean-mist footer below.
        ───────────────────────────────────────────────────────────── */}
        <div className="w-full overflow-hidden leading-none -mb-[1px]">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 md:h-20 lg:h-24 text-[#CCDDE2] block"
          >
            <path
              d="M0,15 Q720,80 1440,15 L1440,90 L0,90 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MAIN FOOTER BODY (Soft Ocean Mist #CCDDE2)
        ───────────────────────────────────────────────────────────── */}
        <div className="w-full bg-[#CCDDE2] pt-3 sm:pt-5 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            {/* 
              OFFICIAL PURVA BRAND LOGO:
              Using the exact authentic artwork from the user's reference image
              (Shark leaping over wave + PURVA + OCEAN ADVENTURES + DISCOVER • DIVE • CONNECT)
              rendered cleanly in dark navy on transparent background.
            */}
            <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
              <Link
                href="/"
                aria-label="Purva Ocean Adventures — Home"
                className="group relative inline-flex items-center justify-center transition-transform hover:scale-[1.02] duration-300"
              >
                <div className="relative w-56 sm:w-72 md:w-80 h-28 sm:h-36 md:h-40 flex items-center justify-center">
                  <Image
                    src="/brand/purva-navy-logo.png"
                    alt="Purva Ocean Adventures — Discover • Dive • Connect"
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Three Columns Layout Matching the Reference */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 pt-2 border-t border-[#011832]/15">
              {/* ─────────────────────────────────────────────────────────────
                  COLUMN 1: QUICK LINKS (4 Cols)
              ───────────────────────────────────────────────────────────── */}
              <div className="md:col-span-4 flex flex-col">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#011832] mb-4 tracking-tight">
                  Quick Links
                </h3>
                <ul className="flex flex-col space-y-2.5 text-sm text-[#183952]">
                  <li>
                    <Link
                      href="/#upcoming-trips"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Book Upcoming Trips
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#upcoming-trips"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Our Trips
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#courses"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Courses & Certifications
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses/open-water-diver"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      PADI Open Water
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#gallery"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Ocean Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#about"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#faq"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                </ul>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  COLUMN 2: CONTACT & POLICIES (4 Cols)
              ───────────────────────────────────────────────────────────── */}
              <div className="md:col-span-4 flex flex-col">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#011832] mb-4 tracking-tight">
                  Contact
                </h3>
                <ul className="flex flex-col space-y-2.5 text-sm text-[#183952]">
                  <li>
                    <a
                      href="mailto:purvaoceanadventures@gmail.com"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Email Us
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/policies#terms"
                      className="text-left hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/policies#privacy"
                      className="text-left hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/policies#cancellation"
                      className="text-left hover:text-[#011832] hover:underline underline-offset-4 transition-colors"
                    >
                      Cancellation Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contact"
                      className="hover:text-[#011832] hover:underline underline-offset-4 transition-colors font-medium text-[#00528a]"
                    >
                      Get in touch &rarr;
                    </Link>
                  </li>
                </ul>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  COLUMN 3: SOCIAL LINKS (4 Cols)
                  (Unneeded DAN and PADI badges removed per markup)
              ───────────────────────────────────────────────────────────── */}
              <div className="md:col-span-4 flex flex-col">
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.22em] text-[#011832] mb-4">
                  SOCIAL LINKS:
                </h3>

                {/* Circular Social Icons */}
                <div className="flex items-center gap-3">
                  {/* Instagram Circle */}
                  <a
                    href={igLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram (opens in a new tab)"
                    className="inline-flex size-10 items-center justify-center rounded-full border-2 border-[#011832] text-[#011832] hover:bg-[#011832] hover:text-[#CCDDE2] transition-all hover:scale-105"
                  >
                    <svg className="size-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* WhatsApp Circle */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp (opens in a new tab)"
                    className="inline-flex size-10 items-center justify-center rounded-full border-2 border-[#011832] text-[#011832] hover:bg-[#011832] hover:text-[#CCDDE2] transition-all hover:scale-105"
                  >
                    <svg className="size-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.45 0-2.87-.39-4.13-1.12l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.43c0-4.55 3.69-8.24 8.25-8.24m4.53 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                BOTTOM COPYRIGHT BAR
                (Removed "Maafushi, Maldives..." per markup)
            ───────────────────────────────────────────────────────────── */}
            <div className="mt-10 pt-5 border-t border-[#011832]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#1a3b54]/80">
              <p>© {year} PURVA OCEAN ADVENTURES. All rights reserved.</p>
              <p className="text-[0.68rem] text-[#1a3b54]/70 font-medium">Last updated: November 2026</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          POLICY DETAILS MODAL (Terms, Privacy, Cancellation)
      ───────────────────────────────────────────────────────────── */}
      {activePolicy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#011832] border border-sky-400/30 p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-sky-400/20 pb-4 mb-5">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {activePolicy.title}
                </h3>
                <p className="text-xs sm:text-sm text-sky-200/70 mt-1">
                  {activePolicy.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-sm text-sky-100/90 leading-relaxed">
              {activePolicy.sections.map((sec, idx) => (
                <div key={idx} className="rounded-xl bg-[#032545]/60 p-4 border border-sky-300/15">
                  <h4 className="font-sans font-bold text-sky-200 text-sm mb-1.5">
                    {sec.heading}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80">{sec.text}</p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-sky-400/20 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-xl bg-[#E8C58F] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#010F20] hover:bg-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
