/**
 * WhatsApp integration — reusable link builder. SAFE for client and server.
 *
 * Visitors always review and send the message themselves. We only prepare a
 * pre-filled wa.me link; nothing is sent automatically.
 *
 * Connected WhatsApp Business Number: +91-6262323232
 */

export const OFFICIAL_WHATSAPP_NUMBER = "916262323232";
export const OFFICIAL_WHATSAPP_DISPLAY = "+91 62623 23232";

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "trip"; tripName: string }
  | { kind: "course"; courseName: string };

/** Keep digits only; wa.me requires international format without "+" or spaces. */
export function normaliseWhatsAppNumber(input: string | null | undefined): string | null {
  if (!input) return null;
  const digits = input.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

export function buildWhatsAppMessage(context: WhatsAppContext = { kind: "general" }): string {
  switch (context.kind) {
    case "trip":
      return `Hello Purva Ocean Adventures, I would like to know more about the trip "${context.tripName}".`;
    case "course":
      return `Hello Purva Ocean Adventures, I would like to know more about the course "${context.courseName}".`;
    default:
      return "Hello Purva Ocean Adventures, I would like to make an enquiry.";
  }
}

export function buildWhatsAppUrl(
  number?: string | null,
  context: WhatsAppContext = { kind: "general" }
): string {
  const normalised = normaliseWhatsAppNumber(number) || OFFICIAL_WHATSAPP_NUMBER;
  return `https://wa.me/${normalised}?text=${encodeURIComponent(buildWhatsAppMessage(context))}`;
}

export function buildDirectWhatsAppUrl(number?: string | null): string {
  const normalised = normaliseWhatsAppNumber(number) || OFFICIAL_WHATSAPP_NUMBER;
  return `https://wa.me/${normalised}`;
}
