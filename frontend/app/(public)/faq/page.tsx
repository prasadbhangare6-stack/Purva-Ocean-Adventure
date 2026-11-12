import type { Metadata } from "next";
import { FaqShowcase } from "@/components/faq/FaqShowcase";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Purva Ocean Adventures",
  description:
    "Everything you need to know before diving with us. Answers to common questions about scuba certifications, gear, trip planning, and marine life encounters.",
};

export default function FaqPage() {
  return <FaqShowcase />;
}
