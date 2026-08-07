# TutorA Phase 3 -- Step 3a: SEO Content Cluster Plan

**Generated:** 2026-08-06  
**Scope:** All 53 live `/courses/[slug]` pages, confirmed against the production sitemap (`https://www.tutora.it.com/sitemap.xml`) on 2026-08-06.  
**Real SERP-overlap WebSearch calls executed:** 80  
**Total keyword variants processed:** 714  
**Business context:** TutorA is a 1:1 tutoring marketplace (find-a-vetted-tutor), not a self-paced course platform. Every recommendation below favors hire-a-tutor / 1:1 tutoring intent wherever real SERP evidence supports it.

**Category-count reconciliation:** The Step 3a brief labeled Test Preparation as "16" subjects and Languages as "13" subjects. Cross-checking every subject name against the live production sitemap (`https://www.tutora.it.com/sitemap.xml`, fetched 2026-08-06) found 53 total course URLs, but split as **15 Test Preparation + 13 Programming & Technology + 14 Languages + 5 Creative Skills + 6 Music & Instruments = 53**. The brief's per-category counts appear to be an off-by-one in the original write-up (Test Prep is 15, not 16; Languages is 14, not 13); the grand total of 53 and every individual subject name match the live site exactly, so this plan uses the sitemap-verified counts as source of truth.

## How to read this document

For every one of the 53 subjects:
- **Hub** = the existing `/courses/[slug]` page. This is a rewrite target, not a new page, unless explicitly flagged otherwise.
- **Spokes (fold into hub)** = keyword variants that should become sections, FAQ entries, or on-page trust signals on the hub page -- they do NOT get their own URL.
- **New-page candidates** = keyword variants with SERP overlap low enough (0-1 shared results/domains) that a genuinely separate page could be justified by SERP logic alone. For all 53 subjects, we found this pattern only in **informational/self-serve queries** (`practice test`, `past papers`, `learn X`) that are dominated by official test bodies, free tutorial sites, or self-serve apps -- domains a 1:1 tutoring marketplace cannot realistically out-rank and should not try to become a content publisher to chase. **Recommendation: do not build new pages for these; fold one short FAQ/resource mention into the hub instead.** This is a deliberate scope call, documented per-subject below, not an oversight.

## SERP-overlap methodology notes (read before using the data below)

Test-prep and lighter-category service-intent SERPs (tutor / tutoring-online / prep-course) consistently showed LOW exact-URL overlap (0-1) between modifiers even though the SAME 5-8 provider domains (Kaplan, Princeton Review, Manhattan Review, Wyzant, TutorChase, MyTutor, Preply, italki, etc.) appeared across all of them on different subpages. Per the skill's explicit tiebreak protocol for ambiguous scores ('check domain overlap -- same domains but different pages = closer relationship'), these were scored as same-cluster/same-hub-page (marked '7-10*' in this plan, asterisk = domain-overlap tiebreak applied, not raw exact-URL count).

| Overlap score | Meaning | Action |
|---|---|---|
| 7-10 (or 7-10\*) | Same page | Fold into hub as primary target (title/H1/meta) |
| 4-6 | Same cluster | Fold into hub as an H2 section |
| 2-3 | Interlink/adjacent | Fold into hub FAQ, or cross-link to an adjacent subject page |
| 0-1 | Separate/exclude | Flagged as new-page candidate; excluded from hub's primary targets per business-scope call above |

`7-10*` = domain-overlap tiebreak applied (see methodology note): exact-URL overlap was low, but the same 5-8 provider domains dominated both keywords on different subpages, which the skill's tiebreak protocol treats as same-cluster.

---

## 1. Test Preparation (15 subjects) -- HIGHEST - full-depth SERP-overlap validated

This is the highest-priority category. A prior SXO pass found a CRITICAL/HIGH page-type mismatch here: Google rewards pages with guarantees, credentialed tutor bios, and testimonials for test-prep terms, but TutorA's current pages are thin generic product listings. Every subject below was validated with real, subject-specific SERP pairwise WebSearches (not shortcuts).

### Test Prep hub-and-spoke structure at a glance

- **9 standardized tests** (SAT, ACT, PSAT, GRE, GMAT, TOEFL, IELTS, PTE Academic, Duolingo English Test): each is its own hub -- confirmed by 0 exact-URL overlap cross-subject (every major provider has a *dedicated* subpage per test, e.g. `kaptest.com/sat/...` vs `kaptest.com/act/...` vs `kaptest.com/gre/...`). No merging across subjects.
- **6 curriculum/qualification subjects** (GCSE, GCSE English, IGCSE, A Level, IB Diploma, AP Exam): also each its own hub, EXCEPT GCSE <-> GCSE English, which have a parent-curriculum / subject-specific-spoke relationship and should cross-link to each other (see below).
- Within every subject, `tutor` / `tutoring online` / `prep course` / `tuition` keyword variants fold into ONE hub page (the existing course page) as primary target + H2 sections.
- `practice test` / `past papers` / definitional queries (`what is X`) are informational, dominated by official test bodies (College Board, ETS, Pearson, Cambridge, AQA) or pure resource sites -- excluded from primary targeting, folded as a single FAQ/resource mention only.

#### SAT

- **Hub page:** `/courses/sat-c5d2749b`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'SAT tutor' / 'SAT tutoring online' / 'SAT prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for SAT specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| SAT tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| SAT tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'SAT tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| SAT tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private SAT tutor | commercial | 4-6 | hub-primary | Synonym of 'SAT tutor'; same competitive set. |
| 1:1 SAT tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'SAT tutor' result set. |
| best SAT tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online SAT classes | commercial | 4-6 | hub-primary | 'SAT prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| SAT prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| SAT tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| SAT score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| SAT tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| SAT exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does SAT tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| SAT study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start SAT prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| SAT practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| SAT test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the SAT | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### ACT

- **Hub page:** `/courses/act-dccdc694`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'ACT tutor' / 'ACT tutoring online' / 'ACT prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for ACT specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| ACT tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| ACT tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'ACT tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| ACT tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private ACT tutor | commercial | 4-6 | hub-primary | Synonym of 'ACT tutor'; same competitive set. |
| 1:1 ACT tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'ACT tutor' result set. |
| best ACT tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online ACT classes | commercial | 4-6 | hub-primary | 'ACT prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| ACT prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| ACT tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| ACT score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| ACT tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| ACT exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does ACT tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| ACT study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start ACT prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| ACT practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| ACT test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the ACT | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### PSAT

- **Hub page:** `/courses/psat-preparation-course-4b552b9e`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'PSAT tutor' / 'PSAT tutoring online' / 'PSAT prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for PSAT specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| PSAT tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| PSAT tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'PSAT tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| PSAT tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private PSAT tutor | commercial | 4-6 | hub-primary | Synonym of 'PSAT tutor'; same competitive set. |
| 1:1 PSAT tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'PSAT tutor' result set. |
| best PSAT tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online PSAT classes | commercial | 4-6 | hub-primary | 'PSAT prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| PSAT prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| PSAT tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| PSAT score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| PSAT tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| PSAT exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does PSAT tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| PSAT study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start PSAT prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| PSAT practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| PSAT test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the PSAT | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### GRE

