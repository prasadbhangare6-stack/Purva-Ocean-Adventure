"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { PRIMARY_NAV, FALLBACK_COURSE_NAV, FALLBACK_TRIP_NAV, type NavChild } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/ui/Logo";
import { NavDropdown } from "./NavDropdown";
import { MobileNav } from "./MobileNav";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { OFFICIAL_WHATSAPP_NUMBER } from "@/lib/integrations/whatsapp";
import { SiteSearch } from "@/components/ui/SiteSearch";

export type HeaderData = {
  logoSrc?: string | null;
  websiteName?: string;
  tripItems: NavChild[];
  courseItems: NavChild[];
  instagramUrl?: string | null;
  whatsappUrl?: string | null;
  announcement?: { message: string; linkUrl?: string } | null;
};

/**
 * Top menu bar:
 * - Dynamic font color: White font for the first page (Hero video).
 * - Black font for the second page (Upcoming Trips) and third page (Dive Certifications).
 * - Transparent frosted white glass background.
 * - Updated official brand artwork (shark leaping over wave).
 * - "Home" positioned directly to the left of "Our Trips".
 * - Simple thin underline active indicator (white on page 1, black on page 2 & 3).
 * - Divider and social icons with responsive theme.
 */
export function SiteHeader({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "home" | "trips" | "courses" | "quote" | "about" | "gallery" | "instagram" | "faq" | "contact" | "other"
  >("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Section observer: detect when user is viewing Home, Upcoming Trips, Courses, Quote, About, or Gallery section
  useEffect(() => {
    if (pathname.startsWith("/trips")) {
      setActiveSection("trips");
      return;
    }
    if (pathname.startsWith("/courses")) {
      setActiveSection("courses");
      return;
    }
    if (pathname.startsWith("/ocean-quote")) {
      setActiveSection("quote");
      return;
    }
    if (pathname.startsWith("/about")) {
      setActiveSection("about");
      return;
    }
    if (pathname.startsWith("/gallery")) {
      setActiveSection("gallery");
      return;
    }
    if (pathname.startsWith("/instagram")) {
      setActiveSection("instagram");
      return;
    }
    if (pathname.startsWith("/faq")) {
      setActiveSection("faq");
      return;
    }
    if (pathname.startsWith("/contact")) {
      setActiveSection("contact");
      return;
    }
    if (pathname !== "/") {
      setActiveSection("other");
      return;
    }

    const checkActiveSection = () => {
      // Natural midpoint scroll spy: calculates which section currently commands the viewport
      const threshold = window.innerHeight * 0.45;

      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const contactTop = contactEl.getBoundingClientRect().top;
        if (contactTop <= threshold) {
          setActiveSection("contact");
          return;
        }
      }

      const faqEl = document.getElementById("faq");
      if (faqEl) {
        const faqTop = faqEl.getBoundingClientRect().top;
        if (faqTop <= threshold) {
          setActiveSection("faq");
          return;
        }
      }

      const instagramEl = document.getElementById("instagram");
      if (instagramEl) {
        const instagramTop = instagramEl.getBoundingClientRect().top;
        if (instagramTop <= threshold) {
          setActiveSection("instagram");
          return;
        }
      }

      const galleryEl = document.getElementById("gallery");
      if (galleryEl) {
        const galleryTop = galleryEl.getBoundingClientRect().top;
        if (galleryTop <= threshold) {
          setActiveSection("gallery");
          return;
        }
      }

      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const aboutTop = aboutEl.getBoundingClientRect().top;
        if (aboutTop <= threshold) {
          setActiveSection("about");
          return;
        }
      }

      const quoteEl = document.getElementById("ocean-quote");
      if (quoteEl) {
        const quoteTop = quoteEl.getBoundingClientRect().top;
        if (quoteTop <= threshold) {
          setActiveSection("quote");
          return;
        }
      }

      const coursesEl = document.getElementById("courses");
      if (coursesEl) {
        const coursesTop = coursesEl.getBoundingClientRect().top;
        if (coursesTop <= threshold) {
          setActiveSection("courses");
          return;
        }
      }

      const tripsEl = document.getElementById("upcoming-trips");
      if (tripsEl) {
        const tripsTop = tripsEl.getBoundingClientRect().top;
        if (tripsTop <= threshold) {
          setActiveSection("trips");
          return;
        }
      }

      setActiveSection("home");
    };

    checkActiveSection();
    window.addEventListener("scroll", checkActiveSection, { passive: true });
    window.addEventListener("resize", checkActiveSection, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkActiveSection);
      window.removeEventListener("resize", checkActiveSection);
    };
  }, [pathname]);

  const tripItems = data.tripItems.length > 0 ? data.tripItems : FALLBACK_TRIP_NAV;
  const courseItems = data.courseItems.length > 0 ? data.courseItems : FALLBACK_COURSE_NAV;

  const isHomeActive = pathname === "/" && activeSection === "home";
  const isTripsActive =
    activeSection === "trips" ||
    pathname === "/trips" ||
    pathname.startsWith("/trips/");
  const isCoursesActive =
    activeSection === "courses" ||
    pathname === "/courses" ||
    pathname.startsWith("/courses/");
  const isAboutActive =
    activeSection === "about" ||
    pathname === "/about" ||
    pathname.startsWith("/about/");
  const isGalleryActive =
    activeSection === "gallery" ||
    pathname === "/gallery" ||
    pathname.startsWith("/gallery/");
  const isFaqActive =
    activeSection === "faq" ||
    pathname === "/faq" ||
    pathname.startsWith("/faq/");
  const isContactActive =
    activeSection === "contact" ||
    pathname === "/contact" ||
    pathname.startsWith("/contact/");

  const isItemActive = (href: string) => {
    if (href === "/") return isHomeActive;
    if (href === "/trips") return isTripsActive;
    if (href === "/courses") return isCoursesActive;
    if (href === "/about") return isAboutActive;
    if (href === "/gallery") return isGalleryActive;
    if (href === "/faq") return isFaqActive;
    if (href === "/contact") return isContactActive;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Detail pages (/trips/[slug], /courses/[slug]) feature the deep ocean dark theme, so they use the frosted glass white-text theme
  const isDetailOceanPage =
    pathname.startsWith("/trips/") || pathname.startsWith("/courses/");

  // Font color rule: White for dark ocean pages (Home hero, Detail pages, Quote, About, Gallery), Black for white pages (trips list, courses list, instagram)
  const isBlackMode =
    !isDetailOceanPage &&
    ((pathname === "/" && (activeSection === "trips" || activeSection === "courses" || activeSection === "instagram")) ||
      pathname === "/courses" ||
      pathname === "/trips" ||
      pathname === "/instagram");

  const instagramUrl =
    data.instagramUrl || "https://www.instagram.com/purvaoceanadventures?vrfl=cTZjNmw4ZncwdHB0";
  const whatsappUrl =
    data.whatsappUrl && data.whatsappUrl !== "https://wa.me/"
      ? data.whatsappUrl
      : `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`;

  const navItems = PRIMARY_NAV;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        isBlackMode
          ? "bg-white/75 backdrop-blur-2xl border-b border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]"
          : scrolled
            ? "bg-white/[0.18] backdrop-blur-2xl border-b border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.45)]"
            : "bg-white/[0.10] backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]",
      )}
    >
      {data.announcement && (
        <div
          className={cn(
            "border-b px-6 py-2 text-center text-xs backdrop-blur-sm transition-colors",
            isBlackMode
              ? "border-black/10 bg-black/5 text-slate-800"
              : "border-white/15 bg-white/10 text-white/95",
          )}
        >
          {data.announcement.linkUrl ? (
            <Link
              href={data.announcement.linkUrl}
              className={isBlackMode ? "hover:text-[#0284c7] font-semibold" : "hover:text-sky-300"}
            >
              {data.announcement.message}
            </Link>
          ) : (
            data.announcement.message
          )}
        </div>
      )}

      <div className="mx-auto flex max-w-[var(--container-page)] items-center justify-between gap-6 px-6 py-2.5 sm:px-10 lg:px-16">
        {/* Brand logo: White on page 1, Black on page 2 & page 3 */}
        <Logo className="shrink-0" theme={isBlackMode ? "black" : "white"} />

        {/* Center Navigation Links: Home, Our Trips, Courses, About, Gallery, FAQ, Contact */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            if (item.href === "/") {
              return (
                <Link
                  key={item.href}
                  href="/"
                  aria-current={isHomeActive ? "page" : undefined}
                  onClick={(e) => {
                    if (pathname === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "label-caps relative group inline-flex items-center gap-1.5 py-2 transition-colors duration-300 cursor-pointer select-none",
                    isBlackMode
                      ? isHomeActive
                        ? "text-black font-extrabold"
                        : "text-black/80 hover:text-black font-bold"
                      : isHomeActive
                        ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
                        : "text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
                  )}
                >
                  <span>HOME</span>
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 pointer-events-none",
                      isBlackMode ? "bg-black" : "bg-white",
                      isHomeActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-50 group-hover:opacity-75 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            }
            if (item.dropdown === "trips") {
              return (
                <NavDropdown
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  items={tripItems}
                  viewAll={{ label: "All Trips", href: "/#upcoming-trips" }}
                  active={isTripsActive}
                  navTheme={isBlackMode ? "black" : "white"}
                />
              );
            }
            if (item.dropdown === "courses") {
              return (
                <NavDropdown
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  items={courseItems}
                  viewAll={{ label: "All Courses", href: "/#courses" }}
                  active={isCoursesActive}
                  navTheme={isBlackMode ? "black" : "white"}
                />
              );
            }
            if (item.href === "/about") {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    if (pathname === "/") {
                      const el = document.getElementById("about");
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={cn(
                    "label-caps relative group inline-flex items-center gap-1.5 py-2 transition-colors duration-300 cursor-pointer select-none",
                    isBlackMode
                      ? active
                        ? "text-black font-extrabold"
                        : "text-black/80 hover:text-black font-bold"
                      : active
                        ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
                        : "text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
                  )}
                >
                  <span>{item.label.toUpperCase()}</span>
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 pointer-events-none",
                      isBlackMode ? "bg-black" : "bg-white",
                      active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-50 group-hover:opacity-75 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            }
            if (item.href === "/gallery") {
              const active = isGalleryActive;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    if (pathname === "/") {
                      const el = document.getElementById("gallery");
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={cn(
                    "label-caps relative group inline-flex items-center gap-1.5 py-2 transition-colors duration-300 cursor-pointer select-none",
                    isBlackMode
                      ? active
                        ? "text-black font-extrabold"
                        : "text-black/80 hover:text-black font-bold"
                      : active
                        ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
                        : "text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
                  )}
                >
                  <span>{item.label.toUpperCase()}</span>
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 pointer-events-none",
                      isBlackMode ? "bg-black" : "bg-white",
                      active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-50 group-hover:opacity-75 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            }
            if (item.href === "/faq") {
              const active = isFaqActive;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    if (pathname === "/") {
                      const el = document.getElementById("faq");
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={cn(
                    "label-caps relative group inline-flex items-center gap-1.5 py-2 transition-colors duration-300 cursor-pointer select-none",
                    isBlackMode
                      ? active
                        ? "text-black font-extrabold"
                        : "text-black/80 hover:text-black font-bold"
                      : active
                        ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
                        : "text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
                  )}
                >
                  <span>{item.label.toUpperCase()}</span>
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 pointer-events-none",
                      isBlackMode ? "bg-black" : "bg-white",
                      active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-50 group-hover:opacity-75 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            }
            if (item.href === "/contact") {
              const active = isContactActive;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    if (pathname === "/") {
                      const el = document.getElementById("contact");
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={cn(
                    "label-caps relative group inline-flex items-center gap-1.5 py-2 transition-colors duration-300 cursor-pointer select-none",
                    isBlackMode
                      ? active
                        ? "text-black font-extrabold"
                        : "text-black/80 hover:text-black font-bold"
                      : active
                        ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
                        : "text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
                  )}
                >
                  <span>{item.label.toUpperCase()}</span>
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 pointer-events-none",
                      isBlackMode ? "bg-black" : "bg-white",
                      active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-50 group-hover:opacity-75 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            }
            const active = isItemActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "label-caps relative group inline-flex items-center gap-1.5 py-2 transition-colors duration-300 cursor-pointer select-none",
                  isBlackMode
                    ? active
                      ? "text-black font-extrabold"
                      : "text-black/80 hover:text-black font-bold"
                    : active
                      ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
                      : "text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
                )}
              >
                <span>{item.label.toUpperCase()}</span>
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 pointer-events-none",
                    isBlackMode ? "bg-black" : "bg-white",
                    active
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-50 group-hover:opacity-75 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side: divider and social links */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div
            className={cn(
              "hidden h-5 w-px md:block transition-colors",
              isBlackMode ? "bg-black/20" : "bg-white/30",
            )}
          />

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (opens in a new tab)"
            className={cn(
              "hidden rounded-full p-2 transition-all md:inline-flex",
              isBlackMode
                ? "text-black/85 hover:text-[#0284c7] hover:scale-110"
                : "text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] hover:text-sky-300 hover:scale-110",
            )}
          >
            <InstagramIcon className="size-5" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp (opens in a new tab)"
            className={cn(
              "hidden rounded-full p-2 transition-all md:inline-flex",
              isBlackMode
                ? "text-black/85 hover:text-[#0284c7] hover:scale-110"
                : "text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] hover:text-sky-300 hover:scale-110",
            )}
          >
            <WhatsAppIcon className="size-5" />
          </a>

          {/* Plan Your Trip CTA Pill Button matching design mock */}
          <Link
            href="/#upcoming-trips"
            onClick={(e) => {
              if (pathname === "/") {
                const el = document.getElementById("upcoming-trips");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#E8C58F] px-4 sm:px-5 py-2 text-[0.68rem] font-bold uppercase tracking-wider text-[#010F20] shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>PLAN YOUR TRIP</span>
            <span aria-hidden="true" className="text-xs">&rarr;</span>
          </Link>

          <MobileNav
            trigger={
              <span
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-full border backdrop-blur-sm lg:hidden transition-colors",
                  isBlackMode
                    ? "border-black/20 bg-black/5 text-black hover:bg-black/10"
                    : "border-white/30 bg-white/10 text-white hover:bg-white/20",
                )}
              >
                <Menu className="size-5" aria-hidden="true" />
              </span>
            }
            tripItems={tripItems}
            courseItems={courseItems}
            instagramUrl={instagramUrl}
            whatsappUrl={whatsappUrl}
            onOpenSearch={() => setSearchOpen(true)}
          />
        </div>
      </div>

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
