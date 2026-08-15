# Sitemap Audit — tutora.it.com

Date: 2026-08-14
Live sitemap: https://www.tutora.it.com/sitemap.xml
Generator: `/Users/piyushsaini/Projects/TutorConnect/app/sitemap.ts`

## Verdict

**Is the sitemap current with the new content? YES**, with one caveat: the sitemap is dynamically generated from live DB `updatedAt` fields (confirmed via `@updatedAt` in `prisma/schema.prisma`, which Prisma auto-updates on every write to a row — this is a genuine, non-fake freshness signal, not a hardcoded date). Spot-checked entries all show recent, plausible, non-identical lastmod timestamps consistent with real edits. The one real risk is architectural, not content-related: `app/sitemap.ts` has no explicit `export const revalidate` / dynamic config, and Next.js's own docs for this version state *"sitemap.js is cached by default unless it uses a Request-time API or dynamic config option."* Live headers confirm this is being served from Vercel's ISR cache (`x-vercel-cache: HIT`, `age: 716`, i.e. ~12 min old at time of check) rather than fully static/frozen-at-build. 12 minutes of staleness is not a practical SEO problem, but the freshness window is currently governed only implicitly (via the `revalidate: 60` inside the `unstable_cache()` wrappers around `getPublishedCourses`/`getApprovedTutorListings`/`getSubjects`), not by an explicit route-level guarantee. Recommend adding `export const revalidate = 60;` (or similar) directly to `sitemap.ts` to make the route's own cache lifetime explicit and not dependent on inferred Next.js caching heuristics.

**Score: 90/100**

## Score Breakdown

| Area | Score | Notes |
|---|---|---|
| XML validity / format | 20/20 | Well-formed, parses cleanly, single `<urlset>`, correct namespace |
| Size/URL limits | 15/15 | 191 URLs, 33.7KB — far under 50,000 URL / 50MB caps |
| URL status codes | 20/20 | 28-URL stratified sample across all 4 categories (static, /courses, /subjects, /find-a-tutor) — 100% return 200, zero redirects |
| lastmod accuracy | 20/25 | Sourced from genuine DB `updatedAt` (Prisma `@updatedAt`), not hardcoded; static pages use manually maintained constants (developer-discipline dependent). Deducted 5 pts because the sitemap *route's* own cache freshness isn't explicitly configured (see caveat above) — could theoretically lag DB changes by more than the underlying 60s data-cache window in edge cases |
| Missing/orphan pages | 15/15 | No indexable orphans found; `/become-a-tutor`, `/login`, `/signup`, `/complete-profile` all correctly excluded (see below) |
| Deprecated tags | 0/5 (info only) | `<priority>` and `<changefreq>` present on all 191 entries — both ignored by Google, harmless but removable |

## Detailed Findings

### 1. URL status codes (spot check across all 4 categories)
Sampled 10 static pages + 6 `/courses/[slug]` + 6 `/subjects/[slug]` + 6 `/find-a-tutor/[slug]` (28 total, stratified random sample). All returned **HTTP 200**, no redirects, no 404s.

### 2. lastmod accuracy
- `app/sitemap.ts` pulls `updatedAt` directly from Prisma records for courses, subjects, and tutor listings — confirmed via `grep` that all relevant models use `updatedAt DateTime @updatedAt`, which Prisma auto-bumps on **any** field write. This is a real "last significant change" signal, not a fake/static date.
- Static pages (`/about`, `/terms`, `/guarantee`, etc.) use manually maintained exported constants (`ABOUT_LAST_UPDATED`, `TERMS_LAST_UPDATED`, etc.) rather than DB timestamps — legitimate but relies on developers remembering to bump them on real content edits.
- Sample of live lastmod values (2026-08-14 fetch): homepage `2026-08-11`, `/courses` hub `2026-08-06T08:24:06Z`, `/subjects` hub `2026-08-06T08:24:57Z`, `/find-a-tutor` hub `2026-08-07T11:01:34Z` — non-identical, varied timestamps, consistent with genuine per-row activity rather than a bulk fake stamp.
- **Caveat**: could not directly query production DB to cross-timestamp specific owner edits against sitemap lastmod for 100% empirical proof; conclusion is based on code-level verification that the data pipeline is DB-driven and Prisma's auto-update mechanic, plus non-identical live timestamps.
- **Caching risk (see verdict)**: `sitemap.ts` has no explicit `revalidate`/`dynamic` export. Next.js docs (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md`) state the route is cached by default absent such config. Live response showed `x-vercel-cache: HIT`, `age: 716s` — actively revalidating (not frozen at build), so this is a minor/theoretical risk today, not an observed bug.

### 3. Missing/orphan pages
- Compared `app/` route directory against sitemap categories and robots.txt.
- `/become-a-tutor`: returns **HTTP 307** (redirects, effectively gated) and is explicitly listed in `robots.txt` as `Disallow: /become-a-tutor`. **Confirmed not a bug** — correctly excluded from the sitemap; it's an admin-only utility page, not a public/indexable route.
- `/login`, `/signup`, `/complete-profile`: all serve `<meta name="robots" content="noindex, follow"/>`. Correctly excluded from the sitemap.
- `/dashboard`, `/tutor`, `/admin`, `/api`: all disallowed in `robots.txt`. Correctly excluded.
- No other indexable route directories under `app/` were found missing from the sitemap.

### 4. XML syntax/format validity
- Parses cleanly with `xml.etree.ElementTree`; single `<urlset>` root, correct `http://www.sitemaps.org/schemas/sitemap/0.9` namespace, no malformed entries, no duplicate `<loc>` values (191 unique out of 191 total).
- `sitemap_discovery.py` confirms exactly one valid sitemap declared in `robots.txt` (no orphan/broken sitemap index files at common paths — `/sitemap_index.xml`, `/sitemap-index.xml`, `/wp-sitemap.xml` all correctly 404).

### 5. Limits
- 191 URLs total (well under the 50,000 cap), 33,735 bytes uncompressed (well under 50MB). No `news:` sitemap present, so the 1,000-URL news cap is not applicable.

### 6. Deprecated tags
- Every one of the 191 `<url>` entries includes both `<priority>` and `<changefreq>`. Both are explicitly ignored by Google's sitemap parser. Not harmful, but can be removed to slightly reduce file size/noise — informational only, no action required.

### 7. GSC re-indexing status
- **Not verified — requires manual check.** No Google Search Console API access available in this environment. Site owner should manually check GSC's "Pages" report / URL Inspection tool for the specific recently-edited `/courses/[slug]`, `/subjects/[slug]`, and `/find-a-tutor/[slug]` URLs to confirm Google has re-crawled and picked up the new lastmod/content, and should confirm the sitemap's "Discovered/Submitted" count in GSC's Sitemaps report matches 191.

## Recommendations
1. Add `export const revalidate = 60;` (or a value matching the underlying `unstable_cache` calls) directly to `app/sitemap.ts` to make the route's own freshness window explicit rather than implicit/inferred.
2. Optionally strip `<priority>` and `<changefreq>` from the sitemap output — cosmetic, ignored by Google, not urgent.
3. Manually verify GSC Sitemaps report shows 191 discovered URLs and spot-check URL Inspection on 2-3 recently edited pages to confirm re-crawl/re-index timing.
