# Performance / Core Web Vitals Audit — tutora.it.com (RE-AUDIT)

**Category Score: ~67 / 100** (average of 5 pages) — up from **30/100** baseline

**Method:** Lighthouse 12.8.2 CLI, mobile form factor, simulated throttling, against local headless Chrome 151 (no CrUX field data — API credentials not configured; PSI/CrUX Vis validation recommended once available). Five pages tested (added `/subjects/[slug]` per the new Phase 3 template).

## Results vs. Baseline

| Page | Score | LCP | TBT | CLS | TTI | DOM elements |
|---|---|---|---|---|---|---|
| `/` (home) | 45 (was 40) | 6.3s ⚠️ WORSE (was 4.04s) | **650ms** (was 6,340ms) | 0 | **6.7s** (was 19.6s) | 1,599 |
| `/courses` | 72 (was 55) | 3.2s (was 2.9s, slightly worse) | **820ms** (was 2,280ms) | 0 | 5.6s | 2,018 |
| `/find-a-tutor` | 45 (was 52) | 5.5s ⚠️ WORSE (was 3.0s) | **1,370ms** (was 4,890ms) | 0 | 8.5s | 5,456 (was 4,544 — grew) |
| `/courses/python-ff654450` | 81 (was 68) | 2.8s (~flat) | **390ms** (was 810ms) | 0 | 4.7s | 376 |
| `/subjects/a-level-chemistry` (new template) | 94 | 1.3s (Good) | 270ms | 0 | 4.9s | 359 |

## Was the layout-thrashing fix effective? YES — dramatically.

The Phase 1 fix (scroll-reveal component causing forced synchronous layout) worked. Lighthouse's `forced-reflow-insight` now shows total reflow time of ~200-400ms per page (attributed to `2gs_85oo1bxmi.js` / `2m2rsoe8edtzl.js`), down from 2,000-4,600ms per chunk previously. TBT fell 85-90% on every page (home: 6,340ms→650ms; find-a-tutor: 4,890ms→1,370ms; courses: 2,280ms→820ms; course detail: 810ms→390ms) and homepage TTI collapsed from 19.6s to 6.7s. This was correctly identified as the highest-leverage fix and it delivered.

## New bottleneck: LCP got worse on home/find-a-tutor

With reflow no longer dominant, `lcp-breakdown-insight` shows the LCP text paragraph's **element render delay** is now the largest cost (home: 3.9s of 6.3s LCP; find-a-tutor: 1.3s of 5.5s). `mainthread-work-breakdown` on home shows Script Evaluation (2.05s) and Style/Layout (1.9s) as the two biggest buckets, with `2gs_85oo1bxmi.js` alone costing 2.2s of bootup time (1.2s pure scripting) — likely a *different* heavy shared chunk than the original culprits, now the dominant blocker of first paint. `/find-a-tutor`'s DOM size also grew to 5,456 elements (was 4,544) — still ~3.6x the 1,500 guideline, unaddressed.

## Findings & Priority

1. **[Critical]** Investigate `2gs_85oo1bxmi.js` (home) / `2m2rsoe8edtzl.js` (courses, find-a-tutor) bootup cost — code-split or defer non-critical work so it stops blocking LCP paint of already-available text.
2. **[High]** `/find-a-tutor` DOM size (5,456 elements) — still unaddressed; virtualize/paginate tutor cards.
3. **[Medium]** Residual forced reflow (~200-400ms) remains in the same two chunks; not urgent but worth a follow-up cleanup.
4. **[Low]** Legacy JS transpilation — not re-checked this pass; low priority.

## Raw Data

Lighthouse JSON reports:
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/cbe761f6-81b1-4d7d-a448-b6fc8d8de76a/scratchpad/lighthouse/home.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/cbe761f6-81b1-4d7d-a448-b6fc8d8de76a/scratchpad/lighthouse/courses.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/cbe761f6-81b1-4d7d-a448-b6fc8d8de76a/scratchpad/lighthouse/find-a-tutor.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/cbe761f6-81b1-4d7d-a448-b6fc8d8de76a/scratchpad/lighthouse/course-detail.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/cbe761f6-81b1-4d7d-a448-b6fc8d8de76a/scratchpad/lighthouse/subject-detail.json`

Note: prior baseline report used a different scratchpad session path (now expired); this re-audit's raw JSON is at the paths above.
