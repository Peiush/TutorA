# Step 3e — Programmatic Scale Evaluation for the Subject System

**Verdict: Do not generate new programmatic pages at this time.**

## What was considered

1. **Subject × city** (e.g. "AP Physics 1 tutor in Mumbai")
2. **Subject × specific grade number** (e.g. "Algebra I tutor for Grade 7" as a page separate from the existing "Algebra I" Grades 6-8 page)

## Why both fail the quality gate

**Subject × city**: TutorA's `TutorProfile` model stores `country` only — no city-level location field exists, and matching is subject-based, not geography-based (tutors teach online, worldwide). Generating "[subject] tutor in [city]" pages with no real city-specific tutor data, pricing, or availability behind them would be the textbook penalty-risk pattern this skill explicitly flags: *"Location pages with only city name swapped in identical text."* There is no real data source to make these pages genuinely unique per city — building them now would mean fabricating local relevance that doesn't exist, which conflicts with this project's no-fabrication rule throughout every prior phase.

**Subject × specific grade number**: The 103 subject pages are already the real, human-curated differentiation layer — each row has genuine distinguishing facts (curriculum, grade *band*, duration, learning outcomes) confirmed via 61 real SERP checks in Step 3a. Slicing an already-narrow band (e.g. "Grades 6-8") into three separate single-grade pages would not add real distinguishing content — the actual tutoring content for Algebra I doesn't meaningfully differ between a Grade 7 and Grade 8 student in a way that would produce genuinely unique pages, not template mad-libs. This is exactly the "​<40% unique content" failure mode the skill's quality gates warn against.

## What's different here vs. a typical programmatic-SEO evaluation

The 103 subject rows are not a generated dataset — they're a curated catalog a human entered, and Step 3a's research showed the existing grade-band/curriculum splits are *already* validated by real SERP evidence (GCSE vs IGCSE vs A-Level Chemistry, for example, show near-zero overlap — genuinely three distinct search intents). The system passed the "would this page be worth publishing even if no other similar pages existed?" test at its *current* granularity. Slicing further is solving a problem that doesn't exist yet.

## When to revisit

- **City pages**: only if TutorA adds real city-level tutor location/availability data to the schema (not before), and only after validating real local search demand — not before.
- **Grade-number pages**: only if a future SERP-overlap check (mirroring Step 3a's methodology) finds specific subjects where individual-grade search intent genuinely diverges from the grade-band intent already served — a real research question, not an assumption to build against now.

## Recommendation

Redirect any further scaling effort toward finishing what's already justified: the Step 3c content build for the existing 103 pages. Revisit this evaluation after that ships and has had time to show real search performance — scaling a validated system is safer than scaling an unvalidated one.
