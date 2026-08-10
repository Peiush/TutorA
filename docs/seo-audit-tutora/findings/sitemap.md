# Sitemap Audit — tutora.it.com (RE-AUDIT 2026-08-10)

**Source verified:** Fetched fresh via `curl https://www.tutora.it.com/sitemap.xml` at audit time (HTTP 200) and diffed byte-for-byte against the pre-fetched `reaudit-2026-08-10-sitemap.xml` — identical, 0 differences. **Confirmed live sitemap contains 191 URLs** (not the stale 71-URL sitemap from the 2026-08-04 archive, which was NOT read). `sitemap_discovery.py` also confirms a single `urlset`-type sitemap declared in `robots.txt` (no sitemap index; no additional sitemaps found at common paths — all 404).

## Score: 84/100

## Structure & Validity
| Check | Result |
|---|---|
| XML well-formed | ✅ Pass — parses cleanly, valid `urlset` namespace |
| Sitemap type | Single flat `urlset` (not an index) |
| URL count | 191 (well under 50,000 limit) |
| File size | 33.7 KB uncompressed (well under 50MB limit) |
| Duplicate `<loc>` entries | ✅ None (191 unique) |
| robots.txt reference | ✅ Present: `Sitemap: https://www.tutora.it.com/sitemap.xml` |
| Domain/protocol consistency | ✅ All URLs use `https://www.tutora.it.com` consistently |

## /subjects Index Page (added 2026-08-09)
✅ **Confirmed present** at `https://www.tutora.it.com/subjects`, `lastmod=2026-08-06T08:24:57.938Z`, priority 0.8, changefreq daily. Live-checked: HTTP 200, no noindex meta tag. Note: lastmod (Aug 6) predates the stated launch date (Aug 9) — likely reflects last code/data change rather than the page's public availability; not a blocking issue but worth confirming lastmod is wired to actual content updates.

## Coverage Breakdown (191 URLs)
| Segment | Count | Spot-checked status |
|---|---|---|
| `/subjects/[slug]` | 103 | 200 (sampled 3/3) |
| `/courses/[slug]` | 53 | 200 (sampled 3/3) |
| `/find-a-tutor/[slug]` (tutor profiles) | 25 | 200 (sampled 2/2) |
| Index/utility pages (home, /about, /courses, /find-a-tutor, /subjects, /request-a-tutor, /teach, /guarantee, /terms, /privacy) | 10 | 200 |

No 404s, redirects, or noindex pages found in an 8-URL spot check across all major segment types. Full-crawl status validation of all 191 URLs was not performed (sampling only) — recommend a scripted full crawl pass if not already covered elsewhere in this audit.

## Deprecated Tags
🔵 **Info:** Every one of the 191 `<url>` entries includes `<priority>` and `<changefreq>` — both ignored by Google since 2024/2025 sitemap processing updates. Not harmful, but adds file weight and false signal. Safe to remove; no action required.

## lastmod Accuracy
- All 191 `lastmod` values are valid W3C datetime strings (0 parse failures).
- 158 unique values across 191 URLs — reasonable diversity, not templated identically.
- Range: 2026-07-23 to 2026-08-10 (today) — plausible.
- ⚠️ **Minor:** 29 URLs (mostly `/subjects/[slug]`) share the exact same timestamp `2026-08-06T08:24:24.827Z` — consistent with a single batch import/generation event. This is acceptable if it reflects a genuine bulk content push, but if these pages are edited independently going forward, lastmod should update per-page, not batch-wide, or Google may start discounting the signal.

## Quality Gates (Sitemap-Structural Only)
- 🛑 **HARD STOP threshold triggered structurally:** `/subjects/[slug]` = 103 pages, well past the 50+ hard-stop count for location/programmatic-style pages. Combined with `/courses/[slug]` (53) and `/find-a-tutor/[slug]` (25), the site has **three separate programmatic page families each at or above the 30+ warning tier**, two of them (`/subjects`, `/courses`) above the 50+ hard-stop tier.
- This audit does not assess actual content uniqueness (deferred to the content-quality agent per scope), but flags that **structural scale alone requires explicit user justification and a 60%+ unique-content verification pass** before these templates are considered fully safe. Recommend the content agent confirm `/subjects/[slug]` pages carry real per-subject differentiation (exam boards, pricing, tutor counts, FAQs) rather than swapped-noun templates.

## Missing/Extra Pages
- No `/dashboard`, `/tutor`, `/admin`, `/become-a-tutor`, `/api/` URLs in sitemap — correctly excluded (also `Disallow`'d in robots.txt). ✅ Consistent.
- No orphaned or 404/redirected URLs found in sampling.
- Full crawl-vs-sitemap diff not performed here; recommend cross-checking against the site's internal-links/crawl agent output for orphan pages not yet in the sitemap.

## Score Rationale (84/100)
Deductions: -8 for deprecated priority/changefreq clutter across all 191 entries; -5 for the 29-URL batch-timestamp lastmod cluster reducing signal granularity; -3 for unverified full-crawl status coverage (only spot-checked). No critical or high-severity issues found — XML is valid, no duplicates, no broken/noindexed URLs detected, subjects index confirmed live and indexable.
