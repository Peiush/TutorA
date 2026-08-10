# Backlink Profile Audit — tutora.it.com

**Data tier:** Backlink Tier 0 — Basic (Common Crawl + Verify only). Confirmed via
`backlinks_auth.py --check` (2026-08-10): no Moz API key and no Bing Webmaster API key
configured. This remains a known outstanding human task (free signup at
https://moz.com/products/api and https://www.bing.com/webmasters) — not something this
skill can fix, noted here as it was in the prior audit. Only Common Crawl web graph
data and the local verification crawler were available.

## Phase 4 re-check (2026-08-10)

Quick re-check per the audit orchestrator's schedule, not a full re-audit. Re-ran
`commoncrawl_graph.py tutora.it.com` with `--update` to force a fresh, non-cached
query (bypassing the local cache from the 2026-08-04/08-08 runs) to make sure this
check reflects current state rather than a stale cached "not found."

**Result: unchanged.** `in_crawl: false`, `in_rankings: false`, all metrics
(`pagerank`, `pagerank_rank`, `harmonic_centrality`, `n_hosts`) still null, same as the
2026-08-04 and 2026-08-08 checks. Common Crawl release queried:
`cc-main-2026-jan-feb-mar`, live fetch (not cache) at 2026-08-10T11:29:24Z.

**This is expected, not a regression.** As previously documented, outreach materials
were drafted on 2026-08-08 (`docs/seo-audit-tutora/phase4-backlinks/outreach-materials.md`,
HARO pitches, guest post pitches, PTA/school outreach, directory list) but have not yet
been sent — that remains a human task outside this skill's scope. Confirmed the file's
modification timestamp is still 2026-08-08 with no changes since, i.e. outreach has not
gone out. Common Crawl reflects inbound links from crawled pages; with zero outreach
activity and no new external links pointing at the site, there is no mechanism by which
this snapshot could show a different result. Nothing new is expected until outreach is
actually sent and (separately) until Common Crawl's next quarterly release picks up any
resulting links.

## Category Score: INSUFFICIENT DATA (not a numeric score)

Unchanged from the prior audit. Per Tier 0 methodology, a numeric 0–100 Backlink Health
Score requires data on at least 4 of the 7 scoring factors (referring domain count,
domain quality distribution, anchor text naturalness, toxic link ratio, link velocity,
follow/nofollow ratio, geographic relevance). **0 of 7 factors have usable data** —
Common Crawl still returns no record, and no known-backlinks list was supplied for
verification. No numeric score is given; this category remains **not yet scored**
for cross-category audit aggregation, not a 0 or an assumed low number.

## Data Sources Consulted

| Source | Result | Confidence |
|--------|--------|------------|
| Common Crawl Web Graph (`commoncrawl_graph.py`, release cc-main-2026-jan-feb-mar, live/non-cached fetch) | Domain not found — no PageRank, harmonic centrality, or in-degree data | 0.50 (domain-level, would apply if data existed; here there is none) |
| Verification Crawler (`verify_backlinks.py`) | Not run — no known/candidate backlink URLs available to seed verification | N/A |
| Moz API | Unavailable (no API key configured — outstanding human task) | — |
| Bing Webmaster API | Unavailable (no API key configured — outstanding human task) | — |
| DataForSEO | Not installed | — |

**Freshness:** Common Crawl web graphs are quarterly; this query used release
`cc-main-2026-jan-feb-mar`, force-refreshed (`--update`, bypassing cache) and queried
live at 2026-08-10T11:29:24Z. Source: https://commoncrawl.org/web-graphs

## Findings

### 1. Domain still not present in Common Crawl's web graph (confirmed, unchanged)
- **Severity:** Info (not a defect)
- **Description:** Third consecutive check (2026-08-04, 2026-08-08, 2026-08-10) returns
  `in_crawl: false` and `in_rankings: false` for `tutora.it.com`. This re-check used a
  forced non-cached fetch to rule out a stale cache artifact — the live result matches
  the cached result exactly.
- **Interpretation caveat (unchanged):** Absence from Common Crawl does not mean "zero
  authority" or "zero backlinks." CC samples roughly 25–40% of the web and updates
  quarterly; a domain can be absent because it is new, receives links only from
  uncrawled sites, or is below CC's crawl-priority threshold. This is consistent with,
  but does not prove, a thin/nonexistent backlink profile.
- **Recommendation:** No action needed on this check itself. The determining factor for
  the next real change is outreach going out (still pending, human task) plus Common
  Crawl's next quarterly snapshot after that. Re-run again after outreach is sent, not
  on a fixed calendar — further re-checks before outreach goes out are unlikely to show
  new information (as demonstrated by this check).

### 2. No known-backlinks list available to verify (unchanged)
- **Severity:** Info (scope limitation, not a site defect)
- Same as prior audit: `verify_backlinks.py` requires a seed list of candidate source
  URLs (e.g., from Search Console). None available. **Recommendation unchanged:** export
  Google Search Console's "Links" report once available and re-run with `--links`.

### 3. Outreach not yet sent (confirmed human task, not started)
- **Severity:** N/A (tracking note, not a defect)
- **Description:** `docs/seo-audit-tutora/phase4-backlinks/outreach-materials.md`
  (drafted 2026-08-08: HARO pitches, guest post pitches, PTA/school outreach,
  directory submission list) has not been modified or acted on since it was drafted.
  This confirms the human task of sending outreach is still outstanding.
- **Recommendation:** No change to the plan from the 2026-08-08 audit. Send outreach
  per priority order (education/tutoring directories, local school/PTA partnerships,
  HARO responses first; guest posts and community answers next). See the full
  link-building strategy retained from the prior audit below for reference.

## Recommended Link-Building Strategy (Free / Low-Cost) — carried forward, unchanged

No changes to this strategy since the 2026-08-08 audit; outreach has not been sent, so
priorities are identical.

**Priority: High**
1. Education and tutoring directories (Yelp Education, Google Business Profile,
   Trustpilot, The Tutor Pages, First Tutors, or geography-relevant equivalents).
2. Local school/PTA/homeschool co-op partnership pages — offer free trial sessions or
   a discount code for a link from "community resources" or "recommended tutors" pages.
3. HARO / journalist-request platforms (Qwoted, Featured.com free tier, #JournoRequest)
   — respond to queries on tutoring, study tips, or AI-in-education topics.

**Priority: Medium**
4. Guest posts on parenting/education blogs (avoid link-farm guest-post networks).
5. Quora / Reddit expert answers (r/HomeworkHelp, r/tutoring, r/Parenting) — mostly
   nofollow but build brand-mention and referral signal.
6. Subject-matter resource-page outreach ("homeschool resource list" pages).

**Priority: Low / Ongoing**
7. Vendor testimonials/case studies (payment processors, scheduling tools, etc.).
8. Milestone press release via free-tier PR distribution — supplementary only.

**What to avoid:** No purchased links, automated directory-submission services, or
reciprocal-link/link-exchange schemes — see `skills/seo/references/backlink-quality.md`
"Definite Spam" / "Likely Spam" patterns.

## Cross-Reference / Follow-Up

- For toxic-link pattern detection and anchor-text benchmarks once real backlink data
  exists, see `skills/seo/references/backlink-quality.md`.
- Not covered here: on-page E-E-A-T (`/seo content`) or crawlability (`/seo technical`).
- **Recommended next step to upgrade data quality (unchanged, human task):** configure
  a free Moz API key (https://moz.com/products/api, 2,500 rows/month free) to unlock
  Tier 1 metrics (DA, PA, Spam Score, referring domains, anchor text distribution) at
  0.85 confidence, enabling a real numeric Backlink Health Score in future audits.
- **Next meaningful re-check trigger:** after outreach materials are actually sent, not
  on a fixed time interval — this 2026-08-10 check confirms no change is possible yet
  because the triggering human action (outreach) has not occurred.

---
*Validated via `validate_backlink_report.py` (2026-08-10): status PASS, 0 errors,
0 warnings, 1 info note (CC absence correctly not interpreted as "low authority").*
