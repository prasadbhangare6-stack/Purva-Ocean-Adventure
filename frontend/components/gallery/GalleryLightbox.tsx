"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  MapPin,
} from "lucide-react";
import type { FullPhotoItem } from "@/lib/data/curatedGallery";
import { cn } from "@/lib/utils/cn";

export type { FullPhotoItem };

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

export function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: {
  items: FullPhotoItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}) {
  const [mounted, setMounted] = useState(false);

  // Photograph Zoom & Pan State
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile Touch Swipe Handling
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const activeItem =
    currentIndex !== null && items[currentIndex] ? items[currentIndex] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom & video state when active item changes
  useEffect(() => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [currentIndex]);

  // Lock body scroll and handle history state
  useEffect(() => {
    if (currentIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Push state for back button closing
    window.history.pushState({ lightbox: true }, "");

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentIndex, onClose]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    const prev = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prev);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || items.length === 0) return;
    const next = (currentIndex + 1) % items.length;
    onNavigate(next);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard controls
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === " " && activeItem && isVideoSrc(activeItem.src)) {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleZoomReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, handlePrev, handleNext, onClose, activeItem]);

  // Zoom functions
  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleZoomReset = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleDoubleTap = () => {
    if (zoomScale > 1) {
      handleZoomReset();
    } else {
      setZoomScale(2);
    }
  };

  // Mouse pan handlers for zoomed image
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...panOffset };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPanOffset({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers (Swipe navigation & pan)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
      if (zoomScale > 1) {
        setIsDragging(true);
        dragStartRef.current = { x: touch.clientX, y: touch.clientY };
        panStartRef.current = { ...panOffset };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (zoomScale > 1 && isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      setPanOffset({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomScale > 1) {
      setIsDragging(false);
      return;
    }
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const dt = Date.now() - touchStartRef.current.time;

    // Fast horizontal swipe with minimal vertical drift
    if (dt < 400 && Math.abs(dx) > 40 && Math.abs(dy) < 60) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartRef.current = null;
  };

  // Video playback controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const target = parseFloat(e.target.value);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen?.().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!mounted || currentIndex === null || !activeItem) {
    return null;
  }

  const isVideo = isVideoSrc(activeItem.src);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.title} viewer`}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white select-none overflow-hidden animate-fade-in"
      onClick={onClose}
    >
      {/* Top Bar: Title & Position Counter (Left) + Zoom / Controls (Center) + Close Button (Right) */}
      <div
        className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Position Counter and Title */}
        <div className="flex items-center gap-3 min-w-0 pr-2">
          <span className="font-mono text-xs sm:text-sm tracking-widest text-[#E8C58F] font-bold shrink-0">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="h-3 w-px bg-white/20 shrink-0 hidden sm:block" />
          <div className="min-w-0 hidden sm:flex items-center gap-2">
            <span className="text-sm font-medium text-white/90 truncate max-w-xs md:max-w-md">
              {activeItem.title}
            </span>
            {activeItem.location && (
              <span className="inline-flex items-center gap-1 text-xs text-sky-300/80 truncate">
                <MapPin className="size-3 text-[#E8C58F] shrink-0" />
                <span className="truncate">{activeItem.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Center: Image Zoom Controls (Photos only) */}
        {!isVideo && (
          <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-2.5 py-1 shadow-lg">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomScale <= 1}
              aria-label="Zoom out"
              className="p-1 text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ZoomOut className="size-4" />
            </button>
            <span className="font-mono text-[0.68rem] font-bold text-white/90 w-10 text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomScale >= 4}
              aria-label="Zoom in"
              className="p-1 text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ZoomIn className="size-4" />
            </button>
            {zoomScale > 1 && (
              <button
                type="button"
                onClick={handleZoomReset}
                aria-label="Reset zoom to fit screen"
                className="ml-1 p-1 text-[#E8C58F] hover:text-white transition-colors cursor-pointer"
                title="Fit to Screen"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Right: Mandatory Visible Close Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer (Esc)"
            className="group inline-flex size-11 sm:size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/25 hover:border-white/50 text-white transition-all cursor-pointer shadow-xl active:scale-95"
          >
            <X className="size-5 sm:size-6 transition-transform group-hover:scale-110" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Viewport: Horizontally and Vertically Centered Media */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-6 overflow-hidden min-h-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // Clicking outer background closes; clicking media prevents closing
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Previous Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous capture"
          className="absolute left-2 sm:left-6 z-40 rounded-full border border-white/20 bg-black/60 hover:bg-[#E8C58F] hover:border-[#E8C58F] hover:text-[#010F20] text-white p-3 sm:p-3.5 transition-all cursor-pointer shadow-2xl backdrop-blur-md active:scale-95 group"
        >
          <ChevronLeft className="size-6 sm:size-7 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Next Navigation Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next capture"
          className="absolute right-2 sm:right-6 z-40 rounded-full border border-white/20 bg-black/60 hover:bg-[#E8C58F] hover:border-[#E8C58F] hover:text-[#010F20] text-white p-3 sm:p-3.5 transition-all cursor-pointer shadow-2xl backdrop-blur-md active:scale-95 group"
        >
          <ChevronRight className="size-6 sm:size-7 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Media Frame: Strictly Centered, Zero Blank Scrolling, Natural Proportions */}
        <div
          className="relative max-h-[82vh] sm:max-h-[85vh] max-w-[95vw] sm:max-w-[88vw] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <div className="relative group/video flex items-center justify-center">
              <video
                ref={videoRef}
                key={activeItem.src}
                src={activeItem.src}
                playsInline
                loop
                autoPlay
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                className="max-h-[75vh] sm:max-h-[80vh] max-w-[94vw] sm:max-w-[86vw] w-auto h-auto object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-pointer"
              />

              {/* Floating Center Play/Pause indicator on tap */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute size-16 sm:size-20 rounded-full bg-black/60 border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
                >
                  <Play className="size-8 sm:size-10 fill-current translate-x-0.5" />
                </button>
              )}
            </div>
          ) : (
            <div
              className={cn(
                "relative flex items-center justify-center transition-transform",
                zoomScale > 1 ? "cursor-grab active:cursor-grabbing duration-75" : "duration-300",
              )}
              style={{
                transform: `scale(${zoomScale}) translate(${panOffset.x / zoomScale}px, ${panOffset.y / zoomScale}px)`,
              }}
              onDoubleClick={handleDoubleTap}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.src}
                alt={activeItem.alt || activeItem.title}
                className="max-h-[78vh] sm:max-h-[82vh] max-w-[94vw] sm:max-w-[86vw] w-auto h-auto object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] pointer-events-none select-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Video Controls (for video) or Caption & Location (for photo) */}
      <div
        className="relative z-50 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          /* Video Control Bar */
          <div className="mx-auto max-w-2xl flex flex-col gap-2 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md px-4 py-2.5 shadow-2xl">
            <div className="flex items-center gap-3">
              {/* Play / Pause */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-1.5 text-white hover:text-[#E8C58F] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
              </button>

              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Video seek"
                className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E8C58F]"
              />

              {/* Time Display */}
              <span className="font-mono text-xs text-white/80 shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Mute / Unmute */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="p-1.5 text-white hover:text-[#E8C58F] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="size-5 text-rose-300" /> : <Volume2 className="size-5 text-sky-300" />}
              </button>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullScreen}
                aria-label="Toggle full-screen video"
                className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer hidden sm:block"
              >
                <Maximize className="size-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Photo Caption & Location */
          <div className="mx-auto max-w-xl text-center">
            <h4 className="font-serif text-base sm:text-lg text-white font-semibold">
              {activeItem.title}
            </h4>
            {activeItem.description && (
              <p className="mt-1 text-xs text-sky-100/80 line-clamp-2 max-w-lg mx-auto">
                {activeItem.description}
              </p>
            )}
          </div>
        )}

        {/* Mobile Caption Display (if video) */}
        {isVideo && activeItem.title && (
          <p className="sm:hidden text-center text-xs text-white/80 mt-1 truncate">
            {activeItem.title}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
