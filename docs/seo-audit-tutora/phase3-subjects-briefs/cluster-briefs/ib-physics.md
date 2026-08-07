# Content Brief: IB Physics

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/ib-physics` (`https://www.tutora.it.com/subjects/ib-physics`)
**Category:** Exam-driven — IB — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 1 real approved tutor currently linked to this exact subject (TutorSubject → Subject direct relation, live-queryable — not a prefix-matching heuristic).
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: IB Physics tutor

### Search Intent
Primarily **commercial** ("IB Physics tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- AmazingTalker
- TutorsPlus
- Enhanced Prep
- Varsity Tutors
- ibtutor.us

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Cross-link to IB Chemistry as "IB Sciences" siblings — real, shared-audience overlap (same students often take both) even though the SERPs stay separate.

### Winning Outline

**H1:** IB Physics tutor — 1:1 IB Physics Tutoring on TutorA
**URL Slug:** `/subjects/ib-physics` (unchanged)
**Target Word Count:** ~900 words

1. **Intro / value prop** (~110 words) — Primary keyword "IB Physics tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What IB Physics covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - IB Physics is offered at Higher Level (HL) or Standard Level (SL), with an Internal Assessment (IA) component alongside external exams.
   - Step 3a found 5 shared provider domains with IB Chemistry, but zero exact-URL overlap — every provider maintains a dedicated subpage for each science.
3. **Tutors who teach IB Physics on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 1 real tutor would populate this section.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic IB prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **HL or SL — does it matter?** — Yes — mention your level when requesting a tutor so sessions target the right depth and IA expectations.
- **Does IB Physics tutoring help with the Internal Assessment (IA)?** — Coverage depends on the tutor matched to you — mention that you need IA support specifically when requesting a tutor.
- **Am I also taking IB Chemistry?** — Many IB science students take both — see our IB Chemistry page too.
9. **CTA** (~40 words) — "Request a IB Physics tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
IB Physics tutor Online — 1:1 Match | TutorA

**Meta Description**
Work with a vetted IB Physics tutor on TutorA. Live 1:1 sessions, transparent pricing, HL/SL coverage. Request a tutor today.

### Unique Angle and Information Gain
Honest "IB Sciences" cross-linking to Chemistry reflects real student behavior (many take both) without merging the two pages' primary keywords, which Step 3a's SERP evidence says would be wrong.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "IB Physics tutoring"
- This page → `/subjects/ib-chemistry`, anchor: "Also taking IB Chemistry?"
- This page → `/subjects/international-baccalaureate-ib`, anchor: "Looking for other IB subjects?"
- This page → `/request-a-tutor`, anchor: "Request an IB Physics tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

