import { defineField, defineType } from "sanity";
import { displayOrderField, statusField } from "./common";

/** Public gallery categories. Values are stable identifiers; titles are display labels. */
export const GALLERY_CATEGORIES = [
  { title: "Underwater", value: "underwater" },
  { title: "Corals", value: "corals" },
  { title: "Marine Life", value: "marineLife" },
  { title: "Divers", value: "divers" },
  { title: "Expeditions", value: "expeditions" },
] as const;

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  fields: [
    defineField({
      name: "media",
      title: "Media",
      type: "image",
      options: { hotspot: true },
      description: "Images are optimised automatically. Video items will use the Media Library in a later phase.",
      validation: (r) => r.required(),
      fields: [defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() })],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...GALLERY_CATEGORIES], layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string", validation: (r) => r.max(140) }),
    defineField({ name: "location", title: "Location", type: "string" }),
    displayOrderField,
    statusField,
  ],
  preview: {
    select: { title: "caption", subtitle: "category", media: "media", status: "status" },
    prepare: ({ title, subtitle, media, status }) => ({ title: title ?? "Untitled", subtitle: `${status ?? "draft"} · ${subtitle ?? ""}`, media }),
  },
});
