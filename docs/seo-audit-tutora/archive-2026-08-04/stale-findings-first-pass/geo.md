# AI Search / GEO Readiness — tutora.it.com

**Category score: 54 / 100** (Needs Improvement)

## Dimension breakdown

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 62/100 | 15.5 |
| Structural Readability | 20% | 58/100 | 11.6 |
| Multi-Modal Content | 15% | 20/100 | 3.0 |
| Authority & Brand Signals | 20% | 45/100 | 9.0 |
| Technical Accessibility | 20% | 75/100 | 15.0 |
| **Total** | 100% | | **54.1 → 54** |

## AI crawler access (robots.txt)

`https://www.tutora.it.com/robots.txt` (verified live):

```
User-Agent: *
Allow: /
Disallow: /dashboard
Disallow: /tutor
Disallow: /admin
Disallow: /become-a-tutor
Disallow: /api/

Sitemap: https://www.tutora.it.com/sitemap.xml
```

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | Allowed (via wildcard) | No dedicated `User-agent: GPTBot` block |
| OAI-SearchBot | Allowed (via wildcard) | No dedicated block |
| ClaudeBot | Allowed (via wildcard) | No dedicated block |
| PerplexityBot | Allowed (via wildcard) | No dedicated block |
| Google-Extended | Allowed (via wildcard) | No dedicated block; not mentioned at all |
| CCBot / anthropic-ai / cohere-ai | Allowed (via wildcard) | Not selectively blocked, if the site wants to permit search citation but restrict raw training scraping, this is a missed opportunity |

`Disallow: /tutor` matches a private dashboard route (`/tutor` → HTTP 307 redirect, gated) and does **not** collide with the public tutor-profile URL pattern `/find-a-tutor/<slug>` (verified 200, publicly crawlable). Core commercial pages (`/`, `/about`, `/courses`, `/courses/<subject>`, `/find-a-tutor`, `/find-a-tutor/<slug>`) are fully open to crawling.

`sitemap.xml` returns 200 and is referenced correctly in robots.txt.

## llms.txt status: **Missing**

`https://www.tutora.it.com/llms.txt` returns HTTP 404 (falls through to the Next.js catch-all page, which itself renders with `<meta name="robots" content="noindex">`). No `llms.txt` or `llms-full.txt` exists. No RSL 1.0 license file (`/rsl.xml` → 404) or `rel="license"` link was found on the homepage either.

## Technical accessibility

- All pages checked (`/`, `/about`, `/courses`, `/courses/guitar-a7d7f6aa`, `/courses/sat-c5d2749b`, `/courses/python-ff654450`) render fully via **raw HTTP fetch** (`is_spa: false`, `mode_used: raw`, `X-Nextjs-Prerender: 1`) — this is server-rendered/statically-generated Next.js content, not a client-side SPA shell. Non-JS-executing AI crawlers (GPTBot, ClaudeBot, PerplexityBot do not execute JavaScript) see the same content a human browser sees for body copy, headings, and JSON-LD.
- However, a Playwright render of the homepage confirmed a client-side-only content gap (see Finding 1 below): key trust statistics are populated via a JS count-up animation and are **not present as text in the server HTML**.
- Rich structured data is present and valid on every page checked: `Organization`, `WebSite`, `WebPage` (with `dateModified`), `FAQPage`, `HowTo`, `Service`, `BreadcrumbList`, and `Course` schema (on `/courses`). All blocks validated (`"valid": true"` in every block, 0 errors).

## Brand mention / entity signal analysis

