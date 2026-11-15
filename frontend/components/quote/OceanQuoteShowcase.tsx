"use client";

import Image from "next/image";

/**
 * Ocean Quote Showcase Page / Section:
 * Matches the user mockup exactly:
 * - Fullscreen background video of underwater sunbeams, shark, and marine life.
 * - Three stacked ocean wave glyph with flanking horizontal hairline rules.
 * - Exact quote:
 *     “The ocean is the giver...
 *      We are just visitors.”
 *   with Cormorant Garamond serif font, white first line and soft sky-blue italic second line.
 * - Centered bottom horizontal hairline rule.
 */
export function OceanQuoteShowcase() {
  return (
    <section
      id="ocean-quote"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#021020] select-none scroll-mt-20 pt-20 sm:pt-24 pb-3 sm:pb-5"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/media/ocean-quote-mock.jpg"
          className="size-full object-cover scale-[1.02]"
        >
          <source src="/media/V6.mp4" type="video/mp4" />
          <source src="/media/quote-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic soft vignette overlay so quote text is high-contrast and crystal-clear */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#010b17]/25 to-[#010b17]/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010b17]/50 via-transparent to-[#010b17]/40 pointer-events-none" />
      </div>

      {/* Centered Quote Container matching design mockup */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 sm:px-10 lg:px-16 flex-col items-center justify-center text-center animate-fade-up">
        {/* Top Ornament: Hairline rule + 3-wave glyph + Hairline rule */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-8">
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-white/70" />
          <svg
            viewBox="0 0 32 20"
            className="w-7 sm:w-9 h-4 sm:h-5 text-white/90 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M2 3.5c3.5-3 6.5-3 10 0s6.5 3 10 0 6-3 8-1" />
            <path d="M2 10c3.5-3 6.5-3 10 0s6.5 3 10 0 6-3 8-1" />
            <path d="M2 16.5c3.5-3 6.5-3 10 0s6.5 3 10 0 6-3 8-1" />
          </svg>
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-white/70" />
        </div>

        {/* Exact Quote with Authentic High-End Serif Typography */}
        <blockquote className="font-serif">
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-normal text-white leading-[1.12] tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            &ldquo;The ocean is the giver...
          </p>
          <p className="mt-2 sm:mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] italic font-normal text-[#9cd8f7] leading-[1.12] tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            We are just visitors.&rdquo;
          </p>
        </blockquote>

        {/* Centered Bottom Hairline Rule */}
        <div className="mt-6 sm:mt-9 h-[1.5px] w-28 sm:w-44 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      </div>
    </section>
  );
}

