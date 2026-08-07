# Phase 3 -- Step 3b: Subject Page SEO Content Briefs -- Index

**Generated:** 2026-08-07
**Source:** `docs/seo-audit-tutora/phase3-subjects-clustering/cluster-plan.md` (Step 3a)
**Total briefs:** 103 (one per live `/subjects/[slug]` page, cross-checked against a fresh live query of `prisma.subject.findMany()` at brief-writing time -- 103 subjects confirmed, zero missing, zero extra)
**Every brief is a NEW-CONTENT brief for an existing live page** -- the current `/subjects/[slug]` pages carry only ~30 words each (subtitle + 3-item "what you'll learn" list) with real schema/metadata already in place. These briefs are additions, not rewrites of substantial existing copy.

## Critical: four special cases carried over from Step 3a -- read before implementing

### 1. Three chooser/router pages -- NOT standard subject briefs
`ap-physics`, `ap-calculus`, and `algebra` are repositioned as "which one do I need?" comparison/routing pages instead of competing for the same primary keyword as their own numbered/graded siblings. Step 3a found real SERP cannibalization evidence for the first two (exact-URL overlap with their siblings); `algebra`'s case is pattern-inferred from the same logic, not independently SERP-searched. **Do not implement these as standard tutor-marketplace sales pages** -- their success metric is routing (click-through to the right sibling), not direct conversion.

| Subject | Brief | Routes to |
|---|---|---|
| AP Physics | [`ap-physics.md`](./cluster-briefs/ap-physics.md) | AP Physics 1, AP Physics C |
| AP Calculus | [`ap-calculus.md`](./cluster-briefs/ap-calculus.md) | AP Calculus AB, AP Calculus BC |
| Algebra | [`algebra.md`](./cluster-briefs/algebra.md) | Pre-Algebra, Algebra I, Algebra II, Advanced Algebra |

### 2. Cambridge English -- keyword retarget, not restructuring
`cambridge-english`'s brief retargets the primary keyword from "Cambridge English tutor" (which Google reads as the city of Cambridge, zero exam-related results) to **"Cambridge English exam tutor (FCE/CAE/CPE)"**. Title, H1, and meta description must explicitly name "exam" plus at least one of FCE/CAE/CPE -- never ship a bare "Cambridge English tutor" title. See [`cambridge-english.md`](./cluster-briefs/cambridge-english.md).

### 3. AI Basics -- informational-lean, not a hard sell
`ai-basics` showed **zero** tutor-marketplace SERP results in Step 3a's research (100% blogs/tutorials). Its brief deliberately targets a lower word count (~350 words) and avoids commercial hard-sell framing -- informational/educational tone, honest that this category is nascent for human 1:1 tutoring, but still with a real, working path to request a tutor. See [`ai-basics.md`](./cluster-briefs/ai-basics.md).

### 4. Real tutor data replaces "NEEDS REAL INPUT" placeholders
Unlike the Course-level briefs (which flagged tutor bios/guarantee/testimonials as `NEEDS REAL INPUT` placeholders because Course-to-tutor matching used a prefix-matching heuristic with no reliable real data source), **Subject pages have a direct `Subject <-> TutorSubject` database relation** -- real tutor data can be queried directly by `subjectId` at Step 3c. Every exam-driven brief's tutor-bio section says "populate via live query" and states the actual current tutor count for that subject (captured fresh at brief-writing time), rather than a blanket placeholder. Guarantee sections link to the real, live `/guarantee` page instead of inventing guarantee copy -- same no-fabrication rule as every prior phase.

**Tutor-coverage summary across all 103 subjects (live count at brief-writing time):** 51 of 103 subjects already have at least one real approved tutor; 52 have zero. Zero-coverage subjects get an explicit "no tutor matched yet -- request one" framing in their brief rather than an empty-looking bio grid or fabricated names. Of the 29 exam-driven subjects specifically, **15 currently have zero tutor coverage** (listed below) -- these need the honest "no tutor yet" framing most visibly, since they're also the highest-content-investment briefs.

