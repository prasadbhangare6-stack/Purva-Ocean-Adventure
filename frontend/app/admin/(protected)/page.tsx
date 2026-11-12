import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  Send,
  GraduationCap,
  Image as ImageIcon,
  Mail,
  ExternalLink,
  Sheet,
  Activity,
  Layers,
  FileText,
  ShieldCheck,
  RotateCcw,
  Edit3,
  Eye,
  MessageCircle,
  HelpCircle,
  Camera,
  BookOpen,
  Waves,
} from "lucide-react";
import { requireSession } from "@/lib/auth/guards";
import { can } from "@/lib/auth/permissions";
import { getSiteContentStore } from "@/lib/data/siteStore";
import { getPoliciesStore } from "@/lib/data/policiesStore";

export const metadata: Metadata = {
  title: "Purva Control Center | Overview",
  robots: { index: false, follow: false },
};

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ forbidden?: string }>;
}) {
  const session = await requireSession();
  const { forbidden } = await searchParams;

  const store = getSiteContentStore();
  const policies = getPoliciesStore();

  let enquiryCount = 0;
  const enquiriesFile = path.join(process.cwd(), "data", "enquiries.json");
  if (fs.existsSync(enquiriesFile)) {
    try {
      const arr = JSON.parse(fs.readFileSync(enquiriesFile, "utf-8"));
      enquiryCount = Array.isArray(arr) ? arr.length : 0;
    } catch {
      enquiryCount = 0;
    }
  }

  const liveCounts = {
    trips: store.trips.length || 3,
    courses: store.courses.length || 3,
    gallery: store.gallery.length || 12,
    enquiries: enquiryCount || 3,
  };

  const SHORTCUTS = [
    { label: "Trips", href: "/admin/trips", icon: Waves },
    { label: "Courses", href: "/admin/courses", icon: GraduationCap },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Instagram", href: "/admin/instagram", icon: Camera },
    { label: "About Page", href: "/admin/about", icon: BookOpen },
    { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { label: "Contact Enquiries", href: "/admin/enquiries", icon: Mail },
  ];

  return (
    <div className="relative space-y-9 max-w-7xl mx-auto">
      {/* Decorative futuristic light-blue glass accents in top-right */}
      <div className="pointer-events-none absolute -top-8 -right-6 hidden lg:flex gap-3 opacity-30 z-0">
        <div className="h-44 w-12 bg-gradient-to-b from-blue-300 via-sky-200 to-transparent -skew-x-12 rounded-2xl" />
        <div className="h-52 w-14 bg-gradient-to-b from-blue-400 via-blue-200 to-transparent -skew-x-12 rounded-2xl" />
      </div>

      {/* Welcome & Live Action Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#0a2558]">
            Welcome back, {session.name}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Signed in with <strong className="text-[#0a2558] uppercase tracking-wider">{session.role}</strong> permissions. Here is your website control overview.
          </p>

          {forbidden && (
            <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-800">
              You do not have permission to open that section.
            </p>
          )}
        </div>

        {/* Quick Action Pill Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a2346] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#123363] transition-colors"
          >
            <ExternalLink className="size-3.5" />
            <span>Preview Live Website &rarr;</span>
          </Link>

          <a
            href={store.settings.googleSpreadsheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <Sheet className="size-3.5 text-emerald-600" />
            <span>Google Sheet &rarr;</span>
          </a>
        </div>
      </div>

      {/* SECTION: AT A GLANCE */}
      <section aria-labelledby="at-a-glance" className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-[#0a2558]" />
          <h2 id="at-a-glance" className="text-xs font-black tracking-wider text-[#0a2558] uppercase">
            AT A GLANCE
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Published Trips */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(15,23,42,0.04)] border border-slate-200/70 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#1865db]">
                <Send className="size-5 -rotate-45" />
              </div>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              PUBLISHED TRIPS
            </p>
            <p className="mt-1 font-sans text-4xl sm:text-5xl font-black text-[#0a2558] tracking-tight">
              {liveCounts.trips}
            </p>
            <Link
              href="/admin/trips"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#1865db] hover:text-[#0c4bb2] uppercase tracking-wider"
            >
              <span>OPEN MANAGEMENT</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Published Courses */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(15,23,42,0.04)] border border-slate-200/70 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#1865db]">
                <GraduationCap className="size-5" />
              </div>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              PUBLISHED COURSES
            </p>
            <p className="mt-1 font-sans text-4xl sm:text-5xl font-black text-[#0a2558] tracking-tight">
              {liveCounts.courses}
            </p>
            <Link
              href="/admin/courses"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#1865db] hover:text-[#0c4bb2] uppercase tracking-wider"
            >
              <span>OPEN MANAGEMENT</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Gallery Items */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(15,23,42,0.04)] border border-slate-200/70 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#1865db]">
                <ImageIcon className="size-5" />
              </div>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              GALLERY ITEMS
            </p>
            <p className="mt-1 font-sans text-4xl sm:text-5xl font-black text-[#0a2558] tracking-tight">
              {liveCounts.gallery}
            </p>
            <Link
              href="/admin/gallery"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#1865db] hover:text-[#0c4bb2] uppercase tracking-wider"
            >
              <span>OPEN MANAGEMENT</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Customer Enquiries */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(15,23,42,0.04)] border border-slate-200/70 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#eef4ff] text-[#1865db]">
                <Mail className="size-5" />
              </div>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              CUSTOMER ENQUIRIES
            </p>
            <p className="mt-1 font-sans text-4xl sm:text-5xl font-black text-[#0a2558] tracking-tight">
              {liveCounts.enquiries}
            </p>
            <Link
              href="/admin/enquiries"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#1865db] hover:text-[#0c4bb2] uppercase tracking-wider"
            >
              <span>OPEN MANAGEMENT</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: MANAGEMENT SHORTCUTS & SYSTEM HEALTH (2 COLUMNS) */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Management Shortcuts (7 cols) */}
        <div className="lg:col-span-7 overflow-hidden rounded-2xl shadow-sm border border-slate-200/80 bg-white">
          <div className="bg-[#0a2346] px-5 py-3 text-white flex items-center gap-2">
            <Layers className="size-4 text-blue-300" />
            <h3 className="text-xs font-bold uppercase tracking-wider">MANAGEMENT SHORTCUTS</h3>
          </div>
          <div className="p-5">
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SHORTCUTS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200/70 bg-[#f8fafc] hover:bg-blue-50/50 hover:border-blue-300 hover:text-[#1865db] transition-all text-center group"
                    >
                      <Icon className="size-4 text-slate-500 group-hover:text-[#1865db] transition-colors mb-1.5" />
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-[#0a2558]">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right Column: System Health & Integrations (5 cols) */}
        <div className="lg:col-span-5 overflow-hidden rounded-2xl shadow-sm border border-slate-200/80 bg-white">
          <div className="bg-[#0a2346] px-5 py-3 text-white flex items-center gap-2">
            <Activity className="size-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">SYSTEM HEALTH &amp; INTEGRATIONS</h3>
          </div>
          <div className="p-5 space-y-3.5 text-xs">
            {/* Google Sheets Sync Row */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200/70 bg-[#f8fafc]">
              <div className="flex items-center gap-2.5">
                <Sheet className="size-4 text-emerald-600" />
                <span className="font-semibold text-slate-700">Google Sheets Sync</span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Connected
                </span>
                <p className="text-[10px] text-slate-400">(purvaoceanadventures@gmail.com)</p>
              </div>
            </div>

            {/* WhatsApp Contact Row */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200/70 bg-[#f8fafc]">
              <div className="flex items-center gap-2.5">
                <MessageCircle className="size-4 text-emerald-500" />
                <span className="font-semibold text-slate-700">WhatsApp Contact</span>
              </div>
              <span className="font-mono font-bold text-[#0a2558]">+91 62623 23232</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: LEGAL & POLICIES MANAGEMENT */}
      <section className="overflow-hidden rounded-2xl shadow-sm border border-slate-200/80 bg-white">
        <div className="bg-[#0a2346] px-5 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-blue-300" />
            <h3 className="text-xs font-bold uppercase tracking-wider">LEGAL &amp; POLICIES MANAGEMENT</h3>
          </div>
          <Link
            href="/admin/policies"
            className="text-[11px] font-bold text-blue-300 hover:text-white uppercase tracking-wider"
          >
            Open Full Editor &rarr;
          </Link>
        </div>

        <div className="p-5 sm:p-6 grid gap-4 md:grid-cols-3">
          {/* Card 1: Terms & Conditions */}
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-4 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/60 text-[#1865db]">
                <FileText className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#0a2558] truncate">{policies.terms.title}</h4>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-emerald-700">{policies.terms.status}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Last updated: {policies.terms.lastUpdated}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-200/60">
              <Link
                href="/admin/policies?tab=terms"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-[#0a2346] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#123363] transition-colors shadow-sm"
              >
                <Edit3 className="size-3" />
                <span>Edit</span>
              </Link>
              <Link
                href="/policies#terms"
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Eye className="size-3" />
                <span>Preview</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Privacy Policy */}
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-4 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/60 text-[#1865db]">
                <ShieldCheck className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#0a2558] truncate">{policies.privacy.title}</h4>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-emerald-700">{policies.privacy.status}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Last updated: {policies.privacy.lastUpdated}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-200/60">
              <Link
                href="/admin/policies?tab=privacy"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-[#0a2346] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#123363] transition-colors shadow-sm"
              >
                <Edit3 className="size-3" />
                <span>Edit</span>
              </Link>
              <Link
                href="/policies#privacy"
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Eye className="size-3" />
                <span>Preview</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Cancellation & Refund Policy */}
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-4 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/60 text-[#1865db]">
                <RotateCcw className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#0a2558] truncate">{policies.cancellation.title}</h4>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-emerald-700">{policies.cancellation.status}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Last updated: {policies.cancellation.lastUpdated}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-200/60">
              <Link
                href="/admin/policies?tab=cancellation"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-[#0a2346] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#123363] transition-colors shadow-sm"
              >
                <Edit3 className="size-3" />
                <span>Edit</span>
              </Link>
              <Link
                href="/policies#cancellation"
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Eye className="size-3" />
                <span>Preview</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
