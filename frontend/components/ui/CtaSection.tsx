import type { ReactNode } from "react";
import { Button } from "./Button";
import { Container } from "./Container";

/**
 * Reusable call-to-action band. Use at the end of pages.
 * Pass `actions` for custom buttons, or `primaryHref` / `primaryLabel` for the standard pair.
 */
export function CtaSection({
  eyebrow,
  title,
  emphasis,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  actions,
}: {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  description?: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  actions?: ReactNode;
}) {
  return (
    <section aria-labelledby="cta-title" className="border-t hairline py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">
        {eyebrow && <p className="label-caps mb-6 text-gold">{eyebrow}</p>}
        <h2 id="cta-title" className="max-w-3xl">
          {title}
          {emphasis && (
            <>
              {" "}
              <em className="font-light italic text-gold">{emphasis}</em>
            </>
          )}
        </h2>
        {description && <div className="mt-6 max-w-2xl text-base text-foam/70 sm:text-lg">{description}</div>}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {actions ?? (
            <>
              {primaryHref && primaryLabel && <Button href={primaryHref}>{primaryLabel}</Button>}
              {secondaryHref && secondaryLabel && (
                <Button href={secondaryHref} variant="secondary">
                  {secondaryLabel}
                </Button>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
