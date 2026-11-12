import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCuratedCourse, CURATED_COURSES } from "@/lib/data/curatedCourses";
import { getCourseBySlug, getSiteSettings } from "@/lib/sanity/data";
import { getSiteContentStore } from "@/lib/data/siteStore";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppUrl } from "@/lib/integrations/whatsapp";
import { CourseDetailShowcase } from "@/components/courses/CourseDetailShowcase";

type Params = { slug: string };

export async function generateStaticParams() {
  const store = getSiteContentStore();
  const dynamicSlugs = store.courses.map((c) => ({ slug: c.slug }));
  const curatedSlugs = Object.keys(CURATED_COURSES).map((slug) => ({ slug }));
  return [...dynamicSlugs, ...curatedSlugs];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const store = getSiteContentStore();
  const curated = store.courses.find((c) => c.slug === slug) || getCuratedCourse(slug);
  if (curated) {
    return {
      title: `${curated.name} | Purva Ocean Adventures`,
      description: curated.summary,
    };
  }

  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) return { title: "Course Not Found | Purva Ocean Adventures" };

  return {
    title: course.seo?.title ?? `${course.name} | Purva Ocean Adventures`,
    description: course.seo?.description ?? course.summary,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const store = getSiteContentStore();
  const curated = store.courses.find((c) => c.slug === slug) || getCuratedCourse(slug);
  const settings = await getSiteSettings().catch(() => null);

  // If this is one of our 3 curated PADI dive certification courses:
  if (curated) {
    const whatsappMsg = encodeURIComponent(
      `Hello Purva Ocean Adventures! I am interested in enrolling in the "${curated.name}" certification course. Please share the schedule and booking details.`,
    );
    const whatsappLink =
      buildWhatsAppUrl(settings?.whatsappNumber, { kind: "course", courseName: curated.name }) ||
      `https://wa.me/916262323232?text=${whatsappMsg}`;

    return <CourseDetailShowcase course={curated} whatsappLink={whatsappLink} />;
  }

  // Fallback to Sanity CMS if slug is not one of our 3 curated courses
  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-[#010f20] text-white py-24">
      <Container>
        <h1 className="mt-6 font-serif text-3xl font-bold">{course.name}</h1>
        <p className="mt-2 text-sky-200">{course.summary}</p>
      </Container>
    </div>
  );
}
