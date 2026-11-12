"use client";

import { useEffect, useState } from "react";
import {
  CalendarClock,
  FileText,
  Mail,
  MessageCircle,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { PUBLIC_ROUTES } from "@/lib/config/site";
import type { PoliciesData } from "@/lib/data/policiesStore";

type PolicyTab = "all" | "terms" | "privacy" | "cancellation";

type PolicyBlock = {
  heading: string;
  intro?: string[];
  bullets?: string[];
  groups?: { label: string; items: string[] }[];
  table?: { notice: string; refund: string }[];
  outro?: string[];
};

const POLICY_META = {
  lastUpdated: "November 2026",
  legalName: "Purva Ocean Adventures",
  email: "purvaoceanadventures@gmail.com",
  phone: "+91 62623 23232",
  whatsappUrl: "https://wa.me/916262323232",
  operatingBase: "Mumbai, India (Operations across Lakshadweep & the Maldives)",
  jurisdiction: "India",
} as const;

const TERMS_SECTIONS: PolicyBlock[] = [
  {
    heading: "1. About Purva Ocean Adventures",
    intro: [
      'Purva Ocean Adventures provides curated marine experiences, including PADI diving courses, recreational scuba excursions, guided group expeditions, and travel coordination across India and international destinations such as the Maldives.',
      'In these Terms, "we", "us" and "our" refer to Purva Ocean Adventures. "You", "your" and "participant" refer to anyone visiting our website, submitting an enquiry, making a booking, or participating in our ocean activities.',
    ],
    groups: [
      {
        label: "Business details",
        items: [
          `Trading & Legal Name: ${POLICY_META.legalName}`,
          `Primary Operations Base: ${POLICY_META.operatingBase}`,
          `Official Email: ${POLICY_META.email}`,
          `Phone / WhatsApp: ${POLICY_META.phone}`,
        ],
      },
    ],
  },
  {
    heading: "2. Bookings and Reservations",
    bullets: [
      "All bookings are subject to availability, diver eligibility checks, and written confirmation by our team.",
      "A reservation is confirmed only after the required deposit or course fee has been received and written confirmation is issued.",
      "Participants must provide accurate and complete personal, certification, and contact details at the time of booking.",
      "Any special requirements, dietary needs, accessibility considerations, or medical disclosures must be communicated before confirmation.",
      "We reserve the right to request certification cards, dive logs, or medical clearances necessary to coordinate the safest possible dive experience.",
    ],
  },
  {
    heading: "3. Payments",
    bullets: [
      "Expedition packages, course tuition, inclusions, exclusions, and payment milestones are clearly communicated in writing before booking confirmation.",
      "Deposits or PADI eLearning fees are payable upon booking to secure dive boat berths, accommodation, and digital training materials.",
      "Final expedition balances must be cleared by the payment deadline specified in your confirmation invoice.",
      "Any optional add-ons (gear rental, Nitrox upgrades, private boat transfers, or additional dives) are disclosed before charges apply.",
      "Failure to clear scheduled balances by the due date may result in automatic release of reserved spots in line with our Cancellation & Refund Policy.",
    ],
  },
  {
    heading: "4. Diving Courses and Ocean Activities",
    bullets: [
      "Participants must satisfy the prerequisites, minimum age, and swim/float criteria applicable to their selected PADI course or dive expedition.",
      "Divers must present valid certification credentials (PADI, SSI, or recognized agency) and honest dive log history for guided trips.",
      "Every guest must follow briefings and safety instructions issued by qualified PADI Instructors, Divemasters, boat captains, and expedition leaders.",
      "Purva Ocean Adventures strictly upholds responsible reef etiquette—neutral buoyancy, zero marine wildlife harassment, and no touching or collecting corals.",
      "Our dive professionals reserve full authority to adjust dive sites, limit depth, or pause participation when safety, weather, or readiness requires.",
      "Course certification is awarded upon mastery of all performance requirements under official PADI training standards—not solely through attendance.",
    ],
  },
  {
    heading: "5. Health and Participant Responsibility",
    bullets: [
      "Scuba diving and open-ocean travel require reasonable physical fitness and accurate disclosure of respiratory, cardiac, ear/sinus, or neurological history.",
      "Every student and diver must sign the standard PADI Diver Medical Participant Questionnaire prior to entering the water and obtain physician clearance where indicated.",
      "Participants must never dive under the influence of alcohol, non-prescribed medication, or when experiencing illness or ear equalization difficulties.",
      "Participants under 18 years of age require verified written consent and medical sign-off from a parent or legal guardian.",
      "We reserve the right to decline participation where medical clearance is incomplete or safety criteria cannot be met.",
    ],
  },
  {
    heading: "6. Travel and Trip Arrangements",
    bullets: [
      "Open-ocean itineraries, dive site order, boat crossings, and transfer schedules remain subject to sea swell, wind, tide conditions, and maritime regulations.",
      "Where itinerary adjustments are necessary, our expedition team will communicate updates promptly and arrange safe, comparable alternatives.",
      "Guests are responsible for holding valid passports (minimum 6 months validity for international travel), visas, permits, and dive-specific travel insurance.",
      "Where third-party resorts, liveaboards, domestic carriers, or dive centers operate portions of a trip, their operational terms apply alongside ours.",
    ],
  },
  {
    heading: "7. Changes and Cancellations by Us",
    intro: [
      "Safety always comes first at sea. We may modify, reschedule, or cancel a dive day or expedition if severe weather, unsafe ocean conditions, harbor closures, minimum group thresholds, or regulatory directives make operation unsafe or impracticable.",
      "Should Purva Ocean Adventures cancel a confirmed booking before departure, affected guests will be informed immediately and offered fair rescheduling, expedition credit, or refund options as outlined in our Cancellation & Refund Policy.",
    ],
  },
  {
    heading: "8. Photography and Media",
    intro: [
      "Our instructors and media crew often capture underwater photos and video highlights during courses and expeditions to preserve memories for our dive community.",
      "We respect every guest's personal preferences and obtain consent before publishing identifiable participant photos or videos across our website or social media channels. Let our expedition leader know at any time if you prefer to keep your imagery private.",
    ],
  },
  {
    heading: "9. Website Content and Intellectual Property",
    intro: [
      "All website materials—including copywriting, expedition itineraries, underwater photography, reels, brand marks, graphics, and layouts—are owned by Purva Ocean Adventures or licensed for our authorized use.",
      "You may browse and share public page links for personal trip planning, but may not copy, republish, alter, or commercially exploit our media or content without prior written permission.",
    ],
  },
  {
    heading: "10. Third-Party Services",
    intro: [
      "Our website and bookings integrate trusted external platforms, including PADI training portals, payment processors, local guesthouses, dive boats, WhatsApp, and Instagram.",
      "While we carefully vet every local partner we dive with, third-party websites and external operators remain subject to their own terms of service and privacy practices.",
    ],
  },
  {
    heading: "11. Limitation of Liability",
    intro: [
      "Nothing in these Terms excludes or restricts any consumer rights or liability that cannot lawfully be excluded under applicable law.",
      "To the extent permitted by law, Purva Ocean Adventures is not liable for indirect losses, flight disruptions, weather interruptions, incomplete participant disclosures, or services operated independently by external carriers and third-party providers.",
    ],
  },
  {
    heading: "12. Privacy",
    intro: [
      "Any personal, medical, or booking information submitted through our website or communication channels is governed by our Privacy Policy detailed below.",
    ],
  },
  {
    heading: "13. Changes to These Terms",
    intro: [
      "We may revise these Terms & Conditions periodically to reflect operational improvements, regulatory updates, or new dive destinations. Updated editions are published on this page with a revised update date.",
    ],
  },
  {
    heading: "14. Governing Law",
    intro: [
      `These Terms & Conditions are governed by and construed in accordance with the laws of ${POLICY_META.jurisdiction}, subject to mandatory local maritime regulations and consumer protections applicable in active destination jurisdictions.`,
    ],
  },
  {
    heading: "15. Contact Us",
    intro: [
      "If you have any questions regarding these Terms & Conditions or your upcoming dive plans, please reach out to us directly:",
    ],
    bullets: [
      `Organization: ${POLICY_META.legalName}`,
      `Email: ${POLICY_META.email}`,
      `Phone / WhatsApp: ${POLICY_META.phone}`,
    ],
  },
];

const PRIVACY_SECTIONS: PolicyBlock[] = [
  {
    heading: "1. Information We Collect",
    intro: [
      "We collect only the details reasonably necessary to answer enquiries, certify students safely, and coordinate diving expeditions:",
    ],
    groups: [
      {
        label: "Personal information",
        items: [
          "Full name",
          "Email address",
          "Phone number and WhatsApp number",
          "Nationality / country of residence (for dive permits and passenger manifests)",
        ],
      },
      {
        label: "Booking & expedition details",
        items: [
          "Selected expedition or PADI diving course",
          "Preferred travel dates and number of participants",
          "Certification level, logged dive count, and equipment sizing",
          "Payment confirmation status and transfer coordination details",
        ],
      },
      {
        label: "Safety & medical disclosures",
        items: [
          "PADI medical statement declarations and physician clearance (where applicable)",
          "Dietary preferences, allergies, or accessibility needs voluntarily shared",
          "Emergency contact name, relationship, and phone number",
        ],
      },
      {
        label: "Technical information",
        items: [
          "Browser type, device viewport, and anonymized IP / usage analytics",
          "Essential cookie consent preferences and campaign referral parameters (UTM data)",
        ],
      },
    ],
  },
  {
    heading: "2. How We Use Your Information",
    bullets: [
      "Respond to enquiries, WhatsApp messages, and custom trip requests.",
      "Register PADI eLearning accounts, student records, and certification applications.",
      "Coordinate dive boats, island hotels, airport speedboats, and local permits.",
      "Issue pre-departure briefings, packing checklists, and live schedule updates.",
      "Process authorized payments and issue booking receipts or refunds.",
      "Maintain safety standards, emergency readiness, and statutory guest manifests.",
      "Improve our website performance and share upcoming trip announcements where you have opted in.",
    ],
  },
  {
    heading: "3. Sharing of Information",
    intro: [
      "Purva Ocean Adventures never sells, rents, or trades your personal data.",
      "We share relevant details strictly on a need-to-know basis with trusted operational partners:",
    ],
    bullets: [
      "Licensed PADI dive centers, boat crews, and resort hosts coordinating your itinerary.",
      "PADI regional offices for official diver course registration and eCard issuance.",
      "Authorized payment gateways and banking institutions.",
      "Maritime port authorities where passenger manifests are legally mandated.",
      "Secure cloud hosting, database, and communication infrastructure providers.",
    ],
  },
  {
    heading: "4. International Data Transfers",
    intro: [
      "Because our expeditions span Indian marine sanctuaries such as Lakshadweep as well as international destinations like the Maldives, essential manifest details must be shared with trusted overseas dive operators and island accommodations.",
      "We transmit only the required reservation data through protected channels and partner strictly with reputable operators.",
    ],
  },
  {
    heading: "5. Cookies and Website Analytics",
    intro: [
      "Our website uses lightweight cookies and local browser storage strictly to remember your cookie choice, preserve smooth navigation, and understand aggregated site traffic.",
      "You can manage or decline non-essential cookies via our website banner or your browser privacy controls at any time.",
    ],
  },
  {
    heading: "6. Data Security",
    intro: [
      "We employ HTTPS encryption, access-restricted administrative controls, and cautious storage practices to safeguard personal and medical records against unauthorized access, alteration, or misuse.",
      "While no digital platform can guarantee 100% absolute security, we continually maintain rigorous protections around guest data.",
    ],
  },
  {
    heading: "7. Data Retention",
    intro: [
      "Personal records are retained only for as long as needed to fulfill your trip or course, maintain PADI instructional records where required, resolve enquiries, or satisfy tax and regulatory compliance.",
      "Once no longer required, records are securely deleted or anonymized.",
    ],
  },
  {
    heading: "8. Your Privacy Rights",
    bullets: [
      "Request a copy of the personal data we hold about you.",
      "Ask us to update or correct inaccurate contact or booking details.",
      "Request deletion of your personal information where retention is no longer legally required.",
      "Withdraw promotional communication consent or media sharing permissions at any time.",
    ],
  },
  {
    heading: "9. Children's Privacy",
    intro: [
      "Our website does not knowingly collect personal information directly from minors. For Junior Open Water or youth participants under 18, all registrations, medical forms, and consents must be completed and verified by a parent or legal guardian.",
    ],
  },
  {
    heading: "10. Third-Party Websites",
    intro: [
      "Pages across our site link to external platforms such as Instagram, WhatsApp, Google Maps, and PADI.com. Once you follow an external link, those platforms operate under their own privacy policies.",
    ],
  },
  {
    heading: "11. Changes to This Privacy Policy",
    intro: [
      "We may update this Privacy Policy periodically as our website, booking tools, or regulatory standards evolve. The active version and revision date are always posted here.",
    ],
  },
  {
    heading: "12. Contact and Privacy Complaints",
    intro: [
      "To exercise any privacy right, ask a data question, or request deletion, contact our Privacy Lead:",
    ],
    bullets: [
      `Privacy Contact: Privacy & Guest Care Team, ${POLICY_META.legalName}`,
      `Email: ${POLICY_META.email}`,
      `Phone / WhatsApp: ${POLICY_META.phone}`,
      `Base: ${POLICY_META.operatingBase}`,
    ],
  },
];

const CANCELLATION_SECTIONS: PolicyBlock[] = [
  {
    heading: "1. Booking Confirmation",
    intro: [
      "A booking is confirmed once your required deposit or course payment clears and Purva Ocean Adventures issues written confirmation via email or official WhatsApp.",
      "Trip-specific deposit terms and cancellation milestones are also restated alongside your individual itinerary invoice.",
    ],
  },
  {
    heading: "2. Customer-Initiated Cancellations",
    intro: [
      `To cancel an existing reservation, please send written notice to ${POLICY_META.email} or our official WhatsApp line (${POLICY_META.phone}). The effective cancellation date is the day our team receives your written notice.`,
    ],
    table: [
      {
        notice: "30+ days before departure / course start",
        refund:
          "100% refund (less standard payment gateway/processing fees) OR 100% transferable expedition credit.",
      },
      {
        notice: "15 to 29 days before departure",
        refund:
          "50% refund OR 75% expedition credit valid for 12 months on any upcoming trip.",
      },
      {
        notice: "Less than 14 days before departure",
        refund:
          "Non-refundable due to committed boat charters & island berths; fully transferable to another eligible diver with prior approval.",
      },
      {
        notice: "No-show or failure to attend",
        refund: "Non-refundable.",
      },
    ],
  },
  {
    heading: "3. Non-Refundable Costs",
    intro: [
      "Where third-party commitments have already been finalized on your behalf—such as domestic island flights, private speedboat charters, marine park permits, hotel room blocks, or issued PADI eLearning codes—genuinely non-recoverable supplier costs will be deducted from any eligible cash refund.",
    ],
  },
  {
    heading: "4. Changes and Rescheduling",
    bullets: [
      "Requests to move dates or swap to another expedition should be submitted at least 21 days before departure wherever possible.",
      "Date changes depend on seat/hotel availability on the target expedition and any seasonal tariff differences.",
      "No rescheduling change is valid until re-confirmed in writing by our team.",
    ],
  },
  {
    heading: "5. Cancellations by Purva Ocean Adventures",
    intro: [
      "If Purva Ocean Adventures must postpone or cancel a trip before departure due to severe sea conditions, port closures, safety warnings, or unforeseen operational restrictions, you may choose between:",
    ],
    bullets: [
      "A priority transfer to an alternative departure date or destination expedition.",
      "A 100% expedition credit held safely for future travel.",
      "A full refund for all unrendered package services.",
    ],
  },
  {
    heading: "6. Weather and Sea Conditions",
    intro: [
      "Ocean diving depends on wind, swell, currents, and visibility. If local harbor authorities or our boat captain suspend specific dives on safety grounds during an ongoing trip, we make every effort to substitute sheltered reef sites or reschedule within the trip window. Unused boat dives caused directly by marine authority closures are credited or refunded fairly on a pro-rata basis where third-party operators permit.",
    ],
  },
  {
    heading: "7. Diving Courses and Activities",
    bullets: [
      "Once a PADI eLearning digital access code has been issued or redeemed, that portion of the course fee is non-refundable per PADI Worldwide licensing rules, though your digital theory credit remains yours.",
      "Pool sessions and instructor allocations rescheduled within 48 hours of commencement may incur facility re-booking charges.",
      "If a student voluntarily pauses in-water sessions, remaining dives may typically be completed within 6 months by arrangement (referral paperwork available upon request).",
    ],
  },
  {
    heading: "8. Refund Processing",
    intro: [
      "Approved refunds are issued back to the original payment method (UPI, bank transfer, or card) wherever possible and typically reflect within 7–10 business days after written approval, depending on banking processing times.",
    ],
  },
  {
    heading: "9. No-Shows and Late Arrivals",
    intro: [
      "Missing a boat departure, dive check-in, or scheduled session without advance communication is treated as a no-show and is not eligible for refund or complimentary rescheduling.",
    ],
  },
  {
    heading: "10. Travel Insurance",
    intro: [
      "We strongly encourage all divers to carry comprehensive travel and scuba medical insurance (such as DAN — Divers Alert Network, DiveAssure, or World Nomads) covering emergency evacuation, dive accidents, missed flight connections, and unexpected illness.",
    ],
  },
  {
    heading: "11. How to Request a Cancellation or Refund",
    intro: [
      `Send your written cancellation or rescheduling request to ${POLICY_META.email} or WhatsApp ${POLICY_META.phone} including:`,
    ],
    bullets: [
      "Your full name and contact phone number.",
      "Booking reference or confirmation screenshot.",
      "Trip or course name and scheduled departure date.",
      "Whether you prefer a refund, date transfer, or 12-month expedition credit.",
    ],
  },
  {
    heading: "12. Policy Updates",
    intro: [
      "Purva Ocean Adventures may revise this Cancellation & Refund Policy periodically. Existing confirmed bookings always remain protected under the schedule disclosed at the time of confirmation.",
    ],
  },
];

function PolicyDocumentSection({
  id,
  eyebrow,
  title,
  subtitle,
  sections,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: PolicyBlock[];
}) {
  return (
    <article
      id={id}
      className="scroll-mt-32 rounded-3xl border border-[#C8DAE8] bg-white p-6 shadow-[0_14px_40px_rgba(9,30,54,0.06)] sm:p-10"
    >
      <div className="border-b border-[#DCE8F2] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#286C94]">
            {eyebrow}
          </span>
          <span className="rounded-full bg-[#EAF2F8] px-3 py-1 font-sans text-[11px] font-semibold text-[#183952]">
            Last updated: {POLICY_META.lastUpdated}
          </span>
        </div>
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#071E36] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2.5 max-w-2xl font-sans text-sm leading-relaxed text-[#35526B]">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {sections.map((sec) => (
          <section key={sec.heading} className="space-y-3">
            <h3 className="font-sans text-[16px] font-bold tracking-tight text-[#0B233B] sm:text-[17.5px]">
              {sec.heading}
            </h3>

            {sec.intro?.map((paragraph, i) => (
              <p
                key={i}
                className="font-sans text-[14px] leading-[1.7] text-[#2B465E]"
              >
                {paragraph}
              </p>
            ))}

            {sec.bullets && (
              <ul className="space-y-2 pt-0.5">
                {sec.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 font-sans text-[14px] leading-[1.65] text-[#2B465E]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E7FA6]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.groups && (
              <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
                {sec.groups.map((grp) => (
                  <div
                    key={grp.label}
                    className="rounded-2xl border border-[#DCE8F2] bg-[#F5F9FC] p-4"
                  >
                    <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#12314F]">
                      {grp.label}
                    </h4>
                    <ul className="mt-2.5 space-y-1.5">
                      {grp.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 font-sans text-[13px] leading-[1.55] text-[#2B465E]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#2E7FA6]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {sec.table && (
              <div className="mt-3 overflow-hidden rounded-2xl border border-[#CBDDE9]">
                <table className="w-full border-collapse text-left font-sans text-[13.5px]">
                  <thead>
                    <tr className="bg-[#0B2542] text-white">
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11.5px]">
                        Cancellation Notice
                      </th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11.5px]">
                        Refund / Expedition Credit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE8F2] bg-[#F8FBFE]">
                    {sec.table.map((row) => (
                      <tr key={row.notice}>
                        <td className="px-4 py-3.5 font-semibold text-[#0B233B] align-top sm:w-[40%]">
                          {row.notice}
                        </td>
                        <td className="px-4 py-3.5 leading-relaxed text-[#2B465E]">
                          {row.refund}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sec.outro?.map((paragraph, i) => (
              <p
                key={i}
                className="font-sans text-[14px] leading-[1.7] text-[#2B465E]"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}

export function PoliciesShowcase({
  whatsappUrl,
  initialPolicies,
}: {
  whatsappUrl?: string | null;
  initialPolicies?: PoliciesData;
}) {
  const [activeTab, setActiveTab] = useState<PolicyTab>("all");

  const termsSections = initialPolicies?.terms.sections || TERMS_SECTIONS;
  const privacySections = initialPolicies?.privacy.sections || PRIVACY_SECTIONS;
  const cancellationSections = initialPolicies?.cancellation.sections || CANCELLATION_SECTIONS;
  const meta = initialPolicies?.meta || POLICY_META;

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "terms" || hash === "privacy" || hash === "cancellation") {
        setActiveTab(hash);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        }
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const waHref =
    whatsappUrl && whatsappUrl !== "https://wa.me/"
      ? whatsappUrl
      : POLICY_META.whatsappUrl;

  const tabs: { id: PolicyTab; label: string; icon: typeof Scale }[] = [
    { id: "all", label: "All Policies", icon: FileText },
    { id: "terms", label: "Terms & Conditions", icon: Scale },
    { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { id: "cancellation", label: "Cancellation & Refund", icon: CalendarClock },
  ];

  return (
    <div className="min-h-screen bg-[#EEF5FA] text-[#0B233B]">
      {/* Dark Ocean Hero Header */}
      <section className="relative overflow-hidden bg-[#02152a] pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 24%, rgba(56,189,248,0.18) 0%, rgba(2,21,42,0) 58%), linear-gradient(180deg, #02152a 0%, #04203c 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1060px] px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <BackButton
              fallbackHref="/"
              label="Back"
              className="text-sky-300 hover:text-white"
            />
            <span className="text-white/30">/</span>
            <span className="text-white/65">Legal &amp; Guest Policies</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
              PURVA OCEAN ADVENTURES
            </span>
            <span className="h-[1px] w-24 bg-white/40" />
          </div>

          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[54px]">
            Terms, Privacy &amp;{" "}
            <span className="italic text-[#7CC0DF]">Policies</span>
          </h1>

          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">
            Clear guest agreements covering diving course standards, expedition bookings,
            personal data protection, and cancellation schedules.
          </p>

          {/* Interactive Policy Filter & Jump Bar */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== "all") {
                      window.history.replaceState(null, "", `#${tab.id}`);
                    } else {
                      window.history.replaceState(null, "", PUBLIC_ROUTES.policies);
                    }
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-xs font-semibold tracking-wide transition cursor-pointer ${
                    isSelected
                      ? "border-[#7CC0DF] bg-[#7CC0DF] text-[#02152a] shadow-[0_6px_20px_rgba(124,192,223,0.3)]"
                      : "border-white/25 bg-white/10 text-white/90 hover:border-white/50 hover:bg-white/15"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organic Wave Divider */}
      <div className="pointer-events-none relative -mt-12 w-full overflow-hidden leading-none sm:-mt-16">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-[48px] w-full sm:h-[68px]"
          aria-hidden="true"
        >
          <path
            d="M0,40 C280,10 520,10 760,42 C1020,74 1240,68 1440,34 L1440,90 L0,90 Z"
            fill="#EEF5FA"
          />
        </svg>
      </div>

      {/* Policy Document Stack */}
      <section className="mx-auto max-w-[1060px] space-y-10 px-6 pb-20 pt-4 sm:px-10">
        {(activeTab === "all" || activeTab === "terms") && (
          <PolicyDocumentSection
            id="terms"
            eyebrow="Document 01"
            title={initialPolicies?.terms.title || "Terms & Conditions"}
            subtitle="Governing access to our website, PADI scuba certification courses, and guided ocean expeditions."
            sections={termsSections}
          />
        )}

        {(activeTab === "all" || activeTab === "privacy") && (
          <PolicyDocumentSection
            id="privacy"
            eyebrow="Document 02"
            title={initialPolicies?.privacy.title || "Privacy Policy"}
            subtitle="Explaining how Purva Ocean Adventures collects, secures, and uses guest booking and safety information."
            sections={privacySections}
          />
        )}

        {(activeTab === "all" || activeTab === "cancellation") && (
          <PolicyDocumentSection
            id="cancellation"
            eyebrow="Document 03"
            title={initialPolicies?.cancellation.title || "Cancellation & Refund Policy"}
            subtitle="Transparent timelines for trip cancellations, weather contingencies, rescheduling, and refund processing."
            sections={cancellationSections}
          />
        )}

        {/* Direct Support Card above Footer */}
        <div className="rounded-3xl bg-[#042240] p-7 text-white shadow-[0_14px_36px_rgba(2,21,42,0.2)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#7CC0DF]">
              QUESTIONS OR CANCELLATION REQUESTS?
            </p>
            <h3 className="mt-2 font-serif text-2xl font-normal text-white">
              Speak directly with our expedition team
            </h3>
            <p className="mt-1.5 max-w-xl font-sans text-sm text-white/80">
              Need clarification on medical forms, rescheduling an upcoming trip, or updating your
              guest details? Reach us anytime on email or WhatsApp.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
            <a
              href={`mailto:${POLICY_META.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 font-sans text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <Mail className="h-3.5 w-3.5 text-[#7CC0DF]" />
              Email Team
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#7CC0DF] px-5 py-2.5 font-sans text-xs font-bold text-[#02152a] transition hover:bg-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Smooth wave bridge into SiteFooter (#043358) */}
      <div className="pointer-events-none w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-[40px] w-full sm:h-[58px]"
          aria-hidden="true"
        >
          <path
            d="M0,36 C360,72 720,8 1080,44 C1260,62 1370,56 1440,36 L1440,80 L0,80 Z"
            fill="#043358"
          />
        </svg>
      </div>
    </div>
  );
}
