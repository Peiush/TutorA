# Performance / Core Web Vitals Re-Audit — tutora.it.com (2026-08-14)

**Category Score: ~84 / 100** (average of 8 pages, PSI Lighthouse mobile) — **up from 67/100** (2026-08-10 baseline)

**Method:** PageSpeed Insights API v5 (Lighthouse 13.x, mobile, simulated throttling), run via `claude-seo run pagespeed_check.py <url> --json`, against the live site. CrUX field data is still unavailable for this origin (`"error": "No CrUX data for this origin. The site likely has insufficient Chrome traffic volume for eligibility."`) — same limitation as the 08-10 baseline, so this remains a lab-only assessment. Note: the 08-10 baseline used local Lighthouse CLI 12.8.2 against a local headless Chrome instance rather than PSI's Google-hosted Lighthouse runner; absolute score/metric values are not perfectly apples-to-apples across the two methodologies, but the relative direction of change is the meaningful signal, and PSI is the more standard/reproducible method going forward.

Eight pages tested per the requested scope (home, `/courses`, `/find-a-tutor`, `/subjects` hub pages were previously untested or only partially tested; three content-heavy detail templates; `/request-a-tutor`).

## Results vs. 08-10 Baseline

| Page | Score (PSI) | LCP | TBT | CLS | DOM elements |
|---|---|---|---|---|---|
| `/` (home) | 75 | 3.7s (was 6.3s ⚠️) | 480ms (was 650ms) | 0 | 1,339 (was 1,599) |
| `/courses` | 66 | 4.7s (was 3.2s — worse) | 400ms (was 820ms) | 0 | 1,996 (was 2,018) |
| `/find-a-tutor` | 93 | 2.9s (was 5.5s ⚠️) | 170ms (was 1,370ms) | 0 | 1,250 (was 5,456 — huge drop) |
| `/subjects` | 90 | 2.9s (not tested before) | 80ms | 0 | 430 |
| `/courses/python-ff654450` | 97 | 2.6s (was 2.8s) | 90ms (was 390ms) | 0 | 523 (was 376 — content grew, still small) |
| `/subjects/a-level-chemistry` | 95 | 2.6s (was 1.3s — worse, but still "Good") | 140ms (was 270ms) | 0 | 478 (was 359 — content grew) |
| `/find-a-tutor/sudipto-ffbf5742` | 96 | 2.4s (not tested before) | 130ms | 0 | 415 |
| `/request-a-tutor` | 62 | 5.9s (not tested before) | 230ms | 0 | 546 |

**Category average: (75+66+93+90+97+95+96+62)/8 = 84.25 ≈ 84/100**, up 17 points from 67/100.

## Is the previously-flagged LCP regression resolved? YES on both flagged pages.

The 08-10 report's top-priority open item was: home LCP worsened to 6.3s (from 4.04s pre-fix) and `/find-a-tutor` LCP worsened to 5.5s (from 3.0s pre-fix), both blamed on JS bootup cost from two heavy shared chunks (`2gs_85oo1bxmi.js` / `2m2rsoe8edtzl.js`) that had become the new bottleneck after a layout-thrashing fix.

- **Home LCP: 6.3s → 3.7s** — a 2.6s improvement, back into "Needs Improvement" range and much closer to the pre-fix 4.04s baseline than the regressed 6.3s. Not yet at the "Good" ≤2.5s threshold, but the regression is substantially reversed.
- **`/find-a-tutor` LCP: 5.5s → 2.9s** — a 2.6s improvement, now just above the "Good" 2.5s threshold and far better than both the regressed 5.5s and the original pre-fix 3.0s. TBT also fell from 1,370ms to 170ms and DOM size fell from 5,456 to 1,250 elements (a ~77% cut) — the previously-flagged "DOM size unaddressed" item also appears to have been fixed, likely via list virtualization/pagination of tutor cards.

Main-thread work and bootup-time diagnostics on both pages now show materially lower totals (home: 2.6s main-thread work / 1.1s bootup vs. the earlier flagged "2.2s bootup from a single chunk" figure), consistent with the heavy shared chunks having been trimmed, split, or deferred. No evidence remains in current PSI diagnostics of a single dominant oversized chunk on either page — the render-blocking-insight and long-tasks audits on both pages are now unremarkable (home: 1 render-blocking CSS resource costing 152ms; 5 long tasks, none individually flagged as extreme).

