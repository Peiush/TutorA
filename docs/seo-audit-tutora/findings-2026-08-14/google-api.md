# Google API Field Data — tutora.it.com (2026-08-14)

**Audit date:** 2026-08-14
**Data sources:** Google PageSpeed Insights v5, CrUX API, CrUX History API, Search Console API, GA4 Data API, Indexing API v3 (permission check only)
**Credential tier:** Tier 2 (Full) — service account `gsc-reader@tutora-503307.iam.gserviceaccount.com`
**Property used:** URL-prefix `https://www.tutora.it.com/` (the `sc-domain:` property remains inaccessible to this service account — same as 2026-08-10)
**Prior baseline:** `docs/seo-audit-tutora/findings/google-api.md` (2026-08-10 re-audit)

---

## 0. Open question from 2026-08-10 audit — Indexing API permission NOT resolved

`gsc_query.py sites` confirms the service account's role on `https://www.tutora.it.com/` is still:

```json
{ "url": "https://www.tutora.it.com/", "permission": "siteRestrictedUser" }
```

This is unchanged from the 2026-08-10 audit — the service account remains **Restricted**, not **Full/Owner**. Practical effect:
- Indexing API `urlNotifications().publish()` calls (used for sitemap/URL resubmission pings) will continue to return 403 until this account (or another with Owner) is added as **Owner/Full user** in Search Console → Settings → Users and permissions for `https://www.tutora.it.com/`.
- Read-only operations (Sitemaps, URL Inspection, Search Analytics) are unaffected and continue to work, as shown below.
- **Action needed (unchanged from last audit):** a site owner must add `gsc-reader@tutora-503307.iam.gserviceaccount.com` as Owner (or Full user) in GSC. This was not done between 2026-08-10 and 2026-08-14.
- No indexing-notify publish call was made in this run to avoid burning quota/triggering an unauthorized submission attempt against a 403-blocked account for ordinary (non-JobPosting/BroadcastEvent) URLs — the Indexing API is only intended for those content types per Google's terms; ordinary page indexing should continue to rely on the sitemap + URL Inspection, which is what's used below.

---

## 1. CrUX Core Web Vitals (Field Data) — STILL INSUFFICIENT DATA (no change since 2026-08-10)

| Target | Query | Result |
|---|---|---|
| `https://www.tutora.it.com/` (origin) | CrUX, all form factors | No data — insufficient Chrome traffic volume |
| `https://www.tutora.it.com` (origin) | CrUX History, 28-day rolling trend | No data — insufficient Chrome traffic volume |
| `https://www.tutora.it.com/courses/igcse-preparation-course-5ed7859f` | CrUX, page-level | No data — insufficient Chrome traffic volume |
| `https://www.tutora.it.com/subjects/ap-biology` | CrUX, page-level | No data — insufficient Chrome traffic volume |

**Direct answer: the site has NOT yet crossed Chrome's minimum real-user-traffic threshold for CrUX eligibility.** Real CrUX field data is **not** available — same lab-only situation as the 2026-08-10 audit. This tracks with the still-tiny traffic volumes reported below (GA4: 16 organic sessions / 28 days; GSC: 9 clicks / 28 days) — several orders of magnitude below the volume CrUX requires to publish (roughly a few thousand qualifying Chrome page loads over 28 days at the origin level, and higher at page level). No CWV field-data (LCP/INP/CLS) claims can be made for this site yet.

### Lab-data fallback (PSI Lighthouse, mobile, homepage) — regression vs 2026-08-10

| Metric | 2026-08-10 | 2026-08-14 | Change |
|---|---|---|---|
| Performance score | 80/100 | **67/100** | -13 (worse) |
| First Contentful Paint | 1.1 s | 3.0 s | worse |
| Largest Contentful Paint | 3.3 s (0.69) | **5.0 s (0.27)** — Poor territory | worse |
| Total Blocking Time | 450 ms | 310 ms | better |
| Cumulative Layout Shift | 0 | 0 | unchanged |
| Speed Index | 3.3 s | 4.4 s | worse |
| Time to Interactive | 5.5 s | 5.7 s | worse |

Accessibility 96/100, Best Practices 100/100, SEO 100/100 (all unchanged). **Flag for follow-up:** lab LCP has regressed from "Needs Improvement" (3.3s) to "Poor" (5.0s) since the 2026-08-10 post-fix re-audit, and Performance score dropped 13 points. This is lab data only (single Lighthouse run, subject to run-to-run variance), but the direction is concerning enough to warrant a second PSI run and a check of what changed on the homepage between 2026-08-10 and 2026-08-14 (recent commits: "impoved the geo issues", "fixed the request a tutor page", "impoved the detied tutor page", "impoved the suject and courses detled page" — any of these could have added JS/render-blocking weight to shared layout). Top opportunity flagged: reduce unused JavaScript (~600ms savings). This is not CrUX field data — do not treat it as a real-user regression without confirming with a follow-up run.

