# SXO Comparative Audit — tutora.it.com vs. Ranking Competitors

**Audit date:** 2026-08-14
**Methodology:** Manual execution of the `seo-sxo` skill pipeline (Steps 1–6): target acquisition, SERP-backwards analysis, page-type mismatch detection, user-story derivation, 7-dimension gap scoring, persona scoring. `scripts/render_page.py`/`scripts/parse_html.py` do not exist in this installation — target pages were read via `WebFetch` and SERPs via `WebSearch` instead of `DataForSEO`/rendered HTML parsing. This is a **reduced-precision pass**: no true PAA/featured-snippet/AI-Overview capture, no local-pack screenshot, no exact word counts. Treat scores as directional, not lab-grade.

**Site context:** tutora.it.com ("TutorA") is a 1:1 tutor-matching marketplace (subject browse, tutor profiles, request-a-tutor flow, success-fee pricing model, India-based tutor pool per visible profiles). Site inventory pulled from `sitemap.xml`: only `/`, `/about`, `/guarantee`, `/teach`, `/terms`, `/privacy`, `/courses/*`, `/find-a-tutor/*`, `/subjects/*`, `/request-a-tutor`. **There is no blog, no city/location page, and no pricing page anywhere on the site.** That single fact drives most of the findings below.

**Overall SXO Gap Score (average across 5 keywords): 36/100** — pulled down hard by three keywords (local, cost, comparison) where TutorA has literally no page mapped to the query, not just a weak one.

---

## Keyword 1 — Broad head term: "find a tutor"

### SERP Landscape
Top 8 organic: Care.com/tutors, Tutors.com, Princeton Review tutor-search, HeyTutor, Superprof, Wyzant, Varsity Tutors, Tutor.com. **8/8 = marketplace/directory hub pages** — strong consensus (~100%). Each has: hero + single CTA, tutor listing/search cards, aggregate review counts (Care.com: "4.7★ / 16,580 reviews"; Wyzant: "4M+ 5-star reviews," "65,000 tutors," "12M+ lessons"), a location search field ("City, State"), pricing anchor ("average posted rate $22.00/hr"), and an "It's free / right fit or it's free" risk-reversal guarantee.

### Page-Type Alignment
- TutorA equivalent: homepage `/`
- Target type: **Hybrid Service/Marketplace** (hero, tutor cards, self-vs-competitor comparison table, FAQ, trust pillars)
- SERP expects: **Hybrid Service/Marketplace**
- **Verdict: ALIGNED** — no structural page-type mismatch.

