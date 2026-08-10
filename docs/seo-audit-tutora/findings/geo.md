# GEO (Generative Engine Optimization) Audit — tutora.it.com
Re-audit date: 2026-08-10 | Data source: LIVE fetches only (no archived/cached data read)

## GEO Readiness Score: 62 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 68/100 | 17.0 |
| Structural Readability | 20% | 78/100 | 15.6 |
| Multi-Modal Content | 15% | 25/100 | 3.75 |
| Authority & Brand Signals | 20% | 40/100 | 8.0 |
| Technical Accessibility | 20% | 88/100 | 17.6 |
| **Total** | | | **61.95 ≈ 62** |

## Live Data Confirmation
- `robots.txt`, `llms.txt`, homepage, `/about`, a subject page (`/subjects/algebra`), and `sitemap.xml` all fetched live from https://www.tutora.it.com on 2026-08-10 (curl + render_page.py, `X-Vercel-Cache: HIT` age 25–648s confirms current edge cache, not stale local files).
- Live `sitemap.xml` diffed byte-for-byte against the pre-verified `reaudit-2026-08-10-sitemap.xml` (191 URLs) — **identical, zero diff**.
- `/about` fetched fresh and confirmed to contain the new founder/company-history section (not present in the archived 2026-08-04 audit).
- Archived folder `docs/seo-audit-tutora/archive-2026-08-04/` was **not read**.

## AI Crawler Access (live-tested with real User-Agent headers, HTTP status returned)
`robots.txt`: `User-agent: * / Allow: /` (only `/dashboard`, `/tutor`, `/admin`, `/api/`, `/become-a-tutor` disallowed — none of these are AI-answer-relevant content).

| Crawler | Status |
|---|---|
| GPTBot | 200 Allowed |
| OAI-SearchBot | 200 Allowed |
| ClaudeBot | 200 Allowed |
| PerplexityBot | 200 Allowed |
| CCBot | 200 Allowed |
| anthropic-ai | 200 Allowed |
| cohere-ai | 200 Allowed |
| Google-Extended | 200 Allowed |

No AI crawler blocking anywhere. Sitemap declared in robots.txt.

## llms.txt
**Present and well-formed** at `/llms.txt` (200, live-verified). Clean markdown with a one-line entity definition, core pages, representative course categories, and optional legal links. No changes needed structurally; could add the `/about` founder narrative as a citable one-liner.

## RSL 1.0 Licensing
**Missing.** No `/rsl.xml`, `/.well-known/rsl.xml`, or `/ai.txt` found (all 404). Not yet a widely-adopted standard, but a zero-cost addition given llms.txt already exists.

## Citability (25%, 68/100)
- Homepage FAQ (schema `FAQPage`) has direct, self-contained answers, but they run **36–81 words** — under the 134–167 word optimal citation range. Answers are correct but terse; expanding to include one supporting stat + one concrete example each would improve extractability.
- H1 and lead paragraph give a direct definition in the first sentence ("In short: TutorA is an online tutoring marketplace that personally matches...") — strong.
- H2 headings are marketing-toned ("We stand in the middle — on purpose.") rather than question-phrased; only FAQ H3s are questions ("What is TutorA?", "How does TutorA verify its tutors?").
- Specific stats present (1,200+ tutors, 8,600 matches, 31-hr avg match time) but **self-reported with no third-party source attribution** — AI engines weight independently-sourced stats higher.
- 100+ programmatic `/subjects/*` pages are thin (~250 words unique content) — fine as directory pages but unlikely to be cited for informational queries; no blog/guide content exists site-wide for topical depth.

## Structural Readability (20%, 78/100)
- Clean SSR HTML, logical H1→H2→H3 hierarchy, `BreadcrumbList` on all sampled pages.
- Strong structured data: homepage carries 7 valid JSON-LD blocks (Organization+Person, WebSite, WebPage w/ `dateModified`, FAQPage, ItemList "how it works", Service, BreadcrumbList) — all validated.
- `/about` carries its own Organization+Person, WebSite, BreadcrumbList, FAQPage blocks.
- Gap: non-FAQ H2s aren't question-phrased, reducing snippet/AI-Overview match probability for "how does X work" queries.

