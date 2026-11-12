import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/data";
import { buildWhatsAppUrl } from "@/lib/integrations/whatsapp";
import { PoliciesShowcase } from "@/components/legal/PoliciesShowcase";
import { getPoliciesStore } from "@/lib/data/policiesStore";

export const revalidate = 0; // dynamic: always fresh content

export const metadata: Metadata = {
  title: "Terms, Privacy & Cancellation Policies | Purva Ocean Adventures",
  description:
    "Read Purva Ocean Adventures Terms & Conditions, Privacy Policy, and Cancellation & Refund Policy for scuba diving courses and ocean expeditions.",
};

export default async function PoliciesPage() {
  const settings = await getSiteSettings().catch(() => null);
  const whatsappUrl = buildWhatsAppUrl(settings?.whatsappNumber);
  const policies = getPoliciesStore();

  return <PoliciesShowcase whatsappUrl={whatsappUrl} initialPolicies={policies} />;
}
