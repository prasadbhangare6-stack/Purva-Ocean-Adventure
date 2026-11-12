/**
 * Line-style brand icons drawn inline (the icon library does not ship brand marks).
 * These are generic glyphs for linking to the business's own accounts.
 */

type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <path d="M3.5 20.5l1.2-4.1A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" strokeLinejoin="round" />
      <path d="M9 9.5c0 2.8 2.7 5.5 5.5 5.5l.9-1.1-1.8-.9-.7.6c-.8-.3-2-1.5-2.3-2.3l.6-.7-.9-1.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}
