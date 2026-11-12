import "server-only";
import fs from "fs";
import path from "path";
import { CURATED_TRIPS, type CuratedTrip } from "@/lib/data/curatedTrips";
import { CURATED_COURSES, type CuratedCourse } from "@/lib/data/curatedCourses";
import { ALL_GALLERY_PHOTOS, type FullPhotoItem } from "@/lib/data/curatedGallery";
import { FAQS, type FaqItem } from "@/lib/data/curatedFaqs";

export type TripData = CuratedTrip;

export type InstagramReel = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  caption?: string;
};

export type AboutPageData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  storyHeading: string;
  storyParagraphs: string[];
  stats: { label: string; value: string }[];
  founder: {
    name: string;
    role: string;
    bio: string;
    image: string;
    instagramUrl: string;
  };
};

export type SiteSettingsData = {
  websiteName: string;
  whatsappNumber: string;
  whatsappUrl: string;
  email: string;
  announcement?: {
    enabled: boolean;
    message: string;
    linkUrl?: string;
  };
  googleSpreadsheetId: string;
  googleSpreadsheetUrl: string;
};

export type SiteContentStore = {
  trips: CuratedTrip[];
  courses: CuratedCourse[];
  gallery: FullPhotoItem[];
  faqs: FaqItem[];
  about: AboutPageData;
  instagram: {
    handleUrl: string;
    founderHandleUrl: string;
    reels: InstagramReel[];
  };
  settings: SiteSettingsData;
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "site-content.json");

function getDefaultContent(): SiteContentStore {
  return {
    trips: Object.values(CURATED_TRIPS),
    courses: Object.values(CURATED_COURSES),
    gallery: [...ALL_GALLERY_PHOTOS],
    faqs: [...FAQS],
    about: {
      eyebrow: "ABOUT OUR FOUNDATION",
      title: "Born From a Passion for the Ocean",
      subtitle: "Connecting ocean lovers, conscious travelers, and underwater explorers with world-class expeditions.",
      storyHeading: "Who We Are",
      storyParagraphs: [
        "Purva Ocean Adventures was born out of deep respect and fascination for the open sea. We curate life-changing scuba diving expeditions to the world's most spectacular and remote marine environments.",
        "Whether you're taking your very first breath underwater or are a seasoned technical diver drifting through Maldivian channels, we provide safe, intimate, and unforgettable adventures."
      ],
      stats: [
        { label: "CERTIFIED DIVERS", value: "500+" },
        { label: "EXPEDITIONS COMPLETED", value: "24+" },
        { label: "SAFETY RECORD", value: "100%" },
        { label: "OCEAN CONSERVATION", value: "100%" }
      ],
      founder: {
        name: "Dr. Purva",
        role: "Founder & Expedition Leader",
        bio: "Doctor, PADI Divemaster, and dedicated ocean conservation advocate guiding divers into the world's most pristine waters.",
        image: "/media/P4.jpg",
        instagramUrl: "https://www.instagram.com/dr.purvaa?obrf=bjBncnJpcXgxZW03"
      }
    },
    instagram: {
      handleUrl: "https://www.instagram.com/purvaoceanadventures?vrfl=cTZjNmw4ZncwdHB0",
      founderHandleUrl: "https://www.instagram.com/dr.purvaa?obrf=bjBncnJpcXgxZW03",
      reels: [
        {
          id: "reel-1",
          title: "Underwater Euphoria",
          url: "https://www.instagram.com/reel/DeuMANFKgi7/?rpxt=cTVieWg1b2R4dDEy",
          thumbnail: "/media/P4.jpg",
          caption: "Whale shark encounters in the deep blue"
        },
        {
          id: "reel-2",
          title: "Channel Drifts",
          url: "https://www.instagram.com/reel/DesAMH2KMZN/?obrf=MTFrcjVrdWhoOXFk",
          thumbnail: "/media/gallery-shark-highres.jpg",
          caption: "Gliding with reef sharks in Maafushi"
        },
        {
          id: "reel-3",
          title: "Manta Magic",
          url: "https://www.instagram.com/reel/Demuzw9qD9P/?psln=cDNuODhwd3NpZXJo",
          thumbnail: "/media/gallery-turtle-deep.jpg",
          caption: "Manta rays soaring over cleaning stations"
        },
        {
          id: "reel-4",
          title: "Turtle Lagoons",
          url: "https://www.instagram.com/reel/DeXHOHetfiC/?xtok=MTZ4b3plM2puZGR0aA==",
          thumbnail: "/media/gallery-card-3-tall.jpg",
          caption: "Gentle green sea turtle surface breath"
        },
        {
          id: "reel-5",
          title: "PADI Certifications",
          url: "https://www.instagram.com/reel/DeUXK8QNXsX/?srtk=MWR5azd1Z3JkZWNjOQ==",
          thumbnail: "/media/gallery-diver-anthias.jpg",
          caption: "First breath underwater in calm lagoons"
        },
        {
          id: "reel-6",
          title: "Island Life & Sunsets",
          url: "https://www.instagram.com/reel/DeR9_69KvNJ/?exln=MTJ2bmJ4OHoyZjA5Yw==",
          thumbnail: "/media/gallery-diver-fish.jpg",
          caption: "Pure ocean community and island memories"
        }
      ]
    },
    settings: {
      websiteName: "Purva Ocean Adventures",
      whatsappNumber: "+91 62623 23232",
      whatsappUrl: "https://wa.me/916262323232",
      email: "purvaoceanadventures@gmail.com",
      announcement: {
        enabled: false,
        message: "Limited spots remaining for Maafushi Maldives expedition. Book now!",
        linkUrl: "/#upcoming-trips"
      },
      googleSpreadsheetId: "11wp3Db18dN-GTEfhRnDGBYEUZdHIt9j7_Culgn3-OQ0",
      googleSpreadsheetUrl: "https://docs.google.com/spreadsheets/d/11wp3Db18dN-GTEfhRnDGBYEUZdHIt9j7_Culgn3-OQ0/edit"
    }
  };
}

export function getSiteContentStore(): SiteContentStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    const defaults = getDefaultContent();
    fs.writeFileSync(STORE_FILE, JSON.stringify(defaults, null, 2), "utf-8");
    return defaults;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultContent(),
      ...parsed,
    };
  } catch (err) {
    console.error("[siteStore] Failed to read store file, falling back to defaults:", err);
    return getDefaultContent();
  }
}

export function saveSiteContentStore(store: Partial<SiteContentStore>): SiteContentStore {
  const current = getSiteContentStore();
  const updated = {
    ...current,
    ...store,
  };

  fs.writeFileSync(STORE_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
