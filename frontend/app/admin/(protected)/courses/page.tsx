import type { Metadata } from "next";
import { requirePermission } from "@/lib/auth/guards";
import { getSiteContentStore } from "@/lib/data/siteStore";
import { CoursesManager } from "@/components/admin/CoursesManager";

export const metadata: Metadata = { title: "Courses Management", robots: { index: false, follow: false } };

export default async function CoursesAdminPage() {
  await requirePermission("courses", "read");
  const store = getSiteContentStore();

  return <CoursesManager initialCourses={store.courses} />;
}
