import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type ImageContainerProps = {
  src?: string | null;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Base64 low-quality placeholder from Sanity (metadata.lqip). */
  blurDataURL?: string | null;
  rounded?: "media" | "card" | "none";
  className?: string;
  /** Shown when no media has been supplied yet. */
  placeholderLabel?: string;
};

/**
 * Rounded, bordered image frame. Uses next/image for optimisation and lazy loading.
 * When `src` is empty it renders a labelled placeholder — never a fake photo.
 */
export function ImageContainer({
  src,
  alt,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  blurDataURL,
  rounded = "media",
  className,
  placeholderLabel = "Media awaiting supply",
}: ImageContainerProps) {
  const radius = rounded === "card" ? "rounded-card" : rounded === "media" ? "rounded-media" : "";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden border hairline bg-navy",
        aspect,
        radius,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL ?? undefined}
          className="object-cover transition-transform duration-[1200ms] ease-cinematic"
        />
      ) : (
        <div role="img" aria-label={placeholderLabel} className="absolute inset-0 flex items-center justify-center">
          <span className="label-caps text-sky/60">{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}
