import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { requirePermission } from "@/lib/auth/guards";
import { MediaManager } from "@/components/admin/MediaManager";

export const metadata: Metadata = { title: "Media Library", robots: { index: false, follow: false } };

export default async function MediaAdminPage() {
  await requirePermission("media", "read");

  const mediaDir = path.join(process.cwd(), "public", "media");
  let files: string[] = [];

  if (fs.existsSync(mediaDir)) {
    try {
      const dirEntries = fs.readdirSync(mediaDir);
      files = dirEntries
        .filter((f) => /\.(jpg|jpeg|png|webp|svg|mp4)$/i.test(f))
        .map((f) => `/media/${f}`);
    } catch {
      files = [];
    }
  }

  return <MediaManager files={files} />;
}