### User Stories
1. As a **first-time parent comparing marketplaces**, I want to see how many tutors have actually been vetted/rated, because a scary sign-up decision needs proof of scale, but I'm blocked by TutorA showing no aggregate review count or star rating anywhere on the homepage. *(Source: Care.com "16,580 reviews," Wyzant "4M 5-star reviews" vs. TutorA's only proof being 3 individual testimonial quotes.)*
2. As a **location-first searcher**, I want to type my city and see nearby tutors, because that's the default mental model for "find a tutor," but I'm blocked by TutorA having no location search field at all. *(Source: Care.com's "City, State" search bar is the first interactive element on the page.)*
3. As a **budget shopper**, I want an average market rate up front, because I want to gut-check affordability before browsing, but I'm blocked by TutorA showing only per-tutor rates with no site-wide average. *(Source: Care.com states "average posted rate $22.00/hr as of August 2026" in the hero area.)*

### Gap Analysis — SXO Score: 64/100

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (15) | 13 | Hybrid marketplace structure matches SERP consensus. |
| Content Depth (15) | 10 | FAQ + comparison table + subject browse present; no location search, no guides/blog. |
| UX Signals (15) | 11 | Clear CTAs, sectioned layout; no persistent search/location bar above fold. |
| Schema (15) | 10 | Organization/WebSite/FAQ schema present (per prior sxo.md audit); no AggregateRating. |
| Media (15) | 6 | Initial-letter avatars only, no tutor photos or video (confirmed in prior sxo.md audit). |
| Authority (15) | 8 | Vetting narrative present; no review counts, no third-party trust badge (Trustpilot, BBB). |
| Freshness (10) | 6 | Hub page freshness signal present but inconsistent site-wide (per prior audit). |
| **Total** | **64** | |

### Persona Scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Parent Comparing Marketplaces | 20 | 18 | 14 | 18 | 70 | Good |
| Budget Shopper | 18 | 14 | 14 | 15 | 61 | Good |
| Location-First Searcher | 8 | 6 | 10 | 10 | 34 | Critical Mismatch |

---

## Keyword 2 — Subject-specific: "math tutor near me"

### SERP Landscape
Top 8: Superprof math-lessons/US hub, Tutors.com math-tutors page, Superprof Port St. Lucie (city page), Wyzant NYC math tutors (city page), Tutorax NYC location page, Alexander Math/Physics Manhattan (local business), Yelp local search, Learner.com NYC math tutors (city page), Mathnasium (physical center locator). **6/9 are explicitly city/location-scoped URLs**; the rest are subject hubs that still surface city variants in-SERP. **Dominant type: Local Page** (~65-70% consensus, subject-local hybrid).

### Page-Type Alignment
- TutorA equivalent: `/find-a-tutor?subject=Algebra%20I` (closest live subject-filtered page; also checked `/subjects` — 103 subjects listed but zero location logic)
- Target type: **Subject-filtered global directory** (no location layer)
- SERP expects: **Local Page**
- **Verdict: CRITICAL MISMATCH.** Per taxonomy this maps to "Generic Service Page missing local signals" but is worse than the standard HIGH case: the page actively surfaces India-based tutors to a searcher signaling "near me" intent, with zero city/geo content anywhere on the domain (confirmed via sitemap — no `/city/` or `/location/` paths exist at all).

### User Stories
1. As a **parent wanting an in-person-capable or timezone-aligned local math tutor**, I want to filter by city, because "near me" means physical/schedule proximity matters, but I'm blocked by TutorA having no location filter and showing India-based tutors by default. *(Source: query intent "near me"; page fetch confirmed no location/city search on `/find-a-tutor?subject=Algebra%20I`.)*
2. As a **student open to fully remote tutoring regardless of geography**, I want fast subject-specific matching, because online delivery makes location irrelevant to me, but I'm only partially blocked — TutorA serves this persona reasonably well already. *(Source: SERP still surfaces Superprof/Wyzant national subject hubs alongside city pages, confirming a remote-friendly sub-segment exists.)*
3. As a **comparison shopper**, I want to see local market rate benchmarks (e.g. "$23/hr in Port St. Lucie"), because rates vary by region and I want a local anchor, but I'm blocked by TutorA showing only individual tutor rates with no geographic pricing context. *(Source: Superprof's city pages title format is literally "Math Tutors Near Me in [City] - N Tutors from $X/h".)*

### Gap Analysis — SXO Score: 45/100

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (15) | 3 | No local signals of any kind; SERP-dominant type entirely absent from the site. |
| Content Depth (15) | 9 | Good math-subject breadth (Algebra I/II, Calculus, AP Calc, IB, GCSE, etc.) but zero "near me"/city framing. |
| UX Signals (15) | 8 | Subject filter works cleanly; no location input anywhere in the UI. |
| Schema (15) | 8 | Course/Offer schema present; no LocalBusiness/geo schema. |
| Media (15) | 5 | Same avatar-only gap as homepage. |
| Authority (15) | 7 | Vetting narrative present but not localized ("verified in your area"). |
| Freshness (10) | 5 | Same site-wide inconsistency as homepage. |
| **Total** | **45** | |

### Persona Scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Local-Preference Parent | 5 | 5 | 8 | 10 | 28 | Critical Mismatch |
| Remote-Friendly Student | 20 | 18 | 15 | 18 | 71 | Good |
| Local-Rate Comparison Shopper | 10 | 8 | 10 | 12 | 40 | Needs Work |

---

## Keyword 3 — Long-tail/intent-driven: "how much does a tutor cost per hour"

