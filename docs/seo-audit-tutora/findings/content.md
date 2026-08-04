# Content Quality Audit — tutora.it.com

## Category Score: 33 / 100

The site's ~71 indexed URLs are dominated by two templated page types — `/courses/*` (44 pages) and `/find-a-tutor/*` (25 pages) — which together represent roughly 97% of the site and both exhibit severe thin/mad-libs content patterns. The homepage and hub pages carry reasonable marketing copy and structured data, but the long tail that should carry topical depth and E-E-A-T signals does not.

### E-E-A-T Breakdown (internal weighted model)

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 22 | No case studies, no first-hand student outcomes, no bylined authorship on course curricula; tutor bios are generic claim statements, not lived experience narratives |
| Expertise | 25% | 30 | Tutor "years of experience" and subject tags are asserted, not substantiated (no degrees, certifications, portfolio links, sample lesson video); course learning-outcome lists are generic and interchangeable across unrelated subjects |
| Authoritativeness | 25% | 20 | No press mentions, external citations, awards, guest-expert content, or backlink-worthy original resources found in sampled pages |
| Trustworthiness | 30% | 33 | Vetting claims (ID check, background check, video interview) are a strong concept, but are not displayed on the pages where trust actually needs to be proven (tutor profiles), and are undercut by fabricated-looking rating displays and non-functioning stat counters (see findings below) |
| **Weighted E-E-A-T composite** | | **27** | |

### AI Citation Readiness Score: 38 / 100

Homepage carries genuine JSON-LD (Organization, WebSite, FAQPage, HowTo, Service, BreadcrumbList — 7 valid schema blocks), which is a real asset for AI/LLM citation. But the visible text backing those claims is thin, the platform's key trust statistics render as literal "0" in the crawlable DOM, and the course/tutor long tail has no distinct, quotable, page-specific facts — every course page repeats the same 27-word trust sentence verbatim, and tutor bios repeat the same three-clause mad-libs template. An LLM summarizing these pages has almost nothing unique to extract or cite per page.

---

## What Works

- **Homepage has real JSON-LD structured data**: Organization, WebSite, FAQPage, HowTo, Service, and BreadcrumbList schema all validate (7/7 blocks parsed successfully) — a solid foundation for AI/answer-engine citation if the underlying content depth is fixed.
- **Clear, coherent value proposition copy** on the homepage and `/about` — the "human-vetted, not an open marketplace" positioning is consistently and clearly articulated, which is good for topical clarity even though it's thin on proof.
- **Legitimate vetting process claims** (ID verification, background check, live video interview) are a genuine differentiator concept for a tutoring marketplace, if actually substantiated per-tutor.
- **Tutor cards include concrete details** (years of experience, specific subjects taught, country, hourly rate) rather than vague filler — the raw data points exist, they're just wrapped in near-identical sentence templates.
- **Course pages have consistent, scannable structure** (title, level/hours/format badges, "About this course," 4-bullet "What you'll learn," price) — good UX scaffolding that could support genuine differentiation if the prose were rewritten per subject.

---

## Findings

### 1. Course pages are near-identical mad-libs content across all subjects (Critical)
**Severity:** Critical
**Description:** All 10 sampled `/courses/<subject>` pages — spanning dance, guitar, Adobe Illustrator, UI/UX design, Spanish, Arabic, GMAT, SAT, Python, and JavaScript — use the exact same sentence skeleton with only nouns swapped:
> "This all levels [category] course offers [N] hours of instruction. By the end, you'll be able to [outcome 1]; [outcome 2]; [outcome 3]; [outcome 4]. Every course on TutorA is reviewed by our team before it's published, and every request is matched by a person — not an open marketplace where anyone can pitch you. Structured to work for both newcomers and learners with prior experience in [category]."

The trailing trust sentence ("Every course on TutorA is reviewed by our team before it's published...") is copied verbatim, word-for-word, across every single sampled page regardless of subject — confirmed identical on `dance-8f1859ae`, `guitar-a7d7f6aa`, `adobe-illustrator-51e96821`, `ui-ux-design-85bad5a6`, `spanish-2dd27e6e`, `arabic-bee72fa4`, `gmat-d7e5eb9d`, `sat-c5d2749b`, `python-ff654450`, and `javascript-ac5adb0a`. Each page is only 136–155 words of extracted body text, well under any reasonable topical-coverage floor for a page meant to sell a paid course. There is no syllabus breakdown, no example lesson plan, no instructor attribution, no sample materials, no subject-specific depth (e.g., the GMAT page doesn't mention section-by-section scoring, the Arabic page doesn't mention dialect coverage, etc.).
**Recommendation:** Rewrite course descriptions with subject-specific depth: a real syllabus/curriculum outline, example lesson structure, prerequisite guidance, and instructor-specific framing. Replace the single repeated trust sentence with content unique to each page (or move it to a shared trust badge/component instead of inline body copy repeated 44 times, which reads as templated to both users and crawlers). Target genuine topical coverage — even a modest 300–400 words of subject-specific material per course would materially change the site's thin-content risk profile.

