import type { Metadata } from "next";
import { InstagramShowcase } from "@/components/instagram/InstagramShowcase";

export const metadata: Metadata = {
  title: "Follow On Instagram | Purva Ocean Adventures",
  description:
    "Follow our ocean expeditions, underwater stories, and dive photography across our official brand and Dr. Purva Thorat's personal journey.",
};

export default function InstagramPage() {
  return <InstagramShowcase />;
}
