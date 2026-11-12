"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Phone, Mail, MessageSquare, ChevronRight } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/layout/BrandIcons";
import { OFFICIAL_WHATSAPP_NUMBER } from "@/lib/integrations/whatsapp";

/**
 * Contact Showcase Component:
 * - Full-bleed underwater eagle-ray, sunbeam, and coral reef backdrop matching the reference mockup.
 * - Left column: "LET'S CONNECT" eyebrow + rule, Serif "Get in" / italic sky-blue "Touch" with curved underline swoosh,
 *   descriptive copy, direct email badge, vertical separator, and circular Instagram & WhatsApp buttons.
 * - Right column: Glowing translucent frosted blue glass card with icon-prefixed Full Name, Phone Number,
 *   Email Address, Message inputs, Privacy Policy checkbox, and Glacier-Ice / Ocean-Sky pill CTA (no gold).
 * - Submits directly to /api/contact with automatic UTM tracking, form success/error states, and Google Sheets sync.
 */
export function ContactShowcase() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [bgSrc, setBgSrc] = useState("/media/contact-ray-bg.jpg");
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreedPrivacy) {
      setStatus("error");
      setStatusMessage("Please agree to the Privacy Policy before sending your message.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const searchParams =
        typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const utmData = {
        utm_source: searchParams?.get("utm_source") || "",
        utm_medium: searchParams?.get("utm_medium") || "",
        utm_campaign: searchParams?.get("utm_campaign") || "",
        utm_term: searchParams?.get("utm_term") || "",
        utm_content: searchParams?.get("utm_content") || "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          ...utmData,
          renderedAt: Date.now(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (res.ok) {
        setStatus("success");
        setStatusMessage(
          data.message ||
            "Thank you! Your message has been received. Our expedition team will get in touch shortly."
        );
        setFormValues({
          fullName: "",
          phone: "",
          email: "",
          message: "",
        });
        setAgreedPrivacy(false);
      } else {
        setStatus("error");
        if (data.errors && Object.keys(data.errors).length > 0) {
          const firstErr = Object.values(data.errors)[0];
          setStatusMessage(firstErr || "Please verify all required fields.");
        } else {
          setStatusMessage(data.message || "Failed to send message. Please reach out via WhatsApp.");
        }
      }
    } catch {
      setStatus("error");
      setStatusMessage("Could not connect to server. Please reach us directly on WhatsApp or Email.");
    }
  }

  const instagramUrl =
    "https://www.instagram.com/purvaoceanadventures?vrfl=cTZjNmw4ZncwdHB0";
  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Purva Ocean Adventures! I would like to connect regarding diving expeditions."
  )}`;

  return (
    <section
      id="contact"
      className="relative isolate flex min-h-screen min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#01182e] text-white select-none scroll-mt-20 pt-20 sm:pt-24 pb-8 sm:pb-12"
    >
      {/* Full-Bleed Underwater Spotted Eagle Ray, Sunbeams & Coral Reef Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgSrc}
          alt="Spotted eagle ray gliding beneath sunlit surface over vibrant coral reef"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          onError={() => setBgSrc("/media/gallery-eagle-ray-bg.jpg")}
        />
        {/* Subtle left & edge oceanic shading so typography stays crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#01162b]/65 via-[#01162b]/20 to-[#01162b]/35" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#01162b]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#01162b]/55 to-transparent" />
      </div>

      {/* Main Split Content Matching Exact Reference Composition */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* ─────────────────────────────────────────────────────────
              LEFT COLUMN (6 Cols): Typography, Email & Social Circles
          ───────────────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6 pr-0 lg:pr-6">
            {/* Eyebrow with extending fine line */}
            <div className="flex items-center gap-4 mb-3 sm:mb-4">
              <p className="text-[0.7rem] sm:text-xs font-medium tracking-[0.28em] uppercase text-white/90 whitespace-nowrap">
                LET&apos;S CONNECT
              </p>
              <span className="h-px w-24 sm:w-32 bg-white/60 inline-block" />
            </div>

            {/* Display Headline: Serif "Get in" + Italic Sky-Ice "Touch" with curved swoosh */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.8rem] font-medium tracking-tight text-white leading-[0.95] drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
              Get in
              <span className="block italic font-normal text-[#7dd3fc] mt-1 relative w-fit">
                Touch
                {/* Graceful Curved Underline Swoosh in Ocean Sky-Ice (No Gold) */}
                <svg
                  viewBox="0 0 210 18"
                  fill="none"
                  className="w-full h-3 sm:h-4 -mt-0.5 text-[#7dd3fc]"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13 C62 3, 145 3, 206 11"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-[1.02rem] text-white/90 font-normal leading-relaxed max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Have questions or ready to plan your next adventure? We&apos;re here to help you dive right in.
            </p>

            {/* Email Contact Row */}
            <div className="mt-6 sm:mt-7">
              <a
                href="mailto:purvaoceanadventures@gmail.com"
                className="group inline-flex items-center gap-3.5 text-white hover:text-[#bae6fd] transition-colors"
              >
                <span className="inline-flex size-10 sm:size-11 items-center justify-center rounded-full border border-white/65 bg-white/[0.06] backdrop-blur-sm transition-all duration-300 group-hover:border-[#7dd3fc] group-hover:bg-[#7dd3fc]/20 group-hover:scale-105">
                  <Mail className="size-4.5" />
                </span>
                <span className="text-sm sm:text-base font-normal tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                  purvaoceanadventures@gmail.com
                </span>
              </a>
            </div>

            {/* Vertical Divider + Social Circular Icons */}
            <div className="mt-4 sm:mt-5 flex items-center gap-4 pl-2">
              <span className="h-9 w-px bg-white/45 inline-block mr-1" aria-hidden="true" />

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in a new tab)"
                className="inline-flex size-10 sm:size-11 items-center justify-center rounded-full border border-white/65 bg-white/[0.06] backdrop-blur-sm text-white transition-all duration-300 hover:border-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#011832] hover:scale-110 shadow-md"
              >
                <InstagramIcon className="size-4.5" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (opens in a new tab)"
                className="inline-flex size-10 sm:size-11 items-center justify-center rounded-full border border-white/65 bg-white/[0.06] backdrop-blur-sm text-white transition-all duration-300 hover:border-[#7dd3fc] hover:bg-[#7dd3fc] hover:text-[#011832] hover:scale-110 shadow-md"
              >
                <WhatsAppIcon className="size-4.5" />
              </a>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              RIGHT COLUMN (6 Cols): Glowing Translucent Blue Glass Card
          ───────────────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="relative rounded-2xl sm:rounded-3xl border border-sky-300/45 bg-[#032c52]/55 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(56,189,248,0.22),inset_0_1px_1px_rgba(255,255,255,0.28)]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                {/* Input 1: Full Name */}
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-white/80"
                    strokeWidth={1.7}
                  />
                  <input
                    type="text"
                    required
                    aria-label="Full Name"
                    placeholder="Full Name"
                    value={formValues.fullName}
                    onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
                    className="w-full rounded-xl border border-sky-200/35 bg-[#021e38]/65 pl-11 pr-4 py-3 text-sm text-white placeholder-white/75 focus:border-sky-300 focus:bg-[#022647]/80 focus:outline-none focus:ring-1 focus:ring-sky-300 transition-all"
                  />
                </div>

                {/* Input 2: Phone Number */}
                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-white/80"
                    strokeWidth={1.7}
                  />
                  <input
                    type="tel"
                    required
                    aria-label="Phone Number"
                    placeholder="Phone Number"
                    value={formValues.phone}
                    onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                    className="w-full rounded-xl border border-sky-200/35 bg-[#021e38]/65 pl-11 pr-4 py-3 text-sm text-white placeholder-white/75 focus:border-sky-300 focus:bg-[#022647]/80 focus:outline-none focus:ring-1 focus:ring-sky-300 transition-all"
                  />
                </div>

                {/* Input 3: Email Address */}
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-white/80"
                    strokeWidth={1.7}
                  />
                  <input
                    type="email"
                    required
                    aria-label="Email Address"
                    placeholder="Email Address"
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    className="w-full rounded-xl border border-sky-200/35 bg-[#021e38]/65 pl-11 pr-4 py-3 text-sm text-white placeholder-white/75 focus:border-sky-300 focus:bg-[#022647]/80 focus:outline-none focus:ring-1 focus:ring-sky-300 transition-all"
                  />
                </div>

                {/* Input 4: Message */}
                <div className="relative">
                  <MessageSquare
                    className="pointer-events-none absolute left-4 top-3.5 size-4.5 text-white/80"
                    strokeWidth={1.7}
                  />
                  <textarea
                    rows={4}
                    aria-label="Message"
                    placeholder="Message"
                    value={formValues.message}
                    onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-sky-200/35 bg-[#021e38]/65 pl-11 pr-4 py-3 text-sm text-white placeholder-white/75 focus:border-sky-300 focus:bg-[#022647]/80 focus:outline-none focus:ring-1 focus:ring-sky-300 transition-all"
                  />
                </div>

                {/* Privacy Policy Checkbox Row */}
                <div className="flex items-center gap-2.5 pt-0.5 text-xs sm:text-[0.8rem] text-white/90">
                  <input
                    id="contact-privacy"
                    type="checkbox"
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="size-4 rounded border-white/50 bg-[#021e38]/80 accent-[#7dd3fc] cursor-pointer"
                  />
                  <label htmlFor="contact-privacy" className="cursor-pointer select-none">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-[#7dd3fc] hover:text-white underline underline-offset-2 font-medium cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Form Status Banners (Success / Error States) */}
                {status === "success" && (
                  <div className="rounded-xl border border-emerald-400/40 bg-emerald-950/65 p-3 text-xs text-emerald-200 flex items-center gap-2">
                    <svg className="size-4 shrink-0 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{statusMessage}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-xl border border-rose-400/40 bg-rose-950/65 p-3 text-xs text-rose-200 flex items-center gap-2">
                    <svg className="size-4 shrink-0 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Primary Pill CTA Button: Glacier White / Sky-Ice Gradient (Zero Gold) */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative mt-1 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0f9ff] via-[#bae6fd] to-[#7dd3fc] hover:from-white hover:to-[#bae6fd] text-[#011832] font-semibold text-sm sm:text-[0.95rem] tracking-wide py-3.5 px-6 shadow-[0_8px_28px_rgba(56,189,248,0.35)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(125,211,252,0.5)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer overflow-hidden"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-[280%]" />
                  <span className="relative z-10">
                    {status === "submitting" ? "Sending Message..." : "Send Message"}
                  </span>
                  <ChevronRight className="relative z-10 size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Quick Modal */}
      {showPrivacyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#011832] border border-sky-400/30 p-6 sm:p-7 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl font-medium text-white">Privacy Policy</h3>
            <p className="mt-3 text-xs sm:text-sm text-sky-100/85 leading-relaxed font-light">
              We collect only the contact details you share here (full name, phone/WhatsApp number, email address, and message) strictly to coordinate your dive expeditions and respond to your inquiries. Your information is transmitted securely and never sold or shared with third parties.
            </p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <Link
                href="/policies#privacy"
                className="text-xs font-medium text-[#7dd3fc] underline underline-offset-4 hover:text-white transition-colors"
              >
                Read Full Privacy Policy →
              </Link>
              <button
                type="button"
                onClick={() => {
                  setAgreedPrivacy(true);
                  setShowPrivacyModal(false);
                }}
                className="rounded-full bg-[#bae6fd] hover:bg-white text-[#011832] px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Agree &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
