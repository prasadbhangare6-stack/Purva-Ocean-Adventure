"use client";

import { useState } from "react";
import { Check, X, Settings as SettingsIcon, MessageSquare, Mail, Table, Bell } from "lucide-react";
import type { SiteSettingsData } from "@/lib/data/siteStore";

export function SettingsManager({ initialSettings }: { initialSettings: SiteSettingsData }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "settings",
          action: "update",
          data: settings,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", text: "Settings saved successfully!" });
      } else {
        setFeedback({ type: "error", text: json.message || "Failed to update settings." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving settings." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">Website Settings</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Configure site-wide contact info, WhatsApp number, announcement banner, and Google Sheets integration.
        </p>
      </div>

      {feedback && (
        <div
          className={`rounded-xl border p-4 text-sm flex items-center justify-between ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <span className="font-medium">{feedback.text}</span>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-700">
            <X className="size-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Integrations */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2558] flex items-center gap-2 pb-3 border-b border-slate-100">
            <MessageSquare className="size-4 text-[#1865db]" />
            <span>WhatsApp & Contact Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                WhatsApp wa.me Link
              </label>
              <input
                type="url"
                required
                value={settings.whatsappUrl}
                onChange={(e) => setSettings({ ...settings, whatsappUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Official Email Address (Gmail)
            </label>
            <input
              type="email"
              required
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Top Announcement Banner */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2558] flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="size-4 text-[#1865db]" />
            <span>Top Announcement Banner</span>
          </h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="banner-toggle"
              checked={settings.announcement?.enabled || false}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement: {
                    enabled: e.target.checked,
                    message: settings.announcement?.message || "",
                    linkUrl: settings.announcement?.linkUrl || "",
                  },
                })
              }
              className="size-4 rounded accent-[#0a2346] cursor-pointer"
            />
            <label htmlFor="banner-toggle" className="text-sm text-slate-800 font-medium cursor-pointer">
              Enable announcement bar at top of website
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Banner Message
            </label>
            <input
              type="text"
              value={settings.announcement?.message || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement: {
                    enabled: settings.announcement?.enabled || false,
                    message: e.target.value,
                    linkUrl: settings.announcement?.linkUrl || "",
                  },
                })
              }
              placeholder="Limited spots remaining for Maafushi expedition!"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Google Sheets Connection */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2558] flex items-center gap-2 pb-3 border-b border-slate-100">
            <Table className="size-4 text-[#1865db]" />
            <span>Google Spreadsheet Lead Sync</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Connected Spreadsheet ID
            </label>
            <input
              type="text"
              readOnly
              value={settings.googleSpreadsheetId}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-sm text-slate-600 font-mono focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <a
              href={settings.googleSpreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1865db] hover:text-[#0c4bb2] transition-colors"
            >
              <span>Open connected Google Sheet in new tab &rarr;</span>
            </a>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] hover:bg-[#123363] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            <Check className="size-4" />
            <span>{saving ? "Saving Changes..." : "Save Website Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