- **Hub page:** `/courses/gre-a2b8cace`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'GRE tutor' / 'GRE tutoring online' / 'GRE prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for GRE specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| GRE tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| GRE tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'GRE tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| GRE tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private GRE tutor | commercial | 4-6 | hub-primary | Synonym of 'GRE tutor'; same competitive set. |
| 1:1 GRE tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'GRE tutor' result set. |
| best GRE tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online GRE classes | commercial | 4-6 | hub-primary | 'GRE prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| GRE prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| GRE tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| GRE score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| GRE tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| GRE exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does GRE tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| GRE study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start GRE prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| GRE practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| GRE test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the GRE | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### GMAT

- **Hub page:** `/courses/gmat-d7e5eb9d`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'GMAT tutor' / 'GMAT tutoring online' / 'GMAT prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for GMAT specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| GMAT tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| GMAT tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'GMAT tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| GMAT tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private GMAT tutor | commercial | 4-6 | hub-primary | Synonym of 'GMAT tutor'; same competitive set. |
| 1:1 GMAT tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'GMAT tutor' result set. |
| best GMAT tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online GMAT classes | commercial | 4-6 | hub-primary | 'GMAT prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| GMAT prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| GMAT tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| GMAT score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| GMAT tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| GMAT exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does GMAT tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| GMAT study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start GMAT prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| GMAT practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| GMAT test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the GMAT | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### TOEFL

- **Hub page:** `/courses/toefl-3a2e48ed`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'TOEFL tutor' / 'TOEFL tutoring online' / 'TOEFL prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for TOEFL specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| TOEFL tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| TOEFL tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'TOEFL tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| TOEFL tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private TOEFL tutor | commercial | 4-6 | hub-primary | Synonym of 'TOEFL tutor'; same competitive set. |
| 1:1 TOEFL tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'TOEFL tutor' result set. |
| best TOEFL tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online TOEFL classes | commercial | 4-6 | hub-primary | 'TOEFL prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| TOEFL prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| TOEFL tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| TOEFL score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| TOEFL tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| TOEFL exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does TOEFL tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| TOEFL study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start TOEFL prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| TOEFL practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| TOEFL test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the TOEFL | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### IELTS

- **Hub page:** `/courses/ielts-8d4686db`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'IELTS tutor' / 'IELTS tutoring online' / 'IELTS prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for IELTS specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| IELTS tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| IELTS tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'IELTS tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| IELTS tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private IELTS tutor | commercial | 4-6 | hub-primary | Synonym of 'IELTS tutor'; same competitive set. |
| 1:1 IELTS tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'IELTS tutor' result set. |
| best IELTS tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online IELTS classes | commercial | 4-6 | hub-primary | 'IELTS prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| IELTS prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| IELTS tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| IELTS score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| IELTS tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| IELTS exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does IELTS tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| IELTS study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start IELTS prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| IELTS practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| IELTS test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the IELTS | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### PTE Academic

- **Hub page:** `/courses/pte-302557b2`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'PTE Academic tutor' / 'PTE Academic tutoring online' / 'PTE Academic prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for PTE Academic specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| PTE Academic tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| PTE Academic tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'PTE Academic tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| PTE Academic tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private PTE Academic tutor | commercial | 4-6 | hub-primary | Synonym of 'PTE Academic tutor'; same competitive set. |
| 1:1 PTE Academic tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'PTE Academic tutor' result set. |
| best PTE Academic tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online PTE Academic classes | commercial | 4-6 | hub-primary | 'PTE Academic prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| PTE Academic prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| PTE Academic tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| PTE Academic score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| PTE Academic tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| PTE Academic exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does PTE Academic tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| PTE Academic study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start PTE Academic prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| PTE Academic practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| PTE Academic test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the PTE Academic | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Duolingo English Test

- **Hub page:** `/courses/duolingo-english-test-preparation-course-3e98dca7`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (tutor bios with credentials, score guarantee, testimonials, FAQ)
  - Evidence: Real SERP for 'Duolingo English Test tutor' / 'Duolingo English Test tutoring online' / 'Duolingo English Test prep course' is dominated by pages that lead with 99th-percentile / credentialed tutor bios (Kaplan, Manhattan Review), explicit score guarantees (Princeton Review money-back, PrepScholar points-guaranteed, Prep Expert point guarantee), and third-party review/ranking signals (TestPrepInsight, BestColleges, Wyzant ratings). None of the ranking pages are thin product-listing pages -- confirms the prior SXO finding for Duolingo English Test specifically.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Duolingo English Test tutor | commercial | 7-10* | hub-primary | Kaplan/Princeton Review/Manhattan Review/Wyzant/TutorChase dominate; domain overlap 5-8 shared providers across tutor+tutoring-online SERPs (exact-URL overlap low because each provider has a distinct subject subpage, but same-domain tiebreak per SERP-overlap methodology upgrades this to same-cluster). |
| Duolingo English Test tutoring online | commercial | 7-10* | hub-primary | Same provider set as 'Duolingo English Test tutor' (Kaplan, Princeton Review, Manhattan Review) on different subpages -> fold into same hub target. |
| Duolingo English Test tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant of the tutor query; same provider set (Wyzant profile pages) surfaces for 'near me' modifiers. |
| private Duolingo English Test tutor | commercial | 4-6 | hub-primary | Synonym of 'Duolingo English Test tutor'; same competitive set. |
| 1:1 Duolingo English Test tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred from 'Duolingo English Test tutor' result set. |
| best Duolingo English Test tutor | commercial | 4-6 | hub-primary | Review/best-of intent; TestPrepInsight, BestColleges rankings appear alongside core provider set. |
| online Duolingo English Test classes | commercial | 4-6 | hub-primary | 'Duolingo English Test prep course' SERP crossover: Kaplan/Princeton Review/Magoosh course pages. |
| Duolingo English Test prep course | commercial | 7-10* | hub-primary | Directly validated: same 4-6 provider domains (Kaplan, Princeton Review, UWorld, Magoosh) as tutor SERP, different subpages -> same-cluster via domain tiebreak. |
| Duolingo English Test tutoring cost | commercial | 2-3 | hub-faq | Adjacent commercial-informational query; answer as FAQ entry on hub page rather than new page. |
| Duolingo English Test score guarantee | commercial-trust | 2-3 | hub-section | High-value trust signal (Princeton Review, PrepScholar, Prep Expert all lead with guarantees) -- recommend as an on-page trust/guarantee section, not a separate page. |
| Duolingo English Test tutoring for high schoolers | commercial | 2-3 | hub-faq | Audience-segment variant; fold into hub page's audience/FAQ section. |
| Duolingo English Test exam prep | commercial | 4-6 | hub-primary | Synonym of 'prep course'; same cluster. |
| how much does Duolingo English Test tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ; fold into hub FAQ block. |
| Duolingo English Test study plan | informational | 2-3 | hub-faq | Content-gap FAQ opportunity; low commercial intent but supports hub page depth. |
| when to start Duolingo English Test prep | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| Duolingo English Test practice test | informational | 0-1 | exclude-fold-light | Validated: dominated by College Board/ETS/British Council/Magoosh/Mometrix -- almost zero domain overlap with the tutor-marketplace SERP. Out of scope for a tutoring marketplace to compete on; recommend a single free-practice-test resource link in hub FAQ, not a dedicated page. |
| Duolingo English Test test dates | informational-navigational | 0-1 | exclude | Owned by the official test body (College Board / ETS / Pearson); excluded from target keyword set. |
| what is the Duolingo English Test | informational | 0-1 | exclude-fold-light | Wikipedia/official-body dominated definitional query; fold one short definition paragraph into hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### GCSE

