import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Consistent section heading: uppercase eyebrow, serif title with an optional
 * italic emphasis fragment, and a supporting description.
 *
 * Use `emphasis` to render a phrase in serif italic, e.g.
 *   <SectionHeading title="Beneath the" emphasis="surface" />
 */
export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="label-caps mb-6 text-gold">{eyebrow}</p>}
      <Heading>
        {title}
        {emphasis && (
          <>
            {" "}
            <em className="italic font-light text-gold">{emphasis}</em>
          </>
        )}
      </Heading>
      {description && <div className="mt-6 text-base leading-relaxed text-foam/70 sm:text-lg">{description}</div>}
    </header>
  );
}
