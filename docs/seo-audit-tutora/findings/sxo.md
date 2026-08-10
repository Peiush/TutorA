# SXO (Search Experience Optimization) Findings — tutora.it.com

**Audit date:** 2026-08-10 (re-audit)
**Data source:** 100% LIVE fetches via `render_page.py --mode always` (Playwright-rendered) against `https://www.tutora.it.com` on 2026-08-10 ~11:33–11:40 UTC. No cached/archived files were read (the 2026-08-04 archive at `docs/seo-audit-tutora/archive-2026-08-04/` was explicitly NOT used). `docs/seo-audit-tutora/reaudit-2026-08-10-sitemap.xml` (191 URLs) was used only as a URL list to select current, live slugs.

**Pages analyzed (live):**
- Homepage — `/`
- Courses hub — `/courses`
- Course detail — `/courses/python-ff654450` ("Python Programming for Beginners")
- Find-a-Tutor hub — `/find-a-tutor`
- Tutor profile — `/find-a-tutor/sudipto-ffbf5742`
- Subjects hub (NEW, ~103 subject pages added 2026-08-09) — `/subjects`
- Subject detail — `/subjects/python`
- About — `/about`

**SXO Gap Score: 69/100** (separate from any SEO Health Score)

---

## 1. Verification of Prior Findings (this was the primary task)

### 1a. "Python page-type mismatch" / irrelevant tutor matching — **RESOLVED**
Live-checked on both `/courses/python-ff654450` and `/subjects/python`. Both pages render a "Tutors for Python..." card pointing to **Harsh Patel** (`/find-a-tutor/harsh-patel-a75515a3`), described as: *"Harsh Patel teaches Python, Computer Science, and Java, bringing 5 years of experience as a software engineer turned educator... matched specifically to whichever programming language or CS topic a student is working on."* This is a genuinely subject-relevant, specific match — not a generic or unrelated tutor card. The generalized tutor-card matching logic appears to be working correctly for this subject. Confidence: high (verified on two independent page templates, course and subject).

Note: the `/find-a-tutor` hub's default (unfiltered) listing still leads with **Sudipto**, a Chemistry/Biology tutor — expected behavior for an unfiltered directory landing page, not a mismatch.

### 1b. "Tutor-availability contradiction" — **NOT REPRODUCIBLE LIVE (appears resolved)**
Searched all fetched pages (`/`, `/courses/python-ff654450`, `/subjects/python`, `/find-a-tutor`, `/find-a-tutor/sudipto-ffbf5742`) for availability/booking language. Found one consistent, non-contradictory promise repeated verbatim across templates: **"Matched within 24–48 hours"** (homepage hero trust strip) and **"We don't have a matching tutor for this yet — send a request and we'll match one for you within 24–48 hours"** (find-a-tutor on-demand listing cards). No instance of conflicting claims (e.g., "instant match" vs. "fully booked," or a tutor profile showing contradictory booked/available states) was found on any live-rendered page in this sample. This looks resolved, though the check is scoped to the pages sampled — it is not an exhaustive scan of all 191 URLs.

---

## 2. Page-Type Mismatch Detection

SERP consensus for "python tutor online 1-on-1" and "find a tutor online personalized matching" (WebSearch, top results: Wiingy, GeeksProgramming, iD Tech, MentorCruise, Gooroo, Tutor Doctor, TutorOcean, Superprof, Learner) is dominated by **Hybrid Service/Marketplace pages**: live 1:1 positioning, visible pricing anchors ("from $19/hr," "$29"), vetted/matched-tutor framing, and satisfaction guarantees.

TutorConnect's course/subject/profile pages match this taxonomy closely: FAQ schema, Course/Offer schema with price, tutor bio cards, "Tutor Match Guarantee" link. **Rating: ALIGNED** — no critical page-type mismatch found. Login-modal-on-open for Courses/Find-a-Tutor/Request-a-Tutor/About is confirmed intentional per instruction and excluded from findings.

---

## 3. User Stories (cite live signals)

