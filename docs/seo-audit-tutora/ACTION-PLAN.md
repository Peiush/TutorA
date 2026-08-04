# SEO Action Plan — tutora.it.com

Prioritized by impact and effort. Phase 1 items are cheap and should ship this week regardless of what else gets scheduled — several fix multiple findings across different specialist reports at once.

---

## Phase 1: Critical Fixes (Week 1)

| # | Item | Source finding(s) | Effort |
|---|---|---|---|
| 1 | Server-render the real trust-stat numbers on homepage instead of "0" (keep count-up animation as progressive enhancement on top) | Content #4, GEO #1 | Small — one component |
| 2 | Suppress the star-rating badge on course pages when `reviewCount === 0`; show "No reviews yet" like tutor cards already do | Content #3, Schema #5, SXO #4 | Small |
| 3 | Fix the broken template splice on `/courses/python-ff654450` ("...python Programming for Beginners"); audit remaining 43 course pages for the same class of bug | Content #7 | Small |
| 4 | Add `rel="nofollow"` to (or remove) the `/admin` and `/dashboard` footer links present on every page | Technical #1 | Small |
| 5 | Remove the deprecated `HowTo` schema block from the homepage | Schema #1 | Small |
| 6 | Identify and fix the shared JS component causing forced-synchronous-layout (the two chunks behind 6.3s TBT on homepage) — likely a scroll-reveal animation reading DOM geometry synchronously; replace with `IntersectionObserver` or CSS-only reveal | Performance #1, #2, #3 | Medium — but highest leverage item in the whole audit |

---

## Phase 2: High-Impact Improvements (Weeks 2–3)

| # | Item | Source finding(s) | Effort |
|---|---|---|---|
| 7 | Add `logo` and `sameAs` to sitewide `Organization` schema | Schema #3, GEO #4 | Small |
| 8 | Add page-specific `og:image` + Twitter Card metadata to course and tutor templates (extend the existing `opengraph-image` route pattern with `[slug]` params) | Technical #2 | Medium |
| 9 | Publish a real, public `/become-a-tutor` landing page (currently zero indexable pages recruit the supply side) | Sitemap #3 | Medium |
| 10 | Fix `/courses` hub's `ItemList` schema — stop labeling category-filter links as `Course` entities | Technical #3 | Small |
| 11 | Add `hasCourseInstance` to `Course` schema using data already shown on-page (duration, mode) | Schema #4 | Small |
| 12 | Virtualize/paginate the tutor grid on `/find-a-tutor` (4,544 DOM elements, ~3x guideline) and consolidate the duplicate per-subject anchor links per tutor card | Performance #4, SXO #6 | Medium |
| 13 | Publish `llms.txt` listing homepage, `/about`, `/courses`, and top subject pages | GEO #2 | Small |
| 14 | Add `/about` team names, founder bio, company history, and a `Person` schema per named team member | Content #5, GEO #4 | Medium |
| 15 | Surface the "4 checkmarks" verification badges directly on tutor profile pages, not just the homepage | Content #6 | Small |

---

## Phase 3: Content & Authority Rebuild (Month 2 — this is what unlocks the 100+ keyword goal)

This phase is the actual answer to "how do I rank for 100+ keywords" — Phase 1/2 remove blockers, this phase is where rankings get built.

| # | Item | Source finding(s) | Effort |
|---|---|---|---|
| 16 | Rewrite all 44 course pages with genuine subject-specific depth: real syllabus/curriculum outline, example lesson structure, prerequisite guidance — target 300–400+ words of unique material per page, not a shared trust-sentence template | Content #1 | Large |
| 17 | Rebuild the test-prep cluster (SAT, ACT, GMAT, GRE, IELTS, TOEFL, PTE) specifically as Service/Hybrid pages: named instructor + credentials, a guarantee, testimonials, and FAQ — matching what actually ranks for these keywords | SXO #1 | Large |
| 18 | Embed a subject-filtered tutor-card grid (photo, rating, price, bio snippet) directly on each `/courses/<subject>` page, and/or create crawlable `/find-a-tutor?subject=X` URLs with `ItemList`/`Person` schema | SXO #2 | Large |
| 19 | Rewrite all ~26 tutor profile bios with genuine differentiation: real headshot, first-person teaching philosophy, specific credentials, sample lesson video if available — eliminate the redundant restated closing sentence | Content #2 | Large |
| 20 | Add tutor photos sitewide (with descriptive alt text and `Person.image` in schema) — addresses Images, GEO, and SXO trust findings simultaneously | Images, GEO #3, SXO #3 | Large (depends on tutor photo collection process) |
| 21 | Run `seo-cluster` against your target keyword set (see keyword-strategy note below) to formally map the 100+ keyword targets into hub-and-spoke content clusters before writing more pages | — | Medium |
| 22 | Add a 3–5 item FAQ block (pricing, vetting, what happens after "Send Request", cancellation) with `FAQPage` schema to each course page | SXO #7 | Medium |
| 23 | Begin the free/low-cost backlink acquisition plan (see below) — education directories, local school/PTA partnerships, HARO journalist requests, guest posts, Quora/Reddit expert answers | Backlinks report | Ongoing |

---

## Phase 4: Monitoring & Iteration (Ongoing)

| # | Item | Notes |
|---|---|---|
| 24 | Configure a free Moz API key (2,500 rows/month, no cost) to unlock a real numeric Backlink Health Score in future audits | Currently Tier 0 — no visibility |
| 25 | Configure Google Search Console + PageSpeed Insights API credentials to replace lab-only performance/indexation data with real field data | Currently no CrUX/GSC/GA4 access |
| 26 | Capture an SEO drift baseline now, so future deploys are checked against this audit's state (`seo-drift`) | No baseline existed at audit time |
| 27 | Re-run `seo-backlinks` in 3–6 months to check whether the domain has been picked up by Common Crawl's next release | |
| 28 | Re-run this full audit after Phase 1–2 ship to confirm the Performance and Technical scores improved as expected | |

---

## Backlink Acquisition Plan (supports Phase 3, free/low-cost)

**Priority: High**
- Submit to education/tutoring directories (Trustpilot, The Tutor Pages, First Tutors, relevant regional equivalents)
- Local school/PTA/homeschool co-op partnership pages (offer a trial-session discount for a link from their "recommended tutors" resource page — .edu/.org domains carry above-average trust)
- HARO-style journalist requests (Qwoted, Featured.com free tier, #JournoRequest) on topics like "how AI is changing tutoring" or "cost of private tutoring in 2026"

**Priority: Medium**
- Guest posts on parenting/education blogs (practical, non-promotional — avoid link-farm networks)
- Quora/Reddit expert answers in r/HomeworkHelp, r/tutoring, r/Parenting
- Subject-resource-page outreach ("homeschool resource list" style pages)

**Avoid:** purchased links, automated directory-submission spam, reciprocal-link schemes.

---

## Note on Keyword Research for the 100+ Keyword Goal

This audit didn't run keyword-volume research (no DataForSEO credentials configured, and that's a separate workflow from a site audit). Recommended next step: run `seo-cluster` with seed terms built from what's already on the site — the 44 course subjects (SAT, GMAT, Python, guitar, Spanish, etc.) crossed with intent modifiers ("online," "near me," "for beginners," "[grade level]") — to get SERP-overlap-validated topic clusters before committing to Phase 3's content rebuild. That ensures the rewritten course pages target keywords with actual search volume and achievable difficulty, not just whatever subjects the catalog happens to already have.
