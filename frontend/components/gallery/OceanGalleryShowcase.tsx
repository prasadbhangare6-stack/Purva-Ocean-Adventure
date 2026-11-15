"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { ArrowRight, Maximize2 } from "lucide-react";
import { ALL_GALLERY_PHOTOS, type FullPhotoItem } from "@/lib/data/curatedGallery";
import { GalleryLightbox } from "./GalleryLightbox";

type GalleryCategory =
  | "ALL"
  | "UNDERWATER"
  | "CORALS"
  | "MARINE LIFE"
  | "DIVERS"
  | "EXPEDITIONS";

const CATEGORIES: GalleryCategory[] = [
  "ALL",
  "UNDERWATER",
  "CORALS",
  "MARINE LIFE",
  "DIVERS",
  "EXPEDITIONS",
];

export type GalleryCardItem = FullPhotoItem;

export function OceanGalleryShowcase() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("ALL");
  const [items, setItems] = useState<GalleryCardItem[]>(ALL_GALLERY_PHOTOS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/content?resource=gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.gallery) && data.data.gallery.length > 0) {
          const mapped: GalleryCardItem[] = data.data.gallery.map((g: Record<string, string>, i: number) => ({
            id: g.id || `video-${i}`,
            title: g.title,
            category: (g.category as GalleryCardItem["category"]) || "UNDERWATER",
            categoryLabel: g.categoryLabel || "Underwater",
            src: g.src,
            alt: g.alt || g.title,
            location: g.location || "Maldives",
            description: g.description || "",
            aspect: (g.aspect as GalleryCardItem["aspect"]) || "portrait",
          }));
          setItems(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredItems = useMemo(() => {
    if (activeTab === "ALL") return items;
    return items.filter((item) => item.category === activeTab);
  }, [items, activeTab]);

  const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

  const findById = (id: string, fallbackIndex: number): GalleryCardItem =>
    items.find((i) => i.id === id) || items[fallbackIndex] || ALL_GALLERY_PHOTOS[0];

  const openLightboxForItem = (item: GalleryCardItem) => {
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const renderCard = (item: GalleryCardItem, extraClasses: string = "", objectPos: string = "object-center") => {
    if (!item) return null;

    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        onClick={() => openLightboxForItem(item)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightboxForItem(item);
          }
        }}
        title={`View ${item.title}`}
        aria-label={`View ${item.title}`}
        className={cn(
          "group relative block h-full w-full min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#02182c]/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)] cursor-pointer transition-all duration-500 hover:border-white/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.7)] hover:-translate-y-1",
          extraClasses,
        )}
      >
        {isVideoSrc(item.src) ? (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={cn(
              "absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
              objectPos,
            )}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
              objectPos,
            )}
          />
        )}

        {/* Ambient hover vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010f20]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Hover sheen sweep */}
        <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-[280%]" />

        {/* Expand icon on hover */}
        <div className="absolute top-3 right-3 rounded-full bg-black/55 backdrop-blur-md p-2 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-white/20">
          <Maximize2 className="size-3.5 text-[#E8C58F]" />
        </div>
      </div>
    );
  };

  const card1 = findById("shark-sunbeams", 0);
  const card2Top = findById("golden-anthias-garden", 1);
  const card2BotLeft = findById("hawksbill-turtle-glide", 2);
  const card2BotRight = findById("diver-reef-wall", 6);
  const card3Tall = findById("eagle-ray-squadron", 8);
  const card4Tall = findById("diver-turtle-swim", 7);

  return (
    <section
      id="gallery"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-between overflow-hidden bg-[#02182c] pt-20 sm:pt-24 pb-4 sm:pb-6 select-none scroll-mt-20"
    >
      {/* Background Lighting */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#02182c] via-[#022442] to-[#011427]"
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
          alt="Two spotted eagle rays gliding gracefully through sunlit tropical ocean"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[76%_18%] opacity-90"
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#02182c]/55 to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_65%_0%,rgba(110,195,255,0.2)_0%,rgba(2,24,44,0)_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(30,95,160,0.12)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-6 sm:px-10 lg:px-16 flex-1 min-h-0">
        {/* Top Header Row */}
        <div className="shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.24em] text-sky-300 uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                VISUAL COLLECTION
              </span>
              <span className="h-px w-16 sm:w-24 bg-sky-300/45" />
            </div>

            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
              Ocean <span className="font-serif italic font-normal text-[#8ec8f6]">Gallery</span>
            </h2>

            <p className="mt-4 sm:mt-5 max-w-xl text-xs sm:text-sm md:text-[0.94rem] text-sky-100/85 font-light leading-relaxed tracking-wide">
              Glimpses from past journeys across Maldivian reefs, pelagic highways, coral sanctuaries, and the inspiring community of divers who explore beneath the surface with us. Click any capture to view in full-screen.
            </p>
          </div>

          <div className="shrink-0 pb-1">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#02182c]/60 px-4 sm:px-5 py-2.5 text-[0.68rem] sm:text-xs font-semibold tracking-wider uppercase text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-[#010F20] shadow-lg group whitespace-nowrap"
            >
              <span>SEE FULL GALLERY</span>
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="shrink-0 mt-5 sm:mt-6 mb-4 sm:mb-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 text-[0.62rem] sm:text-[0.68rem] tracking-[0.16em] uppercase font-semibold transition-all duration-300 cursor-pointer select-none",
                  isActive
                    ? "bg-[#E8C58F] text-[#010F20] font-bold shadow-md shadow-[#E8C58F]/20 scale-105"
                    : "bg-[#02182c]/60 backdrop-blur-sm text-white/85 border border-white/20 hover:border-white/45 hover:text-white hover:bg-white/10 active:scale-95",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Video Grid Area */}
        <div className="relative z-10 flex-1 min-h-0 my-auto flex w-full items-center">
          {activeTab === "ALL" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.65fr_1fr_1fr] gap-3 sm:gap-3.5 w-full h-[46vh] sm:h-[48vh] lg:h-[50vh] max-h-[465px]">
              <div className="h-full w-full min-h-0">
                {renderCard(card1)}
              </div>

              <div className="h-full w-full min-h-0 flex flex-col gap-3 sm:gap-3.5">
                <div className="flex-[1.15] min-h-0 w-full">
                  {renderCard(card2Top)}
                </div>
                <div className="flex-1 min-h-0 w-full grid grid-cols-2 gap-3 sm:gap-3.5">
                  <div className="h-full w-full min-h-0">
                    {renderCard(card2BotLeft, "", "object-[50%_55%]")}
                  </div>
                  <div className="h-full w-full min-h-0">
                    {renderCard(card2BotRight, "", "object-[50%_45%]")}
                  </div>
                </div>
              </div>

              <div className="h-full w-full min-h-0">
                {renderCard(card3Tall)}
              </div>

              <div className="h-full w-full min-h-0">
                {renderCard(card4Tall)}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-4 sm:gap-5 w-full h-[46vh] sm:h-[48vh] lg:h-[50vh] max-h-[465px]",
                filteredItems.length <= 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto",
              )}
            >
              {filteredItems.map((item) => (
                <div key={item.id} className="h-full w-full min-h-0">
                  {renderCard(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Professional Full-Screen Lightbox Viewer */}
      <GalleryLightbox
        items={items}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
