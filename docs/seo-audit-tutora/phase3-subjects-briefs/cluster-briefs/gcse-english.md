# Content Brief: GCSE English

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/gcse-english` (`https://www.tutora.it.com/subjects/gcse-english`)
**Category:** Exam-driven — GCSE — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** Cross-links to `/courses/gcse-english-017a23a5` via `lib/subject-course-links.ts`. Per Step 3a: this is a **dedicated** match (not the shared GCSE course) — the course link can be framed more prominently than on other GCSE subjects.

---

## Content Brief: GCSE English tutor

### Search Intent
Primarily **commercial** ("GCSE English tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- TutorChase (`/gcse/english`)
- AmazingTalker
- Tutor Hunt
- Sherpa
- Keystone
- Oxbridge GCSE Tutor

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- This is the one GCSE subject with a genuinely dedicated (not shared) course match — `hub-primary-course-cross-link` verdict per Step 3a. The course link can be framed more prominently here than on the other 8 GCSE/IGCSE subjects.

### Winning Outline

**H1:** GCSE English tutor — 1:1 GCSE English Tutoring on TutorA
**URL Slug:** `/subjects/gcse-english` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "GCSE English tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What GCSE English covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - GCSE English is typically split into GCSE English Language and GCSE English Literature, sometimes taught and tutored together.
   - Step 3a found zero SERP overlap with GCSE Science/Biology, and confirmed this subject is correctly matched to its own dedicated `gcse-english-017a23a5` course — unlike the other GCSE subjects that share the generic GCSE course.
3. **Tutors who teach GCSE English on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated GCSE English tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic GCSE platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 3 Q&As, FS target on each):
- **Does GCSE English cover Language and Literature both?** — Coverage depends on the tutor matched to you — mention whether you need Language, Literature, or both when requesting a tutor.
- **How is GCSE English graded?** — On the 9–1 numerical scale, same as other GCSE subjects.
- **What set texts does GCSE English Literature cover?** — This depends on your exam board and school — mention your set texts when requesting a tutor so sessions target the right material.
9. **CTA** (~40 words) — "Request a GCSE English tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
GCSE English tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted GCSE English tutor on TutorA. Live 1:1 sessions, transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
The Language/Literature split is a real, subject-specific nuance most generic tutoring pages skip — surfacing it directly (and letting the request flow capture which one a student needs) is genuine information gain.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "GCSE English tutoring"
- This page → `/courses/gcse-english-017a23a5`, anchor: "See our full GCSE English course"
- This page → `/request-a-tutor`, anchor: "Request a GCSE English tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

