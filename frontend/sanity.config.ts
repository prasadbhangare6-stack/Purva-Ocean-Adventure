import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

/**
 * Sanity configuration.
 *
 * The owner works in the custom admin dashboard (/admin). This Studio config
 * is for developers: schema work, migrations and troubleshooting. It is NOT
 * exposed on the public site. Run it locally with `npm run sanity`.
 */
export default defineConfig({
  name: "purva-ocean-adventures",
  title: "Purva Ocean Adventures — Content (developer)",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
