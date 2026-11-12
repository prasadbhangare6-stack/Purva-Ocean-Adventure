import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Honest empty / awaiting-content state. Used when the CMS has no published
 * items yet, or when a page's content has not been supplied.
 */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Container narrow className="py-24 text-center">
      <div className="rounded-card border border-dashed hairline p-10 sm:p-14">
        <h2 className="text-3xl">{title}</h2>
        <div className="mx-auto mt-5 max-w-xl text-base text-foam/60">{description}</div>
        {action && <div className="mt-8">{action}</div>}
      </div>
    </Container>
  );
}
