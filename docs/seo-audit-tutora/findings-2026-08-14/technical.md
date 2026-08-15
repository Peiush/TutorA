# Technical SEO Findings — tutora.it.com (RE-AUDIT, 2026-08-14)

**Audit date:** 2026-08-14
**Prior baseline:** 90/100, confirmed 2026-08-10 (`docs/seo-audit-tutora/findings/technical.md`)
**Data source:** 100% live fetch via `render_page.py --mode auto` (raw HTML, `is_spa: false`/`mode_used: "raw"` on every sampled page) and direct `curl` against `https://www.tutora.it.com`. Sitemap re-validated via `sitemap_discovery.py` (191 URLs, declared in robots.txt, `valid: true`). Pages sampled: `/`, `/about`, `/courses`, `/courses/hindi-language-course-459bc4ba`, `/find-a-tutor`, `/find-a-tutor/sudipto-ffbf5742`, `/subjects`, `/subjects/a-level-maths`, `/request-a-tutor` (new sample this round). Plus a random 15-URL sample of the live sitemap spot-checked for HTTP status, and `git log` cross-referencing of template-commit dates vs. sitemap `lastmod`/DB `updatedAt` freshness signals.

## Category score: 93/100 (was 90/100 — +3)

**Critical issues: 0**
**High issues: 0** (was 1 — the `/subjects` duplicated title-suffix bug is fixed)
**Medium issues: 2** (was 3 — tutor meta-description bug is fixed; new Medium: request-a-tutor lastmod staleness)
**Low issues: 4** (was 3 — IndexNow still open, courses title still long, no theme-color/manifest, cosmetic case-routing; net new: none added, one reclassified)

---

## 1. Crawlability — PASS

