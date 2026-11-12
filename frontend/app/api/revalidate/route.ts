import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env";
import { CACHE_TAGS, type CacheTag } from "@/lib/sanity/fetch";

/**
 * POST /api/revalidate — called by a Sanity webhook when content is published.
 * Revalidates only the affected cache tags, so the rest of the site is untouched.
 *
 * Configure in Sanity (manage → API → Webhooks):
 *   URL:    https://<your-host>/api/revalidate
 *   Secret: same value as SANITY_REVALIDATE_SECRET
 *   Header: x-sanity-revalidate-secret: <secret>
 *   Trigger on: create, update, delete
 */

const TYPE_TO_TAGS: Record<string, CacheTag[]> = {
  trip: [CACHE_TAGS.trips],
  course: [CACHE_TAGS.courses],
  galleryItem: [CACHE_TAGS.gallery],
  instagramFeed: [CACHE_TAGS.instagram],
  aboutPage: [CACHE_TAGS.about],
  faq: [CACHE_TAGS.faq],
  siteSettings: [CACHE_TAGS.settings],
};

function secretMatches(provided: string | null): boolean {
  const expected = serverEnv.SANITY_REVALIDATE_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!secretMatches(request.headers.get("x-sanity-revalidate-secret"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let type: string | undefined;
  try {
    const body = (await request.json()) as { _type?: string };
    type = body._type;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid body" }, { status: 400 });
  }

  const tags = type ? TYPE_TO_TAGS[type] : undefined;
  if (!tags) {
    return NextResponse.json({ ok: true, revalidated: [], note: "No cache tags for this type" });
  }

  for (const tag of tags) revalidateTag(tag);
  return NextResponse.json({ ok: true, revalidated: tags });
}
