"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { WhatsAppIcon } from "@/components/layout/BrandIcons";
import { OFFICIAL_WHATSAPP_NUMBER } from "@/lib/integrations/whatsapp";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
  category?: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need to know how to swim to go scuba diving?",
    answer:
      "For PADI Open Water certification, you need to meet basic swimming and floating requirements. However, certain supervised introductory scuba experiences may be available for non-swimmers, depending on the dive centre and programme.",
    icon: "mask",
  },
  {
    id: "faq-2",
    question: "Can I join a dive trip without being certified?",
    answer:
      "Absolutely! Our expeditions welcome both beginners and certified divers, depending on the trip. You can begin your scuba journey with a PADI Open Water course or join us for recreational dives if you're already certified.",
    icon: "shield",
  },
  {
    id: "faq-3",
    question: "Is scuba diving safe for beginners?",
    answer:
      "Scuba diving is an adventure that requires proper training and safety precautions. We work with qualified dive professionals and prioritise appropriate equipment, safety procedures, and personalised guidance throughout your experience.",
    icon: "safety",
  },
  {
    id: "faq-4",
    question: "What if I'm nervous about diving underwater?",
    answer:
      "That's completely normal! Many divers feel nervous before their first dive. Your instructor will guide you through the equipment, breathing techniques, and essential skills, allowing you to progress at a comfortable pace.",
    icon: "waves",
  },
  {
    id: "faq-5",
    question: "What is the difference between Open Water and Advanced Open Water?",
    answer:
      "PADI Open Water Diver is your first certification, teaching you essential diving skills and qualifying eligible adults to dive up to 18 metres.\n\nPADI Advanced Open Water Diver builds your confidence and experience through different adventure dives, including deeper diving, with a maximum training depth of 30 metres for eligible adults.",
    icon: "award",
  },
  {
    id: "faq-6",
    question: "Will I get to see sharks, manta rays, or turtles?",
    answer:
      "The ocean is full of surprises! Depending on the destination and diving conditions, you may encounter reef sharks, manta rays, turtles, colourful fish, and incredible coral reefs.\n\nWildlife encounters are never guaranteed, but that's part of what makes every dive special.",
    icon: "marine",
  },
  {
    id: "faq-7",
    question: "Can I join as a solo traveller?",
    answer:
      "Of course! Some of the best ocean friendships begin with strangers.\n\nOur small-group expeditions are designed to bring together solo travellers, couples, friends, and ocean lovers who share a passion for adventure.\n\nCome solo, leave with stories and new friendships.",
    icon: "user",
  },
  {
    id: "faq-8",
    question: "How many people are there in each expedition?",
    answer:
      "We believe in quality experiences over large crowds.\n\nOur current Maafushi, Maldives expedition is limited to a maximum of 10 participants, allowing for a more personal, comfortable, and connected group experience.",
    icon: "team",
  },
  {
    id: "faq-9",
    question: "Is scuba diving equipment included in the package?",
    answer:
      "Yes! Our current Maldives diving packages include essential equipment such as a BCD, regulator, mask, fins, wetsuit, tanks, and weights.\n\nCertain additional equipment, including dive computers, may be available at an extra rental cost.\n\nExact inclusions are mentioned in each expedition brochure.",
    icon: "gear",
  },
  {
    id: "faq-10",
    question: "Do I need scuba diving insurance?",
    answer:
      "Yes. Appropriate scuba diving insurance is mandatory for our current Maldives expedition.\n\nWe recommend choosing coverage that includes diving-related medical emergencies and evacuation, appropriate to your planned diving activities.",
    icon: "cross",
  },
  {
    id: "faq-11",
    question: "How long should I wait before flying after scuba diving?",
    answer:
      "For recreational no-decompression diving, common guidance recommends waiting at least 12 hours after a single dive and at least 18 hours after multiple dives or multiple days of diving.\n\nLonger intervals may be advisable depending on your dive profile. Our itineraries are planned with appropriate time between the final dive and departure.",
    icon: "plane",
  },
  {
    id: "faq-12",
    question: "How can I book an expedition with Purva Ocean Adventures?",
    answer:
      "It's simple!\n\nExplore our upcoming expeditions, choose the experience that suits you, and reach out through WhatsApp or our website enquiry form.\n\nWe'll guide you through package details, availability, booking requirements, and everything you need to prepare for your ocean adventure.",
    icon: "book",
  },
];

function FaqIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "mask":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h16a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-2a2 2 0 0 1 2-2Z" />
          <path d="M7 11a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 12 11" />
          <path d="M12 11a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5" />
          <path d="M12 14v4" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "safety":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        </svg>
      );
    case "waves":
    case "wave":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c3.5-3 6.5-3 10 0s6.5 3 10 0" />
          <path d="M2 12c3.5-3 6.5-3 10 0s6.5 3 10 0" />
          <path d="M2 18c3.5-3 6.5-3 10 0s6.5 3 10 0" />
        </svg>
      );
    case "award":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case "marine":
    case "fish":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 12c.94-2.07 3.1-3.5 5.5-3.5s4.56 1.43 5.5 3.5c-.94 2.07-3.1 3.5-5.5 3.5s-4.56-1.43-5.5-3.5Z" />
          <path d="M2 16s3-1 4-4-4-4-4-4 2 2 4 4-2 4-4 4Z" />
          <circle cx="14.5" cy="11.5" r=".5" fill="currentColor" />
        </svg>
      );
    case "user":
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "team":
    case "group":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "gear":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "cross":
    case "medical":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      );
    case "plane":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      );
    case "book":
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      );
  }
}

/**
 * FAQ Showcase Component:
 * - Left side background: Whale shark ocean photo (faq-whale-shark.jpg) with seamless dark navy blend.
 * - Left column: Refined serif "FAQ", italic sky-blue subtitle, clean descriptive body.
 * - Right column: Sleek translucent pill accordion showing all 12 questions cleanly aligned with outline icons.
 * - Bottom: 4 centered feature pillars separated by subtle vertical hairlines.
 */
