# Schema.org / Structured Data Audit — tutora.it.com

**Category Score: 80 / 100**

Pages sampled (raw HTML fetch, server-rendered — confirmed identical in `content` vs `raw_content`, not a client-side-only SPA injection):
- Homepage — `https://www.tutora.it.com/`
- `/about`
- Course detail — `/courses/guitar-a7d7f6aa`
- Tutor profile — `/find-a-tutor/sudipto-ffbf5742`

All JSON-LD blocks found across these pages are syntactically valid (`valid: true`), use `https://schema.org` as `@context`, and use absolute URLs. This is a well above-average structured data implementation for the site type — the deductions below are refinements, not fundamental breakage.

## What Works

- **JSON-LD used exclusively** — no Microdata/RDFa found; correct format per Google's preference.
- **`https://schema.org` context** (not `http`) on every block — correct.
- **Absolute URLs** throughout (`https://www.tutora.it.com/...`) — no relative paths found.
- **`Organization`** schema present sitewide with `name`, `url`, `description` — valid, no placeholder text.
- **`WebSite`** schema present sitewide — valid, minimal but correct.
- **`Course`** schema on course pages includes required `name`, `description`, `provider.name`, plus recommended `offers` (price, currency, availability, url) — this is above the minimum bar for Google's Course structured data.
- **`Person`** schema on tutor pages includes `name`, `description`, `url`, `knowsAbout` (subject list), and `worksFor` — good entity coverage for AI/GEO and Knowledge Graph purposes.
- **`BreadcrumbList`** present on course and tutor pages with correct 3-level hierarchy (Home → Category → Detail), `position` integers, and absolute `item` URLs — valid and passes Google's Rich Results Test requirements.
- **No fabricated/placeholder values** — spot-checked names, descriptions, and prices all reflect real page content (e.g., Course price `$50.00`, tutor `knowsAbout` matches on-page subjects).
- **`WebPage`** block on homepage correctly links `isPartOf` (WebSite) and `mainEntity` (`@id` reference to the FAQPage) — proper use of `@id` linking rather than duplicating data.

## Findings

### 1. Deprecated `HowTo` schema on homepage
**Severity:** High

The homepage ships a `HowTo` JSON-LD block (`@id: https://www.tutora.it.com/#how-it-works`) marking up the "You tell us → We verify & match → You connect" 3-step explainer using `HowTo`/`HowToStep`.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://www.tutora.it.com/#how-it-works",
  "name": "How to find a tutor on TutorA",
  "step": [ ... ]
}
```

Google removed `HowTo` rich results in September 2023. This markup provides zero SERP benefit today and is flagged as deprecated in Google's structured data documentation — shipping it signals stale implementation and adds unnecessary page weight/parse cost for no return.

**Recommendation:** Remove the `HowTo` block entirely. The visual "how it works" content on the page does not need to be a HowTo — it's a value-proposition explainer, not an instructional/repair guide, so there's no schema type to substitute it with for rich-result purposes. If structural markup is still desired for AI/GEO entity understanding, a plain `ItemList` of `ListItem`s is acceptable (no rich-result eligibility, but harmless and not deprecated):

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "How TutorA matches you with a tutor",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "You tell us", "description": "Browse verified tutors or send a private request. Nothing is posted publicly and no tutor sees your details." },
    { "@type": "ListItem", "position": 2, "name": "We verify & match", "description": "Our team vets every tutor, sources the right fit and relays messages." },
    { "@type": "ListItem", "position": 3, "name": "You connect", "description": "Once you and the tutor both confirm, we release contact details immediately." }
  ]
}
```

### 2. `FAQPage` schema present on homepage and `/about` — no Google SERP benefit
**Severity:** Info

Both the homepage (`#faq`, 6 Q&As) and `/about` (5 Q&As, different questions) carry valid `FAQPage` markup. Per current Google policy, FAQ rich results were retired for all sites (superseding the earlier Aug 2023 gov/health-only restriction) — this markup will not produce a SERP FAQ dropdown for any site anymore.

The markup itself is technically well-formed (correct `Question`/`acceptedAnswer`/`Answer` nesting, real content, no placeholders), so this is not "broken," just no longer functional for its original purpose.

**Recommendation:** No urgent action required. Options:
- Leave in place if you're comfortable with the caveat that any AI/GEO (LLM-answer-engine) benefit from FAQPage markup is unconfirmed — some crawlers/assistants may still use it as a content-understanding signal even without a Google SERP feature.
- If simplifying, it's safe to remove without SEO loss, since there is no rich-result feature to lose.
- Do not invest further effort adding *new* FAQPage blocks to other pages expecting a Google SERP feature — there isn't one.

### 3. `Organization` schema missing `logo` and `sameAs`
**Severity:** Medium

