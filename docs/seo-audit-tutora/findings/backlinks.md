# Backlink Profile Audit — tutora.it.com

**Data tier:** Backlink Tier 0 — Basic (Common Crawl + Verify only). Confirmed via
`backlinks_auth.py --check`: no Moz API key and no Bing Webmaster API key configured.
Only Common Crawl web graph data and the local verification crawler were available for
this audit.

## Category Score: INSUFFICIENT DATA (not a numeric score)

Per Tier 0 methodology, a numeric 0–100 Backlink Health Score requires data on at least
4 of the 7 scoring factors (referring domain count, domain quality distribution, anchor
text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic
relevance). **0 of 7 factors have usable data for this domain** — Common Crawl returned
no record at all, and no known-backlinks list was supplied for verification. Producing
a numeric score here would be misleading, so none is given. This is not itself a
negative signal about the site; see the "what this does NOT mean" note below.

If a score placeholder is required for cross-category audit aggregation, treat this
category as **not yet scored** rather than substituting a 0 or an assumed low number.

## Data Sources Consulted

| Source | Result | Confidence |
|--------|--------|------------|
| Common Crawl Web Graph (`commoncrawl_graph.py`, release cc-main-2026-jan-feb-mar) | Domain not found — no PageRank, harmonic centrality, or in-degree data | 0.50 (domain-level, would apply if data existed; here there is none) |
| Verification Crawler (`verify_backlinks.py`) | Not run — no known/candidate backlink URLs were provided or discoverable through available tools to seed verification | N/A |
| Moz API | Unavailable (no API key configured) | — |
| Bing Webmaster API | Unavailable (no API key configured) | — |
| DataForSEO | Not installed | — |

**Freshness:** Common Crawl web graphs are quarterly; this query used release
`cc-main-2026-jan-feb-mar`, queried live (not from cache). Source:
https://commoncrawl.org/web-graphs

## What Works

- No findings to report here — with zero usable backlink data points, there is nothing
  observed (positive or negative) about the current backlink profile to confirm as
  "working." This is a data-availability gap, not a confirmed absence of good links.

## Findings

