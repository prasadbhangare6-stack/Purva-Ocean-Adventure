"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Check, X, Shield, Clock, Compass } from "lucide-react";
import type { CuratedCourse } from "@/lib/data/curatedCourses";
import { ImageUploader } from "./ImageUploader";

export function CoursesManager({ initialCourses }: { initialCourses: CuratedCourse[] }) {
  const [courses, setCourses] = useState<CuratedCourse[]>(initialCourses);
  const [editingCourse, setEditingCourse] = useState<CuratedCourse | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEdit = (course: CuratedCourse) => {
    setEditingCourse({ ...course });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingCourse({
      slug: `new-course-${Date.now()}`,
      name: "Specialty Diving Certification",
      tagline: "Advance your underwater skills and safety",
      eyebrow: "PADI Specialty Diver",
      certification: "PADI Worldwide Certification",
      duration: "2–3 Days",
      maxDepth: "30 Meters / 100 Feet",
      minimumAge: "12 Years",
      prerequisites: "Open Water Diver certification",
      coverImage: "/media/P2.jpg",
      galleryImages: ["/media/P2.jpg"],
      summary: "Comprehensive training to explore specialized diving environments.",
      overview: "Detailed curriculum overview covering underwater navigation and deep diving safety.",
      skillsLearned: ["Buoyancy control", "Emergency protocols", "Reef navigation"],
      phases: [
        {
          number: 1,
          title: "Knowledge Development",
          description: "Theory and safety procedures."
        }
      ],
      inclusions: ["eLearning Materials", "Equipment Rental", "Certification Card"],
      requirements: ["Medical Statement", "Basic Swimming Skills"],
      pricing: { displayText: "Available on Request", note: "Includes all course materials" },
      cardTheme: {
        pillBg: "bg-[#0284c7]",
        pillTextColor: "text-white",
        pillHex: "#0284c7"
      }
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "courses",
          action: isCreating ? "create" : "update",
          data: editingCourse,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        if (isCreating) {
          setCourses([...courses, editingCourse]);
        } else {
          setCourses(courses.map((c) => (c.slug === editingCourse.slug ? editingCourse : c)));
        }
        setEditingCourse(null);
        setIsCreating(false);
        setFeedback({ type: "success", text: "Certification course saved successfully!" });
      } else {
        setFeedback({ type: "error", text: json.message || "Failed to save course." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving certification." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete this course (${slug})?`)) return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "courses",
          action: "delete",
          data: { slug },
        }),
      });

      if (res.ok) {
        setCourses(courses.filter((c) => c.slug !== slug));
        setFeedback({ type: "success", text: "Course deleted successfully." });
      }
    } catch {
      setFeedback({ type: "error", text: "Failed to delete course." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">Dive Certifications</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Manage PADI scuba courses, max depth limits, durations, descriptions, and cover photos.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] hover:bg-[#123363] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add New Course</span>
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.slug}
            className="group rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all"
          >
            {/* Cover Image Preview */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <Image
                src={course.coverImage || "/media/P2.jpg"}
                alt={course.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[0.65rem] font-bold tracking-wider text-[#0a2558] uppercase border border-slate-200/70 shadow-sm">
                  {course.eyebrow}
                </span>
              </div>
            </div>

            {/* Course Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0a2558] uppercase">{course.name}</h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-1">{course.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Compass className="size-3.5 text-[#1865db] shrink-0" />
                    <span className="font-medium">{course.maxDepth}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#1865db] shrink-0" />
                    <span className="font-medium">{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleEdit(course)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1865db] hover:text-[#0c4bb2] transition-colors cursor-pointer"
                >
                  <Edit2 className="size-3.5" />
                  <span>Edit Course</span>
                </button>
                <button
                  onClick={() => handleDelete(course.slug)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                  title="Delete Course"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Drawer Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold font-serif text-[#0a2558]">
                {isCreating ? "Create New Course" : `Edit Course: ${editingCourse.name}`}
              </h2>
              <button
                onClick={() => setEditingCourse(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Course Name</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Eyebrow / Level</label>
                  <input
                    type="text"
                    value={editingCourse.eyebrow}
                    onChange={(e) => setEditingCourse({ ...editingCourse, eyebrow: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Max Depth</label>
                  <input
                    type="text"
                    value={editingCourse.maxDepth}
                    onChange={(e) => setEditingCourse({ ...editingCourse, maxDepth: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploader
                label="Cover Photo"
                value={editingCourse.coverImage}
                onChange={(coverImage) => setEditingCourse({ ...editingCourse, coverImage })}
                aspectRatio="portrait"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingCourse.tagline}
                  onChange={(e) => setEditingCourse({ ...editingCourse, tagline: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  value={editingCourse.summary}
                  onChange={(e) => setEditingCourse({ ...editingCourse, summary: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Prerequisites</label>
                <input
                  type="text"
                  value={editingCourse.prerequisites}
                  onChange={(e) => setEditingCourse({ ...editingCourse, prerequisites: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
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
