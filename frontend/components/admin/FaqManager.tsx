"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X, HelpCircle } from "lucide-react";
import type { FaqItem } from "@/lib/data/curatedFaqs";

export function FaqManager({ initialFaqs }: { initialFaqs: FaqItem[] }) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEdit = (faq: FaqItem) => {
    setEditingFaq({ ...faq });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    const nextId = (faqs.length + 1).toString();
    setEditingFaq({
      id: nextId,
      question: "New Diving Question?",
      answer: "Comprehensive answer explaining diving procedures, requirements, and safety protocols.",
      icon: "shield",
      category: "Diving Questions"
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "faq",
          action: isCreating ? "create" : "update",
          data: editingFaq,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        if (isCreating) {
          setFaqs([...faqs, editingFaq]);
        } else {
          setFaqs(faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f)));
        }
        setEditingFaq(null);
        setIsCreating(false);
        setFeedback({ type: "success", text: "FAQ updated successfully!" });
      } else {
        setFeedback({ type: "error", text: json.message || "Failed to save FAQ." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving FAQ." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ question?")) return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "faq",
          action: "delete",
          data: { id },
        }),
      });

      if (res.ok) {
        setFaqs(faqs.filter((f) => f.id !== id));
        setFeedback({ type: "success", text: "FAQ question deleted." });
      }
    } catch {
      setFeedback({ type: "error", text: "Failed to delete FAQ." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">FAQ Management</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Edit questions, update dive certification answers, safety guidelines, and add new questions ({faqs.length} total).
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] hover:bg-[#123363] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add New FAQ</span>
        </button>
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

      {/* FAQ Cards List */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-[#1865db]">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-sm text-[#0a2558]">{faq.question}</h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">{faq.answer}</p>
                {faq.category && (
                  <span className="mt-2.5 inline-block rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 text-[0.62rem] uppercase font-bold text-slate-600">
                    {faq.category}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => handleEdit(faq)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#1865db] transition-colors cursor-pointer shadow-xs"
              >
                <Edit2 className="size-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer bg-white"
                title="Delete"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold font-serif text-[#0a2558]">
                {isCreating ? "Add New FAQ" : "Edit FAQ Question"}
              </h2>
              <button
                onClick={() => setEditingFaq(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={editingFaq.category || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  placeholder="e.g. Certifications, Preparation, Wildlife"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Answer Text
                </label>
                <textarea
                  rows={5}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] hover:bg-[#123363] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Check className="size-4" />
                  <span>{saving ? "Saving..." : "Save FAQ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
