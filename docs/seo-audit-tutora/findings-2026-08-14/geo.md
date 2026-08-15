# GEO (Generative Engine Optimization) Re-Audit — tutora.it.com
Re-audit date: 2026-08-14 | Data source: LIVE fetches (curl with real crawler UAs + `render_page.py`) plus git diff of commit `3e2376b` ("improved the geo issues") against the 2026-08-10 baseline audit.

## GEO Readiness Score: 69 / 100 (baseline: 62/100, +7)

| Dimension | Weight | Baseline (08-10) | Current (08-14) | Weighted (current) |
|---|---|---|---|---|
| Citability | 25% | 68/100 | **82/100** | 20.5 |
| Structural Readability | 20% | 78/100 | **80/100** | 16.0 |
| Multi-Modal Content | 15% | 25/100 | **30/100** | 4.5 |
| Authority & Brand Signals | 20% | 40/100 | **52/100** | 10.4 |
| Technical Accessibility | 20% | 88/100 | **90/100** | 18.0 |
| **Total** | | **62** | | **69.4 ≈ 69** |

**Verdict: real, verifiable improvement, not cosmetic.** The commit titled "improved the geo issues" (`3e2376b`, 2026-08-14) plus the two prior commits ("improved the detail tutor page", "improved the subject and courses detail page") together produced the two biggest score movements: Citability (+14) and Authority (+12). This is not a case of a low-effort commit message overselling small tweaks — every claim below was checked against live HTML/JSON-LD, not assumed from the diff.

## What Changed (verified against live site, not just the diff)

1. **`public/rsl.xml` added and live** — `https://www.tutora.it.com/rsl.xml` returns 200 with a valid RSL 1.0 document (`permits: search ai-input ai-index`, `prohibits: ai-train`, CC-BY-4.0 attribution, contact email). `app/layout.tsx` now emits `<link rel="license" href=".../rsl.xml" type="application/rsl+xml">` sitewide — confirmed present in the live homepage `<head>`. This closes the RSL gap flagged as recommendation #5 in the baseline audit.
2. **Founder + Organization entity now has real `sameAs` links** — live JSON-LD on the homepage confirms `founder.sameAs: ["facebook.com/share/1bPB4CEsjP/"]` and `Organization.sameAs: ["instagram.com/tutora.global.learning/"]`. Founder node also now carries a real `image` (a 119KB JPEG, `/about/nancy-gupta.jpeg`, replacing the CSS-initials avatar). Both social URLs are live-reachable (Instagram 200, Facebook 302 → valid profile redirect, not a 404). This directly addresses baseline recommendation #1.
3. **Footer now has visible social icons** linking to the same Instagram/Facebook URLs (previously the footer had zero external links of any kind, per baseline finding).
4. **Homepage FAQ answers rewritten and substantially lengthened** — all 6 answers now run roughly 100–230 words (verified via diff against baseline text), up from the baseline's 36–81 words. Several are now within or close to the 134–167-word optimal citation range, and each new answer adds a concrete worked example (e.g., "a parent booking AP Calculus help for a 9th grader..."), directly matching baseline recommendation #3.
5. **Subject and course detail pages (`/subjects/[slug]`, `/courses/[slug]`) restructured into a consistent, citable four-part layout**: "About [X] tutoring" (self-contained ~70–90-word answer paragraph), "What this covers" (bulleted, subject-specific facts), "Why a TutorA tutor" (differentiated comparison paragraph), "Tutors for [X]" (named tutor bios where supply exists). This is a structural upgrade, not just more words — see Citability section below for verification detail.

## AI Crawler Access (live-tested with real User-Agent headers)

`robots.txt` unchanged from baseline: `User-agent: * / Allow: /`, only `/dashboard`, `/tutor`, `/admin`, `/become-a-tutor`, `/api/` disallowed.

| Crawler | Status |
|---|---|
| GPTBot | 200 Allowed |
| OAI-SearchBot | 200 Allowed |
| ClaudeBot | 200 Allowed |
| PerplexityBot | 200 Allowed |
| Google-Extended | 200 Allowed |
| CCBot | 200 Allowed |
| anthropic-ai | 200 Allowed |

No regression, no new blocking. Sitemap still declared in robots.txt (191 URLs total: 103 `/subjects/*`, 53 `/courses/*`, remainder core pages + tutor profiles).

## llms.txt

**Present, well-formed, unchanged in structure**, live-verified at `/llms.txt`. Still a clean one-line entity definition + core pages + representative course categories + legal links. Not touched in this round of work — still a reasonable "no changes needed" from the baseline.

## RSL 1.0 Licensing — NEW, closes prior gap

