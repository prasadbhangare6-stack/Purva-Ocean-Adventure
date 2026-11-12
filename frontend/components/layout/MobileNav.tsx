"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X, ChevronDown, Search } from "lucide-react";
import { PRIMARY_NAV, PUBLIC_ROUTES, type NavChild } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { OFFICIAL_WHATSAPP_NUMBER } from "@/lib/integrations/whatsapp";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Mobile navigation foundation. Full-height panel with:
 * - Escape to close, focus moved into the panel on open and returned on close,
 * - body scroll lock while open,
 * - accordion sections for dropdown groups (touch-friendly 44px targets).
 */
export function MobileNav({
  trigger,
  tripItems,
  courseItems,
  instagramUrl,
  whatsappUrl,
  onOpenSearch,
}: {
  trigger: ReactNode;
  tripItems: NavChild[];
  courseItems: NavChild[];
  instagramUrl?: string | null;
  whatsappUrl?: string | null;
  onOpenSearch?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<"trips" | "courses" | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const returnFocusTo = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      returnFocusTo?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden"
      >
        {trigger}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-abyss px-6 pb-10 pt-6 lg:hidden"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="label-caps text-gold">Menu</span>
            <ThemeToggle themeMode="white" />
          </div>
          <div className="flex items-center gap-2">
            {onOpenSearch && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenSearch();
                }}
                className="inline-flex size-11 items-center justify-center rounded-full border hairline text-foam hover:border-gold hover:text-gold transition-colors"
                aria-label="Search site"
              >
                <Search className="size-5" />
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full border hairline text-foam hover:border-gold hover:text-gold transition-colors"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav aria-label="Mobile primary" className="mt-10">
          <ul className="flex flex-col divide-y divide-sky/15">
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
                      className="flex w-full items-center justify-between py-3 font-serif text-3xl text-left text-foam hover:text-gold"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn("size-5 transition-transform duration-500", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <ul className="mb-3 ml-2 flex flex-col gap-1 border-l border-gold/40 pl-4">
                        {items.map((sub) => (
                          <li key={sub.href}>
                            <Link href={sub.href} className="block py-2.5 text-base text-foam/80 hover:text-gold">
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href={key === "trips" ? PUBLIC_ROUTES.trips : PUBLIC_ROUTES.courses}
                            className="label-caps block py-2.5 text-gold"
                          >
                            {key === "trips" ? "View All Trips" : "All Courses"}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3 font-serif text-3xl">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-4">
          <Button href={PUBLIC_ROUTES.oceanQuote}>Plan Your Trip</Button>
          <div className="flex items-center gap-4 pt-2">
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="inline-flex size-11 items-center justify-center rounded-full border hairline text-foam">
                <InstagramIcon className="size-5" />
              </a>
            )}
            <a
              href={whatsappUrl && whatsappUrl !== "https://wa.me/" ? whatsappUrl : `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp (opens in a new tab)"
              className="inline-flex size-11 items-center justify-center rounded-full border hairline text-foam hover:border-gold hover:text-gold transition-colors"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