**Zero-tutor-coverage exam-driven subjects (15 of 29):** AP Physics 1, AP Calculus AB, A-Level Chemistry, A-Level Physics, A-Level Maths, A-Level Further Maths, GCSE Biology, GCSE Chemistry, GCSE English, GCSE Science, IB Chemistry, IGCSE Chemistry, IGCSE Maths, International Baccalaureate (IB) umbrella, Cambridge English.

---

## Part 1 -- The 29 exam-driven subjects (Service/Hybrid template, full-depth priority)

Same template validated at the Course level for test-prep (see `docs/seo-audit-tutora/phase3-content-briefs/cluster-briefs/sat-c5d2749b.md`), adapted for subjects: real tutor data via direct query (not prefix-matching), guarantee section linking to `/guarantee` (not invented guarantee copy), genuinely varied structure/emphasis per subject rather than templated boilerplate with the name swapped.

### AP family (8)

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| AP Physics 1 | [`ap-physics-1.md`](./cluster-briefs/ap-physics-1.md) | AP Physics 1 tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| AP Physics C | [`ap-physics-c.md`](./cluster-briefs/ap-physics-c.md) | AP Physics C tutor | Not blocked — 1 real tutor live |
| AP Physics | [`ap-physics.md`](./cluster-briefs/ap-physics.md) | (chooser -- see Part 0 above) | N/A -- chooser page |
| AP Calculus AB | [`ap-calculus-ab.md`](./cluster-briefs/ap-calculus-ab.md) | AP Calculus AB tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| AP Calculus BC | [`ap-calculus-bc.md`](./cluster-briefs/ap-calculus-bc.md) | AP Calculus BC tutor | Not blocked — 1 real tutor live |
| AP Calculus | [`ap-calculus.md`](./cluster-briefs/ap-calculus.md) | (chooser -- see Part 0 above) | N/A -- chooser page |
| AP Chemistry | [`ap-chemistry.md`](./cluster-briefs/ap-chemistry.md) | AP Chemistry tutor | Not blocked — 3 real tutors live |
| AP Biology | [`ap-biology.md`](./cluster-briefs/ap-biology.md) | AP Biology tutor | Not blocked — 1 real tutor live |

### GCSE / IGCSE / A-Level triads + other GCSE subjects (12)
Step 3a's strongest confirmation in the whole study: zero exact-URL SERP overlap across GCSE/IGCSE/A-Level Chemistry, Physics, and Maths. All get full primary-keyword ownership; existing course cross-links (where present) are framed as secondary context ("part of our full GCSE/IGCSE coverage"), not the page's primary framing -- per Step 3a's finding that 9 of these have their own dedicated SERP ecosystem separate from the shared course page.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| GCSE Chemistry | [`gcse-chemistry.md`](./cluster-briefs/gcse-chemistry.md) | GCSE Chemistry tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| GCSE Physics | [`gcse-physics.md`](./cluster-briefs/gcse-physics.md) | GCSE Physics tutor | Not blocked — 1 real tutor live |
| GCSE Maths | [`gcse-maths.md`](./cluster-briefs/gcse-maths.md) | GCSE Maths tutor | Not blocked — 1 real tutor live |
| IGCSE Chemistry | [`igcse-chemistry.md`](./cluster-briefs/igcse-chemistry.md) | IGCSE Chemistry tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| IGCSE Physics | [`igcse-physics.md`](./cluster-briefs/igcse-physics.md) | IGCSE Physics tutor | Not blocked — 1 real tutor live |
| IGCSE Maths | [`igcse-maths.md`](./cluster-briefs/igcse-maths.md) | IGCSE Maths tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| A-Level Chemistry | [`a-level-chemistry.md`](./cluster-briefs/a-level-chemistry.md) | A-Level Chemistry tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| A-Level Physics | [`a-level-physics.md`](./cluster-briefs/a-level-physics.md) | A-Level Physics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| A-Level Maths | [`a-level-maths.md`](./cluster-briefs/a-level-maths.md) | A-Level Maths tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| GCSE Biology | [`gcse-biology.md`](./cluster-briefs/gcse-biology.md) | GCSE Biology tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| GCSE Science | [`gcse-science.md`](./cluster-briefs/gcse-science.md) | GCSE Science tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| GCSE English | [`gcse-english.md`](./cluster-briefs/gcse-english.md) | GCSE English tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### A-Level Further Maths (1)

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| A-Level Further Maths | [`a-level-further-maths.md`](./cluster-briefs/a-level-further-maths.md) | A-Level Further Maths tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### IB family (4)

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| IB Math | [`ib-math.md`](./cluster-briefs/ib-math.md) | IB Math tutor | Not blocked — 1 real tutor live |
| IB Physics | [`ib-physics.md`](./cluster-briefs/ib-physics.md) | IB Physics tutor | Not blocked — 1 real tutor live |
| IB Chemistry | [`ib-chemistry.md`](./cluster-briefs/ib-chemistry.md) | IB Chemistry tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| International Baccalaureate (IB) | [`international-baccalaureate-ib.md`](./cluster-briefs/international-baccalaureate-ib.md) | IB tutor | Pillar-umbrella page -- links down to IB Math/Physics/Chemistry rather than competing with them; Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### SAT / ACT (3)

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| SAT Math | [`sat-math.md`](./cluster-briefs/sat-math.md) | SAT Math tutor | Not blocked — 1 real tutor live |
| SAT English | [`sat-english.md`](./cluster-briefs/sat-english.md) | SAT English tutor | Not blocked — 1 real tutor live |
| ACT Math | [`act-math.md`](./cluster-briefs/act-math.md) | ACT Math tutor | Not blocked — 1 real tutor live |

