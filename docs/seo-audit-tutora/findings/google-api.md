# Google API Field Data — tutora.it.com

**Audit date:** 2026-08-10 (re-audit, same-day post-fix)
**Data sources:** Google PageSpeed Insights v5, CrUX API, CrUX History API, Search Console API, GA4 Data API
**Credential tier:** Tier 2 (Full) — service account `gsc-reader@tutora-503307.iam.gserviceaccount.com`
**GSC access level:** `siteRestrictedUser` on property `https://www.tutora.it.com/` (Restricted, not Full/Owner). The `sc-domain:tutora.it.com` property returned `403 Forbidden` for this service account — all GSC calls below used the URL-prefix property instead, which succeeded.

---

## 1. CrUX Core Web Vitals (Field Data) — INSUFFICIENT DATA

CrUX field data was queried for the homepage and two key pages, at both mobile and desktop form factors, plus the origin-level 28-day history endpoint. **All calls returned no data.**

| Target | Query | Result |
|---|---|---|
| `https://www.tutora.it.com/` | CrUX, mobile | No data — insufficient Chrome traffic volume |
| `https://www.tutora.it.com/` | CrUX, desktop | No data — insufficient Chrome traffic volume |
| `https://www.tutora.it.com/find-a-tutor` | CrUX, page-level | No data — insufficient Chrome traffic volume |
| `https://www.tutora.it.com/courses` | CrUX, page-level | No data — insufficient Chrome traffic volume |
| `https://www.tutora.it.com` (origin) | CrUX History, 28-day rolling trend | No data — insufficient Chrome traffic volume |

**CrUX is not statistically valid for this domain.** CrUX only publishes data for origins/pages that clear Chrome's minimum real-user traffic threshold (roughly a few thousand qualifying page loads over the 28-day window). This is consistent with the site being young and low-authority — GA4 shows only ~10 organic sessions over the trailing 28 days (see Section 4), several orders of magnitude below CrUX eligibility. **No CWV field-data claims (LCP/INP/CLS) can be made for this site at this time.** This should be re-checked in future audits as traffic grows; do not report "field data" CWV numbers for tutora.it.com until CrUX eligibility is reached.

### Lab-data fallback (PSI Lighthouse, mobile, homepage)
Since field data is unavailable, lab data is reported instead as a proxy — this is **not** a substitute for real-user CWV and should be labeled as lab data whenever cited.

| Metric | Lab value | Lighthouse score |
|---|---|---|
| Performance score | 80/100 | — |
| First Contentful Paint | 1.1 s | 1.00 |
| Largest Contentful Paint | 3.3 s | 0.69 (Needs Improvement territory) |
| Total Blocking Time | 450 ms | 0.63 |
| Cumulative Layout Shift | 0 | 1.00 |
| Speed Index | 3.3 s | 0.90 |
| Time to Interactive | 5.5 s | 0.70 |

Accessibility 96/100, Best Practices 100/100, SEO 100/100. Top lab-level opportunities: reduce unused JavaScript (~95 KiB, mostly GTM + a Next.js chunk), reduce main-thread/JS execution time (bootup ~1.4s, main-thread work ~3.1s), render-blocking CSS (~171ms). Note this lab run reflects whatever is currently deployed — if the LCP fix mentioned by the user landed after this run, a follow-up PSI check is recommended to confirm the 3.3s lab LCP has improved.

---

## 2. GSC Indexation Status (191 sitemap URLs)

| Item | Value |
|---|---|
| Sitemap | `https://www.tutora.it.com/sitemap.xml` |
| Last submitted | 2026-07-27T19:14:13Z |
| Sitemap errors | 0 |
| Sitemap warnings | 0 |
| URLs submitted (type: web) | 191 |
| Pending | No |

**Limitation:** The Sitemaps API only reports the count of URLs *submitted* in the sitemap (191) — it does not report how many of those 191 are actually indexed. Google's Search Console API has no bulk "indexed count" endpoint; the only way to get per-URL indexation truth is the URL Inspection API, one URL at a time (with the 403 "Restricted" access, a full 191-URL inspection sweep was not attempted in this run due to time/quota — sampling was used instead).

**Sampled URL Inspection results (3 of 191 URLs):**

| URL | Verdict | Coverage | Robots | Canonical match | Last crawl |
|---|---|---|---|---|---|
| `/` (homepage) | PASS | Submitted and indexed | Allowed | Yes | 2026-07-30 |
| `/find-a-tutor` | PASS | Submitted and indexed | Allowed | Yes | 2026-07-25 |
| `/courses` | PASS | Submitted and indexed | Allowed | Yes | 2026-07-29 |

