# Technical SEO Audit — tutora.it.com

**Site:** https://www.tutora.it.com/ (Next.js on Vercel, SSR/SSG, online tutoring marketplace)
**Scope:** All unique top-level pages (home, /about, /courses, /find-a-tutor, /request-a-tutor, /terms, /privacy, /become-a-tutor) + a representative sample of 7 course pages (`/courses/dance-8f1859ae`, `spanish-2dd27e6e`, `python-ff654450`, `sat-c5d2749b`, `ielts-8d4686db`, `gmat-d7e5eb9d`, `javascript-ac5adb0a`) and 7 tutor profile pages (`sudipto-ffbf5742`, `sneha-joshi-b6dc7c09`, `sarah-khan-843d8b61`, `sophia-88d22517`, `priya-virat-e64aa498`, `manish-57c0bf15`, `abeer-singh-315a954d`) out of the 71-URL sitemap.
**Method:** `sitemap_discovery.py`, `render_page.py --mode auto` (raw HTML + JSON-LD, all pages returned `is_spa=False`, `mode_used=raw`), and direct `curl` header/redirect/compression checks. No GSC/CrUX access — lab-based only.

## Category Score: 84/100

Strong foundation — valid sitemap, clean canonicalization (including query-parameter filter pages), full modern security-header suite, server-rendered content with zero reliance on client JS for indexable text, rich and mostly-valid structured data, and lightweight/fast-compressing pages. Points lost to a sitewide crawl-budget conflict (auth-gated links present in every page's footer while disallowed in robots.txt), missing social-share metadata on the two largest page templates, one structured-data misuse pattern, and a permissive CSP.

## What Works

- **Sitemap valid and declared correctly.** `sitemap_discovery.py` confirms `https://www.tutora.it.com/sitemap.xml` is declared in robots.txt, returns HTTP 200, and validates as a well-formed `urlset`. Manual fetch confirms exactly 71 `<url>` entries, matching the provided URL list, with `lastmod` timestamps on dynamic course/tutor entries.
- **robots.txt is clean and purposeful**, allowing `/` broadly and disallowing only genuinely non-public areas (`/dashboard`, `/tutor`, `/admin`, `/become-a-tutor`, `/api/`).
- **Canonical hygiene is excellent.** Every sampled page (home, hubs, course details, tutor profiles) self-canonicalizes correctly. Query-parameter category filters (e.g. `/courses?category=Languages`) correctly canonicalize back to the clean `/courses` URL, preventing duplicate-content dilution from faceted navigation.
- **Protocol/host consolidation is correct.** `http://www.tutora.it.com` → 308 → `https://www.tutora.it.com/`; `https://tutora.it.com` → 308 → `https://www.tutora.it.com/`. Trailing-slash variants (e.g. `/courses/`) 308-redirect to the canonical non-trailing-slash form.
- **Full modern security header suite present and consistent** across every page type checked (home, static pages, course pages, tutor pages, form page): `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and a `Content-Security-Policy` with `frame-ancestors 'none'`.
- **Clean 404 handling** — non-existent URLs return true HTTP 404 with a custom error page (`x-matched-path: /404`), not a soft-404 200.
- **No JavaScript-rendering dependency.** All sampled pages returned `is_spa=False` and `mode_used=raw` — full text content, title, meta tags, and JSON-LD are present in the initial server-rendered HTML with zero console errors on render.
- **Rich, largely valid structured data:** homepage carries `Organization`, `WebSite`, `WebPage`, `FAQPage`, `HowTo`, `Service`, and `BreadcrumbList`; course pages carry `Course` with `offers`/`price`/`priceCurrency`; tutor pages carry `Person` with `knowsAbout` and `worksFor`; the `/courses` hub carries `CollectionPage`.
- **Fast, well-compressed pages.** Brotli-compressed transfer sizes across templates ranged from ~9.7KB (tutor profile) to ~36KB (courses hub), with TTFB of 120–480ms and `x-vercel-cache: HIT` on repeat requests — low risk for LCP given the small payloads.
- **Self-hosted, preloaded fonts** via `next/font` (`space_grotesk`, `inter`, `caveat` all appear as `-module__..._variable` classes with `<link rel="preload" as="font">` in `<head>`), avoiding a render-blocking external Google Fonts request and reducing font-swap CLS risk.
- **Mobile viewport tag correct and unrestricted** (`width=device-width, initial-scale=1`, no `maximum-scale`/`user-scalable=no`) and consistent across every page sampled.
- **Unique, descriptive titles and meta descriptions** per page/template — no duplication observed across the sample (e.g. distinct titles for each of the 14 course/tutor pages checked).
- **`/become-a-tutor` itself does not create a linked+blocked conflict.** It 307-redirects to `/login?callbackUrl=...`, which correctly carries `<meta name="robots" content="noindex, follow">` and its own canonical (`/login`). It was not found linked in the nav/footer of any sampled page nor present in the sitemap, so the specific URL flagged in scope is not, in practice, generating crawl waste.

## Findings

### 1. Sitewide auth-gated links are both linked and blocked by robots.txt, wasting crawl budget across all 71+ pages
**Severity:** High
**Description:** Every sampled page's server-rendered footer (home, about, courses, find-a-tutor, request-a-tutor, terms, privacy) contains plain `<a href="/admin">Admin</a>` and `<a href="/dashboard">Student</a>` links, e.g.:
`href="/admin">Admin` and `href="/dashboard">Student` — confirmed present in the raw HTML of all 6+ top-level pages checked. Both `/admin` and `/dashboard` are `Disallow`'d in robots.txt, and both resolve to `307` redirects to `/login` when fetched directly (confirmed via `curl`). This is the exact "linked + blocked" pattern called out in scope — except it affects `/admin` and `/dashboard` (present on literally every page of the site) rather than `/become-a-tutor` (which is not linked anywhere sampled).
**Recommendation:** Either (a) add `rel="nofollow"` to these utility links, (b) render them only after client-side auth-state hydration so they never appear in the SSR HTML for anonymous crawlers, or (c) replace the `<a href>` with a JS `onClick` router push so no crawlable anchor exists. This removes the recurring crawl-budget cost and avoids a "Indexed, though blocked by robots.txt" warning in Search Console if any external site ever links to `/admin` or `/dashboard`.

### 2. Course and tutor profile pages have no page-specific Open Graph image, and Twitter Card metadata falls back to homepage content
**Severity:** Medium
**Description:** The homepage has a full OG image (`og:image` → `/opengraph-image?...`, `1200x630`, `image/png`) and matching Twitter Card. Every sampled course page (7/7) and tutor page (7/7) has `og:title`, `og:description`, `og:url`, `og:type` populated correctly and page-specific, but **no `og:image` tag at all**. Worse, `twitter:title` and `twitter:description` on these same pages still read `"TutorA — The right tutor, personally matched"` / the generic homepage description rather than the page's own copy, and there is no `twitter:image`. This affects the two largest URL groups in the sitemap — roughly 66 of 71 URLs (40 course pages + 26 tutor pages).
**Recommendation:** Generate a dynamic OG image per course/tutor (Next.js `opengraph-image` route pattern already exists for the homepage — extend it with `[slug]` params) and populate matching `twitter:image`/`twitter:title`/`twitter:description` from the page's own title/description rather than static homepage defaults. This directly affects the visual quality of shared links in social/messaging apps, which matters for a marketplace relying on word-of-mouth tutor referrals.

### 3. `/courses` hub's ItemList/Course structured data mislabels category filter links as individual courses
**Severity:** Medium
**Description:** The `CollectionPage` JSON-LD on `/courses` contains a `mainEntity.itemListElement` with 5 entries typed `@type: Course`, but each one actually points to a category filter URL, e.g.:
```
{"@type":"Course","name":"Programming & Technology","url":"https://www.tutora.it.com/courses?category=Programming%20%26%20Technology"}
```
These are category landing filters, not individual courses (the site has 40 real `Course`-typed pages under `/courses/<slug>-<hash>` with proper `offers`/`price`). Labeling a category filter as a `Course` entity is a semantic mismatch against schema.org's `Course` type and against Google's Course structured-data guidelines, which expect `Course` items to represent actual, bookable courses.
**Recommendation:** Change the `itemListElement` items on the `/courses` hub to `@type: "CollectionPage"` or a generic `WebPage`/`Thing`, or drop the `Course` typing for category links entirely and reserve `Course` markup strictly for the 40 individual course-detail pages that already implement it correctly.

### 4. Content-Security-Policy permits `'unsafe-inline'` for scripts and styles, undercutting its XSS protection
**Severity:** Medium
**Description:** The CSP applied sitewide is:
`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`
`script-src 'self' 'unsafe-inline'` allows any injected inline `<script>` to execute, which defeats the primary purpose of CSP as an XSS mitigation (the `frame-ancestors`/`X-Frame-Options` clickjacking protections are unaffected and remain solid). This isn't unusual for Next.js apps that haven't wired up nonces, but it is a gap relative to current best practice.
**Recommendation:** Adopt Next.js's middleware-based CSP nonce pattern (per-request nonce injected into `<script>` tags and the CSP header) to drop `'unsafe-inline'` from `script-src`/`style-src` without breaking hydration.

### 5. Organization schema is missing `logo` and `sameAs`
**Severity:** Low
**Description:** The sitewide `Organization` JSON-LD contains only `name`, `url`, and `description`:
```
{"@type":"Organization","name":"TutorA","url":"https://www.tutora.it.com","description":"..."}
```
No `logo` or `sameAs` (social/business profile links) properties are present.
**Recommendation:** Add `logo` (per Google's Knowledge Panel guidance, ≥112×112px, on a solid background) and `sameAs` entries for TutorA's verified social profiles to strengthen entity association and Knowledge Panel eligibility.

### 6. No tutor photography anywhere in the sampled templates; Person schema has no `image`
**Severity:** Low / Info
**Description:** Across every page sampled (homepage, both hub pages, all 7 course pages, all 7 tutor profile pages) there is not a single `<img>` element in the server-rendered HTML — all visual elements are CSS-only decorative gradients (`background-image: radial-gradient(...)`) or a single inline SVG. Tutor profile pages consequently show no photo, and the `Person` JSON-LD has no `image` property. This is good for payload weight/CLS (see What Works), but for a tutoring marketplace where a human "personally vetted" trust narrative is central to the copy, the complete absence of tutor photos is a notable trust/E-E-A-T gap, and it forecloses any Google Images discovery channel entirely.
**Recommendation:** If this is a deliberate privacy/product decision, no technical fix is required — but if not, consider adding tutor photos (with descriptive `alt` text and a matching `image` property in the `Person` JSON-LD) at least on profile pages, using `next/image` to preserve the current lightweight-page performance profile.

### 7. Inconsistent capitalization in tutor names propagates into `<title>`, `<h1>`, and JSON-LD
**Severity:** Low
**Description:** Most sampled tutor profiles render properly capitalized names (`Priya Virat`, `Abeer Singh`, `Sudipto`), but two of the seven sampled render lowercase: `<title>sarah khan — Biology, Chemistry & more — TutorA</title>` / `<h1>sarah khan</h1>` and `<title>sneha joshi — Chemistry, Organic Chemistry & more — TutorA</title>` / `<h1>sneha joshi</h1>`. The same lowercase casing is baked into the `Person` JSON-LD `name` field.
**Recommendation:** Normalize name casing (title-case) at the data layer before it's rendered into `<title>`, `<h1>`, and structured data — this is a data-hygiene fix upstream of the template, not a template bug (other names on the same template render correctly).

### 8. No verifiable IndexNow implementation found
**Severity:** Low / Info
**Description:** No IndexNow key file was found at common conventional paths (e.g. `/indexnow.txt` returned 404); note this check is not fully conclusive since IndexNow key files are typically named with a random hex string rather than a fixed path, so this should be treated as "no evidence found" rather than definitive absence.
**Recommendation:** Given the catalog changes reasonably often (new tutors/courses, per sitemap `lastmod` timestamps), implementing IndexNow (a low-effort Vercel-compatible integration) would give faster discovery on Bing/Yandex/Naver for new/updated course and tutor pages without waiting on organic recrawl.

### 9. Bare non-www HTTP origin requires two redirect hops to reach the canonical URL
**Severity:** Info
**Description:** `http://tutora.it.com` → 308 → `https://tutora.it.com/` → 308 → `https://www.tutora.it.com/` (2 hops, confirmed via `curl -w "%{num_redirects}"`). `http://www.tutora.it.com` (1 hop) and `https://tutora.it.com` (1 hop) both redirect directly to the canonical URL. Only the least-likely-to-be-linked variant (bare HTTP, non-www) takes the extra hop, and both hops are fast edge-level 308s, so impact is minimal.
**Recommendation:** Optional: consolidate to a single-hop redirect from `http://tutora.it.com` straight to `https://www.tutora.it.com/` if any legacy backlinks target that exact variant.

## Notes on Scope Items Confirmed Clear

- Hreflang: none present anywhere sampled — correctly not applicable, as this is a single-market English-language site (per site context, not flagged as a gap).
- Local Business schema: absent — correctly not applicable per site context (nationwide/global online marketplace, not a brick-and-mortar business).
- CSR/JS-rendering risk: none — every page returned `is_spa=False`/`mode_used=raw`, meaning content is available to any crawler without JS execution.
- Console errors during render: none observed across all sampled pages.
