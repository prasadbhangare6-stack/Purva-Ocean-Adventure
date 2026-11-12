"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Info,
  Layers,
  MessageCircle,
  Minus,
  Mountain,
  Plus,
  ShieldCheck,
  Waves,
} from "lucide-react";
import type { CuratedCourse } from "@/lib/data/curatedCourses";
import { PUBLIC_ROUTES } from "@/lib/config/site";
import { BackButton } from "@/components/ui/BackButton";

type AccordionItemData = {
  id: string;
  label: string;
  icon: "prerequisites" | "theory" | "dives" | "info";
  paragraphs: string[];
  bullets?: string[];
  showActions?: boolean;
};

type ProcessCourseConfig = {
  eyebrow: string;
  titleLines: string[];
  italicWord: string;
  subhead: string;
  description: string;
  calloutLines: string[];
  heroImage: string;
  heroImageAlt: string;
  heroObjectPosition: string;
  bannerCourseName: string;
  phases: {
    number: string;
    title: string;
    image: string;
    imageAlt: string;
    description: string;
  }[];
  overviewItems: AccordionItemData[];
};

const PADI_COURSES_URL = "https://www.padi.com/courses";
const PADI_SPECIALTY_COURSES_URL = "https://www.padi.com/courses#specialty";

const WHY_SPECIALTY_CARDS = [
  {
    key: "build",
    title: "BUILD SKILLS",
    description: "Focus on specific diving techniques and gain practical experience.",
  },
  {
    key: "explore",
    title: "EXPLORE MORE",
    description:
      "Access new dive sites and environments, like deeper dives, wrecks, or night dives.",
  },
  {
    key: "safer",
    title: "DIVE SAFER",
    description:
      "Be a more confident and capable diver in a variety of conditions.",
  },
] as const;

const POPULAR_SPECIALTIES = [
  {
    title: "WRECK DIVER",
    description: "Explore sunken shipwrecks safely and responsibly.",
    image: "/media/specialty-wreck.jpg",
    alt: "Sunken coral-encrusted shipwreck underwater illuminated by sunbeams",
  },
  {
    title: "NIGHT DIVER",
    description: "Discover a different underwater world after dark.",
    image: "/media/specialty-night.jpg",
    alt: "Scuba diver shining an underwater dive torch onto colorful coral reef at night",
  },
  {
    title: "DEEP DIVER",
    description: "Extend your depth limit and explore deeper dive sites.",
    image: "/media/specialty-deep.jpg",
    alt: "Scuba diver descending into deep blue ocean below radiant surface light",
  },
] as const;

