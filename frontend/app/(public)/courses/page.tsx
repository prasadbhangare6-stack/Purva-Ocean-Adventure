import type { Metadata } from "next";
import { DiveCertificationsShowcase } from "@/components/courses/DiveCertificationsShowcase";
import { getLiveSiteContentStore } from "@/lib/data/siteStore";

export const metadata: Metadata = {
  title: "Dive Certifications | Purva Ocean Adventures",
  description:
    "Explore PADI Scuba Diving Certifications by Purva Ocean Adventures: Open Water Diver, Advanced Open Water Diver, and Specialty Diver courses.",
};

export default async function CoursesPage() {
  const store = await getLiveSiteContentStore();

  return <DiveCertificationsShowcase initialCourses={store.courses} />;
}
