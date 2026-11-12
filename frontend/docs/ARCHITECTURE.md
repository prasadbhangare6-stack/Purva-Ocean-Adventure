# PURVA OCEAN ADVENTURES — Architecture

Status legend used throughout this document:

- **Implemented** — built, compiled and exercised locally.
- **Foundation** — structure and interfaces are in place; behaviour is not yet complete.
- **Awaiting configuration** — code exists, but needs credentials or accounts.
- **Not yet implemented** — planned for a later phase.

---

## 1. Technology stack

| Concern | Choice | Version (installed) | Status |
| --- | --- | --- | --- |
| Framework | Next.js (App Router) | 15.5.7 | Implemented |
| UI runtime | React | 19.1.0 | Implemented |
| Language | TypeScript (strict) | 5.x | Implemented |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | 4.3.x | Implemented |
| Animation | GSAP + ScrollTrigger, CSS keyframes | 3.15.x | Foundation |
| CMS | Sanity (content lake, GROQ) | 4.22.x | Foundation — awaiting project ID |
| Sanity client | next-sanity | 11.6.x | Foundation |
| Validation | Zod | 3.25.x | Implemented |
| Icons | lucide-react (line icons) + inline brand glyphs | 1.70.x | Implemented |
| Tests | Node test runner via `tsx` | tsx 4.x | Implemented (permission matrix) |

**Why these versions.** Next.js 16 is current, but `next-sanity` v13 requires it.
For Node 20 and a broadly compatible toolchain we pinned Next.js 15.5 with
`next-sanity` 11 and Sanity 4 (the release line that supports Next 15). Upgrading
to Next 16 later is a deliberate step, recorded as a decision in §12.

---

## 2. Folder structure

```
purva-ocean-adventures/
├── app/
│   ├── layout.tsx                 Root layout: fonts, metadata, <html>
│   ├── globals.css                Design tokens (@theme), base type, reduced-motion
│   ├── (public)/                  Public website (shared header/footer/WhatsApp)
│   │   ├── layout.tsx             Loads CMS settings + nav, renders chrome
│   │   ├── template.tsx           Page-transition entrance (re-mounts per route)
│   │   ├── page.tsx               /                  Home (placeholder)
│   │   ├── trips/page.tsx         /trips             Trips index (CMS)
│   │   ├── trips/[slug]/page.tsx  /trips/:slug       Reusable trip template (CMS)
│   │   ├── courses/page.tsx       /courses           Courses index (CMS)
│   │   ├── courses/[slug]/page.tsx/courses/:slug     Reusable course template (CMS)
│   │   ├── ocean-quote/page.tsx   /ocean-quote       (placeholder)
│   │   ├── about/page.tsx         /about             (placeholder)
│   │   ├── gallery/page.tsx       /gallery           (placeholder)
│   │   ├── faq/page.tsx           /faq               FAQ (CMS)
│   │   ├── contact/page.tsx       /contact           Contact form
│   │   └── instagram/page.tsx     /instagram         (placeholder)
│   ├── admin/
│   │   ├── sign-in/page.tsx       /admin/sign-in     Awaiting auth provider (disabled form)
│   │   └── (protected)/           Everything below requires a session
│   │       ├── layout.tsx         requireSession() + sidebar + header
│   │       ├── page.tsx           /admin             Overview
│   │       └── trips, courses, gallery, instagram, about, faq,
│   │           enquiries, media, users, settings, activity   (module shells)
│   └── api/
│       ├── contact/route.ts       POST enquiry (validated, bot-checked, storage-gated)
│       └── revalidate/route.ts    POST Sanity webhook → revalidateTag
├── components/
│   ├── ui/                        Shared design-system components (see §5)
│   ├── layout/                    Header, navigation, dropdowns, mobile nav, footer, WhatsApp
│   ├── forms/                     ContactForm
│   └── admin/                     Sidebar, header, confirm dialog, module shell
├── lib/
│   ├── config/site.ts             Non-business config: nav labels, route map
│   ├── env.ts                     Typed env access (server-only)
│   ├── sanity/                    client, fetch wrapper, GROQ, typed data layer
│   ├── auth/                      roles, permission matrix, session, guards
│   ├── admin/navigation.ts        Admin sidebar data
│   ├── activity/record.ts         Activity logging interface
│   ├── integrations/              whatsapp, google-sheets (stub), instagram
│   ├── validation/enquiry.ts      Shared enquiry schema (client + server)
│   ├── animations/                GSAP utilities + reduced-motion hooks
│   └── utils/                     cn(), date formatting
├── sanity/schemaTypes/            Content models (trip, course, gallery, instagram, about, faq, settings, enquiry)
├── sanity.config.ts               Studio config (developer tool, not public)
├── sanity.cli.ts                  Sanity CLI config
├── middleware.ts                  Security headers + optimistic /admin redirect
├── tests/permissions.test.ts      Permission matrix tests
├── .env.example                   Variable template (no secrets)
└── docs/ARCHITECTURE.md           This document
```

