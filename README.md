# Freeway Scuba Diving — Website

Marketing site for a Tulum dive operator. Live at **https://freewayscubadiving.com**.

- **Frontend:** React (Create React App + CRACO), React Router v7, Tailwind CSS, Framer Motion. Bilingual EN/ES.
- **CMS:** Sanity v3 (headless). The client edits all texts, prices, photos, tours, FAQ, reviews and SEO from a hosted Studio.
- **Hosting:** Vercel (two projects — see Deploy).

```
frontend/   → the public website (React SPA)
studio/     → the Sanity Studio (CMS admin panel)
backend/    → legacy scaffold, NOT used in production
```

## Local setup

```bash
# Website
cd frontend
npm install
npm start            # dev server on http://localhost:3000

# Studio (CMS)
cd studio
npm install
npm run dev          # Studio on http://localhost:3333
```

### Environment variables
The frontend has hardcoded fallbacks so it runs with no env, but set these to be explicit
(`frontend/.env`, gitignored):
```
REACT_APP_SANITY_PROJECT_ID=4fuznbul
REACT_APP_SANITY_DATASET=production
```
Studio (`studio/.env`, gitignored — see `studio/.env.example`):
```
SANITY_STUDIO_PROJECT_ID=4fuznbul
SANITY_STUDIO_DATASET=production
SANITY_TOKEN=<a Sanity write token, only for the import scripts>
```

## How content works (important)

Content is read from **Sanity** at runtime with an automatic fallback to `frontend/src/data/content.js`.
Key file: `frontend/src/context/LanguageContext.jsx` fetches Sanity on load and deep-merges.

Sanity document types (`studio/schemas/`):
- `diveTour`, `divePackage`, `course`, `faqItem`, `review` — structured, bilingual (localeString/localeText).
- `pageText` — **226 docs**, every editable string on the site, one per doc, addressed by a dot-`path`
  matching a leaf in `content.js`. Applied as overrides in `LanguageContext.applyOverrides`.
  Grouped in the Studio under "✏️ All Site Texts" by page (home/cenote/reef/courses/packages/about/contact/general).
- `pageSeo` — **9 docs**, one per page, `metaTitle`/`metaDescription` (bilingual) → rendered into each page's
  `<Helmet>` via `t.seo[page]` (see `frontend/src/lib/sanityQueries.js` `seoForLang`). Fallbacks are hardcoded in each page.

Import/refresh scripts (need `SANITY_TOKEN`): `studio/scripts/import-content.mjs`, `import-pagetexts.mjs`.

### Sanity project
- Project ID `4fuznbul`, dataset `production` (public read).
- **CORS**: every site/studio origin must be added in sanity.io/manage → API → CORS.
  Studio origin needs "Allow credentials"; the website origin does not.
- Client account `freewayscuba@gmail.com` is an **Administrator**.

## Deploy

### Website → Vercel
Currently deployed from `frontend/` with `npx vercel --prod --yes`.
**Recommended:** import this GitHub repo into Vercel with **Root Directory = `frontend`** and auto-deploy on `main`.

- Domain `freewayscubadiving.com` is the canonical host. `www` → non-www is a 301 redirect via
  `frontend/vercel.json`. All canonicals/sitemap use the non-www host — keep it that way to avoid
  duplicate-content issues in Google Search Console.
- `frontend/public/`: `sitemap.xml`, `robots.txt`, `googlec214c112353e4e41.html` (Search Console
  verification), and `wp-content/uploads/...` (images carried over from the old WordPress site).

### Studio (CMS panel) → Sanity hosting (current)
Hosted by Sanity at **https://freewayscuba.sanity.studio** (hostname set in `studio/sanity.cli.js`).
This is independent of any Vercel account. To update it after schema/structure changes:
```bash
cd studio
npx sanity login          # once, as a project admin
npx sanity deploy         # redeploys to freewayscuba.sanity.studio
```
No CORS config needed — `*.sanity.studio` origins are allowed automatically.

_(Legacy: the panel used to be served from Vercel at dist-one-kappa-84.vercel.app; that can be retired.)_

## Not in this repo (owner-managed)
- Domain registrar & DNS: **SiteGround** (client-owned). A record → Vercel; MX records untouched (email).
- Google Search Console: verified by the client (`freewayscuba@gmail.com`).