### SERP Landscape
Top 8: tutors.com/costs/, Brighterly cost guide, TutorCruncher rate guide, InvoiceFly rate-setting guide, Care.com "how much does a tutor cost" guide, Superprof blog "fair cost of tutors," FullMind Learning cost guide, Care.com "how much to charge for tutoring." **8/8 = long-form informational blog posts/cost guides** — total consensus (100%). Expected structure: cost-by-grade / cost-by-subject / cost-by-format breakdown, often as a table, with a stated overall range ("$25–$80/hr private, $20–$70/hr online").

### Page-Type Alignment
- TutorA equivalent: **none exists.** Closest content is 2 sentences buried in the `/about` FAQ ("A single success fee is charged once both sides confirm — never before... percentage-based success fee... Browsing and requesting are free").
- Target type: **N/A (no page targets this query)**
- SERP expects: **Blog Post / cost guide**
- **Verdict: CRITICAL MISMATCH.** This is the taxonomy's clearest failure case — a purely informational, high-volume query with zero corresponding content on the domain. TutorA cannot rank for this query today; the closest page doesn't even state a numeric cost range or percentage.

### User Stories
1. As a **budget-conscious parent researching before shopping**, I want to know the typical $/hr range by subject and grade before I commit to browsing tutors, because sticker shock is a real barrier, but I'm blocked by TutorA never stating a cost range anywhere — not on `/about`, not on the homepage FAQ, not in a dedicated page. *(Source: 8/8 SERP results lead with a specific range like "$25–$80/hr.")*
2. As a **comparison shopper**, I want a cost breakdown table by subject (math vs. test prep vs. languages), because rates vary meaningfully by subject, but I'm blocked by TutorA's success-fee model being opaque — the FAQ doesn't even disclose the percentage charged. *(Source: TutorCruncher/Brighterly present subject-segmented rate tables.)*
3. As a **user already leaning toward TutorA**, I want to confirm the platform is affordable relative to alternatives before signing up, because switching platforms mid-search is friction, but I'm blocked by having to browse individual tutor cards just to infer a price range, with no summary stat. *(Source: only page-level FAQ mentions pricing, phrased around fee mechanics not dollar amounts.)*

### Gap Analysis — SXO Score: 21/100

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (15) | 2 | No content maps to this query at all. |
| Content Depth (15) | 2 | Two sentences on `/about`; no range, no table, no subject breakdown. |
| UX Signals (15) | 4 | Not discoverable via nav or search; buried in About FAQ accordion. |
| Schema (15) | 3 | FAQ schema likely exists on `/about` per prior audit, but not cost-focused. |
| Media (15) | 2 | No comparison table/graphic. |
| Authority (15) | 5 | Fee model described but percentage undisclosed, undermining trust. |
| Freshness (10) | 3 | No dated cost content to assess. |
| **Total** | **21** | |

### Persona Scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Budget-Researching Parent (pre-shop) | 4 | 3 | 8 | 6 | 21 | Critical Mismatch |
| Subject-Rate Comparison Shopper | 3 | 3 | 6 | 5 | 17 | Critical Mismatch |
| Already-Interested TutorA Prospect | 10 | 8 | 10 | 12 | 40 | Needs Work |

---

## Keyword 4 — Local intent: "tutor in Austin, TX"

### SERP Landscape
Top 9 (excluding 1 Indeed jobs result as noise): Superprof `/lessons/all-tutors/austin/`, Tutors.com `/tx/austin/`, Tutor.com `/geo/austin`, Tutor Doctor Austin, Wyzant `Austin_TX_tutors.aspx`, JB Tutoring (Austin-based company), Austin Learning Center, UPchieve Austin. **8/8 = city-scoped local pages** — total consensus (100%). Signals: dedicated `/city/` or `/geo/` URL paths, local business NAP for the independent providers, "serves [nearby suburbs]" service-area language (Tutor Doctor: "serves Round Rock and Cedar Park").

### Page-Type Alignment
- TutorA equivalent: **none.** Sitemap confirms zero `/city/`, `/location/`, or `/tx/` style paths anywhere on the domain; homepage and `/find-a-tutor` show no Austin or Texas content, and visible tutors are India-based.
- Target type: **N/A**
- SERP expects: **Local Page**
- **Verdict: CRITICAL MISMATCH.** Worse than Keyword 2 — there isn't even a subject-filtered fallback page that could plausibly surface for this query; it's a total content gap.

