import { defineArrayMember, defineField, defineType } from "sanity";
import { displayOrderField, imageField, seoFields, statusField } from "./common";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Course name", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      description: "Used in the web address, e.g. /courses/open-water-diver.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "Short summary", type: "text", rows: 2, group: "content", validation: (r) => r.max(240) }),
    defineField({ name: "description", title: "Description", type: "array", group: "content", of: [defineArrayMember({ type: "block" })] }),
    displayOrderField,
    defineField({
      name: "details",
      title: "Course details",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "level", type: "string", title: "Level" }),
        defineField({ name: "duration", type: "string", title: "Duration" }),
        defineField({ name: "minimumAge", type: "string", title: "Minimum age" }),
        defineField({ name: "certification", type: "string", title: "Certification" }),
      ],
    }),
    defineField({ name: "prerequisites", title: "Prerequisites", type: "array", group: "content", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "relatedTrips",
      title: "Related trips",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "trip" }] })],
      validation: (r) => r.max(3),
    }),

    imageField("coverImage", "Cover image"),
    defineField({ name: "gallery", title: "Gallery images", type: "array", group: "media", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] })] }),
    defineField({ name: "videos", title: "Videos", type: "array", group: "media", of: [defineArrayMember({ type: "file", options: { accept: "video/*" } })] }),

    statusField,
    seoFields,
  ],
  preview: {
    select: { title: "name", media: "coverImage", status: "status" },
    prepare: ({ title, media, status }) => ({ title, subtitle: status ?? "draft", media }),
  },
});
