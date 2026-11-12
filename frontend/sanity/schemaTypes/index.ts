import { trip } from "./trip";
import { course } from "./course";
import { galleryItem } from "./gallery";
import { instagramFeed, instagramSlot } from "./instagram";
import { aboutPage, contactEnquiry, faq, siteSettings } from "./site";

/** Every schema type registered with Sanity. Add new models here. */
export const schemaTypes = [
  trip,
  course,
  galleryItem,
  instagramSlot,
  instagramFeed,
  aboutPage,
  faq,
  siteSettings,
  contactEnquiry,
];
