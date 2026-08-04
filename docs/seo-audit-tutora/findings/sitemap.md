# Sitemap Audit — https://www.tutora.it.com/sitemap.xml

**Category Score: 78 / 100**

Source analyzed: local copy at `sitemap.xml` (71 URLs), cross-checked live against `https://www.tutora.it.com/sitemap.xml` and `https://www.tutora.it.com/robots.txt`.

---

## What Works

- **Valid, well-formed XML** — parses cleanly with the standard `sitemaps.org/schemas/sitemap/0.9` namespace, single `<urlset>` root, no malformed tags or encoding issues.
- **Well within scale limits** — 71 URLs / ~12 KB, nowhere near the 50,000-URL / 50 MB per-file cap. No sitemap index needed yet.
- **No disallowed paths leaked into the sitemap** — verified none of the 71 `<loc>` entries fall under the robots.txt `Disallow` rules (`/dashboard`, `/tutor`, `/admin`, `/become-a-tutor`, `/api/`). Clean separation between crawlable marketing/catalog pages and gated app routes.
- **Sitemap correctly referenced in robots.txt** — `Sitemap: https://www.tutora.it.com/sitemap.xml` is declared and the live robots.txt matches the description given (`Allow: /` plus the 5 disallow rules).
- **Spot-checked URLs all return 200** — homepage, `/about`, a sample course page (`/courses/python-ff654450`), and a sample tutor page (`/find-a-tutor/sudipto-ffbf5742`) all resolved 200 OK with zero redirects.
- **lastmod present and in valid W3C Datetime format** on all 64 course/tutor detail pages (ISO 8601 with milliseconds + `Z`, e.g. `2026-07-26T20:16:27.783Z`).
- **Priority hierarchy is directionally sane**: homepage `1.0` → `courses`/`find-a-tutor` hubs `0.9` → detail pages `0.7` → `about` `0.6` → legal pages `terms`/`privacy` `0.2`. This is a reasonable weighting even though Google ignores the field.
- **No thin/duplicate "doorway" location pages** — the catalog is subject-based (`/courses/<subject>`) and person-based (`/find-a-tutor/<tutor>`) rather than city-swapped location pages, so the Location Page Quality Gate (30+/50+ threshold) does not apply here.

---

## Findings

### 1. Seven top-level pages have no `<lastmod>` at all
- **Severity:** Medium
- **Pages affected:** `/`, `/about`, `/courses`, `/find-a-tutor`, `/request-a-tutor`, `/terms`, `/privacy`
- **Description:** These are the only URLs in the sitemap missing `lastmod` entirely. Notably, `/courses` and `/find-a-tutor` are marked `changefreq: daily` (implying frequent updates) yet supply no `lastmod` value at all — a contradictory freshness signal. `/terms` and `/privacy` in particular should carry accurate lastmod dates since freshness of legal pages is a real trust signal.
- **Recommendation:** Add real `lastmod` values (ISO 8601) to all 7 top-level pages, derived from actual content-change timestamps (e.g., CMS/DB `updatedAt`), not build time.

