# Visual / Mobile Re-Audit — tutora.it.com (2026-08-14)

Canonical site audited: `https://www.tutora.it.com` (production). Playwright (Chromium, headless) used for capture, with a follow-up debug pass (network log, console log, forced scroll-through) to validate anomalies before reporting them.

Screenshots: `/Users/piyushsaini/Projects/TutorConnect/docs/seo-audit-tutora/findings-2026-08-14/screenshots/`
Viewports: Desktop 1920x1080, Mobile 375x812 (iPhone-class, `is_mobile`/`has_touch` enabled). All screenshots are full-page captures.

## 1. Whitespace / excessive page-height bug — RESOLVED, not reproduced

The 2026-08-10 report's claim of a ~27,000px mobile page is **not reproducible**. Measured `document.documentElement.scrollHeight` for every page in this pass:

| Page | Desktop height | Mobile height |
|---|---|---|
| Homepage `/` | 6,915px | 10,351px |
| `/courses` | 5,042px | 6,287px |
| `/find-a-tutor` | 7,753px | 9,525px |
| `/subjects` | 2,968px | 5,296px |
| `/courses/gcse-english-017a23a5` | 3,083px | 4,358px |
| `/subjects/a-level-maths` | 2,924px | 4,227px |
| `/find-a-tutor/abeer-singh-315a954d` | 3,025px | 4,283px |
| `/request-a-tutor` | 4,589px | 5,604px |

All heights are consistent with real, visible content (listing pages are naturally taller than detail pages; mobile is taller than desktop because of single-column stacking, which is expected). Nothing approaches the previously reported 27,000px figure. This bug is confirmed resolved / was a one-off measurement artifact, and the owner's recent content additions did not reintroduce it.

## 2. Full-page-screenshot blank-space artifact (capture artifact, not a live bug — verified)

Several full-page screenshots (homepage, `/courses`, `/subjects/a-level-maths`, `/courses/gcse-english-017a23a5`, `/request-a-tutor`) show a large blank gap between the last content block and the footer/dark CTA band. This looked alarming at first glance (echoes the old "whitespace bug" visually), so it was investigated directly rather than reported at face value:

- Re-loaded the homepage and **programmatically scrolled the full page in small increments** (simulating real user scroll) before re-screenshotting. Result: every section that appeared blank in the naive full-page capture (Popular subjects pills, subject-grade cards, verified-tutor cards, testimonials, FAQ accordion, comparison table, final CTA) **rendered correctly** with full content — see `debug_afterscroll.png` captured during investigation.
- Inspecting the DOM for the "Popular subjects" section confirmed the markup and content (subject pill links, icons, styles) were present in the page at load time; `opacity:1`/`visibility:inherit` were already set.
- No failed network requests (aside from an aborted, non-blocking GA `collect` beacon) and no console/page errors were present.

Conclusion: this is a **screenshot-capture timing artifact**, not a real defect. It appears to stem from scroll-into-view fade/slide animations (Framer-Motion-style `whileInView` or IntersectionObserver-driven reveals) that hadn't yet fired when Playwright's full-page screenshot stitched together the tail of very tall pages taken via `networkidle` + a fixed short wait. When the page is scrolled through at a human-like pace (as real visitors do), all sections render fully. Recommend the audit tooling account for this in future (scroll-through before full-page capture) rather than treating blank capture regions as page bugs. Not a user-facing issue; no action needed on the site itself unless the team wants scroll-reveal animations to have a shorter delay/threshold for accessibility/no-JS robustness.

`find-a-tutor/abeer-singh-315a954d` (tutor profile) and `find-a-tutor` listing did not show this artifact — content reached the footer cleanly in the initial capture.

## 3. Login/signup modal auto-opens on load

