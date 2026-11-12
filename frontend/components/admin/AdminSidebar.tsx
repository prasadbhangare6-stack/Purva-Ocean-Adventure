"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Waves,
  GraduationCap,
  Images,
  Camera,
  BookOpen,
  HelpCircle,
  Mail,
  FolderOpen,
  Users,
  Settings,
  ShieldCheck,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import type { Resource } from "@/lib/auth/roles";
import { ADMIN_NAV, type AdminNavKey } from "@/lib/admin/navigation";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/ui/Logo";

/** Icons for each navigation key. Kept here because icons are client components. */
const ICONS: Record<AdminNavKey, LucideIcon> = {
  overview: LayoutDashboard,
  trips: Waves,
  courses: GraduationCap,
  gallery: Images,
  instagram: Camera,
  about: BookOpen,
  faq: HelpCircle,
  enquiries: Mail,
  media: FolderOpen,
  users: Users,
  settings: Settings,
  policies: ShieldCheck,
  activity: ScrollText,
};

export function AdminSidebar({ allowed }: { allowed: Array<Resource | "overview"> }) {
  const pathname = usePathname();
  const items = ADMIN_NAV.filter((item) => allowed.includes(item.resource));

  return (
    <aside className="flex w-full flex-col bg-[#051735] text-white lg:sticky lg:top-0 lg:h-dvh lg:w-72 lg:shrink-0 lg:border-r lg:border-[#0f2852] shadow-xl z-20">
      {/* Brand Logo Header */}
      <div className="flex flex-col items-center justify-center px-6 py-7 border-b border-[#0f2852]/60">
        <Logo href="/admin" variant="full" />
      </div>

      {/* Navigation List */}
      <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = ICONS[item.key];
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200",
                    active
                      ? "bg-[#1865db] text-white shadow-md shadow-blue-900/50"
                      : "text-[#8ea5c8] hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", active ? "text-white" : "text-[#7a95be]")} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Futuristic Ocean Angled Stripes in Bottom-Left */}
      <div className="p-6 pt-2 pointer-events-none border-t border-[#0f2852]/40">
        <div className="flex items-end gap-2 opacity-70">
          <div className="h-10 w-2.5 bg-[#1865db] -skew-x-12 rounded-sm" />
          <div className="h-7 w-3 bg-[#38bdf8] -skew-x-12 rounded-sm" />
          <div className="h-4 w-1.5 bg-[#60a5fa] -skew-x-12 rounded-sm" />
        </div>
      </div>
    </aside>
  );
}
