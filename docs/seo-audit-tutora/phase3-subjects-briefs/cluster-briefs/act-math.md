# Content Brief: ACT Math

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/act-math` (`https://www.tutora.it.com/subjects/act-math`)
**Category:** Exam-driven — SAT/ACT — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 1 real approved tutor currently linked to this exact subject (TutorSubject → Subject direct relation, live-queryable — not a prefix-matching heuristic).
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: ACT Math tutor

### Search Intent
Primarily **commercial** ("ACT Math tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Mathnasium (`math-test-preparation`)
- Learner.com
- Wyzant

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Content Gaps and Opportunities (continued)
- Cross-link to SAT Math as "standardized test math" siblings, per Step 3a's confirmed partial overlap.

### Winning Outline

**H1:** ACT Math tutor — 1:1 ACT Math Tutoring on TutorA
**URL Slug:** `/subjects/act-math` (unchanged)
**Target Word Count:** ~900 words

1. **Intro / value prop** (~110 words) — Primary keyword "ACT Math tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What ACT Math covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - The ACT Math section is scored on the 1–36 ACT scale.
   - Step 3a found 1 exact-URL match with SAT Math (`mathnasium.com/math-test-preparation` serves both queries) plus domain overlap — real but partial overlap, unlike the fully independent GCSE/IGCSE pairings.
3. **Tutors who teach ACT Math on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 1 real tutor would populate this section.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic ACT prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~180 words total, H2, 3 Q&As, FS target on each):
- **How is ACT Math different from SAT Math?** — Content overlaps significantly, but the ACT Math section includes some trigonometry and moves at a faster pace with more questions in less time. See our SAT Math page if you're deciding between the two tests.
- **How is ACT Math scored?** — 1 to 36, as part of the overall ACT composite score.
- **Should I take the SAT or ACT?** — It depends on your strengths and target schools' preferences — many students take a practice test of each to decide. TutorA tutors can help with either.
9. **CTA** (~40 words) — "Request a ACT Math tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
ACT Math tutor Online — 1:1 Match | TutorA

**Meta Description**
Get matched with a vetted ACT Math tutor on TutorA. Live 1:1 sessions, transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
Honest SAT/ACT Math sibling cross-linking, reflecting the real partial-overlap evidence from Step 3a, rather than treating them as either identical or unrelated.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- This page → `/subjects/sat-math`, anchor: "Deciding between SAT and ACT?"
- This page → `/request-a-tutor`, anchor: "Request an ACT Math tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

