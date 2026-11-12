"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { MapPin, Maximize2 } from "lucide-react";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  category: "underwater" | "corals" | "marineLife" | "divers" | "expeditions";
  categoryLabel: string;
  caption: string;
  location: string;
};

const CATEGORIES = [
  { value: "all", label: "All Moments" },
  { value: "underwater", label: "Underwater" },
  { value: "corals", label: "Corals" },
  { value: "marineLife", label: "Marine Life" },
  { value: "divers", label: "Divers" },
  { value: "expeditions", label: "Expeditions" },
] as const;

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? "bg-gold text-[#010F20] shadow-lg shadow-gold/20 font-bold scale-105"
                  : "bg-navy/70 text-foam/80 border hairline hover:border-gold/50 hover:text-gold hover:bg-navy"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border hairline bg-navy/60 transition-all duration-500 hover:border-gold/50 hover:shadow-2xl hover:shadow-sky/10"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-abyss">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-abyss/60 text-foam/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <Maximize2 className="size-4 text-gold" />
              </div>

              {/* Category pill */}
              <div className="absolute top-4 left-4">
                <span className="label-caps rounded-full bg-abyss/70 backdrop-blur-sm border border-sky/30 px-3 py-1 text-[0.65rem] text-sky-200">
                  {photo.categoryLabel}
                </span>
              </div>
            </div>

            {/* Caption & Location info */}
            <div className="p-5 flex flex-col justify-between">
              <p className="font-serif text-lg font-medium text-foam group-hover:text-gold transition-colors line-clamp-2">
                {photo.caption}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-foam/60">
                <MapPin className="size-3.5 text-gold shrink-0" />
                <span>{photo.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <Modal
          open={Boolean(activePhoto)}
          onClose={() => setActivePhoto(null)}
          title={activePhoto.categoryLabel}
          size="lg"
        >
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-abyss border hairline">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <div>
                <p className="font-serif text-xl sm:text-2xl text-foam font-semibold">
                  {activePhoto.caption}
                </p>
                <div className="mt-1 flex items-center gap-2 text-sm text-sky-300">
                  <MapPin className="size-4 text-gold shrink-0" />
                  <span>{activePhoto.location}</span>
                </div>
              </div>

              <span className="label-caps self-start sm:self-auto rounded-full bg-gold/15 border border-gold/30 px-4 py-1.5 text-xs text-gold">
                {activePhoto.categoryLabel}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

