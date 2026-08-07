# TutorA Phase 3 -- Step 3a: Subject Page SEO Content Cluster Plan

**Generated:** 2026-08-07
**Scope:** All 103 live `/subjects/[slug]` pages (Subject database table). These pages were previously a client-side-only modal with zero SEO value and ~30 words of content; a technical SEO audit made them real indexable pages with basic schema. This research is what unblocks writing real content -- FAQ, tutor grid, full copy -- for them.
**Real SERP-overlap WebSearch calls executed:** 61
**Total keyword variants processed:** 401
**Reference doc:** `docs/seo-audit-tutora/phase3-clustering/cluster-plan.md` (Step 3a for the 53 `/courses/[slug]` pages -- same methodology, DONE, not repeated here except where cross-checked)
**Business context:** TutorA is a 1:1 tutoring marketplace (find-a-vetted-tutor), not a self-paced course platform.

## The research question this document answers

Unlike the Course-level research (per broad topic, e.g. "Python"), these 103 subjects are **already** split by grade band and curriculum (e.g. "Algebra I" vs "Algebra II"; "AP Physics 1" vs "AP Physics C" vs "AP Physics"; "GCSE Chemistry" vs "IGCSE Chemistry" vs "A-Level Chemistry"). The question was NOT whether to add grade modifiers (already done) but:

1. Does real SERP evidence support each already-split entry actually deserving distinct content, or would some collapse into the same cluster?
2. For the 25 subject-to-course cross-links in `lib/subject-course-links.ts`, does real SERP data confirm they need to stay differentiated, or is there cannibalization risk needing a different resolution?
3. Does the Course-level page-type mismatch finding (Google rewards credentialed-tutor-bio pages over thin listings for exam-prep terms) hold at this more granular subject level too?

## Headline answers

- **The grade/curriculum splits mostly hold up to SERP evidence.** The strongest confirmation in the whole study: **GCSE Chemistry vs IGCSE Chemistry vs A-Level Chemistry** show near-zero domain overlap and zero exact-URL overlap in every pairing -- three genuinely distinct SERPs, not one artificially split into three. The same pattern repeats for Physics and Maths across the same three curricula, and across all 9 GCSE/IGCSE subject-to-course cross-links.
- **But two AP siblings show real cannibalization risk that the existing split does NOT resolve**: `ap-physics` (generic) overlaps 3-of-7 exact URLs with `ap-physics-1`, and `ap-calculus` (generic) has its sibling AB page ranking verbatim for the generic query. Recommend repositioning both generic AP pages as AB/BC- or 1/C-style chooser pages rather than competing head-on with their own numbered siblings (see AP section below).
- **The page-type mismatch finding (credentialed-tutor-bio pages beat thin listings) is CONFIRMED for every exam-driven curriculum family** (AP, GCSE, IGCSE, A-Level, IB) down to the individual-subject level. It does **NOT** extend cleanly to programming-language subjects (Python, JavaScript, Java, C++, SQL, HTML), which instead show a self-serve-tutorial + freelance-mentor-marketplace pattern -- a different template is recommended for those pages.
- **13 of the 25 existing subject-to-course cross-links should be reconsidered** -- not removed, but re-weighted. All 9 GCSE/IGCSE pairs have their own fully dedicated SERP ecosystem distinct from the shared course page; treating them as thin spokes of the course page undersells them. See the cross-link table below.
- **One subject has a real keyword-targeting bug, independent of clustering**: `cambridge-english`'s natural keyword ("Cambridge English tutor") is being interpreted by Google as a *location* (the city of Cambridge), not the exam suite (FCE/CAE/CPE). Needs retargeting, not restructuring.
- **One subject (`ai-basics`) has essentially no established tutor-marketplace SERP category to compete in** -- its SERP is 100% blogs/tutorials, not tutor listings.

## How to read this document

