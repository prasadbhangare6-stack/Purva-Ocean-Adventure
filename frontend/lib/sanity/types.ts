/**
 * Types for CMS data as returned by the GROQ queries in ./queries.ts.
 * Keep in sync with the schemas in /sanity/schemaTypes.
 */

export type CmsImage = {
  asset?: unknown;
  alt: string;
  lqip?: string | null;
  url?: string;
  /** Sanity image hotspot / crop are passed through via `...` projection. */
  hotspot?: { x: number; y: number };
};

export type NavEntry = { slug: string; name: string };

export type SiteSettings = {
  websiteName?: string;
  logo?: CmsImage | null;
  whatsappNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: { instagram?: string; facebook?: string; youtube?: string };
  announcement?: { enabled?: boolean; message?: string; linkUrl?: string };
  copyrightText?: string;
  footerTagline?: string;
  seo?: { title?: string; description?: string; ogImage?: string };
};

export type TripSummary = {
  name: string;
  slug: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  upcoming?: boolean;
  summary?: string;
  coverImage?: CmsImage | null;
};

export type TripDetail = TripSummary & {
  dateLabel?: string;
  description?: unknown[];
  gallery?: CmsImage[];
  videos?: { title?: string; url?: string; externalUrl?: string }[];
  itinerary?: { day?: number; title?: string; description?: string }[];
  pricing?: { currency?: string; amount?: number; displayText?: string; notes?: string };
  inclusions?: string[];
  exclusions?: string[];
  eligibility?: string[];
  related?: TripSummary[];
  seo?: { title?: string; description?: string };
};

export type CourseSummary = {
  name: string;
  slug: string;
  summary?: string;
  coverImage?: CmsImage | null;
};

export type CourseDetail = CourseSummary & {
  description?: unknown[];
  gallery?: CmsImage[];
  details?: { level?: string; duration?: string; minimumAge?: string; certification?: string };
  prerequisites?: string[];
  related?: TripSummary[];
  seo?: { title?: string; description?: string };
};

export type GalleryCategory = "underwater" | "corals" | "marineLife" | "divers" | "expeditions";

export type GalleryItem = {
  caption?: string;
  category: GalleryCategory;
  location?: string;
  media: CmsImage;
};

export type InstagramSlot = {
  sourceUrl: string;
  thumbnail?: CmsImage | null;
  altText?: string;
  displayOrder: number;
};

export type AboutContent = {
  headingEyebrow?: string;
  heading?: string;
  description?: string;
  backgroundMedia?: CmsImage | null;
  values?: { title: string; description?: string; icon?: string }[];
};

export type FaqItem = { question: string; answer: string };
