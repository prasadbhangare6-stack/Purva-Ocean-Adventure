/** Formats an ISO date range for display, e.g. "12 Mar – 19 Mar 2027". Returns "" when no start date. */
export function formatDateRange(start?: string | null, end?: string | null, locale = "en-IN"): string {
  if (!start) return "";
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" };
  const from = new Date(`${start}T00:00:00+05:30`).toLocaleDateString(locale, opts);
  if (!end || end === start) return from;
  const to = new Date(`${end}T00:00:00+05:30`).toLocaleDateString(locale, opts);
  return `${from} – ${to}`;
}
