# Content Brief: IGCSE Chemistry

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/igcse-chemistry` (`https://www.tutora.it.com/subjects/igcse-chemistry`)
**Category:** Exam-driven — IGCSE — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** Cross-links to `/courses/igcse-preparation-course-5ed7859f` via `lib/subject-course-links.ts`. Per Step 3a: treat as **secondary** context, not primary framing.

---

## Content Brief: IGCSE Chemistry tutor

### Search Intent
Primarily **commercial** ("IGCSE Chemistry tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- TutorChase (`/igcse/`)
- PMT Education
- GoStudent

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Cross-links to `igcse-preparation-course-5ed7859f`. Per Step 3a, treat as secondary — this page has its own dedicated ecosystem worth full primary-keyword ownership.

### Winning Outline

**H1:** IGCSE Chemistry tutor — 1:1 IGCSE Chemistry Tutoring on TutorA
**URL Slug:** `/subjects/igcse-chemistry` (unchanged)
**Target Word Count:** ~900 words

1. **Intro / value prop** (~110 words) — Primary keyword "IGCSE Chemistry tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What IGCSE Chemistry covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - IGCSE (International GCSE) is the internationally-administered equivalent of GCSE, run by boards like Cambridge International and Edexcel International, commonly taken by students at international schools outside the UK.
   - Step 3a confirmed zero exact-URL overlap vs. both GCSE and A-Level Chemistry — a genuinely distinct SERP, not a duplicate.
3. **Tutors who teach IGCSE Chemistry on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated IGCSE Chemistry tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic IGCSE platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **What's the difference between IGCSE and GCSE Chemistry?** — IGCSE is the internationally-administered version of the same qualification level, run by different exam boards (Cambridge International, Edexcel International) with some syllabus differences. See our GCSE Chemistry page if you're on the UK domestic syllabus instead.
- **Which exam board does TutorA tutoring cover?** — Coverage depends on the tutor matched to you — mention your exam board (e.g. Cambridge, Edexcel) when requesting a tutor.
- **Is IGCSE Chemistry harder than GCSE Chemistry?** — They're broadly comparable in level and difficulty — the differences are mainly in syllabus structure and assessment style, not overall difficulty.
9. **CTA** (~40 words) — "Request a IGCSE Chemistry tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
IGCSE Chemistry tutor Online — 1:1 Match | TutorA

**Meta Description**
Work with a vetted IGCSE Chemistry tutor on TutorA. Live 1:1 sessions, transparent pricing. Part of our full IGCSE coverage.

### Unique Angle and Information Gain
Standalone hub status backed directly by Step 3a's zero-overlap finding — international-school families searching this term get a page that speaks to their specific syllabus, not a generic "GCSE" page that doesn't match their exam board.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "IGCSE Chemistry tutoring"
- This page → `/courses/igcse-preparation-course-5ed7859f`, anchor: "Part of our full IGCSE coverage" (secondary link)
- This page → `/subjects/gcse-chemistry`, anchor: "On the UK domestic syllabus instead? See GCSE Chemistry"
- This page → `/request-a-tutor`, anchor: "Request an IGCSE Chemistry tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

