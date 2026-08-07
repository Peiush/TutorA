# Phase 3 -- Step 3b: SEO Content Briefs -- Index

**Generated:** 2026-08-06
**Source:** `docs/seo-audit-tutora/phase3-clustering/cluster-plan.md` / `cluster-plan.json` (Step 3a)
**Total briefs:** 53 (one per live `/courses/[slug]` page, 53 subjects confirmed against the production sitemap)
**Every brief is a REWRITE brief for an existing live page** -- none of these are new-page briefs. Step 3a already ruled out building separate pages for informational/practice-test-style queries; those are folded into each hub's FAQ instead.

## Critical: before the 15 Test Preparation briefs can ship

All 15 Test Preparation briefs (SAT, ACT, PSAT, GRE, GMAT, TOEFL, IELTS, PTE Academic, Duolingo English Test, GCSE, GCSE English, IGCSE, A Level, IB Diploma, AP Exam) use a **Service/Hybrid page template** and each brief contains a tutor-bio section, a guarantee/outcomes section, and a testimonials section that are **structure-only placeholders**. TutorA has no published tutor-credential copy, no numeric score guarantee, and no real testimonials in this project's source data, so none of these sections were written with fake content -- every one is explicitly flagged `NEEDS REAL INPUT` inside its brief. This mirrors how the site's earlier SEO fixes deliberately omitted a fabricated `sameAs` schema field rather than ship fake social URLs.

**Real business input required before rewrite:**
1. **Tutor bios** -- real names, verified credentials/certifications, years of subject-specific experience, headshots, for 3-5 tutors per test-prep subject.
2. **Guarantee / outcomes policy** -- TutorA's actual refund/rematch/satisfaction policy, if one exists. If none exists, briefs default to honest commitment language instead of an invented numeric guarantee -- confirm which applies before writing.
3. **Testimonials** -- real student/parent quotes with permission to publish, minimum first name + last initial + outcome context.

The 38 lighter-category briefs (Programming & Technology, Languages, Creative Skills, Music & Instruments) do **not** need this input -- Step 3a found no page-type mismatch for these categories, so they use the standard course-page template with no trust-content blockers.

## Test Preparation (15 briefs)

| Subject | Brief file | Primary keyword | Status |
|---|---|---|---|
| SAT | [`sat-c5d2749b.md`](./cluster-briefs/sat-c5d2749b.md) | SAT tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| ACT | [`act-dccdc694.md`](./cluster-briefs/act-dccdc694.md) | ACT tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| PSAT | [`psat-preparation-course-4b552b9e.md`](./cluster-briefs/psat-preparation-course-4b552b9e.md) | PSAT tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| GRE | [`gre-a2b8cace.md`](./cluster-briefs/gre-a2b8cace.md) | GRE tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| GMAT | [`gmat-d7e5eb9d.md`](./cluster-briefs/gmat-d7e5eb9d.md) | GMAT tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| TOEFL | [`toefl-3a2e48ed.md`](./cluster-briefs/toefl-3a2e48ed.md) | TOEFL tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| IELTS | [`ielts-8d4686db.md`](./cluster-briefs/ielts-8d4686db.md) | IELTS tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| PTE Academic | [`pte-302557b2.md`](./cluster-briefs/pte-302557b2.md) | PTE Academic tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| Duolingo English Test | [`duolingo-english-test-preparation-course-3e98dca7.md`](./cluster-briefs/duolingo-english-test-preparation-course-3e98dca7.md) | Duolingo English Test tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| GCSE | [`gcse-preparation-course-97ec8c86.md`](./cluster-briefs/gcse-preparation-course-97ec8c86.md) | GCSE tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| GCSE English | [`gcse-english-017a23a5.md`](./cluster-briefs/gcse-english-017a23a5.md) | GCSE English tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (HIGH mismatch) |
| IGCSE | [`igcse-preparation-course-5ed7859f.md`](./cluster-briefs/igcse-preparation-course-5ed7859f.md) | IGCSE tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (HIGH mismatch) |
| A Level | [`a-level-preparation-course-6ede4ec7.md`](./cluster-briefs/a-level-preparation-course-6ede4ec7.md) | A Level tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| IB Diploma | [`ib-diploma-preparation-course-9e537a20.md`](./cluster-briefs/ib-diploma-preparation-course-9e537a20.md) | IB Diploma tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (CRITICAL mismatch) |
| AP Exam | [`ap-exam-preparation-course-cceffa19.md`](./cluster-briefs/ap-exam-preparation-course-cceffa19.md) | AP Exam tutor | Service/Hybrid brief written — needs real tutor bios, guarantee policy, testimonials before ship (HIGH mismatch) |

## Programming & Technology (13 briefs)

