# Content-Depth Audit — Course / Subject / Tutor Templates

**Date:** 2026-08-10
**Scope:** Follow-up on `RE-AUDIT-REPORT-2026-08-10-POSTFIX.md`'s "Content depth below floor on programmatic templates" finding and `findings/content.md`'s recommendation #3. This audit measures the gap directly from the content data files (`lib/course-subject-content.ts`, `lib/subject-content.ts`) rather than a small live-fetch sample, so the numbers below cover **every** page, not 1-2 examples.

---

## 1. Correcting the page-count baseline

`findings/content.md` (line 53 of the postfix report) says the templated-sentence pattern spans "~140 course + ~103 subject pages" (~240+ combined). That figure is wrong:

| Template | Live pages (per `findings/sitemap.md`) | Entries in content data file |
|---|---|---|
| `/courses/[slug]` | **53** | 53 (`course-subject-content.ts`) + 1 legacy dup key = 54 |
| `/subjects/[slug]` | **103** | 103 (`subject-content.ts`) |
| `/find-a-tutor/[slug]` | **25** | n/a (DB-only, admin-written bios) |

Actual total: **181 programmatic pages**, not ~240+. Good news buried in this correction: content coverage is already 100% — every published course and every subject has a hand-written differentiation paragraph and FAQ set. The problem is depth per page, not missing pages.

## 2. Where the words actually come from, per template

### Course pages (`app/courses/[slug]/page.tsx`)
| Block | Source | Words (avg) | Notes |
|---|---|---|---|
| "About this course" | `aboutCourseParagraph()` — synthesized from real `Course` fields (duration, lectures, instructor, learning outcomes) | ~50-70 | Already genuinely varies per course, zero duplication risk — this pattern is good and should be reused elsewhere |
| "Who this is for" | `whoThisIsFor()` — one sentence, switches on `level` | ~15-20 | Only 3 possible sentences total (Beginner/Intermediate/other) — effectively templated across ~53 pages |
| "Why a TutorA tutor" | Hand-written, `course-subject-content.ts` | **97 avg** (range 69-122) | |
| FAQ | Hand-written, `course-subject-content.ts` | **168 avg** (range 121-250, 5-6 Qs) | |
| What you'll learn | Bullet list, DB field | low prose value | |

Hand-written prose (differentiation + FAQ) averages **266 words**. Combined with synthesized/chrome text this lines up with the live-sampled 491 words on `/courses/ielts-8d4686db`. **Gap to the 800-word target: ~300-330 words/page.**

Thinnest 10 course pages (all foreign-language/instrument courses — genuinely less generic "why us" material to say, so the gap concentrates here):
```
190w  italian-0bce3f0c        212w  violin-c7b9774e
200w  korean-3be8ff00         217w  sanskrit-5eea98ab
201w  arabic-bee72fa4         219w  dance-8f1859ae
203w  russian-7692b797        222w  german-a83fb505
205w  portuguese-4702233f
209w  japanese-34b5d228
```

### Subject pages (`app/subjects/[slug]/page.tsx`)
| Block | Source | Words (avg) | Notes |
|---|---|---|---|
| "About this subject" | **Does not exist** | 0 | Course pages have `aboutCourseParagraph()`; subject pages have no equivalent synthesized block at all — this is a structural gap unique to this template, not just "less content," and is the single biggest lever available |
| "Why a TutorA tutor" | Hand-written, `subject-content.ts` | **87 avg** (range 48-152) | |
| FAQ | Hand-written, `subject-content.ts` | **121 avg** (range 57-207, 3-5 Qs) | Fewer/shorter FAQs than course pages |
| What you'll learn | Bullet list, `Subject.whatYoullLearn` | low prose value | |

Hand-written prose averages **208 words**, matching the 159-word live sample once you account for `gcse-maths` being on the shorter end. **Gap to the 500-600 target: ~300-400 words/page.** 3 of 103 are "chooser" router pages (ap-physics, ap-calculus, algebra) with intentionally near-zero prose — correct by design, not a defect.

