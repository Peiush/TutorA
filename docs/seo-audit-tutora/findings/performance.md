# Performance / Core Web Vitals Audit — tutora.it.com

**Category Score: 30 / 100**

**Method:** Lab-only measurement (no Google API credentials configured, so PageSpeed Insights and CrUX field data were unavailable). Used Lighthouse 12.8.2 CLI directly against local Chrome, mobile form factor with standard simulated throttling (4x CPU slowdown, ~150ms RTT / 1.6Mbps — Lighthouse's default "Slow 4G"-equivalent mobile profile), matching the methodology PSI itself uses for lab data. Four pages tested:

| Page | Perf Score | LCP | TBT (INP proxy) | CLS | DOM elements | Page weight |
|---|---|---|---|---|---|---|
| `/` (home) | 40 | **4.04s** (Poor) | **6,340ms** (Poor) | 0 (Good) | 1,602 | 508 KB |
| `/courses` | 55 | **2.9s** (Needs Improvement) | **2,280ms** (Poor) | 0.012 (Good) | 2,346 | 507 KB |
| `/find-a-tutor` | 52 | **3.0s** (Needs Improvement) | **4,890ms** (Poor) | 0 (Good) | 4,544 | 480 KB |
| `/courses/python-ff654450` | 68 | **2.6s** (Needs Improvement) | **810ms** (Poor) | 0 (Good) | 331 | 490 KB |

None of the four pages reach the "Good" LCP threshold (≤2.5s) in lab conditions, and every page's Total Blocking Time — the closest lab proxy for INP — lands well into "Poor" (>500ms), with the homepage at an extreme 6.3 seconds of blocked main thread. CLS is the one metric that is solidly good everywhere. Because CrUX field data isn't available (no API key configured), this assessment is lab-only; real-world 75th-percentile numbers should be validated in PageSpeed Insights/CrUX Vis once credentials are set up, but the lab signal here is severe and consistent enough (reproduced identically across all four templates) that it almost certainly reflects genuine field-level INP/LCP risk.

## What Works

- **CLS is excellent site-wide** (0–0.012 on all four pages tested) — no layout-shift issues found; images/fonts/dynamic content are not causing visible jank.
- **TTFB is fast** — Vercel edge serves the HTML document in ~30ms server time (108–320ms including simulated network RTT in the LCP breakdown), consistent with the `X-Vercel-Cache: HIT` edge-cache behavior noted in the brief. Server response time is not a bottleneck anywhere.
- **Total page weight is light** — 480–508 KB transferred per page across all four templates, well under typical bloat thresholds. No large unoptimized hero images were found.
- **No photographic image weight risk** — contrary to the initial risk hypothesis, `/courses` and `/find-a-tutor` load **zero image bytes**. Course/tutor cards use CSS-drawn initials avatars (e.g., a plain "S" in a circle, confirmed via screenshot) and icon glyphs rather than `<img>` photos, so this is not an LCP or image-weight risk on this site today. (Worth re-checking if photo uploads are added later.)
- **Compression is in good shape** — Brotli compression and Vercel's CDN caching are functioning as expected; no `uses-text-compression` findings.
- **Legacy JavaScript overhead is minor** — only ~14 KB estimated savings from modern-browser-only bundles; not a priority.

## Findings

### 1. Severe main-thread blocking from forced synchronous layout ("layout thrashing") in shared JS — sitewide
**Severity: Critical**

Lighthouse's forced-reflow insight identifies the same two JS chunks — `_next/static/chunks/0iec5q4ack_04.js` and `_next/static/chunks/2m2rsoe8edtzl.js` — as the dominant source of forced synchronous reflows on **every page tested**:

- Home: 2,529ms + 2,085ms of forced reflow from these two chunks alone
- `/find-a-tutor`: 1,887ms + 2,299ms
- `/courses`: 905ms + 771ms
- `/courses/python-ff654450`: 347ms + 160ms

This is a global/shared component (loaded on every route), most likely a scroll-triggered reveal animation (the homepage's `reveal-up` CSS classes suggest a custom "on-scroll" fade/slide-in implementation that reads DOM geometry — e.g. `getBoundingClientRect`/`offsetTop` — synchronously in a loop right after a style change, forcing the browser to recalculate layout repeatedly instead of batching it). Total main-thread work reaches 21.6s on the homepage and 14.8s on `/find-a-tutor` (mobile, 4x CPU throttled) — Time to Interactive on the homepage is **19.6 seconds**.

**Recommendation:**
- Identify the shared component behind these two chunks (grep bundle for `getBoundingClientRect`, `offsetTop/offsetWidth`, `IntersectionObserver` fallbacks, or the scroll-reveal library backing the `reveal-up`/`contents` classes seen on the homepage).
- Replace manual/JS-driven scroll-reveal with `IntersectionObserver` (async, non-blocking) or pure CSS (`@starting-style`/animation-timeline scroll-driven animations, or a simple CSS `transition` triggered by an `IntersectionObserver`-added class) instead of reading layout geometry synchronously on load.
- Batch any remaining DOM reads and writes (read all geometry first, then write styles) to avoid layout thrashing; consider `requestAnimationFrame` for write phases.
- This single fix is likely the highest-leverage change on the site: it should directly cut LCP render-delay, TBT, and TTI across every template since it's shared code.

### 2. LCP is dominated by render delay, not network — hydration/main-thread contention is blocking paint of the LCP element
**Severity: Critical**

On all four pages the LCP element is a **text paragraph already present in the initial HTML paint path** (hero copy on home/courses/find-a-tutor, description text on the course detail page) — yet 92–96% of total LCP time is "Render Delay" (time after the resource is ready but before the browser paints it), not TTFB or resource load time:

| Page | TTFB | Render Delay | % Render Delay |
|---|---|---|---|
| Home | 320ms | 3,720ms | 92% |
| `/courses` | 189ms | 2,701ms | 93% |
| `/find-a-tutor` | 176ms | 2,808ms | 94% |
| Course detail | 108ms | 2,515ms | 96% |

Because the LCP "resource" is text (no image/font blocking it structurally), a multi-second render delay this large means the main thread is too busy executing/parsing JS and doing layout work (see Finding #1) to paint content that's already downloaded. This is a classic symptom of heavy client-side hydration work competing with paint on a throttled mobile CPU.

**Recommendation:**
- Fixing Finding #1 (forced reflow) will likely resolve most of this, since the same blocking JS is competing with paint.
- Audit `bootup-time`/script evaluation cost of `0iec5q4ack_04.js` (~5.8s scripting on home) and `2m2rsoe8edtzl.js` (~2.8s scripting on home) — check if either can be code-split so above-the-fold hero content doesn't wait on unrelated component trees (e.g., is tutor-search/filter logic for `/find-a-tutor` bundled into a chunk that also renders on `/courses`, or vice versa?).
- Consider `<link rel="preload" as="script">`/priority hints only for what's needed for first paint, and defer everything else (below-fold interactivity, animation libraries) until after LCP.
- Server-render (or statically render) the LCP text further into the critical rendering path if it isn't already, so it doesn't depend on hydration completing.

### 3. Total Blocking Time / INP-proxy fails "Poor" threshold on all four pages — worst on homepage
**Severity: Critical**

TBT (the best lab proxy for INP, since Lighthouse cannot directly measure field INP) is 6,340ms on the homepage, 4,890ms on `/find-a-tutor`, 2,280ms on `/courses`, and 810ms even on the comparatively light course-detail page — every one exceeds the 500ms "Poor" INP threshold by a wide margin. Max Potential FID (a related proxy) is 4,380ms on the homepage. Given INP is now the sole interactivity Core Web Vital, this means real users are very likely experiencing sluggish/unresponsive interactions (tapping nav, filters, cards) for several seconds after these pages start loading, particularly on mid/low-tier mobile devices.

**Recommendation:**
- Root cause is shared with Findings #1/#2 (layout thrashing + heavy script evaluation). Fixing those should sharply cut TBT.
- Additionally: break up any long tasks >50ms using `setTimeout`/`scheduler.yield()`/`requestIdleCallback` for non-critical initialization work (analytics, animation setup, non-visible card hydration).
- Defer/lazy-hydrate below-the-fold sections (e.g., use dynamic `import()` with Next.js `next/dynamic` and `ssr:false` + viewport-based loading for card grids and tutor lists that aren't needed for first interaction).

### 4. Excessive DOM size, especially on `/find-a-tutor` (4,544 elements)
**Severity: High**

DOM size audit fails on every page: home 1,602 elements, `/courses` 2,346, and `/find-a-tutor` **4,544** elements — nearly 3x the 1,500-element "avoid excessive DOM size" guideline. `/find-a-tutor` also has by far the highest TBT of the hub pages (4,890ms) and the deepest style/layout cost, consistent with a large DOM combined with the scroll-reveal JS from Finding #1 running its reflow logic against thousands of nodes. Course detail page (331 elements) is well within budget and correspondingly the fastest of the four.

**Recommendation:**
- On `/find-a-tutor`, check whether all tutor cards render at once versus paginating/virtualizing the list (e.g., render only the first screen or two of results, then virtualize scroll or paginate with "Load more").
- Reduce nesting depth in card components; each additional wrapper `<div>` multiplies the reflow/style-recalc cost when combined with Finding #1's animation code.
- Re-test DOM size after addressing Finding #1, since a chunk of the layout cost is compounding rather than purely additive.

### 5. Render-blocking CSS chunk on hub pages (no preconnect hints)
**Severity: Medium**

`_next/static/chunks/0qdwiklpss0d3.css` (13.6 KB) is flagged as render-blocking on home, `/courses`, and `/find-a-tutor` (not flagged as blocking on the course-detail page). Additionally, Lighthouse's network-dependency-tree insight reports **no origins are preconnected**, and three separate woff2 font files (50 KB, 47 KB, 22 KB — ~120 KB of fonts total) load without any preconnect/priority hint.

**Recommendation:**
- Inline critical above-the-fold CSS and defer/async-load the remainder, or confirm Next.js's built-in CSS optimization is configured correctly (this file may be a global stylesheet that could be split by route).
- Add `<link rel="preload" as="font" crossorigin>` for the fonts actually used above the fold, and set `font-display: swap` (already scored as passing, so likely already applied — just ensure preload is added to shave the discovery delay).
- Since fonts/CSS are same-origin (`www.tutora.it.com`) `rel=preconnect` won't help here (no new origin to connect to) — the actual win is `rel=preload` for the two/three fonts used in the initial viewport, so the browser fetches them in parallel with the CSS instead of discovering them only after CSSOM is built.

### 6. Minor: legacy JavaScript shipped to modern browsers
**Severity: Low**

Consistent ~14 KB estimated savings from `legacy-javascript-insight` on all four pages — Next.js's build target may be including unnecessary transpilation/polyfills for browsers that don't need them.

**Recommendation:** Verify `next.config` / `browserslist` targets modern evergreen browsers only (Next.js's SWC compiler respects `browserslist`); low priority given the small byte savings relative to Findings #1–#3, but a quick win once the bigger issues are fixed.

## Priority Order

1. **Fix the shared scroll-reveal/animation component causing forced synchronous layout** (Finding #1) — highest leverage, sitewide, likely resolves most of the LCP render-delay and TBT/INP problems simultaneously.
2. **Reduce main-thread script evaluation cost of the two large shared chunks** (Finding #2) and confirm route-based code-splitting isn't bundling unrelated page logic together.
3. **Cut DOM size / virtualize the `/find-a-tutor` results list** (Finding #4).
4. **Preload critical fonts, split/inline critical CSS** (Finding #5).
5. **Trim legacy JS transpilation** (Finding #6) as a low-effort cleanup once the above are addressed.

After remediation, re-validate against CrUX field data (once Google API credentials are configured) rather than relying on lab data alone, since real-world device/network mix will differ from Lighthouse's simulated mobile profile.

## Raw Data

Lighthouse JSON reports saved at:
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/81586ca8-c598-4858-b206-5bf40bd7ec1b/scratchpad/tutora.it.com-audit/lighthouse/home.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/81586ca8-c598-4858-b206-5bf40bd7ec1b/scratchpad/tutora.it.com-audit/lighthouse/courses.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/81586ca8-c598-4858-b206-5bf40bd7ec1b/scratchpad/tutora.it.com-audit/lighthouse/find-a-tutor.json`
- `/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/81586ca8-c598-4858-b206-5bf40bd7ec1b/scratchpad/tutora.it.com-audit/lighthouse/course-detail.json`
