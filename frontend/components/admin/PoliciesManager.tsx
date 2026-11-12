"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CalendarClock,
  Building2,
  Check,
  ExternalLink,
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import type { PoliciesData, PolicyBlock } from "@/lib/data/policiesStore";

export function PoliciesManager({ initialPolicies }: { initialPolicies: PoliciesData }) {
  const [data, setData] = useState<PoliciesData>(initialPolicies);
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "cancellation" | "meta">("terms");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setFeedback({ type: "success", text: "Policies updated and published to the live website!" });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ type: "error", text: result.message || "Failed to save policies." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving policies." });
    } finally {
      setSaving(false);
    }
  };

  const updateMetaField = (key: keyof PoliciesData["meta"], val: string) => {
    setData((prev) => ({
      ...prev,
      meta: { ...prev.meta, [key]: val },
    }));
  };

  const currentDoc =
    activeTab === "terms" ? data.terms : activeTab === "privacy" ? data.privacy : data.cancellation;

  const updateCurrentDoc = (updater: (doc: typeof currentDoc) => typeof currentDoc) => {
    if (activeTab === "meta") return;
    setData((prev) => ({
      ...prev,
      [activeTab]: updater(prev[activeTab]),
    }));
  };

  const updateSection = (idx: number, patch: Partial<PolicyBlock>) => {
    updateCurrentDoc((doc) => {
      const nextSections = [...doc.sections];
      nextSections[idx] = { ...nextSections[idx], ...patch };
      return { ...doc, sections: nextSections };
    });
  };

  const removeSection = (idx: number) => {
    updateCurrentDoc((doc) => ({
      ...doc,
      sections: doc.sections.filter((_, i) => i !== idx),
    }));
  };

  const addSection = () => {
    updateCurrentDoc((doc) => ({
      ...doc,
      sections: [
        ...doc.sections,
        {
          heading: `${doc.sections.length + 1}. New Policy Clause`,
          intro: ["Enter clause description or overview here..."],
          bullets: ["Specific condition or requirement"],
        },
      ],
    }));
    setExpandedSection(currentDoc.sections.length);
  };

  const addBullet = (secIdx: number) => {
    const sec = currentDoc.sections[secIdx];
    const nextBullets = [...(sec.bullets || []), "New requirement or rule"];
    updateSection(secIdx, { bullets: nextBullets });
  };

  const updateBullet = (secIdx: number, bIdx: number, text: string) => {
    const sec = currentDoc.sections[secIdx];
    const nextBullets = [...(sec.bullets || [])];
    nextBullets[bIdx] = text;
    updateSection(secIdx, { bullets: nextBullets });
  };

  const removeBullet = (secIdx: number, bIdx: number) => {
    const sec = currentDoc.sections[secIdx];
    const nextBullets = (sec.bullets || []).filter((_, i) => i !== bIdx);
    updateSection(secIdx, { bullets: nextBullets });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Live Policy Engine</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-[#0a2558] font-bold">
            Legal &amp; Policies Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl">
            Configure live Terms &amp; Conditions, Privacy Policy, and Cancellation &amp; Refund schedules published across Purva Ocean Adventures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/policies"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <span>Preview Public Page</span>
            <ExternalLink className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#123363] transition-colors shadow-sm disabled:opacity-60"
          >
            {saving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="size-3.5" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 text-xs font-medium ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {feedback.type === "success" ? <Check className="size-4 text-emerald-600 shrink-0" /> : <AlertCircle className="size-4 text-rose-600 shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Tabs Row */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("terms")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "terms"
              ? "bg-[#1865db] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <FileText className="size-3.5" />
          <span>Terms &amp; Conditions</span>
          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
            {data.terms.sections.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("privacy")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "privacy"
              ? "bg-[#1865db] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <ShieldCheck className="size-3.5" />
          <span>Privacy Policy</span>
          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
            {data.privacy.sections.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cancellation")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "cancellation"
              ? "bg-[#1865db] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <CalendarClock className="size-3.5" />
          <span>Cancellation &amp; Refund</span>
          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
            {data.cancellation.sections.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("meta")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "meta"
              ? "bg-[#1865db] text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          <Building2 className="size-3.5" />
          <span>Company &amp; Legal Info</span>
        </button>
      </div>

      {/* Meta Tab */}
      {activeTab === "meta" ? (
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <h2 className="text-lg font-bold text-[#0a2558]">Company &amp; Governing Legal Information</h2>
          <p className="text-xs text-slate-500">
            These official details populate the footers and legal disclosures of all three policy documents.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                Legal Business Name
              </label>
              <input
                type="text"
                value={data.meta.legalName}
                onChange={(e) => updateMetaField("legalName", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                Official Contact Email
              </label>
              <input
                type="email"
                value={data.meta.email}
                onChange={(e) => updateMetaField("email", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                value={data.meta.phone}
                onChange={(e) => updateMetaField("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                Governing Jurisdiction
              </label>
              <input
                type="text"
                value={data.meta.jurisdiction}
                onChange={(e) => updateMetaField("jurisdiction", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                Primary Operating Base
              </label>
              <input
                type="text"
                value={data.meta.operatingBase}
                onChange={(e) => updateMetaField("operatingBase", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Policy Document Editor */
        <div className="space-y-6">
          {/* Document Header Settings */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Document Display Title
              </label>
              <input
                type="text"
                value={currentDoc.title}
                onChange={(e) => updateCurrentDoc((doc) => ({ ...doc, title: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="w-48">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Last Updated Date
              </label>
              <input
                type="text"
                value={currentDoc.lastUpdated}
                onChange={(e) => updateCurrentDoc((doc) => ({ ...doc, lastUpdated: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="w-36">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Status
              </label>
              <select
                value={currentDoc.status}
                onChange={(e) =>
                  updateCurrentDoc((doc) => ({
                    ...doc,
                    status: e.target.value as "Published" | "Draft",
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Clauses List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Document Clauses ({currentDoc.sections.length} Sections)
              </h2>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Plus className="size-3.5" />
                <span>Add Clause</span>
              </button>
            </div>

            {currentDoc.sections.map((sec, secIdx) => {
              const isExpanded = expandedSection === secIdx;

              return (
                <div
                  key={secIdx}
                  className="rounded-2xl bg-white shadow-sm border border-slate-200/80 overflow-hidden transition-all"
                >
                  {/* Clause Header Bar */}
                  <div
                    onClick={() => setExpandedSection(isExpanded ? null : secIdx)}
                    className="flex items-center justify-between p-4 sm:px-6 cursor-pointer hover:bg-slate-50/70 select-none transition-colors border-b border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[11px] font-bold text-blue-700">
                        {secIdx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {sec.heading || `Clause ${secIdx + 1}`}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSection(secIdx);
                        }}
                        title="Delete clause"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      <span className="text-slate-400">
                        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </span>
                    </div>
                  </div>

                  {/* Clause Body Editor */}
                  {isExpanded && (
                    <div className="p-6 pt-2 space-y-5 border-t border-slate-100 bg-slate-50/30">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Clause Heading
                        </label>
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={(e) => updateSection(secIdx, { heading: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                        />
                      </div>

                      {/* Introductory Paragraphs */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Clause Description / Text (one paragraph per line)
                        </label>
                        <textarea
                          rows={3}
                          value={(sec.intro || []).join("\n\n")}
                          onChange={(e) =>
                            updateSection(secIdx, {
                              intro: e.target.value.split("\n\n").filter(Boolean),
                            })
                          }
                          placeholder="Enter paragraph text..."
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 leading-relaxed focus:border-blue-600 focus:outline-none"
                        />
                      </div>

                      {/* Bullet Items */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Clause Bullet Points ({sec.bullets?.length || 0})
                          </label>
                          <button
                            type="button"
                            onClick={() => addBullet(secIdx)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                          >
                            <Plus className="size-3" />
                            <span>Add bullet</span>
                          </button>
                        </div>

                        {(sec.bullets || []).map((bText, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                            <textarea
                              rows={2}
                              value={bText}
                              onChange={(e) => updateBullet(secIdx, bIdx, e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => removeBullet(secIdx, bIdx)}
                              className="mt-2 p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                              title="Delete bullet"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Refund Schedule Table Editor if present (for Cancellation Policy) */}
                      {sec.table && (
                        <div className="space-y-3 pt-2">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Refund Schedule Table
                          </label>
                          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-xs">
                              <thead className="bg-[#0a2346] text-white text-left font-semibold">
                                <tr>
                                  <th className="px-3.5 py-2.5 w-1/2">Cancellation Notice</th>
                                  <th className="px-3.5 py-2.5 w-1/2">Refund / Credit Terms</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {sec.table.map((row, rIdx) => (
                                  <tr key={rIdx}>
                                    <td className="p-2">
                                      <input
                                        type="text"
                                        value={row.notice}
                                        onChange={(e) => {
                                          const nextTable = [...sec.table!];
                                          nextTable[rIdx] = { ...row, notice: e.target.value };
                                          updateSection(secIdx, { table: nextTable });
                                        }}
                                        className="w-full rounded-lg border border-slate-200 p-2 font-semibold text-slate-800"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <textarea
                                        rows={2}
                                        value={row.refund}
                                        onChange={(e) => {
                                          const nextTable = [...sec.table!];
                                          nextTable[rIdx] = { ...row, refund: e.target.value };
                                          updateSection(secIdx, { table: nextTable });
                                        }}
                                        className="w-full rounded-lg border border-slate-200 p-2 text-slate-700"
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Save Trigger */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] px-6 py-3 text-xs font-bold text-white hover:bg-[#123363] transition-colors shadow-md disabled:opacity-60"
            >
              <Save className="size-4" />
              <span>{saving ? "Saving Changes..." : "Save All Policy Changes"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