1. **Self-taught beginner, stuck debugging** — wants a live tutor who sees their actual code, because free tutorials can't explain a specific error, but is blocked by uncertainty over whether 1:1 cost beats free resources. *(Source: course page "Why a TutorA tutor" copy vs. competitor "1-on-1"/"personalized pace" framing.)*
2. **Trust-skeptical parent** — wants proof tutors are safety-vetted before paying, but is blocked by the absence of visible reviews/ratings or third-party trust badges beyond the site's own "ID verified" claim. *(Source: competitors Gooroo/Learner push "guaranteed match"/"100% risk-free"; site only self-attests verification.)*
3. **Budget-conscious adult learner** — wants a clear price range up front, but is blocked because pricing "varies by tutor" with only a single $45 schema anchor and no visible min–max range in body copy. *(Source: competitors show explicit "$19/hr," "$29" pricing; TutorConnect FAQ says price is "shown before you request — no flat rate.")*
4. **Comparison shopper evaluating marketplaces** — wants real tutor photos/video intros to judge fit, but is blocked by the profile page rendering only a generic initial-letter avatar ("S") for Sudipto, no photo. *(Source: competitors iD Tech/Superprof show tutor photos; observed directly on `/find-a-tutor/sudipto-ffbf5742`.)*
5. **Decision-stage searcher ready to commit** — wants confidence the platform is actively operating, but is blocked by inconsistent freshness metadata: `publication_date` returns 2026-08-10 on hub pages but 2026-01-01 (a static fallback) on the course/subject/about templates. *(Source: htmldate extraction diff across templates.)*

Journey stages covered: awareness (#1), consideration (#2, #3, #4), decision (#5).

---

## 4. Gap Analysis (100 pts)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (15) | 13 | Matches SERP-dominant Hybrid Service/Marketplace pattern; missing star-rating/review display that top competitors (Wyzant, Superprof) show. |
| Content Depth (15) | 11 | Course/subject pages have solid FAQ + curriculum + differentiation copy; Subjects hub itself is a thin one-line intro before 103 links. |
| UX Signals (15) | 11 | Clear CTAs, breadcrumbs, FAQ accordions present; no jump-links/TOC on longer pages. |
| Schema (15) | 14 | Strong: Organization, WebSite, FAQPage, Course/CourseInstance/Offer (price+InStock), BreadcrumbList, Person on profile. |
| Media (15) | 5 | No tutor photos observed (initial-letter avatar only), no video/demo content found on any sampled page. |
| Authority (15) | 9 | ID-verified/background-check badges and founder bio (Nancy Gupta) present; no reviews, testimonial counts, or third-party trust badges (e.g., Trustpilot) found. |
| Freshness (10) | 6 | Hub pages report current `publication_date` (2026-08-10); course/subject/about pages fall back to 2026-01-01, a weak freshness signal despite live, current content. |
| **Total** | **69/100** | |

---

## 5. Persona Scores (summary)

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Beginner Coder Stuck Debugging | 22 | 20 | 16 | 18 | 76 | Good |
| Trust-Skeptical Parent | 20 | 18 | 18 | 15 | 71 | Good |
| International Trust-Skeptic ("why India-based tutors?") | 23 | 20 | 12 | 12 | 67 | Good (Trust/Action weak) |
| Comparison Shopper (self-paced vs. 1:1) | 20 | 18 | 15 | 15 | 68 | Good |
| Budget-Conscious Adult Learner | 18 | 15 | 14 | 16 | 63 | Good (lowest) |

**Weakest persona:** Budget-Conscious Adult Learner (63/100). **Top issue:** no visible price range in body copy, only a single schema-level $45 anchor plus "varies by tutor." **Fix:** add an on-page price band (e.g., "$25–$65/hr depending on tutor and experience") near the CTA on course/subject pages.

**Systemic issue:** Trust dimension is the weakest across all 5 personas (avg. ~15/25) — driven by the Media (5/15) and Authority (9/15) gap-analysis scores: no tutor photos, no reviews/ratings, no third-party trust badges.

---

## 6. Limitations

- Only 8 of 191 live URLs were sampled (homepage, courses hub + 1 course, find-a-tutor hub + 1 profile, subjects hub + 1 subject, about). Findings on tutor-matching relevance and availability copy are not exhaustively verified across all 103 subject pages or all tutor profiles.
- No access to actual Google Search Console/GA4 data; SERP analysis used WebSearch (2 queries, ~16 combined results) rather than a full top-10 SERP scrape with PAA/featured-snippet/AI-Overview capture.
- Media/video presence was assessed from rendered HTML text and structural markup only — no visual screenshot review was performed in this pass.
- Login-modal auto-open behavior was excluded from analysis per instruction (confirmed accepted design).

---

## 7. Cross-Skill Recommendations

- Trust/Authority gap (no reviews, no photos) → recommend `/seo content` for deeper E-E-A-T analysis.
- Freshness metadata inconsistency (2026-01-01 fallback dates) → recommend `/seo schema` review of `dateModified`/publication date handling in Course/Person JSON-LD templates.
- Thin Subjects hub intro copy → recommend `/seo page` audit of `/subjects`.

Generate a PDF report? Use `/seo google report`.