All 3 sampled URLs are indexed, crawlable, and have matching Google/user canonicals as of their last crawl dates (late July 2026, i.e., before today's fixes). This is a small sample (3 of 191) and should not be extrapolated to the full sitemap without a broader inspection pass in a future audit.

---

## 3. GSC Search Performance (28 days: 2026-07-13 to 2026-08-07)

Site-wide totals (`totals_complete: true`, safe to report as-is):

| Metric | Value |
|---|---|
| Clicks | 8 |
| Impressions | 21 |
| CTR | 38.1% |
| Avg. position | 15.9 |

**Note:** Per-dimension row breakdowns (by query or by page) omit anonymized low-volume rows and undercount the totals above — do not sum rows to re-derive totals. Rows are shown below for directional detail only.

By query (1 row returned, most other queries anonymized as low-volume):

| Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| tutora | 0 | 5 | 0% | 47.0 |

By page (13 rows returned):

| Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| `/` | 7 | 14 | 50.0% | 7.9 |
| `/courses` | 3 | 12 | 25.0% | 2.8 |
| `/about` | 1 | 15 | 6.7% | 21.7 |
| `/courses/guitar-a7d7f6aa` | 1 | 3 | 33.3% | 6.3 |
| `/find-a-tutor/manish-57c0bf15` | 1 | 5 | 20.0% | 11.6 |
| `/courses/c-95361960` | 0 | 5 | 0% | 8.0 |
| `/courses/japanese-34b5d228` | 0 | 1 | 0% | 8.0 |
| `/courses/spoken-english-course-5dbc4867` | 0 | 1 | 0% | 5.0 |
| `/courses/sql-90d171c1` | 0 | 5 | 0% | 7.0 |
| `/courses?category=Languages` | 0 | 4 | 0% | 4.0 |
| `/find-a-tutor` | 0 | 7 | 0% | 4.3 |
| `/privacy` | 0 | 8 | 0% | 8.4 |
| `/terms` | 0 | 12 | 0% | 5.3 |

Overall read: extremely low search volume (single-digit clicks/impressions), consistent with a young, low-authority site pre-traction. Average positions for `/courses` (2.8) and `/` (7.9) are encouraging for such a new site, but the sample sizes are too small to draw statistically confident conclusions.

---

## 4. GA4 Organic Traffic (28 days: 2026-07-13 to 2026-08-09)

| Metric | Value |
|---|---|
| Organic sessions | 10 |
| Organic users | 4 |
| Pageviews | 52 |
| Avg. daily sessions | 3.3 |

Only 3 of 28 days had any recorded organic sessions (2026-08-05: 6 sessions, 2026-08-06: 3 sessions, 2026-08-09: 1 session) — traffic is sparse and bursty, not a steady trend.

Top organic landing pages by session:

| Landing page | Sessions | Users | Pageviews | Bounce rate | Engagement rate |
|---|---|---|---|---|---|
| `/courses` | 4 | 2 | 31 | 0% | 100% |
| `(not set)` | 1 | 1 | 0 | 100% | 0% |
| `/` | 1 | 1 | 8 | 0% | 100% |
| `/about` | 1 | 1 | 5 | 0% | 100% |
| `/dashboard` | 1 | 1 | 2 | 0% | 100% |
| `/find-a-tutor` | 1 | 1 | 4 | 0% | 100% |
| `/privacy` | 1 | 1 | 2 | 0% | 100% |

GA4 property ID: `548355839`.

---

## Summary of what succeeded / failed

| Data source | Status |
|---|---|
| PSI Lighthouse (lab data, homepage mobile) | Success |
| CrUX field data (homepage, mobile + desktop) | No data — site below CrUX eligibility threshold |
| CrUX field data (`/find-a-tutor`, `/courses`) | No data — same reason |
| CrUX History (origin, 28-day trend) | No data — same reason |
| GSC sitemap status | Success (191 submitted URLs, 0 errors) |
| GSC URL Inspection (3 sampled pages) | Success — all indexed/PASS |
| GSC URL Inspection (full 191-URL sweep) | Not attempted — no bulk API exists; would require ~191 sequential rate-limited calls |
| GSC search performance (28d) | Success (totals_complete: true) |
| GA4 organic traffic + top pages | Success |
| GSC `sc-domain:` property queries | Failed — 403, service account lacks permission on that property; URL-prefix property used successfully instead |

**Bottom line: CrUX has zero usable field data for tutora.it.com — the domain has not yet crossed Chrome's minimum real-user-traffic threshold for CrUX reporting eligibility, consistent with GA4's ~10 organic sessions/28 days.** All CWV claims for this site must currently rely on PSI lab data (labeled as such), not field data, until traffic grows enough for CrUX to publish.