### Cambridge English (1) -- keyword retarget

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| Cambridge English | [`cambridge-english.md`](./cluster-briefs/cambridge-english.md) | Cambridge English exam tutor (FCE/CAE/CPE) -- retargeted, see flag #2 above | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

---

## Part 2 -- Lighter subjects (74 total, standard/adapted templates)

### Algebra chooser (1)
Not a standard brief -- see Part 0 above.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| Algebra | [`algebra.md`](./cluster-briefs/algebra.md) | (chooser -- see flags above) | Not blocked — 2 real tutors live |

### Programming & Technology (14) -- practical-mentor-marketplace template, not credentialed-bio
Step 3a: this category does NOT match the exam-driven page-type pattern. 6 core languages get an explicit practical-mentor-marketplace template (real differentiator = live 1:1 project feedback vs. free tutorials, not credentials); 3 kids-coding subjects get a distinct kids/parent-facing template; 4 CS-adjacent subjects get standard treatment with programming-appropriate FAQ; AI Basics gets the informational-lean template (flag #3 above).

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| JavaScript | [`javascript.md`](./cluster-briefs/javascript.md) | JavaScript tutor | Not blocked — 1 real tutor live — practical-mentor template |
| Python | [`python.md`](./cluster-briefs/python.md) | Python tutor | Not blocked — 1 real tutor live — practical-mentor template |
| C++ | [`c.md`](./cluster-briefs/c.md) | C++ tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — practical-mentor template |
| SQL | [`sql.md`](./cluster-briefs/sql.md) | SQL tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — practical-mentor template |
| Java | [`java.md`](./cluster-briefs/java.md) | Java tutor | Not blocked — 2 real tutors live — practical-mentor template |
| HTML | [`html.md`](./cluster-briefs/html.md) | HTML tutor | Not blocked — 1 real tutor live — practical-mentor template |
| Python Basics | [`python-basics.md`](./cluster-briefs/python-basics.md) | Python Basics tutor for kids | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — kids-coding template |
| Scratch Programming | [`scratch-programming.md`](./cluster-briefs/scratch-programming.md) | Scratch Programming tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — kids-coding template |
| Coding for Kids | [`coding-for-kids.md`](./cluster-briefs/coding-for-kids.md) | Coding for Kids tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — kids-coding template |
| Computer Science | [`computer-science.md`](./cluster-briefs/computer-science.md) | Computer Science tutor | Not blocked — 1 real tutor live — CS-adjacent standard template |
| Algorithms | [`algorithms.md`](./cluster-briefs/algorithms.md) | Algorithms tutor | Not blocked — 1 real tutor live — CS-adjacent standard template |
| Data Structures | [`data-structures.md`](./cluster-briefs/data-structures.md) | Data Structures tutor | Not blocked — 1 real tutor live — CS-adjacent standard template |
| Web Development | [`web-development.md`](./cluster-briefs/web-development.md) | Web Development tutor | Not blocked — 1 real tutor live — CS-adjacent standard template |
| AI Basics | [`ai-basics.md`](./cluster-briefs/ai-basics.md) | AI Basics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — informational-lean template, see flag #3 above |

### Languages (5) + IELTS (1, elevated)
Step 3a directly validated the consistent language-marketplace pattern (Preply, italki, Wyzant, Superprof, AmazingTalker). IELTS is technically in this catalog position but its brief uses an elevated Service/Hybrid-lite treatment (real tutor query + guarantee link) because it inherits a CRITICAL page-type-mismatch finding from the Course-level research.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| Arabic | [`arabic.md`](./cluster-briefs/arabic.md) | Arabic tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Hindi | [`hindi.md`](./cluster-briefs/hindi.md) | Hindi tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| French | [`french.md`](./cluster-briefs/french.md) | French tutor | Not blocked — 1 real tutor live |
| Spanish | [`spanish.md`](./cluster-briefs/spanish.md) | Spanish tutor | Not blocked — 2 real tutors live |
| Spoken English | [`spoken-english.md`](./cluster-briefs/spoken-english.md) | Spoken English tutor | Not blocked — 1 real tutor live |
| IELTS | [`ielts.md`](./cluster-briefs/ielts.md) | IELTS tutor | Not blocked — 2 real tutors live — elevated Service/Hybrid-lite treatment |

### English-skills cluster (9)
Step 3a flagged this as the largest same-domain cluster in the whole catalog and the single largest unresolved research area -- only Essay Writing and Spoken English were directly SERP-validated (both confirmed as genuinely distinct clusters); the remaining 7 are pattern-applied and flagged here as a genuine follow-up-pass candidate before final copy ships, not silently assumed identical.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| English | [`english.md`](./cluster-briefs/english.md) | English tutor | Not blocked — 4 real tutors live — pattern-applied, flagged for follow-up SERP pass |
| Academic English | [`academic-english.md`](./cluster-briefs/academic-english.md) | Academic English tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — pattern-applied, flagged for follow-up SERP pass |
| Academic Writing | [`academic-writing.md`](./cluster-briefs/academic-writing.md) | Academic Writing tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — pattern-applied, flagged for follow-up SERP pass |
| Essay Writing | [`essay-writing.md`](./cluster-briefs/essay-writing.md) | Essay Writing tutor | Not blocked — 1 real tutor live — directly SERP-validated by Step 3a |
| Creative Writing | [`creative-writing.md`](./cluster-briefs/creative-writing.md) | Creative Writing tutor | Not blocked — 1 real tutor live — directly SERP-validated by Step 3a |
| Grammar | [`grammar.md`](./cluster-briefs/grammar.md) | Grammar tutor | Not blocked — 1 real tutor live — pattern-applied, flagged for follow-up SERP pass |
| Vocabulary | [`vocabulary.md`](./cluster-briefs/vocabulary.md) | Vocabulary tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — pattern-applied, flagged for follow-up SERP pass |
| Reading Comprehension | [`reading-comprehension.md`](./cluster-briefs/reading-comprehension.md) | Reading Comprehension tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) — pattern-applied, flagged for follow-up SERP pass |
| Literature | [`literature.md`](./cluster-briefs/literature.md) | Literature tutor | Not blocked — 4 real tutors live — pattern-applied, flagged for follow-up SERP pass |

