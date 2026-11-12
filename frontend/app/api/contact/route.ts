import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation/enquiry";
import { appendEnquiryToSheet } from "@/lib/integrations/google-sheets";

/**
 * POST /api/contact — server-side enquiry processing.
 * - Validates input with Zod schema.
 * - Rejects spam bots (honeypot field).
 * - Appends enquiry directly into spreadsheet (CSV/JSON store and remote Google Sheet if configured).
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  // Honeypot: bots that fill the hidden 'website' input get dropped silently
  if (
    typeof json === "object" &&
    json !== null &&
    "website" in json &&
    String((json as { website?: unknown }).website ?? "") !== ""
  ) {
    return NextResponse.json({ message: "Thank you. Your enquiry has been received." }, { status: 202 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] ??= issue.message;
    }
    return NextResponse.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const data = parsed.data;

  try {
    await appendEnquiryToSheet({
      ...data,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message: "Thank you! Your inquiry has been received. Our expedition team will get in touch with you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[contact] storage error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: "We could not save your enquiry just now. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
