"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function BackButton({
  fallbackHref = "/trips",
  label = "Back to Upcoming Trips",
  className,
}: {
  fallbackHref?: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={label}
      className={cn(
        "group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer select-none",
        className,
      )}
    >
      <ArrowLeft className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>{label}</span>
    </button>
  );
}

