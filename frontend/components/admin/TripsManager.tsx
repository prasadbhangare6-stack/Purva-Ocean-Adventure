"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Check, X, Calendar, MapPin, AlertCircle } from "lucide-react";
import type { CuratedTrip } from "@/lib/data/curatedTrips";
import { ImageUploader } from "./ImageUploader";

export function TripsManager({ initialTrips }: { initialTrips: CuratedTrip[] }) {
  const [trips, setTrips] = useState<CuratedTrip[]>(initialTrips);
  const [editingTrip, setEditingTrip] = useState<CuratedTrip | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEdit = (trip: CuratedTrip) => {
    setEditingTrip({ ...trip });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingTrip({
      slug: `trip-${Date.now()}`,
      name: "New Expedition",
      tagline: "Unforgettable ocean expedition",
      destination: "South Malé Atoll, Maldives",
      dates: "TBA 2027",
      duration: "5 Nights / 6 Days",
      dives: "10 Guided Dives",
      experienceLevel: "Open Water Diver & Above",
      groupSize: "Small Group (Max 10 Divers)",
      coverImage: "/media/maafushi-maldives.jpg",
      galleryImages: ["/media/maafushi-maldives.jpg"],
      summary: "Experience pristine reef dives and rich marine encounters.",
      overview: "Comprehensive dive itinerary with certified instructors and all safety equipment.",
      highlights: ["Manta Rays", "Reef Sharks", "Coral Gardens"],
      itinerary: [
        {
          day: 1,
          title: "Arrival & Orientation",
          subtitle: "Welcome briefing and check dive",
          description: "Arrive at destination, equipment fitting and safety briefing.",
          highlights: ["Orientation", "Check dive"],
        },
      ],
      inclusions: ["All Boat Dives", "Tanks & Weights", "Dive Guide"],
      exclusions: ["International Flights", "Personal Insurance"],
      requirements: ["PADI Certification Card", "Medical Clearance"],
      pricing: {
        displayText: "Available on Request",
        note: "Early bird booking privileges apply",
      },
      available: true,
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrip) return;

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "trips",
          action: isCreating ? "create" : "update",
          data: editingTrip,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        if (isCreating) {
          setTrips([...trips, editingTrip]);
        } else {
          setTrips(trips.map((t) => (t.slug === editingTrip.slug ? editingTrip : t)));
        }
        setEditingTrip(null);
        setIsCreating(false);
        setFeedback({ type: "success", text: "Trip saved successfully!" });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        setFeedback({ type: "error", text: json.message || "Failed to save trip." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving trip." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete this trip (${slug})?`)) return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "trips",
          action: "delete",
          data: { slug },
        }),
      });

      if (res.ok) {
        setTrips(trips.filter((t) => t.slug !== slug));
        setFeedback({ type: "success", text: "Trip deleted successfully." });
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch {
      setFeedback({ type: "error", text: "Failed to delete trip." });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Expedition Catalog
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-[#0a2558] font-bold">
            Trips Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Control upcoming expeditions, change cover photos, dates, pricing, and availability ({trips.length} published).
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#123363] transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add New Trip</span>
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

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.slug}
            className="group rounded-2xl border border-slate-200/80 bg-white overflow-hidden flex flex-col hover:border-blue-400 hover:shadow-md transition-all shadow-sm"
          >
            {/* Cover Image Preview */}
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <Image
                src={trip.coverImage || "/media/maafushi-maldives.jpg"}
                alt={trip.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-slate-800 uppercase border border-slate-200/80 shadow-sm">
                  {trip.destination}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    trip.available
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {trip.available ? "Available" : "Waitlist"}
                </span>
              </div>
            </div>

            {/* Trip Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-[#0a2558] uppercase">{trip.name}</h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-1">{trip.tagline}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="size-3.5 text-blue-600 shrink-0" />
                  <span className="truncate font-medium">{trip.dates}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleEdit(trip)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1865db] hover:text-[#0c4bb2] transition-colors cursor-pointer"
                >
                  <Edit2 className="size-3.5" />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(trip.slug)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                  title="Delete Trip"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Drawer Modal */}
      {editingTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold font-serif text-[#0a2558]">
                {isCreating ? "Create New Trip" : `Edit Trip: ${editingTrip.name}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingTrip(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Trip Name</label>
                  <input
                    type="text"
                    required
                    value={editingTrip.name}
                    onChange={(e) => setEditingTrip({ ...editingTrip, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    value={editingTrip.destination}
                    onChange={(e) => setEditingTrip({ ...editingTrip, destination: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Dates</label>
                  <input
                    type="text"
                    required
                    value={editingTrip.dates}
                    onChange={(e) => setEditingTrip({ ...editingTrip, dates: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Duration &amp; Dives</label>
                  <input
                    type="text"
                    value={editingTrip.duration}
                    onChange={(e) => setEditingTrip({ ...editingTrip, duration: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploader
                label="Cover Photo"
                value={editingTrip.coverImage}
                onChange={(coverImage) => setEditingTrip({ ...editingTrip, coverImage })}
                aspectRatio="wide"
              />

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingTrip.tagline}
                  onChange={(e) => setEditingTrip({ ...editingTrip, tagline: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  value={editingTrip.summary}
                  onChange={(e) => setEditingTrip({ ...editingTrip, summary: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Highlights (comma separated)
                </label>
                <input
                  type="text"
                  value={editingTrip.highlights?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="avail-check"
                  checked={editingTrip.available}
                  onChange={(e) => setEditingTrip({ ...editingTrip, available: e.target.checked })}
                  className="size-4 rounded accent-blue-600 cursor-pointer"
                />
                <label htmlFor="avail-check" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Trip is active and available for bookings
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTrip(null)}
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#123363] transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Check className="size-4" />
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
