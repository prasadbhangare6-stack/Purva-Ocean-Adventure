import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { requirePermission } from "@/lib/auth/guards";
import { getLiveSiteContentStore } from "@/lib/data/siteStore";
import { EnquiriesManager, type EnquiryRecord } from "@/components/admin/EnquiriesManager";

export const metadata: Metadata = { title: "Contact Enquiries", robots: { index: false, follow: false } };

export default async function EnquiriesAdminPage() {
  await requirePermission("enquiries", "read");
  const store = await getLiveSiteContentStore();

  const jsonFile = path.join(process.cwd(), "data", "enquiries.json");
  let enquiries: EnquiryRecord[] = [];

  if (fs.existsSync(jsonFile)) {
    try {
      enquiries = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
      // Sort latest first
      enquiries = enquiries.reverse();
    } catch {
      enquiries = [];
    }
  }

  return (
    <EnquiriesManager
      initialEnquiries={enquiries}
      googleSheetUrl={store.settings.googleSpreadsheetUrl}
    />
  );
}
