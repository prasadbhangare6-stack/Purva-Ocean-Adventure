import type { Metadata } from "next";
import { ContactShowcase } from "@/components/contact/ContactShowcase";

export const metadata: Metadata = {
  title: "Contact & Expedition Inquiries | Purva Ocean Adventures",
  description:
    "Plan your next ocean adventure. Send an inquiry or chat with us directly on WhatsApp for curated dive trips and certifications.",
};

export default function ContactPage() {
  return <ContactShowcase />;
}