### General Academic -- Math & Science (20)
Step 3a confirmed a distinct "homework help" provider ecosystem (Tutor.com, Princeton Review, UPchieve, Wyzant, Varsity Tutors, Mathnasium, Superprof), separate from both exam-specific providers and each other, each subject on its own dedicated subpage.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| Calculus | [`calculus.md`](./cluster-briefs/calculus.md) | Calculus tutor | Not blocked — 3 real tutors live |
| Geometry | [`geometry.md`](./cluster-briefs/geometry.md) | Geometry tutor | Not blocked — 2 real tutors live |
| Trigonometry | [`trigonometry.md`](./cluster-briefs/trigonometry.md) | Trigonometry tutor | Not blocked — 1 real tutor live |
| Statistics | [`statistics.md`](./cluster-briefs/statistics.md) | Statistics tutor | Not blocked — 3 real tutors live |
| Probability | [`probability.md`](./cluster-briefs/probability.md) | Probability tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Precalculus | [`precalculus.md`](./cluster-briefs/precalculus.md) | Precalculus tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Mathematics | [`mathematics.md`](./cluster-briefs/mathematics.md) | Mathematics tutor | Not blocked — 2 real tutors live |
| Biology | [`biology.md`](./cluster-briefs/biology.md) | Biology tutor | Not blocked — 4 real tutors live |
| Chemistry | [`chemistry.md`](./cluster-briefs/chemistry.md) | Chemistry tutor | Not blocked — 4 real tutors live |
| Physics | [`physics.md`](./cluster-briefs/physics.md) | Physics tutor | Not blocked — 3 real tutors live |
| Astronomy | [`astronomy.md`](./cluster-briefs/astronomy.md) | Astronomy tutor | Not blocked — 1 real tutor live |
| Genetics | [`genetics.md`](./cluster-briefs/genetics.md) | Genetics tutor | Not blocked — 2 real tutors live |
| Human Anatomy | [`human-anatomy.md`](./cluster-briefs/human-anatomy.md) | Human Anatomy tutor | Not blocked — 1 real tutor live |
| Organic Chemistry | [`organic-chemistry.md`](./cluster-briefs/organic-chemistry.md) | Organic Chemistry tutor | Not blocked — 1 real tutor live |
| Environmental Science | [`environmental-science.md`](./cluster-briefs/environmental-science.md) | Environmental Science tutor | Not blocked — 1 real tutor live |
| Mechanics | [`mechanics.md`](./cluster-briefs/mechanics.md) | Mechanics tutor | Not blocked — 1 real tutor live |
| Algebra I | [`algebra-i.md`](./cluster-briefs/algebra-i.md) | Algebra I tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Algebra II | [`algebra-ii.md`](./cluster-briefs/algebra-ii.md) | Algebra II tutor | Not blocked — 1 real tutor live |
| Advanced Algebra | [`advanced-algebra.md`](./cluster-briefs/advanced-algebra.md) | Advanced Algebra tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Pre-Algebra | [`pre-algebra.md`](./cluster-briefs/pre-algebra.md) | Pre-Algebra tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### Middle School Basics, Grades 6-8, American curriculum (7)
Medium-confidence pattern-applied cluster (Step 3a: only spot-checked via Middle School Math directly, not pairwise against each other -- flagged as a genuine research gap). Parent-driven intent, age-appropriate framing distinct from exam-driven high-school subjects.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| Biology Basics | [`biology-basics.md`](./cluster-briefs/biology-basics.md) | Biology Basics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Chemistry Basics | [`chemistry-basics.md`](./cluster-briefs/chemistry-basics.md) | Chemistry Basics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Physics Basics | [`physics-basics.md`](./cluster-briefs/physics-basics.md) | Physics Basics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| General Mathematics | [`general-mathematics.md`](./cluster-briefs/general-mathematics.md) | General Mathematics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| General Science | [`general-science.md`](./cluster-briefs/general-science.md) | General Science tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Geometry Basics | [`geometry-basics.md`](./cluster-briefs/geometry-basics.md) | Geometry Basics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Middle School Math | [`middle-school-math.md`](./cluster-briefs/middle-school-math.md) | Middle School Math tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### Humanities (3)

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| History | [`history.md`](./cluster-briefs/history.md) | History tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Geography | [`geography.md`](./cluster-briefs/geography.md) | Geography tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Civics | [`civics.md`](./cluster-briefs/civics.md) | Civics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### Business & Finance (4)

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| Finance Basics | [`finance-basics.md`](./cluster-briefs/finance-basics.md) | Finance Basics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| Economics | [`economics.md`](./cluster-briefs/economics.md) | Economics tutor | Not blocked — 1 real tutor live |
| Accounting | [`accounting.md`](./cluster-briefs/accounting.md) | Accounting tutor | Not blocked — 1 real tutor live |
| Business Studies | [`business-studies.md`](./cluster-briefs/business-studies.md) | Business Studies tutor | Not blocked — 1 real tutor live |

