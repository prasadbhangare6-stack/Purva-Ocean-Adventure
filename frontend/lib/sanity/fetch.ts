import "server-only";
import { sanityClient } from "./client";

/**
 * Cache tags. The Sanity webhook (/api/revalidate) maps document types to these
 * tags so published changes appear without rebuilding the whole site.
 */
export const CACHE_TAGS = {
  trips: "sanity:trips",
  courses: "sanity:courses",
  gallery: "sanity:gallery",
  instagram: "sanity:instagram",
  about: "sanity:about",
  faq: "sanity:faq",
  settings: "sanity:settings",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

type FetchOptions<T> = {
  query: string;
  params?: Record<string, unknown>;
  tags: CacheTag[];
  /** Returned when the CMS is not configured or the query fails. */
  fallback: T;
};

/**
 * Reads published content only. Returns `fallback` when Sanity is not yet
 * configured, so every page renders an honest empty state during development.
 */
export async function sanityFetch<T>({ query, params = {}, tags, fallback }: FetchOptions<T>): Promise<T> {
  if (!sanityClient) return fallback;

  try {
    const result = await sanityClient.fetch(query, params, {
      perspective: "published",
      next: { tags, revalidate: 3600 },
    } as never);
    return result as unknown as T;
  } catch (error) {
    // Log server-side only; never leak CMS internals to visitors.
    console.error("[sanity] fetch failed", { tags, error });
    return fallback;
  }
}