- **Wikipedia**: No entity found; not referenced anywhere on-site.
- **YouTube**: Zero YouTube embeds, links, or video content anywhere on the homepage, `/about`, `/courses`, or the course/tutor pages checked (this is the single strongest brand-citation correlator per GEO research at ~0.737, and it's entirely absent).
- **Reddit**: No links or references found.
- **LinkedIn**: No company or founder LinkedIn links found in the footer or `/about` page.
- **Organization schema `sameAs`**: Not populated — the `Organization` JSON-LD block only contains `name`, `url`, and `description`. No links to social profiles, Wikipedia, Crunchbase, or review sites, which is a missed, low-effort way to strengthen the entity graph search engines and LLMs build for the brand.
- **Founder/team identity**: `/about` describes the company's model ("We started TutorA because...") but names no founder, executive, or team member — no `Person` schema, no bios, no headshots.
- **On-site social/footer links**: A full scan of the rendered footer found **no outbound links** to any social, video, or community platform.

## What works

- Homepage and About page both open with a direct, self-contained definition of what the company is and how it works within the first 1-2 sentences ("TutorA sits between students and tutors so no one has to guess...") — this is exactly the direct-answer pattern LLMs prefer to extract and cite.
- Course detail pages (checked: Guitar, SAT Prep, Python) land almost exactly in the optimal 134-167 word citation range (142, 144, and 155 words respectively) for their "About this course" answer block, each self-contained with specific facts: hours of instruction, skill level, price per hour, and a bulleted "What you'll learn" list.
- `FAQPage` JSON-LD is present on the homepage, `/about`, and `/courses` with genuinely well-scoped single-topic Q&A pairs (e.g., "What is TutorA?", "How much does it cost?", "Can I contact a tutor directly?") — these are close to ideal for direct extraction into AI answer boxes.
- `HowTo` schema on the homepage cleanly encodes the 3-step matching process, and `Service`/`Course`/`BreadcrumbList` schema round out a genuinely strong structured-data foundation for a marketplace site.
- `WebPage` schema includes `dateModified` (freshness signal), and the homepage's copy explicitly labels its trust stats as "reviewed platform activity — not self-reported claims," which is a good practice for AI-answer trustworthiness once the underlying numbers are actually crawlable (see Finding 1).
- The site is fully server-rendered (no SPA shell, no client-side-only page content), so the substantial majority of body text and all schema is directly visible to non-JS AI crawlers without any rendering budget cost.
- robots.txt uses a permissive `Allow: /` default and only disallows genuinely private/duplicate routes (dashboard, tutor login, admin, become-a-tutor form, API) — no AI crawler is being inadvertently blocked, and a valid sitemap is declared.

## Findings

### Finding 1 — Headline trust statistics render as "0" for non-JS AI crawlers
**Severity: High**

The homepage's "Current platform data" section is the site's strongest citable proof-point block (verified tutor count, successful match count, average match time) — but the actual values only exist in `data-target` attributes (`data-target="1200"`, `data-target="8600"`, `data-target="31"`) that drive a client-side JavaScript count-up animation. The visible text node in the server-rendered HTML (what non-JS crawlers like GPTBot, ClaudeBot, and PerplexityBot actually parse) is literally "0" for all three stats. Confirmed via both raw `curl` fetch and a full Playwright render (the animated value only appears after the count-up script executes in a real browser).

**Recommendation**: Server-render the actual numeric value as the visible text node (e.g., `<span data-target="1200">1,200+</span>` instead of `<span data-target="1200">0</span>`), and let the JS animation progressively update from that pre-rendered value rather than from zero. This is a one-line component fix and immediately unlocks the site's best "1,200+ verified tutors / 8,600 successful matches / ~31 hr average match time" citation for any AI engine reading server HTML.

### Finding 2 — No `llms.txt` file
**Severity: Medium**

`https://www.tutora.it.com/llms.txt` returns 404. While Google ignores this file, ChatGPT/OpenAI and Perplexity crawlers are reported to consult it where present, and it gives a low-effort way to point AI agents directly at the highest-value pages (homepage, `/about`, `/courses`, top subject pages) with a one-line description each.

**Recommendation**: Publish `/llms.txt` (Markdown) listing: site name/one-line description, links to `/about`, `/courses`, and a representative sample of subject pages, and a short summary of the vetting/matching model and pricing (no listing fees, success-fee-only). Keep it under ~2KB and update it when major new subject categories launch.

### Finding 3 — Zero images anywhere on the site (homepage, course pages, tutor profiles)
**Severity: Medium**

Confirmed via both raw HTML and full Playwright-rendered DOM: 0 `<img>` elements site-wide across the homepage, course detail pages, and individual tutor profile pages (e.g., `/find-a-tutor/sudipto-ffbf5742`). All visuals are decorative inline SVG. There are no tutor headshots, no course thumbnails/screenshots, no explainer video, and therefore nothing for AI Overviews or multimodal answer engines to surface alongside a text citation, and no image `alt` text corpus to reinforce topical relevance.

**Recommendation**: Add tutor profile photos (with descriptive `alt` text, e.g., "Sudipto, guitar tutor with 5 years teaching experience") and course thumbnail/preview images at minimum; a short intro or sample-lesson video embedded on the homepage or top course pages would also address the strongest brand-citation correlator (YouTube presence) if hosted/embedded from a YouTube channel.

### Finding 4 — No entity/brand signals off-page or in schema (`sameAs`, social, Wikipedia, YouTube, Reddit)
**Severity: Medium**

The `Organization` JSON-LD block on every page contains only `name`, `url`, and `description` — no `sameAs` array, no `logo`, no `foundingDate`, no `founder`. A full footer/DOM scan found zero outbound links to LinkedIn, YouTube, Reddit, Twitter/X, Instagram, or Facebook. No founder or team member is named on `/about`. This leaves the brand with essentially no external entity graph for AI systems (or Google's Knowledge Graph) to corroborate, which research correlates strongly with AI citation likelihood (YouTube ~0.737, Reddit and Wikipedia presence both "high" correlation).

**Recommendation**: (1) Add a `sameAs` array to the `Organization` schema linking any real LinkedIn company page, Twitter/X, Instagram, and YouTube channel the brand controls. (2) Add visible footer/social links matching those same profiles. (3) Name and credential the founder(s)/leadership team on `/about` with a `Person` schema and a LinkedIn `sameAs` link each. (4) Pursue a Wikipedia/Wikidata entity once the brand has enough independent secondary coverage, and encourage organic mentions in relevant Reddit tutoring/education threads.

### Finding 5 — FAQ "question" headings are not real `<h2>`/`<h3>` elements
**Severity: Low**

The FAQ accordion questions on the homepage and `/about` (e.g., "What is TutorA?", "How much does it cost?") are visually styled as headings but are implemented as `<span class="...font-semibold...">` inside an accordion trigger, not semantic heading tags. The `FAQPage` JSON-LD compensates for machine-readable extraction, but the visible DOM heading outline doesn't reflect the Q&A structure, which weakens accessibility and the redundancy AI crawlers use to cross-validate content structure when JSON-LD parsing fails or is stripped by an intermediate proxy.

**Recommendation**: Wrap each FAQ question's visible text in a semantic `<h3>` (nested under a "Frequently asked questions" `<h2>`) in addition to the existing `FAQPage` JSON-LD, so the same Q&A pairs are reinforced in both the DOM heading outline and structured data.

### Finding 6 — No AI-crawler-specific robots.txt directives
**Severity: Low**

robots.txt relies entirely on the wildcard `User-agent: *` block; there are no dedicated `User-agent: GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, or `Google-Extended` stanzas. Functionally the site is currently open to all of these crawlers (this is *not* a blocking issue), but the lack of explicit rules means the site can't selectively permit AI-search crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) while restricting training-only scrapers (CCBot, anthropic-ai, cohere-ai) if that becomes a business preference later, and it leaves crawler intent ambiguous to anyone auditing the file.

**Recommendation**: Add explicit `Allow: /` stanzas for GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot (documenting intent even though the wildcard already covers them), and decide/document a policy for CCBot, anthropic-ai, and cohere-ai training crawlers.

## Platform-specific visibility estimate (qualitative, no live DataForSEO data available)

| Platform | Estimated readiness | Rationale |
|---|---|---|
| Google AI Overviews | Fair | Strong schema + SSR content helps; thin backlink/entity profile likely limits inclusion |
| ChatGPT / OAI-SearchBot | Fair-Weak | No `llms.txt`; open robots.txt; direct-answer copy exists but headline stats are crawler-invisible (Finding 1) |
| Perplexity | Fair-Weak | Same llms.txt gap; benefits from clean SSR HTML and FAQ schema |
| Bing Copilot | Fair | Standard robots.txt/sitemap compliance should be sufficient for indexing; no differentiators beyond baseline |

DataForSEO MCP tools (`ai_optimization_chat_gpt_scraper`, `ai_opt_llm_ment_search`) were not available in this session, so the platform table above is a qualitative estimate based on on-page/technical signals, not live citation testing. Re-run with DataForSEO enabled for measured visibility once the fixes above ship.
