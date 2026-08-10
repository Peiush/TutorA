# Technical SEO Findings — tutora.it.com (RE-AUDIT)

**Audit date:** 2026-08-10
**Data source:** 100% LIVE fetch via `render_page.py --mode auto` (raw HTML, `is_spa: false` on every sampled page) and direct `curl` against `https://www.tutora.it.com`. Sitemap cross-checked against `sitemap_discovery.py` live run (191 URLs, declared in robots.txt, `valid: true`). No data was read from `docs/seo-audit-tutora/archive-2026-08-04/` or any other pre-2026-08-10 cached artifact. Pages sampled: `/`, `/about`, `/courses`, `/courses/hindi-language-course-459bc4ba`, `/find-a-tutor`, `/find-a-tutor/sudipto-ffbf5742`, `/subjects` (new page), `/subjects/a-level-maths`.

**Category score: 90/100**

**Critical issues: 0**
**High issues: 1**
**Medium issues: 3**
**Low issues: 3**

---

## 1. Crawlability — PASS

- `robots.txt` (live): `Allow: /` with explicit `Disallow: /dashboard`, `/tutor`, `/admin`, `/become-a-tutor`, `/api/` — correctly gates authenticated/internal routes while leaving all public marketing/marketplace routes crawlable. `Sitemap:` directive present and correct.
- `sitemap_discovery.py` confirms the sitemap is declared in robots.txt (not a stale/orphaned reference) and validates as a well-formed `urlset`, HTTP 200.
- Live sitemap fetch: **191 URLs** (`reaudit-2026-08-10-sitemap.xml`, re-verified via `grep -c "<loc>"`). This supersedes the stale "71 URLs" figure from the 2026-08-04 archive — do not reuse that number.
- `/subjects` (hub, added 2026-08-09) and `/subjects/[slug]` pages **are present in the live sitemap** with recent `lastmod` timestamps (2026-08-06 range) and changefreq/priority set appropriately (0.8 hub / 0.6 detail).
- Gated routes (`/dashboard`, `/become-a-tutor`) return HTTP 307 live (redirect to auth), consistent with the robots disallow — no crawl trap.
- No `X-Robots-Tag` header on any sampled page (verified via `curl -I`).

## 2. Indexability — PASS (1 High issue)

- All 8 sampled pages: HTTP 200, no `<meta name="robots">` tag present (defaults to indexable), no `X-Robots-Tag`, self-referencing canonical present and correct on every page (`/`, `/about`, `/courses`, `/courses/hindi-language-course-459bc4ba`, `/find-a-tutor`, `/find-a-tutor/sudipto-ffbf5742`, `/subjects`, `/subjects/a-level-maths` all point to their own clean URL).
- **HIGH — Duplicated brand suffix in `<title>` on `/subjects` hub (new page).** Live title tag:
  `Browse All Subjects — Grade &amp; Curriculum-Specific Tutoring — TutorA — TutorA` (80 chars, "— TutorA" appended twice). The `og:title` meta on the same page is correct (`Browse All Subjects — TutorA`), confirming this is isolated to the `<title>` construction for this specific template, not a copy/paste of the OG tag. Because this page shipped 2026-08-09, it wasn't covered by the earlier remediation pass. Fix: the `/subjects` route is double-appending the site suffix (likely base title already includes it and a layout wrapper appends it again). Recommend capping at ~60 chars and stripping the duplicate.
- No other title-suffix duplication found on `/`, `/about`, `/courses`, course-slug, `/find-a-tutor`, tutor-slug, or subject-slug pages.
- H1 audit: exactly one H1 per page on all 8 samples, and H1 text does not leak the raw `<title>` string (confirms the fix in commit `627b9d9` holds — e.g. home H1 is "The right / personally matched" hero copy, not the meta title).
- **MEDIUM — Tutor profile meta descriptions are unbounded/untruncated.** `/find-a-tutor/sudipto-ffbf5742` meta description is 548 characters (the full bio text with no truncation), versus the ~155-160 char limit Google typically displays. This is a templated field pulled straight from the bio, so it likely affects all 25 tutor profiles in the sitemap. Recommend truncating to ~155 chars server-side with a distinct summary field.
- **LOW — `/courses` hub title is long** (85 chars: "Online Courses by Expert Indian Teachers | Programming, Test Prep & More — TutorA"), will truncate in SERPs. Not broken, just past the ~60-char sweet spot.

## 3. Security — PASS

Headers verified live on all 8 sampled pages (identical, consistent):
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` ✓
- `X-Frame-Options: DENY` ✓
- `X-Content-Type-Options: nosniff` ✓
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` ✓
- `Referrer-Policy: strict-origin-when-cross-origin` ✓
- `Content-Security-Policy` present sitewide: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`. `unsafe-inline` on script-src/style-src is a known, already-decided trade-off per the remediation notes — not re-litigated here.
- HTTPS enforced: `http://` → 308 → `https://www.` (verified live).

## 4. URL Structure — PASS

- Non-www → www: `https://tutora.it.com/` → 308 → `https://www.tutora.it.com/` ✓
- Trailing slash normalized: `/about/` → 308 → `/about` ✓
- Clean, human-readable slugs sitewide (e.g. `/courses/hindi-language-course-459bc4ba`, `/find-a-tutor/sudipto-ffbf5742`, `/subjects/a-level-maths`); hash suffixes on course/tutor slugs are for uniqueness but keyword-rich prefix is preserved.
- 404 handling correct (`/this-page-does-not-exist-xyz` → 404; `/About` case-mismatch → 404, expected Next.js case-sensitive routing, low-priority cosmetic note only).
- No redirect chains detected on any sampled URL (`redirect_chain: []` in all render outputs — single-hop only).

