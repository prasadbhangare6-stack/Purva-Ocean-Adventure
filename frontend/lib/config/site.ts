/**
 * Static, non-business configuration only.
 * Business information (contact details, WhatsApp number, social links, copy,
 * announcements) is owned by the CMS "Website Settings" document and must NOT be
 * hardcoded here.
 */

export const BRAND = {
  name: "PURVA OCEAN ADVENTURES",
} as const;

export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  /** Dropdown key. Items with a dropdown are rendered by NavDropdown. */
  dropdown?: "trips" | "courses";
};

/** Primary navigation labels, as specified in the brief. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Trips", href: "/trips", dropdown: "trips" },
  { label: "Courses", href: "/courses", dropdown: "courses" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/**
 * Fallback trip entries used by the Our Trips dropdown when the CMS is not
 * yet configured or has no published trips. Matches current active expeditions.
 */
export const FALLBACK_TRIP_NAV: NavChild[] = [
  { label: "Maafushi Madness Maldives (22–27 Nov 2026)", href: "/trips/maafushi-madness-maldives" },
  { label: "Lakshadweep Love (26–31 Jan 2027)", href: "/trips/lakshadweep-love" },
  { label: "Maldives Dive Expedition (Feb 2027)", href: "/trips/maldives-dive-expedition" },
];

/**
 * Fallback course entries used by the Courses dropdown ONLY when the CMS is not
 * yet configured or has no published courses. These mirror the brief's course
 * list and link to the dynamic course template route.
 */
export const FALLBACK_COURSE_NAV: NavChild[] = [
  { label: "Open Water Diver", href: "/courses/open-water-diver" },
  { label: "Advanced Open Water Diver", href: "/courses/advanced-open-water-diver" },
  { label: "Specialty Diver", href: "/courses/specialty-diver" },
];

/** Every public route (nine primary pages + dynamic detail templates). */
export const PUBLIC_ROUTES = {
  home: "/",
  trips: "/trips",
  courses: "/courses",
  oceanQuote: "/ocean-quote",
  about: "/about",
  gallery: "/gallery",
  faq: "/faq",
  contact: "/contact",
  instagram: "/instagram",
  policies: "/policies",
} as const;

export const FOOTER_NAV: NavChild[] = [
  { label: "Home", href: PUBLIC_ROUTES.home },
  { label: "Our Trips", href: PUBLIC_ROUTES.trips },
  { label: "Courses", href: PUBLIC_ROUTES.courses },
  { label: "Ocean Quote", href: PUBLIC_ROUTES.oceanQuote },
  { label: "About", href: PUBLIC_ROUTES.about },
  { label: "Gallery", href: PUBLIC_ROUTES.gallery },
  { label: "FAQ", href: PUBLIC_ROUTES.faq },
  { label: "Contact", href: PUBLIC_ROUTES.contact },
  { label: "Instagram", href: PUBLIC_ROUTES.instagram },
];

/** Admin sidebar — order is defined by the brief. */
export const ADMIN_BASE_PATH = "/admin";
