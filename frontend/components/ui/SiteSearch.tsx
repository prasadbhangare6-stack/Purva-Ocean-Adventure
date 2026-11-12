"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Compass,
  Award,
  BookOpen,
  Camera,
  HelpCircle,
  Mail,
  ArrowRight,
  Calendar,
  Sparkles,
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: "Trip" | "Course" | "Page";
  href: string;
  icon: typeof Compass;
  badge?: string;
}

const SEARCH_CATALOG: SearchResult[] = [
  // Trips
  {
    id: "trip-maafushi",
    title: "Maafushi Madness Expedition",
    subtitle: "Maldives • 6 Days / 10 Dives • Nurse shark channel gatherings",
    category: "Trip",
    href: "/trips/maafushi-madness-maldives",
    icon: Compass,
    badge: "22–27 Nov 2026",
  },
  {
    id: "trip-lakshadweep",
    title: "Lakshadweep Love Expedition",
    subtitle: "India • 6 Days / 12 Dives • Coral atolls & green sea turtles",
    category: "Trip",
    href: "/trips/lakshadweep-love",
    icon: Compass,
    badge: "26–31 Jan 2027",
  },
  {
    id: "trip-maldives-feb",
    title: "Maldives Liveaboard Expedition",
    subtitle: "Maldives • Pelagic whale sharks & oceanic manta rays",
    category: "Trip",
    href: "/trips/maldives-dive-expedition",
    icon: Compass,
    badge: "Feb 2027",
  },
  // Courses
  {
    id: "course-ow",
    title: "PADI Open Water Diver",
    subtitle: "First scuba certification • Worldwide valid up to 18 metres",
    category: "Course",
    href: "/courses/open-water-diver",
    icon: Award,
    badge: "Beginner",
  },
  {
    id: "course-aow",
    title: "PADI Advanced Open Water",
    subtitle: "Deep diving up to 30 metres • Navigation & drift adventure dives",
    category: "Course",
    href: "/courses/advanced-open-water",
    icon: Award,
    badge: "30m Depth",
  },
  {
    id: "course-rescue",
    title: "PADI Rescue Diver",
    subtitle: "Emergency response & diver safety • Confidence-building training",
    category: "Course",
    href: "/courses/rescue-diver",
    icon: Award,
    badge: "Safety",
  },
  // Key Pages
  {
    id: "page-about",
    title: "About Purva Ocean Adventures",
    subtitle: "Our story, founding ethos, and small-group ocean mission",
    category: "Page",
    href: "/#about",
    icon: BookOpen,
  },
  {
    id: "page-gallery",
    title: "Ocean Photography Gallery",
    subtitle: "Curated high-res underwater moments and pelagic marine life",
    category: "Page",
    href: "/#gallery",
    icon: Camera,
  },
  {
    id: "page-faq",
    title: "Frequently Asked Questions",
    subtitle: "Swimming requirements, scuba gear, insurance, and booking info",
    category: "Page",
    href: "/#faq",
    icon: HelpCircle,
  },
  {
    id: "page-contact",
    title: "Plan Your Ocean Adventure",
    subtitle: "Send an inquiry or connect with our expedition leaders on WhatsApp",
    category: "Page",
    href: "/#contact",
    icon: Mail,
  },
];

export function SiteSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Global shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (open && e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Filtered results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_CATALOG;
    return SEARCH_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [query]);

  // Keyboard navigation through results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex].href);
    }
  };

  const navigate = (href: string) => {
    onClose();
    if (href.startsWith("/#")) {
      const elementId = href.replace("/#", "");
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 md:p-20 bg-black/80 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#02182e]/98 border border-sky-400/30 p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,12,28,0.9)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-sky-400/20 pb-3 sm:pb-4">
          <Search className="size-5 text-[#E8C58F] shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search trips, PADI courses, destinations..."
            className="w-full bg-transparent px-3 py-1.5 text-base sm:text-lg text-white placeholder-sky-200/50 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sky-300 hover:text-white p-1"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block rounded bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 text-[0.65rem] text-sky-300">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="mt-4 max-h-[55vh] overflow-y-auto space-y-2 pr-1 no-scrollbar">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sky-200/60">
              <Compass className="size-8 mx-auto mb-2 opacity-40 animate-pulse" />
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-sky-200/40 mt-1">Try searching for Maldives, Open Water, or Contact</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-sky-400/15 border border-sky-400/35 text-white"
                      : "hover:bg-white/5 border border-transparent text-sky-100/90"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`inline-flex size-9 items-center justify-center rounded-lg border shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#E8C58F] text-[#010F20] border-[#E8C58F]"
                          : "bg-sky-400/10 text-sky-300 border-sky-400/20"
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs sm:text-sm font-bold truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="shrink-0 rounded bg-sky-400/15 px-2 py-0.5 text-[0.65rem] font-bold text-sky-300 border border-sky-400/20">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[0.72rem] text-sky-200/70 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`size-4 text-sky-300 shrink-0 transition-transform ${
                      isSelected ? "translate-x-1 text-[#E8C58F]" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="mt-4 pt-3 border-t border-sky-400/15 flex items-center justify-between text-[0.68rem] text-sky-300/70">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded bg-sky-400/10 border border-sky-400/20 px-1.5 py-0.5 text-[0.62rem]">↑</kbd>{" "}
              <kbd className="rounded bg-sky-400/10 border border-sky-400/20 px-1.5 py-0.5 text-[0.62rem]">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="rounded bg-sky-400/10 border border-sky-400/20 px-1.5 py-0.5 text-[0.62rem]">↵</kbd> Select
            </span>
          </div>
          <span>Purva Ocean Adventures Catalog</span>
        </div>
      </div>
    </div>
  );
}

