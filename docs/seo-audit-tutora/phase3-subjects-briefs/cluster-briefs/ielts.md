# Content Brief: IELTS

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/ielts` (`https://www.tutora.it.com/subjects/ielts`)
**Category:** Exam-driven — Languages / Test Preparation — elevated per inherited Course-level finding — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 2 real approved tutors currently linked to this exact subject (TutorSubject → Subject direct relation, live-queryable — not a prefix-matching heuristic).
**Course cross-link:** Cross-links to `/courses/ielts-8d4686db` via `lib/subject-course-links.ts`.

---

## Content Brief: IELTS tutor

### Search Intent
Primarily **commercial** ("IELTS tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Kaplan
- Princeton Review
- British Council
- IDP IELTS
- Wyzant
- Preply

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
Step 3a's subject-level research treated IELTS as inheriting its full validation from the Course-level document, which documented a CRITICAL page-type mismatch for this subject (same finding as SAT/GCSE/etc. at the course level). This page therefore gets a lighter version of the Service/Hybrid treatment — real tutor data via live query, a guarantee section linking to `/guarantee`, and a genuinely subject-specific FAQ — even though it falls within the "74 lighter subjects" scope band by catalog position.

### Winning Outline

**H1:** IELTS Tutor — 1:1 IELTS Tutoring on TutorA
**URL Slug:** `/subjects/ielts` (unchanged)
**Target Word Count:** ~700 words

1. **Intro / value prop** (~110 words) — Primary keyword "IELTS tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What IELTS covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - IELTS (International English Language Testing System) is scored on a 9-band scale across Listening, Reading, Writing, and Speaking.
   - Two versions exist — Academic (for university admission) and General Training (for immigration/work) — testing the same skills with different task content.
3. **Tutors who teach IELTS on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 2 real tutors would populate this section.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic IELTS prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 4 Q&As, FS target on each):
- **Academic or General Training IELTS?** — Mention which version you need when requesting a tutor — Academic is for university admission, General Training is typically for immigration or work purposes.
- **How is IELTS scored?** — On a 9-band scale for each of the four skills (Listening, Reading, Writing, Speaking), plus an overall band score.
- **How long is an IELTS score valid?** — Typically two years, though this can vary by the receiving institution or organization — confirm with whoever requires your score.
- **What's the difference between IELTS and Cambridge English (FCE/CAE/CPE)?** — Different exam bodies and formats, though both prove English proficiency — see our Cambridge English page if that's the specific qualification you need instead.
9. **CTA** (~40 words) — "Request a IELTS tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
IELTS Tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted IELTS tutor on TutorA for live 1:1 sessions across all four skills. Transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
IELTS inherits a CRITICAL page-type mismatch finding from the Course-level research (same underlying evidence as SAT/GCSE/etc.) — the real information gain is publishing real tutor data and a real guarantee link, which this page currently lacks entirely.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- This page → `/courses/ielts-8d4686db`, anchor: "See our full IELTS course"
- This page → `/subjects/cambridge-english`, anchor: "Need Cambridge English (FCE/CAE/CPE) instead?"
- This page → `/guarantee`, anchor: "Our tutor match guarantee"
- This page → `/request-a-tutor`, anchor: "Request an IELTS tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

