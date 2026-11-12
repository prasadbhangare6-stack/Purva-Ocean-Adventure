import { defineArrayMember, defineField, defineType } from "sanity";
import { isAllowedInstagramUrl, INSTAGRAM_SLOT_COUNT } from "@/lib/integrations/instagram";

/**
 * Instagram feed = a singleton holding EXACTLY six manually managed slots.
 * No automatic feed or publishing. Each slot links to the original Reel/post.
 */
export const instagramSlot = defineType({
  name: "instagramSlot",
  title: "Instagram slot",
  type: "object",
  fields: [
    defineField({
      name: "sourceUrl",
      title: "Instagram Reel or post URL",
      type: "url",
      description: "Paste the link to the Reel or post, e.g. https://www.instagram.com/reel/XXXX/",
      validation: (r) =>
        r.required().custom((value) => (typeof value !== "string" || isAllowedInstagramUrl(value) ? true : "Use a public instagram.com Reel, post or IGTV link.")),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description: "Upload a thumbnail manually. This is the reliable option — Instagram does not always allow automatic previews.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "altText", title: "Accessible description", type: "string", description: "Describe the content for screen readers." }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", validation: (r) => r.required().integer().min(1).max(INSTAGRAM_SLOT_COUNT) }),
    defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "altText", subtitle: "sourceUrl", media: "thumbnail", order: "displayOrder" },
    prepare: ({ title, subtitle, media, order }) => ({ title: title || `Slot ${order ?? "?"}`, subtitle, media }),
  },
});

export const instagramFeed = defineType({
  name: "instagramFeed",
  title: "Instagram tiles",
  type: "document",
  // Singleton: one document with fixed _id "instagramFeed". Managed from the custom dashboard.
  fields: [
    defineField({
      name: "slots",
      title: `Slots (exactly ${INSTAGRAM_SLOT_COUNT})`,
      type: "array",
      of: [defineArrayMember({ type: "instagramSlot" })],
      validation: (r) => r.length(INSTAGRAM_SLOT_COUNT).error(`There must be exactly ${INSTAGRAM_SLOT_COUNT} slots.`),
    }),
  ],
});
