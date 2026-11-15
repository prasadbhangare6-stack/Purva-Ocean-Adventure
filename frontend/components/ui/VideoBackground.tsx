"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/animations/hooks";
import { cn } from "@/lib/utils/cn";

type VideoBackgroundProps = {
  /** Optimised, compressed MP4/WebM URL. */
  src?: string | null;
  /** Multiple video URLs played sequentially in a continuous loop. */
  sources?: string[];
  /** Poster image shown before playback and for reduced-motion users. */
  poster?: string | null;
  className?: string;
};

/**
 * Fullscreen looping background video with sequential multi-video crossfade support.
 * - Plays true full screen (100% width and 100% height, object-cover).
 * - Smooth crossfade between tracks without buffering flicker.
 * - Minimal, high-clarity scrim so the vibrant underwater footage is fully visible.
 * - Pauses when off-screen to save battery and bandwidth.
 * - Respects prefers-reduced-motion.
 * - Lightweight preloading: only buffers active video, never congests network.
 */
export function VideoBackground({ src, sources, poster, className }: VideoBackgroundProps) {
  const reduced = usePrefersReducedMotion();

  // Normalize video list
  const playlist = sources && sources.length > 0 ? sources : src ? [src] : [];
  const isMulti = playlist.length > 1;

  // Active slot tracks which element ('A' or 'B') is currently visible and playing
  const [activeSlot, setActiveSlot] = useState<"A" | "B">("A");
  const [slotAIndex, setSlotAIndex] = useState(0);
  const [slotBIndex, setSlotBIndex] = useState(1 % (playlist.length || 1));
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const refSingle = useRef<HTMLVideoElement>(null);
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    };
  }, []);

  // Play next video with seamless crossfade
  const handleSlotEnd = useCallback(
    (finishedSlot: "A" | "B") => {
      if (!isMulti || reduced) return;

      if (swapTimerRef.current) {
        clearTimeout(swapTimerRef.current);
      }

      if (finishedSlot === "A") {
        const nextB = slotBIndex;
        const videoB = refB.current;
        if (videoB) {
          videoB.currentTime = 0;
          void videoB.play().catch(() => {});
        }
        setActiveSlot("B");

        // Queue next video into Slot A after the 700ms crossfade finishes
        const nextAIndex = (nextB + 1) % playlist.length;
        swapTimerRef.current = setTimeout(() => {
          setSlotAIndex(nextAIndex);
        }, 720);
      } else {
        const nextA = slotAIndex;
        const videoA = refA.current;
        if (videoA) {
          videoA.currentTime = 0;
          void videoA.play().catch(() => {});
        }
        setActiveSlot("A");

        // Queue next video into Slot B after the 700ms crossfade finishes
        const nextBIndex = (nextA + 1) % playlist.length;
        swapTimerRef.current = setTimeout(() => {
          setSlotBIndex(nextBIndex);
        }, 720);
      }
    },
    [isMulti, reduced, slotAIndex, slotBIndex, playlist.length],
  );

  // Autoplay and intersection observer to pause when off-screen
  useEffect(() => {
    if (reduced || playlist.length === 0) return;

    const playActive = () => {
      if (!isMulti) {
        void refSingle.current?.play().then(() => setIsVideoLoaded(true)).catch(() => {});
      } else if (activeSlot === "A") {
        void refA.current?.play().then(() => setIsVideoLoaded(true)).catch(() => {});
      } else {
        void refB.current?.play().then(() => setIsVideoLoaded(true)).catch(() => {});
      }
    };

    const pauseAll = () => {
      refSingle.current?.pause();
      refA.current?.pause();
      refB.current?.pause();
    };

    // Initial play
    playActive();

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playActive();
        else pauseAll();
      },
      { threshold: 0.15 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [reduced, playlist.length, isMulti, activeSlot]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("absolute inset-0 w-full h-full overflow-hidden bg-abyss select-none", className)}
    >
      {/* Instant high-res poster displayed immediately to prevent black screen / layout shifts */}
      <div
        className={cn(
          "absolute inset-0 size-full transition-opacity duration-700 ease-out z-[1]",
          isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <Image
          src={poster ?? "/media/hero-design.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Single video mode */}
      {!isMulti && playlist.length === 1 && !reduced && (
        <video
          ref={refSingle}
          className="absolute inset-0 h-full w-full object-cover object-center z-[2]"
          src={playlist[0]}
          poster={poster ?? undefined}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onPlaying={() => setIsVideoLoaded(true)}
        />
      )}

      {/* Multi-video continuous loop mode with 2-slot crossfade */}
      {isMulti && !reduced && (
        <>
          <video
            ref={refA}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out",
              activeSlot === "A" ? "opacity-100 z-[3]" : "opacity-0 z-[2]",
            )}
            src={playlist[slotAIndex]}
            muted
            autoPlay
            playsInline
            preload="metadata"
            onPlaying={() => setIsVideoLoaded(true)}
            onEnded={() => handleSlotEnd("A")}
          />
          <video
            ref={refB}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out",
              activeSlot === "B" ? "opacity-100 z-[3]" : "opacity-0 z-[2]",
            )}
            src={playlist[slotBIndex]}
            muted
            playsInline
            preload="none"
            onEnded={() => handleSlotEnd("B")}
          />
        </>
      )}

      {/* Minimal directional scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-abyss/75 via-abyss/25 to-transparent w-full md:w-3/5 pointer-events-none z-[4]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-abyss/50 to-transparent pointer-events-none z-[4]" />
    </div>
  );
}