export function FaqShowcase({ initialFaqs }: { initialFaqs?: FaqItem[] } = {}) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs && initialFaqs.length > 0 ? initialFaqs : FAQS);
  const [openId, setOpenId] = useState<string>("faq-1");

  useEffect(() => {
    fetch("/api/admin/content?resource=faq")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.faqs) && data.data.faqs.length > 0) {
          setFaqs(data.data.faqs);
        }
      })
      .catch(() => {});
  }, []);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section
      id="faq"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-between overflow-hidden bg-[#02162e] text-white select-none scroll-mt-20 pt-16 sm:pt-20 pb-3 sm:pb-4"
    >
      {/* Background Whale Shark Image strictly positioned on the left with soft ocean gradient feathering */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[48vw] sm:w-[50vw] lg:w-[52vw] max-w-[740px] overflow-hidden select-none z-0">
        <Image
          src="/media/faq-whale-shark.jpg"
          alt="Whale shark diving gracefully into deep ocean blue with streaming sunbeams"
          fill
          priority
          sizes="(max-width: 1024px) 52vw, 740px"
          className="object-cover object-center opacity-85"
        />
        {/* Soft gradient feathering to the right into deep ocean background */}
        <div className="absolute inset-y-0 right-0 w-2/5 sm:w-1/2 bg-gradient-to-l from-[#02162e] via-[#02162e]/75 to-transparent" />
        {/* Soft left readability shade so typography pops crisply over sunlit shark */}
        <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#02162e]/70 via-[#02162e]/25 to-transparent" />
        {/* Soft gradient feathering to the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#02162e] to-transparent" />
        {/* Soft gradient feathering to the top */}
        <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-[#02162e]/65 to-transparent" />
      </div>

      {/* Subtle ambient ocean glow behind right-side FAQ pills */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[520px] w-[520px] rounded-full bg-[#0284c7]/15 blur-[140px] z-0" />

      {/* Main Split Grid (Left: Typography & Direct Help Card, Right: Interactive FAQ Pill Accordion) */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-7xl flex-1 min-h-0 items-center justify-center px-6 sm:px-10 lg:px-16 py-2">
        <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Left Column (5 Cols): Clean Editorial Typography + Direct Talk Diving Block */}
          <div className="flex flex-col justify-center lg:col-span-5 pr-0 lg:pr-4">
            {/* Eyebrow with extending fine hairline */}
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <p className="text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.26em] uppercase text-sky-200/85 whitespace-nowrap">
                FREQUENTLY ASKED QUESTIONS
              </p>
              <span className="h-px flex-1 max-w-[110px] bg-sky-300/45 inline-block" />
            </div>

            {/* Headline: Crisp Classic Serif */}
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] font-normal tracking-tight text-white leading-none drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
              FAQ
            </h2>

            {/* Italic Subtitle */}
            <p className="mt-3 sm:mt-4 font-serif text-lg sm:text-xl lg:text-[1.45rem] italic font-light text-[#72BDF0] tracking-wide leading-[1.28] max-w-sm">
              Everything you need to know before diving with us.
            </p>

            {/* Concise Body Copy */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-[0.84rem] text-sky-100/85 font-light leading-relaxed max-w-xs sm:max-w-sm drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              From certifications and safety to trip planning and what to expect underwater — here are answers to the most common questions.
            </p>

            {/* Direct Assistance Card filling the lower-left space gracefully */}
            <div className="mt-5 sm:mt-6 rounded-2xl border border-sky-300/25 bg-[#031932]/65 p-4 sm:p-5 backdrop-blur-md shadow-[0_12px_32px_rgba(1,15,32,0.5)] max-w-sm">
              <p className="font-serif text-lg sm:text-xl font-medium text-white leading-snug">
                Still have questions?
              </p>
              <p className="mt-1 text-xs sm:text-[0.82rem] text-sky-100/85 font-light leading-relaxed">
                We&apos;re always happy to talk diving! Want to ask something else or discuss your dive plans? Let&apos;s plan your next ocean adventure.
              </p>
              <p className="mt-2.5 text-[0.65rem] font-bold tracking-[0.26em] uppercase text-[#72BDF0]">
                DISCOVER. DIVE. CONNECT.
              </p>

              {/* Action Links: WhatsApp & Contact Us */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hello Purva Ocean Adventures! I have a question and would love to discuss my next ocean adventure."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E8C58F] hover:bg-white text-[#010F20] px-4 py-2 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="size-3.5 fill-current text-[#010F20]" />
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/35 bg-sky-400/10 hover:bg-sky-400/20 hover:border-sky-300/60 text-sky-100 px-4 py-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Contact Us</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Translucent Pill Accordion with Outline Icons */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="space-y-1.5">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={cn(
                      "border transition-all duration-300 overflow-hidden backdrop-blur-sm",
                      isOpen
                        ? "rounded-2xl bg-[#042343]/75 border-sky-300/40 shadow-[0_8px_28px_rgba(2,132,199,0.18)]"
                        : "rounded-full bg-[#031932]/55 border-sky-300/25 hover:border-sky-300/45 hover:bg-[#04213f]/75",
                    )}
                  >
                    {/* Accordion Header Row */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 text-left cursor-pointer",
                        isOpen ? "px-4 pt-3 pb-1.5" : "px-4 py-1.5 sm:py-[7px]",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Outline Icon without enclosing box */}
                        <FaqIcon
                          type={faq.icon}
                          className={cn(
                            "size-[17px] sm:size-[18px] shrink-0 transition-colors duration-300",
                            isOpen ? "text-sky-200" : "text-sky-200/80",
                          )}
                        />

                        {/* Question Text */}
                        <span
                          className={cn(
                            "text-xs sm:text-[0.82rem] tracking-normal leading-snug truncate",
                            isOpen ? "font-medium text-white" : "font-normal text-white/95",
                          )}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* Subtle Expand / Collapse Chevron */}
                      <div
                        className={cn(
                          "size-5 flex items-center justify-center text-sky-200/75 shrink-0 transition-transform duration-300",
                          isOpen ? "rotate-180 text-white" : "rotate-0",
                        )}
                      >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {/* Accordion Answer Content — cleanly indented directly under the question */}
                    {isOpen && (
                      <div className="pl-[2.85rem] pr-5 pb-3 pt-0.5 text-[0.72rem] sm:text-[0.76rem] text-sky-100/80 font-light leading-relaxed">
                        <div className="space-y-1.5 whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Centered Feature Pillars Matching Reference Alignment */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 shrink-0 pt-2.5 border-t border-sky-300/15">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-0.5">
          {/* Pillar 1: Ocean First */}
          <div className="group flex flex-col items-center text-center px-2 sm:px-4 md:border-r border-sky-300/20">
            <div className="mb-1 text-sky-200/90 transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8c3.5-2.5 6.5-2.5 10 0s6.5 2.5 10 0" />
                <path d="M2 13c3.5-2.5 6.5-2.5 10 0s6.5 2.5 10 0" />
                <path d="M2 18c3.5-2.5 6.5-2.5 10 0s6.5 2.5 10 0" />
              </svg>
            </div>
            <h3 className="text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
              OCEAN FIRST
            </h3>
            <p className="mt-1 text-[0.6rem] sm:text-[0.66rem] text-sky-100/70 font-light leading-tight max-w-[200px]">
              We put the ocean and its ecosystems at the heart of everything we do.
            </p>
          </div>

          {/* Pillar 2: A Community */}
          <div className="group flex flex-col items-center text-center px-2 sm:px-4 md:border-r border-sky-300/20">
            <div className="mb-1 text-sky-200/90 transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="3" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <circle cx="5" cy="10" r="2.2" />
                <path d="M1.5 21v-1.5a3 3 0 0 1 3-3H5" />
                <circle cx="19" cy="10" r="2.2" />
                <path d="M22.5 21v-1.5a3 3 0 0 0-3-3H19" />
              </svg>
            </div>
            <h3 className="text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
              A COMMUNITY
            </h3>
            <p className="mt-1 text-[0.6rem] sm:text-[0.66rem] text-sky-100/70 font-light leading-tight max-w-[200px]">
              We create a space for divers, travellers and ocean lovers to connect.
            </p>
          </div>

          {/* Pillar 3: Real Experiences */}
          <div className="group flex flex-col items-center text-center px-2 sm:px-4 md:border-r border-sky-300/20">
            <div className="mb-1 text-sky-200/90 transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.5" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
              </svg>
            </div>
            <h3 className="text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
              REAL EXPERIENCES
            </h3>
            <p className="mt-1 text-[0.6rem] sm:text-[0.66rem] text-sky-100/70 font-light leading-tight max-w-[200px]">
              Small groups, meaningful trips and authentic adventures across incredible destinations.
            </p>
          </div>

          {/* Pillar 4: Safety & Excellence */}
          <div className="group flex flex-col items-center text-center px-2 sm:px-4">
            <div className="mb-1 text-sky-200/90 transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-6" />
                <path d="M12 16a4 4 0 0 0-4-4V7a2 2 0 1 1 4 0" />
                <path d="M12 16a4 4 0 0 1 4-4V5a2 2 0 1 0-4 0" />
                <path d="M8 12a4 4 0 0 0-4-4V5a2 2 0 1 1 4 0" />
                <path d="M16 12a4 4 0 0 1 4-4V7a2 2 0 1 0-4 0" />
              </svg>
            </div>
            <h3 className="text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
              SAFETY & EXCELLENCE
            </h3>
            <p className="mt-1 text-[0.6rem] sm:text-[0.66rem] text-sky-100/70 font-light leading-tight max-w-[200px]">
              World-class training, professional guides and a strong focus on responsible diving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

