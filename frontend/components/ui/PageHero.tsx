import type { ReactNode } from "react";
import { Container } from "./Container";
import { VideoBackground } from "./VideoBackground";

/**
 * Cinematic page header. Accepts an optional background video or poster; with
 * neither, it renders a clean deep-ocean field (no stock imagery is invented).
 */
export function PageHero({
  eyebrow,
  title,
  emphasis,
  description,
  videoSrc,
  videoSources,
  posterSrc,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  description?: ReactNode;
  videoSrc?: string | null;
  videoSources?: string[];
  posterSrc?: string | null;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`relative isolate flex min-h-[80svh] items-end overflow-hidden pt-40 pb-20 sm:pb-28 ${className ?? ""}`}>
      <VideoBackground src={videoSrc} sources={videoSources} poster={posterSrc} />
      <Container className="relative z-10 animate-fade-up">
        {eyebrow && <p className="label-caps mb-6 text-gold">{eyebrow}</p>}
        <h1 className="max-w-4xl">
          {title}
          {emphasis && (
            <>
              {" "}
              <em className="font-light italic text-gold">{emphasis}</em>
            </>
          )}
        </h1>
        {description && <div className="mt-8 max-w-2xl text-lg text-foam/75">{description}</div>}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}