Thinnest 10 (excluding the 3 intentional chooser pages):
```
107w  spanish (standard)       122w  o-level-chemistry (standard)
107w  french (standard)        122w  o-level-physics (standard)
107w  hindi (standard)         123w  finance-basics (standard)
120w  economics (standard)     123w  business-studies (standard)
120w  accounting (standard)    133w  history (standard)
```
All 10 are the "standard" template — the largest bucket (65 of 103 subjects) and the one with the least page-specific scaffolding (no guarantee link, no exam-structure framing like `service-hybrid` gets).

### Tutor profiles (`app/find-a-tutor/[slug]/page.tsx`)
No content data file exists for this template — the entire page's prose is whatever the admin typed into `TutorProfile.bio` (DB field), plus a structured "subjects taught" list that isn't prose. There is no synthesized fallback paragraph beyond a 1-sentence structured summary used only when `bio` is empty (`tutorIntroParagraph()`, line 46 of the page file). This means:
- Depth is 100% dependent on admin bio-writing habits, not code.
- The "bios follow a near-fixed closing-sentence template" finding in `content.md` can't be verified by static analysis (bios live in Postgres, not this repo) — flagged as plausible but unconfirmed at scale; only the 1-2 sampled profiles are independently verified.

## 3. The near-duplicate sentence, quantified

`content.md` describes one templated sentence "repeated across ~240+ pages." Grepped directly: the phrase **"based in India"** appears 76 times combined across both data files (expected — it's a true, relevant fact for most pages). But the *exact trailing clause* repeats verbatim far more than natural variation would produce:

| Exact closing clause | Verbatim occurrences |
|---|---|
| "...predominantly based in India and go through our team's review process before ever being matched — their profile lists their real background, so nothing about who you're working with is a guess." | **16** |
| "...predominantly India-based, with real project and language experience listed on their own profile — reviewed by our team before ever being matched." | **9** |
| "...predominantly based in India, reviewed before being matched rather than assigned automatically — their profile shows their actual coding background." | **8** |
| "...predominantly India-based and reviewed ahead of time, not assigned at random — their profile shows who they actually are." | **6** |

**40 of 156 course+subject entries (26%) end on one of 4 identical sentences.** This is the concrete, machine-checkable version of the audit's duplicate-content flag — real, but narrower than "~240 pages": it's ~40 pages sharing a closing clause, not the whole paragraph, and not all 156.

## 4. Root cause

Two different problems, requiring two different fixes:

1. **Structural gap (cheap, safe, scalable):** subject pages lack the synthesized "about this [subject]" paragraph that course pages already have. Adding an equivalent — driven by real `Subject` fields (`gradeLevel`, `curriculum`, `durationLabel`, `whatYoullLearn`, price) the same way `aboutCourseParagraph()` works — closes part of the gap on all 103 pages with zero hallucination risk and no new duplicate-content risk, since it's field-driven prose, not shared template text.
2. **Content-volume gap (real writing work):** even with #1, subject pages need ~200-250 more words of genuine editorial content, and course pages need ~250-300 more, to hit the stated targets. This has to be actual differentiated writing — curriculum specifics, exam-board nuance, "who this is for" beyond one sentence, common sticking points — per `content.md` recommendation #3. There is no way to synthesize this safely from existing structured fields without either (a) hallucinating subject-specific facts the codebase's own conventions explicitly forbid (see the "no invented...curricula" comment at the top of `course-subject-content.ts`), or (b) adding more shared/templated sentences, which would make problem #3 (duplication) worse, not better.

## 5. What #2 actually requires

53 course pages + 103 subject pages = 156 entries needing new unique prose. At ~250-350 words each, that's roughly **45,000-55,000 words of new, page-specific editorial content** — grounded facts only (real exam structures, real grade-level context, real skill breakdowns), one entry at a time, following the same "no invented TutorA-specific claims" rule already governing this file. That's a large writing effort best run in scoped batches rather than one pass:

- **Pilot batch** (recommended first step): 5-10 pages across different templates (a language course, a test-prep course, a `standard` subject, a `service-hybrid` subject, a `practical-mentor` subject) written to full target depth, for you to sign off on voice/structure before the pattern is repeated 150+ more times.
- Tutor profiles are out of scope for a code change — the fix there is either an admin bio-writing pass (human task, same category as the "add real tutor photos" item already deferred in the main audit) or a synthesized supplementary section built from real `TutorSubject`/`Subject` data (no personal claims), which is a smaller, safer follow-up.
