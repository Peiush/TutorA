# Content Brief: GCSE Chemistry

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/gcse-chemistry` (`https://www.tutora.it.com/subjects/gcse-chemistry`)
**Category:** Exam-driven — GCSE — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** Cross-links to `/courses/gcse-preparation-course-97ec8c86` via `lib/subject-course-links.ts`. Per Step 3a: treat as **secondary** context ("part of our full GCSE coverage"), not the page's primary framing.

---

## Content Brief: GCSE Chemistry tutor

### Search Intent
Primarily **commercial** ("GCSE Chemistry tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- TutorChase (`/gcse/`)
- PMT Education
- Tutor Hunt
- Sherpa
- Superprof

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- This subject currently cross-links to the shared `gcse-preparation-course-97ec8c86` course page. Per Step 3a, GCSE Chemistry has its own fully dedicated provider ecosystem distinct from the generic GCSE course SERP — this page should own its own primary keyword in title/H1/meta, with the course link framed as secondary supporting context ("part of our full GCSE coverage"), not the reverse.

### Winning Outline

**H1:** GCSE Chemistry tutor — 1:1 GCSE Chemistry Tutoring on TutorA
**URL Slug:** `/subjects/gcse-chemistry` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "GCSE Chemistry tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What GCSE Chemistry covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - GCSEs are UK qualifications typically taken around ages 14–16 (Years 10–11), graded on the 9–1 scale.
   - Step 3a's SERP research found zero exact-URL overlap between GCSE, IGCSE, and A-Level Chemistry — three genuinely distinct search ecosystems, not one artificially split page.
3. **Tutors who teach GCSE Chemistry on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated GCSE Chemistry tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic GCSE platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 4 Q&As, FS target on each):
- **What's the difference between GCSE and IGCSE Chemistry?** — IGCSE is the international variant of the same qualification level, administered by exam boards like Cambridge or Edexcel International, with some syllabus differences — see our IGCSE Chemistry page if that's what your school follows.
- **What age is GCSE Chemistry for?** — Typically Year 10–11 students (ages 14–16) in the UK system.
- **How is GCSE Chemistry graded?** — On the 9–1 numerical scale, with 9 being the highest.
- **Does GCSE Chemistry tutoring cover both Combined and Triple Science routes?** — Coverage depends on the tutor matched to you — mention which route you're on (Combined/Triple) when requesting a tutor so we match accordingly.
9. **CTA** (~40 words) — "Request a GCSE Chemistry tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
GCSE Chemistry tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted GCSE Chemistry tutor on TutorA. Live 1:1 sessions, transparent pricing. Part of our full GCSE coverage.

### Unique Angle and Information Gain
Full primary-keyword ownership backed by Step 3a's strongest confirmation in the whole study: GCSE/IGCSE/A-Level Chemistry show zero exact-URL SERP overlap. This page earns standalone treatment, not spoke-of-a-course treatment.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "GCSE Chemistry tutoring"
- This page → `/courses/gcse-preparation-course-97ec8c86`, anchor: "Part of our full GCSE coverage" (secondary link)
- This page → `/subjects/igcse-chemistry`, anchor: "Studying the international syllabus instead? See IGCSE Chemistry"
- This page → `/subjects/a-level-chemistry`, anchor: "Moving on to A-Level? See A-Level Chemistry"
- This page → `/request-a-tutor`, anchor: "Request a GCSE Chemistry tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

