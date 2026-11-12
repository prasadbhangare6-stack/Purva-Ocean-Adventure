"use client";

import { OceanAtmosphere } from "@/components/ui/OceanAtmosphere";

/**
 * About Showcase Component:
 * - Left side: Looping ocean diving video (/media/about-video.mp4)
 *   with soft feathering into the ocean blue background.
 * - Right side: Complete brand story shifted upward and aligned cleanly to fit the full viewport.
 * - Background: Rich oceanic atmosphere infused with luminous sky-blue radial glow and caustics.
 * - Bottom: 4 feature pillars (Ocean First, A Community, Real Experiences, Safety & Excellence).
 */
export function AboutShowcase() {
  return (
    <section
      id="about"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-between overflow-hidden bg-[#02162e] text-white select-none scroll-mt-20 pt-16 sm:pt-20 pb-3 sm:pb-4"
    >
      {/* Background Field with Radiant Sky Blue Oceanic Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base deep marine gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#03284f] via-[#021832] to-[#010d1c]" />

        {/* Luminous Sky Blue Radial Glow in top-right behind the content */}
        <div className="absolute -top-20 right-0 h-[650px] w-[650px] rounded-full bg-[#0284c7]/25 blur-[130px]" />

        {/* Radiant Sky Blue Caustic Glow at top-left behind the video */}
        <div className="absolute -top-24 -left-20 h-[550px] w-[550px] rounded-full bg-[#38bdf8]/30 blur-[120px]" />

        {/* Ambient Sky Blue Center Glow */}
        <div className="absolute top-1/3 left-1/3 h-[500px] w-[500px] rounded-full bg-[#0ea5e9]/18 blur-[140px]" />

        {/* Overhead water surface light gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(56,189,248,0.28),transparent_70%)]" />

        {/* Soft bottom ocean gradient */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#010c1a] via-[#021832]/60 to-transparent" />
      </div>

      {/* Floating Micro-Bubbles Atmosphere */}
      <OceanAtmosphere className="z-0 opacity-70" />

      {/* Main Split Grid (Left: Looping Video, Right: Story & Content shifted up to fit cleanly) */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 sm:px-10 lg:px-16 lg:grid-cols-12 lg:gap-8 xl:gap-12 pt-1 pb-2 flex-1 min-h-0">
        {/* Left 5 Columns: Attached Looping Video with Cinematic Ocean Blend */}
        <div className="relative order-2 lg:order-1 lg:col-span-5 h-[260px] sm:h-[340px] lg:h-[44vh] max-h-[420px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(2,132,199,0.24)] border border-sky-400/25 bg-[#011425]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/media/P4.jpg"
            className="size-full object-cover object-center scale-[1.02] transition-transform duration-700 hover:scale-105"
          >
            <source src="/media/about-video.mp4" type="video/mp4" />
          </video>
          {/* Soft ocean gradient feathering on the edges to blend into background */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 sm:w-1/4 bg-gradient-to-l from-[#021832]/75 via-[#021832]/25 to-transparent hidden lg:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 sm:h-1/4 bg-gradient-to-t from-[#021832]/75 via-[#021832]/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-[#021832]/30 to-transparent" />
        </div>

        {/* Right 7 Columns: Brand Narrative shifted slightly upward with crisp vertical fit */}
        <div className="relative order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-2.5 text-left lg:pl-6 xl:pl-10">
          {/* Eyebrow with extending horizontal hairline rule */}
          <div className="flex items-center gap-3">
            <span className="text-[0.68rem] sm:text-xs font-bold tracking-[0.26em] uppercase text-sky-300 drop-shadow-[0_1px_8px_rgba(56,189,248,0.4)]">
              ABOUT US
            </span>
            <div className="h-[1px] flex-1 max-w-[140px] sm:max-w-[220px] bg-gradient-to-r from-sky-400/90 to-transparent" />
          </div>

          {/* Headline & Tagline */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] font-bold uppercase tracking-tight leading-[1.04]">
              <span className="text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">PURVA OCEAN</span>
              <br />
              <span className="text-[#60a5fa] drop-shadow-[0_2px_16px_rgba(96,165,250,0.45)]">
                ADVENTURES
              </span>
            </h1>
            <p className="mt-1 font-serif text-xs sm:text-sm md:text-[0.95rem] italic font-light text-sky-100/95 tracking-wide">
              Every great story begins somewhere.
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-[0.78rem] md:text-[0.82rem] text-slate-200/90 font-normal leading-relaxed">
            <p>
              In Sanskrit, Purva means first and East, the direction of the rising sun.
              <br />
              To us, it represents the beauty of beginning something new.
            </p>

            <div className="space-y-0.5 text-white font-medium pl-1">
              <p>&bull; A new adventure.</p>
              <p>&bull; A new friendship.</p>
              <p>&bull; A new way of seeing the world.</p>
            </div>

            <p>
              We started Purva Ocean Adventures with a simple belief: the ocean is too extraordinary to experience alone. So we bring together people who are curious about the world, excited by the unknown, and ready to create stories worth telling.
            </p>

            <p>
              Whether it&apos;s your very first dive or your hundredth, there&apos;s always something new waiting beneath the surface.
            </p>

            {/* Cyan-bordered Callout quote matching mockup */}
            <div className="border-l-2 border-sky-400 pl-3 sm:pl-3.5 py-0.5 space-y-0.5 text-sky-100 font-medium text-xs sm:text-[0.8rem] bg-sky-500/[0.06] rounded-r-xl">
              <p>Come for the ocean.</p>
              <p>Stay for the stories.</p>
              <p>Leave with a little more wonder.</p>
            </div>

            {/* Next Chapter sign-off */}
            <div className="pt-0.5 text-xs sm:text-[0.8rem]">
              <p className="text-slate-200/90">
                Your next chapter begins{" "}
                <a
                  href="#upcoming-trips"
                  className="font-semibold text-white underline underline-offset-4 decoration-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  here.
                </a>
              </p>
              <p className="mt-0.5 font-sans text-xs sm:text-[0.8rem] font-black tracking-[0.24em] text-white uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
                DISCOVER. DIVE. CONNECT.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Feature Pillars matching design mock */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 shrink-0 pt-2 border-t border-sky-400/20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 py-0.5">
          {/* Pillar 1: Ocean First */}
          <div className="group flex flex-col items-start pr-2 sm:pr-4 lg:border-r border-sky-400/15 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-sky-400/[0.06] hover:-translate-y-1 cursor-default">
            <div className="mb-1.5 sm:mb-2 inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300 border border-sky-400/30 shadow-[0_2px_10px_rgba(56,189,248,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8C58F] group-hover:text-[#010F20] group-hover:border-[#E8C58F]">
              <svg viewBox="0 0 24 24" className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M2 6c3.5-3 6.5-3 10 0s6.5 3 10 0" />
                <path d="M2 12c3.5-3 6.5-3 10 0s6.5 3 10 0" />
                <path d="M2 18c3.5-3 6.5-3 10 0s6.5 3 10 0" />
              </svg>
            </div>
            <h2 className="text-[0.7rem] sm:text-xs font-extrabold uppercase tracking-widest text-white transition-colors group-hover:text-[#bae6fd]">
              OCEAN FIRST
            </h2>
            <p className="mt-0.5 text-[0.65rem] sm:text-[0.7rem] text-sky-100/75 leading-snug">
              We put the ocean and its ecosystems at the heart of everything we do.
            </p>
          </div>

          {/* Pillar 2: A Community */}
          <div className="group flex flex-col items-start pr-2 sm:pr-4 lg:border-r border-sky-400/15 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-sky-400/[0.06] hover:-translate-y-1 cursor-default">
            <div className="mb-1.5 sm:mb-2 inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300 border border-sky-400/30 shadow-[0_2px_10px_rgba(56,189,248,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8C58F] group-hover:text-[#010F20] group-hover:border-[#E8C58F]">
              <svg viewBox="0 0 24 24" className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="3" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <circle cx="5" cy="10" r="2.5" />
                <path d="M1 21v-1.5a3.5 3.5 0 0 1 3.5-3.5H5" />
                <circle cx="19" cy="10" r="2.5" />
                <path d="M23 21v-1.5a3.5 3.5 0 0 0-3.5-3.5H19" />
              </svg>
            </div>
            <h2 className="text-[0.7rem] sm:text-xs font-extrabold uppercase tracking-widest text-white transition-colors group-hover:text-[#bae6fd]">
              A COMMUNITY
            </h2>
            <p className="mt-0.5 text-[0.65rem] sm:text-[0.7rem] text-sky-100/75 leading-snug">
              We create a space for divers, travellers and ocean lovers to connect and grow together.
            </p>
          </div>

          {/* Pillar 3: Real Experiences */}
          <div className="group flex flex-col items-start pr-2 sm:pr-4 lg:border-r border-sky-400/15 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-sky-400/[0.06] hover:-translate-y-1 cursor-default">
            <div className="mb-1.5 sm:mb-2 inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300 border border-sky-400/30 shadow-[0_2px_10px_rgba(56,189,248,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8C58F] group-hover:text-[#010F20] group-hover:border-[#E8C58F]">
              <svg viewBox="0 0 24 24" className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.25" />
              </svg>
            </div>
            <h2 className="text-[0.7rem] sm:text-xs font-extrabold uppercase tracking-widest text-white transition-colors group-hover:text-[#bae6fd]">
              REAL EXPERIENCES
            </h2>
            <p className="mt-0.5 text-[0.65rem] sm:text-[0.7rem] text-sky-100/75 leading-snug">
              Small groups, meaningful trips and authentic adventures across incredible destinations.
            </p>
          </div>

          {/* Pillar 4: Safety & Excellence */}
          <div className="group flex flex-col items-start p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-sky-400/[0.06] hover:-translate-y-1 cursor-default">
            <div className="mb-1.5 sm:mb-2 inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300 border border-sky-400/30 shadow-[0_2px_10px_rgba(56,189,248,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8C58F] group-hover:text-[#010F20] group-hover:border-[#E8C58F]">
              <svg viewBox="0 0 24 24" className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-6" />
                <path d="M12 16a4 4 0 0 0-4-4V7a2 2 0 1 1 4 0" />
                <path d="M12 16a4 4 0 0 1 4-4V5a2 2 0 1 0-4 0" />
                <path d="M8 12a4 4 0 0 0-4-4V5a2 2 0 1 1 4 0" />
                <path d="M16 12a4 4 0 0 1 4-4V7a2 2 0 1 0-4 0" />
              </svg>
            </div>
            <h2 className="text-[0.7rem] sm:text-xs font-extrabold uppercase tracking-widest text-white transition-colors group-hover:text-[#bae6fd]">
              SAFETY & EXCELLENCE
            </h2>
            <p className="mt-0.5 text-[0.65rem] sm:text-[0.7rem] text-sky-100/75 leading-snug">
              World-class training, professional guides and a strong focus on responsible diving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
