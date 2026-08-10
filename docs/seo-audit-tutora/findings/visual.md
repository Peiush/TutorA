# Visual Analysis — tutora.it.com (Re-audit)

**Date captured:** 2026-08-10 (fresh Playwright captures this session — see confirmation below)
**Screenshots:** `docs/seo-audit-tutora/findings/screenshots-2026-08-10/`
- `homepage/` — desktop/laptop/tablet/mobile (viewport)
- `about/` — desktop/laptop/tablet/mobile (viewport) + `about-full/` — desktop/mobile (full-page)
- `courses/` — desktop/laptop/tablet/mobile
- `find-a-tutor/` — desktop/laptop/tablet/mobile
- `subjects-gcse-maths/` — desktop/laptop/tablet/mobile (representative `/subjects/[slug]` page, chosen from live sitemap: `/subjects/gcse-maths`)

## Freshness confirmation

These are new captures taken this session via the bundled Playwright/Chromium runtime (`claude-seo run capture_screenshot.py`), independent of and **not** reusing anything from `docs/seo-audit-tutora/archive-2026-08-04/`. Page-height measurements below were also collected fresh via a direct Playwright script this session (not the earlier same-session numbers, though they corroborate).

## Mobile homepage height — re-verified

A prior audit claimed ~27,000px page height on mobile home (major whitespace bug). This could not be reproduced:

| Page | Mobile scrollHeight | Notes |
|---|---|---|
| Home | **13,399px** | Matches the earlier same-session recheck (13,399/11,211px) that also refuted 27,000px. No abnormal whitespace observed in mobile screenshot or full scroll. |
| About | 7,764px | Normal |
| Courses | 10,992px | Normal |
| Find a Tutor | 12,620px | Normal |
| Subjects (gcse-maths) | 3,779px | Normal |

**Conclusion: the 27,000px claim is not reproducible today. Confirmed stale/incorrect — likely from the archived 2026-08-04 audit or a transient render glitch, not current state.**

## Above-the-fold analysis

- **Homepage (desktop + mobile):** H1 ("The right tutor, personally matched.") and primary CTAs ("Find a Tutor" / "Request a Tutor") both visible above the fold on desktop. On mobile, CTAs sit right at the bottom edge of the first viewport — visible but tight; a few px of scroll may be needed on shorter devices. No login modal on homepage.
- **About, Courses, Find a Tutor:** A login/lead-gen modal auto-opens on these pages (also expected on Request a Tutor). Per instructions this is confirmed intentional UX and **not treated as a defect**, but it does mean the H1/CTA sit behind an overlay on first paint for these three pages — worth noting for above-fold usability even though it's by design.
- **Subjects (gcse-maths):** Renders cleanly, shortest page (2,794px desktop / 3,779px mobile), no modal observed, subject H1 and CTA visible above fold.

## Founder-story section (/about, added 2026-08-10)

Reviewed via full-page mobile + desktop captures (`about-full/`). "Our Story" / "Built by someone who got tired of guessing." section with founder Nancy Gupta quote renders cleanly on both viewports — **no overlap, no clipped text, no broken layout**. Confirms clean render.

## Mobile responsiveness

- No hamburger-menu issues; nav collapses correctly on mobile across all five pages.
- **Minor defect (new finding):** slight horizontal overflow on mobile (375px viewport) on Home (378px), About (395px, +20px), Courses (380px), Find a Tutor (383px) — `hasHorizontalScroll: true`. Root cause traced to decorative `pointer-events-none absolute` blur/glow background blobs (e.g. `w-[560px]` circles) extending past the viewport edge without a clipping `overflow-x: hidden` on their parent. Not interactive, not visually obvious in screenshots, but allows a few px of horizontal scroll/rubber-banding on real mobile devices. About page is worst offender (+20px). Subjects page has no overflow.
- Base font sizes and touch targets look adequate in all captures; no cut-off text observed.

## Score: 90/100

Deductions: minor horizontal-scroll overflow from decorative background elements on 4/5 pages (-6), mobile hero CTA sitting at the very edge of the first viewport on homepage (-4). No layout-breaking bugs, no reproducible whitespace/height bug, founder-story section confirmed clean, login-modal behavior confirmed intentional and excluded from scoring.
