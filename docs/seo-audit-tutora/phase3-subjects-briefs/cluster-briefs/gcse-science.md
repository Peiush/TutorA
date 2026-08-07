# Content Brief: GCSE Science

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/gcse-science` (`https://www.tutora.it.com/subjects/gcse-science`)
**Category:** Exam-driven — GCSE — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** Cross-links to `/courses/gcse-preparation-course-97ec8c86` via `lib/subject-course-links.ts`. Per Step 3a: treat as **secondary** context, not primary framing.

---

## Content Brief: GCSE Science tutor

### Search Intent
Primarily **commercial** ("GCSE Science tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- TutorChase (`/gcse/science`)
- TutorSpot
- Hampstead & Frognal
- Simply Science
- That Science Tutor

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Cross-links to the shared `gcse-preparation-course-97ec8c86` course. Step 3a confirmed this is a genuinely separate product from GCSE Biology (own dedicated ecosystem), not a duplicate — treat the course link as secondary and clearly differentiate from GCSE Biology on-page.

### Winning Outline

**H1:** GCSE Science tutor — 1:1 GCSE Combined Science Tutoring on TutorA
**URL Slug:** `/subjects/gcse-science` (unchanged)
**Target Word Count:** ~900 words

1. **Intro / value prop** (~110 words) — Primary keyword "GCSE Science tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What GCSE Science covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - GCSE Science (Combined Science) bundles Biology, Chemistry, and Physics into a single qualification, usually worth two GCSEs, distinct from taking the three sciences separately as Triple Science.
3. **Tutors who teach GCSE Science on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated GCSE Science tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic GCSE platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **Is GCSE Science the same as GCSE Biology?** — No — GCSE Science (Combined Science) covers Biology, Chemistry, and Physics together as one qualification; GCSE Biology alone is part of the separate Triple Science route. See our GCSE Biology page if that's what your school follows.
- **How many GCSEs is Combined Science worth?** — Typically counted as two GCSEs, awarded as a double grade (e.g. 8-7).
- **Which topics does GCSE Combined Science cover?** — A condensed version of Biology, Chemistry, and Physics content compared to the Triple Science route — the exact syllabus depends on your exam board.
9. **CTA** (~40 words) — "Request a GCSE Science tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
GCSE Science tutor Online — 1:1 Match | TutorA

**Meta Description**
Work with a vetted GCSE Combined Science tutor on TutorA. Live 1:1 sessions, transparent pricing. Part of our full GCSE coverage.

### Unique Angle and Information Gain
Correctly separating GCSE Science from GCSE Biology (confirmed as genuinely distinct products by Step 3a) is real information gain most competitor pages get muddled on.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "GCSE Science tutoring"
- This page → `/courses/gcse-preparation-course-97ec8c86`, anchor: "Part of our full GCSE coverage" (secondary link)
- This page → `/subjects/gcse-biology`, anchor: "On the Triple Science route instead?"
- This page → `/request-a-tutor`, anchor: "Request a GCSE Science tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

