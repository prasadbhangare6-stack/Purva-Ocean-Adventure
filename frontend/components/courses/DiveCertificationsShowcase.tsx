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
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-between overflow-hidden bg-white pt-20 sm:pt-24 pb-8 sm:pb-12 select-none scroll-mt-20"
    >
      {/* Top Header Row: Eyebrow and Headline matching design mock */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 shrink-0">
        <p className="text-[0.68rem] sm:text-xs font-bold tracking-[0.24em] uppercase text-black/70 mb-1">
          LEARN • EXPLORE • GO FURTHER
        </p>
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
          DIVE <span className="text-[#38bdf8]">CERTIFICATIONS</span>
        </h1>
      </div>

      {/* 3-Card Grid: Side-by-side matching the exact design mock */}
      <div className="relative z-10 my-auto flex w-full max-w-7xl mx-auto items-center justify-center px-6 sm:px-10 lg:px-16 flex-1 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full max-h-[58vh]">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-[0_12px_35px_rgba(2,24,54,0.08)] border border-slate-100 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(2,24,54,0.18)] cursor-pointer"
            >
              {/* Card Photo */}
              <div className="relative aspect-[3/3.2] max-h-[36vh] sm:max-h-[38vh] w-full overflow-hidden bg-slate-900">
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
                className={`py-3.5 sm:py-4 px-5 sm:px-6 flex items-center justify-between font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors ${course.cardTheme.pillBg} ${course.cardTheme.pillTextColor}`}
              >
                <span>{course.name}</span>
                <span
                  aria-hidden="true"
                  className="text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-2"
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