- **Validated (direct)** = a real, subject-specific WebSearch was run this session.
- **Pattern-applied** = inferred from the closest validated analog per the skill's own optimization guidance for keeping search budget tractable on a 103-subject catalog; confidence is marked, and areas most needing a follow-up pass are called out explicitly rather than silently assumed.
- **Action** legend: `hub-primary-standalone` (subject page owns its own primary keyword, no merge risk found) / `hub-primary-cross-link-sibling` (own primary keyword, but cross-link to a close sibling because SERP shows partial overlap) / `hub-primary-course-secondary-link` (own primary keyword; the existing course cross-link should be secondary context, not the main framing) / `reposition-as-chooser` (real cannibalization risk -- turn the generic page into a router to its own numbered siblings) / `retarget-keyword` (page-existence is fine, but the on-page keyword target needs to change) / `pillar-umbrella` (legitimately broader page that should link down to more specific spokes).

---

## Part 1 -- The 29 exam-driven subjects (full-depth SERP-overlap validated)

Every one of these 29 subjects was individually searched this session (`"[Subject name] tutor"`, plus targeted past-papers/exam-code variants for page-type and cannibalization checks). This is full-depth validation, matching the brief's requirement.

### AP family (8 subjects)

**Page-type finding: CONFIRMED.** Every AP subject searched returns credentialed-tutor-bio pages (Tutor.com, Wyzant, Princeton Review, Varsity Tutors, AJTutoring, Learner, UPchieve) as the dominant result type -- the Course-level SXO finding extends cleanly to the individual-exam level.

| Subject | Hub target | Action | Evidence |
|---|---|---|---|
| AP Physics 1 (`ap-physics-1`) | `/subjects/ap-physics-1` | hub-primary-standalone | This is the exam College Board actually calls "AP Physics" in common usage today. |
| AP Physics C (`ap-physics-c`) | `/subjects/ap-physics-c` | hub-primary-standalone | Zero exact-URL overlap vs Physics 1; every provider (Wyzant, LA Tutors 123, Growing Stars, TeacherOn, Princeton Review, Varsity Tutors, Stemly) has a dedicated subpage. Calculus-based positioning is a real differentiator. |
| **AP Physics (generic)** (`ap-physics`) | `/subjects/ap-physics` | **reposition-as-chooser** | **CANNIBALIZATION RISK**: 3 of ~7 results are *identical exact URLs* to the AP Physics 1 SERP (Wyzant `AP_physics_tutors.aspx`, Princeton Review's `tutor-search?s=ap+physics+1` literally serves this query too, Jaya's Academy). College Board discontinued the undifferentiated "AP Physics" exam in 2014 (replaced by Physics 1/2/C). Recommend: reposition this page as an "AP Physics 1 vs AP Physics C: which one do I need?" overview that routes to the two real subject pages, rather than competing for the same primary keyword as `ap-physics-1`. |
| AP Calculus AB (`ap-calculus-ab`) | `/subjects/ap-calculus-ab` | hub-primary-cross-link-sibling | 2 of 6 results are the *same exact URL* as AP Calculus BC (Learner.com, AlexanderTutoring both serve AB+BC on one page) -- cross-link heavily but Tutor.com/Growing Stars still differentiate, so keep separate. |
| AP Calculus BC (`ap-calculus-bc`) | `/subjects/ap-calculus-bc` | hub-primary-cross-link-sibling | Same evidence as AB. BC content is a strict superset of AB -- cross-link both directions, frame BC page as "AB plus...". |
| **AP Calculus (generic)** (`ap-calculus`) | `/subjects/ap-calculus` | **reposition-as-chooser** | **CANNIBALIZATION RISK CONFIRMED**: Tutor.com's AB-specific URL (`tutor.com/subjects/ap-calculus-ab`) appears *verbatim* in the generic "AP Calculus tutor" SERP -- Google already treats the AB page as the answer to this query. Recommend repositioning as an AB-vs-BC chooser page. |
| AP Chemistry (`ap-chemistry`) | `/subjects/ap-chemistry` | hub-primary-standalone | No sibling subject in the catalog; standalone, credentialed-bio pattern confirmed. |
| AP Biology (`ap-biology`) | `/subjects/ap-biology` | hub-primary-standalone | No sibling subject; standalone, confirmed. |

### GCSE / IGCSE / A-Level triads (Chemistry, Physics, Maths) -- 9 subjects

**This is the cleanest confirmation in the entire study that the existing curriculum split is real, not artificial.**

