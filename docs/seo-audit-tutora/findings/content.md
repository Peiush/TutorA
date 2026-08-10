# Content Quality / E-E-A-T Audit — tutora.it.com (Re-audit 2026-08-10)

**Data source:** All findings below are from LIVE fetches performed during this session (`render_page.py` via the seo skill's venv, `mode=auto`, raw HTML confirmed non-SPA / server-rendered on every page checked). Sitemap reference: `reaudit-2026-08-10-sitemap.xml` (191 URLs, confirmed live, includes the new `/subjects` hub + 103 subject pages added 2026-08-09). No files under `docs/seo-audit-tutora/archive-2026-08-04/` or other stale local artifacts were read or trusted.

Pages fetched live: `/`, `/about`, `/courses`, `/courses/ielts-8d4686db`, `/find-a-tutor`, `/find-a-tutor/preeti-parihar-879635e0`, `/subjects`, `/subjects/gcse-maths`.

## Content Quality Score: 66 / 100

## E-E-A-T Breakdown

| Factor | Weight | Score | Notes |
|---|---|---|---|
| Experience | 20% | 55/100 | Founder narrative on `/about` reads specific and grounded (see below). Tutor bios describe teaching style/focus but are third-person marketing summaries, not first-hand accounts; no student outcome stories, testimonials, or case studies anywhere sampled. |
| Expertise | 25% | 50/100 | Tutor "years of experience" and subject lists are asserted, not externally verified on-page (no certification links, no LinkedIn/credential proof). Founder bio is deliberately blank per current design choice — not penalized as thin, but it does mean zero credential signal for the one named human on the site. |
| Authoritativeness | 25% | 40/100 | No third-party citations, press mentions, external reviews, or aggregateRating schema found on any sampled page. Trust is asserted internally ("reviewed by our team") with no outside verification. |
| Trustworthiness | 30% | 85/100 | Strong: CSP/HSTS headers present, transparent fee model explained in plain language, rematch guarantee, privacy/terms linked, contact path on `/about` ("usually within one business day"), no HowTo schema misuse found anywhere sampled (confirmed removed). |
| **Weighted E-E-A-T** | | **59/100** | |

## Verification of the 6 requested fix areas (live-checked)

1. **FAQ `<h3>` semantics — PARTIALLY fixed, inconsistent across templates.**
   - `/about`, `/courses/ielts-8d4686db`, `/subjects/gcse-maths`, `/` (home) all render FAQ questions correctly as `<h3>` text inside the accordion button — good.
   - `/courses` (hub) still renders FAQ questions as a plain `<span>` with **no heading tag at all** — not fixed on this template.
   - `/find-a-tutor` has a **new bug**: FAQ markup is `<h3 class="m-0"><button>...<h3 class="m-0 ...">question text</h3>...</button></h3>` — an `<h3>` nested inside another `<h3>` (itself wrapping a `<button>`), which is invalid HTML and will be silently corrected/mangled by the browser's parser. This needs a follow-up fix; it was not caught by the original remediation.

2. **"Based in India" duplication — fixed within sampled bios.** Each tutor bio now states "based in India" / "teaches online from India" exactly once; the aggregate sentence on course/subject pages ("Most of TutorA's [X] tutors are based in India...") is a separate, non-duplicated statement. No repeated occurrence within a single bio found.

3. **Tutor bio intro no longer duplicates bio facts — confirmed fixed.** Sampled profile (`preeti-parihar`): the prose intro and the structured "Subjects taught" list below it are complementary (prose vs. pricing/grade data), not restated text.

4. **Homepage "0" flash before stats load — confirmed fixed.** The prerendered HTML now bakes real values directly into the `<dt>` elements (`1,200+`, `8,600`, `31 hrs`) rather than a client-side counter starting at 0. No flash-of-zero risk from the server-rendered markup.

5. **`/find-a-tutor` matching generalizes beyond test-prep — confirmed fixed.** Live tutor cards cover Physics, Chemistry, Biology, Math, IELTS, French, etc. (not SAT/ACT-only). Subject page `/subjects/gcse-maths` correctly surfaces a GCSE-Maths-relevant tutor (Priya Virat — ACT Math/GCSE Maths/Algebra/Geometry/Trig/Stats). Course page `/courses/ielts-8d4686db` surfaces two IELTS-relevant tutors. `/find-a-tutor` hub uses a "Load more" client pattern (12 of 25 tutors in initial HTML) rather than URL pagination — acceptable since all 25 profile URLs are individually in the sitemap.

6. **`/about` founder/history content — genuinely improved, reads as grounded, no invented claims found.** Narrative ("started TutorA because good tutoring is a relationship...", "a simple frustration with how online tutoring usually works") is specific to TutorA's actual matching mechanics (review-before-listing, no public lead list, success-fee-only pricing) rather than generic AI boilerplate about "passion for education." No fabricated founding date, headcount, funding, or press claim was found — the page notably avoids the unverifiable-stat trap. Founder bio is confirmed blank by design (not flagged as thin, per instruction). One soft recommendation: as an E-E-A-T improvement (not a defect), consider adding Nancy's professional background/credentials whenever that content is ready — currently zero expertise signal for the one named human on the site.

## Word Count vs. Minimums

| Page | Type | Words (extracted) | Minimum | Status |
|---|---|---|---|---|
| `/` | Homepage | 430 | 500 | Slightly below floor, but high-density trust/stat content |
| `/about` | Trust/company page | 470 | ~800 (service-page analog) | Below floor; content is specific, not padded |
| `/courses` | Hub | 179 | n/a (hub) | Expected for a link hub |
| `/courses/ielts-8d4686db` | Service/course page | 491 | 800 | Below floor |
| `/find-a-tutor` | Hub | 1,405 | n/a (hub) | Adequate — aggregated tutor bios |
| `/find-a-tutor/preeti-parihar-879635e0` | Profile/product-like | 142 | 300+ | Below floor — thin |
| `/subjects` | Hub (NEW, 103 pages) | 18 | n/a (hub) | Extremely thin unique copy; defer deeper programmatic-page assessment to `seo-programmatic` sub-skill |
| `/subjects/gcse-maths` | Programmatic subject page | 159 | 500-600 (location-page analog) | Below floor; defer to `seo-programmatic` |

Per Google's guidance these are topical-coverage floors, not hard ranking cutoffs, but several templates (course pages, subject pages, tutor profiles) are meaningfully under typical coverage depth for their page type.

## Duplicate / Templated Content Risk

- A near-identical boilerplate sentence — "Most of TutorA's [Subject] tutors are based in India and reviewed by our team before being matched — their profile shows their specific background before you book." — appears verbatim (subject name swapped) across course and subject page templates. At ~140 course + ~103 subject pages this is a large-scale templated-sentence pattern.
- Tutor bio closing sentences follow a near-fixed template ("[Name] ... years of experience ... Based in India, [name] teaches online through TutorA, with every session live and 1:1, matched to a student's specific [X].") across essentially every profile sampled. This is a Sept-2025-QRG "repetitive structure across pages" flag — bios read as AI-summarized from structured data rather than individually written, even though the underlying facts (years, subjects) differ per tutor.
- These patterns are inherent to programmatic generation at this URL count; recommend deferring detailed duplicate-content remediation guidance to the `seo-programmatic` sub-skill, but flagging here since it affects E-E-A-T Experience/Authoritativeness scoring materially.

## Readability

Rough words/sentence: `/about` 16.2 (good), `/courses` 29.8, `/courses/ielts-...` 27.3, `/find-a-tutor` 22.3, tutor profile 28.4, `/subjects/gcse-maths` 26.5. Most pages run somewhat dense (25-30 words/sentence) outside the `/about` narrative — not egregious for a B2C marketplace but tightening course/subject copy would help scannability and AI-snippet extraction.

## AI Citation Readiness — Good

- Valid JSON-LD present on every page sampled: Organization/Person/WebSite/BreadcrumbList site-wide, plus Course/CourseInstance/Offer on course pages, FAQPage on most templates, Person on tutor profiles.
- **HowTo schema confirmed absent** on every page sampled (previously flagged issue — verified fixed).
- Homepage stats block uses semantic `<dl>/<dt>/<dd>` with clearly quotable, specific figures ("1,200+ verified tutors across 40+ countries," "8,600 successful matches," "31 hrs average time to match") — good for AI-answer extraction.
- Heading hierarchy is clean on `/about`, `/`, `/courses/ielts-...`, `/subjects/gcse-maths` (single H1, logical H2/H3). `/courses` and `/find-a-tutor` have the FAQ heading defects noted above, which slightly weakens machine-readability of those FAQ blocks specifically.

## Recommendations (priority order)

1. Fix the nested `<h3><button><h3>` markup on `/find-a-tutor`'s FAQ accordion (new bug, likely a copy-paste of the working component with an extra wrapper left in).
2. Bring `/courses` hub's FAQ accordion in line with the other templates (currently plain `<span>`, no heading semantics at all).
3. Add ~300-400 more words of substantive, non-templated content to course pages and subject pages (currently 150-500 words vs. typical 800/500-600 floors) — e.g., curriculum specifics, exam-board nuance, "who this is for" detail — rather than relying solely on the shared "Why a TutorA tutor" boilerplate block.
4. Vary the tutor-bio closing-sentence template so bios don't read as visibly interchangeable at scale; consider adding one genuinely distinguishing detail per tutor beyond years/subjects.
5. Continue treating `/subjects` (103 pages) and course pages as programmatic content — recommend a dedicated `seo-programmatic` pass for thin-content/duplication remediation at that page count.