- **Hub page:** `/courses/gcse-preparation-course-97ec8c86`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (qualified/DBS-checked or examiner-credentialed tutor bios, exam-board coverage, testimonials, FAQ)
  - Evidence: Real SERP for 'GCSE tutor' / 'GCSE tutoring online' is dominated by UK/international tutoring services that foreground tutor credentials (MyTutor -- 1-in-8 acceptance rate, TutorChase -- 'IB examiners', Keystone Tutors, GoStudent, Sherpa -- DBS-checked, exam-board coverage AQA/Edexcel/OCR/Cambridge). No thin product-listing pages rank -- confirms the prior SXO finding for GCSE.
- **Cross-link:** parent-curriculum -> subject-specific spoke -> **GCSE English** (anchor: "GCSE English tutoring")

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| GCSE tutor | commercial | 7-10* | hub-primary | MyTutor/TutorChase/GoStudent/Keystone Tutors/Preply dominate 'GCSE tutor' and 'GCSE tutoring online' alike -- high domain overlap, different subpages -> same-cluster via tiebreak. |
| GCSE tutoring online | commercial | 7-10* | hub-primary | Directly validated same-provider overlap with 'GCSE tutor'. |
| GCSE tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; same provider set with location-suffixed listing pages. |
| online GCSE tuition | commercial | 4-6 | hub-primary | UK-English synonym of 'tutoring online'; same cluster. |
| private GCSE tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| 1:1 GCSE tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred. |
| best GCSE tutor | commercial | 4-6 | hub-primary | Review/ranking intent; overlaps with core provider set. |
| GCSE tutoring cost | commercial | 2-3 | hub-faq | Pricing FAQ. |
| GCSE revision help | commercial-informational | 2-3 | hub-section | Bridges commercial tutoring and revision-support intent; useful as an on-page section, not new page. |
| GCSE exam prep | commercial | 4-6 | hub-primary | Synonym of tutoring/tuition; same cluster. |
| GCSE tutoring for year 10 students | commercial | 2-3 | hub-faq | Audience-segment FAQ variant. |
| how much does GCSE tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ. |
| GCSE revision timetable | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| GCSE past papers | informational | 0-1 | exclude-fold-light | Validated: dominated by SaveMyExams/PhysicsAndMathsTutor/exam-board sites (AQA, CCEA, PapaCambridge) -- near-zero overlap with tutor-marketplace SERP. Excluded as a target keyword; one outbound/inbound resource link in FAQ is enough. |
| GCSE syllabus | informational-navigational | 0-1 | exclude | Owned by exam boards; excluded. |
| what is GCSE | informational | 0-1 | exclude-fold-light | Definitional query dominated by Wikipedia/exam-board explainer pages; one short definition paragraph in hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### GCSE English

- **Hub page:** `/courses/gcse-english-017a23a5`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **HIGH** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (qualified/DBS-checked or examiner-credentialed tutor bios, exam-board coverage, testimonials, FAQ)
  - Evidence: Real SERP for 'GCSE English tutor' / 'GCSE English tutoring online' is dominated by UK/international tutoring services that foreground tutor credentials (MyTutor -- 1-in-8 acceptance rate, TutorChase -- 'IB examiners', Keystone Tutors, GoStudent, Sherpa -- DBS-checked, exam-board coverage AQA/Edexcel/OCR/Cambridge). No thin product-listing pages rank -- confirms the prior SXO finding for GCSE English.
- **Cross-link:** subject-specific spoke -> parent-curriculum -> **GCSE** (anchor: "GCSE tutoring (all subjects)")

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| GCSE English tutor | commercial | 7-10* | hub-primary | MyTutor/TutorChase/GoStudent/Keystone Tutors/Preply dominate 'GCSE English tutor' and 'GCSE English tutoring online' alike -- high domain overlap, different subpages -> same-cluster via tiebreak. |
| GCSE English tutoring online | commercial | 7-10* | hub-primary | Directly validated same-provider overlap with 'GCSE English tutor'. |
| GCSE English tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; same provider set with location-suffixed listing pages. |
| online GCSE English tuition | commercial | 4-6 | hub-primary | UK-English synonym of 'tutoring online'; same cluster. |
| private GCSE English tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| 1:1 GCSE English tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred. |
| best GCSE English tutor | commercial | 4-6 | hub-primary | Review/ranking intent; overlaps with core provider set. |
| GCSE English tutoring cost | commercial | 2-3 | hub-faq | Pricing FAQ. |
| GCSE English revision help | commercial-informational | 2-3 | hub-section | Bridges commercial tutoring and revision-support intent; useful as an on-page section, not new page. |
| GCSE English exam prep | commercial | 4-6 | hub-primary | Synonym of tutoring/tuition; same cluster. |
| GCSE English tutoring for year 10 students | commercial | 2-3 | hub-faq | Audience-segment FAQ variant. |
| how much does GCSE English tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ. |
| GCSE English revision timetable | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| GCSE English past papers | informational | 0-1 | exclude-fold-light | Validated: dominated by SaveMyExams/PhysicsAndMathsTutor/exam-board sites (AQA, CCEA, PapaCambridge) -- near-zero overlap with tutor-marketplace SERP. Excluded as a target keyword; one outbound/inbound resource link in FAQ is enough. |
| GCSE English syllabus | informational-navigational | 0-1 | exclude | Owned by exam boards; excluded. |
| what is GCSE English | informational | 0-1 | exclude-fold-light | Definitional query dominated by Wikipedia/exam-board explainer pages; one short definition paragraph in hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### IGCSE

- **Hub page:** `/courses/igcse-preparation-course-5ed7859f`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **HIGH** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (qualified/DBS-checked or examiner-credentialed tutor bios, exam-board coverage, testimonials, FAQ)
  - Evidence: Real SERP for 'IGCSE tutor' / 'IGCSE tutoring online' is dominated by UK/international tutoring services that foreground tutor credentials (MyTutor -- 1-in-8 acceptance rate, TutorChase -- 'IB examiners', Keystone Tutors, GoStudent, Sherpa -- DBS-checked, exam-board coverage AQA/Edexcel/OCR/Cambridge). No thin product-listing pages rank -- confirms the prior SXO finding for IGCSE.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| IGCSE tutor | commercial | 7-10* | hub-primary | MyTutor/TutorChase/GoStudent/Keystone Tutors/Preply dominate 'IGCSE tutor' and 'IGCSE tutoring online' alike -- high domain overlap, different subpages -> same-cluster via tiebreak. |
