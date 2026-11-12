"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * BackToTopButton:
 * Floating button that gracefully appears after scrolling down,
 * allowing visitors to smoothly return to the top of the page.
 */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-20 right-6 z-40 inline-flex size-11 items-center justify-center rounded-full bg-[#02182e]/85 backdrop-blur-md border border-sky-400/30 text-sky-200 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#0284c7] hover:text-white hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] active:scale-95 cursor-pointer ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp className="size-5" />
    </button>
  );
}