function buildProcessCourseConfig(course: CuratedCourse): ProcessCourseConfig {
  if (course.slug === "open-water-diver") {
    return {
      eyebrow: "PADI COURSE",
      titleLines: ["Open Water"],
      italicWord: "Diver",
      subhead: "Start your underwater adventure today.",
      description:
        "The PADI Open Water Diver course is the world's most popular and widely recognized scuba certification. Learn essential scuba skills, dive theory, and ocean confidence to explore reefs down to 18 meters.",
      calloutLines: [
        "Learn the fundamentals.",
        "Explore reefs worldwide.",
      ],
      heroImage: "/media/course-ow-hero.jpg",
      heroImageAlt: "Open Water scuba diver gliding alongside a sea turtle above a sunlit tropical coral reef",
      heroObjectPosition: "object-[78%_35%]",
      bannerCourseName: "OPEN WATER DIVER",
      phases: [
        {
          number: "PHASE 1",
          title: "LEARN ONLINE",
          image: "/media/course-ow-elearning.jpg",
          imageAlt: "Hands holding smartphone displaying PADI Open Water Diver eLearning module",
          description:
            "Begin with PADI Open Water eLearning at your own pace. Master essential dive theory, equipment fundamentals, and underwater safety principles before you ever step into the ocean.",
        },
        {
          number: "PHASE 2",
          title: "CONFINED & OPEN WATER DIVES",
          image: "/media/course-ow-dives.jpg",
          imageAlt: "PADI Open Water Diver student hovering over vibrant coral formations",
          description:
            "Build comfort during instructor-led confined water skill sessions, then complete four open water ocean dives up to 18 meters (60 feet) to earn your lifetime PADI certification.",
        },
      ],
      overviewItems: [
        {
          id: "prerequisites",
          label: "General Pre-Requisites",
          icon: "prerequisites",
          paragraphs: [
            `Minimum age: ${course.minimumAge}. Comfortable in deep water with basic swimming ability (200m swim or 300m mask/fins/snorkel swim plus a 10-minute float/tread).`,
            "A standard PADI Diver Medical Participant Questionnaire is completed prior to in-water sessions.",
          ],
        },
        {
          id: "theory",
          label: "Theory and Skills",
          icon: "theory",
          paragraphs: [
            "Interactive PADI eLearning covers physics, physiology, dive planning, and equipment assembly at your convenience before arrival.",
            "In-water training develops mask clearing, regulator recovery, alternate air source sharing, controlled emergency ascents, and neutral buoyancy.",
          ],
        },
        {
          id: "dives",
          label: "Open Water Dives",
          icon: "dives",
          paragraphs: [
            `Duration: ${course.duration}. Four supervised open water ocean dives progressively apply every confined-water skill on live coral reefs up to ${course.maxDepth}.`,
          ],
          bullets: course.skillsLearned,
        },
        {
          id: "learn-more",
          label: "Learn More",
          icon: "info",
          paragraphs: [
            `${course.pricing.displayText} — ${course.pricing.note}`,
            `Included: ${course.inclusions.join(" • ")}.`,
          ],
          showActions: true,
        },
      ],
    };
  }

  return {
    eyebrow: "PADI COURSE",
    titleLines: ["Advanced", "Open Water"],
    italicWord: "Diver",
    subhead: "Take the next step in your diving journey.",
    description:
      "The PADI Advanced Open Water Diver course builds on your Open Water skills, giving you more confidence, experience and the freedom to explore new dive environments — from deeper sites to night dives and drift dives.",
    calloutLines: [
      "Go deeper. Explore more.",
      "Be a more confident diver.",
    ],
    heroImage: "/media/course-aow-hero.jpg",
    heroImageAlt: "Advanced scuba diver gliding over vibrant tropical coral reef under ocean sunbeams",
    heroObjectPosition: "object-[62%_42%]",
    bannerCourseName: "ADVANCED OPEN WATER DIVER",
    phases: [
      {
        number: "PHASE 1",
        title: "LEARN ONLINE",
        image: "/media/course-aow-elearning.jpg",
        imageAlt: "Hands holding smartphone displaying PADI Advanced Open Water Diver eLearning",
        description:
          "Begin with PADI eLearning at your own pace. Build on your diving knowledge with key concepts, safety, and the five adventure dives you'll experience.",
      },
      {
        number: "PHASE 2",
        title: "ADVANCED DIVES",
        image: "/media/course-aow-dives.jpg",
        imageAlt: "Scuba diver performing giant stride entry from dive boat into clear blue ocean",
        description:
          "Put your skills into action over five adventure dives. You'll complete two core dives — a Deep Dive and an Underwater Navigation Dive — and choose three more (e.g., Night Dive, Drift Dive, Peak Performance Buoyancy, Wreck Dive, or more) based on location and availability.",
      },
    ],
    overviewItems: [
      {
        id: "prerequisites",
        label: "General Pre-Requisites",
        icon: "prerequisites",
        paragraphs: [
          `Certified PADI (Junior) Open Water Diver or qualifying entry certification from another training organization. Minimum age: ${course.minimumAge}.`,
          "Standard PADI Medical Statement clearance required prior to open water adventure dives.",
        ],
      },
      {
        id: "theory",
        label: "Theory and Skills",
        icon: "theory",
        paragraphs: [
          "Focuses on practical dive planning, physiological effects of depth, precision compass and natural underwater navigation, and tailored adventure specialty knowledge.",
          "Zero heavy classroom exams — knowledge reviews align directly with the five ocean adventure dives you select.",
        ],
      },
      {
        id: "dives",
        label: "Advanced Open Water Dives",
        icon: "dives",
        paragraphs: [
          `Duration: ${course.duration}. Five open water Adventure Dives certified up to ${course.maxDepth} (Deep Adventure Dive + Underwater Navigation Adventure Dive + three electives).`,
        ],
        bullets: course.skillsLearned,
      },
      {
        id: "learn-more",
        label: "Learn More",
        icon: "info",
        paragraphs: [
          `${course.pricing.displayText} — ${course.pricing.note}`,
          `Included: ${course.inclusions.join(" • ")}.`,
        ],
        showActions: true,
      },
    ],
  };
}