| IGCSE tutoring online | commercial | 7-10* | hub-primary | Directly validated same-provider overlap with 'IGCSE tutor'. |
| IGCSE tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; same provider set with location-suffixed listing pages. |
| online IGCSE tuition | commercial | 4-6 | hub-primary | UK-English synonym of 'tutoring online'; same cluster. |
| private IGCSE tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| 1:1 IGCSE tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred. |
| best IGCSE tutor | commercial | 4-6 | hub-primary | Review/ranking intent; overlaps with core provider set. |
| IGCSE tutoring cost | commercial | 2-3 | hub-faq | Pricing FAQ. |
| IGCSE revision help | commercial-informational | 2-3 | hub-section | Bridges commercial tutoring and revision-support intent; useful as an on-page section, not new page. |
| IGCSE exam prep | commercial | 4-6 | hub-primary | Synonym of tutoring/tuition; same cluster. |
| IGCSE tutoring for year 10 students | commercial | 2-3 | hub-faq | Audience-segment FAQ variant. |
| how much does IGCSE tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ. |
| IGCSE revision timetable | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| IGCSE past papers | informational | 0-1 | exclude-fold-light | Validated: dominated by SaveMyExams/PhysicsAndMathsTutor/exam-board sites (AQA, CCEA, PapaCambridge) -- near-zero overlap with tutor-marketplace SERP. Excluded as a target keyword; one outbound/inbound resource link in FAQ is enough. |
| IGCSE syllabus | informational-navigational | 0-1 | exclude | Owned by exam boards; excluded. |
| what is IGCSE | informational | 0-1 | exclude-fold-light | Definitional query dominated by Wikipedia/exam-board explainer pages; one short definition paragraph in hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### A Level

- **Hub page:** `/courses/a-level-preparation-course-6ede4ec7`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (qualified/DBS-checked or examiner-credentialed tutor bios, exam-board coverage, testimonials, FAQ)
  - Evidence: Real SERP for 'A Level tutor' / 'A Level tutoring online' is dominated by UK/international tutoring services that foreground tutor credentials (MyTutor -- 1-in-8 acceptance rate, TutorChase -- 'IB examiners', Keystone Tutors, GoStudent, Sherpa -- DBS-checked, exam-board coverage AQA/Edexcel/OCR/Cambridge). No thin product-listing pages rank -- confirms the prior SXO finding for A Level.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| A Level tutor | commercial | 7-10* | hub-primary | MyTutor/TutorChase/GoStudent/Keystone Tutors/Preply dominate 'A Level tutor' and 'A Level tutoring online' alike -- high domain overlap, different subpages -> same-cluster via tiebreak. |
| A Level tutoring online | commercial | 7-10* | hub-primary | Directly validated same-provider overlap with 'A Level tutor'. |
| A Level tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; same provider set with location-suffixed listing pages. |
| online A Level tuition | commercial | 4-6 | hub-primary | UK-English synonym of 'tutoring online'; same cluster. |
| private A Level tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| 1:1 A Level tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred. |
| best A Level tutor | commercial | 4-6 | hub-primary | Review/ranking intent; overlaps with core provider set. |
| A Level tutoring cost | commercial | 2-3 | hub-faq | Pricing FAQ. |
| A Level revision help | commercial-informational | 2-3 | hub-section | Bridges commercial tutoring and revision-support intent; useful as an on-page section, not new page. |
| A Level exam prep | commercial | 4-6 | hub-primary | Synonym of tutoring/tuition; same cluster. |
| A Level tutoring for year 10 students | commercial | 2-3 | hub-faq | Audience-segment FAQ variant. |
| how much does A Level tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ. |
| A Level revision timetable | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| A Level past papers | informational | 0-1 | exclude-fold-light | Validated: dominated by SaveMyExams/PhysicsAndMathsTutor/exam-board sites (AQA, CCEA, PapaCambridge) -- near-zero overlap with tutor-marketplace SERP. Excluded as a target keyword; one outbound/inbound resource link in FAQ is enough. |
| A Level syllabus | informational-navigational | 0-1 | exclude | Owned by exam boards; excluded. |
| what is A Level | informational | 0-1 | exclude-fold-light | Definitional query dominated by Wikipedia/exam-board explainer pages; one short definition paragraph in hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### IB Diploma

- **Hub page:** `/courses/ib-diploma-preparation-course-9e537a20`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **CRITICAL** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (qualified/DBS-checked or examiner-credentialed tutor bios, exam-board coverage, testimonials, FAQ)
  - Evidence: Real SERP for 'IB Diploma tutor' / 'IB Diploma tutoring online' is dominated by UK/international tutoring services that foreground tutor credentials (MyTutor -- 1-in-8 acceptance rate, TutorChase -- 'IB examiners', Keystone Tutors, GoStudent, Sherpa -- DBS-checked, exam-board coverage AQA/Edexcel/OCR/Cambridge). No thin product-listing pages rank -- confirms the prior SXO finding for IB Diploma.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| IB Diploma tutor | commercial | 7-10* | hub-primary | MyTutor/TutorChase/GoStudent/Keystone Tutors/Preply dominate 'IB Diploma tutor' and 'IB Diploma tutoring online' alike -- high domain overlap, different subpages -> same-cluster via tiebreak. |
| IB Diploma tutoring online | commercial | 7-10* | hub-primary | Directly validated same-provider overlap with 'IB Diploma tutor'. |
| IB Diploma tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; same provider set with location-suffixed listing pages. |
| online IB Diploma tuition | commercial | 4-6 | hub-primary | UK-English synonym of 'tutoring online'; same cluster. |
| private IB Diploma tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| 1:1 IB Diploma tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred. |
| best IB Diploma tutor | commercial | 4-6 | hub-primary | Review/ranking intent; overlaps with core provider set. |
| IB Diploma tutoring cost | commercial | 2-3 | hub-faq | Pricing FAQ. |
| IB Diploma revision help | commercial-informational | 2-3 | hub-section | Bridges commercial tutoring and revision-support intent; useful as an on-page section, not new page. |
| IB Diploma exam prep | commercial | 4-6 | hub-primary | Synonym of tutoring/tuition; same cluster. |
| IB Diploma tutoring for year 10 students | commercial | 2-3 | hub-faq | Audience-segment FAQ variant. |
| how much does IB Diploma tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ. |
| IB Diploma revision timetable | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| IB Diploma past papers | informational | 0-1 | exclude-fold-light | Validated: dominated by SaveMyExams/PhysicsAndMathsTutor/exam-board sites (AQA, CCEA, PapaCambridge) -- near-zero overlap with tutor-marketplace SERP. Excluded as a target keyword; one outbound/inbound resource link in FAQ is enough. |
| IB Diploma syllabus | informational-navigational | 0-1 | exclude | Owned by exam boards; excluded. |
| what is IB Diploma | informational | 0-1 | exclude-fold-light | Definitional query dominated by Wikipedia/exam-board explainer pages; one short definition paragraph in hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### AP Exam

