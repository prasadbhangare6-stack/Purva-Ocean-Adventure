"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const HOLD_DURATION_MS = 3000; // Hold complete image for ~3 seconds
const CURTAIN_LIFT_MS = 1100; // Smooth 1.1s upward curtain lift

/**
 * Opening Curtain Screen:
 * - Shows the COMPLETE, UNCORRUPTED, UNCROPPED image (diver, logo, sharks) crisp and clear.
 * - Deep ocean ambient backdrop extends the image naturally across any screen size.
 * - After ~3 seconds, lifts upward (down to up) like a grand theatre curtain.
 * - Opens directly to reveal the website underneath with no distracting secondary animations.
 * - Click anywhere, tap on mobile, or press Esc/Space/Enter to lift immediately.
 * - Respects prefers-reduced-motion with a graceful fade.
 * - Cleanly unmounts from DOM after lifting with zero overhead.
 */
export function Preloader() {
  const [isLifting, setIsLifting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger the upward curtain lift
  const startLifting = useCallback(() => {
    setIsLifting(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Cleanly unmount and restore scrolling after curtain slides off top
    setTimeout(() => {
      setIsComplete(true);
      document.body.style.overflow = "";
    }, CURTAIN_LIFT_MS + 50);
  }, []);

  useEffect(() => {
    // Check accessibility
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
    }

    // Lock page scrolling while curtain is present
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 3-second display timer
    timerRef.current = setTimeout(() => {
      startLifting();
    }, HOLD_DURATION_MS);

    // Keyboard shortcut to instantly lift curtain
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        startLifting();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [startLifting]);

  // Clean unmount once curtain has fully lifted
  if (isComplete) return null;

  // Reduced-motion fallback: gentle fade
  if (reducedMotion) {
    return (
      <div
        role="status"
        aria-label="Purva Ocean Adventures"
        onClick={startLifting}
        className={`fixed inset-0 z-[9999] bg-[#011425] transition-opacity duration-700 ease-out cursor-pointer select-none flex items-center justify-center p-4 sm:p-8 ${
          isLifting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center">
          <Image
            src="/brand/curtain-opening.jpg"
            alt="Purva Ocean Adventures - Discover • Dive • Connect"
            fill
            priority
            sizes="100vw"
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,18,40,0.8)]"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Purva Ocean Adventures - Discover • Dive • Connect"
      onClick={startLifting}
      className={`fixed inset-0 z-[9999] overflow-hidden select-none bg-[#011425] cursor-pointer will-change-transform shadow-[0_30px_80px_rgba(0,10,25,0.9)] ${
        isLifting ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{
        transform: isLifting ? "translate3d(0, -100%, 0)" : "translate3d(0, 0, 0)",
        transition: `transform ${CURTAIN_LIFT_MS}ms cubic-bezier(0.77, 0, 0.175, 1)`,
      }}
    >
      {/* Ambient background that matches the ocean tones seamlessly */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src="/brand/curtain-opening.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover blur-3xl opacity-35 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#011425]/60 via-[#011c33]/40 to-[#011425]/75" />
      </div>

      {/* 
        THE COMPLETE, UNCORRUPTED, UNCROPPED IMAGE:
        - object-contain ensures 100% of the photograph is fully visible on any screen.
        - Perfectly sharp and clear: no zooming, no pixelation, no edge cuts.
        - Diver on left, logo in center, sharks on right all clearly visible.
      */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center">
          <Image
            src="/brand/curtain-opening.jpg"
            alt="Purva Ocean Adventures - Discover • Dive • Connect"
            fill
            priority
            sizes="100vw"
            className="object-contain drop-shadow-[0_20px_60px_rgba(0,15,35,0.85)]"
          />
        </div>
      </div>

      {/* Subtle bottom edge lift highlight to give physical curtain weight */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-sky-300/30" />
    </div>
  );
}
