import type { Metadata } from "next";
import { FullGalleryCollection } from "@/components/gallery/FullGalleryCollection";

export const metadata: Metadata = {
  title: "Complete Ocean Gallery | Purva Ocean Adventures",
  description:
    "Explore our complete archive of underwater encounters, pelagic highways, vibrant coral sanctuaries, and scuba diving memories across the Maldives, Lakshadweep, and beyond.",
};

export default function GalleryPage() {
  return <FullGalleryCollection />;
}
