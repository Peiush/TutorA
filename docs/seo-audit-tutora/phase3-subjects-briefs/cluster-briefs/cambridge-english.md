# Content Brief: Cambridge English

**Mode:** NEW CONTENT (expand existing live page — currently ~30 words: subtitle + 3-item "what you'll learn" list, real schema/metadata already in place) — not a full rewrite, not a new URL
**Hub page:** `/subjects/cambridge-english` (`https://www.tutora.it.com/subjects/cambridge-english`)
**Category:** Exam-driven — Cambridge English — full-depth priority
**Page-type finding (Step 3a):** CONFIRMED — credentialed-tutor-bio pages beat thin listings for this curriculum family
**Template:** Service/Hybrid page (adapted for subject-level: real tutor data pulled via direct `Subject↔TutorSubject` query, not the Course-level prefix-matching heuristic; guarantee section links to the existing real `/guarantee` page rather than inventing guarantee copy)
**Real tutor coverage (as of this audit):** 0 tutors currently linked to this exact subject. Use honest "no tutor matched yet — request one and we'll find you a specialist" framing rather than implying an existing roster; do not leave a fake-looking empty bio grid.
**Course cross-link:** No existing subject→course cross-link in `lib/subject-course-links.ts`.

---

## Content Brief: Cambridge English exam tutor (FCE/CAE/CPE)

### Search Intent
Primarily **commercial** ("Cambridge English exam tutor (FCE/CAE/CPE)") — a student or parent ready to hire a 1:1 tutor for this exact exam/curriculum, comparing providers. Step 3a's real SERP research for this subject confirms Google rewards long-form Service/Hybrid pages here, not thin listing cards: the dominant results lead with credentialed-tutor-bio content, not product cards.

### Competitor Analysis
Domain-level competitive set validated in Step 3a for this subject (no single competitor URL captured — use as the working bar until a live per-subject SERP pull at copywriting time):

- Strommen Inc
- Preply (dedicated Cambridge-ESOL-FCE-CAE-CPE listing)
- ExamEnglish.com

### Content Gaps and Opportunities
- **Topic gap:** No tutor-credential content exists on the current page — it is a subtitle plus a 3-item list. Competitors lead with tutor bios.
- **Topic gap:** No guarantee/trust section. TutorA has a real rematch guarantee at `/guarantee` — this page should surface and link to it, not invent a numeric score guarantee.
- **Depth gap:** ~30 words of content vs. competitors' long-form pages.
- **Quality gap:** No subject-specific facts, no FAQ.

### Critical retargeting note (Step 3a finding, distinct from every other subject in this catalog)
A bare "Cambridge English tutor" search returns **geographic** results (tutors located in the city of Cambridge, MA or UK), with **zero** results about the actual exam suite. Only a more specific query ("Cambridge English exam tutor FCE CAE") surfaces the real competitors. **This page's title, H1, and meta description must explicitly include "exam" and at least one of FCE/CAE/CPE — never ship a bare "Cambridge English tutor" title.** This is a targeting fix, not a restructuring — the exam-prep SERP category clearly exists once the keyword is specific enough.

### Winning Outline

**H1:** Cambridge English Exam Tutor (FCE / CAE / CPE) — 1:1 Tutoring on TutorA
**URL Slug:** `/subjects/cambridge-english` (unchanged)
**Target Word Count:** ~900 words

1. **Intro / value prop** (~110 words) — Primary keyword "Cambridge English exam tutor (FCE/CAE/CPE)" in the first 100 words. State plainly: matched, vetted 1:1 tutors for this exact exam, live sessions, not a self-paced course.
2. **What Cambridge English covers** (~110 words, H2) — Real, generically verifiable facts about the exam/curriculum (not TutorA-proprietary claims):
   - "Cambridge English" refers to the Cambridge Assessment English exam suite — including B2 First (FCE), C1 Advanced (CAE), and C2 Proficiency (CPE) — not the city of Cambridge or Cambridge University admissions.
   - These are internationally recognized English-proficiency qualifications, distinct from IELTS and TOEFL, often used for university admission, work visas, or employment.
