"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CURATED_COURSES, type CuratedCourse } from "@/lib/data/curatedCourses";

export function DiveCertificationsShowcase({
  initialCourses,
}: {
  initialCourses?: CuratedCourse[];
} = {}) {
  const [courses, setCourses] = useState<CuratedCourse[]>(
    initialCourses && initialCourses.length > 0 ? initialCourses : Object.values(CURATED_COURSES)
  );

  useEffect(() => {
    fetch("/api/admin/content?resource=courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.courses?.length) {
          setCourses(data.data.courses);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="courses"
      className="relative isolate flex w-full flex-col justify-start md:justify-between min-h-0 md:min-h-screen md:min-h-dvh overflow-x-clip md:overflow-hidden bg-white pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-12 select-none scroll-mt-20"
    >
      {/* Top Header Row: Eyebrow and Headline matching design mock */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-16 shrink-0 mb-6 sm:mb-8 md:mb-0">
        <p className="text-[0.68rem] sm:text-xs font-bold tracking-[0.24em] uppercase text-black/70 mb-1">
          LEARN • EXPLORE • GO FURTHER
        </p>
        <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
          DIVE <span className="text-[#38bdf8]">CERTIFICATIONS</span>
        </h1>
      </div>

      {/* 3-Card Grid: Responsive stack on mobile, 3-column side-by-side on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-8 lg:px-16 my-0 md:my-auto flex-1 md:min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-6 w-full max-h-none md:max-h-[58vh]">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(2,24,54,0.08)] border border-slate-100 flex flex-col transition-all duration-500 hover:-translate-y-1.5 md:hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(2,24,54,0.16)] cursor-pointer"
            >
              {/* Card Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[3/3.2] max-h-none md:max-h-[38vh] w-full overflow-hidden bg-slate-900">
                <Image
                  src={course.coverImage}
                  alt={course.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Diagonal sheen sweep on hover */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-[280%]" />
              </div>

              {/* Card Bottom Colored Bar matching design mock */}
              <div
                className={`py-3.5 sm:py-4 px-4 sm:px-6 flex items-center justify-between font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors ${course.cardTheme.pillBg} ${course.cardTheme.pillTextColor}`}
              >
                <span className="truncate pr-2">{course.name}</span>
                <span
                  aria-hidden="true"
                  className="text-base sm:text-lg shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