### User Stories
1. As an **Austin parent wanting in-person or same-timezone tutoring**, I want a page confirming local availability, because proximity affects scheduling and trust, but I'm blocked by TutorA having no city page, no service-area statement, and no evidence tutors operate in US timezones. *(Source: 8/8 SERP results are city-dedicated pages; Tutor Doctor explicitly names service-area suburbs.)*
2. As a **remote-friendly Austin parent price-shopping**, I want the cheapest credible online option regardless of city, because I don't actually need in-person, but I'm only partially blocked — TutorA's global marketplace model could serve this need if discoverable for the query. *(Source: Superprof and Tutor.com both surface for "tutor in Austin" despite being non-local platforms, showing Google tolerates non-local results when relevance/authority is strong.)*
3. As a **local school or community org** scanning for tutoring resources to recommend, I want a directory entry with local credibility markers, because institutional referral requires local legitimacy, but I'm blocked by TutorA having zero footprint in any city-level directory or page. *(Source: JB Tutoring, Austin Learning Center rank purely on local-business signals.)*

### Gap Analysis — SXO Score: 15/100

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (15) | 1 | No local page exists; total content gap. |
| Content Depth (15) | 1 | Zero Austin/Texas content anywhere on the domain. |
| UX Signals (15) | 3 | N/A — nothing to navigate to. |
| Schema (15) | 2 | No LocalBusiness/geo schema anywhere on the site. |
| Media (15) | 2 | No local imagery/map. |
| Authority (15) | 4 | Global vetting narrative doesn't address local trust needs. |
| Freshness (10) | 2 | N/A. |
| **Total** | **15** | |

### Persona Scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| In-Person/Timezone-First Austin Parent | 2 | 2 | 6 | 5 | 15 | Critical Mismatch |
| Remote-Friendly Price Shopper | 15 | 14 | 12 | 15 | 56 | Needs Work |
| Institutional/Community Referrer | 2 | 2 | 5 | 4 | 13 | Critical Mismatch |

---

## Keyword 5 — Comparison/commercial: "best tutoring website"

### SERP Landscape
Top 5 (a fragmented/lower-volume SERP): FullMind Learning "6 Best Tutoring Websites," Superprof blog "Top Tutoring Websites in the US," SplashLearn "13 Best Online Tutoring Websites," Wise.live "Top Tutoring Websites for Teachers," a local-authority directory result (noise). **4/4 relevant results = listicle/comparison blog posts** ranking and reviewing named competitors (Superprof, iTutor, Khan Academy, Tutor.com, Varsity Tutors). Dominant type: **Comparison Page** (listicle sub-format).

### Page-Type Alignment
- TutorA equivalent: homepage's internal "Open marketplace vs. TutorA" comparison table (4 factors, self-vs-generic-competitor framing).
- Target type: **Landing Page with embedded self-comparison** — not a neutral listicle/comparison page.
- SERP expects: **Comparison Page**
- **Verdict: CRITICAL MISMATCH.** No page on the domain frames TutorA against *named* competitors (Wyzant, Superprof, Preply, Varsity Tutors) or answers "which tutoring website is best," and the one comparison asset that exists is vendor-self-promotional rather than the neutral "here's how the top N compare" format Google is rewarding here.

### User Stories
1. As a **comparison shopper evaluating 3-5 platforms**, I want a side-by-side feature/price matrix across named competitors, because I don't want to open eight tabs myself, but I'm blocked by TutorA's only comparison asset being framed as "us vs. generic open marketplace" rather than "us vs. Wyzant vs. Superprof vs. Preply." *(Source: all 4 ranking results are listicles naming 5-13 specific competitors each.)*
2. As a **skeptical searcher wary of vendor bias**, I want an outside/neutral-feeling ranking, because a company's own homepage comparison table is inherently self-serving, but I'm blocked by TutorA having no independent-feeling content (no blog, no third-party-style review page) — only the on-page vendor table. *(Source: all ranking pages are third-party blogs, not vendor homepages.)*
3. As a **parent who has already narrowed to TutorA** and wants final reassurance it's the right pick for their specific case (e.g. "best for test prep" or "best for young kids"), I want segmented "best for X" framing, because that reduces last-mile doubt, but I'm blocked by TutorA's comparison table using generic factors (not "best for" segments the way FullMind/SplashLearn structure their lists). *(Source: SplashLearn/FullMind headers use "best for X grade/need" segmentation.)*

