# Content Brief: GCSE English

**Mode:** IMPROVE (rewrite of existing live page) — not a new page
**Hub page:** `/courses/gcse-english-017a23a5` (`https://www.tutora.it.com/courses/gcse-english-017a23a5`)
**File / slug:** `gcse-english-017a23a5`
**Category:** Test Preparation — HIGHEST priority
**Page-type mismatch (Step 3a finding):** **HIGH**
**Template to use:** **Service / Hybrid page** (NOT the generic product-listing template the page currently uses)

---

## Content Brief: GCSE English tutor

### Current Page State (per Step 3a SXO finding — not independently re-fetched in this pass)
Current: generic product-listing (course card: price, duration, lecture count). This mirrors the sitewide course-card pattern (subject name, price, duration, lecture count) plus the single shared FAQ block in `lib/course-faqs.ts`. **Keep:** the price/duration/level-band data fields and course taxonomy — they're accurate structured data, just insufficiently supported by trust content around them. **Add:** everything below. This is an addition/restructure brief, not a "delete and start over" brief.

### Search Intent
Primarily **commercial** ("GCSE English tutor", "GCSE English tutoring online", "GCSE English prep course") — someone ready to hire a 1:1 tutor or enrol in a prep course, comparing providers. Secondary **commercial-local** ("GCSE English tutor near me") and **commercial-trust** ("GCSE English score guarantee") intent. Google rewards long-form Service/Hybrid pages here, not listing cards: Real SERP for 'GCSE English tutor' / 'GCSE English tutoring online' is dominated by UK/international tutoring services that foreground tutor credentials (MyTutor -- 1-in-8 acceptance rate, TutorChase -- 'IB examiners', Keystone Tutors, GoStudent, Sherpa -- DBS-checked, exam-board coverage AQA/Edexcel/OCR/Cambridge). No thin product-listing pages rank -- confirms the prior SXO finding for GCSE English.

### Competitor Analysis
Step 3a's SERP evidence for this subject is domain-level (same-domain tiebreak was used because exact-URL overlap was low but the same providers recurred across subpages) — no single competitor URL was captured per subject. Use this domain set as the competitive bar until a live per-subject SERP pull is run at copywriting time.

| # | Domain (page type observed) | Key sections these pages lead with | Est. depth | Main gap vs. TutorA's current page |
|---|---|---|---|---|
| 1 | Kaplan | Credentialed tutor bios, score guarantee, course structure | Long-form, 1,500+ words | TutorA page has none of this — just a course card |
| 2 | Princeton Review | Money-back score guarantee, tutor credentials, pricing tiers | Long-form | No guarantee/trust section on TutorA page at all |
| 3 | Manhattan Review | 99th-percentile tutor bios, testimonials | Long-form | No tutor bios exist on TutorA page |
| 4 | Wyzant | Individual tutor profile ratings/reviews | Profile-style | No reviews/ratings surfaced on course page |
| 5 | TestPrepInsight / BestColleges | Third-party "best GCSE English tutor" rankings/comparisons | Listicle | TutorA has no comparison or ranking-style trust signal |

*(Substitute MyTutor, TutorChase, Keystone Tutors, GoStudent, Sherpa, Preply as the working competitor set; these are the domains Step 3a validated via real SERP pairwise search for this subject.)*

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page at all — competitors lead with this.
- **Topic gap:** No guarantee/outcomes section — competitors (Princeton Review, PrepScholar, Prep Expert per Step 3a) lead with explicit guarantees. TutorA does not currently have a real guarantee to publish (see constraint below) — brief the structure, not fake numbers.
- **Topic gap:** No testimonials/reviews on the page, while Wyzant-style ratings and third-party "best tutor" rankings are a recurring competitive signal.
- **Depth gap:** Current page is a single card (price/duration/lecture count); real estate for FAQ, differentiation, and process content is unused.
- **Quality gap:** Thin/generic copy is shared sitewide via one FAQ block; none of it is GCSE English-specific.

### Winning Outline

**H1:** GCSE English tutor — 1:1 GCSE English Tutoring on TutorA
**URL Slug:** `/courses/gcse-english-017a23a5` (unchanged — this is a rewrite, not a new URL)
**Target Word Count:** ~1100 words (competitor avg is materially higher — multi-thousand-word Kaplan/Princeton Review pages — but 1100 is the realistic near-term uplift target given currently available content assets; revisit upward once real tutor bios and testimonials are live)

1. **Intro / value prop** (~120 words) — Primary keyword "GCSE English tutor" in the first 100 words. State plainly what TutorA offers: matched, vetted 1:1 GCSE English tutors, live sessions, not a self-paced course. No fabricated stats.
2. **What GCSE English tutoring on TutorA includes** (~120 words, H2) — definition-box style. Use secondary keyword "GCSE English tutoring online" in the H2. Cover format (live, 1:1, online), typical session structure, how matching works.
3. **Credentialed tutor bios** (~250 words, H2 + repeatable bio card structure) — **NEEDS REAL INPUT.** Do not fabricate. Structure only:
   - Tutor name, headshot placeholder
   - Subject-specific credential (degree, certification, examiner/marker status if applicable)
   - Years tutoring GCSE English specifically
   - 1-line specialisation note (e.g. "focuses on [weak-area] students")
   - Repeat for 3-5 tutors per subject page
   - Flag in CMS/copy doc: "PLACEHOLDER — insert real, verified tutor bios before publishing. Do not invent credentials."
