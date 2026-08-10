# SXO (Search Experience Optimization) Findings — tutora.it.com

**SXO Gap Score: 33 / 100** (separate from, and not to be confused with, the SEO Health Score)

Scope: 3 representative keywords analyzed against TutorA's corresponding pages —
"SAT tutor online" → `/courses/sat-c5d2749b`, "python tutor" → `/courses/python-ff654450`,
"find a tutor" → `/find-a-tutor`. All target pages fetched via
`render_page.py --mode auto` (raw mode; SSR HTML, no client-side JS required)
and parsed via `parse_html.py`.

---

## Headline Finding: Page-Type Mismatch on the /courses/* Template

TutorA's 44 `/courses/<subject>-<hash>` pages are built as thin **Product/Course
pages** (schema.org `Course` + `Offer`, ~190–210 words, single generic "Send
Request" button). For commercial, high-intent subject-tutor queries, Google's
top results are dominated by **Service/Hybrid pages** (test prep) and
**Marketplace listing pages** (subject tutoring) — both far richer in trust
signals than TutorA's template. `/find-a-tutor` is the one page on the site
whose *type* already matches SERP expectations, but it under-delivers on the
proof points (reviews, photos, aggregate stats) that competitors lead with.

---

## SERP Consensus by Keyword

### 1. "SAT tutor online" — target: `/courses/sat-c5d2749b`

| Result | Page Type | Key signals |
|---|---|---|
| kaptest.com/sat/courses/sat-tutoring | Service/Hybrid | 99th-percentile tutor credentials, structured plans |
| prepscholar.com/sat-tutoring | Service/Hybrid | 4 pricing tiers ($995–$4,795), "160+ point increase" guarantee, 8 tutor bios w/ photos + SAT scores + university, 6 testimonials, competitor comparison table (vs. Princeton Review, Kaplan, Wyzant), FAQ, phone CTA |
| testprepinsight.com/best/best-sat-tutoring | Comparison/Listicle | "Best SAT Tutors Online (2026 Rankings)" |
| ajtutoring.com/.../private-sat-test-prep | Service Page | online + in-person options, process description |
| indeed.com (SAT tutor jobs) | Noise (job listing, not commercial-intent competitor) | — |

**Dominant type:** Service/Hybrid (~60%) + Comparison (~20%). **Confidence: ~70-80%** this cluster, not Product/Course pages, is what Google rewards here.

**TutorA page reality:** `/courses/sat-c5d2749b` — H1 "SAT Prep Course", 191
words, `Course`+`Offer` schema ($35/hr), bullet list "What you'll learn", a
"4.8 (0)" rating badge (4.8 stars with **zero** backing reviews), zero images,
no tutor name/photo/credentials, no guarantee, no testimonials, no FAQ, single
generic "Send Request" `<button type="button">` (client-side, no href).

**Mismatch severity: CRITICAL** — matches taxonomy pattern "Single Product
Page when user wants comparison" (HIGH) stacked with "Product Page for
custom/consultative services" (MEDIUM) and missing every Service-Page required
element (methodology, case studies/testimonials, credentialed team, contact
mechanism beyond a bare button).

### 2. "python tutor" — target: `/courses/python-ff654450`

| Result | Page Type | Key signals |
|---|---|---|
| preply.com/en/online/python-tutors | Marketplace listing | search/filter bar (price, availability, specialties), ~10-12 tutor cards visible of 31 pages, each with photo, name+flag, star rating + review count (1–121 reviews), price/50-min lesson, active students/lessons taught, bio snippet, "Book trial lesson" + "Send message" |
| superprof.com/lessons/python/online | Marketplace listing | "33,036 Python tutors" |
| preply.com (page 18) | Marketplace listing | pagination confirms deep tutor inventory |
| tutorocean.com/topics/software-development/python | Marketplace/Hybrid | live video + whiteboard platform |
| pythontutor.com, learnpython.org | Tool/Interactive & informational (lower commercial intent, but present for the bare query) | free interactive tool |

**Dominant type:** Marketplace listing (~60%), with a secondary Tool/Interactive cluster for the non-commercial reading of the query. **Confidence: ~60%** marketplace-card format is rewarded for buyer-intent variants.

**TutorA page reality:** `/courses/python-ff654450` — 204 words, same
Course/Product template as SAT, $45/hr abstract "course" price, zero tutor
cards, zero photos, zero ratings/reviews on the page, single "Send Request"
button. The real tutor roster only exists at the generic `/find-a-tutor` URL,
which is not subject-filtered (no indexable `/find-a-tutor?subject=python` or
`/find-a-tutor/python` URL) and is not linked from the course page with
subject context carried over.

**Mismatch severity: HIGH** — right business model (marketplace), wrong page
construction: the page that could compete in this SERP format is
structurally disconnected from the URL that would rank for the keyword.

### 3. "find a tutor" — target: `/find-a-tutor`

| Result | Page Type | Key signals |
|---|---|---|
| wyzant.com | Landing Page + Marketplace hub | "65,000 expert tutors in 300+ subjects," "4 million 5-star reviews," 4.9 avg rating, 3-step "how it works," "Good Fit Guarantee," testimonials, "Sign up now" CTA |
| care.com/tutors, tutors.com | Marketplace listing / Directory | local + online filtering |
| princetonreview.com/academic-tutoring/tutor-search | Marketplace/Service hybrid | 80+ subjects |
| tutor.com | Service/Marketplace hybrid | "24/7 expert support" |
| tutors.com/articles/how-to-find-a-tutor | Blog Post | informational guide (secondary intent) |

**Dominant type:** Marketplace/Landing hybrid (~70%). **Confidence: ~70%.**

**TutorA page reality:** `/find-a-tutor` — H1 "Browse verified tutors,"
"25 verified tutors across 78 subjects," filters (Subject, Curriculum, Mode,
Budget), sort (Top rated / Lowest price / Most reviews), 25 tutor cards each
showing name, tier badge ("Bronze"), location, mode, price/hr, subjects
taught, bio, and — on every single card sampled — **"No reviews yet."** All
"photos" are CSS-rendered initials in a colored ring (`tutor-avatar-ring`),
not real images (0 `<img>` tags on the page). Only one heading below H1
(`<h3>Can't find the right tutor?</h3>`) — no H2s, no "how it works" section,
no aggregate trust stat comparable to Wyzant's headline numbers.

**Mismatch severity: ALIGNED (page type) / MEDIUM-HIGH (content execution)**
— the format Google rewards is present, but the trust payload competitors
lead with (real photos, visible review counts, guarantee, "how it works") is
largely absent.

---

## Page-Type Mismatch Summary

| Target URL | TutorA page type | SERP dominant type | Severity |
|---|---|---|---|
| /courses/sat-c5d2749b | Product/Course (thin) | Service/Hybrid + Comparison | **CRITICAL** |
| /courses/python-ff654450 | Product/Course (thin) | Marketplace listing | **HIGH** |
| /find-a-tutor | Marketplace listing | Marketplace/Landing hybrid | **ALIGNED** (execution gap only) |

---

## User Stories (derived from SERP signals)

1. As a **test-prep-guarantee shopper** (Awareness→Consideration), I want proof
   a tutor can actually raise my SAT score, because $995+ is a real financial
   risk, but I'm blocked by a **trust gap** — TutorA's SAT page shows a "4.8"
   rating with 0 reviews and no guarantee language.
   *(Source: PrepScholar's "160+ point increase guarantee" + 8 credentialed
   tutor bios dominating the SAT SERP.)*

2. As a **comparison-shopping parent** (Consideration), I want to see how
   TutorA stacks up against Kaplan/Princeton Review/Wyzant, because there are
   many providers and I don't want to research each one separately, but I'm
   blocked by **comparison fatigue** — no comparison content exists on the
   TutorA course page.
   *(Source: testprepinsight.com "Best SAT Tutors Online (2026 Rankings)"
   ranking in the same SERP; PrepScholar's own competitor comparison table.)*

3. As a **subject-specific tutor shopper** (Decision), I want to browse
   several python tutors' photos, ratings, and prices side by side before
   messaging one, because I want to pick the best personality/price fit, but
   I'm blocked by **information gap** — the python course page shows one
   abstract course, not a roster of tutors.
   *(Source: Preply's card grid — photo, star rating + review count, price/lesson,
   "Book trial lesson" — dominating the python-tutor SERP.)*

4. As a **first-time marketplace user** (Awareness), I want reassurance that
   this platform has real reviewed tutors and a satisfaction guarantee before
   I commit contact info, because trusting a stranger with my child's
   education is high-stakes, but I'm blocked by a **trust gap** — every
   sampled TutorA tutor card reads "No reviews yet" and there is no guarantee
   or aggregate trust statistic.
   *(Source: Wyzant's headline "4 million 5-star reviews" + "Good Fit
   Guarantee" on the exact-match "find a tutor" query.)*

---

## Persona Scores

| Persona | Journey Stage | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Score-Focused Test Prep Parent | Consideration | 10/25 | 15/25 | 3/25 | 12/25 | 40/100 | Needs Work |
| Comparison-Shopping Parent | Consideration | 8/25 | 10/25 | 5/25 | 10/25 | 33/100 | **Critical Mismatch** |
| Self-Directed Python Learner | Awareness | 12/25 | 15/25 | 8/25 | 12/25 | 47/100 | Needs Work |
| Marketplace Comparison Shopper (subject-tutor) | Decision | 8/25 | 10/25 | 4/25 | 12/25 | 34/100 | Critical Mismatch |
| General "Find a Tutor" Searcher | Awareness/Decision | 20/25 | 18/25 | 6/25 | 16/25 | 60/100 | Good |

**Weakest persona:** Comparison-Shopping Parent (33/100).
**Top issue:** No comparative or objection-handling content anywhere on the
SAT/subject course pages (no FAQ, no guarantee, no "why TutorA" framing).
**Recommended fix:** Add a short comparison/FAQ block to the SAT (and broader
test-prep) course pages addressing price, vetting process, and what happens
after "Send Request."

**Systemic issue across all 5 personas:** Trust dimension is the lowest score
in every persona (3–8/25) — driven by zero real tutor photos site-wide and a
"No reviews yet" state on every sampled tutor.

---

## Gap Analysis (7 dimensions, 100 pts, weighted ~70% course-page template / 30% marketplace hub — reflecting that 44 of ~50 indexable content pages use the thin course template)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (0-15) | 5/15 | Course template (44 pages) is CRITICAL/HIGH mismatch vs. Service/Marketplace SERP expectations; /find-a-tutor alone is aligned. |
| Content Depth (0-15) | 5/15 | Course pages ~190-210 words, 3 H2s, no FAQ/guarantee/comparison. /find-a-tutor has filters+listings but word count (5,328) is mostly repeated card boilerplate, not unique guide content. |
| UX Signals (0-15) | 7/15 | Clean breadcrumbs, low-friction single CTA, working filters/sort on /find-a-tutor; but generic non-persona CTA copy, no urgency/next-step clarity, duplicate anchor links per card. |
| Schema (0-15) | 10/15 | Course pages carry solid Course + Offer + BreadcrumbList + Organization + WebSite JSON-LD (good technical foundation); /find-a-tutor has only Organization/WebSite — missing ItemList/Person schema for the tutor roster. |
| Media (0-15) | 1/15 | Zero `<img>` tags found on all 3 pages audited. All tutor "photos" are CSS-generated initial avatars. |
| Authority (0-15) | 2/15 | No tutor credentials, no case studies/press, no reviews backing the displayed "4.8" rating on course pages, "No reviews yet" on every sampled tutor card. |
| Freshness (0-10) | 3/10 | No dateModified/review-freshness signals; course page publication_date reads as a static site-launch date, not genuine content freshness. |
| **Total** | **33/100** | |

---

## What Works

- **Solid technical schema foundation on course pages** — `Course`, `Offer`,
  `BreadcrumbList`, `Organization`, and `WebSite` JSON-LD are all present and
  valid on `/courses/*`, giving a clean base to layer richer trust content on
  top of without a schema rebuild.
- **`/find-a-tutor` already has the right page shape** for its keyword cluster
  — filterable marketplace grid (Subject, Curriculum, Mode, Budget) with
  sort options (Top rated / Lowest price / Most reviews) matches what Google
  rewards for "find a tutor"-style queries. This page needs a content/trust
  upgrade, not a rebuild.
  - **Verified/background-check trust badges + private-contact messaging**
  ("Every tutor background-checked," "Contact details never shared," "A real
  person makes the intro") is a genuine differentiator vs. open marketplaces
  like Preply/Superprof — currently under-promoted, but a real asset once
  surfaced more prominently (e.g., in a "how it works" section).
- **Clear, consistent breadcrumb navigation** (Home > Courses > [Course]) aids
  both UX and matches the BreadcrumbList schema already implemented.
- **Low-friction, consistent global CTA pattern** ("Send Request") avoids the
  multi-step lead-gen forms some competitors use.

---

## Findings

### Finding 1 — Course pages are Product-type templates competing against Service/Comparison-dominant SERPs
- **Severity:** CRITICAL
- **Description:** For "SAT tutor online," ~70-80% of top organic results are Service/Hybrid pages (PrepScholar: 4 pricing tiers, a "160+ point increase" guarantee, 8 photo+credential tutor bios, 6 testimonials, a competitor comparison table, FAQ) or a Comparison/Listicle ("Best SAT Tutors Online 2026 Rankings"). TutorA's `/courses/sat-c5d2749b` is a 191-word Course/Product page with no tutor identity, no guarantee, no testimonials, no FAQ, and a "4.8 (0)" rating badge showing a star rating with zero backing reviews.
- **Recommendation:** Rebuild the test-prep cluster (SAT, ACT, GMAT, GRE, IELTS, TOEFL, PTE) as Service/Hybrid pages: name a specific instructor with credentials/photo, add a satisfaction or score-improvement guarantee, 2-3 testimonials, and an FAQ covering price, vetting, and what happens after "Send Request."

### Finding 2 — Subject course pages don't surface the tutor-marketplace format Google rewards for "[subject] tutor" queries
- **Severity:** HIGH
- **Description:** For "python tutor," top results (Preply, Superprof, TutorOcean) are marketplace grids of individual tutor cards (real photo, star rating + review count, price/lesson, "Book trial lesson"). TutorA's `/courses/python-ff654450` shows one abstract $45/hr course with a single generic CTA — no browsable roster of actual python tutors, ratings, or reviews. The real tutor roster only exists at the un-filtered `/find-a-tutor` URL with no indexable subject-filtered variant (no `/find-a-tutor?subject=python` or `/find-a-tutor/python`).
- **Recommendation:** Embed a "Python tutors available" card grid (photo, rating, price, bio snippet) directly on each `/courses/<subject>` page, and/or create crawlable subject-filtered marketplace URLs with canonical tags and `ItemList`/`Person` schema so the URL itself can compete in the marketplace-format SERP.

### Finding 3 — Zero real tutor photography site-wide
- **Severity:** HIGH
- **Description:** All three audited pages (`/courses/sat-c5d2749b`, `/courses/python-ff654450`, `/find-a-tutor`) contain 0 `<img>` tags. Tutor "avatars" on `/find-a-tutor` are CSS-rendered initials in a colored ring, not real photographs, while Preply and Wyzant lead every tutor card with a real photo as the primary trust/scan signal.
- **Recommendation:** Require and display real, verified tutor profile photos (TutorA already has a verified-badge SVG overlay to attach to it) on both `/find-a-tutor` cards and embedded course-page tutor grids.

### Finding 4 — Fabricated-looking rating badge on course pages ("4.8" with 0 reviews) while every tutor shows "No reviews yet"
- **Severity:** HIGH
- **Description:** `/courses/sat-c5d2749b` and `/courses/python-ff654450` both display a "4.8 (0)" badge above the fold. Meanwhile, every tutor sampled on `/find-a-tutor` displays "No reviews yet." The rating badge is not backed by `aggregateRating`/`Review` JSON-LD (not present in the parsed schema), so it currently only exists as visible UI copy — but it reads as inflated/fabricated trust signaling to a skeptical visitor comparing it against the actual zero-review state.
- **Recommendation:** Remove the star-rating badge from course pages until real reviews exist, or replace it with the existing "background-checked" / "New provider" badge language already used on `/find-a-tutor`.

### Finding 5 — `/find-a-tutor` matches the right page type but under-delivers on the trust stats competitors lead with
- **Severity:** MEDIUM
- **Description:** TutorA's `/find-a-tutor` structurally matches the Wyzant/Care.com/Tutor.com marketplace-hub format (filters, sort, listing cards, "background-checked" badges) that dominates the "find a tutor" SERP. But competitors headline aggregate trust numbers ("65,000 tutors," "4 million 5-star reviews," 4.9 avg rating, "Good Fit Guarantee") that TutorA's page lacks. TutorA states "25 verified tutors across 78 subjects" but shows no review count, no guarantee, and no "how it works" explainer — the page has only one H3 heading below H1, no H2s at all.
- **Recommendation:** Add an aggregate trust stat bar above the tutor grid (total tutors, subjects, response time) and a 3-step "How matching works" section with proper H2 headings; add a first-lesson satisfaction guarantee mirroring competitors' guarantee language.

### Finding 6 — Duplicate/triplicate identical anchor links per tutor card inflate boilerplate and dilute unique content ratio
- **Severity:** MEDIUM
- **Description:** `parse_html.py` link extraction shows each tutor's profile link (e.g., `/find-a-tutor/sudipto-ffbf5742`) repeated 3 identical times per card (once per subject taught, all pointing to the same profile URL with the same anchor text). With 25 tutors × 78 subject listings producing 107 near-duplicate card blocks, the page's 5,328-word count is mostly repetitive boilerplate rather than unique content, and internal linking is redundant.
- **Recommendation:** Consolidate multi-subject tutors into a single card listing all taught subjects as tags, rather than rendering one full card per subject-tutor pairing.

### Finding 7 — No FAQ or objection-handling content on course pages
- **Severity:** MEDIUM
- **Description:** Competing test-prep pages (PrepScholar) dedicate FAQ sections to guarantee mechanics, trial terms, and scheduling — the exact "evaluative" intent (is it worth it, what if it doesn't work) that dominates commercial test-prep and tutoring searches. TutorA's course pages have only "About this course" and "What you'll learn" H2s.
- **Recommendation:** Add a 3-5 item FAQ block (pricing, vetting process, what happens after "Send Request," cancellation policy) with `FAQPage` schema to each `/courses/<subject>` page.

---

## Limitations

- Only 3 of TutorA's ~50 indexable content pages (2 of 44 `/courses/*` pages,
  1 of the 2 hub pages) were fetched and deeply analyzed; findings for the
  course-page template are treated as representative but not individually
  verified across all subjects (e.g., music/creative-arts courses were not
  separately checked for category-specific gaps).
- SERP analysis combined WebSearch result summaries with targeted `WebFetch`
  of 3 competitor pages (Preply Python, PrepScholar SAT, Wyzant homepage)
  rather than a manual review of the full top-10 for every keyword. SERP
  features (Featured Snippets, PAA boxes, AI Overview, ad density) were
  inferred from result composition, not observed directly in a live SERP.
- No rank-tracking data was available, so current TutorA ranking positions
  for these keywords could not be confirmed — this analysis assesses
  page-type/content fit against what currently ranks, not current rank.
- Individual tutor profile pages (`/find-a-tutor/<name>-<hash>`) were not
  fetched in this pass; profile-page depth (bio length, credentials, video,
  reviews) is unverified.
- Geographic/localization signals were not assessed — sampled tutors skew
  toward India-based names/locations, which may indicate a local-intent
  angle (or a "near me" mismatch for US/UK searchers) worth a dedicated
  `/seo local` pass.

---

## Cross-Skill Recommendations

- **E-E-A-T / Authority gaps** (no tutor credentials, no reviews, no case
  studies) → recommend `/seo content` for a deeper content-depth audit of the
  course-page template.
- **Missing schema** (`ItemList`/`Person` on `/find-a-tutor`, `FAQPage` on
  course pages, `AggregateRating`/`Review` once real reviews exist) →
  recommend `/seo schema` for generation.
- **Thin content** on the 44-page `/courses/*` template → recommend
  `/seo page` for a page-level audit of the template.

Generate a PDF report? Use `/seo google report`.
