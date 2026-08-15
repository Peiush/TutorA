# Schema Markup Re-Audit — TutorA (tutora.it.com)

**Audit date:** 2026-08-14
**Baseline for comparison:** 88/100 (2026-08-10) — `docs/seo-audit-tutora/findings/schema.md`
**Method:** Source review of `app/subjects/[slug]/page.tsx`, `app/courses/[slug]/page.tsx`, `app/find-a-tutor/[slug]/page.tsx`, `app/request-a-tutor/page.tsx`, `app/layout.tsx`, and `prisma/schema.prisma`/`prisma/seed.ts`, cross-checked against **live** JSON-LD extraction (`render_page.py --json-ld-output`) on production `https://www.tutora.it.com` for:
- `/subjects/11-maths` (real, expanded content)
- `/courses/hindi-language-course-459bc4ba` (real, expanded content)
- `/find-a-tutor/sudipto-ffbf5742` (real tutor profile)
- `/request-a-tutor` (newly fixed page)
- Raw-HTML `aggregateRating` sweep of 12 live `/courses/[slug]` URLs from the current sitemap.

## Category Score: 93 / 100 (baseline: 88 / 100, **+5**)

---

## 1. Targeted Fix Verification

### 1a. `/subjects/[slug]` BreadcrumbList "Courses" → "Subjects" mislabel — **CONFIRMED FIXED** ✅
This was the headline defect from the 08-10 audit (Issue 1, Moderate), present across all 103 `/subjects/[slug]` pages. Re-checked both in source and live production:

- **Source** (`app/subjects/[slug]/page.tsx`, lines 259–267): `breadcrumbJsonLd` now reads `{ position: 2, name: "Subjects", item: "${BASE_URL}/subjects" }`.
- **Live** (`/subjects/11-maths`, fetched from production): confirms the fix is deployed, not just committed:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tutora.it.com" },
    { "@type": "ListItem", "position": 2, "name": "Subjects", "item": "https://www.tutora.it.com/subjects" },
    { "@type": "ListItem", "position": 3, "name": "11+ Maths", "item": "https://www.tutora.it.com/subjects/11-maths" }
  ]
}
```
Breadcrumb now correctly matches the page's own URL hierarchy (`/subjects/11-maths`), consistent with the pattern on `/courses/[slug]` and `/find-a-tutor/[slug]`. This is the largest single driver of the score increase.

### 1b. `/request-a-tutor` — **CONFIRMED FIXED, schema now present and valid** ✅
Live extraction shows 4 JSON-LD blocks (plus sitewide Organization/WebSite from `layout.tsx` = a full 5 total): `BreadcrumbList` (2-level, `Home > Request a Tutor`), `WebPage` (with `isPartOf`, `about`, `audience`), and `FAQPage` (7 Q&A pairs matching the page's visible `RequestFaq` content). All blocks validate: absolute URLs, `https://schema.org` context, ISO 8601 `dateModified`. No placeholder text, no type mismatches.

---

## 2. Expanded-Content Pages — Schema Still Matches Content

### `/courses/[slug]` (sample: Hindi Language Course)
`Course` + `CourseInstance` (`courseMode: Online`, `courseWorkload: PT60H`) + `Offer` + `BreadcrumbList` (correct `Home > Courses > [Course]`) + `FAQPage` (7 Q&A, all reflecting the expanded on-page content — script/Devanagari, heritage-learner framing, gender agreement — not generic filler). All 5 blocks (incl. sitewide Organization/WebSite) valid.

### `/subjects/[slug]` (sample: 11+ Maths)
`Course` (with `educationalLevel: "Grades 5-6"`) + `Offer` + `BreadcrumbList` (fixed, see 1a) + `FAQPage` (6 Q&A, subject-specific — exam board, calculator policy, non-verbal reasoning — matching the expanded `subjectDetail`/`differentiation` content on the page). All valid.

### `/find-a-tutor/[slug]` (sample: Sudipto)
`Person` with `name`, `description` (matches the visible bio verbatim — no divergence), `url`, `knowsAbout` (3 subjects, matches the skill-pill chips on page), `worksFor` → `Organization`. Plus `BreadcrumbList` (`Home > Find a Tutor > Sudipto`). No content/schema mismatch found — the `description` field is sourced directly from `tutor.bio`, so it can't drift from the rendered page.

**No schema/content mismatches were introduced by the content expansion on any of the three templates.** Field sourcing in all three (`subjectJsonLd`, `courseJsonLd`, `personJsonLd`) pulls from the same data objects that back the visible H1/description/FAQ accordion, so there's no separate "SEO-only" copy that could go stale.

---

## 3. Outstanding Issues (unchanged from baseline — not regressions, not yet addressed)

