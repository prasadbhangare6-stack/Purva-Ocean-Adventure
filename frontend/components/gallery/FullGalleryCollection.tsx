"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
} from "lucide-react";
import { ALL_GALLERY_PHOTOS as BASE_GALLERY_PHOTOS, type FullPhotoItem } from "@/lib/data/curatedGallery";
import { GalleryLightbox } from "./GalleryLightbox";

export type { FullPhotoItem };
export const ALL_GALLERY_PHOTOS: FullPhotoItem[] = BASE_GALLERY_PHOTOS;

type CategoryFilter =
  | "ALL"
  | "UNDERWATER"
  | "CORALS"
  | "MARINE LIFE"
  | "DIVERS"
  | "EXPEDITIONS";

const CATEGORIES: CategoryFilter[] = [
  "ALL",
  "UNDERWATER",
  "CORALS",
  "MARINE LIFE",
  "DIVERS",
  "EXPEDITIONS",
];

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

function MasonryCard({
  photo,
  isTarget,
  onClick,
}: {
  photo: FullPhotoItem;
  isTarget: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isVideo = isVideoSrc(photo.src);
  const imageSrc = isVideo && photo.poster ? photo.poster : photo.src;

  return (
    <div
      id={`photo-${photo.id}`}
      role="button"
      tabIndex={0}
      aria-label={`View ${photo.title}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl border bg-[#02182c]/80 shadow-[0_12px_36px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 hover:border-white/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 break-inside-avoid mb-4 sm:mb-5",
        isTarget
          ? "border-[#E8C58F] ring-4 ring-[#E8C58F]/60 ring-offset-4 ring-offset-[#010f20] scale-[1.02]"
          : "border-white/15",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          photo.aspect === "portrait"
            ? "aspect-[3/4]"
            : photo.aspect === "square"
              ? "aspect-square"
              : "aspect-[13/9]",
        )}
      >
        {/* Instant optimized Next.js poster image */}
        <Image
          src={imageSrc}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Video preview: ONLY mounted on hover to avoid network congestion */}
        {isVideo && isHovered && (
          <video
            src={photo.src}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 size-full object-cover transition-opacity duration-300"
          />
        )}

        {/* Video indicator badge */}
        {isVideo && (
          <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider uppercase text-white/95 border border-white/20 shadow-md">
            <Play className="size-3 fill-current text-[#E8C58F]" />
            <span>Video</span>
          </div>
        )}

        {/* Subtle hover vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010f20]/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top expand/play icon on hover */}
        <div className="absolute top-3 right-3 rounded-full bg-black/55 backdrop-blur-md p-2 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow border border-white/15">
          <Play className="size-4 fill-current text-[#E8C58F]" />
        </div>

        {/* Card info overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#010f20]/95 via-[#010f20]/60 to-transparent">
          <p className="font-serif text-sm font-semibold text-white truncate drop-shadow-sm">{photo.title}</p>
          <p className="text-[0.65rem] text-sky-200/90 tracking-wider uppercase">{photo.location}</p>
        </div>
      </div>
    </div>
  );
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialPhotoParam = searchParams.get("photo");

  const [photos, setPhotos] = useState<FullPhotoItem[]>(BASE_GALLERY_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Sync with live store in browser
  useEffect(() => {
    fetch("/api/admin/content?resource=gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.gallery?.length) {
          setPhotos(data.data.gallery);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered items
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "ALL") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [photos, activeCategory]);

  // If URL has a photo/video param: open in lightbox immediately
  useEffect(() => {
    if (initialPhotoParam && photos.length > 0) {
      setHighlightedId(initialPhotoParam);
      const idx = photos.findIndex((p) => p.id === initialPhotoParam);
      if (idx !== -1) {
        setLightboxIndex(idx);
      }
    }
  }, [initialPhotoParam, photos]);

  const openLightboxById = (id: string) => {
    const idx = filteredPhotos.findIndex((p) => p.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="relative min-h-screen bg-[#010f20] text-white pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#02182c] via-[#011427] to-[#010f20]"
        aria-hidden="true"
      />
      {/* Top-Right Corner Background Image */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] overflow-hidden select-none sm:h-[600px] lg:h-[680px]"
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 72% at 72% 24%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.72) 52%, rgba(0,0,0,0.18) 76%, rgba(0,0,0,0) 96%)",
          maskImage:
            "radial-gradient(ellipse 68% 72% at 72% 24%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.72) 52%, rgba(0,0,0,0.18) 76%, rgba(0,0,0,0) 96%)",
        }}
      >
        <Image
          src="/media/gallery-eagle-ray-bg.jpg"
          alt="Spotted eagle rays gliding gracefully through sunlit tropical ocean"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[76%_18%] opacity-90"
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#02182c]/55 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-5 sm:gap-6">
          <div>
            <Link
              href="/#gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-white/80 transition-all hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/15 pb-8 sm:pb-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-[0.68rem] sm:text-xs font-semibold tracking-[0.24em] text-sky-300 uppercase">
                  COMPLETE COLLECTION
                </span>
                <span className="h-px w-16 sm:w-24 bg-sky-300/40" />
              </div>
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.08]">
                Expedition <span className="font-serif italic font-normal text-[#8ec8f6]">Archives</span>
              </h1>
              <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base text-sky-100/85 font-light leading-relaxed">
                Explore our full ocean archive of underwater photography and cinematic video captures across Maldives atolls, Lakshadweep lagoons, pelagic encounters, and intimate community dive moments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/15 bg-[#02182c]/70 px-4 py-3 backdrop-blur-md">
                <p className="text-[0.65rem] uppercase tracking-wider text-sky-300 font-semibold">Total Captures</p>
                <p className="font-serif text-2xl font-bold text-white mt-0.5">{photos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer select-none",
                  isActive
                    ? "bg-[#E8C58F] text-[#010f20] font-bold shadow-md shadow-[#E8C58F]/20 scale-105"
                    : "bg-[#02182c]/70 backdrop-blur-sm text-white/80 border border-white/20 hover:border-white/50 hover:text-white hover:bg-white/10 active:scale-95",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Notification pill if arriving via direct share link */}
        {highlightedId && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#E8C58F]/20 border border-[#E8C58F]/40 px-4 py-1.5 text-xs text-[#E8C58F] animate-fade-up">
            <CheckCircle2 className="size-3.5" />
            <span>Viewing capture • Click any media to open the full-screen cinematic viewer</span>
          </div>
        )}

        {/* Full Visual Masonry / Adaptive Grid */}
        <div
          className={cn(
            "mt-8",
            filteredPhotos.length >= 4
              ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5"
              : cn(
                  "grid items-start gap-4 sm:gap-5",
                  filteredPhotos.length <= 2 ? "sm:grid-cols-2 max-w-4xl" : "sm:grid-cols-2 lg:grid-cols-3",
                ),
          )}
        >
          {filteredPhotos.map((photo) => (
            <MasonryCard
              key={photo.id}
              photo={photo}
              isTarget={highlightedId === photo.id}
              onClick={() => openLightboxById(photo.id)}
            />
          ))}
        </div>
      </Container>

      {/* Professional Full-Screen Media Lightbox Viewer */}
      <GalleryLightbox
        items={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}

export function FullGalleryCollection() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#010f20] flex items-center justify-center text-white">
          <div className="animate-pulse font-serif text-lg tracking-wider text-sky-300">
            Loading Ocean Gallery...
          </div>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
