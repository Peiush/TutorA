# Schema Markup Audit — TutorA (tutora.it.com)

**Audit type:** Re-audit after 2026-08-10 fixes
**Data source:** 100% LIVE fetch on 2026-08-10 via `render_page.py --mode auto --json-ld-output` for 8 representative page types, plus a live parallel `curl` sweep of all 191 URLs in the fresh sitemap (`reaudit-2026-08-10-sitemap.xml`) for HowTo residue.
**Explicitly NOT used:** `docs/seo-audit-tutora/archive-2026-08-04/` or any other cached/stale local artifact. The only pre-supplied files used were the fresh sitemap and `reaudit-2026-08-10-home.json` as an initial pointer — every schema claim below was independently re-verified via live fetch/parse in this session.

## Category Score: 88 / 100

---

## 1. Verification of Requested Fixes

### 1a. HowTo schema fully removed sitewide — CONFIRMED ✅
- Live JSON-LD extraction on homepage, /about, /courses, /courses/[slug], /find-a-tutor, /find-a-tutor/[slug], /subjects, /subjects/[slug]: **zero HowTo blocks** in any sample.
- Live parallel `curl` sweep of **all 191 URLs** in the current sitemap, grepping raw HTML for the literal string `HowTo`: **0 matches**. Fully clean sitewide, not just on the homepage.
- The former "How TutorA matches you with a tutor" 3-step process on the homepage is now correctly implemented as `ItemList` (block `#how-it-works`), not `HowTo`. `ItemList` is a valid, non-deprecated type — good replacement choice.

