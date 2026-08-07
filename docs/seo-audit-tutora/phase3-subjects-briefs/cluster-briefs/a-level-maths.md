# Content Brief: A-Level Maths

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/a-level-maths` (`https://www.tutora.it.com/subjects/a-level-maths`)
**Category:** Exam-driven — A-Level — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: A-Level Maths tutor

### Search Intent
Primarily **commercial** ("A-Level Maths tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- TutorChase
- MyTutor
- Tutorful
- PMT Education
- Study Mind
- GoStudent

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Cross-link to A-Level Further Maths as a sibling for students taking both — Step 3a found only minor real overlap (one boutique site serves both), with every major platform maintaining separate pages.

### Winning Outline

**H1:** A-Level Maths tutor — 1:1 A-Level Maths Tutoring on TutorA
**URL Slug:** `/subjects/a-level-maths` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "A-Level Maths tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What A-Level Maths covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - A-Levels are UK qualifications typically studied over two years (Years 12–13, ages 16–18), graded A*–E.
   - A-Level Maths covers pure maths, statistics, and mechanics as combined modules within one qualification.
3. **Tutors who teach A-Level Maths on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated A-Level Maths tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic A-Level platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 4 Q&As, FS target on each):
- **What's the difference between A-Level Maths and Further Maths?** — Further Maths is a separate, additional qualification for strong maths students, covering more advanced pure, statistics, and mechanics content — see our A-Level Further Maths page if you're taking both.
- **What topics does A-Level Maths cover?** — Pure mathematics, statistics, and mechanics, combined within a single qualification (the exact split depends on your exam board).
- **Do I need A-Level Maths for a STEM degree?** — Many STEM degree programs require or strongly prefer it — check your target course's published entry requirements.
- **When should A-Level Maths tutoring start?** — Many students start at the beginning of Year 12 given how cumulative the subject is.
9. **CTA** (~40 words) — "Request a A-Level Maths tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
A-Level Maths tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted A-Level Maths tutor on TutorA. Live 1:1 sessions, transparent pricing shown before booking. Request a tutor today.

### Unique Angle and Information Gain
Standalone hub with a real, honest cross-link to Further Maths for the meaningful minority of students taking both — a genuine structural choice, not a generic swap.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "A-Level Maths tutoring"
- This page → `/subjects/a-level-further-maths`, anchor: "Also taking Further Maths?"
- This page → `/subjects/gcse-maths`, anchor: "Preparing to move up from GCSE? See GCSE Maths"
- This page → `/request-a-tutor`, anchor: "Request an A-Level Maths tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