### Singapore curriculum (5)
Step 3a directly validated PSLE Maths and O-Level Chemistry, confirming a fully distinct, geography-specific ecosystem (SmileTutor, ClubMath.sg, Mavis Tutorial Centre, NickleBee Tutors) with zero overlap with any UK/US brand elsewhere in the catalog.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| O-Level Chemistry | [`o-level-chemistry.md`](./cluster-briefs/o-level-chemistry.md) | O-Level Chemistry tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| O-Level Maths | [`o-level-maths.md`](./cluster-briefs/o-level-maths.md) | O-Level Maths tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| O-Level Physics | [`o-level-physics.md`](./cluster-briefs/o-level-physics.md) | O-Level Physics tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| PSLE Maths | [`psle-maths.md`](./cluster-briefs/psle-maths.md) | PSLE Maths tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| PSLE Science | [`psle-science.md`](./cluster-briefs/psle-science.md) | PSLE Science tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### UK Entrance Exams (2)
Step 3a directly validated 11+ Maths; 11+ English pattern-applied with high confidence.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| 11+ Maths | [`11-maths.md`](./cluster-briefs/11-maths.md) | 11+ Maths tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| 11+ English | [`11-english.md`](./cluster-briefs/11-english.md) | 11+ English tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### Umbrella curricula (2)
Step 3a directly validated both -- distinct expat/international-family-tutoring ecosystems, zero overlap with GCSE/AP-specific pages.

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| British Curriculum | [`british-curriculum.md`](./cluster-briefs/british-curriculum.md) | British Curriculum tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |
| American Curriculum | [`american-curriculum.md`](./cluster-briefs/american-curriculum.md) | American Curriculum tutor | Blocked on tutor coverage — 0 tutors yet (honest "request one" framing) |