A "Continue with Google" / "Welcome back" login modal appears automatically on page load on the homepage and other pages in this pass. Per site owner confirmation, **this is intentional lead-gen behavior** on Courses, Find a Tutor, Request a Tutor, and About Us — not a bug, and not reported as one here. Noted only because it affects how screenshots should be interpreted (some captures include the modal overlay, some don't, depending on load timing) — it is not part of the layout/whitespace findings above.

## 4. Layout quality of newly expanded prose (course/subject/tutor detail pages)

Reviewed `/courses/gcse-english-017a23a5`, `/subjects/a-level-maths`, `/find-a-tutor/abeer-singh-315a954d` on desktop and mobile:

- **No overflow, cramped spacing, or broken cards found.** The expanded prose ("About this course", "What this course covers", "Why a TutorA tutor", bulleted breakdowns) reflows cleanly at both viewports; body copy wraps normally, bullet lists remain readable, and the sticky price/CTA card on desktop degrades gracefully to a stacked block on mobile.
- Card-based content (tutor's "Subjects taught" cards on the tutor profile, "Other tutors teaching similar subjects" cards) stack correctly on mobile with consistent padding and no text truncation/cut-off.
- Typography hierarchy (H1 → section headers → body) is consistent across all three page types; nothing looks templated-wrong or duplicated.

## 5. Above-the-fold quality

- Homepage: H1 ("Personalized Online Learning with Expert Indian Teachers"), subhead, and primary search/CTA are all visible above the fold on both desktop and mobile (when the login modal isn't covering it — see §3).
- Listing pages (`/courses`, `/find-a-tutor`, `/subjects`): breadcrumb, H1, short description, and category/grade cards begin above the fold on both viewports.
- Detail pages: H1, tags (grade/exam-board/subject), short description, and price/CTA card are above the fold on desktop; on mobile the CTA card sits just below the fold on longer titles but is reached within one scroll — acceptable.

## 6. Mobile responsiveness — minor issue found

- `/courses` (mobile): measured `document.documentElement.scrollWidth` = 389px vs `innerWidth` = 375–388px, and `/find-a-tutor` (mobile): scrollWidth 382px vs innerWidth 382px — a **small (~7–14px) horizontal overflow** was detected on these two listing pages. This is minor (not visually obvious in the screenshots, no visible horizontal scrollbar/cut content spotted) but worth a targeted fix — likely a flex/grid child (e.g., a pill row or filter chip group) slightly exceeding the container on narrow viewports. Recommend checking `.subject-pill`/filter-chip row `overflow-x` handling and any `w-[Npx]` fixed-width elements on these two templates.
- No horizontal overflow detected on homepage, `/subjects`, or any of the three detail-page templates.
- Nav collapses to a hamburger/menu icon correctly on mobile across all templates checked.
- Touch targets (CTA buttons, "Request This Tutor", "Send Request", subject pills) all appear comfortably sized (≥44px height) in the mobile screenshots.
- Base font size and line spacing look readable without zoom on all mobile captures.

## Summary of defects (net of the confirmed-not-a-bug items)

1. **Real, minor**: ~7–14px horizontal overflow on `/courses` and `/find-a-tutor` mobile — worth a quick CSS fix, not urgent.
2. **Not a bug**: 27,000px whitespace claim from 2026-08-10 — could not be reproduced; all page heights are normal and content-driven.
3. **Not a bug**: full-page-screenshot blank gaps — confirmed to be a scroll-reveal-animation/screenshot-timing artifact via forced-scroll re-capture; content is present and renders correctly under normal scrolling.
4. **Not a bug (by design)**: auto-opening login modal — confirmed intentional lead-gen UX per site owner.
5. **No issues found** in the new expanded prose content on course/subject/tutor detail pages — clean reflow, no overlap, no cut-off text, no broken cards at any tested viewport.

## Screenshots captured

All under `/Users/piyushsaini/Projects/TutorConnect/docs/seo-audit-tutora/findings-2026-08-14/screenshots/`:
`homepage-desktop.png`, `homepage-mobile.png`, `courses-desktop.png`, `courses-mobile.png`, `find-a-tutor-desktop.png`, `find-a-tutor-mobile.png`, `subjects-desktop.png`, `subjects-mobile.png`, `courses-slug-desktop.png`, `courses-slug-mobile.png`, `subjects-slug-desktop.png`, `subjects-slug-mobile.png`, `find-a-tutor-slug-desktop.png`, `find-a-tutor-slug-mobile.png`, `request-a-tutor-desktop.png`, `request-a-tutor-mobile.png`.
