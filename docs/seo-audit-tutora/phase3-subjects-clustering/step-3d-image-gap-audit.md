# Step 3d — Image Gap Audit: /subjects/[slug] Pages

**No images generated in this step — audit and prompt-plan only, per instruction.**

## Current state (103 pages)

| Asset | Status |
|---|---|
| Subject hero image | Generic `SubjectIllustration` SVG medallion — only 3 visual variants total (one per grade-band color), identical shape/icon across all 103 pages regardless of subject |
| Tutor headshots (in the new live tutor grid) | None — tutor cards show name/country/experience/bio as text only, no image at all |
| OG/social preview image | Inherits the site-wide default `opengraph-image` — not subject-specific |
| Schema `image` property | Not set on the `Course` JSON-LD for subject pages (correctly omitted, since there's no real image to point to — this mirrors the same deliberate omission already made for the `sameAs` field elsewhere in this project rather than pointing at a placeholder) |

This is the same gap the Course pages have — never addressed there either (flagged in this project's original audit, never built). Subjects inherit it, not a new problem.

## What's blocked on the business (cannot generate)

**Real tutor headshots.** Per the explicit constraint carried through every phase of this project: no AI-generated avatars presented as if they were real tutor photos. The live tutor grid (Step 3c) already ships correctly with no image at all rather than a fabricated one — this is deliberate, not an oversight, and stays this way until real photos exist. When they do, wiring them in is a small, mechanical change (`TutorProfile` already has no photo field — would need a real one added, then referenced from `getTutorsForSubject`'s query and rendered on both `/subjects/[slug]` and `/find-a-tutor/[slug]`).

**Real classroom/subject-specific photography** (e.g. an actual photo representing an AP Chemistry session) — same rule, not generated, would need to come from the business if ever wanted.

## What CAN be generated now — decorative, not impersonating anything real

Abstract/decorative subject-category imagery is a different case: it doesn't claim to be a real person, a real classroom, or a real event, so it doesn't carry the same fabrication risk as a tutor headshot. If TutorA wants to move past the single-medallion-SVG treatment, a real generation plan (using the `seo-image-gen` interactive skill, `/seo image-gen` commands, once explicitly requested) would look like:

| Asset | Spec | Notes |
|---|---|---|
| Per-curriculum-family hero art | `4:3`, 1K, Product/Editorial mode | One real illustration per curriculum family (AP, IB, A-Level, GCSE, IGCSE, SAT/ACT, programming, languages, music, general academic) — ~10 distinct images covering all 103 pages via shared curriculum grouping, not 103 individual generations. Abstract/symbolic (e.g. a stylized open textbook + subject-relevant motif), explicitly not a rendering of a real person. |
| Subject-page OG image | `16:9`, 1K, UI/Web mode | Dynamic per-subject, same pattern already shipped for Course pages (`opengraph-image.tsx`) and tutor profiles — this one's genuinely a code task, not an image-generation task, since it composites real text (subject title, grade level) over a template, not a generated photo. Should reuse the existing dynamic-OG-image pattern rather than generating 103 static images. |
| Schema `ImageObject` | Points at whichever of the above ships | Only add once a real image exists — don't point schema at a placeholder |

## Recommendation

1. **Don't generate anything yet.** This audit exists so the decision is informed, not to trigger spend.
2. **The OG-image gap is the highest-value, lowest-risk fix** if any of this gets prioritized — it's a code task (dynamic composition, like the Course/tutor pages already have), not an AI-generation task, and it's real, checkable SEO value (social preview quality) rather than decorative.
3. **Real tutor headshots remain the actual blocker** for the highest-trust-value imagery (a face next to a bio converts better than text alone) — that's a business/ops ask, same as it's been since Phase 3 for courses, not something this step can resolve.
