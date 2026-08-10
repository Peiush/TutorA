# TutorConnect (tutora.it.com) — Post-Fix Re-Audit

**Audit date:** 2026-08-10 (evening pass, after the day's remediation work)
**Trajectory:** Original audit ~51/100 (2026-08-04) → Pre-fix re-audit ~66/100 (2026-08-10 morning) → **This audit: 73/100**
**Data integrity note:** The first pass of this audit's subagents accidentally read stale cached files left over from the 2026-08-04 audit run. That was caught, the stale artifacts were archived to `archive-2026-08-04/`, and every specialist category below was re-run against the live site with explicit live-fetch-only instructions. All 11 findings files are independently verified fresh (live sitemap = 191 URLs confirmed byte-for-byte across every agent, HowTo schema confirmed absent via live sweep of all 191 URLs, etc.).

---

## SEO Health Score: 73 / 100

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 90/100 | 22% | 19.8 |
| Content Quality | 66/100 | 23% | 15.2 |
| On-Page SEO | 78/100 | 20% | 15.6 |
| Schema / Structured Data | 88/100 | 10% | 8.8 |
| Performance (CWV, lab-based) | 67/100 | 10% | 6.7 |
| AI Search Readiness (GEO) | 62/100 | 10% | 6.2 |
| Images | 15/100 | 5% | 0.75 |
| **Total** | | | **73.0** |

Supplementary (not part of weighted score): SXO Gap Score 69/100 · Backlinks: insufficient data (Tier 0, no Moz/Bing key) · Drift: 0 unexpected regressions across 7 baseline pages.

---

## What's Genuinely Fixed (independently re-verified live, not just trusted from the remediation writeup)

- **HowTo schema removed sitewide** — swept all 191 live URLs for the literal string, zero matches.
- **`/about` BreadcrumbList** — present, valid, correct 2-level hierarchy.
- **Founder Person entity** in sitewide Organization JSON-LD — correctly nested, present on every page type.
- **Homepage "0" stat flash** — real values now baked into SSR HTML.
- **Tutor bio duplication / "based in India" duplication** — confirmed fixed on sampled profiles.
- **Python page-type mismatch & tutor-availability contradiction** — both confirmed resolved on live pages.
- **`/find-a-tutor` tutor-matching generalization** — confirmed working beyond test-prep (Physics/Chem/Bio/Math/IELTS/French all surfaced correctly).
- **`/subjects` hub (new page)** — live, in sitemap, server-rendered, valid CollectionPage/BreadcrumbList schema.
- **Layout-thrashing (TBT) fix** — dramatically effective: Total Blocking Time fell 85-90% across every page tested (home: 6,340ms→650ms; find-a-tutor: 4,890ms→1,370ms).
- **Founder-story section on `/about`** — renders cleanly on mobile and desktop, no overlap.
- **27,000px mobile whitespace claim** — not reproducible; confirmed stale/incorrect.
- **`autoAlpha:0` hero-hiding pattern** — confirmed absent from source; hero text is now plain server-rendered text.

## Where "Fixed" Turned Out to Be Partial or Introduced New Issues

1. **[Critical] LCP got *worse* on 2 of 5 pages, despite the autoAlpha fix landing correctly.** Home LCP: 6.3s (was 4.04s baseline). Find-a-tutor LCP: 5.5s (was 3.0s). The reflow/TBT bottleneck this fix targeted is genuinely gone — but a *different* bottleneck (JS bootup cost of two heavy chunks, `2gs_85oo1bxmi.js` / `2m2rsoe8edtzl.js`, ~2.2s scripting cost) is now the dominant blocker of first paint. This is the single highest-priority open item.
2. **FAQ heading fix is inconsistent, not sitewide.** `/about`, `/courses/[slug]`, `/subjects/[slug]`, and home all correctly use `<h3>`. `/courses` hub still uses a plain `<span>` (never fixed). `/find-a-tutor` has a **new bug**: invalid nested `<h3><button><h3>...</h3></button></h3>` markup — likely a copy/paste of the working component with an extra wrapper left in.
3. **New `/subjects` hub page shipped with a duplicated title tag**: `"...— TutorA — TutorA"` (80 chars) — wasn't covered by the earlier remediation pass since it postdates it.
4. **`/subjects/[slug]` BreadcrumbList has a hierarchy bug**: labels its parent "Courses" → `/courses` instead of "Subjects" → `/subjects`, across all 103 subject pages.
5. **`/find-a-tutor` DOM size grew**, not shrank: 5,456 elements (was 4,544) — still ~3.6x the 1,500-element guideline, unaddressed.
6. **New minor visual defect**: slight horizontal overflow on mobile (4 of 5 pages) from decorative blur/glow background blobs missing `overflow-x: hidden` clipping.

## Structural / Pre-Existing Gaps (not part of today's fix list, but material to the score)

- **Images: 0 real images sitewide.** No `<img>`/`<picture>`/`next/image` anywhere — tutor avatars are CSS initials, not photos. This caps Multi-Modal Content at 25/100 in the GEO audit and is the single largest driver of the low Images category score. Per your own prior notes, this is intentionally scoped as a human task (real photos, not generated).
- **Content depth below floor on programmatic templates**: course pages ~490 words (vs. 800 target), subject pages ~160 words (vs. 500-600), tutor profiles ~140 words (vs. 300+). Combined with a near-identical templated sentence repeated across ~240+ course/subject pages, this is the main drag on Content Quality (66/100) and Authoritativeness (40/100 in E-E-A-T).
- **Zero external authority signals**: no third-party reviews/ratings, no LinkedIn/YouTube/Reddit presence, no `sameAs` on the new founder entity. This is the largest single lever for the AI Search Readiness score (62/100) — GEO audit flags it as the #1 highest-impact fix.
- **CrUX field data unavailable** — the site is below Chrome's minimum real-user-traffic threshold (GA4 shows ~10 organic sessions/28 days), so all CWV numbers in this audit are lab-based (Lighthouse), not real-user field data. Re-check once traffic grows.
- **Sitemap scale**: `/subjects/[slug]` (103) and `/courses/[slug]` (53) both exceed the 50-page hard-stop quality gate for programmatic content — structurally flagged, ties directly to the content-depth gap above.

## Action Plan (priority order)

**Critical / this week:**
1. Investigate `2gs_85oo1bxmi.js` (home) / `2m2rsoe8edtzl.js` (courses, find-a-tutor) — code-split or defer to stop blocking LCP paint of already-available hero text.
2. Fix invalid nested `<h3><button><h3>` markup on `/find-a-tutor` FAQ accordion.

**High / next 1-2 weeks:**
3. Fix duplicated title-tag suffix on `/subjects` hub.
4. Fix `/subjects/[slug]` BreadcrumbList hierarchy (103 pages, one template change).
5. Virtualize/paginate `/find-a-tutor` tutor cards to reduce DOM size (5,456 elements).
6. Truncate tutor profile meta descriptions (currently unbounded, 548 chars on sample — affects all ~25 profiles).

**Medium / this month:**
7. Bring `/courses` hub FAQ up to the same `<h3>` standard as other templates.
8. Add `overflow-x: hidden` to decorative blob containers (mobile horizontal-scroll fix, 4 pages).
9. Implement IndexNow (key file + ping on publish) — zero-cost, accelerates Bing/Yandex re-indexing.
10. Add `sameAs` + one verifiable external profile (LinkedIn) to the founder Person entity.

**Ongoing / larger effort:**
11. Add real tutor photos (human task, already scoped per your prior notes) — single biggest lever on both Images and Multi-Modal GEO scores.
12. Add 300-400 words of non-templated, differentiated content to course/subject page templates.
13. Build external brand presence (LinkedIn company page, one YouTube explainer, Reddit/community mentions) — GEO audit's #1 highest-impact recommendation.
14. Send the already-drafted outreach materials (`phase4-backlinks/outreach-materials.md`) — backlinks remain unscored (insufficient data) until this happens.

## Not Flagged (per your explicit instruction)

Login modal auto-opening on Courses / Find a Tutor / Request a Tutor / About Us — confirmed intentional lead-gen UX across all 11 specialist audits, excluded from every score.

---

*Full per-category detail in `findings/*.md`. Screenshots at `findings/screenshots-2026-08-10/`.*
