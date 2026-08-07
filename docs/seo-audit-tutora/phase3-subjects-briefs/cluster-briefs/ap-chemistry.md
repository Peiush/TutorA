# Content Brief: AP Chemistry

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/ap-chemistry` (`https://www.tutora.it.com/subjects/ap-chemistry`)
**Category:** Exam-driven — AP — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 3 real approved tutors currently linked to this exact subject (TutorSubject → Subject direct relation, live-queryable — not a prefix-matching heuristic).
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: AP Chemistry tutor

### Search Intent
Primarily **commercial** ("AP Chemistry tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Tutor.com
- Wyzant
- Princeton Review
- Varsity Tutors
- AJTutoring
- Learner

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- No sibling subject in the catalog to cross-link or disambiguate against — this page can own its primary keyword outright with no chooser-page risk.

### Winning Outline

**H1:** AP Chemistry tutor — 1:1 AP Chemistry Tutoring on TutorA
**URL Slug:** `/subjects/ap-chemistry` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "AP Chemistry tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What AP Chemistry covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - AP Chemistry is one of the more content-dense AP sciences, combining quantitative problem-solving with lab-based free-response questions.
   - Scored 1–5; many college STEM programs look specifically for a 4 or 5 for intro chemistry credit.
3. **Tutors who teach AP Chemistry on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 3 real tutors would populate this section.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic AP prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **How is AP Chemistry different from a regular high school chemistry course?** — It moves faster and goes deeper into quantitative reasoning (equilibrium, kinetics, thermodynamics) than a standard course, closer to a college intro-chem pace.
- **Is AP Chemistry math-heavy?** — Yes, relative to other AP sciences — algebra-level math is used throughout, though not calculus.
- **When should I start AP Chemistry tutoring?** — Given how content-dense the course is, many students benefit from ongoing 1:1 support through the year rather than only a pre-exam cram.
9. **CTA** (~40 words) — "Request a AP Chemistry tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
AP Chemistry tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted AP Chemistry tutor on TutorA for live 1:1 sessions. Transparent pricing shown before booking. Request a tutor today.

### Unique Angle and Information Gain
As a standalone page with no cannibalization risk, the real information-gain opportunity is depth: a genuinely subject-specific FAQ and real tutor bios, not shared boilerplate — something the sitewide single FAQ block currently can't offer.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "AP Chemistry tutoring"
- This page → `/request-a-tutor`, anchor: "Request an AP Chemistry tutor"
- This page → `/guarantee`, anchor: "Our tutor match guarantee"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