### Flagged duplicate-risk subject (1)

| Subject | Brief | Primary keyword | Tutor-data status |
|---|---|---|---|
| Science | [`science.md`](./cluster-briefs/science.md) | Science tutor | Not blocked — 1 real tutor live — flagged generic duplicate of General Science / GCSE Science -- brief adds a disambiguation note, not a full chooser rebuild |

---

## Assumptions and open items carried into Step 3c

1. **Competitor sets throughout are domain-level from Step 3a's SERP evidence**, not fresh per-subject URL pulls -- a live SERP check at copywriting time is recommended for the highest-priority (29 exam-driven) pages before final publish.
2. **English-skills cluster (7 of 9 subjects) is pattern-applied, not independently SERP-validated** -- Step 3a flagged this explicitly as the single largest unresolved research area in the whole catalog. Recommend a dedicated follow-up SERP pass before finalizing copy for: English, Academic English, Academic Writing, Grammar, Vocabulary, Reading Comprehension, Literature.
3. **Middle School Basics cluster (7 subjects) is medium-confidence pattern-applied** from Middle School Math only, not pairwise validated.
4. **`algebra`'s chooser-page treatment is pattern-inferred**, not independently SERP-searched the way `ap-physics`/`ap-calculus` were -- flagged in its own brief.
5. **No fabricated content anywhere**: every brief follows the project's standing no-fabrication rule -- no invented tutor names/credentials, no invented student counts or satisfaction percentages, no invented flat pricing, no invented guarantee terms beyond the real `/guarantee` policy, no invented proprietary curricula (curriculum facts used are generic, publicly verifiable facts about exam structure/grade bands).
6. **Tutor-coverage counts are a live snapshot** (captured via a fresh `prisma.subject.findMany()` query against the production schema at brief-writing time) -- these will change as more tutors join; Step 3c's live-query approach means the shipped pages will always reflect current data regardless of what this snapshot shows.