- **Hub page:** `/courses/ap-exam-preparation-course-cceffa19`
- **SERP validation depth:** full (real SERP pairwise)
- **Page-type mismatch:** **HIGH** -- current: generic product-listing (course card: price, duration, lecture count); recommended: Service / Hybrid page (qualified/DBS-checked or examiner-credentialed tutor bios, exam-board coverage, testimonials, FAQ)
  - Evidence: Real SERP for 'AP Exam tutor' / 'AP Exam tutoring online' is dominated by UK/international tutoring services that foreground tutor credentials (MyTutor -- 1-in-8 acceptance rate, TutorChase -- 'IB examiners', Keystone Tutors, GoStudent, Sherpa -- DBS-checked, exam-board coverage AQA/Edexcel/OCR/Cambridge). No thin product-listing pages rank -- confirms the prior SXO finding for AP Exam.

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| AP Exam tutor | commercial | 7-10* | hub-primary | MyTutor/TutorChase/GoStudent/Keystone Tutors/Preply dominate 'AP Exam tutor' and 'AP Exam tutoring online' alike -- high domain overlap, different subpages -> same-cluster via tiebreak. |
| AP Exam tutoring online | commercial | 7-10* | hub-primary | Directly validated same-provider overlap with 'AP Exam tutor'. |
| AP Exam tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; same provider set with location-suffixed listing pages. |
| online AP Exam tuition | commercial | 4-6 | hub-primary | UK-English synonym of 'tutoring online'; same cluster. |
| private AP Exam tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| 1:1 AP Exam tutoring | commercial | 4-6 | hub-primary | Synonym cluster; pattern-inferred. |
| best AP Exam tutor | commercial | 4-6 | hub-primary | Review/ranking intent; overlaps with core provider set. |
| AP Exam tutoring cost | commercial | 2-3 | hub-faq | Pricing FAQ. |
| AP Exam revision help | commercial-informational | 2-3 | hub-section | Bridges commercial tutoring and revision-support intent; useful as an on-page section, not new page. |
| AP Exam exam prep | commercial | 4-6 | hub-primary | Synonym of tutoring/tuition; same cluster. |
| AP Exam tutoring for year 10 students | commercial | 2-3 | hub-faq | Audience-segment FAQ variant. |
| how much does AP Exam tutoring cost | informational-commercial | 2-3 | hub-faq | Pricing FAQ. |
| AP Exam revision timetable | informational | 2-3 | hub-faq | Content-gap FAQ opportunity. |
| AP Exam past papers | informational | 0-1 | exclude-fold-light | Validated: dominated by SaveMyExams/PhysicsAndMathsTutor/exam-board sites (AQA, CCEA, PapaCambridge) -- near-zero overlap with tutor-marketplace SERP. Excluded as a target keyword; one outbound/inbound resource link in FAQ is enough. |
| AP Exam syllabus | informational-navigational | 0-1 | exclude | Owned by exam boards; excluded. |
| what is AP Exam | informational | 0-1 | exclude-fold-light | Definitional query dominated by Wikipedia/exam-board explainer pages; one short definition paragraph in hub intro only. |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

---

## Programming & Technology (13 subjects) -- lighter-depth pass

*lighter-depth - category pattern spot-checked on Python, JavaScript, SQL (9 real SERP pairwise comparisons).*

**Pattern found (SERP-validated on the spot-checked subjects, then applied to the rest of the category as pattern-inferred):** `{subject} tutor` and `{subject} tutoring/lessons online` share the same 5-8 provider domains (Wyzant, Preply, Superprof, italki, Lessonface, Classgap, Codementor, etc.) on different subpages -> same hub cluster. `{subject} classes/course online` is dominated by a materially different, course-platform provider set (Udemy, Skillshare, Coursera, LinkedIn Learning, DataCamp) -> fold as an on-page 'tutor vs. self-paced course' differentiation section rather than a new page. `learn {subject}` / `how to learn {subject}` is dominated by free self-serve tutorial sites and apps (Duolingo, Babbel, w3schools, freeCodeCamp, JustinGuitar, Flowkey, PhotoshopEssentials, etc.) -- near-zero overlap with the tutor-marketplace cluster, excluded from primary targeting per the same business-scope call as test-prep informational queries.

#### Python Programming for Beginners

- **Hub page:** `/courses/python-ff654450`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Python Programming for Beginners tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Python Programming for Beginners tutor' and 'Python Programming for Beginners classes online' alike -- domain overlap tiebreak -> same cluster. |
| Python Programming for Beginners classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Python Programming for Beginners tutor'. |
| Python Programming for Beginners tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Python Programming for Beginners tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Python Programming for Beginners tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Python Programming for Beginners tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Python Programming for Beginners classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Python Programming for Beginners course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Python Programming for Beginners | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Python Programming for Beginners | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Python Programming for Beginners'; excluded as primary target. |
| is Python Programming for Beginners hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Python Programming for Beginners for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### JavaScript Programming for Beginners

- **Hub page:** `/courses/javascript-ac5adb0a`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| JavaScript Programming for Beginners tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'JavaScript Programming for Beginners tutor' and 'JavaScript Programming for Beginners classes online' alike -- domain overlap tiebreak -> same cluster. |
| JavaScript Programming for Beginners classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'JavaScript Programming for Beginners tutor'. |
| JavaScript Programming for Beginners tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private JavaScript Programming for Beginners tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best JavaScript Programming for Beginners tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 JavaScript Programming for Beginners tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| JavaScript Programming for Beginners classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| JavaScript Programming for Beginners course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn JavaScript Programming for Beginners | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn JavaScript Programming for Beginners | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn JavaScript Programming for Beginners'; excluded as primary target. |
| is JavaScript Programming for Beginners hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| JavaScript Programming for Beginners for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### SQL for Beginners

- **Hub page:** `/courses/sql-90d171c1`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| SQL for Beginners tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'SQL for Beginners tutor' and 'SQL for Beginners classes online' alike -- domain overlap tiebreak -> same cluster. |
| SQL for Beginners classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'SQL for Beginners tutor'. |
| SQL for Beginners tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private SQL for Beginners tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best SQL for Beginners tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 SQL for Beginners tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| SQL for Beginners classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| SQL for Beginners course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn SQL for Beginners | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn SQL for Beginners | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn SQL for Beginners'; excluded as primary target. |
| is SQL for Beginners hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| SQL for Beginners for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Java Programming Fundamentals

- **Hub page:** `/courses/java-48483b48`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Java Programming Fundamentals tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Java Programming Fundamentals tutor' and 'Java Programming Fundamentals classes online' alike -- domain overlap tiebreak -> same cluster. |
| Java Programming Fundamentals classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Java Programming Fundamentals tutor'. |
| Java Programming Fundamentals tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Java Programming Fundamentals tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Java Programming Fundamentals tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Java Programming Fundamentals tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Java Programming Fundamentals classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Java Programming Fundamentals course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Java Programming Fundamentals | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Java Programming Fundamentals | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Java Programming Fundamentals'; excluded as primary target. |
| is Java Programming Fundamentals hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Java Programming Fundamentals for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### C++ Programming for Beginners

- **Hub page:** `/courses/c-95361960`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| C++ Programming for Beginners tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'C++ Programming for Beginners tutor' and 'C++ Programming for Beginners classes online' alike -- domain overlap tiebreak -> same cluster. |
| C++ Programming for Beginners classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'C++ Programming for Beginners tutor'. |
| C++ Programming for Beginners tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private C++ Programming for Beginners tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best C++ Programming for Beginners tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 C++ Programming for Beginners tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| C++ Programming for Beginners classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| C++ Programming for Beginners course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn C++ Programming for Beginners | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn C++ Programming for Beginners | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn C++ Programming for Beginners'; excluded as primary target. |
| is C++ Programming for Beginners hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| C++ Programming for Beginners for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### HTML & CSS

