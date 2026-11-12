"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, User, BookOpen, Award, Save, AlertCircle } from "lucide-react";
import type { AboutPageData } from "@/lib/data/siteStore";
import { ImageUploader } from "./ImageUploader";

export function AboutManager({ initialAbout }: { initialAbout: AboutPageData }) {
  const [about, setAbout] = useState<AboutPageData>(initialAbout);
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
          resource: "about",
          action: "update",
          data: about,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", text: "About page content saved successfully!" });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ type: "error", text: json.message || "Failed to save about content." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving about content." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Brand Story &amp; Leadership
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-[#0a2558] font-bold">
            About Page Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Update the brand foundation story, founder bio, portrait photo, and organization milestones.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#123363] transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
        >
          <Save className="size-3.5" />
          <span>{saving ? "Saving..." : "Save About Page"}</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`flex items-center justify-between rounded-xl border p-4 text-xs font-medium ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <Check className="size-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="size-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-700">
            <X className="size-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Hero & Story */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-[#0a2558] font-bold text-xs uppercase tracking-wider">
            <BookOpen className="size-4 text-blue-600" />
            <span>Story &amp; Headings</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Eyebrow</label>
              <input
                type="text"
                value={about.eyebrow}
                onChange={(e) => setAbout({ ...about, eyebrow: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Main Headline</label>
              <input
                type="text"
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Subtitle</label>
            <input
              type="text"
              value={about.subtitle}
              onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Story Paragraph 1</label>
            <textarea
              rows={3}
              value={about.storyParagraphs[0] || ""}
              onChange={(e) => {
                const next = [...about.storyParagraphs];
                next[0] = e.target.value;
                setAbout({ ...about, storyParagraphs: next });
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Story Paragraph 2</label>
            <textarea
              rows={3}
              value={about.storyParagraphs[1] || ""}
              onChange={(e) => {
                const next = [...about.storyParagraphs];
                next[1] = e.target.value;
                setAbout({ ...about, storyParagraphs: next });
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Founder Details */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-[#0a2558] font-bold text-xs uppercase tracking-wider">
            <User className="size-4 text-blue-600" />
            <span>Founder Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Founder Name</label>
              <input
                type="text"
                value={about.founder.name}
                onChange={(e) =>
                  setAbout({ ...about, founder: { ...about.founder, name: e.target.value } })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Role / Title</label>
              <input
                type="text"
                value={about.founder.role}
                onChange={(e) =>
                  setAbout({ ...about, founder: { ...about.founder, role: e.target.value } })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <ImageUploader
            label="About Page Photo"
            value={about.founder.image}
            onChange={(image) =>
              setAbout({ ...about, founder: { ...about.founder, image } })
            }
            aspectRatio="portrait"
          />

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Founder Bio</label>
            <textarea
              rows={3}
              value={about.founder.bio}
              onChange={(e) =>
                setAbout({ ...about, founder: { ...about.founder, bio: e.target.value } })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Founder Instagram Link</label>
            <input
              type="url"
              value={about.founder.instagramUrl}
              onChange={(e) =>
                setAbout({ ...about, founder: { ...about.founder, instagramUrl: e.target.value } })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: Key Stats */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-[#0a2558] font-bold text-xs uppercase tracking-wider">
            <Award className="size-4 text-blue-600" />
            <span>Milestone Stats</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {about.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1 p-3 rounded-xl border border-slate-200 bg-slate-50 text-center">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const next = [...about.stats];
                    next[idx].value = e.target.value;
                    setAbout({ ...about, stats: next });
                  }}
                  className="w-full bg-transparent text-center font-serif text-2xl font-bold text-[#0a2558] focus:outline-none"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const next = [...about.stats];
                    next[idx].label = e.target.value;
                    setAbout({ ...about, stats: next });
                  }}
                  className="w-full bg-transparent text-center text-[10px] uppercase font-bold text-slate-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#123363] transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Check className="size-4" />
            <span>{saving ? "Saving Changes..." : "Save About Page"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
