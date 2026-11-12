import { defineArrayMember, defineField, defineType } from "sanity";
import { displayOrderField, imageField, seoFields, statusField } from "./common";

export const trip = defineType({
  name: "trip",
  title: "Trip",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "booking", title: "Dates & pricing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Trip name", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      description: "Used in the web address, e.g. /trips/maafushi-maldives.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "destination", title: "Destination", type: "string", group: "content" }),
    defineField({ name: "summary", title: "Short summary", type: "text", rows: 2, group: "content", validation: (r) => r.max(240) }),
    defineField({ name: "description", title: "Description", type: "array", group: "content", of: [defineArrayMember({ type: "block" })] }),
    displayOrderField,

    imageField("coverImage", "Cover image"),
    defineField({ name: "gallery", title: "Gallery images", type: "array", group: "media", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] })] }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      group: "media",
      description: "Upload optimised MP4 files (or link an externally hosted video).",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "file", type: "file", title: "Video file", options: { accept: "video/*" } }),
            defineField({ name: "externalUrl", type: "url", title: "External URL (YouTube / Vimeo)" }),
          ],
        }),
      ],
    }),

    defineField({ name: "dateLabel", title: "Date label (optional, for flexible dates)", type: "string", group: "booking", description: "e.g. 'Dates to be confirmed'." }),
    defineField({ name: "startDate", title: "Start date", type: "date", group: "booking" }),
    defineField({ name: "endDate", title: "End date", type: "date", group: "booking", validation: (r) => r.custom((end, ctx) => {
      const start = (ctx.document as { startDate?: string } | undefined)?.startDate;
      if (!end || !start) return true;
      return end >= start || "End date must be on or after the start date.";
    }) }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "object",
      group: "booking",
      description: "Pricing is supplied by the owner. Leave empty to show 'On enquiry'.",
      fields: [
        defineField({ name: "currency", type: "string", title: "Currency", initialValue: "INR" }),
        defineField({ name: "amount", type: "number", title: "Amount" }),
        defineField({ name: "displayText", type: "string", title: "Display text (overrides amount)" }),
        defineField({ name: "notes", type: "text", rows: 2, title: "Pricing notes" }),
      ],
    }),

    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "day", type: "number", title: "Day" }),
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
          ],
          preview: { select: { title: "title", day: "day" }, prepare: ({ title, day }) => ({ title, subtitle: day ? `Day ${day}` : "" }) },
        }),
      ],
    }),
    defineField({ name: "inclusions", title: "Inclusions", type: "array", group: "content", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "exclusions", title: "Exclusions", type: "array", group: "content", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "eligibility", title: "Eligibility", type: "array", group: "content", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "relatedTrips",
      title: "Related trips",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "trip" }] })],
      validation: (r) => r.max(3).warning("Three related trips is a good maximum."),
    }),

    defineField({ name: "featured", title: "Featured", type: "boolean", group: "booking", initialValue: false }),
    defineField({
      name: "upcoming",
      title: "Upcoming",
      type: "boolean",
      group: "booking",
      description: "Shown on the Upcoming trips list. Turn off once the trip has passed or is no longer offered.",
      initialValue: false,
    }),
    statusField,
    seoFields,
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "destination", media: "coverImage", status: "status" },
    prepare: ({ title, subtitle, media, status }) => ({ title, subtitle: `${status ?? "draft"} · ${subtitle ?? ""}`, media }),
  },
});