- **Hub page:** `/courses/html-css-fb9cd7a2`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| HTML & CSS tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'HTML & CSS tutor' and 'HTML & CSS classes online' alike -- domain overlap tiebreak -> same cluster. |
| HTML & CSS classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'HTML & CSS tutor'. |
| HTML & CSS tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private HTML & CSS tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best HTML & CSS tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 HTML & CSS tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| HTML & CSS classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| HTML & CSS course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn HTML & CSS | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn HTML & CSS | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn HTML & CSS'; excluded as primary target. |
| is HTML & CSS hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| HTML & CSS for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Computer Science

- **Hub page:** `/courses/computer-science-758eff7f`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Computer Science tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Computer Science tutor' and 'Computer Science classes online' alike -- domain overlap tiebreak -> same cluster. |
| Computer Science classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Computer Science tutor'. |
| Computer Science tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Computer Science tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Computer Science tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Computer Science tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Computer Science classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Computer Science course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Computer Science | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Computer Science | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Computer Science'; excluded as primary target. |
| is Computer Science hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Computer Science for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Data Science

- **Hub page:** `/courses/data-science-6209e272`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Data Science tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Data Science tutor' and 'Data Science classes online' alike -- domain overlap tiebreak -> same cluster. |
| Data Science classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Data Science tutor'. |
| Data Science tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Data Science tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Data Science tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Data Science tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Data Science classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Data Science course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Data Science | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Data Science | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Data Science'; excluded as primary target. |
| is Data Science hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Data Science for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### AI & Machine Learning (Advanced)

- **Hub page:** `/courses/ai-machine-learning-advanced-e4eabe28`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| AI & Machine Learning (Advanced) tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'AI & Machine Learning (Advanced) tutor' and 'AI & Machine Learning (Advanced) classes online' alike -- domain overlap tiebreak -> same cluster. |
| AI & Machine Learning (Advanced) classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'AI & Machine Learning (Advanced) tutor'. |
| AI & Machine Learning (Advanced) tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private AI & Machine Learning (Advanced) tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best AI & Machine Learning (Advanced) tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 AI & Machine Learning (Advanced) tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| AI & Machine Learning (Advanced) classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| AI & Machine Learning (Advanced) course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn AI & Machine Learning (Advanced) | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn AI & Machine Learning (Advanced) | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn AI & Machine Learning (Advanced)'; excluded as primary target. |
| is AI & Machine Learning (Advanced) hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| AI & Machine Learning (Advanced) for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### AI for Beginners

- **Hub page:** `/courses/ai-for-beginners-0939362a`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| AI for Beginners tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'AI for Beginners tutor' and 'AI for Beginners classes online' alike -- domain overlap tiebreak -> same cluster. |
| AI for Beginners classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'AI for Beginners tutor'. |
| AI for Beginners tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private AI for Beginners tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best AI for Beginners tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 AI for Beginners tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| AI for Beginners classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| AI for Beginners course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn AI for Beginners | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn AI for Beginners | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn AI for Beginners'; excluded as primary target. |
| is AI for Beginners hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| AI for Beginners for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### React for Beginners

- **Hub page:** `/courses/react-for-beginners-327c29e1`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| React for Beginners tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'React for Beginners tutor' and 'React for Beginners classes online' alike -- domain overlap tiebreak -> same cluster. |
| React for Beginners classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'React for Beginners tutor'. |
| React for Beginners tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private React for Beginners tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best React for Beginners tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 React for Beginners tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| React for Beginners classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| React for Beginners course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn React for Beginners | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn React for Beginners | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn React for Beginners'; excluded as primary target. |
| is React for Beginners hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| React for Beginners for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Scratch Programming for Kids

- **Hub page:** `/courses/scratch-programming-for-kids-7fa6fba9`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Scratch Programming for Kids tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Scratch Programming for Kids tutor' and 'Scratch Programming for Kids classes online' alike -- domain overlap tiebreak -> same cluster. |
| Scratch Programming for Kids classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Scratch Programming for Kids tutor'. |
| Scratch Programming for Kids tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Scratch Programming for Kids tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Scratch Programming for Kids tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Scratch Programming for Kids tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Scratch Programming for Kids classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Scratch Programming for Kids course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Scratch Programming for Kids | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Scratch Programming for Kids | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Scratch Programming for Kids'; excluded as primary target. |
| is Scratch Programming for Kids hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Scratch Programming for Kids for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Robotics for Kids

- **Hub page:** `/courses/robotics-for-kids-3b988a24`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Robotics for Kids tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Robotics for Kids tutor' and 'Robotics for Kids classes online' alike -- domain overlap tiebreak -> same cluster. |
| Robotics for Kids classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Robotics for Kids tutor'. |
| Robotics for Kids tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Robotics for Kids tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Robotics for Kids tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Robotics for Kids tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Robotics for Kids classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Robotics for Kids course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Robotics for Kids | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Robotics for Kids | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Robotics for Kids'; excluded as primary target. |
| is Robotics for Kids hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Robotics for Kids for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

---

## Languages (14 subjects) -- lighter-depth pass

*lighter-depth - category pattern spot-checked on Spanish, French, Mandarin (9 real SERP pairwise comparisons).*

**Pattern found (SERP-validated on the spot-checked subjects, then applied to the rest of the category as pattern-inferred):** `{subject} tutor` and `{subject} tutoring/lessons online` share the same 5-8 provider domains (Wyzant, Preply, Superprof, italki, Lessonface, Classgap, Codementor, etc.) on different subpages -> same hub cluster. `{subject} classes/course online` is dominated by a materially different, course-platform provider set (Udemy, Skillshare, Coursera, LinkedIn Learning, DataCamp) -> fold as an on-page 'tutor vs. self-paced course' differentiation section rather than a new page. `learn {subject}` / `how to learn {subject}` is dominated by free self-serve tutorial sites and apps (Duolingo, Babbel, w3schools, freeCodeCamp, JustinGuitar, Flowkey, PhotoshopEssentials, etc.) -- near-zero overlap with the tutor-marketplace cluster, excluded from primary targeting per the same business-scope call as test-prep informational queries.

#### Spanish

- **Hub page:** `/courses/spanish-2dd27e6e`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Spanish tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Spanish tutor' and 'Spanish classes online' alike -- domain overlap tiebreak -> same cluster. |
| Spanish classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Spanish tutor'. |
| Spanish tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Spanish tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Spanish tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Spanish tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Spanish classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Spanish course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Spanish | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Spanish | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Spanish'; excluded as primary target. |
| is Spanish hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Spanish for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### French

- **Hub page:** `/courses/french-520eb7f0`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| French tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'French tutor' and 'French classes online' alike -- domain overlap tiebreak -> same cluster. |
| French classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'French tutor'. |
| French tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private French tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best French tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 French tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| French classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| French course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn French | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn French | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn French'; excluded as primary target. |
| is French hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| French for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### German

- **Hub page:** `/courses/german-a83fb505`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| German tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'German tutor' and 'German classes online' alike -- domain overlap tiebreak -> same cluster. |
| German classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'German tutor'. |
| German tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private German tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best German tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 German tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| German classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| German course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn German | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn German | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn German'; excluded as primary target. |
| is German hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| German for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Italian

- **Hub page:** `/courses/italian-0bce3f0c`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Italian tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Italian tutor' and 'Italian classes online' alike -- domain overlap tiebreak -> same cluster. |
| Italian classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Italian tutor'. |
| Italian tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Italian tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Italian tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Italian tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Italian classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Italian course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Italian | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Italian | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Italian'; excluded as primary target. |
| is Italian hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Italian for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Portuguese

