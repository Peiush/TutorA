# Content Brief: A-Level Physics

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/a-level-physics` (`https://www.tutora.it.com/subjects/a-level-physics`)
**Category:** Exam-driven — A-Level — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: A-Level Physics tutor

### Search Intent
Primarily **commercial** ("A-Level Physics tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- TutorChase
- PMT Education
- MyTutor
- Study Mind

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- No existing course cross-link, though an A-Level Preparation course exists on the site — recommend adding a light secondary cross-link at Step 3c.

### Winning Outline

**H1:** A-Level Physics tutor — 1:1 A-Level Physics Tutoring on TutorA
**URL Slug:** `/subjects/a-level-physics` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "A-Level Physics tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What A-Level Physics covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - A-Levels are UK qualifications typically studied over two years (Years 12–13, ages 16–18), graded A*–E.
   - Step 3a confirmed zero exact-URL overlap vs. GCSE and IGCSE Physics.
3. **Tutors who teach A-Level Physics on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated A-Level Physics tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic A-Level platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 3 Q&As, FS target on each):
- **How is A-Level Physics different from GCSE Physics?** — It's a two-year, significantly more mathematical course covering topics like fields, particle physics, and further mechanics, used for university admissions.
- **Is A-Level Physics required for engineering degrees?** — It's commonly required or strongly preferred by UK engineering and physics degree programs — check your target course's published requirements.
- **Does A-Level Physics tutoring cover practical endorsement?** — Coverage depends on the tutor matched to you — mention any practical component when requesting a tutor.
9. **CTA** (~40 words) — "Request a A-Level Physics tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
A-Level Physics tutor Online — 1:1 Match | TutorA

**Meta Description**
Work with a vetted A-Level Physics tutor on TutorA. Live 1:1 sessions, transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
Standalone status backed by the same zero-overlap Step 3a evidence as A-Level Chemistry — write with full confidence, no hedging toward the GCSE page.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "A-Level Physics tutoring"
- This page → `/subjects/gcse-physics`, anchor: "Preparing to move up from GCSE? See GCSE Physics"
- This page → `/request-a-tutor`, anchor: "Request an A-Level Physics tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

