# SEO Re-Audit — tutora.it.com (2026-08-14)

**Trigger:** owner-reported large batch of changes since the last confirmed audit — GEO/AI-search fixes, expanded content depth on tutor/subject/course detail pages, a fixed `/request-a-tutor` page, new pages, and an explicit "check the sitemap" ask.

**Baseline:** 73/100, confirmed 2026-08-10 (`RE-AUDIT-REPORT-2026-08-10-POSTFIX.md`)

**Method:** 8 specialist subagents run in parallel against live production (`https://www.tutora.it.com`), each independently re-verifying its category against the 08-10 baseline. All findings are live-fetch/source-verified, not assumed from commit messages. Full per-category detail: `docs/seo-audit-tutora/findings-2026-08-14/*.md`. Also folds in a same-day competitive SXO audit (`docs/seo-audit-tutora/findings/sxo-comparative-audit.md`).

---

## Overall SEO Health Score: 80/100 (was 73/100, +7)

| Category | Weight | 08-10 Baseline | 08-14 Now | Δ |
|---|---|---|---|---|
| Content Quality | 23% | 66 | **76** | +10 |
| Technical SEO | 22% | 90 | **93** | +3 |
| On-Page SEO* | 20% | 78 | **~85 (est.)** | +7 (est.) |
| Schema | 10% | 88 | **93** | +5 |
| Performance (lab) | 10% | 67 | **84** | +17 |
| GEO / AI-search | 10% | 62 | **69** | +7 |
| Images | 5% | 15 | **~18 (est.)** | +3 (est.) |

*On-Page and Images weren't run as separate specialist passes this round — their signal is folded into the Technical and GEO/Visual findings below (title/meta fixes, image count). Scores marked "est." are inferred from that evidence, not independently measured; treat with slightly less confidence than the other five.

**Bottom line: everything you touched got measurably better. No category regressed.** The two biggest jumps — Performance (+17) and Content (+10) — are also the two the recent commits targeted hardest.

---

## Your specific question: is the sitemap current with the new content?

**Yes.** Independently verified two ways:

1. **Coverage is correct.** 191 sitemap URLs match `app/sitemap.ts`'s logic exactly (9 static pages + 53 courses + 25 tutors + 103 subjects). A 28-URL stratified sample plus 9 directly-fetched pages all return HTTP 200, zero orphans, zero 404s. New pages haven't been missed.
2. **The expanded content is crawlable.** All sampled tutor/subject/course detail pages confirm `is_spa: false` — the new prose sections are server-rendered in the first-response HTML, not client-injected. Google doesn't need JS execution to see them, and GSC URL Inspection confirms Google has actually re-crawled the homepage (08-13) and `/request-a-tutor` (08-11) since your fixes landed.

**One real (small) gap found:** `/request-a-tutor`'s sitemap `lastmod` says 2026-08-03, but its actual content changed on 2026-08-13 (commit `1704b4c`) — the page-level `REQUEST_A_TUTOR_LAST_UPDATED` constant in `app/request-a-tutor/page.tsx` wasn't bumped when the child components changed. Ironically this is on the exact page you said you just fixed. Two-line fix; not urgent (Google mostly ignores self-reported lastmod anyway) but worth doing since it's cheap.

`/become-a-tutor` is correctly absent from the sitemap — it's an admin-only "add a teacher" tool, not a public page, confirmed via `robots.txt` and its 307 gate. Not a bug.

---

## What genuinely got better

