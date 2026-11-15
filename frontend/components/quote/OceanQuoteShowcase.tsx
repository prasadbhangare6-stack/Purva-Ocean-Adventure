"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Ocean Quote Showcase Page / Section:
 * Matches the user mockup exactly:
 * - Lazy-loaded background video of underwater sunbeams, shark, and marine life.
 * - Only buffers and plays when approaching the viewport to keep page load blazing fast.
 * - Three stacked ocean wave glyph with flanking horizontal hairline rules.
 * - Exact quote:
 *     “The ocean is the giver...
 *      We are just visitors.”
 */
export function OceanQuoteShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "300px 0px" } // Preload when within 300px of view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ocean-quote"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#021020] select-none scroll-mt-20 pt-20 sm:pt-24 pb-3 sm:pb-5"
    >
      {/* Background Poster (Displayed instantly with 0 video buffering lag) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/media/ocean-quote-mock.jpg"
          alt="Sunlight piercing deep ocean waters with manta rays"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />

        {/* Background Video (Only mounted / played when section is near viewport) */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover scale-[1.02] transition-opacity duration-1000"
          >
            <source src="/media/V6.mp4" type="video/mp4" />
          </video>
        )}

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