3. **Tutors who teach Cambridge English on TutorA** (~180-250 words, H2 + repeatable bio-card structure) — **Populate via live query, not placeholder copy.** Query `TutorSubject` joined on `subjectId` for this subject directly (real relation, not prefix matching). Card fields per tutor: name, headshot, real credential/experience note, years tutoring this subject. Currently 0 tutors are linked — ship an honest "we don't have a dedicated Cambridge English tutor listed yet, tell us what you need and we'll find one" state instead of an empty-looking grid or fabricated bios.
4. **How it works** (~70 words, H2, numbered) — Request a tutor → matched → live 1:1 sessions. Link to `/request-a-tutor` and `/find-a-tutor`.
5. **Pricing** (~80 words, H2) — Pricing varies by tutor, shown before booking. Never invent a flat number.
6. **Our guarantee** (~80 words, H2) — Link to `/guarantee`. Summarize the real policy: free rematch to a different tutor for the same subject if the first isn't the right fit, no cap on rematches. Do NOT write a numeric score guarantee — TutorA doesn't have one.
7. **Why a TutorA tutor vs. a generic exam-prep platform** (~110 words, H2) — Real differentiator vs. the competitor set above.
8. **FAQ** (~220 words total, H2, 4 Q&As, FS target on each):
- **What is Cambridge English (FCE/CAE/CPE)?** — It's the Cambridge Assessment English exam suite — B2 First (FCE), C1 Advanced (CAE), and C2 Proficiency (CPE) — internationally recognized English-proficiency qualifications, not related to Cambridge University admissions or the city of Cambridge.
- **What's the difference between FCE, CAE, and CPE?** — They represent increasing proficiency levels: FCE = B2 (upper-intermediate), CAE = C1 (advanced), CPE = C2 (proficient/near-native), on the Common European Framework (CEFR) scale.
- **How is Cambridge English different from IELTS?** — Different exam bodies and formats, though both serve similar purposes (proving English proficiency for study, work, or immigration). See our IELTS page if that's the specific exam you need instead.
- **Do these exams expire?** — Cambridge English qualifications don't expire, unlike IELTS/TOEFL scores which are typically valid for two years — a genuine, real differentiator worth mentioning honestly in the FAQ.
9. **CTA** (~40 words) — "Request a Cambridge English tutor" → `/request-a-tutor`.

### Recommended Meta Tags

**Title**
Cambridge English Exam Tutor (FCE/CAE/CPE) | TutorA

**Meta Description**
Get matched with a vetted Cambridge English (FCE/CAE/CPE) exam tutor on TutorA. Live 1:1 sessions, transparent pricing. Request a tutor today.

### Unique Angle and Information Gain
Correcting the keyword-targeting bug itself is the entire information gain here — no competitor page needs to explain that "Cambridge English" isn't the city, but TutorA's current thin page (and most of the web) doesn't make the exam suite clear either. Explicitly naming FCE/CAE/CPE in every key on-page location is the fix.

### E-E-A-T Requirements
- Real tutor credentials pulled from the live `TutorSubject` relation for this subject — no invented names or credentials in the brief or the shipped copy.
- The real, stated `/guarantee` policy — never an invented numeric guarantee.
- Generically true, citable facts about the exam/curriculum structure (dated if a specific figure is used).
- A "last updated" date once real content ships.

### Internal Linking Opportunities
- This page → `/subjects/ielts`, anchor: "Need IELTS instead? See our IELTS page" (sibling English-proficiency exam)
- This page → `/request-a-tutor`, anchor: "Request a Cambridge English exam tutor"

---
**Assumptions made by this brief (Step 3b):** competitor set is domain-level from Step 3a's SERP evidence, not a fresh per-subject pull; tutor-bio and FAQ sections assume Step 3c queries `TutorSubject` directly by `subjectId` (real relation) rather than reusing the Course-level prefix-matching heuristic; guarantee section assumes the real `/guarantee` page content is stable (bump this brief if that page's policy changes).

