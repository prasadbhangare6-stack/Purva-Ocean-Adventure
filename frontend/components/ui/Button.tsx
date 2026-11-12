import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "label-caps inline-flex items-center justify-center gap-3 rounded-full transition-[background-color,color,border-color,transform] duration-500 ease-cinematic active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Champagne gold is the restrained accent — use for the single key action.
  primary: "bg-gold text-abyss hover:bg-foam",
  // Outlined, for secondary actions.
  secondary: "border border-gold/60 text-gold hover:border-gold hover:bg-gold/10",
  // Text-only, for tertiary actions.
  ghost: "text-foam/80 hover:text-gold",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3.5",
  lg: "px-9 py-4",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = SharedProps & { href: string; external?: boolean };
type ButtonAsButton = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/**
 * Primary / secondary / ghost button. Renders a Next.js <Link> when `href` is set,
 * otherwise a native <button>. Both share identical styling.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Strip our own props before spreading the rest onto the native button.
  const rest = props as ButtonAsButton;
  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