- `robots.txt` (live, unchanged): `Allow: /` with `Disallow: /dashboard`, `/tutor`, `/admin`, `/become-a-tutor`, `/api/` — correct. `Sitemap:` directive present and correct.
- `sitemap_discovery.py` confirms the sitemap is declared in robots.txt (not stale/orphaned), validates as a well-formed `urlset`, HTTP 200, `valid: true`.
- **Live sitemap: 191 URLs** — matches the count independently pre-verified by the requester and matches `app/sitemap.ts` logic exactly (1 homepage + 9 static pages including `/subjects` and `/request-a-tutor` + 53 `/courses/[slug]` + 25 `/find-a-tutor/[slug]` (deduplicated per-tutor, not per-listing) + 103 `/subjects/[slug]`).
- **No orphaned/404ing sitemap URLs found.** Random 15-URL sample across courses, subjects, and tutor detail pages: all 15 returned HTTP 200.
- `/become-a-tutor` correctly excluded from the sitemap (admin-only route, `Disallow`'d, returns HTTP 307 to auth) — confirmed not a bug, consistent with the requester's note.
- Gated routes (`/dashboard`, `/become-a-tutor`) return HTTP 307 live — no crawl trap.
- No `X-Robots-Tag` header on any sampled page.
- **NEW — `llms.txt` present and live** (`https://www.tutora.it.com/llms.txt`, HTTP 200). Well-formed, describes the marketplace model, links Home/About/Find-a-Tutor/Request-a-Tutor/Courses/Teach plus 5 representative course pages and Terms/Privacy. This is a genuine GEO/AI-crawler improvement since the 08-10 baseline (which did not check for or find this file).

## 2. Indexability — PASS (0 High, was 1 High)

- All 9 sampled pages (including new `/request-a-tutor` sample): HTTP 200, no `<meta name="robots">` tag (defaults to indexable), no `X-Robots-Tag`, self-referencing canonical present and correct on every page — `/`, `/about`, `/courses`, `/courses/hindi-language-course-459bc4ba`, `/find-a-tutor`, `/find-a-tutor/sudipto-ffbf5742`, `/subjects`, `/subjects/a-level-maths`, `/request-a-tutor` all canonicalize to their own clean URL. **No accidental noindex found on any new/changed content** (this was a specific concern flagged by the requester — verified clean).
- **FIXED — the 08-10 HIGH issue is resolved.** `/subjects` hub title is now a single, correct string: `Browse All Subjects — Grade & Curriculum-Specific Tutoring — TutorA` (67 chars, one "— TutorA" suffix, not two). Confirmed via direct regex extraction and unescaping of the live `<title>` tag.
- **FIXED — the 08-10 MEDIUM issue is resolved.** Tutor profile meta descriptions are now bounded. `/find-a-tutor/sudipto-ffbf5742` meta description is **154 characters** (was 548 unbounded chars on 08-10), a distinct truncated summary rather than the raw bio dump. This appears to be a templated fix, not a one-off — worth spot-checking a second profile in a future pass to confirm it's applied to all ~25, but the mechanism (bounded field vs. raw bio) is now clearly in place.
- Title lengths across all 9 samples now land in a reasonable 29-81 char band (tutor 49, subject 55, course 30, subjects hub 67, courses hub 81, find-a-tutor hub 63, home 65, about 29, request-a-tutor title also clean).
- H1 audit: exactly one H1 per page on all 9 samples.
- Structured data types present and valid on every sampled page (see Section 7) — no orphaned/invalid JSON-LD introduced by the new content.
- **MEDIUM (NEW) — `request-a-tutor` sitemap `lastmod` understates actual last content change.** The sitemap emits `lastmod=2026-08-03T00:00:00.000Z` for `/request-a-tutor`, sourced from a hardcoded `REQUEST_A_TUTOR_LAST_UPDATED = "2026-08-03"` constant in `app/request-a-tutor/page.tsx`. However, `git log` shows the page's actual rendered content was substantively changed by commit `1704b4c` ("fixed the tutor and request page", 2026-08-13), which edited `components/request/request-page-body.tsx` and added a new `components/request/request-mobile-illustration.tsx` — i.e., the visible child-component content changed 10 days after the constant was last bumped, and nothing in that commit touched `page.tsx` to update the constant. Independent confirmation: `render_page.py`'s `htmldate`-derived `publication_date` for the live page reads **2026-08-14**, IE much more recent than the declared `lastmod`. This is a real (if narrow) freshness-signal gap on exactly the page the requester called out as recently fixed — the sitemap is telling Google the page hasn't changed since Aug 3, when it materially has. Recommend bumping `REQUEST_A_TUTOR_LAST_UPDATED` as part of the same commit whenever `request-page-body.tsx`/`request-mobile-illustration.tsx` change, or better, deriving it automatically (e.g. from git/build metadata) rather than a manually-maintained string.
- **Related, lower-severity observation — dynamic detail-page `lastmod` values track DB `updatedAt`, not template/code deploys.** `/courses/[slug]`, `/find-a-tutor/[slug]`, and `/subjects/[slug]` lastmod dates come from `c.updatedAt`/`t.updatedAt`/`s.updatedAt` (database rows), per `app/sitemap.ts`. The "expanded content" work the requester described (commits `26b2446`, `008c3a9`, `90ebf85`, `8cbf440` — 2026-08-11 through 2026-08-14, adding highlight/expandable-prose sections to subject, course, and tutor detail templates) is a **template-level** change that applies to all rows uniformly; it does not, by itself, touch each row's `updatedAt` in the database. So a course/subject/tutor page whose underlying data hasn't changed recently will still render the new expanded-content template but report an older `lastmod` (e.g. `hindi-language-course-459bc4ba` shows `2026-08-06`, predating the `26b2446`/`90ebf85` template commits that added the expandable-prose section it now contains). This is not incorrect on its face (lastmod semantics are "content changed," and Google is known to largely distrust/ignore self-reported lastmod anyway), so it is **not scored as a defect**, but it is the concrete answer to the requester's "may be stale" worry: the count/coverage is not stale (191/191 correct, no orphans), but the *lastmod dates* on already-existing detail pages don't reflect the template-level content expansion, only per-row data edits. Low-priority recommendation: if freshness-signal accuracy matters for these pages, consider a shared "template version" constant (similar to the `*_LAST_UPDATED` pattern already used for static pages) that's OR'd with each row's `updatedAt` when computing sitemap lastmod.

## 3. Security — PASS

Headers verified live and unchanged, spot-checked again on `/find-a-tutor/sudipto-ffbf5742` and `/request-a-tutor` to confirm no regression on newer routes:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` ✓
- `X-Frame-Options: DENY` ✓
- `X-Content-Type-Options: nosniff` ✓
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` ✓
- `Referrer-Policy: strict-origin-when-cross-origin` ✓
- `Content-Security-Policy` present sitewide, identical to 08-10 baseline (`unsafe-inline` on script-src/style-src remains a known, already-decided trade-off — not re-litigated).
- HTTPS enforced: `http://`/non-www → 308 → `https://www.` (verified live, unchanged).

## 4. URL Structure — PASS

- Non-www → www: `https://tutora.it.com/` → 308 → `https://www.tutora.it.com/` ✓ (unchanged)
- Trailing slash normalized: `/about/` → 308 → `/about` ✓ (unchanged)
- Clean, human-readable slugs sitewide, including on the newer/changed routes.
- 404 handling correct (`/this-page-does-not-exist-xyz` → 404).
- No redirect chains detected on any sampled URL.

## 5. Mobile-Friendliness — PASS (minor gaps, unchanged)

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present and correct on all 9 sampled pages, no pinch-zoom blocking.
- **LOW (unchanged) — No `theme-color`, `<link rel="manifest">`, or `apple-touch-icon`** found in live `<head>`. Cosmetic/PWA-polish gap, not a ranking blocker.

## 6. Core Web Vitals (lab/source-inspection cross-check) — PASS, watch payload growth

- No `autoAlpha:0`/hero-hiding pattern reintroduced; hero content still present as server-rendered text.
- CLS risk profile unchanged: SVG-based iconography, no unmanaged raster `<img>` CLS vector found on sampled pages.
- **Payload has grown further on hub pages as a direct, expected result of the content expansion work**, worth flagging for INP/LCP monitoring: `/courses` hub raw HTML is now **361,254 bytes** (vs 344,860 at 08-10, +4.7%), `/find-a-tutor` hub is now **318,873 bytes** (vs 320,144, roughly flat), and homepage is now **466,693 bytes** (up substantially from 244,094 at 08-10 — the largest single delta, consistent with the GEO/content-expansion work landing on the homepage template too). Script-tag count per page dropped to 1 external `<script src>`-style tag in this pass's samples (Next.js bundling/streaming may present differently than the 08-10 count of 16-17; treat the byte-size trend as the more reliable signal here since script-tag counting methodology differs slightly between the two passes). **Recommend a dedicated CrUX/PSI lab pass** on `/`, `/courses`, and `/find-a-tutor` to get real LCP/INP numbers now that the homepage payload has nearly doubled — this is the single biggest structural change since the baseline and warrants direct measurement rather than source-inspection inference.
- Font loading pattern (preloaded variable fonts) unchanged from baseline.

## 7. Structured Data — PASS

- HowTo schema confirmed absent sitewide (verified independently on all 9 samples this round, zero occurrences) — remediation still holds.
- All JSON-LD blocks on all 9 sampled pages parse as valid JSON (regex-extracted and `json.loads`-validated independently of the skill's built-in validator): tutor (4 blocks: Organization, WebSite, Person, BreadcrumbList), subject detail (5: Organization, WebSite, Course, BreadcrumbList, FAQPage), course detail (5: same shape as subject), `/subjects` hub (4: Organization, WebSite, BreadcrumbList, CollectionPage), `/courses` hub (5, adds FAQPage), `/find-a-tutor` hub (5, adds FAQPage), home (7: Organization, WebSite, WebPage, FAQPage, ItemList, Service, BreadcrumbList), `/about` (4, includes BreadcrumbList as previously confirmed), **`/request-a-tutor` (5: Organization, WebSite, BreadcrumbList, WebPage, FAQPage — all valid)**.
- Subject and course detail pages now both carry `Course` + `FAQPage` schema (new since 08-10 baseline sampling, consistent with the expanded-content work); no malformed or duplicate-type blocks found.

## 8. JavaScript Rendering — PASS

- `is_spa: false` and `mode_used: "raw"` on all 9 sampled pages including the newly-expanded tutor/subject/course detail templates and `/request-a-tutor` — confirms the expanded content sections (highlights, expandable prose, illustrations) are server-rendered and present in the first-response HTML, not client-injected. This directly answers the requester's "JS rendering completeness for the expanded content sections" concern: the expansion is crawlable without JS execution.
- No console errors or SPA-shell fallback triggers observed on any sampled page.

## 9. IndexNow Protocol — NOT IMPLEMENTED (unchanged)

- `curl https://www.tutora.it.com/indexnow-key.txt` → 404, still. No change since 08-10. Recommendation stands: implement IndexNow to accelerate re-indexing given the volume of recent tutor/subject/course content changes.

---

## Priority Summary

| Priority | Issue | Page(s) | Status |
|---|---|---|---|
| Medium | `REQUEST_A_TUTOR_LAST_UPDATED` constant (drives sitemap lastmod) is 10+ days stale relative to actual last content edit (commit `1704b4c`, 2026-08-13) | `/request-a-tutor` | **NEW** |
| Medium | IndexNow protocol not implemented | sitewide | Unchanged from 08-10 |
| Low | Homepage/hub payload growth (home +91%, courses hub +4.7% bytes) warrants a dedicated CrUX/PSI lab LCP/INP pass | `/`, `/courses`, `/find-a-tutor` | Escalated context, same underlying note as 08-10 |
| Low | `/courses` hub title still long (81 chars) | `/courses` | Unchanged from 08-10 |
| Low | No theme-color/manifest/apple-touch-icon | sitewide | Unchanged from 08-10 |
| Low | Case-sensitive routing 404s on capitalized paths (cosmetic) | e.g. `/About` | Unchanged from 08-10 |
| — | Sitemap `lastmod` on dynamic detail pages reflects DB row `updatedAt`, not template-level content-expansion commits — not a defect, documented for awareness | `/courses/[slug]`, `/find-a-tutor/[slug]`, `/subjects/[slug]` | Informational |

## Confirmed Fixes Since 08-10 Baseline — Verified Independently Live

- **`/subjects` duplicated "— TutorA" title suffix: FIXED.** Confirmed single, correct 67-char title.
- **Tutor bio meta description unbounded (548 chars): FIXED.** Confirmed bounded to 154 chars on the sampled profile.
- **`/request-a-tutor` page confirmed live, indexable, canonical-correct, valid structured data (5 blocks incl. FAQPage), server-rendered.** No noindex, no canonical drift.
- **`llms.txt` added: CONFIRMED NEW.** Live, valid, well-structured GEO/AI-crawler discovery file — genuine improvement not present at 08-10.
- **Sitemap coverage: CONFIRMED accurate at 191/191, no orphans, no 404s** in a 15-URL random sample plus all 9 directly-fetched sample pages.
- **Expanded content on tutor/subject/course detail pages: CONFIRMED server-rendered** (not CSR-only), crawlable without JS execution.
- CSP `unsafe-inline`, security headers, HTTPS/www redirects, clean URL structure: all unchanged/still passing, re-verified live.

## Score Rationale (93/100, +3 vs. 90/100 baseline)

**Gains:** both defects that pulled the 08-10 score down from a clean pass (1 High + counted toward 1 of the 3 Medium) are now fixed — `/subjects` title bug and tutor meta-description bug. New `llms.txt` is a genuine incremental GEO win not present at baseline. Sitemap coverage and JS-rendering completeness for the new/expanded content are both independently confirmed clean, directly resolving the requester's stated worry.

**Offsets:** one new, narrow Medium (stale `request-a-tutor` lastmod constant) was found specifically on the page the requester said was "fixed" — the code fix is real and verified, but the freshness signal to search engines about that fix is itself out of date, which is a small process gap worth closing. IndexNow remains unimplemented (unchanged Medium carried over). The homepage's near-doubling in raw HTML/JS payload size is a new signal worth a dedicated CWV lab measurement before calling Core Web Vitals fully clean — kept as a Low/watch item pending real LCP/INP numbers rather than downgraded to Medium, since source inspection alone can't confirm a regression, only flag the risk.

Net: two fixed defects, one small new defect, one new win, one escalated-but-unconfirmed risk → +3 points to 93/100.
