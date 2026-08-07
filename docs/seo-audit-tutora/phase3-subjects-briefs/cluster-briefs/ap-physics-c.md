# Content Brief: AP Physics C

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/ap-physics-c` (`https://www.tutora.it.com/subjects/ap-physics-c`)
**Category:** Exam-driven — AP — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 1 real approved tutor currently linked to this exact subject (TutorSubject → Subject direct relation, live-queryable — not a prefix-matching heuristic).
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: AP Physics C tutor

### Search Intent
Primarily **commercial** ("AP Physics C tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Wyzant
- LA Tutors 123
- Growing Stars
- TeacherOn
- Princeton Review
- Varsity Tutors
- Stemly

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Step 3a confirmed zero exact-URL overlap with AP Physics 1 — calculus-based positioning is a real, defensible differentiator worth leading with in this page's intro and H2s.

### Winning Outline

**H1:** AP Physics C tutor — 1:1 AP Physics C Tutoring on TutorA
**URL Slug:** `/subjects/ap-physics-c` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "AP Physics C tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What AP Physics C covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - AP Physics C is split into two separate exams — Mechanics, and Electricity & Magnetism — both calculus-based.
   - Typically taken by students who are concurrently enrolled in, or have already completed, AP Calculus.
   - Many engineering-focused college programs specifically prefer AP Physics C credit over AP Physics 1.
3. **Tutors who teach AP Physics C on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 1 real tutor would populate this section.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic AP prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 4 Q&As, FS target on each):
- **Do I need calculus before starting AP Physics C?** — You should be taking calculus concurrently at minimum — the exam uses derivatives and integrals directly, unlike AP Physics 1.
- **Can I take both AP Physics C exams?** — Yes — Mechanics and Electricity & Magnetism are scored separately, and many students sit both in the same exam sitting.
- **Should I take AP Physics 1 first?** — Many schools sequence it that way, but it isn't a strict requirement everywhere — check your school's course sequencing, or see our AP Physics 1 page if you're unsure which applies to you.
- **How is AP Physics C scored?** — Each of the two exams (Mechanics and E&M) is scored 1–5 independently.
9. **CTA** (~40 words) — "Request a AP Physics C tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
AP Physics C tutor Online — 1:1 Match | TutorA

**Meta Description**
Work with a vetted AP Physics C tutor on TutorA — calculus-based Mechanics & E&M. Live 1:1 sessions, transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
The calculus-based positioning itself is a real differentiator most generic "AP Physics" content misses. TutorA can speak specifically to students who've outgrown algebra-based physics — a genuine subject-specific angle, not a generic swap of the AP Physics 1 page.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "AP Physics C tutoring"
- This page → `/subjects/ap-physics-1`, anchor: "New to AP Physics? Start with AP Physics 1"
- This page → `/subjects/ap-physics`, anchor: "Not sure which AP Physics exam you need?"
- This page → `/request-a-tutor`, anchor: "Request an AP Physics C tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

