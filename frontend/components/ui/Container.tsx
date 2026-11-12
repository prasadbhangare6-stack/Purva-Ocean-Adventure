import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Responsive page container. Use `as="section"` etc. for semantic structure. */
export function Container({
  children,
  as: Tag = "div",
  className,
  narrow = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-10 lg:px-16",
        narrow ? "max-w-4xl" : "max-w-[var(--container-page)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
