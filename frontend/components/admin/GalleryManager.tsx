"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Check, X, MapPin, Eye } from "lucide-react";
import type { FullPhotoItem } from "@/lib/data/curatedGallery";
import { ImageUploader } from "./ImageUploader";

const CATEGORIES = ["ALL", "UNDERWATER", "CORALS", "MARINE LIFE", "DIVERS", "EXPEDITIONS"] as const;

export function GalleryManager({ initialItems }: { initialItems: FullPhotoItem[] }) {
  const [items, setItems] = useState<FullPhotoItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [editingItem, setEditingItem] = useState<FullPhotoItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredItems =
    activeCategory === "ALL"
      ? items
      : items.filter((item) => item.category?.toUpperCase() === activeCategory);

  const handleEdit = (item: FullPhotoItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      id: `photo-${Date.now()}`,
      title: "New Ocean Photograph",
      category: "UNDERWATER",
      categoryLabel: "Underwater",
      src: "/media/P4.jpg",
      alt: "Underwater scene captured during ocean expedition",
      location: "Maldives",
      description: "Captivating view of marine life in deep oceanic waters."
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "gallery",
          action: isCreating ? "create" : "update",
          data: editingItem,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        if (isCreating) {
          setItems([editingItem, ...items]);
        } else {
          setItems(items.map((i) => (i.id === editingItem.id ? editingItem : i)));
        }
        setEditingItem(null);
        setIsCreating(false);
        setFeedback({ type: "success", text: "Gallery photo saved successfully!" });
      } else {
        setFeedback({ type: "error", text: json.message || "Failed to save photo." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving photo." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this photograph from the gallery?")) return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "gallery",
          action: "delete",
          data: { id },
        }),
      });

      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
        setFeedback({ type: "success", text: "Photo removed from gallery." });
      }
    } catch {
      setFeedback({ type: "error", text: "Failed to delete photo." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">Gallery Management</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Add new underwater photos, replace existing images, manage categories, and adjust descriptions ({items.length} total photos).
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] hover:bg-[#123363] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Upload / Add Photo</span>
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

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#0a2346] text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:text-[#0a2558] hover:border-slate-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl border border-slate-200/80 bg-white overflow-hidden flex flex-col hover:shadow-md transition-all shadow-sm"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
              <Image
                src={item.src || "/media/P4.jpg"}
                alt={item.alt || item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[0.62rem] font-bold tracking-wider text-[#0a2558] uppercase border border-slate-200/80 shadow-sm">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#0a2558] truncate">{item.title}</h4>
                <div className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] text-slate-500">
                  <MapPin className="size-3 text-[#1865db] shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <p className="mt-1 text-[0.68rem] text-slate-400 truncate">Path: {item.src}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleEdit(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1865db] hover:text-[#0c4bb2] transition-colors cursor-pointer"
                >
                  <Edit2 className="size-3.5" />
                  <span>Change / Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold font-serif text-[#0a2558]">
                {isCreating ? "Add New Gallery Photo" : "Edit Photograph"}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as FullPhotoItem["category"] })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="UNDERWATER">UNDERWATER</option>
                    <option value="CORALS">CORALS</option>
                    <option value="MARINE LIFE">MARINE LIFE</option>
                    <option value="DIVERS">DIVERS</option>
                    <option value="EXPEDITIONS">EXPEDITIONS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploader
                label="Photo File / Upload"
                value={editingItem.src}
                onChange={(src) => setEditingItem({ ...editingItem, src })}
                aspectRatio="wide"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Alt Text (Accessibility)</label>
                <input
                  type="text"
                  value={editingItem.alt || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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
                  <span>{saving ? "Saving..." : "Save Photo"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
