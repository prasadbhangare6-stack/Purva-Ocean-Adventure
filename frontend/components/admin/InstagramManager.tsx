"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, Camera, ExternalLink } from "lucide-react";
import type { SiteContentStore, InstagramReel } from "@/lib/data/siteStore";
import { ImageUploader } from "./ImageUploader";

export function InstagramManager({
  initialInstagram,
}: {
  initialInstagram: SiteContentStore["instagram"];
}) {
  const [data, setData] = useState(initialInstagram);
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
          resource: "instagram",
          action: "update",
          data,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", text: "Instagram reels updated successfully!" });
      } else {
        setFeedback({ type: "error", text: json.message || "Failed to update Instagram." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving Instagram settings." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">Instagram Reels Management</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Control the 6 featured Instagram video reels, URLs, thumbnails, and connected Instagram account handles.
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
        {/* Account Handles */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2558] flex items-center gap-2 pb-3 border-b border-slate-100">
            <Camera className="size-4 text-[#1865db]" />
            <span>Official Instagram Handles</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Company Account URL (@purvaoceanadventures)
              </label>
              <input
                type="url"
                required
                value={data.handleUrl}
                onChange={(e) => setData({ ...data, handleUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Founder Account URL (@dr.purvaa)
              </label>
              <input
                type="url"
                required
                value={data.founderHandleUrl}
                onChange={(e) => setData({ ...data, founderHandleUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 6 Reels Grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2558]">Featured Reels (6 Slots)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.reels.map((reel, idx) => (
              <div key={reel.id || idx} className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-3 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1865db] uppercase tracking-wider">Slot {idx + 1}</span>
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#1865db] transition-colors"
                    title="View on Instagram"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                <div>
                  <label className="block text-[0.65rem] font-semibold text-slate-500 uppercase mb-0.5">Reel Title</label>
                  <input
                    type="text"
                    value={reel.title}
                    onChange={(e) => {
                      const next = [...data.reels];
                      next[idx] = { ...next[idx], title: e.target.value };
                      setData({ ...data, reels: next });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[0.65rem] font-semibold text-slate-500 uppercase mb-0.5">
                    Instagram Reel URL
                  </label>
                  <input
                    type="url"
                    value={reel.url}
                    onChange={(e) => {
                      const next = [...data.reels];
                      next[idx] = { ...next[idx], url: e.target.value };
                      setData({ ...data, reels: next });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <ImageUploader
                  label="Thumbnail / Poster"
                  value={reel.thumbnail}
                  onChange={(thumbnail) => {
                    const next = [...data.reels];
                    next[idx] = { ...next[idx], thumbnail };
                    setData({ ...data, reels: next });
                  }}
                  aspectRatio="video"
                />

                <div>
                  <label className="block text-[0.65rem] font-semibold text-slate-500 uppercase mb-0.5">Caption</label>
                  <input
                    type="text"
                    value={reel.caption || ""}
                    onChange={(e) => {
                      const next = [...data.reels];
                      next[idx] = { ...next[idx], caption: e.target.value };
                      setData({ ...data, reels: next });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] hover:bg-[#123363] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            <Check className="size-4" />
            <span>{saving ? "Saving Changes..." : "Save Instagram Reels"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
