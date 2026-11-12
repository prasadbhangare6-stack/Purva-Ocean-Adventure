"use client";

import { useEffect, useState, type FormEvent } from "react";
import { enquirySchema, ENQUIRY_TYPES } from "@/lib/validation/enquiry";
import { TextAreaField, TextField, SelectField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

type Option = { value: string; label: string };
type Errors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "success" | "unavailable" | "error";

/**
 * Contact enquiry form.
 * - Client validation for fast feedback (same zod schema as the server).
 * - Honeypot field + minimum-time check for basic spam protection.
 * - Shows success ONLY when the server confirms the enquiry was stored.
 */
export function ContactForm({
  initialType,
  initialRef,
  trips,
  courses,
}: {
  initialType?: string;
  initialRef?: string;
  trips: Option[];
  courses: Option[];
}) {
  const [renderedAt, setRenderedAt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [enquiryType, setEnquiryType] = useState(
    ["trip", "course", "general", "partnership"].includes(initialType ?? "") ? (initialType as string) : "general",
  );

  useEffect(() => setRenderedAt(Date.now()), []);

  const referenceOptions = enquiryType === "trip" ? trips : enquiryType === "course" ? courses : [];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const raw = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      enquiryType: form.get("enquiryType"),
      reference: form.get("reference"),
      message: form.get("message"),
      website: form.get("website"),
      renderedAt,
    };

    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      setStatus("idle");
      return;
    }
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string; errors?: Errors };

      if (response.ok) {
        setStatus("success");
        setMessage(body.message ?? "Thank you. Your enquiry has been received.");
        event.currentTarget.reset();
      } else if (response.status === 503) {
        setStatus("unavailable");
        setMessage(body.message ?? "Enquiries are temporarily unavailable. Please use WhatsApp or email.");
      } else {
        setErrors(body.errors ?? {});
        setStatus("error");
        setMessage(body.message ?? "Please check the highlighted fields and try again.");
      }
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card border hairline bg-navy/60 p-10">
        <h2 className="text-3xl">Thank you</h2>
        <p className="mt-4 text-foam/70">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 rounded-card border hairline bg-navy/40 p-8 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" autoComplete="name" required error={errors.fullName} />
        <TextField name="email" type="email" label="Email address" autoComplete="email" required error={errors.email} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="phone" type="tel" label="Phone / WhatsApp" autoComplete="tel" hint="Optional. Include your country code." error={errors.phone} />
        <SelectField
          name="enquiryType"
          label="Enquiry category"
          required
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value)}
          options={ENQUIRY_TYPES.map((t) => ({ value: t.value, label: t.label }))}
          error={errors.enquiryType}
        />
      </div>
      {referenceOptions.length > 0 && (
        <SelectField
          key={enquiryType}
          name="reference"
          label={enquiryType === "trip" ? "Trip" : "Course"}
          required
          defaultValue={initialRef && referenceOptions.some((o) => o.value === initialRef) ? initialRef : ""}
          options={[{ value: "", label: "Choose one" }, ...referenceOptions]}
          error={errors.reference}
        />
      )}
      <TextAreaField name="message" label="Message (optional)" error={errors.message} />

      {/* Honeypot: hidden from people, visible to naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-sm text-foam/50">We use your details only to reply to this enquiry.</p>
      </div>

      {(status === "error" || status === "unavailable") && (
        <p role="alert" className="text-sm text-[#f2a7a1]">{message}</p>
      )}
    </form>
  );
}
