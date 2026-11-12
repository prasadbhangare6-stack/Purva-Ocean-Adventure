"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { PUBLIC_ROUTES } from "@/lib/config/site";
import { Maximize2, Minimize2 } from "lucide-react";

const BACKGROUND_VIDEOS = [
  "/media/V4.mp4",
  "/media/V5.mp4",
  "/media/V3.mp4",
];

export function HeroVideoBox() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!boxRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await boxRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen not supported or blocked
    }
  };

  return (
    <div
      ref={boxRef}
      className={`relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 shadow-[0_20px_70px_rgba(0,18,40,0.85),0_0_35px_rgba(102,180,226,0.18)] bg-abyss flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-all duration-500 ${
        isFullscreen
          ? "h-screen w-screen max-w-none rounded-none border-none p-8 sm:p-14"
          : "min-h-[580px] sm:min-h-[640px] lg:min-h-[680px]"
      }`}
    >
      {/* 3 continuous looping videos inside the box */}
      <VideoBackground
        sources={BACKGROUND_VIDEOS}
        poster="/media/hero-design.jpg"
        className={isFullscreen ? "rounded-none" : "rounded-3xl"}
      />

      {/* Top row: Eyebrow + Fullscreen Toggle Button */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <p className="label-caps text-xs sm:text-sm font-semibold tracking-[0.28em] text-sky-200">
          EXPLORE • DIVE • CONNECT
        </p>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "View video box in fullscreen"}
          className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
        >
          {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
        </button>
      </div>

      {/* Center Left: Headline, Body Description & CTA Button */}
      <div className="relative z-10 my-auto py-6 sm:py-8 max-w-2xl animate-fade-up">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold uppercase tracking-tight text-foam leading-[1.04]">
          OCEAN<br />
          ADVENTURES<br />
          THAT BRING<br />
          <span className="italic font-light text-[#7ec5eb]">YOU CLOSER</span>
        </h1>

        <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-foam/90 font-normal leading-relaxed">
          Curated scuba diving and ocean travel experiences for curious souls. From your first breath underwater to unforgettable dive journeys around the world.
        </p>

        <div className="mt-6 sm:mt-8">
          <Link
            href={PUBLIC_ROUTES.trips}
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#E8C58F] px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#010F20] shadow-lg transition-all hover:bg-foam hover:shadow-sky/20 active:scale-[0.98]"
          >
            <span>EXPLORE OUR TRIPS</span>
            <span aria-hidden="true" className="text-base leading-none">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Bottom: The 4 Feature Badges */}
      <div className="relative z-10 border-t border-foam/20 pt-4 sm:pt-6">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          {/* Badge 1 */}
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
            <div className="text-[0.6rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
              CURATED<br />DIVE TRIPS
            </div>
          </div>

          {/* Badge 2 */}
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
            <div className="text-[0.6rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
              PADI<br />COURSES
            </div>
          </div>

          {/* Badge 3 */}
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
            <div className="text-[0.6rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
              INCREDIBLE<br />MARINE LIFE
            </div>
          </div>

          {/* Badge 4 */}
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
            <div className="text-[0.6rem] sm:text-[0.68rem] tracking-[0.2em] font-medium uppercase text-foam leading-tight">
              OCEAN<br />COMMUNITY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
