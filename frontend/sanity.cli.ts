import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
  // Studio is not deployed as a route in this phase; see docs/ARCHITECTURE.md.
  deployment: { appId: "" },
});