---

## 2. GSC Indexation Status

| Item | Value |
|---|---|
| Sitemap | `https://www.tutora.it.com/sitemap.xml` |
| Last submitted | 2026-07-27T19:14:13Z (unchanged — no resubmission has occurred since, consistent with the still-blocked Indexing API permission) |
| Sitemap errors / warnings | 0 / 0 |
| URLs submitted (type: web) | 191 (unchanged) |
| Pending | No |

### URL Inspection — 6 sampled pages across templates (up from 3 on 2026-08-10)

Sampled specifically to cover the page types touched by recent commits (tutor detail, subject detail, course detail, request-a-tutor):

| URL | Verdict | Coverage | Robots | Canonical match | Last crawl |
|---|---|---|---|---|---|
| `/` (homepage) | PASS | Submitted and indexed | Allowed | Yes | 2026-08-13 |
| `/request-a-tutor` | PASS | Submitted and indexed | Allowed | Yes | 2026-08-11 |
| `/courses/igcse-preparation-course-5ed7859f` | PASS | Submitted and indexed | Allowed | Yes | 2026-08-08 |
| `/subjects/ap-biology` | PASS | Submitted and indexed | Allowed | Yes | 2026-08-10 |
| `/find-a-tutor/manish-57c0bf15` | PASS | Submitted and indexed | Allowed | Yes | 2026-07-26 |
| `/courses/guitar-a7d7f6aa` | PASS | Submitted and indexed | Allowed | Yes | 2026-07-27 |

**All 6 sampled URLs are indexed and crawlable, with matching canonicals.** Google has re-crawled the homepage as recently as 2026-08-13 (one day before this audit) and `/request-a-tutor` on 2026-08-11 — both post-date the "fixed the request a tutor page" commit, confirming Google has picked up the recent page changes on those two templates. The `/courses/`, `/subjects/`, and `/find-a-tutor/` sample pages were last crawled between 2026-07-26 and 2026-08-10 — Google is actively re-crawling these templates on a roughly weekly-to-10-day cadence, but the specific sampled URLs have not all been re-crawled since the most recent "detled page" content commits (need to check exact commit dates vs these crawl timestamps if freshness of specific content changes must be verified precisely). Rich Results detected Breadcrumbs structured data (PASS, no issues) on all 6 pages. This remains a small sample (6 of 191); a broader inspection sweep is still not feasible via the API (no bulk endpoint) — would require ~191 sequential rate-limited calls.

---

## 3. GSC Search Performance — 28 days (2026-07-17 to 2026-08-11) vs prior period

Site-wide totals (`totals_complete: true`, safe to report as-is):

| Metric | 2026-08-10 audit (2026-07-13 to 08-07) | 2026-08-14 audit (2026-07-17 to 08-11) | Trend |
|---|---|---|---|
| Clicks | 8 | 9 | +1 |
| Impressions | 21 | 104 | +395% |
| CTR | 38.1% | 8.65% | down (impressions grew much faster than clicks) |
| Avg. position | 15.9 | 31.3 | worse (more long-tail/low-ranking queries now indexed and showing) |

**Note:** No true "prior period" comparison endpoint was run (would require a second 28-day pull offset by 28 days); the table above compares this audit's totals against the previous audit's totals as the closest available proxy. Per-query/per-page row breakdowns below omit anonymized low-volume rows and undercount the totals — do not sum rows to re-derive totals.

**Read:** Impressions jumped nearly 5x, and 17 distinct query/page rows were returned this period (up from 13 pages / 1 query row on 2026-08-10) — a sign that the `/subjects/*` pages are now surfacing in search (ap-biology, ap-chemistry, a-level-maths, astronomy, o-level-physics, sql, mathematics all appear as new query rows this period, none of which showed up on 2026-08-10). Average position worsened to 31.3 because these new impressions are mostly at very low ranks (position 19-88 for the new subject-page queries). Clicks remain effectively flat (8 to 9) — the site is being newly discovered/crawled for a wider set of long-tail queries but not yet converting that into clicks. This is consistent with the sitemap being freshly and more thoroughly crawled/indexed (see Section 2) rather than a ranking improvement.

By page (selected new/notable rows this period):

| Page | Query (sample) | Impressions | Position |
|---|---|---|---|
| `/subjects/ap-biology` | "ap biology tutor" | 3 | 82 |
| `/courses/igcse-preparation-course-5ed7859f` | "igcse exam preparation courses" | 16 | 47.5 |
| `/courses/igcse-preparation-course-5ed7859f` | "igcse preparation course" | 12 | 43.6 |
| `/about` | "tutora" | 20 | 19.4 |
| `/subjects/mathematics` | "tutora.com" | 1 | 10 |