### Gap Analysis — SXO Score: 33/100

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (15) | 3 | Self-comparison table exists but is not the neutral listicle/matrix format SERP rewards. |
| Content Depth (15) | 5 | 4-factor table only; no named-competitor detail, no "best for" segmentation. |
| UX Signals (15) | 6 | Table is on-page but buried mid-homepage scroll, not a standalone linkable asset. |
| Schema (15) | 5 | No ItemList/Table schema on the comparison section. |
| Media (15) | 4 | Table is text-only, no visual matrix/icons. |
| Authority (15) | 6 | Self-authored comparison inherently lower-trust than third-party format. |
| Freshness (10) | 4 | No dateModified signal tied to the comparison content specifically. |
| **Total** | **33** | |

### Persona Scores

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Multi-Platform Comparison Shopper | 8 | 8 | 10 | 10 | 36 | Needs Work |
| Bias-Skeptical Searcher | 5 | 5 | 6 | 6 | 22 | Critical Mismatch |
| Narrowed-to-TutorA Reassurance Seeker | 15 | 14 | 12 | 16 | 57 | Needs Work |

---

## Consolidated Summary

| Keyword | SERP Dominant Page Type | tutora.it.com Page Type | Verdict | SXO Score |
|---|---|---|---|---|
| find a tutor | Hybrid Service/Marketplace | Hybrid Service/Marketplace | **ALIGNED** | 64/100 |
| math tutor near me | Local Page (subject-local hybrid) | Subject-filtered global directory (no geo) | **MISMATCH — CRITICAL** | 45/100 |
| how much does a tutor cost per hour | Blog Post / cost guide | No page exists | **MISMATCH — CRITICAL** | 21/100 |
| tutor in Austin, TX | Local Page | No page exists | **MISMATCH — CRITICAL** | 15/100 |
| best tutoring website | Comparison Page / listicle | Self-comparison table (Landing Page asset) | **MISMATCH — CRITICAL** | 33/100 |

**Average SXO score: 36/100.** 4 of 5 keyword categories are critical page-type mismatches, and in 2 of those 4 (cost, local) the mismatch is total content absence, not a weak page. Only the broad head term is structurally aligned, and even it is held back by weak Trust/Media/Authority scores shared across every keyword pattern below.

---

## Prioritized Gaps (ranked by likely ranking impact)

1. **Zero local/city pages anywhere on the domain** (affects KW2, KW4 directly; likely affects a large share of real-world tutoring search volume, since "[subject] tutor near me" and "[service] in [city]" are two of the highest-volume patterns in this vertical). Fix: build a location-page template (`/locations/austin-tx`, `/locations/[city-slug]`) with LocalBusiness/Service schema, a stated service-area/timezone-coverage statement ("Our tutors work across all US time zones, including Central Time — most Austin-area students book evening sessions between 4–8pm CT"), and links into subject pages filtered implicitly by that timezone/availability window. Even without literal in-person Austin tutors, an explicit "we serve remote students in Austin, TX" page beats zero pages.

2. **No cost/pricing content page** (KW3 — a purely informational, high-intent-adjacent query with 100% blog-post SERP consensus and zero matching content on TutorA). Fix: publish a dedicated `/pricing` or `/tutoring-costs` page with a rate table by subject tier (e.g. "$20-$35/hr: core subjects | $35-$55/hr: AP/IB/test prep | $45-$65/hr: specialized/college-level"), state the success-fee percentage explicitly (currently undisclosed even in the FAQ), and add it to primary nav — not just an About-page FAQ line.

3. **No competitor-named comparison/alternatives content** (KW5 — the self-comparison table on the homepage is the wrong format: vendor-authored, 4-factor, no named competitors). Fix: create a standalone `/tutora-vs-wyzant-vs-superprof` or `/alternatives` page with a real feature matrix (price model, vetting process, subject count, guarantee, refund policy) against 3-4 named competitors, plus "best for" segments (best for test prep, best for young learners, best for budget) mirroring the SplashLearn/FullMind listicle structure that currently ranks.

