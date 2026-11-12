import "server-only";
import { isSanityConfigured } from "@/lib/env";
import { sanityFetch, CACHE_TAGS } from "./fetch";
import { QUERIES } from "./queries";
import type {
  AboutContent,
  CourseDetail,
  CourseSummary,
  FaqItem,
  GalleryItem,
  InstagramSlot,
  NavEntry,
  SiteSettings,
  TripDetail,
  TripSummary,
} from "./types";

/**
 * Typed data access layer. Pages import these functions — never raw GROQ.
 * Each function returns an honest empty value when the CMS is not configured.
 */

export const getSiteSettings = () =>
  sanityFetch<SiteSettings | null>({
    query: QUERIES.siteSettings,
    tags: [CACHE_TAGS.settings],
    fallback: null,
  });

export const getNavTrips = () =>
  sanityFetch<NavEntry[]>({ query: QUERIES.navTrips, tags: [CACHE_TAGS.trips], fallback: [] });

export const getNavCourses = () =>
  sanityFetch<NavEntry[]>({ query: QUERIES.navCourses, tags: [CACHE_TAGS.courses], fallback: [] });

export const getTripsIndex = () =>
  sanityFetch<TripSummary[]>({ query: QUERIES.tripsIndex, tags: [CACHE_TAGS.trips], fallback: [] });

export const getTripBySlug = (slug: string) =>
  sanityFetch<TripDetail | null>({
    query: QUERIES.tripBySlug,
    params: { slug },
    tags: [CACHE_TAGS.trips],
    fallback: null,
  });

export const getTripSlugs = () =>
  sanityFetch<{ slug: string }[]>({ query: QUERIES.tripSlugs, tags: [CACHE_TAGS.trips], fallback: [] });

export const getCoursesIndex = () =>
  sanityFetch<CourseSummary[]>({ query: QUERIES.coursesIndex, tags: [CACHE_TAGS.courses], fallback: [] });

export const getCourseBySlug = (slug: string) =>
  sanityFetch<CourseDetail | null>({
    query: QUERIES.courseBySlug,
    params: { slug },
    tags: [CACHE_TAGS.courses],
    fallback: null,
  });

export const getCourseSlugs = () =>
  sanityFetch<{ slug: string }[]>({ query: QUERIES.courseSlugs, tags: [CACHE_TAGS.courses], fallback: [] });

export const getGalleryItems = () =>
  sanityFetch<GalleryItem[]>({ query: QUERIES.galleryItems, tags: [CACHE_TAGS.gallery], fallback: [] });

export const getInstagramSlots = () =>
  sanityFetch<InstagramSlot[]>({ query: QUERIES.instagramSlots, tags: [CACHE_TAGS.instagram], fallback: [] });

export const getAboutContent = () =>
  sanityFetch<AboutContent | null>({ query: QUERIES.about, tags: [CACHE_TAGS.about], fallback: null });

export const getFaqs = () =>
  sanityFetch<FaqItem[]>({ query: QUERIES.faqs, tags: [CACHE_TAGS.faq], fallback: [] });

/** Dashboard counts. Returns null when the CMS is not configured or the query fails. */
export async function getDashboardCounts(): Promise<{ trips: number; courses: number; gallery: number; enquiries: number | null } | null> {
  if (!isSanityConfigured) return null;
  const counts = await sanityFetch<{ trips: number; courses: number; gallery: number } | null>({
    query: `{
      "trips": count(*[_type == "trip" && status == "published"]),
      "courses": count(*[_type == "course" && status == "published"]),
      "gallery": count(*[_type == "galleryItem" && status == "published"])
    }`,
    tags: [CACHE_TAGS.trips, CACHE_TAGS.courses, CACHE_TAGS.gallery],
    fallback: null,
  });
  // Enquiries are never read through the public client; the count stays null until enquiry storage is configured.
  return counts ? { ...counts, enquiries: null } : null;
}
