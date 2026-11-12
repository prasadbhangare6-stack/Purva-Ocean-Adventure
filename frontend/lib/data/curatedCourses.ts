export type CuratedCourse = {
  slug: string;
  name: string;
  tagline: string;
  eyebrow: string;
  certification: string;
  duration: string;
  maxDepth: string;
  minimumAge: string;
  prerequisites: string;
  coverImage: string;
  galleryImages: string[];
  summary: string;
  overview: string;
  skillsLearned: string[];
  phases: {
    number: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  requirements: string[];
  pricing: {
    displayText: string;
    note: string;
  };
  cardTheme: {
    pillBg: string;
    pillTextColor: string;
    pillHex: string;
  };
};

export const CURATED_COURSES: Record<string, CuratedCourse> = {
  "open-water-diver": {
    slug: "open-water-diver",
    name: "Open Water Diver",
    tagline: "Your Lifetime Passport to Underwater Exploration",
    eyebrow: "PADI Worldwide Scuba Certification",
    certification: "PADI Open Water Diver (Lifetime International Certification)",
    duration: "3–4 Days (Flexible eLearning)",
    maxDepth: "18 Meters / 60 Feet",
    minimumAge: "10 Years (Junior) / 15 Years (Open Water)",
    prerequisites: "Basic swimming skills (200m swim & 10min tread), med clearance",
    coverImage: "/media/P2.jpg",
    galleryImages: [
      "/media/P2.jpg",
      "/media/clean-diver-backdrop.jpg",
      "/media/gallery-diver-anthias.jpg",
    ],
    summary:
      "Become a fully certified scuba diver with the world's most recognized and respected diving credential. Breathe underwater, explore vibrant coral reefs, and dive independently with a buddy anywhere across the globe.",
    overview:
      "The PADI Open Water Diver course is the world's most popular and widely recognized scuba qualification. Millions of people have learned to scuba dive through this course, embarking on a lifelong journey of ocean discovery. Under the direct guidance of certified Purva Ocean Adventures instructors, you will learn the essential principles and skills needed to explore the underwater realm safely and with complete confidence.",
    skillsLearned: [
      "Breathing comfortably underwater & mastering neutral buoyancy control",
      "Essential safety techniques: mask clearing, regulator recovery & out-of-air scenarios",
      "Dive equipment assembly, pre-dive safety buddy checks & gear maintenance",
      "Underwater navigation basics, dive computer reading & dive planning",
      "Marine life appreciation and ocean conservation etiquette",
    ],
    phases: [
      {
        number: 1,
        title: "Knowledge Development (PADI eLearning)",
        description:
          "Learn the basic principles and safety concepts of scuba diving at your own pace from home or on the beach via your phone or tablet.",
      },
      {
        number: 2,
        title: "Confined Water Dives (Pool Training)",
        description:
          "Practice essential scuba skills in a calm pool or pool-like environment until you feel completely natural and relaxed underwater.",
      },
      {
        number: 3,
        title: "Open Water Dives (4 Ocean Dives)",
        description:
          "Put your skills into practice on real coral reefs! Experience 4 boat or shore ocean dives exploring stunning marine life with your instructor.",
      },
    ],
    inclusions: [
      "PADI Official Digital eLearning Materials & Lifetime Certification Card",
      "Full Scuba Gear Rental (BCD, regulator, wetsuit, mask, snorkel, fins & weights)",
      "Dedicated Certified PADI Instructor (small student-to-instructor ratio)",
      "Logbook & Digital Certification Processing Fees",
      "Marine Sanctuary & Boat Access Fees",
    ],
    requirements: [
      "Minimum age 10 years old",
      "Ability to swim 200 meters continuously without aids",
      "Ability to float / tread water for 10 minutes",
      "Completed PADI Medical Questionnaire (doctor sign-off if required)",
    ],
    pricing: {
      displayText: "Comprehensive All-Inclusive Package",
      note: "Includes gear, boat dives, certification fees & e-Learning",
    },
    cardTheme: {
      pillBg: "bg-[#EEF5FD]",
      pillTextColor: "text-[#031B33]",
      pillHex: "#EEF5FD",
    },
  },

  "advanced-open-water-diver": {
    slug: "advanced-open-water-diver",
    name: "Advanced Open Water Diver",
    tagline: "Expand Your Limits, Deepen Your Skills & Adventure Further",
    eyebrow: "PADI Advanced Exploration Certification",
    certification: "PADI Advanced Open Water Diver (Up to 30 Meters / 100 Feet)",
    duration: "2–3 Days (5 Adventure Ocean Dives)",
    maxDepth: "30 Meters / 100 Feet",
    minimumAge: "12 Years (Junior Advanced) / 15 Years (Advanced)",
    prerequisites: "PADI Open Water Diver (or qualifying certification from another agency)",
    coverImage: "/media/P1.jpg",
    galleryImages: [
      "/media/P1.jpg",
      "/media/clean-diver-backdrop.jpg",
      "/media/gallery-diver-selfie.jpg",
    ],
    summary:
      "Take your diving skills to the next level. Complete 5 specialized Adventure Dives, including Deep Diving (down to 30m) and Underwater Navigation, plus exciting electives like Drift, Wreck, and Night diving.",
    overview:
      "The Advanced Open Water Diver course isn't about being 'expert'—it's designed to advance your diving skills right after your Open Water course. You'll build confidence and expand your scuba capabilities through 5 distinct Adventure Dives. You'll try different specialties under the supervision of your Purva Ocean Adventures instructor, gaining valuable experience, discovering new dive activities, and opening up world-famous deep reef and wreck dive sites worldwide.",
    skillsLearned: [
      "Deep diving techniques, gas management & dealing with physiological effects down to 30m",
      "Precision underwater compass navigation, kick-cycle pacing & natural topography tracking",
      "Peak Performance Buoyancy: streamlining, effortless trim & reduced air consumption",
      "Choice of 3 Adventure electives: Drift diving, Wreck diving, Night diving, Fish ID or Photography",
      "Handling unexpected currents, safety stop deployments & delayed surface marker buoys (DSMB)",
    ],
    phases: [
      {
        number: 1,
        title: "Deep Adventure Dive (Required)",
        description:
          "Descend safely past 18 meters down to 30 meters. Experience the deep marine environment, color changes, and buoyancy adjustments.",
      },
      {
        number: 2,
        title: "Underwater Navigation Dive (Required)",
        description:
          "Master compass navigation, kick-cycles, and natural landmarks to effortlessly find your way back to the boat or exit point.",
      },
      {
        number: 3,
        title: "3 Adventure Elective Dives",
        description:
          "Customize your training: soar with ocean currents on a Drift dive, explore historic shipwrecks, or witness nocturnal critters on a Night dive.",
      },
    ],
    inclusions: [
      "PADI Advanced Open Water Digital eLearning Materials",
      "5 Guided Adventure Ocean Boat Dives with Certified Instructor",
      "Specialty Equipment Rentals (Compass, dive computer, underwater lights, DSMB)",
      "PADI Advanced Certification Card (qualifies you to 30m worldwide)",
      "Small Group Guarantee (Maximum 4 divers per instructor)",
    ],
    requirements: [
      "PADI Open Water Diver certification (or equivalent from another training agency)",
      "Minimum age 12 years old",
      "Completed PADI Medical Questionnaire",
    ],
    pricing: {
      displayText: "5 Adventure Dives & Full Certification",
      note: "Includes all specialty gear, boat excursions & digital materials",
    },
    cardTheme: {
      pillBg: "bg-[#4DA4F3]",
      pillTextColor: "text-white",
      pillHex: "#4DA4F3",
    },
  },

  "specialty-diver": {
    slug: "specialty-diver",
    name: "Specialty Diver Certifications",
    tagline: "Master Niche Disciplines: Nitrox, Deep 40m, Wrecks & Photography",
    eyebrow: "PADI Master Specialty Training",
    certification: "PADI Specialty Diver Certification Cards",
    duration: "1–2 Days per Specialty",
    maxDepth: "Up to 40 Meters / 130 Feet (Deep Diver)",
    minimumAge: "12–15 Years (depending on chosen specialty)",
    prerequisites: "PADI Open Water or Advanced Open Water Diver",
    coverImage: "/media/P3.jpg",
    galleryImages: [
      "/media/P3.jpg",
      "/media/clean-diver-backdrop.jpg",
      "/media/gallery-reef-panorama.jpg",
    ],
    summary:
      "Specialize in what fascinates you most. From Enriched Air Nitrox (stay underwater longer) to Deep Diver (40m limit), Wreck Diver, and Underwater Photography—hone your skills with master-level credentials.",
    overview:
      "Whether you want to spend more time exploring pristine reefs using Enriched Air Nitrox, explore sunken historic shipwrecks safely, or reach the recreational limit of 40 meters, PADI Specialty Courses give you dedicated, in-depth expertise. Taught by seasoned Purva Ocean Adventures specialists, these courses empower you with specialized equipment mastery, emergency protocols, and elite underwater awareness.",
    skillsLearned: [
      "Enriched Air Nitrox (EANx): analyze oxygen mixtures (up to 40% O2) & safely extend no-decompression limits",
      "Deep Diver: plan, manage air consumption & dive safely down to 40 meters / 130 feet",
      "Wreck Diver: navigate shipwreck exteriors, mapping, hazard avoidance & penetration line protocols",
      "Underwater Photography: composition, manual strobe lighting & capturing crisp marine life shots",
      "Emergency Oxygen Provider & Surface Marker Buoy (DSMB) specialty techniques",
    ],
    phases: [
      {
        number: 1,
        title: "Specialty Theory & Gas Analysis",
        description:
          "Study specialty-specific physics, gas blending calculations, emergency procedures, and equipment setups.",
      },
      {
        number: 2,
        title: "Hands-on Workshop & Pre-dive Planning",
        description:
          "Calibrate oxygen analyzers, rig reels and lines, adjust strobe angles, or configure redundant deep breathing systems.",
      },
      {
        number: 3,
        title: "Specialty Ocean Execution Dives",
        description:
          "Execute 2 to 4 dedicated ocean boat dives applying your specialty techniques under live sea conditions.",
      },
    ],
    inclusions: [
      "PADI Specialty eLearning Materials & Lifetime Brevet Certification",
      "Dedicated Specialty Equipment (Oxygen analyzers, deep dive computers, reels, lights)",
      "High-Nitrox Gas Fills & Double Cylinders where applicable",
      "Boat Charters to specialized deep/wreck dive sites",
      "PADI Specialty Instructor Mentorship & Personalized Skill Coaching",
    ],
    requirements: [
      "PADI Open Water or Advanced Open Water Diver (depending on specialty)",
      "Completed PADI Medical Questionnaire",
    ],
    pricing: {
      displayText: "Custom Specialty Packages Available",
      note: "Choose Nitrox, Deep 40m, Wreck, or Multi-Specialty Combos",
    },
    cardTheme: {
      pillBg: "bg-[#095BB1]",
      pillTextColor: "text-white",
      pillHex: "#095BB1",
    },
  },
};

export function getCuratedCourse(slug: string): CuratedCourse | undefined {
  return CURATED_COURSES[slug];
}