### Issue 2 — `Course` schema inconsistency between `/courses/[slug]` and `/subjects/[slug]` (Minor, unchanged)
Still present: `/courses/[slug]` includes `hasCourseInstance` (`courseMode`, `courseWorkload`); `/subjects/[slug]` only has `educationalLevel`, no `hasCourseInstance`. Confirmed via both source (`subjectJsonLd` in `app/subjects/[slug]/page.tsx` lines 240–257 has no `hasCourseInstance` branch) and the live `/subjects/11-maths` fetch above. Recommended fix (unchanged from baseline):
```json
"hasCourseInstance": { "@type": "CourseInstance", "courseMode": "Online" }
```
added conditionally to `subjectJsonLd`, mirroring the course-page pattern.

### Issue 3 — Tutor `Person` schema missing `image` (Minor/Opportunity, unchanged — and confirmed structurally blocked)
Still absent from `personJsonLd` in `app/find-a-tutor/[slug]/page.tsx`. New finding this pass: `TutorProfile` in `prisma/schema.prisma` has **no image/avatar/photo column at all** — the on-page avatar (`TutorAvatar`) is a generated initials graphic, not an uploaded photo. So this can't be fixed by just adding a JSON-LD field; it requires a DB schema change (add a photo upload field) before an `image` property would have real data to point to. Recommend deferring until/unless tutor photo uploads ship as a product feature — do not fabricate a placeholder image URL.

### Issue 4 — Homepage single-item BreadcrumbList (Cosmetic, unchanged, not re-verified this pass — low priority, no action needed)

### FAQPage — Info only, per current policy (unchanged)
Present on `/subjects/[slug]`, `/courses/[slug]`, `/request-a-tutor`, homepage, `/about`, `/courses` hub, `/find-a-tutor` hub. Google retired FAQ rich results for all sites (2026-05-07); no SERP benefit. Flagged Info priority only — do not remove (unconfirmed but plausible AI/GEO value, no downside to keeping).

---

## 4. New Check This Pass — Fabricated/Demo Review Data Risk (Investigated, No Live Issue Found)

Because the score depends partly on `aggregateRating` eligibility, and `prisma/seed.ts` contains a `DUMMY_COURSES` block with large hardcoded `reviewCount` values (1204, 856, 3120, etc.) attached to instructor emails at `*.demo@tutorconnect.dev` — a pattern that would be a real Google structured-data policy violation (fabricated review counts) if it were live — this was explicitly checked:

- None of the `DUMMY_COURSES` titles ("Calculus Foundations…", "Physics Mechanics…", "Python Programming: Zero to Projects", "Conversational Spanish…") appear in the live 191-URL sitemap.
- Live raw-HTML sweep of 12 real `/courses/[slug]` pages from the sitemap: **zero** contained an `aggregateRating` block. This is consistent with the `Course.reviewCount` DB default of `0` — the `courseJsonLd` template only emits `aggregateRating` when `course.reviews > 0` (`app/courses/[slug]/page.tsx` line 279), and real courses currently have `reviewCount = 0`.

**Conclusion: no live fabricated-rating issue.** The dummy data is local/seed-only and never reached production. Flagging as a **process risk to watch**, not a current defect: if a real course is ever given a nonzero `reviewCount` without backing genuine reviews (there is no `Review` model in the schema — `rating`/`reviewCount` are freeform admin-entered numbers, not aggregated from a reviews table), that page's `aggregateRating` would violate Google's review-snippet guidelines the moment it goes live. Recommend either (a) gating `aggregateRating` emission on a future real `Review` model, or (b) adding an admin-side warning that `reviewCount` must reflect genuine collected reviews before publishing.

---

## 5. Score Rationale

| Change since 08-10 baseline | Effect |
|---|---|
| `/subjects/[slug]` breadcrumb "Courses"→"Subjects" fixed sitewide (103 pages), confirmed live | **+5** (was the single largest defect at baseline) |
| `/request-a-tutor` now has valid BreadcrumbList + WebPage + FAQPage, confirmed live | Contributes to the fix; no separate deduction remains |
| Content expansion on `/courses/[slug]`, `/subjects/[slug]`, `/find-a-tutor/[slug]` | No mismatches introduced — neutral |
| Issue 2 (Course/CourseInstance inconsistency) | Still open — same minor deduction as baseline |
| Issue 3 (tutor `image` missing) | Still open, now confirmed structurally blocked at the DB level — same minor deduction |
| Issue 4 (homepage 1-item breadcrumb) | Still open, cosmetic — same negligible deduction |
| FAQPage sitewide | Info-only per policy — no score effect either direction |
| Demo/dummy `aggregateRating` risk | Investigated, confirmed not live — no deduction, informational only |

**93 / 100** — up from 88/100. Remaining ~7 points reflect the two still-open minor consistency/enrichment items (Issues 2 and 3) plus general headroom (no `Review`/genuine `AggregateRating` data, no `VideoObject`, cosmetic homepage breadcrumb) rather than any new defect.