### 1. Domain not present in Common Crawl's web graph
- **Severity:** Info (not a defect)
- **Description:** `commoncrawl_graph.py` returned `in_crawl: false` and
  `in_rankings: false` for `tutora.it.com`, with `pagerank`, `pagerank_rank`,
  `harmonic_centrality`, and `n_hosts` all null. This means Common Crawl's most recent
  web-graph snapshot has no record of any page linking to tutora.it.com (or of
  tutora.it.com's own pages appearing as link sources/targets in its sample).
- **Important interpretation caveat:** This does **not** mean the site has "zero
  authority" or "zero backlinks." Common Crawl samples roughly 25–40% of the web and
  updates quarterly. A domain can be absent from CC's graph because it is new, was
  registered/launched after the current crawl snapshot was taken, receives links only
  from sites CC didn't crawl this cycle, or is simply below the traffic/link threshold
  CC's crawler prioritizes. It is consistent with, but does not prove, a genuinely thin
  or nonexistent backlink profile.
- **Recommendation:** Treat this as confirmation that free-tier domain-graph tools
  currently have no visibility into this site's link profile — not as a definitive
  "no backlinks" finding. Re-run this check in 3–6 months (next 1–2 CC release cycles)
  to see if the site has been picked up. In the meantime, prioritize the link-building
  actions below, which will also make the site more likely to be crawled and included
  in the next Common Crawl snapshot.

### 2. No known-backlinks list was available to verify
- **Severity:** Info (scope limitation, not a site defect)
- **Description:** The verification crawler (`verify_backlinks.py`) checks whether
  specific, already-known backlink URLs are live and still link to the target. It
  requires a seed list of candidate source URLs (e.g., from Search Console, a prior
  audit, or manual discovery). No such list was provided for this audit, and this
  Tier 0 skill has no capability to discover new candidate backlink URLs on its own
  (that requires Moz/Bing/DataForSEO or a search tool, none of which are available).
  As a result, the verification step could not be run.
- **Recommendation:** If tutora.it.com is verified in Google Search Console, export the
  "Links" report (Top linking sites / Top linking pages) and re-run this skill with that
  list as `--links`. That would let the verification crawler confirm which known
  backlinks are actually live and check anchor text/rel attributes at 0.95 confidence,
  materially improving data coverage beyond Tier 0's default limits.

### 3. Site has effectively no discoverable backlink footprint at this time
- **Severity:** Medium (business risk, not a technical defect)
- **Description:** Combining the CC non-result with the absence of any provided
  backlink evidence, the practical takeaway is that tutora.it.com currently has little
  to no externally visible link equity that free tools can detect. For a newer domain
  in a competitive niche (online tutoring marketplace), this is expected but represents
  a growth gap: organic visibility for competitive terms (e.g., "online math tutor,"
  "find a tutor near me") is strongly correlated with referring-domain count and
  authority, which this site has not yet built.
- **Recommendation:** See the dedicated link-building strategy section below. This is
  the primary actionable output of this audit given the data constraints.

## Recommended Link-Building Strategy (Free / Low-Cost)

Since the current profile could not be measured but is very likely thin given the
domain's age/size, the highest-value action from this audit is a concrete acquisition
plan rather than more measurement. All items below are free or near-free and relevant
to an online tutoring marketplace.

**Priority: High**
1. **Education and tutoring directories.** Submit tutora.it.com to niche directories
   that are commonly used by parents/students searching for tutors, e.g. Wyzant-style
   marketplace comparison pages, Yelp (Education category), Google Business Profile
   (if there's a local/registered address), Trustpilot, and general edu directories
   such as UK/US-specific ones like Edudemic, The Tutor Pages, First Tutors, or local
   equivalents relevant to the site's target geography. These are typically free,
   fast to acquire, and topically relevant (high anchor-text and category relevance).
2. **Local school and PTA partnership pages.** Reach out to local schools, PTAs, and
   homeschool co-ops in the markets the marketplace serves, offering free trial
   sessions or a discount code for their community in exchange for a link from the
   school's "community resources" or "recommended tutors" page. These links carry
   strong topical and geographic relevance (helps the "Geographic relevance" scoring
   factor once measurable) and are typically .edu or .org domains, which carry
   above-average trust signals.
3. **HARO / journalist-request platforms (Qwoted, Featured.com's free tier, Help a B2B
   Writer, #JournoRequest on X).** Have a tutor or founder respond to reporter queries
   about topics like "back to school study tips," "how AI is changing tutoring," or
   "cost of private tutoring in 2026." Earned media links from journalism sites carry
   high authority and are free to pursue (time cost only).

**Priority: Medium**
4. **Guest posts on parenting and education blogs.** Pitch practical, non-promotional
   guest content (e.g., "5 signs your child needs a tutor," "how to choose between
   online and in-person tutoring") to mid-tier parenting/homeschool blogs. Target
   blogs that accept guest contributions and allow a bio-line link back to
   tutora.it.com — avoid link-farm "guest post networks" per the toxic-link patterns
   in `backlink-quality.md`.
5. **Quora and Reddit expert answers.** Answer real questions in r/HomeworkHelp,
   r/tutoring, r/Parenting, and relevant Quora topics ("how do I find a good online
   tutor," "is online tutoring effective"). Most of these links are nofollow, but they
   drive referral traffic and, over time, contribute to natural anchor-text diversity
   and brand-mention signals that indirectly support link acquisition (people citing
   Reddit/Quora threads sometimes cite the recommended service).
6. **Subject-matter resource pages.** Search for "[subject] resources for students"
   or "homeschool resource list" pages on education blogs and offer tutora.it.com as
   an addition — these curated list pages often update on request and are a
   low-effort, high-relevance link source.

**Priority: Low / Ongoing**
7. **Testimonials and case studies for tools you use.** If the marketplace uses
   third-party SaaS (payment processors, scheduling tools, video conferencing), many
   vendors publish customer testimonials with a link back to the customer's site —
   free links from generally high-authority company domains.
8. **Press release for notable milestones** (e.g., "tutora.it.com reaches X tutors" or
   a funding/launch announcement) distributed via free-tier PR distribution sites.
   Treat this as a minor, supplementary tactic — syndicated press releases have low
   inherent SEO value and should not be the primary strategy (see
   `backlink-quality.md`, "Likely Spam" pattern #23 for over-reliance on syndication
   networks).

**What to avoid:** Do not purchase links, use automated directory-submission
services, or participate in reciprocal-link/link-exchange schemes — these match
several of the "Definite Spam" / "Likely Spam" patterns documented in
`skills/seo/references/backlink-quality.md` and would create a toxic-link risk once
the site does start attracting real link equity.

## Cross-Reference / Follow-Up

- For deeper toxic-link pattern detection and anchor-text benchmark data once real
  backlink data exists, see `skills/seo/references/backlink-quality.md`.
- This report does not cover on-page content quality (E-E-A-T) — see the separate
  `/seo content` findings for that.
- This report does not cover crawlability/technical SEO — see the separate
  `/seo technical` findings for that.
- **Recommended next step to upgrade data quality:** configure a free Moz API key
  (https://moz.com/products/api, 2,500 rows/month free) to unlock Tier 1 metrics
  (Domain Authority, Page Authority, Spam Score, referring domains, anchor text
  distribution) with 0.85 confidence, which would allow a real numeric Backlink
  Health Score in future audits.

---
*Validated via `validate_backlink_report.py`: status PASS, 0 errors, 0 warnings,
1 info note (correctly reflected above: CC absence is not interpreted as "low
authority").*