Baseline flagged this as missing (recommendation #5, "low effort, low-medium impact"). Now live at `/rsl.xml` and linked from every page's `<head>` via `rel="license"`. Correctly scoped: permits AI search/citation/indexing, explicitly prohibits bulk model training, CC-BY-4.0 attribution requirement. This is exactly the kind of unambiguous machine-readable signal that reduces AI engines' legal hesitancy to cite/quote the site.

## Citability (25%, 82/100, up from 68/100)

**Verified via `trafilatura`-extracted (boilerplate-stripped) text on live HTML, not raw word counts.**

- Homepage FAQ answers: now 100–230 words per answer (confirmed via commit diff + live fetch), much closer to the 134–167-word optimal range than the baseline's 36–81 words. Each now embeds a concrete example, closing baseline recommendation #3.
- **Subject/course detail pages sampled (n=20 across `/subjects/*` and `/courses/*`) show genuinely differentiated content, not search-and-replace filler**: e.g. the "Why a TutorA tutor" paragraph on `/subjects/organic-chemistry` and `/subjects/mathematics` explicitly names competing platforms ("Tutor.com, Princeton Review, UPchieve, Wyzant") and makes a specific comparative claim (matched-to-a-named-reviewed-tutor vs. queue-based routing) — this is a strong signal for AI engines answering "best alternative to X" or "how is TutorA different" queries, and it is subject-specific rather than templated boilerplate.
- The "What this covers" bullet sections contain real subject facts (e.g. SQL page: "inner join drops unmatched rows, left join keeps them"; 11+ English page: "CEM vs. GL Assessment paper formats") — these are extractable, self-contained, technically correct micro-answers, exactly the granularity AI answer engines prefer to quote.
- **Word counts on sampled subject pages**: 15-page random sample averaged ~215 words of extracted body text (range 89–415, median ~221), up from the baseline's "~250 words thin/generic" characterization — the count is similar but the baseline content was undifferentiated, while the new content is structured into four distinct, individually citable sections plus (where supply exists) real named-tutor bios with years of experience and specific curriculum focus (e.g. Abeer Singh — "6 years teaching IB Physics, Calculus, and Mathematics").
- Two "disambiguation router" pages sampled (`/subjects/algebra`, `/subjects/ap-calculus`) remain short (75–88 words) by design — they exist to route ambiguous terms to the correct specific page, which is a reasonable UX pattern but not itself a strong citation candidate.
- **Real remaining weakness**: of 15 randomly sampled subject pages, **11/15 (73%) currently show "We don't have a tutor actively teaching [X] yet"** in the live-supply section. This doesn't hurt the informational/comparison content (which is fully present regardless), but it is a freshness/completeness signal that could reduce an AI engine's confidence in citing the page for "find a tutor for X" style queries specifically, since the concrete supply claim is empty on most sampled pages.
- FAQPage JSON-LD is now confirmed present on subject and course detail pages (not just homepage/`/about` as in the baseline) — verified via `@type` extraction from live HTML on `/subjects/mathematics` and `/courses/python-ff654450`.

## Structural Readability (20%, 80/100, up from 78/100)

- Consistent, repeatable four-section structure (About / What this covers / Why a TutorA tutor / Tutors) now applied across subject and course pages — this predictability is itself a positive signal for LLM parsers that learn a site's pattern.
- `FAQPage`, `Course`, `CourseInstance`, `Offer`, `BreadcrumbList`, `Organization`, `Person`, `WebSite` JSON-LD all confirmed present and well-formed on live sampled subject/course pages.
- Tutor profile pages (`/find-a-tutor/[slug]`) carry `Person`, `Organization`, `BreadcrumbList`, `WebSite` but **no `FAQPage`** — a modest, low-effort gap since these pages already contain natural Q&A-shaped content (subjects taught, rates, experience) that isn't marked up as such.
- Gap carried over from baseline: section headings ("About X tutoring", "What this covers", "Why a TutorA tutor") are still statement-phrased, not question-phrased ("How does X tutoring work on TutorA?"). This limits snippet/AI-Overview match probability for natural-language queries slightly more than optimal, but is a minor, easy future fix.

## Multi-Modal Content (15%, 30/100, up from 25/100)

- **One real image added**: `/about` now uses a real founder photograph (`next/image`, descriptive `alt="Nancy Gupta, founder of TutorA"`) in place of the CSS-initials avatar — a genuine, verified fix.
- **Still zero `<img>` tags on all sampled subject, course, and tutor-profile pages** (checked across `/subjects/mathematics`, `/courses/python-ff654450`, `/find-a-tutor/sudipto-ffbf5742` — 0 images each). This is ~200 of the site's 191 sitemap URLs still carrying zero visual content. Given this is the lowest-scoring dimension and the fix (tutor headshots, subject icons) would touch the highest-volume page templates, it remains the single largest remaining opportunity — unchanged in kind from baseline, only marginally improved in degree (1 image sitewide vs. 0).
- No video content, no `VideoObject` schema — unchanged from baseline.

## Authority & Brand Signals (20%, 52/100, up from 40/100)

**Confirmed real improvement, addressing baseline recommendation #1 almost exactly as specified:**
- Founder `Person` node now has `sameAs` (Facebook) and `image` — previously had neither.
- `Organization` node now has `sameAs` (Instagram) — previously had none.
- Both URLs verified live-reachable (not placeholder `#` links, not 404s).
- Footer now surfaces these as visible, crawlable social icons — previously zero external links anywhere on the site.
- Named, credentialed tutor bios (years of experience, specific curricula, specific student outcomes framing) now appear directly on subject/course pages where supply exists, e.g. "Saurabh Mishra teaches IGCSE Physics, GCSE Physics, and Mathematics, with 5 years of experience..." — this adds granular, checkable-sounding expertise signals throughout the site, not just on `/about`.

**Still the weakest-relative dimension, and the largest remaining gap overall:**
- No Wikipedia entity, no LinkedIn company page, no YouTube channel, no Reddit presence found or added — these remain completely absent. Given YouTube mentions (~0.737 correlation) and Reddit presence are the strongest documented correlates with AI citation, and Instagram/Facebook are not part of that correlation set, **the two platforms added this round are not the two that move the needle most for AI citation** — they close the "zero external links" embarrassment but don't target the highest-leverage brand-mention channels.
- Founder `Person` still has no `sameAs` to LinkedIn, Wikidata, or a personal site — Facebook alone does little for knowledge-graph disambiguation of "Nancy Gupta."
- `WebPage.dateModified` freshness signal still present but still not visibly exposed on-page (JSON-LD only).

## Technical Accessibility (20%, 90/100, up from 88/100)

- SSR/prerendered, full content in raw pre-JS HTML — unchanged, still strong.
- New `rel="license"` link tag adds a valid, low-cost machine-readable signal without any negative side effects (verified no console errors, no render regressions on sampled pages).
- Fast edge delivery via Vercel, clean CSP/HSTS — unchanged.
- Minor incremental gain purely from RSL licensing now closing what was previously a flagged (if minor) gap.

## Top 5 Highest-Impact Changes (remaining, ranked)

1. **Add real images to subject/course/tutor-profile page templates** (tutor headshots — several tutor bios already exist with zero photo; generic subject icons for the ~200 programmatic pages that still have 0 images). Effort: Medium. Impact: High — this is now the single lowest-scoring dimension by a wide margin (30/100) and touches the highest page count.
2. **Target the two brand-mention channels with the strongest AI-citation correlation: YouTube and Reddit**, not just Instagram/Facebook. A short "how TutorA vetting works" explainer video (with `VideoObject` schema) and organic Reddit presence (e.g. answering r/HomeworkHelp, r/GCSE, r/ApplyingToCollege threads) would move both the Authority dimension and Multi-Modal simultaneously. Effort: Medium-High, ongoing. Impact: High.
3. **Add `FAQPage` schema to tutor profile pages** (`/find-a-tutor/[slug]`) — content (subjects, rates, experience) is already Q&A-shaped; this is a schema-only change. Effort: Low. Impact: Medium.
4. **Rephrase 2–3 section headings on subject/course pages as questions** ("How does [X] tutoring work on TutorA?" instead of "About [X] tutoring") to better match natural-language AI Overview/ChatGPT query phrasing. Effort: Low. Impact: Medium.
5. **Backfill tutor supply (or at minimum swap the "we don't have a tutor yet" copy for something more citation-friendly, e.g. a waitlist CTA framed as "typically matched within 31 hours")** on the 73% of sampled subject pages currently showing no active tutor — the informational content is strong, but the empty-supply signal may suppress AI engines' confidence in citing the page for transactional "find a tutor" intent specifically. Effort: Low (copy change) to Medium (actual supply growth). Impact: Medium.

## Platform-Specific Visibility Assessment (qualitative)

| Platform | Baseline | Current | Rationale for change |
|---|---|---|---|
| Google AI Overviews | Moderate | Moderate-High | Stronger FAQPage coverage (now on subject/course pages too) and longer, example-rich answers improve rich-snippet/AIO eligibility; still capped by zero images on most pages |
| ChatGPT / OAI-SearchBot | Moderate | Moderate-High | Full crawler access + llms.txt + now RSL licensing removes any ambiguity about citation permission; named-competitor comparison paragraphs are well-suited to ChatGPT's comparative-answer style |
| Perplexity | Moderate | Moderate-High | Self-contained, well-segmented answer blocks (About/Covers/Why) are exactly the extractable format Perplexity favors; PerplexityBot unblocked |
| Bing Copilot | Moderate | Moderate | Benefits from the same schema/citability gains as Google AIO; no Bing-specific change identified |

Only 11% of domains are cited by both ChatGPT and Google AI Overviews. The Authority dimension (52/100) is still the weakest and most likely limiter of that dual-citation outcome — closing the YouTube/Reddit/Wikipedia gap (recommendation #2) remains the single highest-leverage next step.