function WaveHeroBottom({ fill = "#EAF2F8" }: { fill?: string }) {
  return (
    <div className="pointer-events-none relative -mt-12 w-full overflow-hidden leading-none sm:-mt-16 md:-mt-20">
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="block h-[54px] w-full sm:h-[74px] md:h-[96px]"
        aria-hidden="true"
      >
        <path
          d="M0,48 C260,12 480,12 720,44 C980,78 1220,76 1440,38 L1440,110 L0,110 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function RuleSectionHeading({ title }: { title: string }) {
  return (
    <div className="mx-auto flex max-w-[820px] items-center justify-center gap-4 sm:gap-7">
      <span className="h-[1px] flex-1 bg-[#8CA3B8]/70" />
      <h2 className="text-center font-sans text-[15px] font-medium uppercase tracking-[0.14em] text-[#0E243B] sm:text-[18px] md:text-[20px]">
        {title}
      </h2>
      <span className="h-[1px] flex-1 bg-[#8CA3B8]/70" />
    </div>
  );
}

function PadiEmblem() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="29" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <ellipse cx="32" cy="32" rx="14" ry="29" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
        <line x1="3" y1="32" x2="61" y2="32" stroke="#FFFFFF" strokeWidth="1.6" />
        <line x1="8" y1="18" x2="56" y2="18" stroke="#FFFFFF" strokeWidth="1.3" />
        <line x1="8" y1="46" x2="56" y2="46" stroke="#FFFFFF" strokeWidth="1.3" />
        <path
          d="M22 44 C26 36, 30 28, 33 17 L37 18 C36 28, 39 36, 44 43 L40 45 C36 39, 34 33, 33 27 C31 34, 28 40, 25 46 Z"
          fill="#E53935"
        />
        <circle cx="34.5" cy="14.5" r="3" fill="#E53935" />
      </svg>
      <span className="font-sans text-[28px] font-black tracking-[-0.04em] text-white sm:text-[32px]">
        PADI
        <sup className="ml-0.5 text-[10px] font-semibold">®</sup>
      </span>
    </div>
  );
}

