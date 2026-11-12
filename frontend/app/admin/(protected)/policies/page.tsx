import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getPoliciesStore } from "@/lib/data/policiesStore";
import { PoliciesManager } from "@/components/admin/PoliciesManager";

export const metadata: Metadata = { title: "Legal & Policies Management", robots: { index: false, follow: false } };

export default async function PoliciesAdminPage() {
  await requirePermission("policies", "read");
  const policies = getPoliciesStore();

  return <PoliciesManager initialPolicies={policies} />;
}