- **Hub page:** `/courses/portuguese-4702233f`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Portuguese tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Portuguese tutor' and 'Portuguese classes online' alike -- domain overlap tiebreak -> same cluster. |
| Portuguese classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Portuguese tutor'. |
| Portuguese tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Portuguese tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Portuguese tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Portuguese tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Portuguese classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Portuguese course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Portuguese | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Portuguese | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Portuguese'; excluded as primary target. |
| is Portuguese hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Portuguese for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Russian

- **Hub page:** `/courses/russian-7692b797`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Russian tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Russian tutor' and 'Russian classes online' alike -- domain overlap tiebreak -> same cluster. |
| Russian classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Russian tutor'. |
| Russian tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Russian tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Russian tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Russian tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Russian classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Russian course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Russian | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Russian | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Russian'; excluded as primary target. |
| is Russian hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Russian for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Chinese (Mandarin)

- **Hub page:** `/courses/chinese-mandarin-81d5f035`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Chinese (Mandarin) tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Chinese (Mandarin) tutor' and 'Chinese (Mandarin) classes online' alike -- domain overlap tiebreak -> same cluster. |
| Chinese (Mandarin) classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Chinese (Mandarin) tutor'. |
| Chinese (Mandarin) tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Chinese (Mandarin) tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Chinese (Mandarin) tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Chinese (Mandarin) tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Chinese (Mandarin) classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Chinese (Mandarin) course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Chinese (Mandarin) | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Chinese (Mandarin) | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Chinese (Mandarin)'; excluded as primary target. |
| is Chinese (Mandarin) hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Chinese (Mandarin) for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Japanese

- **Hub page:** `/courses/japanese-34b5d228`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Japanese tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Japanese tutor' and 'Japanese classes online' alike -- domain overlap tiebreak -> same cluster. |
| Japanese classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Japanese tutor'. |
| Japanese tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Japanese tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Japanese tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Japanese tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Japanese classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Japanese course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Japanese | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Japanese | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Japanese'; excluded as primary target. |
| is Japanese hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Japanese for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Korean

- **Hub page:** `/courses/korean-3be8ff00`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Korean tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Korean tutor' and 'Korean classes online' alike -- domain overlap tiebreak -> same cluster. |
| Korean classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Korean tutor'. |
| Korean tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Korean tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Korean tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Korean tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Korean classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Korean course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Korean | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Korean | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Korean'; excluded as primary target. |
| is Korean hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Korean for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Arabic

- **Hub page:** `/courses/arabic-bee72fa4`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Arabic tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Arabic tutor' and 'Arabic classes online' alike -- domain overlap tiebreak -> same cluster. |
| Arabic classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Arabic tutor'. |
| Arabic tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Arabic tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Arabic tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Arabic tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Arabic classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Arabic course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Arabic | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Arabic | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Arabic'; excluded as primary target. |
| is Arabic hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Arabic for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Hindi

- **Hub page:** `/courses/hindi-language-course-459bc4ba`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Hindi tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Hindi tutor' and 'Hindi classes online' alike -- domain overlap tiebreak -> same cluster. |
| Hindi classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Hindi tutor'. |
| Hindi tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Hindi tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Hindi tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Hindi tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Hindi classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Hindi course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Hindi | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Hindi | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Hindi'; excluded as primary target. |
| is Hindi hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Hindi for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Sanskrit

- **Hub page:** `/courses/sanskrit-5eea98ab`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Sanskrit tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Sanskrit tutor' and 'Sanskrit classes online' alike -- domain overlap tiebreak -> same cluster. |
| Sanskrit classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Sanskrit tutor'. |
| Sanskrit tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Sanskrit tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Sanskrit tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Sanskrit tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Sanskrit classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Sanskrit course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Sanskrit | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Sanskrit | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Sanskrit'; excluded as primary target. |
| is Sanskrit hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Sanskrit for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Spoken English

- **Hub page:** `/courses/spoken-english-course-5dbc4867`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Spoken English tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Spoken English tutor' and 'Spoken English classes online' alike -- domain overlap tiebreak -> same cluster. |
| Spoken English classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Spoken English tutor'. |
| Spoken English tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Spoken English tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Spoken English tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Spoken English tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Spoken English classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Spoken English course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Spoken English | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Spoken English | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Spoken English'; excluded as primary target. |
| is Spoken English hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Spoken English for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Business English

- **Hub page:** `/courses/business-english-course-e6a73822`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Business English tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Business English tutor' and 'Business English classes online' alike -- domain overlap tiebreak -> same cluster. |
| Business English classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Business English tutor'. |
| Business English tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Business English tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Business English tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Business English tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Business English classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Business English course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Business English | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Business English | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Business English'; excluded as primary target. |
| is Business English hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Business English for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

---

## Creative Skills (5 subjects) -- lighter-depth pass

*lighter-depth - category pattern spot-checked on Adobe Photoshop, Graphic Design, UI/UX Design (9 real SERP pairwise comparisons).*

**Pattern found (SERP-validated on the spot-checked subjects, then applied to the rest of the category as pattern-inferred):** `{subject} tutor` and `{subject} tutoring/lessons online` share the same 5-8 provider domains (Wyzant, Preply, Superprof, italki, Lessonface, Classgap, Codementor, etc.) on different subpages -> same hub cluster. `{subject} classes/course online` is dominated by a materially different, course-platform provider set (Udemy, Skillshare, Coursera, LinkedIn Learning, DataCamp) -> fold as an on-page 'tutor vs. self-paced course' differentiation section rather than a new page. `learn {subject}` / `how to learn {subject}` is dominated by free self-serve tutorial sites and apps (Duolingo, Babbel, w3schools, freeCodeCamp, JustinGuitar, Flowkey, PhotoshopEssentials, etc.) -- near-zero overlap with the tutor-marketplace cluster, excluded from primary targeting per the same business-scope call as test-prep informational queries.

#### Adobe Photoshop

- **Hub page:** `/courses/adobe-photoshop-394813c4`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Adobe Photoshop tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Adobe Photoshop tutor' and 'Adobe Photoshop classes online' alike -- domain overlap tiebreak -> same cluster. |
| Adobe Photoshop classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Adobe Photoshop tutor'. |
| Adobe Photoshop tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Adobe Photoshop tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Adobe Photoshop tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Adobe Photoshop tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Adobe Photoshop classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Adobe Photoshop course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Adobe Photoshop | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Adobe Photoshop | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Adobe Photoshop'; excluded as primary target. |
| is Adobe Photoshop hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Adobe Photoshop for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Adobe Illustrator

- **Hub page:** `/courses/adobe-illustrator-51e96821`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Adobe Illustrator tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Adobe Illustrator tutor' and 'Adobe Illustrator classes online' alike -- domain overlap tiebreak -> same cluster. |
| Adobe Illustrator classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Adobe Illustrator tutor'. |
| Adobe Illustrator tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Adobe Illustrator tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Adobe Illustrator tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Adobe Illustrator tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Adobe Illustrator classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Adobe Illustrator course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Adobe Illustrator | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Adobe Illustrator | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Adobe Illustrator'; excluded as primary target. |
| is Adobe Illustrator hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Adobe Illustrator for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Graphic Design

