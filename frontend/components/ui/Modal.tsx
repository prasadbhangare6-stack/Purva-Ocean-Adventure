"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Accessible modal / lightbox foundation.
 * - Closes on Escape and on backdrop click.
 * - Traps Tab focus inside the dialog and restores focus on close.
 * - Locks background scroll while open.
 * - Entrance uses a CSS transition that is disabled under reduced motion.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "md" | "lg" | "fullscreen";
  className?: string;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    focusable()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_400ms_ease-out] bg-abyss/85"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 max-h-full w-full overflow-auto rounded-card border hairline bg-navy p-6 shadow-2xl sm:p-10 animate-[fade-up_600ms_var(--ease-cinematic)]",
          size === "md" && "max-w-xl",
          size === "lg" && "max-w-5xl",
          size === "fullscreen" && "h-full max-w-none rounded-none",
          className,
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-6">
          <h2 id={titleId} className="text-3xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full border hairline p-2 text-foam/70 transition-colors hover:border-gold hover:text-gold"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
