"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";
import { PRIMARY_NAV, PUBLIC_ROUTES, type NavChild } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { OFFICIAL_WHATSAPP_NUMBER } from "@/lib/integrations/whatsapp";

/**
 * Mobile navigation slide-over panel.
 * - Rendered via React portal into document.body to break out of any parent backdrop-filter containing blocks.
 * - Body scroll lock while open.
 * - Escape key to close.
 * - Clean close button and link click auto-dismiss.
 * - Search button and theme toggle removed on mobile as requested.
 * - Fully touch-friendly with 44px+ touch targets and zero horizontal overflow.
 */
export function MobileNav({
  trigger,
  tripItems,
  courseItems,
  instagramUrl,
  whatsappUrl,
}: {
  trigger: ReactNode;
  tripItems: NavChild[];
  courseItems: NavChild[];
  instagramUrl?: string | null;
  whatsappUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<"trips" | "courses" | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll and handle keyboard accessibility while open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const returnFocusTo = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      returnFocusTo?.focus();
    };
  }, [open]);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    // Smooth scrolling for hash anchor links on the homepage
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center lg:hidden cursor-pointer p-1"
      >
        {trigger}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex justify-end lg:hidden animate-fade-in">
            {/* Dark blur backdrop */}
            <div
              className="fixed inset-0 bg-[#010B17]/75 backdrop-blur-md transition-opacity"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-over Drawer Panel */}
            <div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              className="relative z-10 flex h-full w-full max-w-[340px] sm:max-w-[380px] flex-col justify-between overflow-y-auto bg-[#010F20] border-l border-white/10 px-5 sm:px-7 py-6 text-white shadow-2xl transition-transform duration-300 ease-out"
            >
              {/* Header inside Mobile Nav: Brand & Close Button */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-tight text-white uppercase">
                    PURVA OCEAN
                  </span>
                  <span className="text-[0.62rem] tracking-[0.24em] font-medium uppercase text-sky-300">
                    ADVENTURES
                  </span>
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/90 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <nav aria-label="Mobile primary" className="my-6 flex-1 overflow-y-auto">
                <ul className="flex flex-col divide-y divide-white/5">
                  {PRIMARY_NAV.map((item) => {
                    if (item.dropdown) {
                      const key = item.dropdown;
                      const items = key === "trips" ? tripItems : courseItems;
                      const isOpen = expanded === key;
                      return (
                        <li key={item.href} className="py-1">
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={`Toggle ${item.label} options`}
                            onClick={() => setExpanded(isOpen ? null : key)}
                            className="flex w-full items-center justify-between py-3 font-serif text-2xl sm:text-3xl text-left text-white/90 hover:text-[#E8C58F] transition-colors cursor-pointer"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                "size-5 text-white/60 transition-transform duration-300",
                                isOpen && "rotate-180 text-[#E8C58F]",
                              )}
                              aria-hidden="true"
                            />
                          </button>
                          {isOpen && (
                            <ul className="mb-3 ml-2 flex flex-col gap-1 border-l-2 border-[#E8C58F]/50 pl-4 animate-fade-down">
                              {items.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => handleLinkClick(sub.href)}
                                    className="block py-2 text-sm text-white/80 hover:text-[#E8C58F] transition-colors font-sans"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href={key === "trips" ? PUBLIC_ROUTES.trips : PUBLIC_ROUTES.courses}
                                  onClick={() => handleLinkClick(key === "trips" ? PUBLIC_ROUTES.trips : PUBLIC_ROUTES.courses)}
                                  className="block py-2 text-xs font-bold uppercase tracking-wider text-[#E8C58F] hover:text-white transition-colors font-sans"
                                >
                                  {key === "trips" ? "View All Trips &rarr;" : "All Courses &rarr;"}
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                      );
                    }

                    // Direct Nav Link
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => handleLinkClick(item.href)}
                          className="block py-3 font-serif text-2xl sm:text-3xl text-white/90 hover:text-[#E8C58F] transition-colors cursor-pointer"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer CTA & Social Links */}
              <div className="pt-4 border-t border-white/10 shrink-0 space-y-4">
                <Link
                  href="/#upcoming-trips"
                  onClick={() => handleLinkClick("/#upcoming-trips")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E8C58F] py-3 text-xs font-bold uppercase tracking-wider text-[#010F20] shadow-md transition-all hover:bg-white active:scale-98 cursor-pointer"
                >
                  <span>PLAN YOUR TRIP</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>

                <div className="flex items-center justify-center gap-4 pt-1">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram (opens in a new tab)"
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 hover:border-[#E8C58F] hover:text-[#E8C58F] transition-colors"
                    >
                      <InstagramIcon className="size-4" />
                    </a>
                  )}
                  <a
                    href={
                      whatsappUrl && whatsappUrl !== "https://wa.me/"
                        ? whatsappUrl
                        : `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp (opens in a new tab)"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 hover:border-[#E8C58F] hover:text-[#E8C58F] transition-colors"
                  >
                    <WhatsAppIcon className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