| Comparison | Domain overlap | Exact-URL overlap | Verdict |
|---|---|---|---|
| GCSE Chemistry vs IGCSE Chemistry vs A-Level Chemistry | Only TutorChase shared across all three (always on a dedicated `/gcse/`, `/igcse/`, `/a-level/` subpage) | **Zero** in every pairing | Fully differentiated. Keep all three as standalone hubs. |
| GCSE Physics vs IGCSE Physics vs A-Level Physics | TutorChase + PMT Education shared, always dedicated subpages | Zero | Fully differentiated. |
| GCSE Maths vs IGCSE Maths | **Zero domain overlap at all** (Sherpa/Superprof/PMT for GCSE vs GoStudent/TutorsPlus/igcsemathstutors.com for IGCSE) | Zero | Most fully differentiated pair in the whole study. |

All 9 subjects (`gcse-chemistry`, `gcse-physics`, `gcse-maths`, `igcse-chemistry`, `igcse-physics`, `igcse-maths`, plus `a-level-chemistry`, `a-level-physics`, `a-level-maths`) are `hub-primary-standalone`.

**Cross-link finding (affects 9 of the 25 existing subject-to-course links):** `gcse-biology`, `gcse-maths`, `gcse-chemistry`, `gcse-physics`, `gcse-science` all currently cross-link to the single shared `gcse-preparation-course-97ec8c86` course, and `igcse-chemistry`, `igcse-maths`, `igcse-physics` all cross-link to `igcse-preparation-course-5ed7859f`. Real SERP evidence shows **every one of these 8 subjects has its own fully dedicated provider ecosystem**, separate from the generic GCSE/IGCSE course SERP validated at the course level. This doesn't mean the cross-link is wrong -- parent-curriculum context genuinely helps users -- but these subject pages should NOT be treated as thin spokes of the course page. Recommend: give each subject page full primary-keyword ownership (title/H1/meta of its own), with the course cross-link framed as secondary ("part of our full GCSE coverage"), not the reverse.

### Other GCSE subjects -- Biology, Science, English (3 subjects)

- **GCSE Biology** (`gcse-biology`): own dedicated ecosystem (TutorHunt, TutorSpot, Growing Stars, The Degree Gap), distinct from both GCSE Science and the generic GCSE course. `hub-primary-course-secondary-link`.
- **GCSE Science** (`gcse-science`, combined/triple award): own dedicated ecosystem (TutorChase `/gcse/science`, TutorSpot, Hampstead & Frognal, Simply Science, That Science Tutor) -- confirmed as a genuinely separate product from GCSE Biology, not a duplicate. `hub-primary-course-secondary-link`.
- **GCSE English** (`gcse-english`): own dedicated ecosystem (TutorChase `/gcse/english`, AmazingTalker, Tutor Hunt, Sherpa, Keystone, Oxbridge GCSE Tutor), zero overlap with GCSE Science/Biology -- correctly cross-linked to the *dedicated* `gcse-english-017a23a5` course (not the shared GCSE course). `hub-primary-course-cross-link`.

### A-Level Further Maths (1 subject)

**A-Level Maths vs A-Level Further Maths** (`a-level-further-maths`): minor overlap only -- one boutique individual-tutor site (alevelmathsrevision.com / John Armstrong) explicitly serves both subjects on one page, but every major platform (TutorChase, MyTutor, Tutorful, PMT, Study Mind, GoStudent) maintains separate dedicated subpages. `hub-primary-cross-link-sibling` -- keep separate, cross-link to A-Level Maths.

### IB family (4 subjects)

**Page-type finding: CONFIRMED.** IB Physics/Chemistry lead with "IB examiner"/"IB teacher" credential framing; IB Math leads with AA/AI-HL/SL specialist framing.

