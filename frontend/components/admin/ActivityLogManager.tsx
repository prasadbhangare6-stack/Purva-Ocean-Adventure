"use client";

import { ScrollText, Clock, User, ShieldCheck } from "lucide-react";

export type ActivityEntry = {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  status: "success" | "warning";
};

const SAMPLE_LOGS: ActivityEntry[] = [
  {
    id: "act-1",
    timestamp: "12 Oct 2026, 21:15 IST",
    actor: "Dr. Purva (Owner)",
    role: "Owner",
    action: "Updated Website Policies & Legal Documents",
    target: "Terms & Privacy Policy",
    status: "success",
  },
  {
    id: "act-2",
    timestamp: "12 Oct 2026, 18:40 IST",
    actor: "Admin Session",
    role: "System",
    action: "Media Storage Optimization & Space Cleanup",
    target: "Purged Unused Media Assets",
    status: "success",
  },
  {
    id: "act-3",
    timestamp: "10 Oct 2026, 15:20 IST",
    actor: "Dr. Purva (Owner)",
    role: "Owner",
    action: "Live Website Engine & Navigation Sync",
    target: "Header & Footer Navigation",
    status: "success",
  },
  {
    id: "act-4",
    timestamp: "08 Oct 2026, 11:05 IST",
    actor: "Google Cloud Engine",
    role: "System Integration",
    action: "Google Sheets Webhook Sync Health Verified",
    target: "Lead Ingestion Pipeline",
    status: "success",
  },
];

export function ActivityLogManager() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">Activity Audit Log</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Immutable audit record of all administrative edits, content publications, and system integrations.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0a2558] flex items-center gap-2">
            <ScrollText className="size-4 text-[#1865db]" />
            <span>Audit Trail</span>
          </h2>
          <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>Verified System Events</span>
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {SAMPLE_LOGS.map((log) => (
            <div
              key={log.id}
              className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-[#0a2558]">{log.action}</span>
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[0.62rem] uppercase font-bold text-[#1865db]">
                    {log.target}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5 text-slate-400" />
                    <span className="font-medium text-slate-600">{log.actor} ({log.role})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-slate-400" />
                    <span>{log.timestamp}</span>
                  </span>
                </div>
              </div>

              <span className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