**Boundaries that must be respected**

- `lib/**` files that touch secrets or the CMS import `server-only`. Importing them into a client component fails the build.
- Pages never write GROQ inline. They call `lib/sanity/data.ts`.
- Pages never check permissions with `if`/hidden menus alone. They call `requirePermission()`.

---

## 3. Routing

| Route | Purpose | Data source | Status |
| --- | --- | --- | --- |
| `/` | Home | Settings (later: hero, featured trips) | Foundation (placeholder copy) |
| `/trips` | Our Trips index; upcoming first | CMS `trip` (published) | Implemented (awaiting content) |
| `/trips/[slug]` | Trip detail template | CMS `trip` | Implemented (awaiting content) |
| `/courses` | Courses index | CMS `course` | Implemented (awaiting content) |
| `/courses/[slug]` | Course detail template | CMS `course` | Implemented (awaiting content) |
| `/ocean-quote` | Ocean Quote | — | Foundation (placeholder) |
| `/about` | About | CMS `aboutPage` (fetcher ready) | Foundation (placeholder) |
| `/gallery` | Gallery + filters | CMS `galleryItem` (fetcher ready) | Foundation (placeholder) |
| `/faq` | FAQ | CMS `faq` | Implemented (awaiting content) |
| `/contact` | Contact form | Form → `/api/contact` | Foundation (storage awaiting config) |
| `/instagram` | Six-slot Instagram page | CMS `instagramFeed` (fetcher ready) | Foundation (placeholder) |
| `/admin/sign-in` | Sign-in | — | Awaiting configuration |
| `/admin` and `/admin/*` | Dashboard modules | CMS + DB (later) | Shells implemented; tools not yet built |
| `/api/contact` | Enquiry intake | — | Foundation (returns 503 until storage is configured) |
| `/api/revalidate` | Sanity webhook | — | Implemented (needs secret) |

Unknown trip or course slugs return **404**, as do drafts and archived items, because the GROQ queries filter them out.

---

## 4. Content model (Sanity)

Schemas live in `sanity/schemaTypes/`. The public site reads only documents with
`status == "published"` and excludes `drafts.**` (both checks, on purpose).

| Model | Key fields | Notes |
| --- | --- | --- |
| `trip` | name, slug, destination, summary, description, coverImage, gallery, videos, startDate/endDate, dateLabel, pricing, itinerary, inclusions, exclusions, eligibility, relatedTrips (≤3), featured, upcoming, status, displayOrder, seo | Slug drives `/trips/:slug`. Upcoming list = `upcoming == true` and published. |
| `course` | name, slug, summary, description, coverImage, gallery, videos, details (level, duration, minimumAge, certification), prerequisites, relatedTrips, status, displayOrder, seo | Slug drives `/courses/:slug`. |
| `galleryItem` | media (image + alt), category (Underwater, Corals, Marine Life, Divers, Expeditions), caption, location, displayOrder, status | Category values are stable IDs. |
| `instagramFeed` | singleton; `slots` array, validated to **exactly six** | Each slot: Reel/post URL (validated to instagram.com), manual thumbnail, alt text, displayOrder (1–6), enabled. |
| `aboutPage` | singleton; eyebrow, heading, description, backgroundMedia, **four** value sections (title, description, icon, order) | |
| `faq` | question, answer, displayOrder, status | |
| `siteSettings` | singleton; websiteName, logo, email, phone, address, whatsappNumber (validated), socialLinks, footerTagline, announcement, copyrightText, seo | Single source for header/footer/WhatsApp. |
| `contactEnquiry` | fullName, email, phone, enquiryType, trip/course reference, message, submittedAt, status, internalNotes | Internal only. Never queried by the public client. |

