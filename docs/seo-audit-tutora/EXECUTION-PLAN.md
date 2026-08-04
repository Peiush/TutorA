# SEO Execution Plan — tutora.it.com / TutorConnect

**Goal:** Increase domain authority, fix everything flagged in `FULL-AUDIT-REPORT.md`, and get TutorA ranking for 100+ keywords.

**Key fact that shapes this whole plan:** this repo (`TutorConnect`) *is* the live codebase behind tutora.it.com — routes match the audited sitemap 1:1 (`app/courses`, `app/find-a-tutor`, `app/about`, `app/become-a-tutor`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD already in `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/courses/page.tsx`, `app/courses/[slug]/page.tsx`, `app/find-a-tutor/[slug]/page.tsx`). That means most fixes below aren't "run a skill and wait" — they're direct code edits I can make in this session. So each task below is labeled with **who/what actually does the work**:

- 🔧 **Direct code edit** — I implement this now in the repo, no skill needed.
- 🤖 **Skill generates, then I implement** — a skill produces the artifact (schema JSON, keyword clusters, content brief, image plan), I wire it into the code.
- 🧠 **Skill only (research/strategy)** — the skill's output *is* the deliverable; no code change, used to inform decisions (keyword targets, link prospects).
- 👤 **Human task** — can't be done by me or a skill (photography, business info, credentials setup).

---

## Phase 0: Foundation (do first, unlocks everything downstream)

| Task | Who | Skill |
|---|---|---|
| Configure Google Search Console + PageSpeed Insights API credentials | 👤 you (I can walk you through `google_auth.py --auth`) | — |
| Configure a free Moz API key (2,500 rows/month) | 👤 you | — |
| Capture an SEO drift baseline now, so every future change is checked against today's state | 🧠 `seo-drift` | `seo-drift` |

**Why first:** everything after this improves. Field CWV data (real users, not lab), real backlink metrics, and a regression tripwire all compound in value the earlier they start collecting data. This takes ~15 minutes and costs nothing.

---

## Phase 1: Critical Fixes (Week 1) — all direct code edits

These are the items from `ACTION-PLAN.md` Phase 1. No skill invocation needed — I'll implement these directly against `app/page.tsx`, the shared layout, and the course-page template.

| # | Task | File(s) likely involved |
|---|---|---|
| 1 | Server-render real trust-stat numbers instead of "0" (keep count-up as progressive enhancement) | homepage stats component |
| 2 | Suppress star-rating badge on course pages when `reviewCount === 0` → show "No reviews yet" | `app/courses/[slug]/page.tsx` or course card component |
| 3 | Fix the broken template splice on the Python course page ("...python Programming for Beginners"); audit the course-content data source for the same bug across all 44 | course content data/seed |
| 4 | Add `rel="nofollow"` to (or gate) `/admin` and `/dashboard` footer links | shared footer component |
| 5 | Remove the deprecated `HowTo` JSON-LD block from the homepage | `app/page.tsx` |
| 6 | Find and fix the shared JS component causing forced-synchronous-layout (6.3s TBT root cause) — likely a scroll-reveal animation | shared animation/reveal component (GSAP is in your dependencies — likely candidate) |

**I can start on these as soon as you say go** — this is the single highest-ROI week in the whole plan since #6 alone should measurably improve every page's Core Web Vitals at once.

---

## Phase 2: Schema, Metadata & Technical Cleanup (Weeks 2–3)

| # | Task | Who | Skill |
|---|---|---|---|
| 7 | Add `logo` + `sameAs` to Organization schema | 🤖 `seo-schema` generates the exact JSON-LD → I paste into `app/layout.tsx` | `seo-schema` |
| 8 | Add `hasCourseInstance` to Course schema | 🤖 `seo-schema` | `seo-schema` |
| 9 | Fix `/courses` hub's `ItemList` mislabeling category filters as `Course` | 🔧 direct edit | — |
| 10 | Add page-specific `og:image`/Twitter Card metadata to course + tutor templates (extend existing `opengraph-image` route with `[slug]`) | 🔧 direct edit | — |
| 11 | Publish a public `/become-a-tutor` landing page (currently zero indexable recruiting content — the form itself stays gated) | 🔧 direct edit (new page content) | possibly 🤖 `seo-content-brief` for the page outline first |
| 12 | Fix sitemap `lastmod` to reflect genuine content-edit timestamps, not generation order | 🔧 direct edit to `app/sitemap.ts` | `seo-sitemap` to re-validate after |
| 13 | Publish `llms.txt` | 🔧 direct edit (new file) | `seo-geo` can draft the content |
| 14 | Re-run technical audit to confirm fixes landed | 🧠 | `seo-technical` |

---

## Phase 3: Content & Keyword Strategy (Month 2) — this is what actually gets you to 100+ keywords

This is the core of "rank for 100+ keywords." Sequence matters: **research before rewriting**, so you don't rewrite 44 pages around the wrong keywords.

### Step 3a — Keyword research & clustering
| Task | Skill | Output |
|---|---|---|
| Expand seed keywords (your 44 course subjects × intent modifiers: "online," "near me," "for beginners," "[grade level]," "[age group]") into SERP-validated topic clusters | 🧠 **`seo-cluster`** | Hub-and-spoke content map + internal linking matrix — tells you which of the 100+ keywords are actually winnable and how pages should link to each other |
| For competitive terms (SAT, GMAT, etc.), read the SERP backwards to confirm what page *type* to build | 🧠 **`seo-sxo`** (already partially done — SAT/Python confirmed CRITICAL/HIGH mismatch) | Extend to the remaining 42 course subjects to prioritize the rebuild order |

