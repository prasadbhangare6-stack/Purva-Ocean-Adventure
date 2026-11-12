"use client";

import { useMemo, useState, useEffect } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

/**
 * OceanAtmosphere:
 * Ultra-lightweight, hardware-accelerated ambient ocean atmosphere.
 * Renders subtle rising micro-bubbles and gentle caustic surface light
 * that mimic deep clear tropical waters. Zero CPU overhead, fully GPU-accelerated.
 */
export function OceanAtmosphere({ className = "" }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  // Precompute deterministic bubble seeds for stable rendering
  const bubbles: Bubble[] = useMemo(() => {
    const arr: Bubble[] = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        size: Math.floor(2 + (i % 4) * 1.8), // 2px - 8px
        left: Math.floor(4 + ((i * 137) % 92)), // Distributed 4% - 96%
        duration: 9 + ((i * 7) % 11), // 9s - 20s
        delay: ((i * 3) % 9) * 0.8, // Staggered delays
        drift: ((i % 2 === 0 ? 1 : -1) * (15 + (i * 5) % 25)), // Left/right drift in px
        opacity: 0.12 + ((i % 5) * 0.05), // 12% - 32% soft opacity
      });
    }
    return arr;
  }, []);

  if (!isMounted || reducedMotion) {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        {/* Static soft ambient glow fallback */}
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[140px]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* Subtle Surface Caustic Light Drift */}
      <div
        className="absolute -top-40 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_70%)] animate-caustic"
        style={{ animationDuration: "14s" }}
      />

      {/* Ambient Deep Ocean Lighting Orbs */}
      <div className="absolute top-1/4 -right-20 h-[550px] w-[550px] rounded-full bg-sky-500/[0.08] blur-[150px]" />
      <div className="absolute bottom-1/3 -left-20 h-[600px] w-[600px] rounded-full bg-sky-400/[0.06] blur-[160px]" />

      {/* Gentle Floating Micro-Bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="absolute bottom-0 rounded-full bg-sky-200/80 shadow-[0_0_8px_rgba(186,230,253,0.6)]"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              opacity: b.opacity,
              animation: `float-bubble ${b.duration}s infinite linear`,
              animationDelay: `${b.delay}s`,
              "--drift": `${b.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