4. **How it works** (~80 words, H2, numbered steps) — Request a tutor -> get matched -> book a live session -> track progress. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~90 words, H2) — Answers "GCSE English tutoring cost" honestly: pricing varies by tutor and is shown before booking (this matches the real site FAQ in `lib/course-faqs.ts` — do not invent a flat price).
6. **Guarantee / outcomes** (~100 words, H2) — **NEEDS REAL INPUT: TutorA's actual guarantee/refund/satisfaction policy, if one exists.** TutorA currently has no published numeric score guarantee. Do not write "points guaranteed" copy — that would be fabricated, same reasoning as why the site's schema work omitted a fake `sameAs` field. Structure to fill once policy is confirmed: policy statement, what's covered, how a student invokes it. If no guarantee exists, use honest commitment language instead (e.g. "if a tutor isn't the right fit, request a rematch" — only if this is actually true operationally; confirm before publishing).
7. **Testimonials** (~100 words, H2) — **NEEDS REAL INPUT: real student/parent quotes with permission to publish.** Structure: quote, first name + last initial, outcome context (e.g. grade/subject/duration), optional star rating. Do not fabricate quotes or ratings.
8. **Why a TutorA tutor vs. a prep-course platform** (~120 words, H2) — Differentiate from the competitor set above: MyTutor, TutorChase, Keystone Tutors, GoStudent, Sherpa, Preply. Angle: personalised 1:1 matching vs. fixed cohort classes or generic course platforms; real differentiator TutorA can credibly claim today.
9. **FAQ** (~220 words total, H2, 5-8 Q&As, 40-60 words each, FS target on each):
- **GCSE English tutoring cost** — commercial intent. Pricing FAQ.
- **GCSE English tutoring for year 10 students** — commercial intent. Audience-segment FAQ variant.
- **how much does GCSE English tutoring cost** — informational-commercial intent. Pricing FAQ.
- **GCSE English revision timetable** — informational intent. Content-gap FAQ opportunity.
   - Plus one light-touch resource mention for: “GCSE English past papers”, “GCSE English syllabus”, “what is GCSE English” — one or two sentences max, linking out to the official test body/free resource rather than trying to rank for it directly.
- **Required cross-link:** subject-specific spoke -> parent-curriculum to **GCSE** (anchor text: "GCSE tutoring (all subjects)"). Add this link in the intro or a dedicated "Related subjects" line near the FAQ.

10. **CTA** (~40 words) — "Request a GCSE English tutor" button linking to `/request-a-tutor`, secondary link to `/find-a-tutor`.

### Recommended Meta Tags

**Title** (54 chars)
Find a Vetted GCSE English tutor Online Today | TutorA

**Meta Description** (138 chars)
Work 1:1 with a vetted GCSE English tutor on TutorA. Personalised live sessions, transparent pricing, real results. Request a tutor today.

### Unique Angle and Information Gain
TutorA's real, deliverable differentiation is the 1:1 matched-tutor marketplace model itself (live sessions, vetted tutors, per-tutor pricing shown before booking) — this is genuine and does not need to be fabricated. The actual information-gain lift for this page comes from publishing REAL tutor credentials and REAL testimonials once available, which none of the current page's competitors' pages can specifically claim about TutorA's own tutors. Until that real content exists, do not ship placeholder/fake versions of these sections — an empty or "coming soon" state is preferable to fabricated trust content.

### E-E-A-T Requirements
- Real, verifiable tutor credentials (not invented) — degree/certification, years of GCSE English-specific experience
- Real testimonials with attribution (first name + last initial minimum), collected with permission
- A stated, real guarantee/refund/rematch policy — or honest absence of one, not an invented policy
- A "last updated" date on the page once live content is in place
- If any third-party stat is cited (e.g. test format facts), source and date it — do not use uncited numbers

### Internal Linking Opportunities
- From `/courses` (hub/listing page) → this page, anchor: "GCSE English tutoring"
- This page → `/request-a-tutor`, anchor: "Request a GCSE English tutor" (primary CTA)
- This page → `/find-a-tutor`, anchor: "Browse GCSE English tutors"
- This page → `/about`, anchor: "How we vet our tutors" (supports E-E-A-T)
- This page ↔ `/courses/gcse-preparation-course-97ec8c86`, anchor: "GCSE tutoring (all subjects)"

### Competing Page Types to Differentiate From
Do not mimic a listicle/ranking page (TestPrepInsight/BestColleges style) or a pure course-platform page (Udemy-style). The winning shape here is a **Service/Hybrid page**: informational enough to earn trust (tutor bios, process, FAQ) but structured to convert (guarantee framing, testimonials, clear CTA) — closer to Kaplan/Princeton Review/Manhattan Review's page shape than to a directory listing or a self-paced course page.

---
**Assumptions made by this brief (Step 3b), to revisit with real business input:**
1. No real tutor bios, guarantee policy text, or testimonials were available at brief-writing time — all three are structured as placeholders and explicitly flagged, per the no-fabrication constraint for this project.
2. Competitor analysis is domain-level (from Step 3a's SERP evidence), not URL-level — a fresh SERP pull at copywriting time is recommended to confirm current top 5 URLs.
3. Word count target (1100) is a near-term realistic target, not a match for competitors' multi-thousand-word pages; it assumes the trust sections above ship with real (not placeholder) content — if they ship empty, actual word count will be lower and should not be padded with filler to hit the number.