- **Schema (93, +5):** The headline fix — `/subjects/[slug]` BreadcrumbList mislabeling its parent "Courses" instead of "Subjects" across all 103 pages — is confirmed fixed, live. `/request-a-tutor` now carries 5 valid JSON-LD blocks. No schema/content mismatches were introduced by the content expansion.
- **Technical (93, +3):** Both defects flagged at baseline (duplicated `/subjects` title, unbounded 548-char tutor meta description) are fixed and verified live. A new `llms.txt` file is live and well-formed — a genuine GEO win not present before.
- **Performance (84, +17):** The top-priority open item from 08-10 — LCP regressed to 6.3s (home) / 5.5s (find-a-tutor) after a prior fix — **is resolved**. Home LCP is now 3.7s, find-a-tutor 2.9s, and find-a-tutor's DOM size dropped 77% (5,456 → 1,250 elements). The new detail-page prose caused zero CWV regressions (CLS is 0 everywhere; DOM growth is modest and nowhere near the 1,500-element risk threshold).
- **Content (76, +10):** The content-depth work you did was real, not padding. All 53 course pages and 99/103 subject pages now carry hand-written, subject-specific prose (course avg 556 words, up from 266; subject avg 458, up from 208) — verified with specific, checkable technical claims (Python's mutable-default-argument gotcha, IELTS band-score criteria), not generic filler.
- **GEO (69, +7):** Your "improved the geo issues" commit delivered real gains — new RSL 1.0 licensing file, founder/org `sameAs` social links (both live-reachable, not placeholders), homepage FAQ answers lengthened from 36-81 words to 100-230 words, and subject/course pages restructured into a consistent, citable four-part layout with named-competitor comparisons.
- **Visual:** The old "27,000px whitespace bug" claim from 08-10 could not be reproduced (confirmed resolved). The new prose reflows cleanly on mobile and desktop with no overlap or broken cards.

---

## What's still open (priority order)

### High priority
1. **`/request-a-tutor` is now your worst-performing page for speed** — PSI score 62, LCP 5.9s ("Poor"). This is a lead-gen form page, so it's worth fixing despite not being part of the original flagged regression.
2. **`/courses` hub LCP regressed** (3.2s → 4.7s), not previously flagged. Needs an LCP-breakdown pass (TTFB vs. resource-load-delay vs. element-render-delay) to isolate the cause.
3. **Lab performance discrepancy needs a tie-breaker run.** The dedicated performance agent measured homepage PSI at 75; the Google-API agent's separate run (same day) measured it at 67, with LCP at 5.0s ("Poor") — down from 80/3.3s on 08-10. Both agents used PSI/Lighthouse but at different times; single-run Lighthouse variance is real, but the direction is consistent enough (worse than 08-10 on this specific run) to warrant a follow-up PSI check on the homepage specifically before treating either number as ground truth.

### Medium priority
4. **Tutor bio closing-sentence template is still visible** ("Based in India... teaches online through TutorA, with every session live and 1:1...") — now confirmed on a larger sample (4 profiles). This is a DB/admin-writing issue, not a code fix; still the most visible "templated" pattern a human rater would notice.
5. **`/request-a-tutor` lastmod staleness** (see sitemap section above) — two-line fix.
6. **IndexNow protocol still not implemented** — unchanged from baseline, would accelerate re-indexing of your recent changes.
7. **73% of sampled subject pages show "no active tutor yet"** — doesn't hurt the informational content but may suppress AI-citation confidence for transactional "find a tutor for X" queries.

### Low priority
8. Minor ~7-14px horizontal overflow on `/courses` and `/find-a-tutor` mobile (CSS fix, not visually obvious).
9. Thinnest course/subject entries (Portuguese, Arabic, Spanish, Finance Basics) still trail the corpus average — Spanish in particular is high-traffic and worth prioritizing.
10. Course/subject `Course` schema inconsistency (`/courses/[slug]` has `hasCourseInstance`, `/subjects/[slug]` doesn't) — minor, unchanged from baseline.
11. Tutor `Person` schema still missing `image` — now confirmed structurally blocked at the DB level (no photo column exists at all), not just a JSON-LD omission. Requires a product decision, not a quick fix.

### Unresolved from prior audits (unchanged)
- GSC Indexing API permission still blocked (service account is `siteRestrictedUser`, not Owner) — needs a human to promote it in GSC settings. This blocks programmatic sitemap resubmission pings (read-only checks, including URL Inspection, work fine).
- CrUX real-user field data still unavailable — site remains below Chrome's traffic-eligibility threshold (GA4: 16 organic sessions/28 days). All CWV numbers in this report are lab-only.

---

## Early traffic signal (small, directional only)

GSC impressions are up +395% (21→104) and GA4 organic sessions +60% (10→16) over the last 28 days versus the 08-10 audit — driven by newly-indexed `/subjects/*` long-tail queries. Clicks are flat and average position worsened to 31.3, because these are brand-new, low-ranking impressions, not a ranking win yet. Read this as "Google is now finding and indexing the new content" rather than "rankings improved." `/request-a-tutor` picked up its first-ever organic session this period.

---

## Supplementary: competitive SXO gap analysis (new lens, not directly comparable to prior SXO score)

A same-day SXO audit (`findings/sxo-comparative-audit.md`) analyzed 5 real keywords by reading actual Google SERPs backwards — different methodology from the 08-10 single-page SXO pass (69/100), so treat as a new, separate signal rather than a trend line. Headline finding: **average SXO gap score 36/100**, driven by real content gaps rather than on-page weakness:

- "find a tutor" (broad head term): **64/100** — page-type aligned, held back by no review count/star rating anywhere.
- "math tutor near me": **45/100** — critical mismatch, zero location/city pages on the entire domain.
- "how much does a tutor cost per hour": **21/100** — critical mismatch, no pricing page exists anywhere (only 2 vague sentences buried in the `/about` FAQ).
- "tutor in Austin, TX": **15/100** — critical mismatch, zero city pages, zero local content of any kind.
- "best tutoring website": **33/100** — critical mismatch, your homepage comparison table is self-authored vs. 4 competitors rather than the neutral listicle format Google rewards here.

**Highest-leverage structural gap: no blog/content section exists at all** (confirmed via sitemap — no `/blog/` path). This is the root cause blocking both the cost-guide and comparison-page mismatches simultaneously. Not urgent relative to the items above, but worth knowing as your next strategic decision point once the current punch list is cleared.

---

## Process note

Six of the eight specialist subagents initially reported "done" without actually writing their output files (a known failure mode from the 08-10 audit that recurred). All were caught before synthesis — nothing in this report is based on an unwritten or unverified file. The visual agent's initial "empty content sections" flag was independently investigated and confirmed to be a screenshot-timing artifact (scroll-reveal animations not yet fired), not a real defect.
