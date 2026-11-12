import type { Metadata } from "next";
import { AboutShowcase } from "@/components/about/AboutShowcase";

export const metadata: Metadata = {
  title: "About Us | Purva Ocean Adventures",
  description:
    "Every great story begins somewhere. Learn about Purva Ocean Adventures — Discover • Dive • Connect.",
};

export default function AboutPage() {
  return <AboutShowcase />;
}
