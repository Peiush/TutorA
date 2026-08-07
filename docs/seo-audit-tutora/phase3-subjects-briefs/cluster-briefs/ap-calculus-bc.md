# Content Brief: AP Calculus BC

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/ap-calculus-bc` (`https://www.tutora.it.com/subjects/ap-calculus-bc`)
**Category:** Exam-driven — AP — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 1 real approved tutor currently linked to this exact subject (TutorSubject → Subject direct relation, live-queryable — not a prefix-matching heuristic).
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: AP Calculus BC tutor

### Search Intent
Primarily **commercial** ("AP Calculus BC tutor") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

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
- Frame this page as "AB plus more," not a totally separate subject — Step 3a confirmed real content overlap with AB (2 of 6 shared exact URLs), so heavy cross-linking to the AB page is the right move rather than pretending BC is unrelated.

### Winning Outline

**H1:** AP Calculus BC tutor — 1:1 AP Calculus BC Tutoring on TutorA
**URL Slug:** `/subjects/ap-calculus-bc` (unchanged)
**Target Word Count:** ~950 words

1. **Intro / value prop** (~110 words) — Primary keyword "AP Calculus BC tutor" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What AP Calculus BC covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - AP Calculus BC includes everything in the AB curriculum plus series/sequences and additional integration techniques — a full-year college calculus equivalent.
   - Students who take the BC exam typically also receive an AB sub-score reflecting the AB-equivalent portion of their performance.
3. **Tutors who teach AP Calculus BC on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 1 real tutor would populate this section.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic AP prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~200 words total, H2, 3 Q&As, FS target on each):
- **Is AP Calculus BC harder than AB?** — It covers more material in the same year (series, more integration techniques) but isn't necessarily conceptually harder topic-by-topic — it's more content in the same timeframe.
- **Do I get an AB score too if I take BC?** — Yes — the BC exam reports an AB sub-score alongside the BC score, reflecting the AB-equivalent portion.
- **Should I start with AB before BC?** — Many schools sequence AB before BC, but some go straight to BC for strong students — see our AP Calculus AB page if that's what your course covers instead.
9. **CTA** (~40 words) — "Request a AP Calculus BC tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
AP Calculus BC tutor Online — 1:1 Match | TutorA

**Meta Description**
Work with a vetted AP Calculus BC tutor on TutorA — full-year calculus coverage. Live 1:1 sessions, transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
Positioning BC honestly as a superset of AB (rather than duplicating AB's copy with a name swap) is itself the differentiation — most competitor pages either merge AB/BC or treat them as unrelated; TutorA can do the accurate middle ground.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- From `/subjects` listing → this page, anchor: "AP Calculus BC tutoring"
- This page → `/subjects/ap-calculus-ab`, anchor: "Only covering the AB portion? See AP Calculus AB"
- This page → `/subjects/ap-calculus`, anchor: "Not sure whether you need AB or BC?"
- This page → `/request-a-tutor`, anchor: "Request an AP Calculus BC tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

