import fs from "fs";
import path from "path";

export type PolicyBlock = {
  heading: string;
  intro?: string[];
  bullets?: string[];
  groups?: { label: string; items: string[] }[];
  table?: { notice: string; refund: string }[];
  outro?: string[];
};

export type PolicyDocument = {
  title: string;
  lastUpdated: string;
  status: "Published" | "Draft";
  sections: PolicyBlock[];
};

export type PolicyMeta = {
  lastUpdated: string;
  legalName: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  operatingBase: string;
  jurisdiction: string;
};

export type PoliciesData = {
  meta: PolicyMeta;
  terms: PolicyDocument;
  privacy: PolicyDocument;
  cancellation: PolicyDocument;
};

const POLICIES_FILE = path.join(process.cwd(), "data", "policies.json");

const DEFAULT_POLICIES: PoliciesData = {
  meta: {
    lastUpdated: "12 Nov 2026",
    legalName: "Purva Ocean Adventures",
    email: "purvaoceanadventures@gmail.com",
    phone: "+91 62623 23232",
    whatsappUrl: "https://wa.me/916262323232",
    operatingBase: "Mumbai, India (Operations across Lakshadweep & the Maldives)",
    jurisdiction: "India",
  },
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "12 Nov 2026",
    status: "Published",
    sections: [
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
              "Trading & Legal Name: Purva Ocean Adventures",
              "Primary Operations Base: Mumbai, India (Operations across Lakshadweep & the Maldives)",
              "Official Email: purvaoceanadventures@gmail.com",
              "Phone / WhatsApp: +91 62623 23232",
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
          "These Terms & Conditions are governed by and construed in accordance with the laws of India, subject to mandatory local maritime regulations and consumer protections applicable in active destination jurisdictions.",
        ],
      },
      {
        heading: "15. Contact Us",
        intro: [
          "If you have any questions regarding these Terms & Conditions or your upcoming dive plans, please reach out to us directly:",
        ],
        bullets: [
          "Organization: Purva Ocean Adventures",
          "Email: purvaoceanadventures@gmail.com",
          "Phone / WhatsApp: +91 62623 23232",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "12 Nov 2026",
    status: "Published",
    sections: [
      {
        heading: "1. Information We Collect",
        intro: [
          "We collect only the details reasonably necessary to answer enquiries, certify students safely, and coordinate diving expeditions:",
        ],
        groups: [
          {
            label: "Personal information",
            items: [
              "Full name, legal birthdate, nationality, and passport / national ID details",
              "Email address, WhatsApp contact number, and billing/home address",
              "Diver agency credentials (PADI number, certification level, logged dive count)",
              "Required PADI medical questionnaires and physician clearance certifications",
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
          "Privacy Contact: Privacy & Guest Care Team, Purva Ocean Adventures",
          "Email: purvaoceanadventures@gmail.com",
          "Phone / WhatsApp: +91 62623 23232",
          "Base: Mumbai, India (Operations across Lakshadweep & the Maldives)",
        ],
      },
    ],
  },
  cancellation: {
    title: "Cancellation & Refund Policy",
    lastUpdated: "12 Nov 2026",
    status: "Published",
    sections: [
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
          "To cancel an existing reservation, please send written notice to purvaoceanadventures@gmail.com or our official WhatsApp line (+91 62623 23232). The effective cancellation date is the day our team receives your written notice.",
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
        heading: "8. Refund Processing Timeline",
        bullets: [
          "Approved refunds are initiated within 5 to 7 business days of written cancellation acceptance.",
          "Refunds are credited through the original payment method (bank account, UPI, or card) in accordance with bank settlement cycles.",
        ],
      },
    ],
  },
};

export function getPoliciesStore(): PoliciesData {
  try {
    if (fs.existsSync(POLICIES_FILE)) {
      const raw = fs.readFileSync(POLICIES_FILE, "utf-8");
      return JSON.parse(raw) as PoliciesData;
    }
  } catch (err) {
    console.error("Failed to read policies.json:", err);
  }

  savePoliciesStore(DEFAULT_POLICIES);
  return DEFAULT_POLICIES;
}

export function savePoliciesStore(data: PoliciesData): void {
  try {
    const dir = path.dirname(POLICIES_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(POLICIES_FILE, JSON.stringify(data, null, 2), "utf-8");

    // Also mirror to backend data directory if it exists
    const backendPolicies = path.join(process.cwd(), "..", "backend", "data", "policies.json");
    const backendDir = path.dirname(backendPolicies);
    if (fs.existsSync(backendDir)) {
      fs.writeFileSync(backendPolicies, JSON.stringify(data, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to write policies.json:", err);
  }
}

