# Visual / Above-the-Fold Audit — tutora.it.com

**Category:** Visual Analysis
**Score: 82 / 100**

Pages tested: Homepage (`/`), Courses hub (`/courses`), Tutor profile (`/find-a-tutor/sudipto-ffbf5742`)
Viewports: Desktop (1920x1080), Laptop (1366x768), Tablet (768x1024), Mobile (375x812 iPhone)

Screenshots saved to:
`/private/tmp/claude-501/-Users-piyushsaini-Projects-TutorConnect/81586ca8-c598-4858-b206-5bf40bd7ec1b/scratchpad/tutora.it.com-audit/screenshots/{home,courses,tutor}/www_tutora_it_com_{desktop,laptop,tablet,mobile}.png`

Tooling note: capture used `claude-seo run capture_screenshot.py <url> --all --output <dir>` (Playwright/Chromium under the hood). All 12 target screenshots (3 pages x 4 viewports) were captured successfully. One mobile capture (tutor profile) timed out at the default 30s and was successfully retried at 60s — worth noting as a real-world signal that this page is slower to reach a stable/idle state on constrained connections.

---

## What Works

- **Clear, benefit-led H1 on the homepage** ("The right tutor, personally matched.") paired with a trust-building eyebrow badge ("Every match personally verified") — value proposition is understandable in under 2 seconds on every viewport tested.
- **Primary CTAs ("Find a Tutor" / "Request a Tutor") are visible above the fold without scrolling** on laptop (1366x768), tablet (768x1024), mobile (375x812), and desktop (1920x1080) once the page has fully settled.
- **Mobile layout re-flows cleanly to single column** on all three page types — no horizontal overflow/scroll observed on any of the 375px-wide captures.
- **Consistent, legible base typography** — body copy renders at a comfortably large size on mobile (visually ~16-18px) with good color contrast (dark navy on cream background).
- **Tutor profile page is well-structured for mobile**: avatar, verification badges, subject chips, bio, and a repeated per-subject price + "Request" CTA are all readable and tappable without pinch-zooming.
- **"Request" buttons on the tutor profile are appropriately sized pill buttons** (visually well above the 48x48px guidance) and are repeated per subject row, reducing friction to convert.
- **Courses hub hero also clears the fold** on mobile/tablet/laptop with both "Browse courses" and "How it works" CTAs visible pre-scroll.
- **Hamburger navigation on mobile is a clear, single, top-right icon** with sufficient visual size and no competing nav elements crowding the header.

---

## Findings

