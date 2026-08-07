# Content Brief: SAT Math

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/sat-math` (`https://www.tutora.it.com/subjects/sat-math`)
**Category:** Exam-driven — SAT/ACT — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 1 real approved tutor currently linked to this exact subject (TutorSubject → Subject direct relation, live-queryable — not a prefix-matching heuristic).
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: SAT Math tutor

### Search Intent
Primarily **commercial** ("SAT Math tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Learner.com
- Wyzant
- Mathnasium

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- No existing course cross-link. Step 3a's recommended action is `hub-primary-new-cross-link` — add both a light cross-link to the SAT course page and a sibling cross-link to ACT Math (real, partial overlap found: `mathnasium.com/math-test-preparation` serves both queries).

### Winning Outline

**H1:** SAT Math tutor — 1:1 SAT Math Tutoring on TutorA
**URL Slug:** `/subjects/sat-math` (unchanged)
**Target Word Count:** ~900 words

1. **Intro / value prop** (~110 words) — Primary keyword "SAT Math tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What SAT Math covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - The SAT Math section is scored as part of the overall 400–1600 SAT scale.
   - Step 3a found the competitive set here is math-tutoring specialists (Learner, Wyzant, Mathnasium), a genuinely different competitive set than the Kaplan/Princeton Review-style brands dominating the generic SAT course page.
3. **Tutors who teach SAT Math on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 1 real tutor would populate this section.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic SAT prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **How is SAT Math scored?** — As part of the overall 400–1600 SAT composite, combining with the Reading & Writing section.
- **Should I focus on SAT Math or the full SAT?** — If Math is your specific weak area, section-focused tutoring can be more efficient than generic full-test prep — see our SAT course page for full-test coverage.
- **What's the difference between SAT Math and ACT Math tutoring?** — Content overlaps significantly, but format and pacing differ — see our ACT Math page if you're deciding between the two tests.
9. **CTA** (~40 words) — "Request a SAT Math tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
SAT Math tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted SAT Math tutor on TutorA. Live 1:1 sessions, transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
Section-specific specialist framing (math-tutoring brands, not generic test-prep brands) is a real, Step-3a-confirmed differentiator most competitors don't articulate clearly.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- This page → `/courses/sat-c5d2749b`, anchor: "Need full SAT prep instead?" (new cross-link per Step 3a)
- This page → `/subjects/act-math`, anchor: "Deciding between SAT and ACT?"
- This page → `/request-a-tutor`, anchor: "Request an SAT Math tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

