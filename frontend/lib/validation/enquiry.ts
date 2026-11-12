import { z } from "zod";

/**
 * Contact enquiry validation — shared by the client form and the server route.
 * Collects: Full Name, Email (Gmail), Phone Number, Trip / Experience Level, and Message.
 */

export const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner / First-Time Discovery Diver" },
  { value: "open_water", label: "Certified Open Water Diver" },
  { value: "advanced", label: "Advanced Adventurer / Deep Diver" },
  { value: "rescue_master", label: "Rescue Diver / Divemaster" },
  { value: "trip_maldives", label: "Maldives Liveaboard Expedition Inquiry" },
  { value: "trip_maafushi", label: "Maafushi Island Scuba Exploration Inquiry" },
  { value: "trip_lakshadweep", label: "Lakshadweep Coral Sanctuary Inquiry" },
  { value: "custom", label: "Other / Custom Trip or Question" },
] as const;

export const ENQUIRY_TYPES = [
  { value: "trip", label: "Trip enquiry" },
  { value: "course", label: "Course enquiry" },
  { value: "general", label: "General question" },
  { value: "partnership", label: "Partnership or media" },
] as const;

const phonePattern = /^\+?[0-9\s()-]{7,25}$/;

export const enquirySchema = z.object({
  fullName: z
    .string({ message: "Please enter your full name." })
    .trim()
    .min(2, "Your name should be at least 2 characters.")
    .max(120, "Your name is too long."),
  email: z
    .string({ message: "Please enter your email / Gmail address." })
    .trim()
    .email("Please enter a valid email address.")
    .max(254),
  phone: z
    .string({ message: "Please enter your phone / WhatsApp number." })
    .trim()
    .min(7, "Please enter a valid phone number with country code.")
    .max(30, "Phone number is too long.")
    .refine((v) => phonePattern.test(v), "Please enter a valid phone number (e.g. +91 98765 43210)."),
  experienceLevel: z.string().trim().max(120).optional().or(z.literal("")),
  enquiryType: z.string().trim().max(60).optional().or(z.literal("")),
  reference: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(3000, "Please keep your message under 3000 characters.").optional().or(z.literal("")),
  // Honeypot: real visitors never fill this. Checked in the route, not shown as an error.
  website: z.string().optional(),
  // UTM & Analytics attribution
  utm_source: z.string().trim().max(120).optional().or(z.literal("")),
  utm_medium: z.string().trim().max(120).optional().or(z.literal("")),
  utm_campaign: z.string().trim().max(120).optional().or(z.literal("")),
  utm_term: z.string().trim().max(120).optional().or(z.literal("")),
  utm_content: z.string().trim().max(120).optional().or(z.literal("")),
  referrer: z.string().trim().max(300).optional().or(z.literal("")),
  // Time (ms) the form was rendered; used for a minimum-time check.
  renderedAt: z.coerce.number().int().nonnegative().optional().default(0),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryPayload = z.output<typeof enquirySchema>;