### 1. Homepage hero uses a fade/slide-in animation that can leave the fold looking empty or unstyled during initial paint
- **Severity:** Medium
- **Description:** On the first desktop (1920x1080) capture, the hero heading rendered at full opacity but the supporting paragraph, the "Find a Tutor"/"Request a Tutor" CTAs, and the animated match-card graphic were still mid-fade-in (near-transparent), while the nav and heading were already solid. A second capture of the same URL/viewport ~2 minutes later rendered everything correctly. This indicates the hero content (including the primary CTA buttons) is animated in via JS/CSS transition rather than present at first paint, which is a real risk for:
  - Users on slower CPUs/throttled connections seeing a visually "broken" or empty-looking hero (missing CTA) for longer than expected.
  - Automated tools (Lighthouse, bots, social-preview scrapers, and this audit's own screenshot tool) capturing an incomplete-looking state if they don't wait for the animation to resolve.
  - Reduced perceived above-the-fold completeness/CLS-adjacent risk even if Chrome's own CLS metric doesn't flag it (opacity transitions don't shift layout, but they do delay usable/visible content).
- **Recommendation:** Render the hero heading, subhead, and both primary CTAs at full opacity by default (no animation dependency for text/CTA visibility), and reserve entrance animations for purely decorative elements (the floating avatar/match-card graphic). Alternatively, ensure the animation is capped at a very short duration (<300ms) and respects `prefers-reduced-motion`. Verify with a Lighthouse/PSI trace that LCP element (likely the H1 or hero CTA) is not gated behind this transition.

### 2. Tutor profile page mobile load is notably slower than home/courses
- **Severity:** Low
- **Description:** The mobile screenshot capture for the tutor profile page (`/find-a-tutor/sudipto-ffbf5742`) failed at the default 30-second timeout and only succeeded after raising the timeout to 60 seconds. Home and Courses captured without issue at default settings across all four viewports. This suggests the tutor profile page may have a slower time-to-network-idle on mobile (e.g., render-blocking resources, slow third-party calls, or a "similar tutors" data fetch that stalls), which directly affects perceived load speed and above-the-fold readiness for real mobile users.
- **Recommendation:** Run a mobile Lighthouse/PSI trace specifically on a `/find-a-tutor/<slug>` page to identify the blocking resource (JS bundle, font, API call for "Other tutors teaching similar subjects"). Consider lazy-loading the "similar tutors" module (it's below the fold) and deferring any non-critical scripts so the primary profile content (name, bio, subjects, Request CTA) is interactive faster.

### 3. Desktop viewport (1920x1080) has excessive unused right-side whitespace in the hero
- **Severity:** Low
- **Description:** At full 1920px width, the hero text block occupies roughly the left 50% of the viewport, leaving a large empty area on the right filled only by a small decorative avatar-matching graphic. This isn't a functional bug, but it under-utilizes premium above-the-fold real estate on large monitors (no secondary trust signals, stats, or imagery reinforcing the value prop).
- **Recommendation:** Consider adding lightweight social-proof elements to the right column on large viewports (e.g., a stat like "500+ verified tutors" or a testimonial snippet) to reinforce the value proposition without competing with the primary CTA.

### 4. No above-the-fold trust/social-proof signal reinforcing conversion on tutor profile pages
- **Severity:** Low
- **Description:** The tutor profile hero shows the tutor's name, location, years of experience, and two small verification icons, but the verification badges (green checkmark + shield icon) are small and unlabeled at a glance — a first-time visitor has to hover/tap or scroll to fully understand what they mean (background check? ID verification?). On the homepage this is spelled out ("Every tutor earns four checkmarks"), but that context isn't repeated on the profile page itself.
- **Recommendation:** Add a short inline label or tooltip near the verification icons on tutor profile pages (e.g., "ID Verified" / "Background Checked") so the trust signal is legible without requiring users to already know the site's badge system from the homepage.

### 5. Screenshot capture required a non-default timeout for one page — flag for automated monitoring
- **Severity:** Info
- **Description:** This is not a user-facing visual defect but an operational note: automated visual-regression/CI screenshot jobs using default (~30s) timeouts may intermittently fail on tutor profile pages. If this audit's tooling hit this, third-party uptime/screenshot monitors could report false failures.
- **Recommendation:** If a visual regression testing pipeline is added, set timeouts to at least 45-60s for `/find-a-tutor/<slug>` templates, and separately track real-user mobile load timing (e.g., via CrUX/RUM) to confirm whether this is a synthetic-only artifact or affects real visitors.

---

## Structured Findings (JSON)

```json
{
  "category": "Visual",
  "score": 82,
  "what_works": [
    "Clear, benefit-led H1 and trust badge visible above the fold on homepage across all viewports",
    "Primary CTAs (Find a Tutor / Request a Tutor) visible without scrolling on laptop, tablet, mobile, and desktop",
    "Mobile layout reflows to single column with no horizontal overflow on any tested page",
    "Legible base typography and strong color contrast on mobile",
    "Tutor profile page mobile layout is clean and scannable with repeated per-subject Request CTAs",
    "Request buttons are well above 48x48px minimum touch target size",
    "Courses hub hero clears the fold with both CTAs visible pre-scroll",
    "Mobile hamburger nav is clear and unobstructed"
  ],
  "findings": [
    {
      "title": "Homepage hero fade/slide-in animation delays visibility of primary CTA and supporting copy",
      "severity": "Medium",
      "description": "First desktop capture showed the hero paragraph, CTA buttons, and match-card graphic rendered at near-transparent opacity mid-animation while the H1 and nav were fully rendered; a repeat capture ~2 minutes later rendered correctly. Indicates hero text/CTAs are animated into view rather than present at first paint.",
      "recommendation": "Render hero H1, subhead, and both CTA buttons at full opacity by default; restrict entrance animation to decorative elements only, cap duration under 300ms, and respect prefers-reduced-motion. Confirm via Lighthouse trace that the LCP element isn't gated behind the transition.",
      "pages_affected": ["https://www.tutora.it.com/"],
      "viewports_affected": ["desktop"]
    },
    {
      "title": "Tutor profile page mobile capture required 2x default timeout to complete",
      "severity": "Low",
      "description": "Mobile screenshot of /find-a-tutor/sudipto-ffbf5742 failed at 30s default timeout and succeeded only after raising to 60s, while home and courses pages captured normally at default settings on all viewports, suggesting slower time-to-idle on this template on mobile.",
      "recommendation": "Run a mobile Lighthouse/PSI trace on a tutor profile page to identify the blocking resource; lazy-load the below-the-fold 'Other tutors teaching similar subjects' module and defer non-critical scripts.",
      "pages_affected": ["https://www.tutora.it.com/find-a-tutor/sudipto-ffbf5742"],
      "viewports_affected": ["mobile"]
    },
    {
      "title": "Large unused whitespace in desktop hero right column",
      "severity": "Low",
      "description": "At 1920x1080 the hero copy occupies roughly the left half of the viewport, leaving substantial empty space around a small decorative graphic on the right, underutilizing above-the-fold space on large screens.",
      "recommendation": "Add a lightweight stat or testimonial snippet to the right column on large viewports to reinforce the value proposition.",
      "pages_affected": ["https://www.tutora.it.com/"],
      "viewports_affected": ["desktop"]
    },
    {
      "title": "Verification badges on tutor profile page lack inline labels",
      "severity": "Low",
      "description": "Small green checkmark and shield icons next to the tutor's name aren't labeled on the profile page itself, requiring prior context from the homepage to understand what they represent.",
      "recommendation": "Add short inline labels or tooltips (e.g., 'ID Verified', 'Background Checked') near the badges on tutor profile pages.",
      "pages_affected": ["https://www.tutora.it.com/find-a-tutor/sudipto-ffbf5742"],
      "viewports_affected": ["desktop", "mobile", "tablet"]
    },
    {
      "title": "Non-default screenshot timeout needed for tutor profile template",
      "severity": "Info",
      "description": "Operational note for CI/visual-regression tooling: default ~30s timeouts may intermittently fail on /find-a-tutor/<slug> pages.",
      "recommendation": "Set timeouts to 45-60s for tutor profile templates in any automated screenshot/visual-regression pipeline; validate against real-user mobile timing via CrUX/RUM.",
      "pages_affected": ["https://www.tutora.it.com/find-a-tutor/sudipto-ffbf5742"],
      "viewports_affected": ["mobile"]
    }
  ],
  "screenshots": {
    "home": {
      "desktop": "screenshots/home/www_tutora_it_com_desktop.png",
      "laptop": "screenshots/home/www_tutora_it_com_laptop.png",
      "tablet": "screenshots/home/www_tutora_it_com_tablet.png",
      "mobile": "screenshots/home/www_tutora_it_com_mobile.png"
    },
    "courses": {
      "desktop": "screenshots/courses/www_tutora_it_com_desktop.png",
      "laptop": "screenshots/courses/www_tutora_it_com_laptop.png",
      "tablet": "screenshots/courses/www_tutora_it_com_tablet.png",
      "mobile": "screenshots/courses/www_tutora_it_com_mobile.png"
    },
    "tutor_profile": {
      "url": "https://www.tutora.it.com/find-a-tutor/sudipto-ffbf5742",
      "desktop": "screenshots/tutor/www_tutora_it_com_desktop.png",
      "laptop": "screenshots/tutor/www_tutora_it_com_laptop.png",
      "tablet": "screenshots/tutor/www_tutora_it_com_tablet.png",
      "mobile": "screenshots/tutor/www_tutora_it_com_mobile.png"
    }
  }
}
```
