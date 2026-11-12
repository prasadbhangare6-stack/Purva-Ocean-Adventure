/**
 * Instagram slot helpers. The site does NOT build an automatic feed or publish
 * to Instagram. It shows six manually curated slots that link to the original
 * content. Thumbnails are either uploaded manually (preferred fallback) or
 * supplied by an optional, future, permitted retrieval step.
 */

const ALLOWED_HOSTS = new Set(["instagram.com", "www.instagram.com"]);
const ALLOWED_PATH = /^\/(reel|reels|p|tv)\/[A-Za-z0-9_-]+\/?$/;

/** Accepts only canonical Instagram Reel / post / IGTV URLs. */
export function isAllowedInstagramUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ALLOWED_HOSTS.has(url.hostname) && ALLOWED_PATH.test(url.pathname);
  } catch {
    return false;
  }
}

export const INSTAGRAM_SLOT_COUNT = 6;
