"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

// Fast, premium 1.0-second total opening experience
const HOLD_DURATION_MS = 350; // Hold scene for ~350ms so viewer absorbs the ocean atmosphere
const CURTAIN_LIFT_MS = 650;  // Smooth upward curtain lift over 650ms (Total = 1000ms / 1 second)

/**
 * Cinematic Upward Curtain Opening:
 * - Moves directly from bottom up as a single unified curtain (no split).
 * - Total duration: ~1.0s (350ms hold + 650ms fluid upward lift).
 * - Subtle ambient underwater motion: slow camera zoom, light rays, rising micro-bubbles.
 * - Revealing the homepage cleanly underneath.
 * - Skip anytime via click or Esc/Space/Enter.
 * - Respects prefers-reduced-motion with a gentle fast fade.
 */
export function Preloader() {
  const [isLifting, setIsLifting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger the upward curtain lift (bottom to top)
  const startLifting = useCallback(() => {
    setIsLifting(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Cleanly unmount and restore scrolling right when the curtain glides off top
    setTimeout(() => {
      setIsComplete(true);
      document.body.style.overflow = "";
    }, CURTAIN_LIFT_MS + 30);
  }, []);

  useEffect(() => {
    // Respect accessibility settings
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
    }

    // Lock page scrolling while curtain is present
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 350ms display timer before smooth upward curtain lift begins
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

  // Reduced-motion fallback: gentle fast fade (400ms)
  if (reducedMotion) {
    return (
      <div
        role="status"
        aria-label="Purva Ocean Adventures"
        onClick={startLifting}
        className={`fixed inset-0 z-[9999] bg-[#011425] transition-opacity duration-400 ease-out cursor-pointer select-none flex items-center justify-center p-4 sm:p-8 ${
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
      className={`fixed inset-0 z-[9999] overflow-hidden select-none bg-[#011425] cursor-pointer will-change-transform ${
        isLifting ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{
        transform: isLifting ? "translate3d(0, -100%, 0)" : "translate3d(0, 0, 0)",
        transition: `transform ${CURTAIN_LIFT_MS}ms cubic-bezier(0.7, 0, 0.2, 1)`,
        boxShadow: isLifting ? "0 30px 80px rgba(0, 5, 15, 0.95)" : "none",
      }}
    >
      {/* 60fps lightweight hardware-accelerated animations */}
      <style>{`
        @keyframes kenBurnsZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.04); }
        }
        @keyframes sunlightDrift {
          0% { transform: translate3d(-4%, -4%, 0) rotate(0deg); }
          50% { transform: translate3d(4%, 3%, 0) rotate(0.8deg); }
          100% { transform: translate3d(-4%, -4%, 0) rotate(0deg); }
        }
        @keyframes bubbleRise {
          0% { transform: translate3d(0, 0, 0) scale(0.8); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translate3d(10px, -90px, 0) scale(1.2); opacity: 0; }
        }
      `}</style>

      {/* 1. Deep ocean backdrop extension */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src="/brand/curtain-opening.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover blur-3xl opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#011425]/50 via-[#011c33]/30 to-[#011425]/70" />
      </div>

      {/* 2. Moving light rays / caustics shimmer passing through water */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-35"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(102, 180, 226, 0.4) 0%, rgba(1, 20, 37, 0) 75%)",
        }}
      >
        <div
          className="absolute -inset-full w-[300%] h-[300%] opacity-20"
          style={{
            background:
              "repeating-linear-gradient(55deg, transparent, transparent 35px, rgba(255,255,255,0.08) 42px, transparent 70px)",
            animation: "sunlightDrift 5s linear infinite",
          }}
        />
      </div>

      {/* 3. Small rising ocean bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute bottom-16 left-[20%] size-2 rounded-full bg-sky-200/50 blur-[0.4px] border border-white/50"
          style={{ animation: "bubbleRise 2.2s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-28 left-[34%] size-1.5 rounded-full bg-sky-300/40 blur-[0.4px] border border-white/40"
          style={{ animation: "bubbleRise 2.5s ease-in-out 0.3s infinite" }}
        />
        <div
          className="absolute bottom-12 right-[30%] size-2.5 rounded-full bg-sky-200/50 blur-[0.4px] border border-white/50"
          style={{ animation: "bubbleRise 2s ease-in-out 0.6s infinite" }}
        />
        <div
          className="absolute bottom-24 right-[16%] size-1.5 rounded-full bg-sky-300/40 blur-[0.4px] border border-white/30"
          style={{ animation: "bubbleRise 2.7s ease-in-out 0.2s infinite" }}
        />
      </div>

      {/* 4. Complete uncropped image with gentle Ken Burns slow zoom */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div
          className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center"
          style={{
            animation: "kenBurnsZoom 3s cubic-bezier(0.25, 1, 0.5, 1) forwards",
          }}
        >
          <Image
            src="/brand/curtain-opening.jpg"
            alt="Purva Ocean Adventures - Discover • Dive • Connect"
            fill
            priority
            sizes="100vw"
            className="object-contain drop-shadow-[0_20px_60px_rgba(0,15,35,0.9)]"
          />
        </div>
      </div>

      {/* Bottom edge highlight that lifts with the curtain giving physical theatrical weight */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400/0 via-sky-300/75 to-sky-400/0" />
    </div>
  );
}