**Conclusion: the LCP regression is resolved.** Both previously-regressed pages are now faster than they were even in the original (pre-regression) baseline on TBT/TTI, and LCP has recovered close to or past the "Good" threshold.

## New issue: `/courses` LCP got worse (3.2s → 4.7s)

This was NOT flagged as an issue in the prior audit (it scored 72/100, LCP only slightly worse at 3.2s vs 2.9s). It has now regressed further to 4.7s, moving the page into "Needs Improvement" territory and dropping its category score to 66. TBT/bootup-time diagnostics are unremarkable (mainthread-work-breakdown 2.5s, bootup-time 1.1s — similar magnitude to home/find-a-tutor), so this looks like the same class of issue (LCP element render delay / late resource discovery) rather than a new distinct cause. Total page weight (738 KiB) is comparable to other hub pages, ruling out a payload-size explanation. Needs LCP-breakdown-insight-level investigation (TTFB / resource load delay / resource load time / element render delay split) to pinpoint the exact stage.

## New issue: `/request-a-tutor` is the worst-performing page tested (score 62, LCP 5.9s)

Not covered in the 08-10 baseline. LCP of 5.9s is solidly "Poor" (>4.0s threshold), with Speed Index also poor at 7.6s. TBT (230ms) and DOM size (546 elements) are unremarkable, and page weight (735 KiB) is in line with other pages — again pointing to LCP-specific delay (likely a form/hero element waiting on client-side hydration or a slow-loading above-the-fold image) rather than a general main-thread or payload problem. This is a conversion-critical page (lead-gen form) and should be prioritized despite not being part of the original flagged regression.

## Content-heavy detail pages (courses/subjects/tutor `[slug]`): no CWV problems from the added prose

The concern going into this audit was that new word-count/prose added to `/courses/[slug]`, `/subjects/[slug]`, `/find-a-tutor/[slug]` detail pages might have introduced CLS (unreserved space for new content) or DOM-size bloat. Results say no:

- **CLS is 0 across all three detail templates** (and all 8 pages tested) — no evidence of layout shift from the newly added prose sections. Content appears to be server-rendered/present at initial paint rather than injected late without reserved space.
- **DOM size grew but stayed small**: course-detail 376→523 elements, subject-detail 359→478 elements — both still far under the 1,500-element guideline, nowhere close to a performance risk.
- **Scores are excellent**: 97, 95, 96 respectively — these are the best-performing page types on the site, LCP 2.4–2.6s ("Good" or right at the edge), TBT 90–140ms.

The added content weight has not created a CWV regression on these templates. They remain the strongest-performing page type on the site.

## Findings & Priority

1. **[High]** `/request-a-tutor` — LCP 5.9s (Poor), Speed Index 7.6s. This is a lead-generation form page; investigate LCP element (likely hero/form) render delay. Highest business-impact page not yet optimized.
2. **[High]** `/courses` — new LCP regression to 4.7s (was 3.2s, "Needs Improvement" bordering "Poor"). Run LCP-breakdown-insight to isolate TTFB vs. resource-load-delay vs. element-render-delay; not explained by TBT or payload size.
3. **[Medium]** Home (3.7s) and `/find-a-tutor` (2.9s) — the previously-flagged regression is resolved but neither is fully in "Good" territory yet; continue trimming/splitting the shared JS chunks and consider preloading the LCP image/hero text resource for the last push under 2.5s.
4. **[Low]** Detail-page templates (`courses/[slug]`, `subjects/[slug]`, `find-a-tutor/[slug]`) — no action needed; added content has not degraded CWV. Continue monitoring as more content is added.
5. **[Info]** CrUX field data still unavailable (site below Chrome UX Report traffic threshold) — all scores in this report and the 08-10 baseline are lab-only. Re-validate with real-user data via CrUX Vis or the CrUX API once traffic qualifies.

## Raw Data

PSI JSON responses (mobile strategy):
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/home.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/courses.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/find-a-tutor.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/subjects.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/course-detail.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/subject-detail.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/tutor-detail.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/52d63ea2-45cc-4c51-b3de-6d1d15c20833/scratchpad/psi/request-a-tutor.json`

Note: this is a session-scoped scratchpad path and will expire; re-run the PSI commands above to regenerate if needed for future audits.
