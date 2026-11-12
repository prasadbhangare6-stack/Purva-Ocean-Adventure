import "server-only";
import { z } from "zod";

/**
 * Environment variable handling.
 *
 * - NEXT_PUBLIC_* values may appear in browser bundles. Never put secrets there.
 * - Everything else is server-only (the `server-only` import makes accidental
 *   client imports a build error).
 * - Every variable is optional at foundation stage so the app runs locally
 *   without credentials; features report "not configured" instead of failing.
 */

const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

const serverSchema = z.object({
  SANITY_API_READ_TOKEN: z.preprocess(emptyToUndefined, z.string().optional()),
  SANITY_REVALIDATE_SECRET: z.preprocess(emptyToUndefined, z.string().min(32).optional()),
  ADMIN_SESSION_SECRET: z.preprocess(emptyToUndefined, z.string().min(32).optional()),
  ADMIN_DEV_PREVIEW_ROLE: z.preprocess(
    emptyToUndefined,
    z.enum(["owner", "admin", "editor", "enquiry_manager", "viewer"]).optional()
  ),
  GOOGLE_SHEETS_WEBHOOK_URL: z.preprocess(emptyToUndefined, z.string().optional()),
  GOOGLE_SHEETS_SPREADSHEET_ID: z.preprocess(emptyToUndefined, z.string().optional()),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.preprocess(emptyToUndefined, z.string().optional()),
  GOOGLE_PRIVATE_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const serverEnv = serverSchema.parse(process.env);

export const publicEnv = {
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-06-01",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const isSanityConfigured = publicEnv.sanityProjectId.length > 0;
