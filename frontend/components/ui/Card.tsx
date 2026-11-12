import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Premium card shell: rounded corners, hairline border, deep ocean surface.
 * Pass `href` to make the whole card a link (keyboard-focusable as one target).
 */
export function Card({
  href,
  children,
  className,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "group relative flex flex-col overflow-hidden rounded-card border hairline bg-navy/60",
    "transition-[border-color,transform] duration-700 ease-cinematic",
    href && "hover:-translate-y-1 hover:border-gold/50",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