- **Hub page:** `/courses/graphic-design-a6240a94`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Graphic Design tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Graphic Design tutor' and 'Graphic Design classes online' alike -- domain overlap tiebreak -> same cluster. |
| Graphic Design classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Graphic Design tutor'. |
| Graphic Design tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Graphic Design tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Graphic Design tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Graphic Design tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Graphic Design classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Graphic Design course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Graphic Design | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Graphic Design | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Graphic Design'; excluded as primary target. |
| is Graphic Design hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Graphic Design for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### UI/UX Design

- **Hub page:** `/courses/ui-ux-design-85bad5a6`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| UI/UX Design tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'UI/UX Design tutor' and 'UI/UX Design classes online' alike -- domain overlap tiebreak -> same cluster. |
| UI/UX Design classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'UI/UX Design tutor'. |
| UI/UX Design tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private UI/UX Design tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best UI/UX Design tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 UI/UX Design tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| UI/UX Design classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| UI/UX Design course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn UI/UX Design | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn UI/UX Design | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn UI/UX Design'; excluded as primary target. |
| is UI/UX Design hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| UI/UX Design for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Video Editing

- **Hub page:** `/courses/video-editing-55a060cd`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Video Editing tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Video Editing tutor' and 'Video Editing classes online' alike -- domain overlap tiebreak -> same cluster. |
| Video Editing classes online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Video Editing tutor'. |
| Video Editing tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Video Editing tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Video Editing tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Video Editing tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Video Editing classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Video Editing course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Video Editing | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Video Editing | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Video Editing'; excluded as primary target. |
| is Video Editing hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Video Editing for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

---

## Music & Instruments (6 subjects) -- lighter-depth pass

*lighter-depth - category pattern spot-checked on Guitar, Piano, Violin (9 real SERP pairwise comparisons).*

**Pattern found (SERP-validated on the spot-checked subjects, then applied to the rest of the category as pattern-inferred):** `{subject} tutor` and `{subject} tutoring/lessons online` share the same 5-8 provider domains (Wyzant, Preply, Superprof, italki, Lessonface, Classgap, Codementor, etc.) on different subpages -> same hub cluster. `{subject} classes/course online` is dominated by a materially different, course-platform provider set (Udemy, Skillshare, Coursera, LinkedIn Learning, DataCamp) -> fold as an on-page 'tutor vs. self-paced course' differentiation section rather than a new page. `learn {subject}` / `how to learn {subject}` is dominated by free self-serve tutorial sites and apps (Duolingo, Babbel, w3schools, freeCodeCamp, JustinGuitar, Flowkey, PhotoshopEssentials, etc.) -- near-zero overlap with the tutor-marketplace cluster, excluded from primary targeting per the same business-scope call as test-prep informational queries.

#### Guitar

- **Hub page:** `/courses/guitar-a7d7f6aa`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Guitar tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Guitar tutor' and 'Guitar lessons online' alike -- domain overlap tiebreak -> same cluster. |
| Guitar lessons online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Guitar tutor'. |
| Guitar tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Guitar tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Guitar tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Guitar tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Guitar classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Guitar course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Guitar | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Guitar | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Guitar'; excluded as primary target. |
| is Guitar hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Guitar for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Piano

- **Hub page:** `/courses/piano-02656f00`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Piano tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Piano tutor' and 'Piano lessons online' alike -- domain overlap tiebreak -> same cluster. |
| Piano lessons online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Piano tutor'. |
| Piano tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Piano tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Piano tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Piano tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Piano classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Piano course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Piano | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Piano | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Piano'; excluded as primary target. |
| is Piano hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Piano for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Violin

- **Hub page:** `/courses/violin-c7b9774e`
- **SERP validation depth:** spot-checked (real SERP)

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Violin tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Violin tutor' and 'Violin lessons online' alike -- domain overlap tiebreak -> same cluster. |
| Violin lessons online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Violin tutor'. |
| Violin tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Violin tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Violin tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Violin tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Violin classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Violin course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Violin | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Violin | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Violin'; excluded as primary target. |
| is Violin hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Violin for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Singing

- **Hub page:** `/courses/singing-2d883ea7`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Singing tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Singing tutor' and 'Singing lessons online' alike -- domain overlap tiebreak -> same cluster. |
| Singing lessons online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Singing tutor'. |
| Singing tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Singing tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Singing tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Singing tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Singing classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Singing course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Singing | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Singing | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Singing'; excluded as primary target. |
| is Singing hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Singing for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Music Theory

- **Hub page:** `/courses/music-theory-88e94e5a`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Music Theory tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Music Theory tutor' and 'Music Theory lessons online' alike -- domain overlap tiebreak -> same cluster. |
| Music Theory lessons online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Music Theory tutor'. |
| Music Theory tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Music Theory tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Music Theory tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Music Theory tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Music Theory classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Music Theory course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Music Theory | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Music Theory | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Music Theory'; excluded as primary target. |
| is Music Theory hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Music Theory for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).

#### Dance

- **Hub page:** `/courses/dance-8f1859ae`
- **SERP validation depth:** pattern-inferred from category spot-check

| Keyword variant | Intent | Overlap | Action | Evidence |
|---|---|---|---|---|
| Dance tutor | commercial | 7-10* | hub-primary | Provider set (Wyzant/Preply/Superprof/italki/Lessonface/Classgap) dominates 'Dance tutor' and 'Dance lessons online' alike -- domain overlap tiebreak -> same cluster. |
| Dance lessons online | commercial | 7-10* | hub-primary | Validated same-provider overlap with 'Dance tutor'. |
| Dance tutor near me | commercial-local | 4-6 | hub-primary | Local-intent variant; pattern-inferred from validated 'tutor' cluster. |
| private Dance tutor | commercial | 4-6 | hub-primary | Synonym cluster. |
| best Dance tutor | commercial | 4-6 | hub-primary | Review/ranking intent; same provider set. |
| 1:1 Dance tutoring | commercial | 2-3 | hub-primary | Synonym cluster; pattern-inferred. |
| Dance classes online | commercial-adjacent | 2-3 | hub-section | Validated: dominated by course-platforms (Udemy/Skillshare/Coursera/LinkedIn Learning), a materially different provider set from the tutor-marketplace cluster. Recommend as an on-page 'tutor vs. self-paced course' differentiation section, not a separate page. |
| Dance course for beginners | commercial-adjacent | 2-3 | hub-section | Same course-platform cluster as above; fold into the same differentiation section. |
| learn Dance | informational | 0-1 | exclude-fold-light | Validated: dominated by free self-serve platforms/apps (Duolingo/Babbel/w3schools/JustinGuitar/Flowkey depending on subject) -- near-zero overlap with tutor-marketplace SERP. Out of scope to target directly; one 'getting started' resource blurb in hub FAQ is sufficient. |
| how to learn Dance | informational | 0-1 | exclude-fold-light | Same free-content cluster as 'learn Dance'; excluded as primary target. |
| is Dance hard to learn | informational | 0-1 | exclude | Long-tail informational query with no commercial tutor-marketplace presence in SERP; excluded. |
| Dance for kids | commercial-audience | 2-3 | hub-faq | Audience-segment FAQ variant, relevant where the subject has a strong kids/family angle (languages, music, some programming subjects). |

- **New-page candidates:** none (all 0-1 overlap variants excluded/folded per business-scope call).