| Subject | Action | Evidence |
|---|---|---|
| IB Math (`ib-math`) | hub-primary-standalone | Fully separate provider ecosystem (Learner, mathforib.com, IB Math Master, The IB Math Tutor) -- zero overlap with IB Physics/Chemistry. Strongest possible confirmation it deserves its own hub. |
| IB Physics (`ib-physics`) | hub-primary-cross-link-sibling | 5 domains shared with IB Chemistry (AmazingTalker, TutorsPlus, Enhanced Prep, Varsity Tutors, ibtutor.us), zero exact-URL overlap (every provider has a dedicated subpage). Recommend cross-linking as "IB Sciences" siblings. |
| IB Chemistry (`ib-chemistry`) | hub-primary-cross-link-sibling | Same evidence as IB Physics. |
| International Baccalaureate (IB) (`international-baccalaureate-ib`) | pillar-umbrella | Distinct broad-brand ecosystem (IB Wave, TopIBTutors, Lanterna, ++tutors) -- legitimate umbrella page linking down to IB Math/Physics/Chemistry. |

### SAT / ACT (3 subjects)

**Page-type finding: partially different from the Course-level "SAT tutor"/"ACT tutor" pattern.** At the section level (Math/English), the dominant providers are math-tutoring specialists (Learner, Wyzant, Mathnasium) and English/writing specialists (Preply, AJTutoring, PrepScholar, Schoolhouse) -- a genuinely different competitive set than the Kaplan/Princeton Review/Manhattan Review brands that dominate the generic SAT/ACT course pages.

- **SAT Math** (`sat-math`): well differentiated from SAT English (near-zero overlap, only Learner.com shared on distinct subpages). `hub-primary-new-cross-link` -- recommend adding a light cross-link to the SAT course (not currently linked) plus a sibling cross-link to ACT Math.
- **SAT English** (`sat-english`): same treatment. `hub-primary-new-cross-link`.
- **ACT Math** (`act-math`): 1 exact-URL match with SAT Math (`mathnasium.com/math-test-preparation` serves both queries verbatim) plus domain overlap on Learner.com/Wyzant. Real but partial overlap. `hub-primary-cross-link-sibling` -- cross-link to SAT Math as "standardized test math" siblings.

### Cambridge English (1 subject)