| Subject | Brief file | Primary keyword | Status |
|---|---|---|---|
| Python Programming for Beginners | [`python-ff654450.md`](./cluster-briefs/python-ff654450.md) | Python Programming for Beginners tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| JavaScript Programming for Beginners | [`javascript-ac5adb0a.md`](./cluster-briefs/javascript-ac5adb0a.md) | JavaScript Programming for Beginners tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| SQL for Beginners | [`sql-90d171c1.md`](./cluster-briefs/sql-90d171c1.md) | SQL for Beginners tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Java Programming Fundamentals | [`java-48483b48.md`](./cluster-briefs/java-48483b48.md) | Java Programming Fundamentals tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| C++ Programming for Beginners | [`c-95361960.md`](./cluster-briefs/c-95361960.md) | C++ Programming for Beginners tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| HTML & CSS | [`html-css-fb9cd7a2.md`](./cluster-briefs/html-css-fb9cd7a2.md) | HTML & CSS tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Computer Science | [`computer-science-758eff7f.md`](./cluster-briefs/computer-science-758eff7f.md) | Computer Science tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Data Science | [`data-science-6209e272.md`](./cluster-briefs/data-science-6209e272.md) | Data Science tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| AI & Machine Learning (Advanced) | [`ai-machine-learning-advanced-e4eabe28.md`](./cluster-briefs/ai-machine-learning-advanced-e4eabe28.md) | AI & Machine Learning (Advanced) tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| AI for Beginners | [`ai-for-beginners-0939362a.md`](./cluster-briefs/ai-for-beginners-0939362a.md) | AI for Beginners tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| React for Beginners | [`react-for-beginners-327c29e1.md`](./cluster-briefs/react-for-beginners-327c29e1.md) | React for Beginners tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Scratch Programming for Kids | [`scratch-programming-for-kids-7fa6fba9.md`](./cluster-briefs/scratch-programming-for-kids-7fa6fba9.md) | Scratch Programming for Kids tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Robotics for Kids | [`robotics-for-kids-3b988a24.md`](./cluster-briefs/robotics-for-kids-3b988a24.md) | Robotics for Kids tutor | Standard course-page brief written — ready to write from, no trust-content blockers |

## Languages (14 briefs)

| Subject | Brief file | Primary keyword | Status |
|---|---|---|---|
| Spanish | [`spanish-2dd27e6e.md`](./cluster-briefs/spanish-2dd27e6e.md) | Spanish tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| French | [`french-520eb7f0.md`](./cluster-briefs/french-520eb7f0.md) | French tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| German | [`german-a83fb505.md`](./cluster-briefs/german-a83fb505.md) | German tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Italian | [`italian-0bce3f0c.md`](./cluster-briefs/italian-0bce3f0c.md) | Italian tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Portuguese | [`portuguese-4702233f.md`](./cluster-briefs/portuguese-4702233f.md) | Portuguese tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Russian | [`russian-7692b797.md`](./cluster-briefs/russian-7692b797.md) | Russian tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Chinese (Mandarin) | [`chinese-mandarin-81d5f035.md`](./cluster-briefs/chinese-mandarin-81d5f035.md) | Chinese (Mandarin) tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Japanese | [`japanese-34b5d228.md`](./cluster-briefs/japanese-34b5d228.md) | Japanese tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Korean | [`korean-3be8ff00.md`](./cluster-briefs/korean-3be8ff00.md) | Korean tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Arabic | [`arabic-bee72fa4.md`](./cluster-briefs/arabic-bee72fa4.md) | Arabic tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Hindi | [`hindi-language-course-459bc4ba.md`](./cluster-briefs/hindi-language-course-459bc4ba.md) | Hindi tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Sanskrit | [`sanskrit-5eea98ab.md`](./cluster-briefs/sanskrit-5eea98ab.md) | Sanskrit tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Spoken English | [`spoken-english-course-5dbc4867.md`](./cluster-briefs/spoken-english-course-5dbc4867.md) | Spoken English tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Business English | [`business-english-course-e6a73822.md`](./cluster-briefs/business-english-course-e6a73822.md) | Business English tutor | Standard course-page brief written — ready to write from, no trust-content blockers |

## Creative Skills (5 briefs)

| Subject | Brief file | Primary keyword | Status |
|---|---|---|---|
| Adobe Photoshop | [`adobe-photoshop-394813c4.md`](./cluster-briefs/adobe-photoshop-394813c4.md) | Adobe Photoshop tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Adobe Illustrator | [`adobe-illustrator-51e96821.md`](./cluster-briefs/adobe-illustrator-51e96821.md) | Adobe Illustrator tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Graphic Design | [`graphic-design-a6240a94.md`](./cluster-briefs/graphic-design-a6240a94.md) | Graphic Design tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| UI/UX Design | [`ui-ux-design-85bad5a6.md`](./cluster-briefs/ui-ux-design-85bad5a6.md) | UI/UX Design tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Video Editing | [`video-editing-55a060cd.md`](./cluster-briefs/video-editing-55a060cd.md) | Video Editing tutor | Standard course-page brief written — ready to write from, no trust-content blockers |

## Music & Instruments (6 briefs)

| Subject | Brief file | Primary keyword | Status |
|---|---|---|---|
| Guitar | [`guitar-a7d7f6aa.md`](./cluster-briefs/guitar-a7d7f6aa.md) | Guitar tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Piano | [`piano-02656f00.md`](./cluster-briefs/piano-02656f00.md) | Piano tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Violin | [`violin-c7b9774e.md`](./cluster-briefs/violin-c7b9774e.md) | Violin tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Singing | [`singing-2d883ea7.md`](./cluster-briefs/singing-2d883ea7.md) | Singing tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Music Theory | [`music-theory-88e94e5a.md`](./cluster-briefs/music-theory-88e94e5a.md) | Music Theory tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
| Dance | [`dance-8f1859ae.md`](./cluster-briefs/dance-8f1859ae.md) | Dance tutor | Standard course-page brief written — ready to write from, no trust-content blockers |
