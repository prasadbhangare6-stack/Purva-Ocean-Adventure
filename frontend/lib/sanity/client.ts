import "server-only";
import { createClient } from "next-sanity";
import { publicEnv, isSanityConfigured, serverEnv } from "@/lib/env";

/**
 * Sanity client — SERVER ONLY.
 *
 * Public reads use the published perspective and never receive a token.
 * The optional read token (Viewer role) is reserved for future preview/draft
 * mode and must never be shipped to the browser.
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: publicEnv.sanityProjectId,
      dataset: publicEnv.sanityDataset,
      apiVersion: publicEnv.sanityApiVersion,
      useCdn: true,
      perspective: "published",
      token: undefined,
    })
  : null;

export const previewClient = isSanityConfigured && serverEnv.SANITY_API_READ_TOKEN
  ? createClient({
      projectId: publicEnv.sanityProjectId,
      dataset: publicEnv.sanityDataset,
      apiVersion: publicEnv.sanityApiVersion,
      useCdn: false,
      perspective: "drafts",
      token: serverEnv.SANITY_API_READ_TOKEN,
    })
  : null;