The `Organization` block (repeated identically on every page sampled) only has `name`, `url`, `description`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TutorA",
  "url": "https://www.tutora.it.com",
  "description": "TutorA sits between students and tutors so no one has to guess. Every match is personally verified by our team."
}
```

`logo` and `sameAs` (social profile URLs) are the two properties Google explicitly recommends for `Organization` to become eligible for a Knowledge Panel logo and to consolidate entity signals across social profiles. Neither is present.

**Recommendation:** Add `logo` (pointing to a real, square-ish, min-112×112px hosted image per Google's Organization logo guidelines) and `sameAs` with the brand's actual social/profile URLs. Replace placeholders below with TutorA's real assets before shipping:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TutorA",
  "url": "https://www.tutora.it.com",
  "description": "TutorA sits between students and tutors so no one has to guess. Every match is personally verified by our team.",
  "logo": "https://www.tutora.it.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/tutora",
    "https://www.instagram.com/tutora",
    "https://twitter.com/tutora"
  ]
}
```
*(Do not ship this snippet with the example URLs above — substitute TutorA's actual logo path and verified social profile URLs before deployment.)*

### 4. `Course` schema missing recommended `hasCourseInstance` (and `image`)
**Severity:** Medium

The sampled course page (`/courses/guitar-a7d7f6aa`) displays on-page course-mode details that aren't reflected in the schema: duration ("33.5h"), scheduling ("Flexible"), and level ("All Levels"). The `Course` JSON-LD currently only has `name`, `description`, `url`, `provider`, `offers` — no `hasCourseInstance`.

Google's Course structured data guidelines list `hasCourseInstance` (with `courseMode`, `courseWorkload`, and/or `courseSchedule`) as a strongly recommended property for full Course rich-result eligibility, alongside an `image`.

**Recommendation:** Add a `hasCourseInstance` block using the data already displayed on the page (duration 33.5h → ISO 8601 `PT33H30M`; mode online; flexible schedule):

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Guitar Lessons",
  "description": "Learn to play guitar, from first chords to playing full songs.",
  "url": "https://www.tutora.it.com/courses/guitar-a7d7f6aa",
  "provider": {
    "@type": "Organization",
    "name": "TutorA",
    "sameAs": "https://www.tutora.it.com"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "PT33H30M",
    "courseSchedule": {
      "@type": "Schedule",
      "repeatFrequency": "P1W",
      "byDay": []
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "50.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.tutora.it.com/courses/guitar-a7d7f6aa"
  }
}
```
Note: `courseSchedule` is optional and only worth including if there's an actual recurring schedule; for "Flexible" self-paced courses it's fine to omit `courseSchedule` entirely and rely on `courseWorkload` + `courseMode` alone.

### 5. Do not add `AggregateRating` to Course schema — on-page rating has zero review count
**Severity:** Medium (data-integrity flag, not a markup error)

The course page's extracted content shows the rating displayed as **"4.8 (0)"** — i.e., a 4.8-star rating with a review count of 0. This is a content/UI issue outside of schema markup itself, but it is directly relevant here: if `AggregateRating` schema is added to match this displayed value, it would violate Google's structured data guidelines, which require `ratingCount`/`reviewCount` to reflect a real, non-zero number of actual reviews. Shipping `AggregateRating` with `ratingCount: 0` (or omitting it while still using a non-zero `ratingValue`) can trigger a manual action for non-genuine review markup, and even without schema, showing "4.8 (0)" to users is misleading.

**Recommendation:**
- Do **not** add `AggregateRating` to `Course` (or `Person`) schema until there is a genuine, non-zero count of collected reviews.
- Flag the front-end display of "4.8 (0)" to the product team — either suppress the star rating entirely when `reviewCount === 0`, or default to "No reviews yet" copy. This should also be raised in the Content/UX section of the full audit, not fixed via schema.
- Once real reviews exist (with genuine `ratingCount` ≥ 1), the aggregate rating can be added like this:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "12"
}
```

### 6. `BreadcrumbList` missing on `/about`
**Severity:** Low

Course and tutor detail pages carry a correct 3-level `BreadcrumbList`. The homepage carries a 1-item `BreadcrumbList` (just "Home" — technically valid but not meaningful for rich results, which require the hierarchy to demonstrate a path). The `/about` page has no `BreadcrumbList` at all.

**Recommendation:** Add a 2-level breadcrumb to `/about` for consistency with the rest of the site's IA, and consider dropping the single-item breadcrumb on the homepage (Google's breadcrumb rich result is meant to show navigational depth; a lone "Home" item adds no value and is unlikely to render).

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

### 7. `WebSite` schema is minimal — no `SearchAction` (optional)
**Severity:** Info

The `WebSite` block only has `name` and `url`. If the site has an internal search feature (e.g., a course/tutor search bar), adding `potentialAction: SearchAction` makes the site eligible for the Sitelinks Search Box in Google results.

**Recommendation:** Only add if a genuine, working search URL pattern exists (e.g., `/find-a-tutor?q={query}` or `/courses?search={query}`). Do not add a placeholder `SearchAction` pointing at a URL pattern that doesn't actually work — verify with engineering first:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TutorA",
  "url": "https://www.tutora.it.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.tutora.it.com/find-a-tutor?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 8. `Person` (tutor) schema — solid, minor enhancement opportunity
**Severity:** Info

The `Person` block on tutor pages is well-formed and free of placeholders. Two optional enhancements, only worth doing if the underlying data genuinely exists:
- **`image`**: the tutor page renders an initial-letter avatar ("S") rather than a real photo for this profile, so `image` should only be added for tutors who have an actual uploaded photo — do not point `image` at a generated avatar/initial graphic.
- **`makesOffer`**: the page displays per-subject hourly pricing (e.g., "$35/hr" for AP Chemistry) that isn't reflected in the `Person` schema. This is optional (no Google rich-result tied to it) but can strengthen entity/pricing signals for AI answer engines:

```json
"makesOffer": [
  {
    "@type": "Offer",
    "itemOffered": { "@type": "Service", "name": "AP Chemistry Tutoring" },
    "price": "35.00",
    "priceCurrency": "USD"
  }
]
```

## Not Yet Checked (Out of Scope for This Pass)

- `/courses` and `/find-a-tutor` index/listing pages were not fetched in this pass — worth a follow-up check for `ItemList`/`CollectionPage` opportunities to strengthen the category pages, since 39+ course pages and 25+ tutor pages exist per the sitemap.
- Only one course subject and one tutor were spot-checked; assume the same template is used sitewide given the identical `Organization`/`WebSite` boilerplate observed across all four sampled pages — but a broader crawl would be needed to confirm no per-page anomalies (e.g., missing `offers.price` on certain courses).