function CoralPadiFooterBanner({
  courseLabel,
  whatsappLink,
  topFill,
}: {
  courseLabel: string;
  whatsappLink: string;
  topFill: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#02152a]">
      {/* Organic ocean wave separating light body from coral footer scene */}
      <div className="pointer-events-none relative z-10 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="block h-[54px] w-full sm:h-[74px] md:h-[92px]"
          aria-hidden="true"
        >
          <path
            d="M0,0 L1440,0 L1440,42 C1190,94 940,86 680,52 C430,20 200,26 0,72 Z"
            fill={topFill}
          />
        </svg>
      </div>

      <div className="relative min-h-[220px] sm:min-h-[260px]">
        <img
          src="/media/course-coral-banner.jpg"
          alt="Vibrant underwater coral reef illuminated by sunlight rays"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,21,42,0.34) 0%, rgba(2,18,36,0.58) 58%, rgba(2,21,42,0.94) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-[960px] flex-col items-center justify-end px-6 pb-12 pt-16 text-center sm:pb-14 sm:pt-20">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <PadiEmblem />
            <span className="hidden h-10 w-[1px] bg-white/45 sm:block" />
            <span className="font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-white sm:text-[15px]">
              {courseLabel}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#02152a]/70 px-5 py-2 text-[12px] font-medium tracking-[0.06em] text-white backdrop-blur-md transition hover:border-[#7CC0DF] hover:bg-[#052344]"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#7CC0DF]" />
              Enquire on WhatsApp
            </a>
            <Link
              href={PUBLIC_ROUTES.contact}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[12px] font-medium tracking-[0.06em] text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Contact Dive Team
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewIcon({ type }: { type: AccordionItemData["icon"] }) {
  const cls = "h-[18px] w-[18px] shrink-0 text-[#10263E] stroke-[1.6]";
  switch (type) {
    case "prerequisites":
      return <ClipboardList className={cls} />;
    case "theory":
      return <BookOpen className={cls} />;
    case "dives":
      return <Waves className={cls} />;
    case "info":
      return <Info className={cls} />;
  }
}

function CourseOverviewAccordion({
  items,
  whatsappLink,
}: {
  items: AccordionItemData[];
  whatsappLink: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mx-auto mt-9 max-w-[720px] border-y border-[#8BA3B8]/65 divide-y divide-[#8BA3B8]/65">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-3 py-3.5 text-left transition-colors hover:bg-white/40 sm:px-5 sm:py-4"
            >
              <span className="flex items-center gap-5 sm:gap-7">
                <OverviewIcon type={item.icon} />
                <span className="font-sans text-[14.5px] font-medium text-[#10263E] sm:text-[15.5px]">
                  {item.label}
                </span>
              </span>
              <span className="ml-4 text-[#10263E]" aria-hidden="true">
                {isOpen ? <Minus className="h-4 w-4 stroke-[1.8]" /> : <Plus className="h-4 w-4 stroke-[1.8]" />}
              </span>
            </button>

            {isOpen && (
              <div className="px-3 pb-5 pt-1 pl-[50px] text-[13.5px] leading-[1.68] text-[#263F57] sm:px-5 sm:pl-[68px]">
                <div className="space-y-2.5">
                  {item.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-[#173049]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E7FA6]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.showActions && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#0E243B] px-5 py-2 text-[12.5px] font-medium text-white transition hover:bg-[#17395C]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#7CC0DF]" />
                      Book via WhatsApp
                    </a>
                    <a
                      href={PADI_COURSES_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#8BA3B8] bg-white/75 px-4 py-2 text-[12.5px] font-medium text-[#0E243B] transition hover:bg-white"
                    >
                      Official PADI Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SpecialtyCourseView({ whatsappLink }: { whatsappLink: string }) {
  return (
    <div className="min-h-screen bg-[#EAF2F8] text-[#0E243B]">
      {/* Dark Ocean Hero matching Reference Image 1 */}
      <section className="relative overflow-hidden bg-[#02152a] pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
        <div className="absolute inset-0">
          <img
            src="/media/course-specialty-hero.jpg"
            alt="Scuba diver with yellow fins exploring a sunken underwater shipwreck"
            className="h-full w-full object-cover object-[66%_45%]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #02152a 0%, rgba(2,21,42,0.93) 34%, rgba(2,21,42,0.52) 58%, rgba(2,21,42,0.14) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{
              background: "linear-gradient(180deg, rgba(2,21,42,0.85) 0%, rgba(2,21,42,0) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1160px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <BackButton
              fallbackHref={PUBLIC_ROUTES.courses}
              label="Back"
              className="text-sky-300 hover:text-white"
            />
            <span className="text-white/30">/</span>
            <span className="text-white/65">Specialty Diver Courses</span>
          </div>

          <div className="max-w-[440px]">
            <div className="flex items-center gap-4">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                PADI COURSES
              </span>
              <span className="h-[1px] w-24 bg-white/45" />
            </div>

            <h1 className="mt-4 font-serif text-[42px] font-normal leading-[1.06] tracking-[-0.01em] text-white sm:text-[52px] lg:text-[56px]">
              Specialty
              <br />
              Diver{" "}
              <span className="italic text-[#7CC0DF]">Courses</span>
            </h1>

            <p className="mt-5 font-sans text-[16.5px] font-medium leading-snug text-white sm:text-[18px]">
              Explore new skills. Dive in new ways.
            </p>

            <p className="mt-3.5 max-w-[395px] font-sans text-[13.5px] leading-[1.65] text-white/85 sm:text-[14px]">
              Take your diving to the next level with PADI Specialty Courses. Build confidence,
              develop new skills, and explore unique underwater environments — from deep dives
              and shipwrecks to night adventures and more.
            </p>

            <div className="mt-7 border-l-2 border-[#7CC0DF]/80 pl-4 font-sans text-[13px] leading-[1.58] text-white/95 sm:text-[13.5px]">
              Tailored training for
              <br />
              more adventure, more skills,
              <br />
              and more freedom underwater.
            </div>
          </div>
        </div>
      </section>

      <WaveHeroBottom fill="#EDF4F9" />

      {/* Light Ice-Blue Content Band: Why Take A Specialty & Popular Specialties */}
      <section
        className="px-6 pb-16 pt-6 sm:px-10 sm:pb-20 sm:pt-8"
        style={{
          background: "linear-gradient(180deg, #EDF4F9 0%, #F4F8FB 52%, #E8F1F8 100%)",
        }}
      >
        <div className="mx-auto max-w-[980px]">
          <RuleSectionHeading title="WHY TAKE A SPECIALTY?" />

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {WHY_SPECIALTY_CARDS.map((item, idx) => (
              <div
                key={item.key}
                className={`flex flex-col items-center px-6 text-center ${
                  idx < WHY_SPECIALTY_CARDS.length - 1 ? "md:border-r md:border-[#C5D5E4]" : ""
                }`}
              >
                <div className="mb-3 text-[#10263E]">
                  {item.key === "build" && <Layers className="h-8 w-8 stroke-[1.35]" />}
                  {item.key === "explore" && <Mountain className="h-8 w-8 stroke-[1.35]" />}
                  {item.key === "safer" && <ShieldCheck className="h-8 w-8 stroke-[1.35]" />}
                </div>
                <h3 className="font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-[#0E243B]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[235px] font-sans text-[12.5px] leading-[1.55] text-[#2F455C] sm:text-[13px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 sm:mt-16">
            <RuleSectionHeading title="POPULAR SPECIALTIES" />

            <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {POPULAR_SPECIALTIES.map((card) => (
                <article
                  key={card.title}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_14px_30px_rgba(9,30,54,0.14)]"
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(2,21,42,0) 35%, rgba(2,18,36,0.88) 88%, rgba(2,18,36,0.96) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <h3 className="font-sans text-[15px] font-bold uppercase tracking-[0.04em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1 max-w-[230px] font-sans text-[12px] leading-[1.45] text-white/90">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* External link to all official PADI Specialty Courses */}
            <div className="mt-9 flex justify-center">
              <a
                href={PADI_SPECIALTY_COURSES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#10263E]/35 bg-[#F4E3C8] px-7 py-2.5 font-sans text-[13.5px] font-medium text-[#10263E] shadow-[0_8px_22px_rgba(9,30,54,0.14)] transition hover:-translate-y-0.5 hover:bg-[#EDD6B2]"
              >
                <span>View All Specialty Courses</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <CoralPadiFooterBanner
        courseLabel="SPECIALTY DIVER COURSES"
        whatsappLink={whatsappLink}
        topFill="#E8F1F8"
      />
    </div>
  );
}

function StructuredCourseView({
  course,
  whatsappLink,
}: {
  course: CuratedCourse;
  whatsappLink: string;
}) {
  const cfg = buildProcessCourseConfig(course);

  return (
    <div className="min-h-screen bg-[#F5F9FC] text-[#0E243B]">
      {/* Dark Ocean Hero matching Reference Image 2 */}
      <section className="relative overflow-hidden bg-[#02152a] pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
        <div className="absolute inset-0">
          <img
            src={cfg.heroImage}
            alt={cfg.heroImageAlt}
            className={`h-full w-full object-cover ${cfg.heroObjectPosition}`}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #02152a 0%, rgba(2,21,42,0.92) 34%, rgba(2,21,42,0.52) 58%, rgba(2,21,42,0.12) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{
              background: "linear-gradient(180deg, rgba(2,21,42,0.85) 0%, rgba(2,21,42,0) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1160px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <BackButton
              fallbackHref={PUBLIC_ROUTES.courses}
              label="Back"
              className="text-sky-300 hover:text-white"
            />
            <span className="text-white/30">/</span>
            <span className="text-white/65">{course.name}</span>
          </div>

          <div className="max-w-[440px]">
            <div className="flex items-center gap-4">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                {cfg.eyebrow}
              </span>
              <span className="h-[1px] w-24 bg-white/45" />
            </div>

            <h1 className="mt-4 font-serif text-[40px] font-normal leading-[1.06] tracking-[-0.01em] text-white sm:text-[50px] lg:text-[54px]">
              {cfg.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block italic text-[#7CC0DF]">{cfg.italicWord}</span>
            </h1>

            <p className="mt-5 font-sans text-[15.5px] font-medium leading-snug text-white sm:text-[17px]">
              {cfg.subhead}
            </p>

            <p className="mt-3.5 max-w-[390px] font-sans text-[13px] leading-[1.64] text-white/85 sm:text-[13.5px]">
              {cfg.description}
            </p>

            <div className="mt-6 border-l-2 border-[#7CC0DF]/80 pl-4 font-sans text-[13px] leading-[1.55] text-white/95 sm:text-[13.5px]">
              {cfg.calloutLines.map((line, i) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveHeroBottom fill="#F5F9FC" />

      {/* Section 2: THE PROCESS */}
      <section className="bg-[#F5F9FC] px-6 pb-16 pt-6 sm:px-10 sm:pb-20 sm:pt-8">
        <div className="mx-auto max-w-[900px]">
          <RuleSectionHeading title="THE PROCESS" />

          <div className="mx-auto mt-10 max-w-[820px] space-y-9 sm:space-y-11">
            {cfg.phases.map((phase) => (
              <div
                key={phase.number}
                className="grid grid-cols-1 items-center gap-6 md:grid-cols-[310px_1fr] md:gap-10"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-[0_12px_28px_rgba(9,30,54,0.12)]">
                  <img
                    src={phase.image}
                    alt={phase.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4C657D]">
                    {phase.number}
                  </span>
                  <h3 className="mt-1 font-sans text-[18px] font-medium uppercase tracking-[0.04em] text-[#0E243B] sm:text-[20px]">
                    {phase.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[13px] leading-[1.65] text-[#2B4359] sm:text-[13.5px]">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: COURSE OVERVIEW */}
      <section
        className="border-t border-[#D3E3EE] px-6 pb-14 pt-12 sm:px-10 sm:pb-16 sm:pt-14"
        style={{
          background: "linear-gradient(180deg, #E8F2F8 0%, #DFECF4 100%)",
        }}
      >
        <div className="mx-auto max-w-[900px]">
          <RuleSectionHeading title="COURSE OVERVIEW" />
          <CourseOverviewAccordion items={cfg.overviewItems} whatsappLink={whatsappLink} />
        </div>
      </section>

      <CoralPadiFooterBanner
        courseLabel={cfg.bannerCourseName}
        whatsappLink={whatsappLink}
        topFill="#DFECF4"
      />
    </div>
  );
}

export function CourseDetailShowcase({
  course,
  whatsappLink,
}: {
  course: CuratedCourse;
  whatsappLink: string;
}) {
  if (course.slug === "specialty-diver") {
    return <SpecialtyCourseView whatsappLink={whatsappLink} />;
  }

  return <StructuredCourseView course={course} whatsappLink={whatsappLink} />;
}