## Multi-Modal Content (15%, 25/100)
- **Zero `<img>`, `<picture>`, or `_next/image` assets** found in SSR HTML on homepage or `/about` — checkmarks/avatars are CSS/text, not real images.
- No video content, no `VideoObject` schema, no infographics.
- This is the weakest dimension and a low-effort-to-flag, higher-effort-to-fix gap (tutor photos, a "how it works" explainer video/GIF, or at minimum meaningful `alt` text on real images would help multi-modal retrieval in Google AIO and Bing Copilot).

## Authority & Brand Signals (20%, 40/100)
**Improvement confirmed:** Sitewide `Organization` JSON-LD (present on homepage and `/about`) now includes:
```json
"founder": { "@type": "Person", "name": "Nancy Gupta", "jobTitle": "Founder" }
```
Plus a full grounded narrative on `/about` — admin-mediated matching model, success-fee-only pricing, rematch guarantee, and founder motivation story. This is a genuine, non-trivial authority upgrade: it gives AI answer engines a named human entity and origin story to attribute the brand to, rather than an anonymous company.

**However, the entity signal is still shallow:**
- `Person` node has no `sameAs` (no LinkedIn, no personal site, no Wikidata) — nothing to disambiguate "Nancy Gupta" against other people with that name, so knowledge-graph linkage is unlikely.
- No `image`, `award`, `alumniOf`, or credentials on the Person node.
- **No external brand footprint found:** no Wikipedia entity, no LinkedIn company page confirmed reachable, no YouTube channel, no Reddit threads discussing the brand, and the site footer contains **zero social/external links of any kind**. Given YouTube mentions (~0.737) and Reddit presence are the strongest correlates with AI citation, this is the single biggest authority gap.
- `WebPage.dateModified` (2026-08-03) is present — a good freshness signal — but no visible on-page byline/last-updated date for readers or crawlers to see without parsing JSON-LD.

## Technical Accessibility (20%, 88/100)
- SSR/prerendered: `X-Nextjs-Prerender: 1`, `is_spa: false`, full content present in raw pre-JS HTML — AI crawlers that don't execute JS get the complete page.
- Fast edge delivery via Vercel, `Cache-Control: public, max-age=0, must-revalidate` with edge cache HITs.
- Clean CSP, HSTS, no rendering errors.
- Minor deduction: no RSL licensing signal (see above).

## Top 5 Highest-Impact Changes

1. **Add `sameAs` + credentials to the Founder Person entity, and build at least one verifiable external profile (LinkedIn) to link.** Effort: Low (schema edit + create/link one LinkedIn profile). Impact: High — turns a name into a disambiguated, linkable entity.
2. **Add real images (tutor photos, workflow diagram) with descriptive alt text; consider a short "how it works" video with `VideoObject` schema.** Effort: Medium. Impact: High — currently 0 images site-wide is a hard ceiling on multi-modal retrieval.
3. **Expand FAQ/answer-block passages toward 134–167 words** by adding one concrete example or stat per answer, and rephrase 2–3 marketing H2s as questions (e.g., "How does TutorA vet tutors?"). Effort: Low. Impact: Medium-High for direct-answer extraction.
4. **Establish external brand presence (Reddit AMA/mentions, YouTube explainer, LinkedIn company page) and link them from the site footer.** Effort: Medium-High, ongoing. Impact: High — closes the single largest authority gap (currently zero external signals detected).
5. **Publish an `/rsl.xml` or `.well-known/rsl.xml` licensing file alongside the existing `llms.txt`.** Effort: Low. Impact: Low-Medium (emerging standard, but free to add given llms.txt infra already exists).

## Platform-Specific Visibility Assessment (qualitative, no live DataForSEO data pulled)

| Platform | Assessment | Rationale |
|---|---|---|
| Google AI Overviews | Moderate | Strong schema/FAQPage should qualify for rich snippets, but thin external authority and no images cap upside |
| ChatGPT / OAI-SearchBot | Moderate | Full crawler access + llms.txt is a real advantage; weak external corroboration limits confident citation |
| Perplexity | Moderate | PerplexityBot unblocked, self-contained FAQ answers are extractable, but self-reported stats lack third-party backing |
| Bing Copilot | Moderate | Benefits from same technical/schema strengths as Google AIO |

Only 11% of domains are cited by both ChatGPT and Google AI Overviews — closing the authority/external-mention gap (item 4 above) is the change most likely to move tutora.it.com into that group.
