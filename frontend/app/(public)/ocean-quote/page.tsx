import type { Metadata } from "next";
import { OceanQuoteShowcase } from "@/components/quote/OceanQuoteShowcase";

export const metadata: Metadata = {
  title: "The Ocean is the Giver | Purva Ocean Adventures",
  description: "“The ocean is the giver... We are just visitors.” — Purva Ocean Adventures.",
};

export default function OceanQuotePage() {
  return <OceanQuoteShowcase />;
}
