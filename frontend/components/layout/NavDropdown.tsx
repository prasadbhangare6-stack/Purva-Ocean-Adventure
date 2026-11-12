"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavChild } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * Accessible dropdown.
 * - Button toggles with click/tap and Enter/Space.
 * - ArrowDown opens and moves focus into the list; Escape closes and returns focus.
 * - Closes on outside click/touch and when focus leaves the component.
 * - Parent link stays navigable (the label links to the index page).
 */
export function NavDropdown({
  label,
  href,
  items,
  viewAll,
  active,
  theme = "light",
  navTheme = "white",
}: {
  label: string;
  href: string;
  items: NavChild[];
  viewAll?: NavChild;
  active: boolean;
  theme?: "light" | "dark";
  navTheme?: "white" | "black";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const isBlackNav = navTheme === "black";
  const isDarkOnLight = isBlackNav || theme === "light";

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", event => onKey(event));
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", event => onKey(event));
    };
  }, [open]);

  function onTriggerKey(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        document.getElementById(menuId)?.querySelector<HTMLAnchorElement>("a")?.focus();
      });
    }
  }

  function onMenuBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={onMenuBlur}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Show ${label} options`}
        onClick={() => {
          if (pathname === "/") {
            const targetId = label === "Our Trips" ? "upcoming-trips" : label === "Courses" ? "courses" : null;
            if (targetId) {
              const el = document.getElementById(targetId);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
                return;
              }
            }
          }
          setOpen((v) => !v);
        }}
        onKeyDown={onTriggerKey}
        className={cn(
          "label-caps relative group inline-flex items-center gap-1.5 py-2 transition-colors duration-300 cursor-pointer select-none",
          isBlackNav
            ? active
              ? "text-black font-extrabold"
              : "text-black/80 hover:text-black font-bold"
            : active
              ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
              : "text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]",
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-300",
            open && "rotate-180",
            isBlackNav
              ? active
                ? "text-black"
                : "text-black/70 group-hover:text-black"
              : active
                ? "text-white"
                : "text-white/70 group-hover:text-white",
          )}
          aria-hidden="true"
        />

        {/* Simple thin line indicator (white on page 1, black on page 2 & 3) */}
        <span
          className={cn(
            "absolute inset-x-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 pointer-events-none",
            isBlackNav ? "bg-black" : "bg-white",
            active
              ? "opacity-100 scale-x-100"
              : "opacity-0 scale-x-50 group-hover:opacity-75 group-hover:scale-x-100",
          )}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className={cn(
          "absolute left-0 top-full z-50 w-80 pt-2",
          open && "animate-fade-up",
        )}
      >
        <ul
          className={cn(
            "overflow-hidden rounded-2xl py-2.5 backdrop-blur-2xl transition-all shadow-2xl",
            isDarkOnLight
              ? "border border-slate-200/90 bg-white/98 text-slate-800 shadow-[0_20px_50px_rgba(2,24,54,0.16)]"
              : "border border-white/20 bg-[#021428]/95 text-foam shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]",
          )}
        >
          <li className="px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sky-500/90 border-b border-slate-100 dark:border-white/10">
            {label === "Our Trips" ? "Upcoming Expeditions" : `${label} List`}
          </li>

          {items.length === 0 && (
            <li className="px-4 py-3 text-sm text-slate-400">No published items yet.</li>
          )}

          {items.map((item) => (
            <li key={item.href}>
              <DropdownLink item={item} isDarkOnLight={isDarkOnLight} onSelect={() => setOpen(false)} />
            </li>
          ))}

          {viewAll && (
            <li className={cn("mt-1.5 border-t pt-1.5", isDarkOnLight ? "border-slate-100" : "border-white/10")}>
              <DropdownLink item={viewAll} emphasis isDarkOnLight={isDarkOnLight} onSelect={() => setOpen(false)} />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function DropdownLink({
  item,
  emphasis = false,
  isDarkOnLight = false,
  onSelect,
}: {
  item: NavChild;
  emphasis?: boolean;
  isDarkOnLight?: boolean;
  onSelect?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      onClick={(e) => {
        onSelect?.();
        if (item.href.startsWith("/#") && pathname === "/") {
          const id = item.href.replace("/#", "");
          const el = document.getElementById(id);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors",
        isDarkOnLight
          ? "text-slate-700 hover:bg-sky-50 hover:text-[#0284c7]"
          : "text-white/85 hover:bg-white/10 hover:text-sky-300",
        emphasis &&
          (isDarkOnLight
            ? "font-bold text-[#0284c7] hover:bg-sky-50"
            : "font-bold text-sky-300 hover:bg-white/10"),
        active &&
          (isDarkOnLight
            ? "text-[#0284c7] font-semibold bg-sky-50/80"
            : "text-sky-300 bg-white/15"),
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={emphasis ? "label-caps font-bold text-xs tracking-wider" : ""}>
          {item.label}
        </span>
        {emphasis && <span aria-hidden="true">&rarr;</span>}
      </div>
    </Link>
  );
}
