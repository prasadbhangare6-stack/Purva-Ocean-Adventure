# PURVA OCEAN ADVENTURES

Website and custom content dashboard for Purva Ocean Adventures.

This repository is the **Stage 1 foundation**: architecture, design system, shared
components, CMS schemas, the protected admin shell and the permission layer. Most
public pages are route shells awaiting content and design. See
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full picture and status of each part.

## Quick start (localhost)

Requirements: **Node.js 20.9 or newer** (tested on 20.20) and npm.

```bash
npm install
cp .env.example .env.local     # optional at this stage; the app runs without it
npm run dev                    # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on `0.0.0.0:3000` |
| `npm run build` | Production build (type-checks, lints, compiles all routes) |
| `npm run start` | Serves the production build on `0.0.0.0:3000` |
| `npm run typecheck` | TypeScript check without emitting files |
| `npm test` | Permission matrix tests |
| `npm run sanity` | Developer Studio for schema work (needs a Sanity project ID) |

## Connecting the CMS (when ready)

1. Create a project at sanity.io/manage and copy its project ID.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`.
3. Run `npm run sanity` to open the developer Studio and create a few published documents.
4. Add the `siteSettings`, `aboutPage` and `instagramFeed` singletons once (fixed IDs).
5. Add a webhook in Sanity pointing at `/api/revalidate` with `SANITY_REVALIDATE_SECRET`.

## Admin dashboard

- Route: `http://localhost:3000/admin` (redirects to `/admin/sign-in`).
- Sign-in is **not yet configured**. It fails closed by design.
- To review the dashboard layout locally, set `ADMIN_DEV_PREVIEW_ROLE=owner` in `.env.local`.
  It is ignored in production builds. Do not use it on any deployed site.

## Environment variables

See `.env.example`. Secrets never use the `NEXT_PUBLIC_` prefix.

## Project layout

Summarised in `docs/ARCHITECTURE.md` §2.

## Important

- No business information, prices, itineraries, photography or logos have been invented. Placeholders are labelled as such.
- Integrations (WhatsApp, Google Sheets, Instagram, sign-in) are **prepared, not yet live**. Do not treat them as working until configured and tested.
