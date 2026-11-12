import { defineField } from "sanity";

/** Shared field builders so every content model behaves consistently. */

export const statusField = defineField({
  name: "status",
  title: "Publication status",
  type: "string",
  description: "Only 'Published' items appear on the public website. Drafts and archived items are hidden.",
  options: {
    list: [
      { title: "Draft", value: "draft" },
      { title: "Published", value: "published" },
      { title: "Archived", value: "archived" },
    ],
    layout: "radio",
  },
  initialValue: "draft",
  validation: (rule) => rule.required(),
});

export const displayOrderField = defineField({
  name: "displayOrder",
  title: "Display order",
  type: "number",
  description: "Lower numbers appear first.",
  validation: (rule) => rule.integer().min(0).max(999),
});

export const seoFields = defineField({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "Meta title", type: "string", validation: (r) => r.max(70) }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 2, validation: (r) => r.max(160) }),
  ],
});

export const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe the image for screen readers.",
        validation: (r) => r.required(),
      }),
    ],
  });
