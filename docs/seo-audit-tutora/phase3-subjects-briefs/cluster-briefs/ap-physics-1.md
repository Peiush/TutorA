# Content Brief: AP Physics 1

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/ap-physics-1` (`https://www.tutora.it.com/subjects/ap-physics-1`)
**Category:** Exam-driven — AP — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: AP Physics 1 tutor

### Search Intent
Primarily **commercial** ("AP Physics 1 tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Wyzant (`AP_physics_tutors.aspx`)
- Princeton Review (`tutor-search?s=ap+physics+1`)
- Jaya's Academy
- LA Tutors 123
- TeacherOn

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Step 3a found zero exact-URL SERP overlap between AP Physics 1 and AP Physics C — every major provider maintains a fully dedicated subpage for each. This page should NOT be merged with or hedge toward AP Physics C content; it owns its own primary keyword outright.

### Winning Outline

**H1:** AP Physics 1 tutor — 1:1 AP Physics 1 Tutoring on TutorA
**URL Slug:** `/subjects/ap-physics-1` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "AP Physics 1 tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What AP Physics 1 covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - AP Physics 1 is College Board's algebra-based introductory physics exam — no calculus required — covering mechanics, waves, and simple circuits.
   - Scored 1–5; many US colleges award credit or placement for a 4 or 5.
   - Since College Board's 2014 exam restructuring, AP Physics 1 is the exam most people mean today when they say "AP Physics" — the old undifferentiated exam no longer exists.
3. **Tutors who teach AP Physics 1 on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated AP Physics 1 tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic AP prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 4 Q&As, FS target on each):
- **What's the difference between AP Physics 1 and AP Physics C?** — AP Physics 1 is algebra-based and covers mechanics/waves/circuits at an introductory level; AP Physics C is calculus-based and split into two separate exams (Mechanics, and Electricity & Magnetism), usually taken by students concurrently studying calculus. If your course is calculus-based, see our AP Physics C page instead.
- **Is AP Physics 1 hard?** — It's consistently one of the lower-pass-rate AP exams nationally because it emphasizes conceptual reasoning over formula plugging — 1:1 tutoring that focuses on problem-solving process, not just content review, tends to help most.
- **How is AP Physics 1 scored?** — 1 to 5, combining multiple-choice and free-response sections. A score of 4 or 5 is typically needed for college credit, though policies vary by school.
- **When should I start AP Physics 1 tutoring?** — Most students benefit from starting a few months before the May exam date, though ongoing 1:1 support throughout the course year is also common for concept-heavy subjects like this one.
9. **CTA** (~40 words) — "Request a AP Physics 1 tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
AP Physics 1 tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted AP Physics 1 tutor on TutorA for live 1:1 sessions. Transparent pricing shown before booking. Request a tutor today.

### Unique Angle and Information Gain
TutorA's real differentiator is the matched 1:1 model itself — live sessions with a tutor reviewed by TutorA's team, not a fixed-cohort class. Once real tutor bios populate section 3, this page can specifically claim what no generic AP prep platform page can: TutorA's own vetted tutors for this exact exam.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` or `/courses` listing → this page, anchor: "AP Physics 1 tutoring"
- This page → `/subjects/ap-physics-c`, anchor: "Taking the calculus-based exam instead? See AP Physics C"
- This page → `/subjects/ap-physics`, anchor: "Not sure which AP Physics exam you need?"
- This page → `/request-a-tutor`, anchor: "Request an AP Physics 1 tutor"
- This page → `/guarantee`, anchor: "Our tutor match guarantee"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

