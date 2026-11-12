"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ReelItem {
  id: string;
  url: string;
  image: string;
  alt: string;
}

const INSTAGRAM_REELS: ReelItem[] = [
  {
    id: "reel-1",
    url: "https://www.instagram.com/reel/DeuMANFKgi7/?rpxt=cTVieWg1b2R4dDEy",
    image: "/media/insta-post-1.jpg",
    alt: "Manta ray gliding beneath sunlit ocean surface over coral reef",
  },
  {
    id: "reel-2",
    url: "https://www.instagram.com/reel/DesAMH2KMZN/?obrf=MTFrcjVrdWhoOXFk",
    image: "/media/insta-post-2.jpg",
    alt: "Scuba diver soaring gracefully over colorful reef beneath ocean sunbeams",
  },
  {
    id: "reel-3",
    url: "https://www.instagram.com/reel/Demuzw9qD9P/?psln=cDNuODhwd3NpZXJo",
    image: "/media/insta-post-3.jpg",
    alt: "Hawksbill sea turtle gliding through sunlit turquoise waters",
  },
  {
    id: "reel-4",
    url: "https://www.instagram.com/reel/DeXHOHetfiC/?xtok=MTZ4b3plM2puZGR0aA==",
    image: "/media/insta-post-4.jpg",
    alt: "Vibrant hard coral formations and orange reef fish bathed in sunlight",
  },
  {
    id: "reel-5",
    url: "https://www.instagram.com/reel/DeUXK8QNXsX/?srtk=MWR5azd1Z3JkZWNjOQ==",
    image: "/media/insta-post-5.jpg",
    alt: "Scuba divers preparing dive gear aboard expedition boat in the Maldives",
  },
  {
    id: "reel-6",
    url: "https://www.instagram.com/reel/DeR9_69KvNJ/?exln=MTJ2bmJ4OHoyZjA5Yw==",
    image: "/media/insta-post-6.jpg",
    alt: "Aerial view of tropical island paradise surrounded by turquoise lagoon and boats",
  },
];

const INSTAGRAM_PROFILES = [
  {
    label: "OFFICIAL BRAND ACCOUNT",
    handle: "@purvaoceanadventures",
    url: "https://www.instagram.com/purvaoceanadventures?vrfl=cTZjNmw4ZncwdHB0",
  },
  {
    label: "DR. PURVA THORAT",
    handle: "@dr.purvaa",
    url: "https://www.instagram.com/dr.purvaa?obrf=bjBncnJpcXgxZW03",
  },
];

/**
 * Instagram Showcase Component:
 * - Exact visual parity with user's reference mockup:
 *   - Clean white canvas with subtle bottom-left fish silhouettes & sweeping wave arc.
 *   - Left column: Eyebrow + sky hairline, serif "Follow On" (#0A2444) / "Instagram" (#4EA2DF),
 *     concise body copy, 3-wave cyan glyph, and two rounded pill profile cards with solid navy circular badges.
 *   - Right column: 3x2 grid of the exact 6 borderless photography tiles linking directly to real Instagram Reels,
 *     with centered caption directly underneath.
 */