**Singletons.** `siteSettings`, `aboutPage` and `instagramFeed` are documents with fixed IDs
(`siteSettings`, `aboutPage`, `instagramFeed`). The custom dashboard must create and
update them by ID and must block creating duplicates. **Not yet implemented:** the
Studio singleton restriction and the dashboard enforcement.

**Media.** Sanity's asset pipeline already de-duplicates identical files by hash
and serves optimised images. The dedicated Media Library screen is a later phase (§9).

---

## 5. Design system and shared components

**Tokens** (`app/globals.css`, `@theme`): colour names map to the brief's references
(`abyss` #010F20, `navy` #031F38, `ocean` #1A4B70, `marine` #0061A9, `sky` #66B4E2,
`gold` #E8C58F, `foam` #FFFFFF). Serif = Cormorant Garamond, sans = Inter.
Change tokens in one place; never hard-code hex values in components.

**Type rules.** H1–H3 are serif with fluid sizes. Labels, eyebrows and buttons use
`label-caps` (uppercase, 0.24em tracking). Emphasis fragments use serif italic in gold
(`<SectionHeading emphasis="surface" />`).

| Component | File | Notes |
| --- | --- | --- |
| Button (primary / secondary / ghost) | `ui/Button.tsx` | Renders `<Link>`, external `<a>`, or `<button>` |
| Container | `ui/Container.tsx` | Responsive max-width and gutters |
| SectionHeading | `ui/SectionHeading.tsx` | Eyebrow + title + italic emphasis |
| ImageContainer | `ui/ImageContainer.tsx` | next/image, rounded, hairline, placeholder when empty |
| VideoBackground | `ui/VideoBackground.tsx` | Muted loop, pauses off-screen, poster-only for reduced motion |
| Card | `ui/Card.tsx` | Whole-card link, keyboard-focusable |
| FormField (text, textarea, select) | `ui/FormField.tsx` | Labels, `aria-invalid`, `aria-describedby`, `role="alert"` errors |
| Modal / lightbox | `ui/Modal.tsx` | Escape, focus trap, focus return, scroll lock |
| Logo | `ui/Logo.tsx` | Uses approved asset when supplied; otherwise a **neutral placeholder mark** |
| Preloader | `ui/Preloader.tsx` | Once per session, skipped under reduced motion |
| RevealOnScroll | `ui/RevealOnScroll.tsx` | GSAP scroll reveal |
| PageHero, CtaSection, EmptyState, PlaceholderPage | `ui/` | Page scaffolding |
| SiteHeader, NavDropdown, MobileNav | `layout/` | See §6 |
| SiteFooter, WhatsAppButton | `layout/` | Driven entirely by CMS settings |

---

## 6. Navigation behaviour

- **Labels** follow the brief: Home | Our Trips | Courses | About | Gallery | FAQ | Contact. Instagram and WhatsApp icons sit in the header; Ocean Quote is reached through **Plan Your Trip**.
- **Our Trips dropdown** lists published trips from the CMS (`/trips/:slug`) and ends with **View All Trips**.
- **Courses dropdown** lists published courses. If no courses are published, it shows the three brief courses as fallback links. These links point at the dynamic template, so they only resolve once the courses are published. They do not display unpublished content.
- **Active page** uses `aria-current="page"` and a gold underline.
- **Keyboard:** Enter/Space toggles, ArrowDown opens and moves focus into the list, Escape closes and returns focus, and focus leaving the component closes it.
- **Touch and outside clicks** close the menu (`pointerdown` outside).
- **Mobile:** full-height panel, accordion groups, body scroll lock, Escape to close.

---

## 7. Authentication and permissions

### 7.1 Current state (honest summary)

| Capability | Status |
| --- | --- |
| Role definitions (Owner, Admin, Editor, Enquiry Manager, Viewer) | Implemented |
| Permission matrix (`lib/auth/permissions.ts`) + unit tests | Implemented (5 tests passing) |
| Server-side guards (`requireSession`, `requirePermission`) | Implemented |
| Protected `/admin` layout and per-page permission checks | Implemented |
| Optimistic middleware redirect for `/admin` without a cookie | Implemented (convenience only) |
| Sign-in form, credential verification, sessions | **Awaiting configuration** (fail-closed) |
| Password reset | **Awaiting configuration** |
| Two-factor verification for Owners | Not yet implemented |
| User accounts storage and invitations | Not yet implemented |
| Activity log persistence | Foundation (interface and console output only) |
| Dashboard notifications | Foundation (bell placeholder) |
| Confirmation before destructive actions | Implemented (`ConfirmDialog`, optional type-to-confirm) |

**Fail-closed design.** With no provider configured, `getAdminSession()` returns `null`.
Every `/admin` page therefore redirects to sign-in, and the sign-in form is disabled.
There is no username/password check and no hardcoded user.

**Local design-preview switch.** For reviewing the dashboard UI during development only,
`ADMIN_DEV_PREVIEW_ROLE` can be set in `.env.local`. It is ignored when `NODE_ENV=production`,
and the dashboard shows a "Dev preview" badge. **Remove it once authentication is configured.**
It is not a login system and must never be enabled on a deployed site.

### 7.2 Permission model

| Resource ↓ / Role → | Owner | Admin | Editor | Enquiry Manager | Viewer |
| --- | --- | --- | --- | --- | --- |
| Trips, Courses, Gallery, Instagram, About, FAQ | all | all incl. publish & delete | read, create, update | — | read |
| Media Library | all | all | read, create, update | — | read |
| Contact Enquiries | all | read, update, delete | — | read, update | — |
| Website Settings | all | read, update | — | — | — |
| User Management | all incl. assign_roles | — | — | — | — |
| Activity Log | all | read | — | — | — |

The matrix is in code. Changes to access rules are reviewed as code changes.
**Decisions needing approval** (see §12): Admin access to Website Settings and Activity Log; Viewer access to media.

### 7.3 Recommended authentication approach (for approval)

**Recommendation: Auth.js (NextAuth v5) with email + password, mandatory TOTP two-factor for Owner and Admin roles, and password-reset via single-use tokens by email.**

Why:
- Auth.js is the established auth library for Next.js App Router and keeps credentials out of client code.
- Passwords hashed with **argon2id** (or bcrypt as a fallback), never stored in plain text.
- Users stored in a small database table (for example Postgres on Neon or Supabase, both have free tiers), **not** in Sanity. Sanity documents are publicly readable through some configurations, and user records must never be.
- Sessions as signed, HTTP-only, `Secure`, `SameSite=Lax` cookies (`purva_admin_session`). The name matches the middleware check.
- Rate limiting on sign-in and reset endpoints.
- Email for password reset and invitations via a transactional provider (for example Resend, Postmark).

**Configuration the owner will need to supply** (none are required now):

| Item | Purpose |
| --- | --- |
| Database connection string (`DATABASE_URL`) | User and session storage |
| `AUTH_SECRET` (or `ADMIN_SESSION_SECRET`) | Signs session cookies |
| Email provider API key and sender address | Password reset, invitations |
| Owner's first account email | Bootstrap the first Owner |

Alternatives considered: Clerk or Supabase Auth (faster, but adds a third-party identity processor and a monthly cost once beyond free limits), and Sanity's built-in members (not suitable for dashboard users). We have not chosen one; this needs approval.

### 7.4 How to enforce permissions in new code

```ts
// Page or server component
await requirePermission("trips", "publish");        // redirects if not allowed

// Server action or route handler
await requirePermission("trips", "delete", { mode: "throw" }); // throws ForbiddenError
await recordActivity({ actorId, actorEmail, action: "delete", resource: "trips", targetId, summary });
```

Never rely on hidden buttons. Every mutation must call `requirePermission` on the server.

---

## 8. CMS integration and caching

- **Published-only reads.** Public queries filter `status == "published"` and exclude drafts. The public client uses `perspective: "published"` and no token.
- **Cache tags.** Each data function tags its fetch (`sanity:trips`, `sanity:courses`, …). Pages cache for up to one hour.
- **Instant updates.** Configure a Sanity webhook to `POST /api/revalidate` with header `x-sanity-revalidate-secret`. Only the affected tags are purged, so the rest of the site is untouched.
- **Fallbacks.** With no project ID, every fetcher returns an empty value and pages show honest empty states. The site builds and runs with no CMS.
- **Static params.** Trip and course detail pages are pre-rendered from published slugs at build time and refreshed on revalidation.

---

## 9. Media Library (planned)

| Capability | Status |
| --- | --- |
| Image and video storage with hash de-duplication | Available via Sanity assets (Foundation) |
| Gallery media, trip media and course media fields | Implemented in schemas |
| Background video support | Implemented (`VideoBackground`) |
| Documents and brochures (PDF) | Schema field to add in Phase 3 |
| Dashboard library UI (preview, search, organise, reuse) | Not yet implemented (shell only) |
| Upload size and format limits | Not yet configured |

---

## 10. Integrations

### 10.1 WhatsApp — Foundation

- `lib/integrations/whatsapp.ts` builds `https://wa.me/<digits>?text=…`.
- Context messages for general, trip and course enquiries. Each trip and course page passes its own name.
- The number comes from CMS **Website Settings**, validated to 8–15 digits.
- Visitors review and send the message themselves.
- Floating button renders only when a valid number exists.
- **Awaiting configuration:** the business WhatsApp number. **Not yet tested** against a real number.

### 10.2 Google Sheets — Foundation (not implemented)

- `lib/integrations/google-sheets.ts` checks configuration and defines the write function.
- The write function currently throws "not implemented", and the route returns **503**, so a visitor is never told their enquiry was received when it was not.
- Planned: a service account with Editor access on one spreadsheet. Credentials stay in server env vars. Writes happen only from the server.
- **Awaiting configuration:** spreadsheet ID, service account email and key.
- **Not yet tested.**

### 10.3 Instagram — Foundation

- Six manually curated slots (Sanity singleton). No automatic feed and no publishing.
- `isAllowedInstagramUrl()` accepts only canonical `instagram.com` Reel/post/IGTV links.
- Thumbnails: manual upload is the reliable path. Automatic thumbnail retrieval is **not implemented** because Instagram does not reliably permit it without an approved API integration. It will be evaluated separately.
- Each tile links to its original content in a new tab.

---

## 11. Contact form

- Fields: full name, email, phone/WhatsApp (optional), enquiry category, trip/course selection (when relevant), optional message.
- **Validation:** one zod schema runs in the browser (fast feedback) and on the server (authoritative).
- **Spam protection:** a hidden honeypot field (bots that fill it receive a generic success and nothing is stored) and a minimum fill time of 2.5 seconds.
- **Confirmation:** the success message appears only when the server confirms storage.
- **Not yet implemented:** IP rate limiting and a server-side CAPTCHA (for example Cloudflare Turnstile). Both are required before launch.
- **Data minimisation:** no IP address or user agent is stored.

---

## 12. Decisions needing approval

1. **Next.js 15.5 vs 16.** We pinned 15.5 for compatibility with `next-sanity` 11 and Sanity 4. Moving to Next 16 is a deliberate upgrade step.
2. **Authentication provider** (§7.3): Auth.js with a Postgres user store and mandatory 2FA is recommended. Approval needed.
3. **Admin access** to Website Settings (read/update) and Activity Log (read). Currently granted.
4. **Viewer access** to media. Currently read-only.
5. **Enquiries visibility for Viewer.** Currently none, to protect visitor data.
6. **Plan Your Trip CTA** links to `/ocean-quote` pending the approved page reference.
7. **Logo.** A neutral placeholder mark is in use. No logo has been invented. Awaiting the approved logo asset.
8. **Studio exposure.** `sanity.config.ts` is for developers. The owner uses the custom dashboard. Decide whether to expose the Studio at all.
9. **Video hosting.** Sanity-hosted video is planned. Large background videos may need a CDN or a streaming host; this affects cost.

---

## 13. Development workflow for the next phases

**Phase 2 — Public pages** (one page at a time, reviewed before the next):
Home, Our Trips (filters and upcoming section), Courses, Ocean Quote, About, Gallery (filters: All, Underwater, Corals, Marine Life, Divers, Expeditions), Instagram, FAQ polish, Contact polish.

**Phase 3 — Admin modules:** Trips, Courses, Gallery, Instagram, About, FAQ, Website Settings and the Media Library, built as server actions wrapped in `requirePermission` and `recordActivity`.

**Phase 4 — Auth and integrations:** sign-in, 2FA, password reset, user management, Google Sheets sync, enquiry storage, activity log persistence, rate limiting, CAPTCHA.

**Phase 5 — Polish (Anti-Gravity stage):** animation refinement, responsiveness, accessibility audit, performance budgets and image/video optimisation.

**Rules for every phase**

1. Do not restructure existing folders. Extend them.
2. New content types get a schema, a GROQ query, a typed fetcher and a cache tag, and are added to the revalidation map.
3. Every new mutation calls `requirePermission` and `recordActivity`.
4. Add a permission test for every new resource.
5. Run `npm run typecheck`, `npm test` and `npm run build` before handing over.