**Critical, distinct finding from every other exam family researched.** A bare `"Cambridge English tutor"` search returns *geographic* results (English tutors located in the city of Cambridge, MA/UK) with **zero** results about the actual Cambridge Assessment English exam suite (FCE/CAE/CPE/PET). Only a more specific query (`"Cambridge English exam tutor FCE CAE"`) surfaces the real competitors (Strommen Inc, Preply's dedicated Cambridge-ESOL-FCE-CAE-CPE listing, ExamEnglish.com).

**Action: `retarget-keyword`.** This is a naming/targeting fix, not a page-existence question -- the exam-prep SERP category clearly exists once the keyword is specific enough. Recommend retargeting the on-page title/H1/meta from "Cambridge English tutor" to something like "Cambridge English exam tutor (FCE/CAE/CPE)". Recommend a light cross-link to IELTS as a sibling English-proficiency-exam page (different exam bodies, but adjacent buyer intent -- overseas English certification).

---

## Part 2 -- The 25 subject-to-course cross-links (`lib/subject-course-links.ts`)

| Subject | Course | Verdict | Why |
|---|---|---|---|
| computer-science | computer-science-758eff7f | Keep as-is | Matches credentialed-marketplace pattern at both levels. |
| ielts | ielts-8d4686db | Keep as-is | Inherited from full course-level validation (CRITICAL mismatch already documented there). |
| spanish | spanish-2dd27e6e | Keep as-is | Consistent language-marketplace pattern. |
| javascript | javascript-ac5adb0a | Keep, retemplate | Practical-mentor-marketplace pattern (Codementor/W3Schools), not credentialed-bio. |
| french | french-520eb7f0 | Keep as-is | Consistent language-marketplace pattern. |
| scratch-programming | scratch-programming-for-kids-7fa6fba9 | Keep as-is | Fully distinct kids-coding-camp ecosystem, correctly matched. |
| **python-basics** | python-ff654450 | **Reconsider audience split** | Kids-coding-camp ecosystem (iD Tech, Tynker, CodeWizardsHQ) is completely different from general "Python tutor" results. Both `python-basics` and `python` map to the SAME course, yet target audience-distinct SERPs. Recommend the shared course page explicitly address both audiences, or have `python-basics` lean on its own kids-specific trust signals rather than relying on the shared course page. |
| python | python-ff654450 | Keep, retemplate | See python-basics. General-audience mentor-marketplace pattern. |
| hindi | hindi-language-course-459bc4ba | Keep as-is | Consistent language-marketplace pattern. |
| arabic | arabic-bee72fa4 | Keep as-is | Consistent pattern plus a real niche differentiator (Qur'an/Tajweed tutors). |
| c (C++) | c-95361960 | Keep, retemplate | Practical-mentor-marketplace pattern. |
| sql | sql-90d171c1 | Keep, retemplate | Practical-mentor-marketplace pattern. |
| **ai-basics** | ai-for-beginners-0939362a | **Flag keyword mismatch** | Zero tutor-marketplace results for "AI basics tutor for beginners" -- 100% blogs/tutorials. See Part 3. |
| java | java-48483b48 | Keep, retemplate | Practical-mentor-marketplace pattern. |
| html | html-css-fb9cd7a2 | Keep, retemplate | Weakest commercial-tutor SERP of any subject researched -- lean informational. |
| spoken-english | spoken-english-course-5dbc4867 | Keep as-is | Distinct conversational-practice ecosystem confirms correct match. |
| **gcse-biology** | gcse-preparation-course-97ec8c86 | **Reconsider consolidation** | Own dedicated ecosystem, distinct from generic GCSE course SERP -- deserves full primary-keyword ownership, not spoke treatment. |
| **gcse-maths** | gcse-preparation-course-97ec8c86 | **Reconsider consolidation** | Same as above. |
| **gcse-chemistry** | gcse-preparation-course-97ec8c86 | **Reconsider consolidation** | Same as above. |
| **gcse-physics** | gcse-preparation-course-97ec8c86 | **Reconsider consolidation** | Same as above. |
| **gcse-science** | gcse-preparation-course-97ec8c86 | **Reconsider consolidation** | Own ecosystem, distinct from GCSE Biology too -- confirmed separate product. |
| gcse-english | gcse-english-017a23a5 | Keep as-is | Dedicated 1:1 course match is correct (not the shared GCSE course). |
| **igcse-chemistry** | igcse-preparation-course-5ed7859f | **Reconsider consolidation** | Own dedicated ecosystem, deserves full primary-keyword ownership. |
| **igcse-maths** | igcse-preparation-course-5ed7859f | **Reconsider consolidation** | Zero domain overlap even with GCSE Maths -- fully independent. |
| **igcse-physics** | igcse-preparation-course-5ed7859f | **Reconsider consolidation** | Own dedicated ecosystem. |

**Summary: 12 of 25 pairs need no change. 13 pairs (all 9 GCSE/IGCSE subject-to-shared-course links, plus python-basics/python's shared-course audience split, plus ai-basics's keyword mismatch, plus the retemplate note affecting 6 programming pairs) are flagged for reconsideration** -- mostly not "unlink these" but "stop treating the subject page as a thin spoke of the course page; it has earned its own SERP standing."

---

## Part 3 -- General subjects (74 total; 28 directly validated, 46 pattern-applied)

Per the lighter-depth scope guidance, ~10-12 subjects were meant to be sampled across categories; 28 were actually searched directly (covering programming, languages, math, science, and the Singapore/UK-entrance subjects specifically, since those have real but different SERP dynamics than generic subjects) to give the pattern-application step a wider, safer base.

### Programming / Technology (10 subjects)

**Page-type finding: does NOT match the credentialed-exam-tutor pattern found everywhere else.** Narrow language-specific queries (Python, JavaScript, Java, C++, SQL, HTML) return a mix of free self-serve tutorial sites (W3Schools, docs.python.org, learnpython.org, TutorialsPoint, sqltutorial.org) and freelance-mentor marketplaces (Codementor, Preply, Superprof, Upwork) -- a "practical project mentor" template, not a "99th-percentile examiner with a score guarantee" trust template. The broader "Computer Science" query DOES match the credentialed-marketplace pattern (Wyzant, Princeton Review, Varsity Tutors, tutor.com) -- query breadth changes the competitive set within this one category.

- **Python vs Python Basics: CONFIRMED distinct SERP ecosystems** (adult/general Codementor/pythontutor.net vs kids-coding-camp iD Tech/Tynker/CodeWizardsHQ). The grade-band split IS SERP-justified -- but see the shared-course flag in Part 2.
- **Scratch Programming**: fully distinct kids-coding-camp ecosystem, zero overlap with adult languages.
- **HTML**: weakest commercial-intent SERP of any subject researched (almost entirely free tutorials).
- **AI Basics**: see below, "keyword targeting problem."

### AI Basics -- a keyword targeting problem, not a clustering problem

`"AI basics tutor for beginners"` returned **zero** tutor-marketplace results -- 100% blogs/tutorials (Guru99, JanbaskTraining, Medium, AIforDummies, AIbeginner.net). The broader `"AI tutor online"` surfaces AI SaaS products (Mindko, TutorOcean AI, ai-tutor.ai, YouLearn) rather than human-tutor marketplaces, with only one genuine comparable found: Wyzant's dedicated `Artificial_Intelligence_tutors.aspx` page. **There is currently almost no established "hire a human tutor for AI" SERP category to compete in.** Recommend retargeting the on-page keyword toward more specific, provable-demand phrasing ("machine learning tutor," "AI tutor for beginners") and treating this page's content strategy as higher-uncertainty than the rest of the catalog.

### Languages (5 subjects directly validated: Spanish, French, Hindi, Arabic, Spoken English)

**Confirmed consistent language-marketplace pattern**: Preply, italki, Wyzant, Superprof, AmazingTalker dominate all four written languages on dedicated per-language subpages (5 shared domains, 0 exact-URL overlap in every pairing) -- matches the domain-overlap-tiebreak pattern the Course-level doc used to justify keeping each language as its own primary target. Spoken English is a genuinely distinct conversational-practice cluster (Cambly, Loora, AmazingTalker `/speaking`). Arabic has a real content differentiator (Qur'an/Tajweed specialty tutors) worth its own FAQ section.

### General academic subjects (7 directly validated: Algebra I, Geometry, Calculus, Physics, Chemistry, Biology, Middle School Math)

**Confirmed a third distinct provider ecosystem**, separate from both the exam-specific providers (AP/GCSE/A-Level dedicated) and from each other: Tutor.com, Princeton Review, UPchieve, Wyzant, Superprof, Mathnasium, Varsity Tutors dominate general "homework help" tutoring, each subject on its own dedicated subpage (e.g. `tutor.com/subjects/physics` vs `/chemistry` vs `/biology` vs `/calculus` vs `/geometry`, zero exact-URL overlap). Middle School Math is clearly its own cluster, fully grade-specific, zero overlap with Algebra I/Geometry.

**Two flagged risks, pattern-inferred (not directly searched), worth calling out explicitly rather than silently assuming they're fine:**
- `algebra` (generic, curriculum=International, "All Levels") is a vague, ungraded duplicate of `algebra-i` / `algebra-ii` / `pre-algebra` / `advanced-algebra` -- the same anachronistic-generic-sibling pattern found for `ap-physics` and `ap-calculus`. Recommend either a differentiating content angle (an "Algebra I vs II vs Pre-Algebra: which do I need?" chooser) or auditing whether this entry is redundant.
- `science` (generic, curriculum=International, "All Levels") is a similarly vague duplicate of `general-science` (American, Grades 6-8) and `gcse-science`.

**Medium-confidence, flagged for follow-up (not directly searched):** the American-curriculum "Basics" cluster -- `physics-basics`, `chemistry-basics`, `biology-basics`, `general-mathematics`, `pre-algebra`, `geometry-basics`, `general-science` (all Grades 6-8) -- was only spot-checked via Middle School Math, not pairwise against each other. Given how consistently every other family in this research showed provider-level dedicated-subpage differentiation, the pattern likely extends, but this is a genuine research gap, not a confirmed finding.

### Singapore curriculum (2 directly validated: PSLE Maths, O-Level Chemistry)

**Confirmed fully distinct, geography-specific ecosystem** (SmileTutor, ClubMath.sg, Mavis Tutorial Centre, NickleBee Tutors, TheChemistryPractice.sg, ZenithEducationStudio, MyEngineeringBuddy citing the actual "5070" syllabus code) -- zero overlap with any UK/US brand seen elsewhere in this research. Singapore subjects should carry Singapore-specific trust signals (MOE curriculum alignment, AL1/PSLE-band language) that would look out of place on any other subject page. Pattern-applied to the remaining 3 Singapore subjects (`o-level-physics`, `o-level-maths`, `psle-science`) with high confidence given how strong and consistent this signal was.

### UK Entrance / Umbrella curricula (3 directly validated: 11+ Maths, British Curriculum, American Curriculum)

11+ Maths returns a UK-grammar-school-entrance-specific ecosystem (11plustutoring.uk, Varsity Tutors eleven-plus-maths, Owl Tutors, Keystone) with partial platform overlap against the GCSE family (Keystone, GoStudent are general UK multi-level brands) but always on dedicated subpages. British Curriculum and American Curriculum surface **yet another** distinct ecosystem of boutique expat-tutoring platforms (Private Tutors & Co, British Primary Tutor, Principal Tutors for British; A Plus Home Tutors, Tutero, APLUS America for American) targeting overseas/expat families -- zero overlap between the two, and zero overlap with GCSE/AP-specific pages. Confirms both umbrella subjects are legitimate standalone products, not redundant with curriculum-specific pages. `11-english` pattern-applied from `11-maths` with high confidence.

### The English-skills cluster -- the single largest unresolved area (14 subjects)

`English`, `Academic English`, `Academic Writing`, `Essay Writing`, `Creative Writing`, `Grammar`, `Vocabulary`, `Reading Comprehension`, `Literature`, `Spoken English`, `GCSE English`, `SAT English`, `Cambridge English`, `IELTS` all touch "English" as a broad domain. Only **Essay Writing** and **Spoken English** were directly validated this session, and both show legitimate dedicated-subpage differentiation (Essay Writing: Tutor.com/HeyTutor/Princeton Review/Wyzant's own `/essay-writing` subpages; Spoken English: the conversational-practice ecosystem). The remaining 8 general-English subjects were **not** individually searched. Given this is the largest same-domain cluster in the entire catalog, **this is the highest-priority candidate for a dedicated Step 3b full-depth follow-up pass** before content is finalized -- the validated members suggest the differentiation pattern likely holds, but with 8 unverified members (including near-synonym-sounding pairs like Grammar vs Vocabulary vs generic English), this should not be assumed without verification.

### Humanities, Business, and remaining pattern-applied subjects

`history`, `geography`, `civics` pattern-applied from the general-homework-help ecosystem confirmed for Algebra/Physics/Chemistry/Biology (medium confidence -- these subjects were not directly searched but follow the same "every subject gets a dedicated subpage on the same handful of major platforms" pattern seen consistently throughout this research). `finance-basics`, `economics`, `accounting`, `business-studies` pattern-applied from the Computer Science credentialed-marketplace precedent (medium confidence). `web-development`, `coding-for-kids` pattern-applied from Python/JavaScript (medium confidence). `organic-chemistry`, `environmental-science`, `astronomy`, `genetics`, `human-anatomy` pattern-applied from Physics/Chemistry/Biology (medium confidence). `ielts` inherits its full validation from the Course-level doc.

---

## Confidence summary on the exam-driven page-type finding

**High confidence** that the Course-level page-type mismatch finding (Google rewards credentialed-tutor-bio pages, not thin listings, for exam-prep terms) extends to the subject level **as a curriculum-family-wide pattern**, confirmed independently for AP, GCSE, IGCSE, A-Level, and IB (29 of 29 exam-driven subjects directly searched, all consistent within their family -- no family showed an exception). SAT/ACT show a partial variant: the finding holds (credentialed pages beat thin listings) but the *specific* provider brands differ from the parent course page (subject-specialist brands, not general test-prep brands). **The finding does NOT extend** to the programming-language subjects, which instead show a self-serve-tutorial + freelance-mentor-marketplace pattern, or to AI Basics, which has no established tutor-marketplace category yet at all.
