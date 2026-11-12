"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Settings, X, Check } from "lucide-react";

const STORAGE_KEY = "poa_cookie_consent";

/**
 * CookieBanner:
 * Exact pixel-accurate reproduction of the requested modern white card cookie banner:
 * - Crisp white rounded card with subtle blue wave ribbon art
 * - Distinctive bitten cookie line illustration
 * - "We Use Cookies" serif headline + descriptive body
 * - "Learn More →" link
 * - 3-button row: [⚙ Cookie Settings] [Reject All] [Accept All →]
 * - Full interactive Cookie Settings drawer with toggles
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [mediaEnabled, setMediaEnabled] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Small delay so it appears smoothly after page load
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in restricted iframes
    }
  }, []);

  const handleChoice = (choice: "accepted" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    setVisible(false);
  };

  const handleSaveCustom = () => {
    try {
      const payload = JSON.stringify({
        essential: true,
        analytics: analyticsEnabled,
        media: mediaEnabled,
      });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-[490px] z-[80] overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(10,37,88,0.14)] animate-fade-in text-slate-800"
    >
      {/* Background graceful wave ribbons in bottom right */}
      <div className="pointer-events-none absolute -bottom-2 -right-2 w-64 h-40 opacity-30 overflow-hidden z-0">
        <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
          <path
            d="M0,75 C60,35 120,85 200,20 L200,120 L0,120 Z"
            fill="url(#wave-gradient-1)"
          />
          <path
            d="M20,95 C75,55 140,75 200,40 L200,120 L20,120 Z"
            fill="url(#wave-gradient-2)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 p-5 sm:p-6">
        {/* Top Close Button */}
        <button
          type="button"
          onClick={() => handleChoice("essential")}
          aria-label="Close"
          className="absolute top-5 right-5 text-[#0a2558]/70 hover:text-[#0a2558] transition-colors p-1"
        >
          <X className="size-4" strokeWidth={2.2} />
        </button>

        {/* Content Row: Bitten Cookie + Text */}
        <div className="flex items-start gap-4 pr-6">
          {/* Bitten Cookie Line Icon matching design */}
          <div className="shrink-0 text-[#0a2558] pt-0.5">
            <Cookie className="size-10 sm:size-11 stroke-[1.8]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-[22px] sm:text-2xl font-medium tracking-tight text-[#0a2558] leading-tight">
              We Use Cookies
            </h3>
            <p className="mt-1.5 font-sans text-xs sm:text-[13px] leading-relaxed text-[#334155]">
              We use essential cookies and anonymous analytics to improve your experience, personalize content, and analyze our website traffic.
            </p>
            <Link
              href="/policies#privacy"
              className="mt-2 inline-flex items-center gap-1 font-sans text-xs sm:text-[13px] font-bold text-[#1d4ed8] hover:text-[#0e3eb5] transition-colors"
            >
              <span>Learn More</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Interactive Cookie Settings Drawer */}
        {showSettings && (
          <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-[#f8fbfe] p-4 text-xs animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="font-bold text-[#0a2558]">Cookie Preferences</span>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <p className="font-semibold text-slate-800">Essential &amp; Security</p>
                <p className="text-[11px] text-slate-500">Required for website navigation and booking safety.</p>
              </div>
              <span className="rounded-lg bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Always Active
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <p className="font-semibold text-slate-800">Analytics &amp; Performance</p>
                <p className="text-[11px] text-slate-500">Helps us understand visitor interest across expeditions.</p>
              </div>
              <button
                type="button"
                onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                className={`flex h-5 w-9 items-center rounded-full transition-colors p-0.5 ${
                  analyticsEnabled ? "bg-[#1d4ed8] justify-end" : "bg-slate-300 justify-start"
                }`}
              >
                <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <p className="font-semibold text-slate-800">Interactive Media</p>
                <p className="text-[11px] text-slate-500">Enables high-definition reel streaming &amp; map previews.</p>
              </div>
              <button
                type="button"
                onClick={() => setMediaEnabled(!mediaEnabled)}
                className={`flex h-5 w-9 items-center rounded-full transition-colors p-0.5 ${
                  mediaEnabled ? "bg-[#1d4ed8] justify-end" : "bg-slate-300 justify-start"
                }`}
              >
                <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveCustom}
              className="mt-2 w-full rounded-xl bg-[#081f3d] py-2 text-center text-xs font-bold text-white hover:bg-[#0c2c54] transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Check className="size-3.5" />
              <span>Save Custom Preferences</span>
            </button>
          </div>
        )}

        {/* 3-Button Action Row matching design mock */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-2.5">
          {/* 1. Cookie Settings */}
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-2xl border border-[#cbd5e1] bg-white px-2 sm:px-3 py-2.5 text-xs font-bold text-[#0a2558] hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Settings className="size-3.5 text-[#0a2558] shrink-0" />
            <span className="truncate">Cookie Settings</span>
          </button>

          {/* 2. Reject All */}
          <button
            type="button"
            onClick={() => handleChoice("essential")}
            className="rounded-2xl bg-[#e6f0fa] hover:bg-[#d8e8f8] px-2 sm:px-3 py-2.5 text-xs font-bold text-[#0a2558] transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="truncate">Reject All</span>
          </button>

          {/* 3. Accept All */}
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="rounded-2xl bg-[#081f3d] hover:bg-[#0c2c54] px-2 sm:px-3 py-2.5 text-xs font-bold text-white transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
          >
            <span className="truncate">Accept All</span>
            <span className="shrink-0">&rarr;</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