## 5. Mobile-Friendliness — PASS (minor gaps)

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present and correct on all pages, no `maximum-scale`/`user-scalable=no` blocking pinch-zoom.
- **LOW — No `theme-color` meta, no `<link rel="manifest">`, no `apple-touch-icon`** found in live `<head>` (only a generic `favicon.ico`). Cosmetic/PWA-polish gap, not a ranking or usability blocker.

## 6. Core Web Vitals (lab/source-inspection cross-check) — PASS with 1 Medium note

- **LCP fix confirmed live and independently:** searched raw HTML for the previously-reported `autoAlpha:0` hero-hiding pattern — zero matches. Hero heading text ("The right tutor, personally matched") is present as plain server-rendered text in the initial HTML response, not injected/animated in via JS. `opacity:0` matches in the page are all decorative gradient blobs (`opacity:0.14`–`0.55`, `aria-hidden="true"`), unrelated to the hero text.
- CLS risk: no `<img>` tags found on sampled pages (site uses SVG-based avatar/icon treatments rather than raster photos), removing the classic missing-width/height image CLS vector. 143 inline SVGs on homepage.
- **MEDIUM — Heavy initial HTML/JS payload on listing pages.** `/courses` = 344,860 bytes raw HTML with 17 `<script src>` tags; `/find-a-tutor` = 320,144 bytes with 17 script tags (vs. homepage at 244,094 bytes / 16 scripts). This is directionally consistent with the "code-splitting off homepage critical bundle" remediation (homepage is lightest), but the listing hubs remain heavy and warrant INP monitoring given their script count — recommend the separate CrUX/PSI lab-metrics pass validate actual LCP/INP numbers for `/courses` and `/find-a-tutor` specifically.
- Font loading: 3 `font` preload links present on every sampled page (variable fonts), reducing FOIT/FOUT-driven CLS risk.

## 7. Structured Data — PASS

- **HowTo schema confirmed absent sitewide** — independently verified via string search (`'HowTo' in raw`) returning `False` on all 8 pages, plus zero `HowTo` type in any parsed JSON-LD block. Remediation confirmed.
- All JSON-LD blocks on all 8 sampled pages parse as valid JSON and pass the skill's structured-data validator (`valid: true` on every block, block counts 4–7 per page).
- `/about` **BreadcrumbList confirmed present** live (`Organization, WebSite, BreadcrumbList, FAQPage`), matching the remediation claim.
- Course schema (`/courses/hindi-language-course-459bc4ba`) is complete: `name`, `description`, `provider`, `hasCourseInstance` (courseMode, courseWorkload), and `offers` (price, currency, availability) all populated.
- Person schema (`/find-a-tutor/sudipto-ffbf5742`) is complete: `name`, `description`, `url`, `knowsAbout`, `worksFor`.
- `/subjects` hub ships `Organization, WebSite, BreadcrumbList, CollectionPage` — appropriate for a new hub page, no schema errors.

## 8. JavaScript Rendering — PASS

- `is_spa: false` and `mode_used: "raw"` on all 8 sampled pages — confirms server-side rendering; no Playwright fallback was ever triggered, meaning content is fully present in the first-response HTML (crawlers requiring no JS execution will see full content).
- `/subjects` (new page) specifically verified server-rendered and crawlable: raw fetch returned full HTML with subject grid, JSON-LD, and correct canonical/meta without JS execution.

## 9. IndexNow Protocol — NOT IMPLEMENTED

- **LOW-MEDIUM — No IndexNow key file found.** `curl https://www.tutora.it.com/indexnow-key.txt` → 404; no `indexnow` string found in homepage source. Bing/Yandex/Naver will rely on standard crawl discovery rather than push notifications for the frequently-changing `/find-a-tutor` and `/courses` listings. Recommend implementing IndexNow (single key file + ping on publish/update) to accelerate re-indexing of tutor profile changes.

---

## Priority Summary

| Priority | Issue | Page(s) |
|---|---|---|
| High | Duplicated "— TutorA" suffix in `<title>` (80 chars) | `/subjects` hub |
| Medium | Tutor bio meta description unbounded (548 chars on sample) | `/find-a-tutor/[slug]` (all ~25 profiles) |
| Medium | Heavy JS/HTML payload on listing hubs (320-345KB, 17 scripts) — verify INP with lab tool | `/courses`, `/find-a-tutor` |
| Medium | IndexNow protocol not implemented | sitewide |
| Low | `/courses` title tag long (85 chars) | `/courses` |
| Low | No theme-color/manifest/apple-touch-icon | sitewide |
| Low | Case-sensitive routing returns 404 for capitalized paths (cosmetic, not a redirect gap) | e.g. `/About` |

## Confirmed Fixes (Remediation 2026-08-10) — Verified Independently Live

- HowTo schema removal: CONFIRMED (zero occurrences across all sampled pages).
- `/about` BreadcrumbList: CONFIRMED present.
- LCP autoAlpha:0 hero-hiding fix: CONFIRMED absent; hero text is plain server-rendered text.
- `/subjects` hub + `/subjects/[slug]`: CONFIRMED live, in sitemap (191 URLs total), server-rendered, valid structured data.
- CSP `unsafe-inline`: confirmed still present, not re-litigated per instruction.
