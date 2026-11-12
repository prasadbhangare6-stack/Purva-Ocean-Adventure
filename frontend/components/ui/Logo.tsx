"use client";

import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * Brand logo matching the exact uploaded artwork from the home page:
 * Stylized shark leaping over ocean wave, "PURVA", "OCEAN ADVENTURES",
 * and "DISCOVER • DIVE • CONNECT".
 *
 * Supports white theme (first page) and black theme (second & third pages).
 */
export function Logo({
  className,
  href = "/",
  logoSrc = "/brand/purva-white-logo.png",
  theme = "white",
}: {
  logoSrc?: string | null;
  logoAlt?: string;
  variant?: "full" | "compact";
  className?: string;
  href?: string;
  theme?: "white" | "black" | "light" | "dark";
}) {
  const finalSrc = logoSrc || "/brand/purva-white-logo.png";
  const isBlack = theme === "black" || theme === "dark";

  return (
    <Link
      href={href}
      aria-label={`${BRAND.name} — home`}
      onClick={() => {
        if (typeof window !== "undefined" && window.location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={cn(
        "group inline-flex items-center py-1 transition-transform duration-300 hover:scale-[1.03]",
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src={finalSrc}
          alt="Purva Ocean Adventures — Discover • Dive • Connect"
          width={380}
          height={288}
          priority
          className={cn(
            "h-12 sm:h-14 md:h-16 w-auto object-contain transition-all duration-300",
            isBlack
              ? "brightness-0 filter"
              : "drop-shadow-[0_2px_14px_rgba(255,255,255,0.45)]",
          )}
        />
      </div>
    </Link>
  );
}