### 2. Tutor profile pages are extremely thin and structurally duplicate their own bio text (Critical)
**Severity:** Critical
**Description:** All 6 sampled `/find-a-tutor/<name>` profiles (`sudipto-ffbf5742`, `sneha-joshi-b6dc7c09`, `sarah-khan-843d8b61`, `vivek-bansal-b66680bc`, `sophia-88d22517`, `harsh-patel-a75515a3`) run only 67–82 words of extracted text. Each follows an identical three-clause template:
> "[Role/trait] educator/specialist... [generic description]. [Name] has/With [N] years teaching [X, Y, Z], [Name] [verb phrase]. [Name] teaches [X, Y and Z] on TutorA, based in [Country], with [N] years of experience."

The final sentence is a near-verbatim restatement of the first two — the same three facts (name, subjects, years of experience) are stated twice within an 80-word page. There are no degrees, certifications, sample lesson videos, portfolio work, written testimonials/reviews, or any first-hand narrative distinguishing one tutor from another beyond swapped nouns. Avatars are initials-only placeholders (e.g., "S", "SJ", "VB") rather than real photos on the sampled profiles. This is the same template repeated at scale across what appears to be the entire 25-tutor roster (confirmed via the `/find-a-tutor` hub, which aggregates the identical bio sentences).
**Recommendation:** This is the single highest-priority fix. Add genuine differentiating content per tutor: a real headshot, a first-person teaching philosophy paragraph, specific credentials (degree, certification, institution), a sample lesson video or teaching sample, and actual student reviews/ratings. At minimum, eliminate the redundant closing sentence that just restates the opening bio, and vary sentence structure so pages don't read as machine-generated to both users and Google's spam systems.

### 3. Star ratings displayed with zero reviews is a misleading trust signal (High)
**Severity:** High
**Description:** Every sampled course page shows a rating badge like "4.8(0)" or "5.0(0)" — a specific star rating (4.8, 5.0) paired with a review count of zero. Displaying a precise average rating with no reviews backing it is either a placeholder/default value that was never removed, or a fabricated trust signal. Either way, it actively damages trustworthiness (30% weight in E-E-A-T) since it's a checkable, falsifiable claim that fails on inspection. This pattern was consistent across all 10 sampled course pages.
**Recommendation:** Do not display a star rating until real reviews exist. Show "No reviews yet" or suppress the rating component entirely for zero-review courses. Populate genuine review collection before re-enabling the rating display.

### 4. Homepage's key trust statistics render as literal "0" in the crawlable page (High)
**Severity:** High
**Description:** The homepage includes a section titled "Current platform data (as of 2026)" with the framing "Every figure below reflects reviewed platform activity — not self-reported claims" — but the extracted text for the actual figures reads:
```
- 0
- Verified tutors across 40+ countries, every credential checked before listing.
- 0
- Successful matches, each one reviewed by our team before contact was released.
- 0
- Average time from a submitted request to a proposed, vetted tutor.
```
This indicates the stat counters are JS-animated (counting up from 0 on scroll/load) and the underlying numeric values are not present in the static/crawled DOM — confirmed identical in both raw and Playwright-rendered fetches. Any crawler, AI answer engine, or accessibility tool that reads the DOM without triggering the counter animation will see "0 verified tutors, 0 successful matches, 0 average response time," which directly contradicts the page's own framing that these are trustworthy, reviewed figures. This is a significant AI-citation-readiness risk: an LLM summarizing this page could plausibly cite "TutorA has 0 verified tutors."
**Recommendation:** Render the actual numeric values server-side (or in the initial HTML/JSON-LD) and layer the count-up animation on top as progressive enhancement, rather than starting from a literal 0 that's the only value present without JS execution. Add these figures to the existing Organization/Service JSON-LD as well so they're machine-readable independent of animation state.

