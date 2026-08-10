# Re-Audit — tutora.it.com (post Phase 1–4)

**Site:** https://www.tutora.it.com/
**Baseline:** `FULL-AUDIT-REPORT.md`, Overall SEO Health Score 51/100
**This audit:** 2026-08-10, after Phase 1 (critical fixes), Phase 2 (schema/metadata), Phase 3 (content rewrite + 103-page `/subjects` system), and Phase 4 (backlinks/international SEO/internal linking/117-page content rollout + same-day content-quality remediation)
**Method:** 11 specialist passes (technical, content, schema, sitemap, performance, visual, GEO, SXO, GSC/GA4, backlinks, drift), same methodology as the baseline, run fresh — no findings carried forward without re-verification.

---

## Overall SEO Health Score: ~66 / 100 — up from 51/100

| Category | Before | After | Weight | Weighted Δ |
|---|---|---|---|---|
| Technical SEO | 84 | **89** | 22% | +1.1 |
| Content Quality | 33 | **58** | 23% | +5.75 |
| On-Page SEO (synthesized) | 42 | **~65** | 20% | +4.6 |
| Schema / Structured Data | 80 | **74** ⚠️ | 10% | −0.6 |
| Performance (CWV) | 30 | **67** | 10% | +3.7 |
| AI Search Readiness (GEO) | 54 | **58** | 10% | +0.4 |
| Images | 10 | 10 (unchanged) | 5% | 0 |
| **Total** | **51** | **~66** | 100% | **+15** |

**Supplementary (not weighted):**
| | Before | After |
|---|---|---|
| Visual/UX | 82 | **65** ⚠️ (regression) |
| SXO Gap Score | 33 | **50** |
| Backlinks | Insufficient data | Insufficient data (confirmed via 2 independent sources now) |

Real, substantial progress — but not a clean sweep. Two categories that scored well at baseline (Schema, Visual/UX) got worse, and the highest-leverage remaining category (Content) is still the weakest despite the biggest single gain.

---

## What's genuinely fixed (verified, not assumed)

- Homepage trust stats render server-side (no more literal "0" for non-JS crawlers) — confirmed in raw HTML
- Python course splice bug ("...python Programming for Beginners") — gone
- `/admin`, `/dashboard` footer links now `rel="nofollow"`
- Deprecated `HowTo` removed from homepage (**but see below — reintroduced elsewhere**)
- `Organization.logo`, `Course.hasCourseInstance` added
- `/courses` `ItemList` no longer mislabels category filters as `Course` entities
- Sitemap grew 71 → 191 URLs with real per-record `lastmod` (mostly — see Sitemap section)
- `/become-a-tutor` gap closed — not literally, but `/teach` now serves as a full public, indexable recruiting page
- IndexNow fully wired and actively submitting
- Layout-thrashing root cause fixed — TBT down 85–90% sitewide, homepage TTI 19.6s → 6.7s
- `llms.txt` live and well-structured
- `areaServed` (US/UK/Canada/Singapore/UAE) added to Organization/Service schema — genuine new entity signal
- "SAT tutor online" page-type mismatch: CRITICAL → MEDIUM (real fix — tutor bios, guarantee link, pricing now present)
- Internal linking: `/subjects` index page live, previously-orphaned pages now reachable, test-prep pillar/spoke links added
- The metaTitleOverride → H1/JSON-LD leak (found via Bing Webmaster Tools today) — fixed and verified clean across every specialist's sample
- The reintroduced templated-sentence duplication (found while fixing the above) — de-duplicated, verified zero exact-string matches remain for the original boilerplate

## What's still open from the original audit

- CSP still allows `'unsafe-inline'`
- `BreadcrumbList` still missing on `/about`
- `/about` still has no named founders/team/history — same Finding #5 as baseline
- Tutor bio pages still auto-append a redundant restated-facts closing sentence (`tutorIntroParagraph()`) — the *code-level* root cause of original Finding #2 was never actually touched, just diluted by longer bios
- Zero real images sitewide — confirmed still true, still a pending human task (real photos), not a defect
- FAQ questions still not semantic `<h2>`/`<h3>` elements despite valid schema

## New issues, not present at baseline

| Severity | Finding | Category |
|---|---|---|
| Critical | Unprompted login modal auto-opens on homepage/`/subjects` a few seconds after load, blocking CTAs — likely unrelated to Phases 1–4, possibly from concurrent work | Visual/UX |
| High | Deprecated `HowTo` block reintroduced on `/find-a-tutor` | Schema |
| High | All 103 `/subjects/*` pages (54% of the sitemap) have zero `og:image` — the pattern used for courses/tutors was never extended | Technical/On-Page |
| High | "python tutor" page-type mismatch unresolved (`/courses/python-ff654450` still has zero tutor cards) — worse, `/subjects/python` and `/courses/python-ff654450` now both target the same query with no consolidation, a new cannibalization risk | SXO |
| High | Massive collapsed whitespace before the footer on homepage/`/courses` (mobile page height balloons to ~27,000px) | Visual/UX |
| High | The "0" no-SSR-fallback bug is only fixed on the homepage hero stat — the same defect persists on 5+ other homepage widgets (course-count + category cards) | GEO/Content |
| Medium | FAQ "based in India?" answers draw from only ~10 total variants reused across 97 pages, embedded directly in `FAQPage` JSON-LD — the de-dup fix reduced but didn't eliminate structured-data-level duplication | Content |
| Medium | On subject pages with zero currently-assigned tutors, new "India-based tutor" copy directly contradicts the existing "we don't have a tutor actively teaching this yet" fallback on the same page | GEO/Content |
| Medium | LCP got *worse* on homepage (4.04s → 6.3s) and `/find-a-tutor` (3.0s → 5.5s) — a different heavy JS chunk now blocks paint since layout-thrashing no longer dominates | Performance |
| Medium | Tutor detail pages (`/find-a-tutor/*`, 25 URLs) still show generation-order-clustered `lastmod` timestamps (18-second window) — same original pattern, now isolated to this section | Sitemap |
| Low | `/find-a-tutor` renders all 132 listings unpaginated — mobile scroll height ~108,000px | Visual/UX |
| Low | Minor copy bug: "A-Level Mathsyet" (missing space) on a subject's no-tutor-available fallback | Visual/UX |
| Low | `/find-a-tutor` DOM size grew further (5,456 elements, was already 4,544/~3x guideline) | Technical/Performance |

## Confirmed non-issues (checked and ruled out)

- Fabricated `AggregateRating` from seed data — schema audit flagged this as a real risk; verified directly against live production (3 sampled course pages): no `AggregateRating` block renders anywhere. Seed data isn't what's live.
- Drift comparison across the 7 baselined URLs: zero genuine regressions, every change explained by known shipped work.

## Still-pending, not new (known human/action tasks)

- GSC sitemap resubmission — never executed, still stale (last processed 2026-07-27, 86/191 URLs on file)
- Backlink outreach — templates ready in `phase4-backlinks/outreach-materials.md`, none sent yet (two independent sources, Common Crawl + Bing, now confirm zero backlinks — expected, not a tooling gap)
- Real tutor headshots — still a pending human task

---

*Full specialist findings referenced in-line above; screenshots at `docs/seo-audit-tutora/phase4-visual/screenshots/`, performance data at `docs/seo-audit-tutora/findings/performance.md`.*