### 2. lastmod timestamps on course/tutor pages look auto-generated, not content-based
- **Severity:** Medium
- **Description:** All 64 course and tutor `lastmod` values fall inside two narrow windows — courses cluster at `2026-07-26T20:16:16Z`–`20:16:27Z` (~11 seconds, values ~280–300ms apart in strict descending order matching sitemap order) and tutor profiles cluster at `2026-07-27T08:11:40Z`–`08:18:16Z`. This pattern is consistent with a bulk seed/migration or sitemap-generation script stamping `new Date()` at generation time rather than reflecting each record's true last significant content edit.
- **Why it matters:** Google explicitly discounts `lastmod` values it judges unreliable (e.g., all pages updated in the same batch, or timestamps that don't correlate with visible content changes), and may fall back to its own crawl-based freshness signals — negating the intended benefit of including `lastmod`.
- **Recommendation:** Populate `lastmod` from the underlying record's genuine `updatedAt` (tutor profile edited, course description changed) rather than a sitemap-generation timestamp. If content genuinely hasn't changed since creation, that's fine — but the generation script should not overwrite `lastmod` on every sitemap rebuild.

### 3. `/become-a-tutor` is blocked by robots.txt and immediately redirects unauthenticated visitors to `/login` — no public tutor-recruitment landing page exists anywhere in the crawlable site
- **Severity:** High
- **Description:** Live check confirms `GET /become-a-tutor` returns `HTTP 307` → `Location: /login?callbackUrl=...%2Fbecome-a-tutor`, and it is explicitly disallowed in robots.txt. This is consistent with `/become-a-tutor` being an authenticated app route (the tutor application flow) rather than a marketing page — so blocking it from crawling/indexing is *technically correct*, since indexing a login redirect provides no SEO value. However, this also means **there is no indexable, keyword-targetable page anywhere on the site pitching "become a tutor" / tutor recruitment** to the supply side of the marketplace (prospective tutors searching "become an online tutor," "tutor jobs," "apply to tutor," etc.). `/about` is student/parent-facing per its extracted content ("The right tutor, personally matched... students and tutors never chase each other").
- **Recommendation:** Create a **public** marketing/landing page (e.g., `/become-a-tutor` split into a public info page + a separate `/apply` or `/become-a-tutor/apply` gated action, or simply allow `/become-a-tutor` itself to render a public pitch page with a "Sign in to apply" CTA instead of hard-redirecting). Include that public page in the sitemap once it exists. This closes an acquisition-channel content gap, not just a sitemap gap.

### 4. `priority` and `changefreq` tags present on every URL
- **Severity:** Info
- **Description:** Both fields are explicitly ignored by Google (confirmed in Google's official sitemap documentation) and are only weakly/optionally considered by Bing. They add ~30% extra bytes to the file for no ranking benefit.
- **Recommendation:** No functional harm — safe to leave as-is. Optionally strip both to simplify the generator and reduce file size; not a blocking issue.

### 5. `request-a-tutor` priority (0.7) undervalues it relative to its funnel importance
- **Severity:** Low
- **Description:** `/request-a-tutor` is tied with every individual course/tutor detail page at priority `0.7`, despite being one of only 5 top-level navigation pages and likely a primary demand-side conversion path (parents/students requesting a match). `/courses` and `/find-a-tutor` (the two other primary hubs) sit at `0.9`.
- **Recommendation:** Low impact since Google ignores `priority`, but for internal consistency/other crawlers, consider bumping to `0.8`–`0.9` to match its role as a top-level conversion hub rather than a leaf detail page.

### 6. Full site-navigation comparison was only partially possible
- **Severity:** Info / Scope limitation
- **Description:** Only `home.json` and `about.json` render captures were available in the audit scratchpad, and both contained truncated `raw_content` (~200 chars), so in-page navigation links could not be fully enumerated from the rendered DOM. Live spot-checks of guessed routes found `/login` (200) and `/signup` (200) correctly excluded from the sitemap (correct — auth/utility pages, not indexable content), while `/contact`, `/blog`, `/faq`, and `/pricing` all returned 404 (i.e., not missing from the sitemap because they don't exist, not an omission).
- **Recommendation:** If a full rendered crawl becomes available (via the technical/on-page audit agents), re-diff sitemap URLs against all internal `<a href>` links surfaced there to catch any additional gaps beyond `/become-a-tutor`.

### 7. Forward-looking: no sitemap index yet, but catalog will likely need one
- **Severity:** Info
- **Description:** At 71 URLs a single flat sitemap is appropriate. If the course catalog (~40 URLs) and tutor roster (~26 URLs) grow significantly, consider splitting into a sitemap index (`sitemap.xml` → `pages-sitemap.xml`, `courses-sitemap.xml`, `tutors-sitemap.xml`) for cleaner Google Search Console coverage reporting per segment.
- **Recommendation:** No action needed now; revisit once total URLs approach a few hundred.

---

## Robots.txt Cross-Check (for reference)

Live `https://www.tutora.it.com/robots.txt`:
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
Confirmed: none of the 71 sitemap URLs fall under these disallow rules. `Disallow: /tutor` is a broad prefix rule — verified it does not collide with the allowed `/find-a-tutor/<slug>` profile pages (different path prefix), so no conflict, but worth noting `/tutor` as a prefix would also block any future path merely starting with those characters (e.g. `/tutorial`) — flagged for awareness only, not a sitemap defect.

---

## Structured Findings (JSON)

```json
{
  "category": "Sitemap",
  "score": 78,
  "what_works": [
    "Valid, well-formed XML sitemap (sitemaps.org 0.9 namespace)",
    "71 URLs / ~12KB — well under 50,000 URL / 50MB limits",
    "No robots.txt-disallowed paths present in sitemap",
    "Sitemap correctly declared in robots.txt",
    "Spot-checked URLs (home, about, sample course, sample tutor) all return 200 with no redirects",
    "lastmod present in valid W3C Datetime format on all 64 course/tutor detail pages",
    "Priority hierarchy directionally sensible (home 1.0 > hubs 0.9 > details 0.7 > legal 0.2)",
    "No thin/duplicate location doorway pages; location page quality gate not applicable"
  ],
  "findings": [
    {
      "title": "Top-level pages missing lastmod entirely",
      "severity": "Medium",
      "description": "The 7 top-level URLs (/, /about, /courses, /find-a-tutor, /request-a-tutor, /terms, /privacy) have no <lastmod> tag. /courses and /find-a-tutor are marked changefreq:daily yet carry no lastmod, a contradictory freshness signal.",
      "recommendation": "Add real lastmod values derived from actual content update timestamps for all 7 top-level pages."
    },
    {
      "title": "lastmod values appear auto-generated at sitemap build time, not content-edit time",
      "severity": "Medium",
      "description": "All 64 course/tutor lastmod timestamps cluster in two narrow windows (~11 min and ~7 min respectively) in strict sequential order matching sitemap order, consistent with a bulk seed/generation timestamp rather than genuine last-content-change dates.",
      "recommendation": "Derive lastmod from each record's true updatedAt field; do not restamp on every sitemap regeneration."
    },
    {
      "title": "/become-a-tutor blocked by robots.txt and redirects to /login; no public tutor-recruitment landing page exists",
      "severity": "High",
      "description": "Live check: GET /become-a-tutor returns HTTP 307 to /login?callbackUrl=...%2Fbecome-a-tutor and is disallowed in robots.txt. Blocking the auth-gated route is correct, but there is no separate public/indexable page targeting tutor-recruitment search intent anywhere on the site.",
      "recommendation": "Create a public marketing landing page pitching tutor recruitment (keeping the authenticated application flow gated separately) and add it to the sitemap."
    },
    {
      "title": "priority and changefreq tags present on all URLs",
      "severity": "Info",
      "description": "Both fields are ignored by Google; harmless but adds file bloat.",
      "recommendation": "Optional removal; not blocking."
    },
    {
      "title": "request-a-tutor priority undervalued relative to funnel role",
      "severity": "Low",
      "description": "/request-a-tutor is priority 0.7, same tier as leaf detail pages, despite being one of 3 primary top-level conversion hubs (others at 0.9).",
      "recommendation": "Consider raising to 0.8-0.9 for internal consistency; low impact since Google ignores priority."
    },
    {
      "title": "Full navigation-vs-sitemap comparison limited by truncated render captures",
      "severity": "Info",
      "description": "Only home.json/about.json were available with truncated raw_content (~200 chars), preventing full DOM link extraction. Live spot-checks show /login, /signup exist and are correctly excluded; /contact, /blog, /faq, /pricing return 404 (not missing, don't exist).",
      "recommendation": "Re-diff against a full rendered crawl if/when available from technical/on-page audit agents."
    },
    {
      "title": "No sitemap index yet (forward-looking)",
      "severity": "Info",
      "description": "Single flat sitemap is fine at 71 URLs but will need splitting (pages/courses/tutors) as the catalog grows.",
      "recommendation": "Revisit once total URL count approaches a few hundred."
    }
  ]
}
```