---

## 4. GA4 Organic Traffic — 28 days (2026-07-17 to 2026-08-13) vs prior period

| Metric | 2026-08-10 audit (2026-07-13 to 08-09) | 2026-08-14 audit (2026-07-17 to 08-13) | Trend |
|---|---|---|---|
| Organic sessions | 10 | 16 | +60% |
| Organic users | 4 | 7 | +75% |
| Pageviews | 52 | 95 | +83% |
| Avg. daily sessions | 3.3 | 2.7 | — |

Only 6 of 28 days had recorded organic sessions (2026-08-05: 6, 08-06: 3, 08-07: 2, 08-09: 3, 08-11: 1, 08-12: 1) — still sparse and bursty, no steady daily trend. All growth is still off a very small base and should not be read as a statistically meaningful trend yet.

Top organic landing pages by session:

| Landing page | Sessions | Users | Pageviews | Bounce rate | Engagement rate |
|---|---|---|---|---|---|
| `/courses` | 5 | 3 | 33 | 0% | 100% |
| `/` | 4 | 1 | 41 | 0% | 100% |
| `/about` | 2 | 2 | 10 | 0% | 100% |
| `(not set)` | 1 | 1 | 0 | 100% | 0% |
| `/courses/ai-for-beginners-0939362a` | 1 | 1 | 1 | 0% | 100% |
| `/find-a-tutor` | 1 | 1 | 4 | 0% | 100% |
| `/privacy` | 1 | 1 | 2 | 0% | 100% |
| `/request-a-tutor` | 1 | 1 | 4 | 0% | 100% |

`/request-a-tutor` now appears as an organic landing page for the first time (was not in the 2026-08-10 top-pages list) — first organic session recorded on this page since the recent fix commit. GA4 property ID: `548355839` (unchanged).

---

## Summary of what succeeded / failed

| Data source | Status |
|---|---|
| PSI Lighthouse (lab data, homepage mobile) | Success — flags a lab performance regression vs 2026-08-10, needs confirmation run |
| CrUX field data (origin + 2 page-level templates) | No data — site still below CrUX eligibility threshold |
| CrUX History (origin, 28-day trend) | No data — same reason |
| GSC sitemap status | Success (191 submitted URLs, 0 errors, unchanged since 07-27 — no resubmission attempted due to blocked permission) |
| GSC URL Inspection (6 sampled pages across all key templates) | Success — all 6 indexed/PASS, canonicals match, homepage and request-a-tutor re-crawled within the last 1-3 days |
| GSC URL Inspection (full 191-URL sweep) | Not attempted — no bulk API; would require ~191 sequential rate-limited calls |
| GSC search performance (28d) | Success (`totals_complete: true`); impressions +395% vs prior audit, clicks flat |
| GA4 organic traffic + top pages | Success; sessions +60%, `/request-a-tutor` now capturing organic traffic |
| Indexing API permission check | Confirmed still blocked — service account remains `siteRestrictedUser`, not Owner/Full. Not resolved since 2026-08-10. |
| GSC `sc-domain:` property queries | Not re-tested this run (assumed still 403 per unchanged permission level); URL-prefix property used successfully |

## Bottom line

1. **CrUX field data is still unavailable.** All CWV claims for tutora.it.com must continue to rely on PSI lab data (explicitly labeled as such), not real-user field data. The site has not crossed CrUX's minimum traffic-eligibility threshold — no change since 2026-08-10, and current organic volume (16 sessions/28 days) remains far below what's needed.
2. **The Indexing API / sitemap-resubmission permission issue from 2026-08-10 is still unresolved.** The service account is still Restricted (`siteRestrictedUser`), not Owner/Full, in Search Console. This blocks Indexing API `publish()` calls; a human with Owner access needs to promote `gsc-reader@tutora-503307.iam.gserviceaccount.com` to Owner/Full user in GSC settings.
3. **Indexation is healthy on read-only checks:** all 6 sampled URLs across homepage, request-a-tutor, course, subject, and tutor-detail templates are indexed and crawlable, with Google re-crawling the homepage and request-a-tutor page within the last 1-3 days — the recent content fixes are being picked up.
4. **Traffic is trending up but still tiny:** GSC impressions +395%, GA4 organic sessions +60% vs the 2026-08-10 audit, driven mainly by newly-indexed `/subjects/*` pages surfacing for long-tail queries at very low positions (19-88). Clicks remain flat. This is early-stage crawl/indexation growth, not yet a ranking or conversion signal.
5. **Lab performance regressed** (Performance 80→67, LCP 3.3s→5.0s) since 2026-08-10 — worth a follow-up PSI run to confirm this isn't a fluke, and a check of what shipped in the interim commits that could have added weight to shared layout/JS.