### Step 3b — Content briefs (one per priority page, from the cluster output)
| Task | Skill | Output |
|---|---|---|
| Generate a per-page brief for each of the 44 course pages: word count target, section outline, competitor benchmarks | 🤖 **`seo-content-brief`** | Brief per page → handed to whoever writes copy (you, a writer, or me drafting placeholder-free copy for you to review) |
| Generate briefs for the 5–7 test-prep pages specifically as **Service/Hybrid pages** (per SXO finding: SAT/ACT/GMAT/GRE/IELTS/TOEFL/PTE need guarantees, credentialed bios, testimonials — not thin product listings) | 🤖 **`seo-content-brief`** | Restructured template brief, not just more words |

### Step 3c — Implement the rewrite
| Task | Who |
|---|---|
| Rewrite all 44 course pages with genuine subject-specific depth (300–400+ words, real syllabus, no shared trust-sentence template) | 🔧 I implement against the briefs, or you write and I integrate |
| Embed a subject-filtered tutor-card grid directly on each course page (addresses SXO Finding #2 — "python tutor" wants a marketplace grid, not an abstract listing) | 🔧 direct code — likely reuses the existing `/find-a-tutor` card component, filtered by subject |
| Rewrite all ~26 tutor bios eliminating the redundant restated sentence, adding real differentiation | 🔧 + 👤 (needs actual tutor input: credentials, teaching philosophy) |
| Add 3–5 item FAQ blocks with `FAQPage` schema to course pages | 🤖 `seo-content-brief` for question selection + 🤖 `seo-schema` for markup + 🔧 implement |

### Step 3d — Images (blocks GEO, trust, and Google Images entirely right now)
| Task | Who | Skill |
|---|---|---|
| Plan what images are needed (tutor headshots, course thumbnails) and draft alt-text/prompts | 🤖 **`seo-image-gen`** (audits gaps, drafts prompts — does not auto-generate without your say-so) | `seo-image-gen` |
| Collect real tutor headshots | 👤 you (product/ops task — real photos, not generated ones, per the schema audit's explicit warning against `image` pointing at generated avatars) | — |
| Wire images into `Person`/`Course` schema `image` property once real photos exist | 🔧 direct edit | — |

### Step 3e — Programmatic scale (once the 44-page template is fixed, not before)
| Task | Skill | Why |
|---|---|---|
| Evaluate whether new subject/city/grade-level page combinations are worth generating at scale (e.g., "SAT tutor for [grade]") | 🧠 **`seo-programmatic`** | Prevents you from scaling the *current* thin template into hundreds of thin pages — sequence this after 3c, not before |

---

## Phase 4: Backlinks & Domain Authority (Month 2, ongoing after)

Domain authority is the one thing content/schema fixes alone don't move — it's earned externally.

| Task | Who | Skill |
|---|---|---|
| Execute the free link-building plan already drafted in `findings/backlinks.md`: education directories, local school/PTA partnerships, HARO journalist requests, guest posts, Quora/Reddit expert answers | 👤 you (outreach) — I can draft pitch templates/emails | — |
| Re-check Bing's own backlink index + submit via IndexNow for faster indexing of new/updated pages | 🧠 **`seo-bing`** | Needs free Bing Webmaster Tools signup first |
| Re-run backlink audit once real link-building activity has happened, to start tracking actual metrics | 🧠 **`seo-backlinks`** | Re-run in 4–8 weeks, and again once Moz key is configured (Phase 0) |
| Once TutorA has enough independent coverage, pursue a Wikipedia/Wikidata entity and `sameAs` links (per GEO finding — YouTube/Reddit/Wikipedia presence correlates strongly with AI citation) | 👤 you, later-stage | — |

---

## Phase 5: Monitor & Iterate (ongoing from here on)

| Task | Cadence | Skill |
|---|---|---|
| Re-run `seo-audit` (full site) | After Phase 1–2 ship, then quarterly | `seo-audit` |
| Check for regressions after every deploy | Every deploy | `seo-drift` (baseline captured in Phase 0) |
| Track real keyword rankings/impressions once GSC is connected | Weekly/monthly | `seo-google` |
| Re-run `seo-cluster` as new subjects/courses get added to the catalog | Whenever catalog grows | `seo-cluster` |
| Re-check backlink tier | Quarterly | `seo-backlinks` |

---

## Suggested Order of Operations (condensed)

1. **This week:** Phase 0 (credentials + drift baseline) + Phase 1 (6 direct code fixes, especially the layout-thrashing JS fix)
2. **Weeks 2–3:** Phase 2 (schema/metadata/technical cleanup)
3. **Month 2, first half:** Phase 3a–3b (`seo-cluster` + `seo-content-brief` — figure out *what* to write before writing it)
4. **Month 2, second half:** Phase 3c–3d (implement the rewrite + images) — this is the bulk of the effort but also the biggest ranking lever
5. **Month 2 onward, parallel:** Phase 4 (backlink outreach — this takes months to compound, start early and run it continuously)
6. **Ongoing:** Phase 5 (monitoring)

---

## What I need from you to start

- **Say "go" on Phase 1** and I'll start implementing the 6 direct code fixes now.
- **For Phase 0:** do you want to set up Google Search Console/PSI API access now (I can walk you through `claude-seo run google_auth.py --auth`), or defer it?
- **For Phase 3:** what subjects/keywords matter most to prioritize first — is there a revenue-priority order (e.g., test-prep > languages > creative arts), or should `seo-cluster` decide purely by search-volume/difficulty?