4. **No aggregate review count or star rating displayed anywhere** (systemic Trust/Authority gap present in all 5 keywords' persona scores — every competitor leads with a specific number: Care.com "16,580 reviews," Wyzant "4M 5-star reviews / 65,000 tutors"). Fix: surface an aggregate rating + review count stat (with AggregateRating schema) in the homepage hero and on subject/course pages — even a modest real number (e.g. "4.8★ from 340 completed matches") outperforms zero social-proof numbers.

5. **No location search/filter UI component** (KW1 gap, compounds KW2/KW4). Fix: add a lightweight "Your timezone / general region" selector to the `/find-a-tutor` and subject-filter pages — doesn't require in-person geo-matching, just needs to signal geo-awareness to both users and Google (ties into location-page fix #1 via internal linking).

6. **No tutor photos — initial-letter avatars only, and no video** (Media dimension scored 4-6/15 across all five keywords; a recurring finding also flagged in the prior single-page sxo.md audit at 5/15). Fix: require a real profile photo at tutor onboarding (or a short 30-second intro video), starting with the "Freshly Vetted" and top-rated tutor cards shown on the homepage and subject pages, since those are the highest-visibility surfaces.

7. **Undisclosed success-fee percentage** (surfaced specifically in KW3 but undermines Trust score in KW1/KW5 too — the FAQ says "percentage-based success fee" without a number, which reads as evasive next to competitors' explicit $/hr anchors). Fix: state the actual percentage (or a worked dollar example: "e.g., a $30/hr match carries a one-time $X success fee") directly in the pricing content from gap #2, not buried in fee-mechanics language.

8. **No blog/content section at all** (structural root cause of gaps #2 and #3 — sitemap confirms no `/blog/` path exists). Fix: stand up a minimal content section (even 5-10 posts covering cost guides, "how to choose a tutor," subject-specific study guides) to give the domain a page-type inventory that can actually compete for the Blog-Post-dominant and Comparison-Page-dominant SERPs identified in KW3 and KW5 — this is the single highest-leverage structural fix since it unlocks two of the four critical mismatches at once.

---

## Limitations

- No `DataForSEO` or rendered-SERP tooling was available; `WebSearch`/`WebFetch` were used per the fallback instructions in `SKILL.md`. True PAA question lists, featured-snippet formats, AI Overview content, ad copy, and the local map pack were **not directly observed** — signals were inferred from search-result titles/snippets and general knowledge of the vertical, which is a materially lower-precision substitute for live SERP capture.
- Word counts and exact schema inventories on competitor pages are estimated from fetched summaries, not raw HTML/DOM inspection.
- Only 1 keyword per category was analyzed (as scoped); actual ranking impact depends on real search volume for each query, which was not measured (no Keyword Planner / DataForSEO volume data pulled).
- Superprof's homepage returned HTTP 403 to WebFetch; its city-page and subject-page content was assessed via SERP snippets and analogous fetched pages (Care.com, Wyzant) rather than a direct fetch.
- TutorA page classifications for KW3/KW4 ("no page exists") are based on sitemap URL-pattern inspection plus targeted fetch of `/about`, `/subjects`, and `/find-a-tutor?subject=...` — not an exhaustive fetch of all 191 site URLs, so a very obscure matching page could theoretically have been missed, though the sitemap's path taxonomy makes this unlikely.

## Cross-Skill Recommendations

- Gaps #1/#5 (local pages, location UI) → hand off to `/seo local` for GBP/local-schema-specific guidance if TutorA pursues any physical/regional presence claims.
- Gap #8 (blog buildout) → hand off to `/seo cluster` for topic-cluster planning once a blog section is scoped, and `/seo content-brief` for the first cost-guide and comparison-page briefs.
- Gap #3 (comparison page) → hand off to `/seo competitor-pages` for the vs./alternatives page template and schema.
- Gap #4 (review/rating schema) → hand off to `/seo schema` for AggregateRating implementation once real review data exists.
- Gap #6 (tutor photos/video) → hand off to `/seo images` once photo capture is operationally solved.
