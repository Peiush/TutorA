# Content Brief: IGCSE Maths

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/igcse-maths` (`https://www.tutora.it.com/subjects/igcse-maths`)
**Category:** Exam-driven — IGCSE — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** Cross-links to `/courses/igcse-preparation-course-5ed7859f` via `lib/subject-course-links.ts`. Per Step 3a: treat as **secondary** context, not primary framing.

---

## Content Brief: IGCSE Maths tutor

### Search Intent
Primarily **commercial** ("IGCSE Maths tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- GoStudent
- TutorsPlus
- igcsemathstutors.com

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Cross-links to `igcse-preparation-course-5ed7859f`. Treat as secondary per Step 3a — this is the most independently-confirmed subject pairing in the whole study.

### Winning Outline

**H1:** IGCSE Maths tutor — 1:1 IGCSE Maths Tutoring on TutorA
**URL Slug:** `/subjects/igcse-maths` (unchanged)
**Target Word Count:** ~900 words

1. **Intro / value prop** (~110 words) — Primary keyword "IGCSE Maths tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What IGCSE Maths covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - IGCSE is the internationally-administered equivalent of GCSE, commonly used at international schools worldwide.
   - Step 3a found zero domain overlap at all with GCSE Maths — a fully independent search ecosystem, not a near-duplicate.
3. **Tutors who teach IGCSE Maths on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated IGCSE Maths tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic IGCSE platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **Is IGCSE Maths the same as GCSE Maths?** — No — different exam boards and, per our own SERP research, an entirely separate provider ecosystem. See our GCSE Maths page if you're on the UK domestic syllabus instead.
- **Core or Extended tier?** — IGCSE Maths typically offers Core and Extended tiers — mention which one you're on when requesting a tutor.
- **Which exam board does TutorA cover?** — Coverage depends on the tutor matched to you — mention your board (e.g. Cambridge, Edexcel) when requesting a tutor.
9. **CTA** (~40 words) — "Request a IGCSE Maths tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
IGCSE Maths tutor Online — 1:1 Match | TutorA

**Meta Description**
Work with a vetted IGCSE Maths tutor on TutorA. Live 1:1 sessions, transparent pricing. Part of our full IGCSE coverage.

### Unique Angle and Information Gain
Zero domain overlap with GCSE Maths is the strongest standalone-status evidence in the whole subject catalog — write this page with full confidence, no hedging toward the GCSE page.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "IGCSE Maths tutoring"
- This page → `/courses/igcse-preparation-course-5ed7859f`, anchor: "Part of our full IGCSE coverage" (secondary link)
- This page → `/subjects/gcse-maths`, anchor: "On the UK domestic syllabus instead? See GCSE Maths"
- This page → `/request-a-tutor`, anchor: "Request an IGCSE Maths tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