### 5. About page lacks named accountability and authorship signals (Medium)
**Severity:** Medium
**Description:** `/about` is only 215 words and, despite being the canonical page for establishing organizational trust, contains no founder/team names, no company history or founding date, no physical address, no press mentions, and no photos of real people. The page asserts "Our team reviews every request" and "our team will get back to you personally" multiple times but never identifies who that team is. For a marketplace whose entire value proposition rests on human review and vetting, the absence of any named humans behind that claim is a meaningful expertise/authoritativeness gap.
**Recommendation:** Add named founders/team members with real bios, credentials, and photos; a brief company history/founding story; a physical business address or registered entity info; and any press/media mentions or partnerships. This single page carries disproportionate E-E-A-T weight and is currently the weakest link for a site making strong trust claims elsewhere.

### 6. Tutor profile pages don't surface the 4-step vetting claims made on the homepage (Medium)
**Severity:** Medium
**Description:** The homepage prominently advertises "Every tutor earns four checkmarks before they meet you" — ID verification, background check, and live video interview — as the platform's core differentiator ("Verified by our team, not an algorithm"). None of the 6 sampled tutor profile pages (`sudipto-ffbf5742`, `sneha-joshi-b6dc7c09`, `sarah-khan-843d8b61`, `vivek-bansal-b66680bc`, `sophia-88d22517`, `harsh-patel-a75515a3`) display any verification badge, checkmark, or reference to this vetting process on the page where a prospective student would actually be deciding whether to trust that specific tutor. The trust claim and the trust proof are disconnected.
**Recommendation:** Surface the specific verification badges (ID verified, background check passed, video interview completed) directly on each tutor profile card/page, ideally with a verification date, so the claim is substantiated at the point of decision rather than only asserted abstractly on the homepage.

### 7. Broken/nonsensical template output on Python course page (Medium)
**Severity:** Medium
**Description:** On `/courses/python-ff654450`, the "What you'll learn" bullet list and body copy both include the literal fragment "you'll be able to python Programming for Beginners" and a bullet reading "Python Programming for Beginners" — the page title/slug appears to have been spliced directly into a sentence template ("By the end, you'll be able to [outcome]") without the outcome text being written, producing grammatically broken, clearly unedited machine-template output: *"By the end, you'll be able to python Programming for Beginners; write and debug programs..."*
**Recommendation:** Manually review all 44 course pages for similar template-splicing errors before further indexing/promotion — this kind of visible glitch is a strong negative quality signal to both users and Google's automated content-quality classifiers, and undermines the credibility of the "team-reviewed" claim made on every course page.

### 8. No genuine content freshness signals across sampled pages (Low)
**Severity:** Low
**Description:** Automated date extraction returned inconsistent and likely non-authoritative publication dates across sample pages — `2026-01-01` (a generic placeholder pattern) for `/about` and most `/courses/*` and `/find-a-tutor/*` pages, versus `2026-08-03`, `2026-08-04`, and `2026-07-27` for the homepage and hub pages. This pattern (round default dates on detail pages vs. near-today dates on hubs) suggests there is no genuine "last updated" or "last reviewed" signal embedded in the page content itself — dates are being inferred rather than sourced from real metadata.
**Recommendation:** Add explicit, genuine "last reviewed" or "last updated" dates to course and tutor pages (tied to actual content/curriculum revisions or tutor profile updates), and expose them in both visible copy and structured data (`dateModified` in schema).

### 9. Find-a-tutor and courses hub pages are reasonably strong but still exhibit repetition (Low)
**Severity:** Low
**Description:** `/find-a-tutor` (862 words) and `/courses` (384 words) are the most substantive pages sampled outside the homepage, and provide legitimate category-level context (e.g., the courses hub explains what TutorA courses are, lists subject categories with distinct one-line descriptions per subject — a good pattern that is NOT present on the individual course pages themselves). However, `/find-a-tutor` is effectively an aggregation of the same templated bios flagged in Finding #2, meaning the hub and the 25 individual profile pages carry substantially duplicate content.
**Recommendation:** Once tutor bios are rewritten with genuine differentiation (Finding #2), consider trimming the hub-page bio excerpts to a shorter, distinct teaser rather than reproducing the full bio text, to reduce duplicate content between hub and detail pages.

---

## Sample Coverage Note

This audit sampled: homepage, `/about`, `/courses` hub, `/find-a-tutor` hub, 10 course pages spanning academic/creative (dance, guitar), design (Adobe Illustrator, UI/UX), language (Spanish, Arabic), test-prep (GMAT, SAT), and coding (Python, JavaScript) categories, and 6 tutor profile pages. Given that the templating patterns found were byte-for-byte identical across every sampled course page and every sampled tutor profile regardless of subject/category, these findings should be treated as representative of the full 44-course and 25-tutor population, not isolated instances.