### 1b. `/about` BreadcrumbList — CONFIRMED, valid ✅
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tutora.it.com" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.tutora.it.com/about" }
  ]
}
```
Sequential positions (1, 2), absolute URLs, correct hierarchy. No issues.

### 1c. `founder` Person nested in sitewide Organization JSON-LD — CONFIRMED, valid ✅
Verified identical on homepage, /about, /courses, /courses/[slug], /find-a-tutor, /find-a-tutor/[slug], /subjects, /subjects/[slug] (sitewide layout injection, as expected):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TutorA",
  "url": "https://www.tutora.it.com",
  "logo": "https://www.tutora.it.com/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Nancy Gupta",
    "jobTitle": "Founder"
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "Singapore" },
    { "@type": "Country", "name": "United Arab Emirates" },
    "Worldwide"
  ]
}
```
`founder` is correctly nested as a direct property of `Organization` with a proper `Person` object (not a bare string, not sibling-level). This is a valid, Google-neutral (no rich result tied to `founder`, but it's correct structured data and useful for Knowledge Panel / entity disambiguation).

**Minor note (not a defect):** `"Worldwide"` is a bare string mixed into an array otherwise made of `Country` objects. Schema.org's `areaServed` range permits `Text`, so this validates, but for consistency consider replacing with `{"@type":"Place","name":"Worldwide"}` or dropping it since the five countries plus "Worldwide" is redundant/contradictory (implies both scoped and global service).

### 1d. `/subjects/[slug]` per-slug og:image — Out of scope for this audit ℹ️
Confirmed this is a meta-tag concern (Open Graph), not JSON-LD/structured data. Not evaluated here; flag for the meta/technical-SEO audit instead.

---

## 2. Schema Inventory by Page Type (all live-fetched, all blocks `valid: true`)

| Page | Types present | Notes |
|---|---|---|
| Homepage `/` | Organization (+founder Person), WebSite, WebPage, FAQPage, ItemList, Service, BreadcrumbList | 7 blocks, all valid |
| `/about` | Organization (+founder Person), WebSite, BreadcrumbList, FAQPage | 4 blocks, all valid |
| `/courses` (hub) | Organization (+founder), WebSite, BreadcrumbList, CollectionPage/ItemList (category list), FAQPage | 5 blocks, all valid |
| `/courses/sat-c5d2749b` (real slug) | Organization (+founder), WebSite, **Course** + CourseInstance + Offer, BreadcrumbList, FAQPage | 5 blocks, all valid |
| `/find-a-tutor` (hub) | Organization (+founder), WebSite, BreadcrumbList, CollectionPage/ItemList of Service entries, FAQPage | 5 blocks, all valid |
| `/find-a-tutor/sudipto-ffbf5742` (real slug) | Organization (+founder), WebSite, **Person** (tutor) + worksFor, BreadcrumbList | 4 blocks, all valid |
| `/subjects` (hub) | Organization (+founder), WebSite, BreadcrumbList, CollectionPage/ItemList (all subject URLs) | 4 blocks, all valid — **page confirmed to exist**, did not exist in prior audit |
| `/subjects/mathematics` (real slug) | Organization (+founder), WebSite, **Course** + Offer, BreadcrumbList, FAQPage | 5 blocks, all valid syntactically, **1 logical defect below** |

`/subjects` hub existence is a genuine new addition since the last audit and is correctly wired with CollectionPage + ItemList + BreadcrumbList, matching the pattern used on `/courses` and `/find-a-tutor`.

---

## 3. Validation Issues Found

### Issue 1 — Breadcrumb hierarchy mismatch on `/subjects/[slug]` (Moderate)
On `/subjects/mathematics`, the `BreadcrumbList` reads:
```json
{ "position": 2, "name": "Courses", "item": "https://www.tutora.it.com/courses" }
```
This is wrong — the page lives under `/subjects`, not `/courses`. The breadcrumb should be `Home > Subjects > Mathematics` pointing to `/subjects`, matching the actual URL path and the pattern already used correctly on `/courses/[slug]` and `/find-a-tutor/[slug]`. As shipped, this tells Google the page's hierarchical parent is a URL that doesn't contain it, which can cause Google to ignore or misrender the breadcrumb rich result, and is inconsistent with the page's own canonical URL.

**Fix (recommended JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tutora.it.com" },
    { "@type": "ListItem", "position": 2, "name": "Subjects", "item": "https://www.tutora.it.com/subjects" },
    { "@type": "ListItem", "position": 3, "name": "Mathematics", "item": "https://www.tutora.it.com/subjects/mathematics" }
  ]
}
```

### Issue 2 — Course schema inconsistent between `/courses/[slug]` and `/subjects/[slug]` (Minor)
`/courses/[slug]` includes `hasCourseInstance` (`courseMode`, `courseWorkload`), which `/subjects/[slug]` omits (it has `educationalLevel` instead). Not a hard requirement, but for consistency and to maximize eligibility for Google's Course rich result, add `hasCourseInstance` with `courseMode: "Online"` to the `/subjects/[slug]` template too.

### Issue 3 — Tutor Person schema missing `image` (Minor/Opportunity)
`/find-a-tutor/[slug]` Person objects have `name`, `description`, `url`, `knowsAbout`, `worksFor` — but no `image`. Adding the tutor's profile photo (absolute URL) strengthens entity/Knowledge-Graph eligibility and is low-effort since the image already exists on the rendered page.

### Issue 4 — Homepage BreadcrumbList is single-item (Cosmetic)
Homepage `BreadcrumbList` contains only `{"position":1,"name":"Home"}` — a one-item breadcrumb has no rich-result value and is typically omitted on the homepage entirely. Harmless, but no need to keep it; not a validation failure.

### FAQPage — Info only, per current policy
FAQPage is present on homepage, `/about`, `/courses/[slug]`, `/find-a-tutor` hub, and `/subjects/[slug]`. Google retired FAQ rich results for all sites (May 7, 2026), so this schema now provides no Google SERP benefit. **Do not remove** — any AI/GEO (LLM answer-engine) visibility benefit is unconfirmed but plausible, and removal has no upside. Flagged Info priority only, consistent with policy.

### Never-recommend types check
No `HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, or `LearningVideo` types found anywhere in the sample or the 191-URL sweep.

---

## 4. Missing Opportunities (not required, worth considering)

1. **AggregateRating/Review on tutor Person and Course pages** — if TutorA collects star ratings/reviews per tutor or course, adding `AggregateRating` (nested in `Person` or `Course`) would unlock star rich results. Do not fabricate — only add once real review data backs it.
2. **VideoObject** — not evaluated in this pass (no video content detected on sampled pages); revisit if video is added.
3. Consider dropping the homepage's single-item BreadcrumbList (Issue 4) — no action required, informational only.

---

## 5. Summary

All three targeted fixes from the 2026-08-10 remediation are confirmed live and correct: HowTo is fully gone sitewide (verified via live JSON-LD parsing on 8 page types **and** a live raw-HTML sweep of all 191 sitemap URLs), `/about` has a valid two-level BreadcrumbList, and the `founder` Person entity is correctly nested inside the sitewide Organization JSON-LD on every page checked. The new `/subjects` hub exists and is correctly marked up. The one real defect is a breadcrumb hierarchy mismatch on `/subjects/[slug]` templates (labeled "Courses" instead of "Subjects"), plus a few minor consistency/enrichment opportunities. No deprecated or FAQPage-removal action is recommended.
