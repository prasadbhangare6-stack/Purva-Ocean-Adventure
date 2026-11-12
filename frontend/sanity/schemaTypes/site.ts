import { defineArrayMember, defineField, defineType } from "sanity";
import { normaliseWhatsAppNumber } from "@/lib/integrations/whatsapp";
import { imageField, seoFields, statusField, displayOrderField } from "./common";

/** Website Settings — singleton (fixed _id "siteSettings"). */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "chrome", title: "Header & footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "websiteName", title: "Website name", type: "string", group: "identity", initialValue: "PURVA OCEAN ADVENTURES" }),
    { ...imageField("logo", "Logo"), group: "identity" },
    defineField({ name: "email", title: "Email", type: "string", group: "contact", validation: (r) => r.email() }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2, group: "contact" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description: "International format with country code, e.g. +91 98765 43210. Digits only are used for the link.",
      validation: (r) => r.custom((v) => (!v || normaliseWhatsAppNumber(v) ? true : "Enter 8–15 digits including the country code.")),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "instagram", type: "url", title: "Instagram profile" }),
        defineField({ name: "facebook", type: "url", title: "Facebook" }),
        defineField({ name: "youtube", type: "url", title: "YouTube" }),
      ],
    }),
    defineField({ name: "footerTagline", title: "Footer tagline", type: "string", group: "chrome" }),
    defineField({
      name: "announcement",
      title: "Announcement bar",
      type: "object",
      group: "chrome",
      fields: [
        defineField({ name: "enabled", type: "boolean", title: "Show announcement", initialValue: false }),
        defineField({ name: "message", type: "string", title: "Message" }),
        defineField({ name: "linkUrl", type: "url", title: "Link (optional)" }),
      ],
    }),
    defineField({ name: "copyrightText", title: "Copyright text", type: "string", group: "chrome" }),
    seoFields,
  ],
});

/** About page — singleton (fixed _id "aboutPage"). */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "headingEyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 6 }),
    imageField("backgroundMedia", "Background image"),
    defineField({
      name: "values",
      title: "Value sections (four)",
      type: "array",
      validation: (r) => r.length(4).error("The About page has exactly four value sections."),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
            defineField({
              name: "icon",
              type: "string",
              title: "Icon",
              options: {
                list: [
                  { title: "Compass", value: "compass" },
                  { title: "Shield", value: "shield" },
                  { title: "Fish", value: "fish" },
                  { title: "Users", value: "users" },
                  { title: "Leaf", value: "leaf" },
                  { title: "Anchor", value: "anchor" },
                ],
              },
            }),
            displayOrderField,
          ],
        }),
      ],
    }),
  ],
});

/** FAQ entries. */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    displayOrderField,
    statusField,
  ],
  preview: { select: { title: "question", status: "status" }, prepare: ({ title, status }) => ({ title, subtitle: status ?? "draft" }) },
});

/**
 * Contact enquiries. Internal only — never queried by the public site.
 * Access is restricted to Owner, Admin and Enquiry Manager roles in the dashboard.
 */
export const contactEnquiry = defineType({
  name: "contactEnquiry",
  title: "Contact enquiry",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone / WhatsApp", type: "string" }),
    defineField({
      name: "enquiryType",
      title: "Enquiry type",
      type: "string",
      options: { list: ["trip", "course", "general", "partnership"] },
    }),
    defineField({ name: "tripReference", title: "Trip", type: "reference", to: [{ type: "trip" }] }),
    defineField({ name: "courseReference", title: "Course", type: "reference", to: [{ type: "course" }] }),
    defineField({ name: "message", title: "Message", type: "text", rows: 5 }),
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In progress", value: "in_progress" },
          { title: "Responded", value: "responded" },
          { title: "Closed", value: "closed" },
        ],
      },
      initialValue: "new",
    }),
    defineField({ name: "internalNotes", title: "Internal notes", type: "text", rows: 4, description: "Never shown to visitors." }),
  ],
  preview: { select: { title: "fullName", subtitle: "enquiryType", status: "status" }, prepare: ({ title, subtitle, status }) => ({ title: title ?? "Enquiry", subtitle: `${status ?? "new"} · ${subtitle ?? ""}` }) },
});