export function InstagramShowcase() {
  const [reels, setReels] = useState<ReelItem[]>(INSTAGRAM_REELS);
  const [handleUrl, setHandleUrl] = useState("https://www.instagram.com/purvaoceanadventures?vrfl=cTZjNmw4ZncwdHB0");
  const [founderUrl, setFounderUrl] = useState("https://www.instagram.com/dr.purvaa?obrf=bjBncnJpcXgxZW03");

  useEffect(() => {
    fetch("/api/admin/content?resource=instagram")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.instagram?.reels?.length) {
          const mapped: ReelItem[] = data.data.instagram.reels.map((r: Record<string, string>, idx: number) => ({
            id: r.id || `reel-${idx + 1}`,
            url: r.url || INSTAGRAM_REELS[idx]?.url,
            image: r.thumbnail || INSTAGRAM_REELS[idx]?.image,
            alt: r.caption || r.title || INSTAGRAM_REELS[idx]?.alt || `Purva Ocean Adventures Reel ${idx + 1}`,
          }));
          setReels(mapped);
          if (data.data.instagram.handleUrl) setHandleUrl(data.data.instagram.handleUrl);
          if (data.data.instagram.founderHandleUrl) setFounderUrl(data.data.instagram.founderHandleUrl);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="instagram"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-between overflow-hidden bg-white text-[#0A2444] select-none scroll-mt-20 pt-20 sm:pt-24 pb-6 sm:pb-8"
    >
      {/* Subtle Mockup Background Decorative Elements (Soft school of fish & delicate wave arc) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft sweeping ocean arc line at bottom */}
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          preserveAspectRatio="none"
          className="absolute bottom-0 inset-x-0 w-full h-24 sm:h-32 text-[#DCEBF5]"
          aria-hidden="true"
        >
          <path
            d="M0,120 Q360,25 720,110 T1440,80"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
        </svg>

        {/* Subtle school of tiny fish silhouettes in bottom-left */}
        <svg
          viewBox="0 0 220 120"
          fill="currentColor"
          className="absolute bottom-4 left-6 sm:left-12 w-36 sm:w-48 text-[#D8ECF7] opacity-80"
          aria-hidden="true"
        >
          <path d="M25,75 c8,-5 16,-4 22,0 l6,-4 l-2,4 l2,4 l-6,-4 c-6,4 -14,5 -22,0 z" />
          <path d="M55,60 c7,-4 14,-3 19,0 l5,-3 l-1.5,3 l1.5,3 l-5,-3 c-5,3 -12,4 -19,0 z" />
          <path d="M45,92 c6,-4 12,-3 17,0 l4,-3 l-1,3 l1,3 l-4,-3 c-5,3 -11,4 -17,0 z" />
          <path d="M85,82 c8,-5 15,-4 21,0 l5,-4 l-1.5,4 l1.5,4 l-5,-4 c-6,4 -13,5 -21,0 z" />
          <path d="M98,55 c6,-4 11,-3 16,0 l4,-3 l-1,3 l1,3 l-4,-3 c-5,3 -10,4 -16,0 z" />
          <path d="M125,72 c7,-4 14,-3 19,0 l5,-3 l-1.5,3 l1.5,3 l-5,-3 c-5,3 -12,4 -19,0 z" />
          <path d="M115,98 c6,-3.5 11,-2.5 16,0 l4,-2.5 l-1,2.5 l1,2.5 l-4,-2.5 c-5,2.5 -10,3.5 -16,0 z" />
          <path d="M155,88 c5,-3 10,-2 14,0 l3.5,-2 l-1,2 l1,2 l-3.5,-2 c-4,2 -9,3 -14,0 z" />
        </svg>
      </div>

      {/* Main Split Grid (Left: Content & Profile Cards, Right: 3x2 Photos Grid + Caption) */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-7xl flex-1 min-h-0 items-center justify-center px-6 sm:px-10 lg:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Left Column (5 Cols): Exact Typography, Wavy Divider & Profile Pill Cards */}
          <div className="flex flex-col justify-center lg:col-span-5 pr-0 lg:pr-2">
            {/* Eyebrow with extending fine blue hairline rule */}
            <div className="flex items-center gap-4 mb-3 sm:mb-4">
              <p className="text-[0.68rem] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#566C80] whitespace-nowrap">
                FOLLOW THE OCEAN JOURNEY
              </p>
              <span className="h-px flex-1 max-w-[120px] bg-[#96C2DF] inline-block" />
            </div>

            {/* Headline: Classic upright Serif ("Follow On" dark navy, "Instagram" sky blue) */}
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[3.35rem] lg:text-[3.6rem] font-medium tracking-tight text-[#0A2444] leading-[1.03]">
              Follow On
              <span className="block font-normal text-[#4EA2DF] mt-0.5">
                Instagram
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-[0.94rem] text-[#354D66] font-normal leading-relaxed max-w-md">
              Dive stories, underwater photography, and the people behind each expedition.
              Follow both our official expedition space and Dr. Purva&apos;s personal journey.
            </p>

            {/* 3 Stacked Ocean Wavy Lines Ornament matching mockup */}
            <div className="mt-4 sm:mt-5 mb-4 sm:mb-5 text-[#7EB6D9]" aria-hidden="true">
              <svg viewBox="0 0 48 20" className="w-11 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M2 4c4-2.5 8-2.5 12 0s8 2.5 12 0 8-2.5 12 0 6 2 8 0" />
                <path d="M2 10c4-2.5 8-2.5 12 0s8 2.5 12 0 8-2.5 12 0 6 2 8 0" />
                <path d="M2 16c4-2.5 8-2.5 12 0s8 2.5 12 0 8-2.5 12 0 6 2 8 0" />
              </svg>
            </div>

            {/* Two Profile Direct Action Cards matching exact mockup pills */}
            <div className="flex flex-col gap-3 sm:gap-3.5 max-w-[420px]">
              {INSTAGRAM_PROFILES.map((profile) => (
                <a
                  key={profile.handle}
                  href={profile.handle.includes("purvaocean") ? handleUrl : founderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3.5 rounded-[20px] border border-[#C6D9E6] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_6px_22px_rgba(10,36,68,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4EA2DF] hover:shadow-[0_12px_30px_rgba(78,162,223,0.16)] cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Solid Deep Navy Circular Instagram Badge matching mockup */}
                    <div className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-[#0B2D4E] text-white shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#4EA2DF]">
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </div>

                    {/* Profile Details */}
                    <div className="min-w-0">
                      <p className="text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-[#6D8296] group-hover:text-[#4EA2DF] transition-colors truncate">
                        {profile.label}
                      </p>
                      <p className="font-serif text-base sm:text-[1.12rem] font-medium text-[#0A2444] tracking-tight truncate leading-snug">
                        {profile.handle}
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <div className="flex size-7 items-center justify-center text-[#2D4863] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#4EA2DF]">
                    <span className="text-base leading-none">&rarr;</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column (7 Cols): 3x2 Grid of 6 Exact Mockup Photos + Bottom Caption */}
          <div className="flex flex-col items-center justify-center lg:col-span-7">
            <div className="w-full max-w-[660px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5">
                {reels.map((reel) => (
                  <a
                    key={reel.id}
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Watch on Instagram"
                    className="group relative aspect-[1.1/1] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 shadow-[0_6px_20px_rgba(10,36,68,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(78,162,223,0.22)] cursor-pointer"
                  >
                    {/* Clean Edge-to-Edge Thumbnail Image */}
                    <Image
                      src={reel.image}
                      alt={reel.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Play Overlay appears cleanly on hover only so resting grid matches mockup 1:1 */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-white/95 text-[#0B2D4E] shadow-lg backdrop-blur-sm transition-transform duration-300 scale-75 group-hover:scale-100">
                        <svg className="size-5 translate-x-0.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Exact Centered Caption Directly Beneath the 3x2 Grid */}
              <p className="mt-3 sm:mt-3.5 text-[0.7rem] sm:text-xs text-[#6B8094] text-center font-normal">
                Authentic photography from our Maldivian expeditions. Click any moment to visit our verified Instagram profiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
