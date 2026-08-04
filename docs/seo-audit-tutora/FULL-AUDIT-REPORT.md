# Full SEO Audit — tutora.it.com

**Site:** https://www.tutora.it.com/
**Business type:** Online tutoring marketplace (Next.js on Vercel, SSR). Matches students/parents with vetted tutors across academic, test-prep, language, coding, and creative-arts subjects. Not a brick-and-mortar or single-location business — no local SEO signals expected or scored.
**Scope:** 71-URL sitemap (7 top-level pages, 44 `/courses/<subject>` pages, ~26 `/find-a-tutor/<tutor>` profile pages). Representative samples audited per category due to time constraints — templating was confirmed byte-identical across every sampled instance of the course/tutor templates, so findings are treated as representative of the full population.
**Data availability:** No Google Search Console / PageSpeed / CrUX credentials configured (lab-only performance data). No Moz / Bing Webmaster keys configured (Common Crawl-only backlink tier, which returned no data — domain not yet in Common Crawl's graph). No prior drift baseline existed (one was not captured this run).

---

## Executive Summary

### Overall SEO Health Score: 51 / 100 — Needs Improvement

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO (incl. sitemap) | 81/100 | 22% | 17.8 |
| Content Quality | 33/100 | 23% | 7.6 |
| On-Page SEO | 42/100 | 20% | 8.4 |
| Schema / Structured Data | 80/100 | 10% | 8.0 |
| Performance (Core Web Vitals) | 30/100 | 10% | 3.0 |
| AI Search Readiness (GEO) | 54/100 | 10% | 5.4 |
| Images | 10/100 | 5% | 0.5 |
| **Total** | | **100%** | **~51** |

*(On-Page SEO and Images don't have a dedicated specialist report in this run — On-Page is synthesized from technical's meta-tag findings, SXO's heading-structure/CTA findings, and content's internal-linking findings; Images reflects the confirmed sitewide absence of `<img>` tags found independently by four different specialists.)*

**Supplementary scores** (informative, not part of the weighted formula above):
- **Visual/UX:** 82/100 — genuinely strong, best score in the audit
- **SXO Gap Score:** 33/100 — measures fit between page type and what Google actually ranks for target keywords; lower means bigger mismatch
- **Backlinks:** Insufficient data — domain not yet present in Common Crawl's web graph; not the same as "zero backlinks," but no free-tier tool can currently see any link equity

### The core story

TutorA has an unusually strong **technical and structured-data foundation** for a site this size — clean canonicalization, full security headers, valid JSON-LD across the board, fast server response times, and a genuinely well-designed, mobile-friendly UI. That foundation is being undermined by two things that matter more for the stated goal of **ranking 100+ keywords**:

1. **The 44 course pages and ~26 tutor profile pages — 97% of the site's indexable URLs — are severely templated, thin content** (136–210 words, identical trust sentences copied verbatim across every subject). This is the single biggest blocker to ranking at scale: Google's helpful-content systems are specifically designed to detect and suppress exactly this pattern.
2. **Core Web Vitals fail badly** (homepage Total Blocking Time of 6.3 seconds, Time to Interactive of 19.6 seconds on mobile lab tests) due to a single shared JS animation component causing layout thrashing sitewide — this is a rankings and conversion risk that compounds the content problem.

A third, cross-cutting issue showed up independently in **three separate audits** (content, GEO, SXO): the homepage's headline trust statistics ("1,200+ verified tutors," "8,600 successful matches") render as literal **"0"** to any crawler or AI system that doesn't execute the count-up JavaScript — and the course-page "4.8 star" rating badges show a rating with **zero backing reviews**. Both are one-line-ish fixes with outsized trust impact.

### Top 5 Critical Issues

1. **Templated/thin content across 97% of indexable URLs** (Content #1, #2 — Critical). All 44 course pages share one trust sentence verbatim; all sampled tutor bios restate the same 3 facts twice in ~75 words. This is the primary blocker to ranking for 100+ keywords — Google will not reward, and may actively suppress, doorway-style templated pages at this scale.
2. **Severe Core Web Vitals failure, sitewide** (Performance #1–#3 — Critical). Root cause: two shared JS chunks cause forced-synchronous-layout ("layout thrashing"), driving TBT to 6.3s and homepage TTI to 19.6s on throttled mobile. This is a single shared component — fixing it improves every page at once.
3. **Course pages are the wrong page type for their target keywords** (SXO #1, #2 — Critical/High). For "SAT tutor online," Google rewards Service/Hybrid pages with guarantees, credentialed bios, and testimonials; for "python tutor," it rewards marketplace tutor-card grids. TutorA's course pages are thin abstract product listings — even with more words, the current template won't compete without restructuring.
4. **Trust stats render as "0" to non-JS crawlers and AI systems** (Content #4, GEO #1 — High, confirmed independently twice). Client-side count-up animation with no server-rendered fallback value.
5. **Fabricated-looking "4.8 (0)" rating badges** on every course page (Content #3, Schema #5, SXO #4 — High). A precise star rating with zero reviews is a checkable, falsifiable trust claim that fails on inspection — and would risk a manual action if `AggregateRating` schema were ever added to match it.

### Top 5 Quick Wins (cheap, ship this week)

1. **Server-render the real trust-stat numbers** instead of "0" (one component fix, fixes 3 separate audit findings at once).
2. **Suppress the star-rating badge when review count is 0** — show "No reviews yet" instead, matching what tutor profile cards already correctly do.
3. **Remove the deprecated `HowTo` schema block** on the homepage (Google retired HowTo rich results in 2023 — zero benefit, unnecessary weight).
4. **Add `rel="nofollow"` (or remove) the `/admin` and `/dashboard` footer links** that appear on every page while being disallowed in robots.txt — a pure crawl-budget waste.
5. **Add `logo` and `sameAs` to the sitewide `Organization` schema** — cheap Knowledge Panel / entity-graph signal.
6. **Fix the broken template splice on the Python course page** ("you'll be able to python Programming for Beginners") — and spot-check the other 43 course pages for the same bug.
7. **Publish a real, public `/become-a-tutor` landing page** — currently there's no indexable page recruiting the supply side of the marketplace at all.

---

## Technical SEO — 84/100 (folds in Sitemap: 78/100)

**What works:** Valid, correctly-declared sitemap; clean self-canonicalizing URLs including query-filtered pages; correct protocol/host redirect consolidation; full modern security-header suite; 100% server-rendered content with zero console errors; rich JSON-LD; fast (120–480ms TTFB), lightweight (9–36KB Brotli) pages; self-hosted preloaded fonts; unique titles/meta descriptions per page.

**Key findings:**
- **High** — `/admin` and `/dashboard` links appear in the server-rendered footer of *every* page, yet both are disallowed in robots.txt — the "linked + blocked" crawl-budget waste pattern, confirmed sitewide.
- **Medium** — 66 of 71 URLs (all course + tutor pages) have no `og:image`, and their Twitter Card metadata falls back to generic homepage copy instead of page-specific text.
- **Medium** — The `/courses` hub's `ItemList` schema mislabels 5 category-filter links as individual `Course` entities — a schema.org type mismatch.
- **Medium** — CSP allows `'unsafe-inline'` for scripts/styles, undercutting its XSS protection.
- **Medium (sitemap)** — The 64 course/tutor `lastmod` timestamps cluster in two ~10-minute windows in strict sequence — these read as generation timestamps, not genuine content-edit dates, and Google may discount them.
- **High (sitemap)** — `/become-a-tutor` 307-redirects straight to `/login` and is correctly disallowed, but this also means **there is no public, indexable page anywhere on the site recruiting tutors** — a real content/acquisition gap, not just a technical one.
- **Low/Info** — Missing `Organization.logo`/`sameAs`; zero `<img>` tags anywhere (see Images section); minor tutor-name capitalization inconsistency (2 of 7 sampled); no IndexNow implementation found.

---

## Content Quality — 33/100

The weakest score in the audit and the single biggest lever for the "rank 100+ keywords" goal.

**What works:** Homepage carries genuine, valid JSON-LD (7 schema blocks); clear, coherent "human-vetted, not an open marketplace" value proposition; the vetting-process claims (ID check, background check, video interview) are a real differentiator concept; tutor cards contain concrete data points (years of experience, specific subjects, rate); course pages have a consistent, scannable UX scaffold that could support real content if the prose were rewritten.

**E-E-A-T composite: 27/100** (Experience 22, Expertise 30, Authoritativeness 20, Trustworthiness 33) · **AI citation readiness: 38/100**

**Critical findings:**
- All 10 sampled course pages, across every subject category, share one verbatim 27-word trust sentence and a near-identical 136–155 word template — no syllabus, no instructor attribution, no subject-specific depth.
- All 6 sampled tutor profiles (67–82 words) restate the same 3 facts (name, subjects, years) twice within one page, using an identical 3-clause template.

**High findings:**
- Star ratings ("4.8 (0)", "5.0 (0)") shown with zero reviews on every course page — a falsifiable trust claim that fails on inspection.
- Homepage's headline trust stats render as literal "0" in the crawlable DOM (JS count-up animation, no SSR fallback).

**Medium findings:**
- `/about` (215 words) names no founders/team, no company history, no address — the page that should carry the most E-E-A-T weight for a "personally vetted by our team" positioning currently identifies no humans at all.
- Tutor profile pages don't display the "4 checkmarks" verification badges the homepage advertises — the trust claim and the trust proof are disconnected.
- A broken template splice on the Python course page produces the literal, unedited fragment "you'll be able to python Programming for Beginners."

---

## On-Page SEO — ~42/100 (synthesized)

No dedicated single-page crawl was run in this pass; this score synthesizes on-page-adjacent findings from Technical, SXO, and Content:
- Titles/meta descriptions are unique and well-formed per page (positive — from Technical).
- 66 of 71 pages missing `og:image` / page-specific Twitter Card metadata (negative — from Technical).
- `/find-a-tutor` has only one `<h3>` below its `<h1>` — no `<h2>` sections, no "how it works" structure (negative — from SXO).
- Course pages lack FAQ/comparison/objection-handling content that dominates their competitive SERPs (negative — from SXO).
- Duplicate/triplicate identical anchor links per tutor card on `/find-a-tutor` (each tutor's profile link repeated once per subject tag) inflate boilerplate and dilute internal-linking signal (negative — from SXO).

---

## Schema / Structured Data — 80/100

Above-average implementation: JSON-LD exclusively, correct `https://schema.org` context, absolute URLs, valid `Organization`, `WebSite`, `Course` (with `offers`), `Person` (with `knowsAbout`/`worksFor`), and `BreadcrumbList` — no placeholder values found anywhere sampled.

**Findings:**
- **High** — Deprecated `HowTo` block on homepage (Google removed HowTo rich results in Sept 2023) — remove or replace with plain `ItemList`.
- **Medium** — `Organization` missing `logo`/`sameAs`.
- **Medium** — `Course` missing recommended `hasCourseInstance` (duration/mode data already exists on-page, just not in schema).
- **Medium (data-integrity flag)** — Do **not** add `AggregateRating` until real, non-zero reviews exist — matches the "4.8 (0)" display issue flagged in Content; adding it now would risk a non-genuine-review manual action.
- **Info** — `FAQPage` schema is valid but produces no Google SERP feature anymore (retired sitewide) — safe to keep, not worth adding to more pages expecting a rich result.
- **Low** — `BreadcrumbList` missing on `/about`.

---

## Performance / Core Web Vitals — 30/100

Lab-only (no CrUX/PSI credentials). Lighthouse 12.8.2, mobile, standard throttling.

| Page | LCP | TBT | CLS |
|---|---|---|---|
| Home | 4.04s (Poor) | 6,340ms (Poor) | 0 (Good) |
| /courses | 2.9s (Needs Improvement) | 2,280ms (Poor) | 0.012 (Good) |
| /find-a-tutor | 3.0s (Needs Improvement) | 4,890ms (Poor) | 0 (Good) |
| /courses/python-... | 2.6s (Needs Improvement) | 810ms (Poor) | 0 (Good) |

**Root cause (Critical):** Two shared JS chunks cause forced-synchronous-layout ("layout thrashing") on every page — almost certainly a scroll-reveal animation reading DOM geometry synchronously. This explains why 92–96% of LCP time is "render delay" (the LCP element is plain text already in the HTML, but paint is blocked by main-thread contention) and why homepage Time to Interactive reaches 19.6 seconds. **This is the single highest-leverage fix in the entire audit** — one shared component, sitewide impact.

Other findings: `/find-a-tutor`'s DOM has 4,544 elements (~3x the recommended ceiling); render-blocking CSS with no font preload hints on hub pages. CLS is excellent everywhere — not a concern. Contrary to initial hypothesis, image weight is not a risk: the site loads zero image bytes (see Images section).

---

## AI Search Readiness (GEO) — 54/100

| Dimension | Score |
|---|---|
| Citability | 62/100 |
| Structural Readability | 58/100 |
| Multi-Modal Content | 20/100 |
| Authority & Brand Signals | 45/100 |
| Technical Accessibility | 75/100 |

**What works:** Homepage and `/about` open with direct, self-contained definitions LLMs prefer to extract; course pages land almost exactly in the ideal 134–167 word citation range; fully server-rendered (no SPA shell) so non-JS AI crawlers (GPTBot, ClaudeBot, PerplexityBot) see full content; robots.txt permissively allows all AI crawlers via wildcard.

**Findings:**
- **High** — Same "0" trust-stat bug as Content #4, independently confirmed via Playwright render diffing — this is the site's single best citation asset and it's currently invisible to non-JS crawlers.
- **Medium** — No `llms.txt` (404). ChatGPT/Perplexity crawlers reportedly consult it where present.
- **Medium** — Zero images sitewide — nothing for multimodal answer engines to surface, no alt-text corpus.
- **Medium** — No entity/brand signals anywhere: no `sameAs`, no social links in the footer, no named founder/team, no YouTube presence (the single strongest brand-citation correlator per GEO research, ~0.737 correlation) — entirely absent.
- **Low** — FAQ questions are styled as headings but aren't semantic `<h2>`/`<h3>` elements.

---

## Images — ~10/100

Confirmed independently by **four separate audits** (Technical, Content, Performance, GEO, SXO): there is not a single `<img>` element anywhere on the site — homepage, course pages, and tutor profiles all use CSS-drawn gradients and initials-only avatars. This is genuinely good for page weight/CLS (part of why Performance's CLS score is excellent), but for a marketplace whose entire value proposition is "personally vetted" trust in real humans, having zero tutor photos is a significant trust gap, forecloses Google Images as a discovery channel entirely, and removes a strong AI-citation correlator (see GEO). Score reflects this as a real gap even though it's not a broken-alt-text problem in the traditional sense — there's simply nothing there yet.

---

## Visual / UX — 82/100 (supplementary, not weighted into Health Score)

Genuinely the strongest area of the site. Clear benefit-led H1 and trust badge above the fold; primary CTAs visible without scrolling on all four tested viewports; clean single-column mobile reflow with no overflow; legible typography; well-sized touch targets. Minor findings: a hero fade-in animation that can leave CTAs near-transparent during initial paint (worth checking against the Performance layout-thrashing root cause — may be the same component); tutor profile pages load noticeably slower on mobile; unused whitespace in the desktop hero right column; unlabeled verification badge icons on tutor profiles.

---

## Search Experience (SXO) — 33/100 (supplementary — directly explains ranking risk)

This is the most important supplementary section for the "rank 100+ keywords" goal: it measures whether TutorA's page *types* match what Google actually rewards for its target keywords, independent of content quality or technical correctness.

- **"SAT tutor online"** → CRITICAL mismatch. SERP is dominated by Service/Hybrid pages (PrepScholar: 4 pricing tiers, "160+ point increase" guarantee, 8 credentialed tutor bios, testimonials, comparison table). TutorA's page: 191-word thin product listing, no tutor identity, no guarantee.
- **"python tutor"** → HIGH mismatch. SERP is dominated by marketplace tutor-card grids (Preply, Superprof). TutorA's page: one abstract course, zero tutor cards, no subject-filterable marketplace URL.
- **"find a tutor"** → Page type ALIGNED (marketplace-hub format matches Wyzant/Care.com), but execution is weak — no real photos, "No reviews yet" everywhere, no aggregate trust stat comparable to competitors' "4 million 5-star reviews."

**Implication for the 100+ keyword goal:** rewriting course-page copy alone (fixing Content's findings) will help, but the course-page *template itself* is structurally the wrong page type for its highest-value keywords. The `/find-a-tutor` template is closer to correct and should be the model to extend — e.g., embedding subject-filtered tutor-card grids directly on course pages, per SXO Finding #2.

---

## Backlinks — Insufficient Data

No Moz/Bing API keys configured; Common Crawl (the only available free source) has no record of tutora.it.com in its current web-graph snapshot. This does **not** mean zero backlinks — Common Crawl samples ~25–40% of the web and updates quarterly, and a newer/smaller domain can simply not be picked up yet. Given the domain's age and the total absence of measurable data, the practical takeaway is the same either way: **prioritize link acquisition**, detailed in the Action Plan below.

---

*Generated by claude-seo full-site audit. See individual specialist findings under `findings/` for complete detail, evidence, and code-level recommendations (JSON-LD snippets, etc.) behind every item summarized above.*
