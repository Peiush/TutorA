# Content Brief: AP Calculus AB

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/ap-calculus-ab` (`https://www.tutora.it.com/subjects/ap-calculus-ab`)
**Category:** Exam-driven — AP — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: AP Calculus AB tutor

### Search Intent
Primarily **commercial** ("AP Calculus AB tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Learner.com
- AlexanderTutoring
- Tutor.com
- Growing Stars

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Step 3a found 2 of 6 SERP results were the *same exact URL* serving both AB and BC queries (Learner.com, AlexanderTutoring) — cross-link heavily to AP Calculus BC, but keep this as its own page since Tutor.com and Growing Stars still differentiate.

### Winning Outline

**H1:** AP Calculus AB tutor — 1:1 AP Calculus AB Tutoring on TutorA
**URL Slug:** `/subjects/ap-calculus-ab` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "AP Calculus AB tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What AP Calculus AB covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - AP Calculus AB covers roughly the first two-thirds of a college single-variable calculus sequence: limits, derivatives, and an introduction to integrals.
   - Scored 1–5, with many colleges granting credit for a 3 or above (policies vary by institution).
3. **Tutors who teach AP Calculus AB on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated AP Calculus AB tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic AP prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **What's the difference between AP Calculus AB and BC?** — BC covers everything in AB plus additional topics (series, more integration techniques) — it's a strict superset, not a separate curriculum. See our AP Calculus BC page if your course covers the fuller syllabus.
- **Is AP Calculus AB enough for college credit?** — Many colleges do grant credit for a qualifying AB score, though policies vary — check your target school's AP credit policy directly.
- **How is AP Calculus AB scored?** — 1 to 5, combining multiple-choice and free-response sections, similar to other AP exams.
9. **CTA** (~40 words) — "Request a AP Calculus AB tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
AP Calculus AB tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted AP Calculus AB tutor on TutorA. Live 1:1 sessions, transparent pricing shown before booking. Request a tutor today.

### Unique Angle and Information Gain
TutorA can honestly frame this page as sitting alongside a dedicated BC page rather than merging them — a real structural choice competitors like Learner.com don't consistently make (they serve one page for both).

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "AP Calculus AB tutoring"
- This page → `/subjects/ap-calculus-bc`, anchor: "Covering more than AB? See AP Calculus BC"
- This page → `/subjects/ap-calculus`, anchor: "Not sure whether you need AB or BC?"
- This page → `/request-a-tutor`, anchor: "Request an AP Calculus AB tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

