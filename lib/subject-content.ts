// Phase 3 / Step 3c: content for the 103 /subjects/[slug] pages, built from the real
// SERP-overlap research in docs/seo-audit-tutora/phase3-subjects-clustering/ and the briefs
// in docs/seo-audit-tutora/phase3-subjects-briefs/. Every claim here is grounded in facts
// already established elsewhere in this codebase: live 1:1 sessions (not pre-recorded),
// tutors reviewed by TutorA's team, pricing shown before booking (never a flat number), no
// certificate of completion, and generically-true curriculum facts (exam structure, age
// ranges) rather than invented TutorA-specific claims. No invented student counts,
// satisfaction stats, or fabricated tutor names/credentials/testimonials — tutor data is
// pulled live from real approved TutorProfile/TutorSubject rows (see
// app/lib/subject-listings.ts's getTutorsForSubject), never hardcoded here.
//
// Five templates, per the Step 3a/3b research:
// - "chooser": a generic/ambiguous entry that cannibalizes its own numbered siblings
//   (ap-physics, ap-calculus, algebra) — routes to siblings instead of competing with them.
// - "service-hybrid": exam-driven subjects — real SERP evidence shows credentialed-tutor-bio
//   pages beat thin listings here. Links to the real /guarantee page rather than inventing
//   guarantee copy.
// - "practical-mentor": the 6 programming subjects (javascript, python, c, sql, java, html)
//   — SERP evidence shows a practical-mentor-marketplace pattern, not credentialed-bio.
// - "informational": ai-basics specifically — zero tutor-marketplace SERP demand found: no
//   hard-sell framing, lean educational, still real path to request a tutor.
// - "standard": everything else — general subject-page template.
//
// Template-count note (see task brief for the expected 3/26/6/1/67 split): the actual
// breakdown here is 3 chooser / 28 service-hybrid / 6 practical-mentor / 1 informational /
// 65 standard. Two deviations from the expectation, both explained:
//   1. Of the "29 exam-driven subjects" the brief describes, only 2 (ap-physics, ap-calculus)
//      are chooser pages — the third chooser, `algebra`, is a General Academic subject, not
//      one of the 29 exam-driven ones (its sibling cannibalization risk was pattern-inferred
//      separately, per docs/.../algebra.md). So 29 - 2 = 27 service-hybrid subjects from that
//      set, not 26.
//   2. `ielts` is not literally in the "AP/IB/A-Level/GCSE/IGCSE/SAT/ACT" list, but its own
//      brief (docs/.../ielts.md) explicitly calls for "an elevated Service/Hybrid-lite
//      treatment" inheriting a CRITICAL page-type-mismatch finding from the Course-level
//      research — real tutor query, guarantee link, subject-specific FAQ, same as the other
//      27. Counting it brings service-hybrid to 28, and standard to 65 (103 - 3 - 28 - 6 - 1).
//
// NOTE on this worktree: this isolated worktree's copy of app/subjects/[slug]/page.tsx and
// app/lib/subject-listings.ts predates the Step 3a/3b wiring work (no subjectPageContent
// import, no getTutorsForSubject) — that wiring exists in the main checkout this worktree
// branched from, as uncommitted work-in-progress. This file is written to match the exact
// SubjectPageContent interface/shape already specified for that wiring so it merges cleanly;
// per the task scope, only this file is added/changed here.

export type SubjectPageTemplate = "chooser" | "service-hybrid" | "practical-mentor" | "informational" | "standard";

export interface ChooserSibling {
  slug: string;
  label: string;
}

export interface SubjectPageContent {
  template: SubjectPageTemplate;
  /** Overrides the default `${title} Tutor` meta title — used for the cambridge-english retarget. */
  metaTitleOverride?: string;
  /** Overrides the default subjectDescription() meta description. */
  metaDescriptionOverride?: string;
  /** Not used for "chooser" template. */
  differentiation?: string;
  faqs: { q: string; a: string }[];
  /** Only for template "chooser". */
  chooserIntro?: string;
  chooserSiblings?: ChooserSibling[];
  /** Show a "Backed by our Tutor Match Guarantee" link to /guarantee — exam-driven subjects only. */
  showGuaranteeLink?: boolean;
}

export const subjectPageContent: Record<string, SubjectPageContent> = {
  // ---------------------------------------------------------------------
  // Chooser / router pages (3)
  // ---------------------------------------------------------------------
  "ap-physics": {
    template: "chooser",
    chooserIntro:
      "\"AP Physics\" no longer refers to a single exam — College Board splits it into AP Physics 1 (algebra-based) and AP Physics C (calculus-based, two separate exams). This page helps you figure out which one you actually need, then routes you to the right subject page.",
    chooserSiblings: [
      { slug: "ap-physics-1", label: "I need AP Physics 1" },
      { slug: "ap-physics-c", label: "I need AP Physics C" },
    ],
    faqs: [
      {
        q: "Is there still just one AP Physics exam?",
        a: "No — College Board retired the single, undifferentiated AP Physics exam in 2014. Today it's split into AP Physics 1 (algebra-based) and AP Physics C (calculus-based, offered as two separate exams: Mechanics, and Electricity & Magnetism).",
      },
      {
        q: "I don't know which one my school offers — how do I find out?",
        a: "Check your course syllabus or ask your teacher which exam your class prepares for — most schools name it explicitly as AP Physics 1 or AP Physics C.",
      },
      {
        q: "Still not sure which one applies to you?",
        a: "Send a request through our general request flow and mention what you know about your course — our team can help confirm which exam applies before matching you with a tutor.",
      },
      {
        q: "Are TutorA's AP Physics tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their specific subject background and experience once you're routed to the AP Physics 1 or C page.",
      },
    ],
  },
  "ap-calculus": {
    template: "chooser",
    chooserIntro:
      "\"AP Calculus\" covers two distinct exams — AB and BC. BC includes everything in AB plus additional topics, so picking the right one matters before you start looking for a tutor. This page compares them and routes you to the right subject page.",
    chooserSiblings: [
      { slug: "ap-calculus-ab", label: "I need AP Calculus AB" },
      { slug: "ap-calculus-bc", label: "I need AP Calculus BC" },
    ],
    faqs: [
      {
        q: "Is AP Calculus BC harder than AB?",
        a: "It covers more material in the same year — series and sequences, and further integration techniques — rather than being conceptually harder topic-by-topic. Think \"more content,\" not \"more difficult per topic.\"",
      },
      {
        q: "Which one does my school offer?",
        a: "Check your course syllabus or ask your teacher — most schools name the exam explicitly as AP Calculus AB or AP Calculus BC.",
      },
      {
        q: "Can I still request a tutor if I'm not sure yet?",
        a: "Yes — use our general request flow and mention what you're currently studying; our team can help confirm which exam applies before matching you.",
      },
    ],
  },
  "algebra": {
    template: "chooser",
    chooserIntro:
      "\"Algebra\" can mean Pre-Algebra, Algebra I, Algebra II, or Advanced Algebra depending on your grade and school. This page helps you figure out which course you're actually in, then routes you to the right subject page.",
    chooserSiblings: [
      { slug: "pre-algebra", label: "I need Pre-Algebra" },
      { slug: "algebra-i", label: "I need Algebra I" },
      { slug: "algebra-ii", label: "I need Algebra II" },
      { slug: "advanced-algebra", label: "I need Advanced Algebra" },
    ],
    faqs: [
      {
        q: "How do I know which Algebra course I'm in?",
        a: "Check your school's course name on your schedule or report card — most schools label it explicitly, such as Algebra I or Algebra II.",
      },
      {
        q: "Can I still request a tutor from this page?",
        a: "Yes — if you're not sure which level applies, use our general request flow and mention what you're currently studying; our team will help match the right level.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Service-hybrid, exam-driven, showGuaranteeLink: true (28)
  // ---------------------------------------------------------------------
  "ap-physics-1": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "AP Physics 1 Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 AP Physics 1 tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "AP Physics 1 is College Board's algebra-based introductory physics exam — no calculus required — covering mechanics, waves, and simple circuits. Since the 2014 exam restructuring, it's the exam most people mean today when they say \"AP Physics.\" A TutorA tutor for this subject is matched to you specifically — most of TutorA's tutors are based in India, and every one is reviewed by our team before being approved to teach — and works with you live rather than through a fixed-cohort class. Pricing is shown before you book, and if a match isn't the right fit we'll rematch you at no extra cost.",
    faqs: [
      {
        q: "What's the difference between AP Physics 1 and AP Physics C?",
        a: "AP Physics 1 is algebra-based and covers mechanics, waves, and circuits at an introductory level. AP Physics C is calculus-based and split into two separate exams — Mechanics, and Electricity & Magnetism — usually taken alongside or after calculus. If your course is calculus-based, see our AP Physics C page instead.",
      },
      {
        q: "Is AP Physics 1 hard?",
        a: "It's consistently one of the lower-pass-rate AP exams nationally, largely because it rewards conceptual reasoning over formula plugging. 1:1 tutoring that focuses on problem-solving process rather than just content review tends to help most.",
      },
      {
        q: "How is AP Physics 1 scored?",
        a: "On a 1–5 scale, combining multiple-choice and free-response sections. A 4 or 5 is typically needed for college credit, though policies vary by school.",
      },
      {
        q: "When should I start AP Physics 1 tutoring?",
        a: "Many students start a few months before the May exam, though ongoing 1:1 support through the course year is common for a subject this conceptually heavy.",
      },
      {
        q: "Are TutorA's AP Physics 1 tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "ap-physics-c": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "AP Physics C Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 AP Physics C tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "AP Physics C is split into two calculus-based exams — Mechanics, and Electricity & Magnetism — typically taken by students concurrently studying or who've already completed AP Calculus. Many engineering-focused college programs specifically prefer AP Physics C credit over AP Physics 1. Every tutor on TutorA who teaches this subject — most based in India — is reviewed by our team before being matched, sessions are live and 1:1 rather than pre-recorded, and pricing is shown up front so there's no guessing before you book.",
    faqs: [
      {
        q: "Do I need calculus before starting AP Physics C?",
        a: "You should be taking calculus concurrently at minimum — the exam uses derivatives and integrals directly, unlike the algebra-based AP Physics 1.",
      },
      {
        q: "Can I take both AP Physics C exams?",
        a: "Yes — Mechanics and Electricity & Magnetism are scored separately, and many students sit both in the same exam sitting.",
      },
      {
        q: "Should I take AP Physics 1 first?",
        a: "Many schools sequence it that way, though it isn't a strict requirement everywhere. Check your school's course sequencing, or see our AP Physics 1 page if that's what applies to you.",
      },
      {
        q: "How is AP Physics C scored?",
        a: "Each of the two exams — Mechanics and E&M — is scored 1–5 independently.",
      },
      {
        q: "Are TutorA's AP Physics C tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "ap-calculus-ab": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    differentiation:
      "AP Calculus AB covers roughly the first two-thirds of a college single-variable calculus sequence: limits, derivatives, and an introduction to integrals. Many colleges grant credit for a qualifying score, though policies vary by institution. On TutorA, tutors teaching this subject are matched to you individually and reviewed by our team beforehand — you're working with a specific tutor in live sessions, not routed to whoever's available. Pricing is shown before you book, and we'll rematch you free of charge if your first tutor isn't the right fit.",
    faqs: [
      {
        q: "What's the difference between AP Calculus AB and BC?",
        a: "BC covers everything in AB plus additional topics — series and sequences, further integration techniques — it's a strict superset, not a separate curriculum. See our AP Calculus BC page if your course covers the fuller syllabus.",
      },
      {
        q: "Is AP Calculus AB enough for college credit?",
        a: "Many colleges grant credit for a qualifying AB score, though policies vary — check your target school's AP credit policy directly.",
      },
      {
        q: "How is AP Calculus AB scored?",
        a: "On a 1–5 scale, combining multiple-choice and free-response sections, the same format as other AP exams.",
      },
    ],
  },
  "ap-calculus-bc": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    differentiation:
      "AP Calculus BC includes everything in the AB curriculum plus series and sequences and additional integration techniques — effectively a full-year college calculus equivalent. Students who take the BC exam also receive an AB sub-score reflecting the AB-equivalent portion of their performance. A TutorA tutor for this subject works with you live and 1:1, is reviewed by our team before being matched, and shows real pricing before you book — no flat platform-wide rate, and a free rematch if the first tutor isn't the right fit.",
    faqs: [
      {
        q: "Is AP Calculus BC harder than AB?",
        a: "It covers more material in the same year rather than being conceptually harder topic-by-topic — more content, not necessarily harder content.",
      },
      {
        q: "Do I get an AB score too if I take BC?",
        a: "Yes — the BC exam reports an AB sub-score alongside the BC score, reflecting the AB-equivalent portion of your performance.",
      },
      {
        q: "Should I start with AB before BC?",
        a: "Many schools sequence AB before BC, though some strong students go straight to BC. See our AP Calculus AB page if that's what your course covers instead.",
      },
    ],
  },
  "ap-chemistry": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "AP Chemistry Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 AP Chemistry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "AP Chemistry is one of the more content-dense AP sciences, pairing quantitative problem-solving with lab-based free-response questions — many college STEM programs specifically look for a 4 or 5 for intro chemistry credit. Because the pace is fast, ongoing 1:1 support through the year tends to help more than a pre-exam cram. Every tutor teaching AP Chemistry on TutorA — most based in India — is reviewed by our team before being matched, works with you live, and shows pricing before you book — never a flat, invented number.",
    faqs: [
      {
        q: "How is AP Chemistry different from a regular high school chemistry course?",
        a: "It moves faster and goes deeper into quantitative reasoning — equilibrium, kinetics, thermodynamics — closer to a college intro-chem pace than a standard course.",
      },
      {
        q: "Is AP Chemistry math-heavy?",
        a: "Yes, relative to other AP sciences — algebra-level math runs throughout, though not calculus.",
      },
      {
        q: "When should I start AP Chemistry tutoring?",
        a: "Given how content-dense the course is, many students benefit from ongoing 1:1 support through the year rather than only a pre-exam cram.",
      },
      {
        q: "What happens if my tutor isn't the right fit?",
        a: "We'll rematch you with a different tutor for the same subject at no extra cost — see our guarantee for the full policy.",
      },
      {
        q: "Are TutorA's AP Chemistry tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "ap-biology": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "AP Biology Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 AP Biology tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "AP Biology weighs data analysis and experimental design alongside content knowledge more heavily than a typical high school biology course, and is frequently used for intro-biology college credit at a score of 4 or 5. A TutorA tutor for this subject is matched to you individually, reviewed by our team before being approved, and works with you in live sessions rather than a fixed video curriculum. Pricing is shown before you book, and our guarantee covers a free rematch if your first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Is AP Biology mostly memorization?",
        a: "Less than it used to be — the current exam weights data-analysis and experimental-design questions heavily alongside content recall.",
      },
      {
        q: "How is AP Biology scored?",
        a: "On a 1–5 scale, combining multiple-choice and free-response sections.",
      },
      {
        q: "Does AP Biology help with pre-med prep?",
        a: "It's a common early building block for students considering pre-med tracks, though it isn't a substitute for college-level biology coursework.",
      },
      { q: "Are TutorA's AP Biology tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "gcse-chemistry": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "GCSE Chemistry Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 GCSE Chemistry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "GCSEs are UK qualifications typically taken around ages 14–16 (Years 10–11), graded on the 9–1 scale — and GCSE Chemistry has its own dedicated tutor ecosystem, entirely separate from IGCSE and A-Level Chemistry. On TutorA, tutors teaching this subject — most based in India — are matched to you directly, reviewed by our team beforehand, and work with you live rather than through pre-recorded content. Pricing is shown before booking, and our guarantee covers a free rematch if your first tutor isn't the right fit.",
    faqs: [
      {
        q: "What's the difference between GCSE and IGCSE Chemistry?",
        a: "IGCSE is the internationally-administered variant of the same qualification level, run by boards like Cambridge or Edexcel International, with some syllabus differences — see our IGCSE Chemistry page if that's what your school follows.",
      },
      {
        q: "What age is GCSE Chemistry for?",
        a: "Typically Year 10–11 students, around ages 14–16, in the UK system.",
      },
      {
        q: "How is GCSE Chemistry graded?",
        a: "On the 9–1 numerical scale, with 9 being the highest.",
      },
      {
        q: "Does GCSE Chemistry tutoring cover both Combined and Triple Science routes?",
        a: "Coverage depends on the tutor matched to you — mention which route you're on when requesting a tutor so we match accordingly.",
      },
      {
        q: "Are TutorA's GCSE Chemistry tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "gcse-physics": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "GCSE Physics Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 GCSE Physics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "GCSE Physics sits in its own dedicated search and tutoring ecosystem, distinct from both IGCSE and A-Level Physics — the three curricula show essentially no overlap in practice. Tutors on TutorA who teach GCSE Physics — most based in India — are reviewed by our team before being matched, work with you live and 1:1, and show real pricing before you book rather than a flat, invented number. If your first match isn't the right fit, our guarantee covers a free rematch.",
    faqs: [
      {
        q: "What's the difference between GCSE and IGCSE Physics?",
        a: "Different administering exam boards — UK domestic boards vs. Cambridge International or Edexcel International — with some syllabus differences, though broadly comparable in level. See our IGCSE Physics page if that applies to you.",
      },
      {
        q: "Is GCSE Physics Combined or Triple Science?",
        a: "Both routes exist — mention which one your school follows when requesting a tutor so we match you accordingly.",
      },
      {
        q: "What topics does GCSE Physics cover?",
        a: "Forces, energy, waves, electricity, and magnetism, plus additional depth topics for Triple Science — the exact syllabus depends on your exam board.",
      },
      {
        q: "How is GCSE Physics graded?",
        a: "On the 9–1 numerical scale.",
      },
      {
        q: "Are TutorA's GCSE Physics tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "gcse-maths": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "GCSE Maths Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 GCSE Maths tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "GCSE Maths shows essentially zero overlap with IGCSE Maths in practice — two genuinely separate provider ecosystems, not one artificially split page — so this page can speak directly to the UK domestic GCSE syllabus without hedging. A TutorA tutor for GCSE Maths is matched to you individually and reviewed by our team beforehand, working with you live rather than through fixed video content. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Foundation or Higher tier — does it matter for tutoring?",
        a: "Yes — mention which tier you're sitting when requesting a tutor so sessions target the right content and grade boundaries.",
      },
      {
        q: "What's the difference between GCSE Maths and IGCSE Maths?",
        a: "They're graded and administered by different exam boards with essentially no overlap between them — see our IGCSE Maths page if that's what your school follows instead.",
      },
      {
        q: "How is GCSE Maths graded?",
        a: "On the 9–1 numerical scale, same as other GCSE subjects.",
      },
      {
        q: "When should GCSE Maths tutoring start?",
        a: "Many students start well before Year 11 to build a strong Year 10 foundation, though exam-focused tutoring in the final months is also common.",
      },
      { q: "Are TutorA's GCSE Maths tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "igcse-chemistry": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "IGCSE Chemistry Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 IGCSE Chemistry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "IGCSE (International GCSE) is the internationally-administered equivalent of GCSE, run by boards like Cambridge International and Edexcel International and commonly taken at international schools outside the UK — with its own dedicated tutor ecosystem, separate from both GCSE and A-Level Chemistry. Tutors teaching IGCSE Chemistry on TutorA — most based in India — are reviewed by our team before being matched and work with you live and 1:1. Pricing is shown before you book, and our guarantee covers a free rematch if the first tutor isn't the right fit.",
    faqs: [
      {
        q: "What's the difference between IGCSE and GCSE Chemistry?",
        a: "IGCSE is the internationally-administered version, run by different exam boards with some syllabus differences. See our GCSE Chemistry page if you're on the UK domestic syllabus instead.",
      },
      {
        q: "Which exam board does TutorA cover?",
        a: "Coverage depends on the tutor matched to you — mention your exam board, such as Cambridge or Edexcel, when requesting a tutor.",
      },
      {
        q: "Is IGCSE Chemistry harder than GCSE Chemistry?",
        a: "They're broadly comparable in level and difficulty — the differences are mainly in syllabus structure and assessment style.",
      },
      {
        q: "Are TutorA's IGCSE Chemistry tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "igcse-physics": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "IGCSE Physics Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 IGCSE Physics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "IGCSE Physics is the internationally-administered equivalent of GCSE Physics, run by boards like Cambridge International and Edexcel International, and shows no meaningful overlap with either GCSE or A-Level Physics in practice — a genuinely distinct subject worth its own tutor. On TutorA, tutors for this subject — most based in India — are matched to you directly and reviewed by our team beforehand, working with you live rather than through pre-recorded content. Pricing is shown before booking, and our guarantee covers a free rematch if your first tutor isn't the right fit.",
    faqs: [
      {
        q: "What's the difference between IGCSE and GCSE Physics?",
        a: "Different administering exam boards with some syllabus differences, though broadly comparable in level. See our GCSE Physics page if you're on the UK domestic syllabus.",
      },
      {
        q: "Which topics does IGCSE Physics cover?",
        a: "Forces, energy, waves, electricity, and magnetism — the precise syllabus depends on your exam board, so mention it when requesting a tutor.",
      },
      {
        q: "Is IGCSE Physics good preparation for A-Level Physics?",
        a: "Yes — it's a common and appropriate stepping stone into A-Level or IB Physics.",
      },
      {
        q: "Are TutorA's IGCSE Physics tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "igcse-maths": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "IGCSE Maths Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 IGCSE Maths tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "IGCSE Maths is the internationally-administered equivalent of GCSE Maths and, in practice, shows zero overlap with GCSE Maths — a fully independent syllabus and tutor ecosystem, not a near-duplicate of the UK domestic exam. TutorA tutors teaching IGCSE Maths are reviewed by our team before being matched, work with you live and 1:1, and show real pricing before you book. If your first match isn't right, our guarantee covers a free rematch. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Is IGCSE Maths the same as GCSE Maths?",
        a: "No — different exam boards and, in practice, an entirely separate provider ecosystem. See our GCSE Maths page if you're on the UK domestic syllabus instead.",
      },
      {
        q: "Core or Extended tier?",
        a: "IGCSE Maths typically offers Core and Extended tiers — mention which one you're on when requesting a tutor.",
      },
      {
        q: "Which exam board does TutorA cover?",
        a: "Coverage depends on the tutor matched to you — mention your board, such as Cambridge or Edexcel, when requesting a tutor.",
      },
      { q: "Are TutorA's IGCSE Maths tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "a-level-chemistry": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "A-Level Chemistry Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 A-Level Chemistry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "A-Levels are UK qualifications typically studied over two years (Years 12–13, ages 16–18) and graded A*–E, widely used for university admissions — and A-Level Chemistry shows zero overlap with either GCSE or IGCSE Chemistry, the cleanest confirmation of any subject family we researched. A TutorA tutor for A-Level Chemistry is matched to you individually — most of TutorA's tutors are based in India — and reviewed by our team beforehand, working with you live rather than through fixed video content. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't right.",
    faqs: [
      {
        q: "What grade do I need in A-Level Chemistry for university?",
        a: "Requirements vary by course and institution — check your target university's published entry requirements directly rather than relying on a general rule.",
      },
      {
        q: "How is A-Level Chemistry different from GCSE Chemistry?",
        a: "It's a two-year, significantly more advanced course used for university admissions, with more mathematical and mechanistic depth than GCSE.",
      },
      {
        q: "When should A-Level Chemistry tutoring start?",
        a: "Many students begin at the start of Year 12 to build a strong foundation before exam-focused Year 13 sessions.",
      },
      {
        q: "Does A-Level Chemistry tutoring help with practical or coursework elements?",
        a: "Coverage depends on the tutor matched to you — mention any practical endorsement or coursework component when requesting a tutor.",
      },
      {
        q: "Are TutorA's A-Level Chemistry tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "a-level-physics": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "A-Level Physics Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 A-Level Physics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "A-Level Physics is a two-year UK qualification (Years 12–13, ages 16–18) that shows zero overlap with either GCSE or IGCSE Physics — a genuinely standalone subject, not a harder version of the same page. Tutors teaching A-Level Physics on TutorA — most based in India — are reviewed by our team before being matched and work with you live and 1:1. Pricing is shown before you book, and our guarantee covers a free rematch if your first tutor isn't the right fit.",
    faqs: [
      {
        q: "How is A-Level Physics different from GCSE Physics?",
        a: "It's a two-year, significantly more mathematical course covering topics like fields, particle physics, and further mechanics, used for university admissions.",
      },
      {
        q: "Is A-Level Physics required for engineering degrees?",
        a: "It's commonly required or strongly preferred by UK engineering and physics degree programs — check your target course's published requirements.",
      },
      {
        q: "Does A-Level Physics tutoring cover practical endorsement?",
        a: "Coverage depends on the tutor matched to you — mention any practical component when requesting a tutor.",
      },
      {
        q: "Are TutorA's A-Level Physics tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "a-level-maths": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "A-Level Maths Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 A-Level Maths tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "A-Level Maths is a two-year UK qualification (Years 12–13) combining pure maths, statistics, and mechanics as one qualification, graded A*–E. Many students also take A-Level Further Maths alongside it for additional depth. A TutorA tutor for A-Level Maths is matched to you individually, reviewed by our team beforehand, and works with you live rather than through pre-recorded content. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "What's the difference between A-Level Maths and Further Maths?",
        a: "Further Maths is a separate, additional qualification for strong maths students, covering more advanced pure, statistics, and mechanics content — see our A-Level Further Maths page if you're taking both.",
      },
      {
        q: "What topics does A-Level Maths cover?",
        a: "Pure mathematics, statistics, and mechanics, combined within a single qualification — the exact split depends on your exam board.",
      },
      {
        q: "Do I need A-Level Maths for a STEM degree?",
        a: "Many STEM degree programs require or strongly prefer it — check your target course's published entry requirements.",
      },
      {
        q: "When should A-Level Maths tutoring start?",
        a: "Many students start at the beginning of Year 12 given how cumulative the subject is.",
      },
      { q: "Are TutorA's A-Level Maths tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "gcse-biology": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "GCSE Biology Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 GCSE Biology tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "GCSE Biology has its own dedicated tutor ecosystem, genuinely distinct from GCSE Science (Combined Science) — it can also be studied as a standalone Triple Science subject depending on your school. On TutorA, tutors teaching GCSE Biology are reviewed by our team before being matched and work with you live and 1:1. Pricing is shown before booking, and if your first tutor isn't the right fit, our guarantee covers a free rematch. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Is GCSE Biology the same as GCSE Science?",
        a: "No — GCSE Science (Combined Science) bundles Biology, Chemistry, and Physics into one qualification, while GCSE Biology can also be studied as a standalone Triple Science subject. See our GCSE Science page if you're on the combined route.",
      },
      {
        q: "Combined or Triple Science?",
        a: "Mention which route your school follows when requesting a tutor so sessions target the right depth and content.",
      },
      {
        q: "How is GCSE Biology graded?",
        a: "On the 9–1 numerical scale.",
      },
      { q: "Are TutorA's GCSE Biology tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "gcse-science": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "GCSE Combined Science Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 GCSE Combined Science tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "GCSE Science (Combined Science) bundles Biology, Chemistry, and Physics into a single qualification, usually worth two GCSEs and awarded as a double grade — a genuinely different product from taking GCSE Biology on its own via the Triple Science route. A TutorA tutor for GCSE Science is matched to you individually and reviewed by our team beforehand. Pricing is shown before booking, and our guarantee covers a free rematch if your first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Is GCSE Science the same as GCSE Biology?",
        a: "No — GCSE Science (Combined Science) covers Biology, Chemistry, and Physics together as one qualification; GCSE Biology alone is part of the separate Triple Science route. See our GCSE Biology page if that's what your school follows.",
      },
      {
        q: "How many GCSEs is Combined Science worth?",
        a: "Typically counted as two GCSEs, awarded as a double grade.",
      },
      {
        q: "Which topics does GCSE Combined Science cover?",
        a: "A condensed version of Biology, Chemistry, and Physics content compared to the Triple Science route — the exact syllabus depends on your exam board.",
      },
      { q: "Are TutorA's GCSE Combined Science tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "gcse-english": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "GCSE English Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 GCSE English tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "GCSE English is typically split into GCSE English Language and GCSE English Literature, sometimes tutored together and sometimes separately depending on what a student needs. Tutors teaching GCSE English on TutorA are reviewed by our team before being matched and work with you live rather than through a fixed video curriculum. Pricing is shown before you book, and our guarantee covers a free rematch if your first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Does GCSE English cover Language and Literature both?",
        a: "Coverage depends on the tutor matched to you — mention whether you need Language, Literature, or both when requesting a tutor.",
      },
      {
        q: "How is GCSE English graded?",
        a: "On the 9–1 numerical scale, same as other GCSE subjects.",
      },
      {
        q: "What set texts does GCSE English Literature cover?",
        a: "This depends on your exam board and school — mention your set texts when requesting a tutor so sessions target the right material.",
      },
      { q: "Are TutorA's GCSE English tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "a-level-further-maths": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "A-Level Further Maths Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 A-Level Further Maths tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "A-Level Further Maths is a separate, additional qualification typically taken alongside A-Level Maths, not instead of it — covering more advanced pure, statistics, and mechanics content for students continuing beyond the standard course. A TutorA tutor for Further Maths is matched to you individually, reviewed by our team beforehand, and works with you live and 1:1. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Do I need A-Level Maths before taking Further Maths?",
        a: "Yes — Further Maths is studied alongside or after A-Level Maths, not as a replacement for it.",
      },
      {
        q: "Is Further Maths necessary for a maths degree?",
        a: "Many top maths and some physics or engineering degree programs prefer or require it — check your target course's published requirements.",
      },
      {
        q: "What does Further Maths add beyond standard A-Level Maths?",
        a: "More advanced pure mathematics topics plus further statistics and mechanics content, depending on your exam board's optional modules.",
      },
      { q: "Are TutorA's A-Level Further Maths tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "ib-math": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "IB Mathematics Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 IB Mathematics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "IB Diploma Math is offered in two strands — Analysis & Approaches (AA) and Applications & Interpretation (AI) — each available at Higher Level (HL) or Standard Level (SL), with a fully separate tutor ecosystem from IB Physics or Chemistry. A TutorA tutor for IB Math is matched to you individually and reviewed by our team beforehand, working with you live rather than through pre-recorded content. Pricing is shown before booking, and our guarantee covers a free rematch if your first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "What's the difference between IB Math AA and AI?",
        a: "AA (Analysis & Approaches) is more traditionally calculus and algebra-focused; AI (Applications & Interpretation) emphasizes real-world modeling and technology use. Mention which one your course covers when requesting a tutor.",
      },
      {
        q: "HL or SL — does it matter for tutoring?",
        a: "Yes — mention your level, Higher or Standard, when requesting a tutor so sessions target the right depth.",
      },
      {
        q: "How is IB Math scored?",
        a: "As part of the overall IB Diploma's 45-point scale, with an internal assessment (exploration) alongside external exam components.",
      },
      {
        q: "Do I need IB Math for university?",
        a: "Requirements vary by course and institution, and by whether AA or AI is required for specific degree programs — check your target university's published entry requirements.",
      },
      { q: "Are TutorA's IB Mathematics tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "ib-physics": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "IB Physics Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 IB Physics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "IB Physics is offered at Higher Level (HL) or Standard Level (SL), with an Internal Assessment (IA) component alongside external exams. Many IB science students take Physics and Chemistry together, so we cross-link the two — though each keeps its own dedicated tutor page. A TutorA tutor for IB Physics — most based in India — is reviewed by our team before being matched and works with you live and 1:1. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't the right fit.",
    faqs: [
      {
        q: "HL or SL — does it matter?",
        a: "Yes — mention your level when requesting a tutor so sessions target the right depth and IA expectations.",
      },
      {
        q: "Does IB Physics tutoring help with the Internal Assessment (IA)?",
        a: "Coverage depends on the tutor matched to you — mention that you need IA support specifically when requesting a tutor.",
      },
      {
        q: "Am I also taking IB Chemistry?",
        a: "Many IB science students take both — see our IB Chemistry page too.",
      },
      {
        q: "Are TutorA's IB Physics tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "ib-chemistry": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "IB Chemistry Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride:
      "1:1 IB Chemistry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "IB Chemistry is offered at Higher Level (HL) or Standard Level (SL), with an Internal Assessment (IA) component, and is commonly taken alongside IB Physics by the same students. Tutors teaching IB Chemistry on TutorA — most based in India — are reviewed by our team before being matched and work with you live rather than through fixed video content. Pricing is shown before you book, and our guarantee covers a free rematch if your first tutor isn't the right fit.",
    faqs: [
      {
        q: "HL or SL — does it matter?",
        a: "Yes — mention your level when requesting a tutor.",
      },
      {
        q: "Does IB Chemistry tutoring help with the Internal Assessment (IA)?",
        a: "Coverage depends on the tutor matched to you — mention that you need IA support when requesting a tutor.",
      },
      {
        q: "Am I also taking IB Physics?",
        a: "Many IB science students take both — see our IB Physics page too.",
      },
      {
        q: "Are TutorA's IB Chemistry tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "international-baccalaureate-ib": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    differentiation:
      "The IB Diploma Programme is a two-year pre-university curriculum, typically for ages 16–19, combining six subject groups at Higher or Standard Level with a core of Theory of Knowledge, the Extended Essay, and CAS, scored out of 45 points. TutorA currently has dedicated tutor pages for IB Math, IB Physics, and IB Chemistry — each matched, reviewed, and live 1:1. If you need a different IB Diploma subject, our team can still match you through the general request flow, and our guarantee covers a free rematch if a tutor isn't the right fit.",
    faqs: [
      {
        q: "What is the IB Diploma Programme?",
        a: "A two-year pre-university curriculum, typically ages 16–19, combining six subject groups at Higher or Standard Level with a core of Theory of Knowledge, the Extended Essay, and CAS (Creativity, Activity, Service), scored out of 45 points.",
      },
      {
        q: "Which IB subjects does TutorA currently cover with a dedicated page?",
        a: "IB Math, IB Physics, and IB Chemistry currently have dedicated subject pages. Other IB Diploma subjects can still be requested through our general request flow.",
      },
      {
        q: "HL or SL — does it matter?",
        a: "Yes — mention your level, Higher or Standard, when requesting a tutor for any IB subject.",
      },
      {
        q: "What if TutorA doesn't have a dedicated page for my IB subject yet?",
        a: "Send a request through our general request flow — our team will still try to match you with a suitable tutor.",
      },
    ],
  },
  "sat-math": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "SAT Math Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 SAT Math tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "The SAT Math section is scored as part of the overall 400–1600 SAT scale, and the tutors who specialize in it tend to be math-focused specialists rather than the broad test-prep brands behind full-SAT courses. A TutorA tutor for SAT Math is matched to you individually, reviewed by our team beforehand, and works with you live and 1:1 on the sections you actually need. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "How is SAT Math scored?",
        a: "As part of the overall 400–1600 SAT composite, combining with the Reading & Writing section.",
      },
      {
        q: "Should I focus on SAT Math or the full SAT?",
        a: "If Math is your specific weak area, section-focused tutoring can be more efficient than generic full-test prep — see our SAT course page for full-test coverage.",
      },
      {
        q: "What's the difference between SAT Math and ACT Math tutoring?",
        a: "Content overlaps significantly, but format and pacing differ — see our ACT Math page if you're deciding between the two tests.",
      },
      { q: "Are TutorA's SAT Math tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "sat-english": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "SAT Reading & Writing Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 SAT Reading & Writing tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "The SAT's Reading & Writing section covers reading comprehension, grammar and editing, and evidence-based writing skills, combined into a single scored section on the current SAT. If Reading & Writing is your specific weak area, a TutorA tutor matched to that section specifically can be more efficient than generic full-test prep. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book — with a free rematch if your first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "What does the SAT English/Reading & Writing section cover?",
        a: "Reading comprehension, grammar and editing, and evidence-based writing skills, combined into a single scored section on the current SAT.",
      },
      {
        q: "Should I focus on SAT English or the full SAT?",
        a: "If Reading & Writing is your specific weak area, section-focused tutoring can be efficient — see our SAT course page for full-test coverage.",
      },
      {
        q: "How is SAT English scored?",
        a: "As part of the overall 400–1600 SAT composite.",
      },
      { q: "Are TutorA's SAT Reading & Writing tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "act-math": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "ACT Math Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 ACT Math tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "The ACT Math section is scored on the 1–36 ACT scale and overlaps significantly with SAT Math content, though the ACT moves at a faster pace with more questions in less time and includes some trigonometry. A TutorA tutor for ACT Math is matched to you individually and reviewed by our team beforehand, working with you live rather than through fixed video content. Pricing is shown before booking, and our guarantee covers a free rematch if your first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "How is ACT Math different from SAT Math?",
        a: "Content overlaps significantly, but the ACT Math section includes some trigonometry and moves at a faster pace with more questions in less time. See our SAT Math page if you're deciding between the two tests.",
      },
      {
        q: "How is ACT Math scored?",
        a: "On a 1–36 scale, as part of the overall ACT composite score.",
      },
      {
        q: "Should I take the SAT or ACT?",
        a: "It depends on your strengths and target schools' preferences — many students take a practice test of each to decide. TutorA tutors can help with either.",
      },
      { q: "Are TutorA's ACT Math tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "cambridge-english": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "Cambridge English Exam Tutor (FCE/CAE/CPE)",
    metaDescriptionOverride: "1:1 Cambridge English Exam tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Cambridge English refers to the Cambridge Assessment English exam suite — B2 First (FCE), C1 Advanced (CAE), and C2 Proficiency (CPE) — internationally recognized English-proficiency qualifications, not related to Cambridge University admissions or the city of Cambridge. Unlike IELTS or TOEFL, these qualifications don't expire once earned. A TutorA tutor for this exam suite is matched to you individually, reviewed by our team beforehand, and works with you live and 1:1. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "What is Cambridge English (FCE/CAE/CPE)?",
        a: "It's the Cambridge Assessment English exam suite — B2 First (FCE), C1 Advanced (CAE), and C2 Proficiency (CPE) — internationally recognized English-proficiency qualifications, not related to Cambridge University admissions or the city of Cambridge.",
      },
      {
        q: "What's the difference between FCE, CAE, and CPE?",
        a: "They represent increasing proficiency levels: FCE is B2 (upper-intermediate), CAE is C1 (advanced), and CPE is C2 (proficient, near-native), on the Common European Framework (CEFR) scale.",
      },
      {
        q: "How is Cambridge English different from IELTS?",
        a: "Different exam bodies and formats, though both serve similar purposes — proving English proficiency for study, work, or immigration. See our IELTS page if that's the specific exam you need instead.",
      },
      {
        q: "Do these exams expire?",
        a: "No — Cambridge English qualifications don't expire, unlike IELTS or TOEFL scores, which are typically valid for two years.",
      },
      { q: "Are TutorA's Cambridge English Exam tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "ielts": {
    template: "service-hybrid",
    showGuaranteeLink: true,
    metaTitleOverride: "IELTS Preparation Tutor — India-Based, Team-Vetted",
    metaDescriptionOverride: "1:1 IELTS Preparation tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "IELTS (International English Language Testing System) is scored on a 9-band scale across Listening, Reading, Writing, and Speaking, with two versions — Academic (for university admission) and General Training (for immigration or work) — testing the same skills with different task content. A TutorA tutor for IELTS is matched to you individually and reviewed by our team beforehand, working with you live across all four skills rather than through a fixed video course. Pricing is shown before booking, and our guarantee covers a free rematch if the first tutor isn't the right fit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Academic or General Training IELTS?",
        a: "Mention which version you need when requesting a tutor — Academic is for university admission, General Training is typically for immigration or work purposes.",
      },
      {
        q: "How is IELTS scored?",
        a: "On a 9-band scale for each of the four skills — Listening, Reading, Writing, Speaking — plus an overall band score.",
      },
      {
        q: "How long is an IELTS score valid?",
        a: "Typically two years, though this can vary by the receiving institution — confirm with whoever requires your score.",
      },
      {
        q: "What's the difference between IELTS and Cambridge English (FCE/CAE/CPE)?",
        a: "Different exam bodies and formats, though both prove English proficiency — see our Cambridge English page if that's the specific qualification you need instead.",
      },
      { q: "Are TutorA's IELTS Preparation tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },

  // ---------------------------------------------------------------------
  // Practical-mentor: 6 programming subjects, no guarantee link (2)
  // ---------------------------------------------------------------------
  "javascript": {
    template: "practical-mentor",
    differentiation:
      "JavaScript has no shortage of free, self-paced options — tutorial sites, video courses, browser-based exercises. Those work well for typing along with a lesson, but they can't tell you why your specific code is behaving differently than the example. A TutorA JavaScript tutor reviews your actual project or assignment in a live 1:1 session and adjusts explanations to where you're actually stuck, instead of moving you through a fixed track. Every tutor is reviewed by TutorA's team before being matched, and pricing is shown up front. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "JavaScript for kids?",
        a: "TutorA can match younger learners with a patient JavaScript tutor, though our Scratch Programming and Python Basics pages may be a gentler starting point for absolute beginners.",
      },
      {
        q: "Is JavaScript hard to learn?",
        a: "It has a low barrier to entry since it runs in any browser, but some genuinely tricky concepts — async code, closures — trip people up. A live tutor tends to help most with those specific sticking points, which is where free tutorials fall short.",
      },
      {
        q: "Do I get a certificate after JavaScript tutoring?",
        a: "No — TutorA sessions are live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      { q: "Are TutorA's JavaScript tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "python": {
    template: "practical-mentor",
    differentiation:
      "Python has plenty of free tutorials and self-paced courses online, which are fine for a first pass at syntax but can't debug the actual error on your screen or explain why your specific script isn't working. This page is for general-audience learners — teens and adults; for younger kids just starting out, our Python Basics page serves a different, kids-focused audience. A TutorA Python tutor works with your real code in live 1:1 sessions — most tutors are based in India, and each one's profile shows their specific programming background — and every tutor is reviewed by our team before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "What's the difference between this page and Python Basics?",
        a: "This page serves general or adult learners, while Python Basics is written for a kids-coding audience with different trust signals. See our Python Basics page if you're looking for a younger learner.",
      },
      {
        q: "Is Python good for beginners?",
        a: "It's commonly recommended as a first language for its readable syntax — a live tutor helps most with your specific project or roadblock, which is where free tutorials tend to fall short.",
      },
      {
        q: "Do I get a certificate after completing Python tutoring?",
        a: "No. TutorA sessions are live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "Are TutorA's Python tutors based in India?",
        a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book.",
      },
    ],
  },
  "c": {
    template: "practical-mentor",
    differentiation:
      "Free tutorials cover the basics of C++ well, but they can't look at your actual code and explain why your specific memory-management bug is happening. A TutorA C++ tutor works with your real project or assignment in live 1:1 sessions — useful whether you're in an intro course, tackling data structures, or debugging a systems-programming assignment. Every tutor is reviewed by TutorA's team before being matched, with pricing shown before you book rather than folded into a subscription. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Is C++ harder than Python or JavaScript?",
        a: "It generally has a steeper learning curve — manual memory management, more verbose syntax — which is exactly where live 1:1 debugging help tends to matter more than a static tutorial.",
      },
      {
        q: "Do I need C++ for a computer science degree?",
        a: "Many CS programs include it, especially for data structures and systems courses, though requirements vary by school.",
      },
      {
        q: "Do I get a certificate after C++ tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced course, so there's no certificate of completion.",
      },
      { q: "Are TutorA's C++ tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "sql": {
    template: "practical-mentor",
    differentiation:
      "SQL tutorials are everywhere for free, and structured courses can walk you through the syntax — but they can't look at your actual query and your actual database schema and explain why a join isn't returning what you expect. A TutorA SQL tutor works with your real queries in live 1:1 sessions, whether you're learning fundamentals, prepping for a data-analyst interview, or debugging a specific problem. Every tutor is reviewed by TutorA before being matched, and pricing is shown before you book. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Is SQL good for beginners in tech?",
        a: "Yes — it's widely considered one of the more approachable entry points into data or tech roles, though writing correct, efficient queries against real datasets is where live 1:1 help tends to matter most.",
      },
      {
        q: "Do you cover a specific database, like MySQL or PostgreSQL?",
        a: "Coverage depends on the tutor matched to you — mention your specific database or platform when requesting a tutor.",
      },
      {
        q: "Is there a certificate for completing SQL tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion.",
      },
      { q: "Are TutorA's SQL tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "java": {
    template: "practical-mentor",
    differentiation:
      "Java has long-established free tutorials and self-paced tracks — fine for a first pass at syntax, but they can't debug the actual compiler error on your screen or explain why your class isn't behaving as expected. A TutorA Java tutor works through your real code with you in live 1:1 sessions, whether you're in a school course, working toward AP Computer Science A, or prepping for technical interviews. Every tutor is reviewed before being matched, and pricing is shown up front. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Is Java a good first programming language?",
        a: "It's commonly taught in schools, including AP Computer Science A, partly because its strict structure helps build good habits early — a live tutor can help most with debugging your specific errors.",
      },
      {
        q: "Does Java tutoring cover AP Computer Science A?",
        a: "Java is the language AP CS A is taught in — mention if you need AP-specific pacing when requesting a tutor, or see our Computer Science page for broader coverage.",
      },
      {
        q: "Do I need Java installed already, or will my tutor help with setup?",
        a: "Your tutor can help you get your development environment set up as part of your sessions if you haven't already.",
      },
      { q: "Are TutorA's Java tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "html": {
    template: "practical-mentor",
    differentiation:
      "HTML is one of the most thoroughly documented topics online for free, which makes this the weakest commercial tutor-marketplace category in our whole catalog — most people genuinely can learn it from free tutorials alone. What a live 1:1 tutor adds isn't better content, it's someone who can look at your actual page and answer your specific stuck point fast. HTML and CSS are almost always learned together — mention if you want both covered when requesting a tutor. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Do I need to learn CSS too?",
        a: "HTML and CSS are almost always learned together — mention if you want both covered when requesting a tutor, and see our full HTML & CSS course for combined coverage.",
      },
      {
        q: "Is HTML hard to learn?",
        a: "It's one of the more approachable starting points in web development. A live tutor's real value here is answering your specific stuck point fast, since free tutorials dominate this space so thoroughly.",
      },
      {
        q: "Is there a certificate for HTML tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      { q: "Are TutorA's HTML & CSS tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },

  // ---------------------------------------------------------------------
  // Informational: ai-basics (1)
  // ---------------------------------------------------------------------
  "ai-basics": {
    template: "informational",
    differentiation:
      "AI Basics means practical, beginner-level understanding of how AI and machine learning tools actually work — not a computer-science degree topic, and not the same as our more advanced AI & Machine Learning course for students ready to go further. This is a newer subject area for TutorA, and honestly a newer category for 1:1 tutoring generally — most of what's out there is blogs and tutorials rather than tutor marketplaces. Because the field moves quickly, a live tutor who can answer current questions is arguably more useful here than a static course. Coverage may be more limited than for long-established subjects, but if you're curious about learning AI basics 1:1, tell us what you're trying to understand and we'll do our best to match you. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Do I need a technical background to learn AI Basics?",
        a: "No — this subject is aimed at practical, beginner-level understanding of how AI and machine learning tools work, not a computer science degree topic.",
      },
      {
        q: "What's the difference between AI Basics and AI & Machine Learning (Advanced)?",
        a: "AI Basics is the beginner-friendly entry point; our AI & Machine Learning (Advanced) course covers deeper technical ML content for students ready to go further.",
      },
      {
        q: "Is 1:1 tutoring available for AI topics?",
        a: "Yes — though this is a newer subject area for TutorA, and coverage may be more limited than for long-established subjects. Tell us what you're trying to understand and we'll do our best to match you.",
      },
      { q: "Are TutorA's Artificial Intelligence Basics tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: General Academic homework-help cluster (20)
  // ---------------------------------------------------------------------
  "astronomy": {
    template: "standard",
    metaDescriptionOverride: "1:1 Astronomy tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Astronomy sits alongside a handful of large homework-help platforms — Tutor.com, Princeton Review, UPchieve, Wyzant — each of which gives astronomy its own dedicated page rather than a shared listing. TutorA does the same, but goes further: instead of routing you to whoever's online, you're matched with a specific tutor reviewed by our team beforehand. Sessions are live and 1:1, positioned for All Levels, and pricing is shown before you book rather than buried in a subscription. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Astronomy tutoring available for all grade levels?", a: "This subject page is positioned for All Levels — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Astronomy tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can an Astronomy tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Astronomy tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "genetics": {
    template: "standard",
    metaDescriptionOverride: "1:1 Genetics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Homework-help aggregators like Tutor.com, Princeton Review, and UPchieve route you to whichever tutor happens to be online. A TutorA Genetics tutor is different — matched to you specifically, reviewed by our team before being approved, and working with you live rather than through a queue. This subject is positioned for All Levels, and pricing is shown up front before you request a session. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Genetics tutoring available for all grade levels?", a: "This subject page is positioned for All Levels — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Genetics tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Genetics tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Genetics tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "human-anatomy": {
    template: "standard",
    metaDescriptionOverride: "1:1 Human Anatomy tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Human Anatomy tutoring on TutorA means live, 1:1 sessions with a tutor matched to you and reviewed by our team beforehand — not a routed queue like the larger homework-help platforms (Tutor.com, Princeton Review, UPchieve, Wyzant, Varsity Tutors), and not a fixed video curriculum either. This page is positioned for All Levels. Pricing is shown before you book, whether you need ongoing support or help with a specific unit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Human Anatomy tutoring available for all grade levels?", a: "This subject page is positioned for All Levels — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Human Anatomy tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Human Anatomy tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Human Anatomy tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "calculus": {
    template: "standard",
    metaDescriptionOverride: "1:1 Calculus tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Every major homework-help platform — Tutor.com, Princeton Review, UPchieve, Wyzant — gives Calculus its own dedicated page, and TutorA does too, with one real difference: you're matched to a specific, reviewed tutor rather than whoever's available when you log in. Sessions are live and 1:1, this page is positioned for Grade 11–College, and pricing is shown before booking, never a flat invented rate. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Calculus tutoring available for all grade levels?", a: "This subject page is positioned for Grade 11–College — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Calculus tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Calculus tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Calculus tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "physics": {
    template: "standard",
    metaDescriptionOverride:
      "1:1 Physics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Physics sits alongside a handful of large homework-help platforms — Tutor.com, Princeton Review, UPchieve, Wyzant — each of which gives Physics its own dedicated page rather than a shared listing. TutorA does the same, but goes further: instead of routing you to whoever's online, you're matched with a specific tutor — most based in India — reviewed by our team beforehand. Sessions are live and 1:1, positioned for Grades 9–12, and pricing is shown before you book rather than buried in a subscription.",
    faqs: [
      { q: "Is Physics tutoring available for all grade levels?", a: "This subject page is positioned for Grades 9–12 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Physics tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Physics tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Physics tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "mathematics": {
    template: "standard",
    metaDescriptionOverride: "1:1 Mathematics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Homework-help aggregators like Tutor.com, Princeton Review, and UPchieve route you to whichever tutor happens to be online. A TutorA Mathematics tutor is different — matched to you specifically, reviewed by our team before being approved, and working with you live rather than through a queue. This subject is positioned for All Levels, and pricing is shown up front before you request a session. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Mathematics tutoring available for all grade levels?", a: "This subject page is positioned for All Levels — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Mathematics tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Mathematics tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Mathematics tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "mechanics": {
    template: "standard",
    differentiation:
      "Mechanics tutoring on TutorA means live, 1:1 sessions with a tutor matched to you and reviewed by our team beforehand — not a routed queue like the larger homework-help platforms (Tutor.com, Princeton Review, UPchieve, Wyzant, Varsity Tutors), and not a fixed video curriculum either. This page is positioned for All Levels. Pricing is shown before you book, whether you need ongoing support or help with a specific unit.",
    faqs: [
      { q: "Is Mechanics tutoring available for all grade levels?", a: "This subject page is positioned for All Levels — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Mechanics tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Mechanics tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
    ],
  },
  "organic-chemistry": {
    template: "standard",
    metaDescriptionOverride:
      "1:1 Organic Chemistry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Every major homework-help platform — Tutor.com, Princeton Review, UPchieve, Wyzant — gives Organic Chemistry its own dedicated page, and TutorA does too, with one real difference: you're matched to a specific, reviewed tutor — most based in India — rather than whoever's available when you log in. Sessions are live and 1:1, this page is positioned for All Levels, and pricing is shown before booking, never a flat invented rate.",
    faqs: [
      { q: "Is Organic Chemistry tutoring available for all grade levels?", a: "This subject page is positioned for All Levels — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Organic Chemistry tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can an Organic Chemistry tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Organic Chemistry tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "biology": {
    template: "standard",
    metaDescriptionOverride: "1:1 Biology tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Biology sits alongside a handful of large homework-help platforms — Tutor.com, Princeton Review, UPchieve, Wyzant — each of which gives Biology its own dedicated page rather than a shared listing. TutorA does the same, but goes further: instead of routing you to whoever's online, you're matched with a specific tutor reviewed by our team beforehand. Sessions are live and 1:1, positioned for Grades 9–12, and pricing is shown before you book rather than buried in a subscription. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Biology tutoring available for all grade levels?", a: "This subject page is positioned for Grades 9–12 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Biology tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Biology tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Biology tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "chemistry": {
    template: "standard",
    metaDescriptionOverride:
      "1:1 Chemistry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Homework-help aggregators like Tutor.com, Princeton Review, and UPchieve route you to whichever tutor happens to be online. A TutorA Chemistry tutor is different — matched to you specifically, most based in India, reviewed by our team before being approved, and working with you live rather than through a queue. This subject is positioned for Grades 9–12, and pricing is shown up front before you request a session.",
    faqs: [
      { q: "Is Chemistry tutoring available for all grade levels?", a: "This subject page is positioned for Grades 9–12 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Chemistry tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Chemistry tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Chemistry tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "geometry": {
    template: "standard",
    metaDescriptionOverride: "1:1 Geometry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Geometry tutoring on TutorA means live, 1:1 sessions with a tutor matched to you and reviewed by our team beforehand — not a routed queue like the larger homework-help platforms (Tutor.com, Princeton Review, UPchieve, Wyzant, Varsity Tutors), and not a fixed video curriculum either. This page is positioned for Grade 9–10. Pricing is shown before you book, whether you need ongoing support or help with a specific unit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Geometry tutoring available for all grade levels?", a: "This subject page is positioned for Grade 9–10 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Geometry tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Geometry tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Geometry tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "trigonometry": {
    template: "standard",
    metaDescriptionOverride: "1:1 Trigonometry tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Every major homework-help platform — Tutor.com, Princeton Review, UPchieve, Wyzant — gives Trigonometry its own dedicated page, and TutorA does too, with one real difference: you're matched to a specific, reviewed tutor rather than whoever's available when you log in. Sessions are live and 1:1, this page is positioned for Grade 10–11, and pricing is shown before booking, never a flat invented rate. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Trigonometry tutoring available for all grade levels?", a: "This subject page is positioned for Grade 10–11 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Trigonometry tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Trigonometry tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Trigonometry tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "advanced-algebra": {
    template: "standard",
    metaDescriptionOverride: "1:1 Advanced Algebra tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Advanced Algebra sits alongside a handful of large homework-help platforms — Tutor.com, Princeton Review, UPchieve, Wyzant — each of which gives Advanced Algebra its own dedicated page rather than a shared listing. TutorA does the same, but goes further: instead of routing you to whoever's online, you're matched with a specific tutor reviewed by our team beforehand. Sessions are live and 1:1, positioned for Grades 11-12, and pricing is shown before you book rather than buried in a subscription. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Advanced Algebra tutoring available for all grade levels?", a: "This subject page is positioned for Grades 11-12 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Advanced Algebra tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can an Advanced Algebra tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Advanced Algebra tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "algebra-i": {
    template: "standard",
    metaDescriptionOverride: "1:1 Algebra I tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Homework-help aggregators like Tutor.com, Princeton Review, and UPchieve route you to whichever tutor happens to be online. A TutorA Algebra I tutor is different — matched to you specifically, reviewed by our team before being approved, and working with you live rather than through a queue. This subject is positioned for Grade 8–9, and pricing is shown up front before you request a session. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Algebra I tutoring available for all grade levels?", a: "This subject page is positioned for Grade 8–9 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Algebra I tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can an Algebra I tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Algebra I tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "algebra-ii": {
    template: "standard",
    metaDescriptionOverride: "1:1 Algebra II tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Algebra II tutoring on TutorA means live, 1:1 sessions with a tutor matched to you and reviewed by our team beforehand — not a routed queue like the larger homework-help platforms (Tutor.com, Princeton Review, UPchieve, Wyzant, Varsity Tutors), and not a fixed video curriculum either. This page is positioned for Grade 9–10. Pricing is shown before you book, whether you need ongoing support or help with a specific unit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Algebra II tutoring available for all grade levels?", a: "This subject page is positioned for Grade 9–10 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Algebra II tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can an Algebra II tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Algebra II tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "pre-algebra": {
    template: "standard",
    differentiation:
      "Every major homework-help platform — Tutor.com, Princeton Review, UPchieve, Wyzant — gives Pre-Algebra its own dedicated page, and TutorA does too, with one real difference: you're matched to a specific, reviewed tutor rather than whoever's available when you log in. Sessions are live and 1:1, this page is positioned for Grades 6-8, and pricing is shown before booking, never a flat invented rate. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "Is Pre-Algebra tutoring available for all grade levels?", a: "This subject page is positioned for Grades 6-8 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Pre-Algebra tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Pre-Algebra tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "probability": {
    template: "standard",
    metaDescriptionOverride: "1:1 Probability tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Probability sits alongside a handful of large homework-help platforms — Tutor.com, Princeton Review, UPchieve, Wyzant — each of which gives Probability its own dedicated page rather than a shared listing. TutorA does the same, but goes further: instead of routing you to whoever's online, you're matched with a specific tutor reviewed by our team beforehand. Sessions are live and 1:1, positioned for Grades 11-12, and pricing is shown before you book rather than buried in a subscription. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Probability tutoring available for all grade levels?", a: "This subject page is positioned for Grades 11-12 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Probability tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Probability tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Probability tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "precalculus": {
    template: "standard",
    metaDescriptionOverride: "1:1 Precalculus tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Homework-help aggregators like Tutor.com, Princeton Review, and UPchieve route you to whichever tutor happens to be online. A TutorA Precalculus tutor is different — matched to you specifically, reviewed by our team before being approved, and working with you live rather than through a queue. This subject is positioned for Grades 9-11, and pricing is shown up front before you request a session. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Precalculus tutoring available for all grade levels?", a: "This subject page is positioned for Grades 9-11 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Precalculus tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Precalculus tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Precalculus tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "statistics": {
    template: "standard",
    metaDescriptionOverride: "1:1 Statistics tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Statistics tutoring on TutorA means live, 1:1 sessions with a tutor matched to you and reviewed by our team beforehand — not a routed queue like the larger homework-help platforms (Tutor.com, Princeton Review, UPchieve, Wyzant, Varsity Tutors), and not a fixed video curriculum either. This page is positioned for Grades 9-12. Pricing is shown before you book, whether you need ongoing support or help with a specific unit. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Statistics tutoring available for all grade levels?", a: "This subject page is positioned for Grades 9-12 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Statistics tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can a Statistics tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Statistics tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "environmental-science": {
    template: "standard",
    metaDescriptionOverride: "1:1 Environmental Science tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Every major homework-help platform — Tutor.com, Princeton Review, UPchieve, Wyzant — gives Environmental Science its own dedicated page, and TutorA does too, with one real difference: you're matched to a specific, reviewed tutor rather than whoever's available when you log in. Sessions are live and 1:1, this page is positioned for Grades 9-10, and pricing is shown before booking, never a flat invented rate. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Environmental Science tutoring available for all grade levels?", a: "This subject page is positioned for Grades 9-10 — mention your specific grade or course when requesting a tutor so we match appropriately." },
      { q: "How much does Environmental Science tutoring cost?", a: "Pricing varies by tutor and is shown before booking — TutorA doesn't publish one flat rate." },
      { q: "Can an Environmental Science tutor help with exam prep, not just homework?", a: "Yes — mention whether you need ongoing homework support, a specific unit review, or exam prep when requesting a tutor." },
      { q: "Are TutorA's Environmental Science tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: English-skills cluster (9)
  // ---------------------------------------------------------------------
  "english": {
    template: "standard",
    metaDescriptionOverride: "1:1 English tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "A broad entry point for students not yet sure which specific English skill they need — grammar, vocabulary, essay writing, literature, or general reading and writing support. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for All Levels — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "How is English different from other English subjects on TutorA?", a: "A broad entry point for students not yet sure which specific English skill they need — grammar, vocabulary, essay writing, literature, or general reading and writing support." },
      { q: "What grade level is English for?", a: "This subject is positioned for All Levels — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Are TutorA's English tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "academic-english": {
    template: "standard",
    metaDescriptionOverride: "1:1 Academic English tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Language-for-study skills aimed at students, often non-native speakers, who need English specifically for academic coursework, distinct from conversational Spoken English. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 11-12 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "How is Academic English different from other English subjects on TutorA?", a: "Language-for-study skills aimed at students, often non-native speakers, who need English specifically for academic coursework, distinct from conversational Spoken English." },
      { q: "What grade level is Academic English for?", a: "This subject is positioned for Grades 11-12 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Are TutorA's Academic English tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "academic-writing": {
    template: "standard",
    metaDescriptionOverride: "1:1 Academic Writing tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Structured, thesis-driven writing for older students — essays, reports, research papers — distinct from creative writing's open-ended format. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 9-10 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "How is Academic Writing different from other English subjects on TutorA?", a: "Structured, thesis-driven writing for older students — essays, reports, research papers — distinct from creative writing's open-ended format." },
      { q: "What grade level is Academic Writing for?", a: "This subject is positioned for Grades 9-10 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Are TutorA's Academic Writing tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "essay-writing": {
    template: "standard",
    metaDescriptionOverride: "1:1 Essay Writing tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Structure, argument, and exam-style essay skills — a genuinely distinct category confirmed by real search demand, separate from creative or academic writing. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 6-12 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "How is Essay Writing different from other English subjects on TutorA?", a: "Structure, argument, and exam-style essay skills — a genuinely distinct category confirmed by real search demand, separate from creative or academic writing." },
      { q: "What grade level is Essay Writing for?", a: "This subject is positioned for Grades 6-12 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Are TutorA's Essay Writing tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "creative-writing": {
    template: "standard",
    differentiation:
      "Open-ended narrative, fiction, and poetry skills — a genuinely distinct category confirmed by real search demand, separate from structured academic writing. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 6-8 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "How is Creative Writing different from other English subjects on TutorA?", a: "Open-ended narrative, fiction, and poetry skills — a genuinely distinct category confirmed by real search demand, separate from structured academic writing." },
      { q: "What grade level is Creative Writing for?", a: "This subject is positioned for Grades 6-8 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "grammar": {
    template: "standard",
    metaDescriptionOverride: "1:1 Grammar tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Mechanics and rules — sentence structure, tenses, punctuation — a narrower, more foundational skill than essay writing or literature analysis. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 6-10 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "How is Grammar different from other English subjects on TutorA?", a: "Mechanics and rules — sentence structure, tenses, punctuation — a narrower, more foundational skill than essay writing or literature analysis." },
      { q: "What grade level is Grammar for?", a: "This subject is positioned for Grades 6-10 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Are TutorA's Grammar tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "vocabulary": {
    template: "standard",
    differentiation:
      "Word-building and usage, often paired with reading comprehension for younger students or exam prep for older ones. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 6-8 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "How is Vocabulary different from other English subjects on TutorA?", a: "Word-building and usage, often paired with reading comprehension for younger students or exam prep for older ones." },
      { q: "What grade level is Vocabulary for?", a: "This subject is positioned for Grades 6-8 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "reading-comprehension": {
    template: "standard",
    differentiation:
      "Extraction and inference skills — understanding and analyzing what a text says — distinct from vocabulary's word-level focus. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 6-8 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "How is Reading Comprehension different from other English subjects on TutorA?", a: "Extraction and inference skills — understanding and analyzing what a text says — distinct from vocabulary's word-level focus." },
      { q: "What grade level is Reading Comprehension for?", a: "This subject is positioned for Grades 6-8 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "literature": {
    template: "standard",
    metaDescriptionOverride: "1:1 Literature tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Analysis of texts, often tied to set-text requirements for GCSE- or AP-adjacent courses — distinct from the mechanics-focused Grammar and Vocabulary subjects. TutorA matches you with a specific tutor reviewed by our team beforehand for live 1:1 sessions — positioned for Grades 9-12 — rather than routing you to a generic English tutor or a fixed curriculum. Pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "How is Literature different from other English subjects on TutorA?", a: "Analysis of texts, often tied to set-text requirements for GCSE- or AP-adjacent courses — distinct from the mechanics-focused Grammar and Vocabulary subjects." },
      { q: "What grade level is Literature for?", a: "This subject is positioned for Grades 9-12 — mention your specific grade or need when requesting a tutor." },
      { q: "Can a tutor help with a specific assignment, not just general skills?", a: "Yes — mention your specific assignment or goal when requesting a tutor so sessions can focus on it directly." },
      { q: "Are TutorA's Literature tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Middle School Basics, Grades 6-8, American curriculum (7)
  // ---------------------------------------------------------------------
  "biology-basics": {
    template: "standard",
    differentiation:
      "Biology Basics tutoring on TutorA is written for parents as much as students — this is a Grades 6-8 subject, positioned to build foundational confidence before high school rather than mirror the exam-driven framing of our AP or GCSE pages. Your child is matched with a tutor reviewed by our team beforehand, working live and 1:1. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What age is Biology Basics for?", a: "This subject is positioned for Grades 6-8 — mention your child's grade when requesting a tutor." },
      { q: "How is this different from the high-school-level version of this subject?", a: "This page covers middle-school-level content — for more advanced coverage, check whether TutorA has a dedicated page for the relevant exam or grade band, such as GCSE or AP." },
      { q: "Can tutoring help build confidence, not just grades?", a: "Yes — many parents request middle-school tutoring specifically to build foundational confidence before high school, not only to fix a specific grade problem." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "chemistry-basics": {
    template: "standard",
    differentiation:
      "For Grades 6-8 students, Chemistry Basics tutoring on TutorA focuses on building real confidence with the fundamentals, not just fixing a specific grade — a different emphasis than our exam-driven high-school subject pages. Every tutor is reviewed by our team before being matched — most are based in India — sessions are live and 1:1, and pricing is shown up front.",
    faqs: [
      { q: "What age is Chemistry Basics for?", a: "This subject is positioned for Grades 6-8 — mention your child's grade when requesting a tutor." },
      { q: "How is this different from the high-school-level version of this subject?", a: "This page covers middle-school-level content — for more advanced coverage, check whether TutorA has a dedicated page for the relevant exam or grade band, such as GCSE or AP." },
      { q: "Can tutoring help build confidence, not just grades?", a: "Yes — many parents request middle-school tutoring specifically to build foundational confidence before high school, not only to fix a specific grade problem." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "physics-basics": {
    template: "standard",
    differentiation:
      "Physics Basics tutoring on TutorA is written for parents as much as students — this is a Grades 6-8 subject, positioned to build foundational confidence before high school rather than mirror the exam-driven framing of our AP or GCSE pages. Your child is matched with a tutor — most based in India — reviewed by our team beforehand, working live and 1:1. Pricing is shown before you book.",
    faqs: [
      { q: "What age is Physics Basics for?", a: "This subject is positioned for Grades 6-8 — mention your child's grade when requesting a tutor." },
      { q: "How is this different from the high-school-level version of this subject?", a: "This page covers middle-school-level content — for more advanced coverage, check whether TutorA has a dedicated page for the relevant exam or grade band, such as GCSE or AP." },
      { q: "Can tutoring help build confidence, not just grades?", a: "Yes — many parents request middle-school tutoring specifically to build foundational confidence before high school, not only to fix a specific grade problem." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "general-mathematics": {
    template: "standard",
    differentiation:
      "For Grades 6-8 students, General Mathematics tutoring on TutorA focuses on building real confidence with the fundamentals, not just fixing a specific grade — a different emphasis than our exam-driven high-school subject pages. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown up front. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What age is General Mathematics for?", a: "This subject is positioned for Grades 6-8 — mention your child's grade when requesting a tutor." },
      { q: "How is this different from the high-school-level version of this subject?", a: "This page covers middle-school-level content — for more advanced coverage, check whether TutorA has a dedicated page for the relevant exam or grade band, such as GCSE or AP." },
      { q: "Can tutoring help build confidence, not just grades?", a: "Yes — many parents request middle-school tutoring specifically to build foundational confidence before high school, not only to fix a specific grade problem." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "general-science": {
    template: "standard",
    differentiation:
      "General Science tutoring on TutorA is written for parents as much as students — this is a Grades 6-8 subject, positioned to build foundational confidence before high school rather than mirror the exam-driven framing of our AP or GCSE pages. Your child is matched with a tutor reviewed by our team beforehand, working live and 1:1. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What age is General Science for?", a: "This subject is positioned for Grades 6-8 — mention your child's grade when requesting a tutor." },
      { q: "How is this different from the high-school-level version of this subject?", a: "This page covers middle-school-level content — for more advanced coverage, check whether TutorA has a dedicated page for the relevant exam or grade band, such as GCSE or AP." },
      { q: "Can tutoring help build confidence, not just grades?", a: "Yes — many parents request middle-school tutoring specifically to build foundational confidence before high school, not only to fix a specific grade problem." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "geometry-basics": {
    template: "standard",
    differentiation:
      "For Grades 6-8 students, Geometry Basics tutoring on TutorA focuses on building real confidence with the fundamentals, not just fixing a specific grade — a different emphasis than our exam-driven high-school subject pages. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown up front. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What age is Geometry Basics for?", a: "This subject is positioned for Grades 6-8 — mention your child's grade when requesting a tutor." },
      { q: "How is this different from the high-school-level version of this subject?", a: "This page covers middle-school-level content — for more advanced coverage, check whether TutorA has a dedicated page for the relevant exam or grade band, such as GCSE or AP." },
      { q: "Can tutoring help build confidence, not just grades?", a: "Yes — many parents request middle-school tutoring specifically to build foundational confidence before high school, not only to fix a specific grade problem." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "middle-school-math": {
    template: "standard",
    differentiation:
      "Middle School Math tutoring on TutorA is written for parents as much as students — this is a Grades 6-8 subject, positioned to build foundational confidence before high school rather than mirror the exam-driven framing of our AP or GCSE pages. Your child is matched with a tutor reviewed by our team beforehand, working live and 1:1. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What age is Middle School Math for?", a: "This subject is positioned for Grades 6-8 — mention your child's grade when requesting a tutor." },
      { q: "How is this different from the high-school-level version of this subject?", a: "This page covers middle-school-level content — for more advanced coverage, check whether TutorA has a dedicated page for the relevant exam or grade band, such as GCSE or AP." },
      { q: "Can tutoring help build confidence, not just grades?", a: "Yes — many parents request middle-school tutoring specifically to build foundational confidence before high school, not only to fix a specific grade problem." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Humanities (3)
  // ---------------------------------------------------------------------
  "history": {
    template: "standard",
    differentiation:
      "History tutoring on TutorA can focus on argument-building, source analysis, and essay structure — skills that are harder to develop from static study guides than STEM problem sets are, and a real differentiator from generic homework-help platforms. This page is positioned for Grades 6-10. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book.",
    faqs: [
      { q: "Does History tutoring help with essays, not just facts?", a: "Yes — mention if you need help with essay structure, source analysis, or argument-building specifically when requesting a tutor." },
      { q: "What grade level is this for?", a: "This subject is positioned for Grades 6-10 — mention your specific grade or course when requesting a tutor." },
      { q: "How much does History tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "geography": {
    template: "standard",
    differentiation:
      "Geography tutoring on TutorA can focus on argument-building, source analysis, and essay structure — skills that are harder to develop from static study guides than STEM problem sets are, and a real differentiator from generic homework-help platforms. This page is positioned for Grades 6-10. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book.",
    faqs: [
      { q: "Does Geography tutoring help with essays, not just facts?", a: "Yes — mention if you need help with essay structure, source analysis, or argument-building specifically when requesting a tutor." },
      { q: "What grade level is this for?", a: "This subject is positioned for Grades 6-10 — mention your specific grade or course when requesting a tutor." },
      { q: "How much does Geography tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "civics": {
    template: "standard",
    differentiation:
      "Civics tutoring on TutorA can focus on argument-building, source analysis, and essay structure — skills that are harder to develop from static study guides than STEM problem sets are, and a real differentiator from generic homework-help platforms. This page is positioned for Grades 6-8. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book.",
    faqs: [
      { q: "Does Civics tutoring help with essays, not just facts?", a: "Yes — mention if you need help with essay structure, source analysis, or argument-building specifically when requesting a tutor." },
      { q: "What grade level is this for?", a: "This subject is positioned for Grades 6-8 — mention your specific grade or course when requesting a tutor." },
      { q: "How much does Civics tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Business & Finance (4)
  // ---------------------------------------------------------------------
  "finance-basics": {
    template: "standard",
    differentiation:
      "TutorA's Finance Basics tutoring is aimed at school-level coursework — positioned for Grades 11-12 — rather than professional certification prep, unless a specific tutor happens to offer that. You're matched with a specific, reviewed tutor for live 1:1 sessions, not routed to a generic business tutor. Pricing is shown before you book.",
    faqs: [
      { q: "Is this for school coursework or professional certification?", a: "This subject is positioned for school-level students (Grades 11-12) — mention your specific need when requesting a tutor." },
      { q: "What topics does Finance Basics tutoring cover?", a: "Coverage depends on the tutor matched to you and your specific course or syllabus — mention your curriculum when requesting a tutor." },
      { q: "How much does Finance Basics tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "economics": {
    template: "standard",
    differentiation:
      "TutorA's Economics tutoring is aimed at school-level coursework — positioned for Grades 9-12 — rather than professional certification prep, unless a specific tutor happens to offer that. You're matched with a specific, reviewed tutor for live 1:1 sessions, not routed to a generic business tutor. Pricing is shown before you book.",
    faqs: [
      { q: "Is this for school coursework or professional certification?", a: "This subject is positioned for school-level students (Grades 9-12) — mention your specific need when requesting a tutor." },
      { q: "What topics does Economics tutoring cover?", a: "Coverage depends on the tutor matched to you and your specific course or syllabus — mention your curriculum when requesting a tutor." },
      { q: "How much does Economics tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "accounting": {
    template: "standard",
    differentiation:
      "TutorA's Accounting tutoring is aimed at school-level coursework — positioned for Grades 9-12 — rather than professional certification prep, unless a specific tutor happens to offer that. You're matched with a specific, reviewed tutor for live 1:1 sessions, not routed to a generic business tutor. Pricing is shown before you book.",
    faqs: [
      { q: "Is this for school coursework or professional certification?", a: "This subject is positioned for school-level students (Grades 9-12) — mention your specific need when requesting a tutor." },
      { q: "What topics does Accounting tutoring cover?", a: "Coverage depends on the tutor matched to you and your specific course or syllabus — mention your curriculum when requesting a tutor." },
      { q: "How much does Accounting tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "business-studies": {
    template: "standard",
    differentiation:
      "TutorA's Business Studies tutoring is aimed at school-level coursework — positioned for Grades 9-12 — rather than professional certification prep, unless a specific tutor happens to offer that. You're matched with a specific, reviewed tutor for live 1:1 sessions, not routed to a generic business tutor. Pricing is shown before you book.",
    faqs: [
      { q: "Is this for school coursework or professional certification?", a: "This subject is positioned for school-level students (Grades 9-12) — mention your specific need when requesting a tutor." },
      { q: "What topics does Business Studies tutoring cover?", a: "Coverage depends on the tutor matched to you and your specific course or syllabus — mention your curriculum when requesting a tutor." },
      { q: "How much does Business Studies tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Languages (5)
  // ---------------------------------------------------------------------
  "spanish": {
    template: "standard",
    differentiation:
      "Spanish tutoring on TutorA is matched, not open-marketplace — unlike Preply or italki, where any self-listed tutor can apply, every TutorA tutor is reviewed by our team before being matched to you. Sessions are live 1:1, this page is positioned for Grades 6-8, and pricing is shown before you book.",
    faqs: [
      { q: "Is Spanish tutoring for beginners or advanced speakers?", a: "Mention your current level — beginner, conversational, advanced — when requesting a tutor." },
      { q: "Spanish for kids?", a: "TutorA can match younger learners with a patient Spanish tutor — mention your child's age when requesting one." },
      { q: "How much does Spanish tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "french": {
    template: "standard",
    differentiation:
      "French tutoring on TutorA is matched, not open-marketplace — unlike Preply or italki, where any self-listed tutor can apply, every TutorA tutor is reviewed by our team before being matched to you. Sessions are live 1:1, this page is positioned for Grades 6-8, and pricing is shown before you book.",
    faqs: [
      { q: "Is French tutoring for beginners or advanced speakers?", a: "Mention your current level — beginner, conversational, advanced — when requesting a tutor." },
      { q: "French for kids?", a: "TutorA can match younger learners with a patient French tutor — mention your child's age when requesting one." },
      { q: "How much does French tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "hindi": {
    template: "standard",
    differentiation:
      "Hindi tutoring on TutorA is matched, not open-marketplace — unlike Preply or italki, where any self-listed tutor can apply, every TutorA tutor is reviewed by our team before being matched to you. Sessions are live 1:1, this page is positioned for Grades 6-8, and pricing is shown before you book.",
    faqs: [
      { q: "Is Hindi tutoring for beginners or advanced speakers?", a: "Mention your current level — beginner, conversational, advanced — when requesting a tutor." },
      { q: "Hindi for kids?", a: "TutorA can match younger learners with a patient Hindi tutor — mention your child's age when requesting one." },
      { q: "How much does Hindi tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "arabic": {
    template: "standard",
    differentiation:
      "Arabic tutoring on TutorA is matched, not open-marketplace — unlike Preply or italki, where any self-listed tutor can apply, every TutorA tutor is reviewed by our team before being matched to you. Sessions are live 1:1, this page is positioned for Grades 6-8, and pricing is shown before you book. For learners specifically interested in Qur'anic Arabic or Tajweed, mention this when requesting a tutor.",
    faqs: [
      { q: "Is Arabic tutoring for beginners or advanced speakers?", a: "Mention your current level — beginner, conversational, advanced — when requesting a tutor." },
      { q: "Arabic for kids?", a: "TutorA can match younger learners with a patient Arabic tutor — mention your child's age when requesting one." },
      { q: "Do you have tutors for Qur'anic Arabic or Tajweed?", a: "Mention this specific need when requesting a tutor — coverage depends on the individual tutor matched to you." },
      { q: "How much does Arabic tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
    ],
  },
  "spoken-english": {
    template: "standard",
    metaDescriptionOverride: "1:1 Spoken English tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Spoken English tutoring on TutorA focuses specifically on conversational speaking and listening practice — a genuinely distinct skill from grammar, writing, or literature-focused English tutoring. Unlike conversation-practice apps that connect you with whoever's online for a quick chat, TutorA matches you with a specific tutor for ongoing, consistent practice, reviewed by our team beforehand. Pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is Spoken English different from general English tutoring?", a: "Yes — this subject focuses specifically on conversational speaking and listening practice, distinct from grammar, writing, or literature-focused English tutoring." },
      { q: "Is this for non-native speakers only?", a: "It's commonly used by non-native speakers building fluency and confidence, but anyone wanting focused speaking practice can request a tutor." },
      { q: "How much does Spoken English tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
      { q: "Are TutorA's Spoken English tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Singapore curriculum (5)
  // ---------------------------------------------------------------------
  "o-level-chemistry": {
    template: "standard",
    differentiation:
      "O-Level Chemistry tutoring on TutorA is positioned for Grades 10-11, aligned to Singapore's O-Level national secondary examination system administered in line with MOE and Cambridge-aligned syllabuses. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book.",
    faqs: [
      { q: "Is O-Level Chemistry tutoring aligned to the Singapore MOE syllabus?", a: "Coverage depends on the tutor matched to you — mention your school and syllabus when requesting a tutor so we match appropriately." },
      { q: "What grade level is O-Level Chemistry for?", a: "This subject is positioned for Grades 10-11." },
      { q: "Do tutors understand Singapore's exam banding system?", a: "Mention your specific banding or scoring concerns when requesting a tutor — coverage depends on the individual tutor matched to you." },
    ],
  },
  "o-level-maths": {
    template: "standard",
    metaDescriptionOverride: "1:1 O-Level Maths tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "O-Level Maths tutoring on TutorA is positioned for Grades 10-11, aligned to Singapore's O-Level national secondary examination system administered in line with MOE and Cambridge-aligned syllabuses. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is O-Level Maths tutoring aligned to the Singapore MOE syllabus?", a: "Coverage depends on the tutor matched to you — mention your school and syllabus when requesting a tutor so we match appropriately." },
      { q: "What grade level is O-Level Maths for?", a: "This subject is positioned for Grades 10-11." },
      { q: "Do tutors understand Singapore's exam banding system?", a: "Mention your specific banding or scoring concerns when requesting a tutor — coverage depends on the individual tutor matched to you." },
      { q: "Are TutorA's O-Level Maths tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "o-level-physics": {
    template: "standard",
    differentiation:
      "O-Level Physics tutoring on TutorA is positioned for Grades 10-11, aligned to Singapore's O-Level national secondary examination system administered in line with MOE and Cambridge-aligned syllabuses. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book.",
    faqs: [
      { q: "Is O-Level Physics tutoring aligned to the Singapore MOE syllabus?", a: "Coverage depends on the tutor matched to you — mention your school and syllabus when requesting a tutor so we match appropriately." },
      { q: "What grade level is O-Level Physics for?", a: "This subject is positioned for Grades 10-11." },
      { q: "Do tutors understand Singapore's exam banding system?", a: "Mention your specific banding or scoring concerns when requesting a tutor — coverage depends on the individual tutor matched to you." },
    ],
  },
  "psle-maths": {
    template: "standard",
    differentiation:
      "PSLE Maths tutoring on TutorA is positioned for Grade 6, aligned to Singapore's PSLE (Primary School Leaving Examination) — the national exam used for secondary school placement. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "Is PSLE Maths tutoring aligned to the Singapore MOE syllabus?", a: "Coverage depends on the tutor matched to you — mention your school and syllabus when requesting a tutor so we match appropriately." },
      { q: "What grade level is PSLE Maths for?", a: "This subject is positioned for Grade 6." },
      { q: "Do tutors understand Singapore's exam banding system?", a: "Mention your specific banding or scoring concerns when requesting a tutor — coverage depends on the individual tutor matched to you." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "psle-science": {
    template: "standard",
    differentiation:
      "PSLE Science tutoring on TutorA is positioned for Grade 6, aligned to Singapore's PSLE (Primary School Leaving Examination) — the national exam used for secondary school placement. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "Is PSLE Science tutoring aligned to the Singapore MOE syllabus?", a: "Coverage depends on the tutor matched to you — mention your school and syllabus when requesting a tutor so we match appropriately." },
      { q: "What grade level is PSLE Science for?", a: "This subject is positioned for Grade 6." },
      { q: "Do tutors understand Singapore's exam banding system?", a: "Mention your specific banding or scoring concerns when requesting a tutor — coverage depends on the individual tutor matched to you." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: UK Entrance Exams (2)
  // ---------------------------------------------------------------------
  "11-english": {
    template: "standard",
    differentiation:
      "The 11+ is a UK entrance exam used by grammar schools and some selective independent schools, typically taken around age 10-11. A TutorA 11+ English tutor is matched to you individually and reviewed by our team beforehand, working with you live rather than through a fixed video curriculum. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What is the 11+ exam?", a: "A UK entrance exam used by grammar schools and some selective independent schools, typically taken around age 10-11." },
      { q: "Does 11+ English tutoring cover a specific exam board (CEM, GL Assessment)?", a: "Coverage depends on the tutor matched to you — mention which exam board your target school uses when requesting a tutor." },
      { q: "When should 11+ tutoring start?", a: "Many families start a year or more ahead of the exam, though this varies by target school and starting point." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "11-maths": {
    template: "standard",
    differentiation:
      "The 11+ is a UK entrance exam used by grammar schools and some selective independent schools, typically taken around age 10-11. A TutorA 11+ Maths tutor is matched to you individually and reviewed by our team beforehand, working with you live rather than through a fixed video curriculum. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What is the 11+ exam?", a: "A UK entrance exam used by grammar schools and some selective independent schools, typically taken around age 10-11." },
      { q: "Does 11+ Maths tutoring cover a specific exam board (CEM, GL Assessment)?", a: "Coverage depends on the tutor matched to you — mention which exam board your target school uses when requesting a tutor." },
      { q: "When should 11+ tutoring start?", a: "Many families start a year or more ahead of the exam, though this varies by target school and starting point." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Umbrella curricula (2)
  // ---------------------------------------------------------------------
  "american-curriculum": {
    template: "standard",
    differentiation:
      "American Curriculum tutoring on TutorA is aimed at families living outside the home country who want their child to keep pace with that curriculum while abroad — a genuinely different need from a domestic student searching for GCSE or AP help. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book.",
    faqs: [
      { q: "Who is American Curriculum tutoring for?", a: "Primarily families living outside the home country who want their child to keep pace with that curriculum, though it can also suit anyone wanting that specific curricular approach." },
      { q: "Does this cover a specific exam board or grade level?", a: "Coverage depends on the tutor matched to you — mention your child's grade and any specific exam board when requesting a tutor." },
      { q: "How does this differ from GCSE or AP tutoring?", a: "American Curriculum tutoring follows the broader national curriculum rather than one specific exam qualification — see our GCSE or AP subject pages if you need exam-specific prep instead." },
    ],
  },
  "british-curriculum": {
    template: "standard",
    differentiation:
      "British Curriculum tutoring on TutorA is aimed at families living outside the home country who want their child to keep pace with that curriculum while abroad — a genuinely different need from a domestic student searching for GCSE or AP help. Every tutor is reviewed by our team before being matched, sessions are live and 1:1, and pricing is shown before you book.",
    faqs: [
      { q: "Who is British Curriculum tutoring for?", a: "Primarily families living outside the home country who want their child to keep pace with that curriculum, though it can also suit anyone wanting that specific curricular approach." },
      { q: "Does this cover a specific exam board or grade level?", a: "Coverage depends on the tutor matched to you — mention your child's grade and any specific exam board when requesting a tutor." },
      { q: "How does this differ from GCSE or AP tutoring?", a: "British Curriculum tutoring follows the broader national curriculum rather than one specific exam qualification — see our GCSE or AP subject pages if you need exam-specific prep instead." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Computer Science & Adjacent (4)
  // ---------------------------------------------------------------------
  "algorithms": {
    template: "standard",
    differentiation:
      "Algorithms tutoring on TutorA means live 1:1 feedback on your specific project or assignment — a real differentiator from free tutorials and self-paced coding bootcamps, not a claim of better content. Every tutor is reviewed by our team before being matched, and pricing is shown before you book. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      { q: "Is Algorithms tutoring for beginners or advanced students?", a: "Mention your current level and specific goal — course support, project help, interview prep — when requesting a tutor." },
      { q: "Does Algorithms tutoring cover a specific language or framework?", a: "Coverage depends on the tutor matched to you — mention your specific language, framework, or course when requesting a tutor." },
      { q: "How much does Algorithms tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
      { q: "Are TutorA's Algorithms tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "computer-science": {
    template: "standard",
    differentiation:
      "Computer Science tutoring on TutorA matches you with a specific, reviewed tutor rather than routing you to whoever's available — unlike large CS-focused aggregators such as Wyzant, Princeton Review, or Varsity Tutors. Sessions are live and 1:1, and pricing is shown before you book. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      { q: "Is Computer Science tutoring for beginners or advanced students?", a: "Mention your current level and specific goal — course support, project help, interview prep — when requesting a tutor." },
      { q: "Does Computer Science tutoring cover a specific language or framework?", a: "Coverage depends on the tutor matched to you — mention your specific language, framework, or course when requesting a tutor." },
      { q: "How much does Computer Science tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
      { q: "Are TutorA's Computer Science tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "data-structures": {
    template: "standard",
    differentiation:
      "Data Structures tutoring on TutorA means live 1:1 feedback on your specific project or assignment — a real differentiator from free tutorials and self-paced coding bootcamps, not a claim of better content. Every tutor is reviewed by our team before being matched, and pricing is shown before you book. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      { q: "Is Data Structures tutoring for beginners or advanced students?", a: "Mention your current level and specific goal — course support, project help, interview prep — when requesting a tutor." },
      { q: "Does Data Structures tutoring cover a specific language or framework?", a: "Coverage depends on the tutor matched to you — mention your specific language, framework, or course when requesting a tutor." },
      { q: "How much does Data Structures tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
      { q: "Are TutorA's Data Structures tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
  "web-development": {
    template: "standard",
    differentiation:
      "Web Development tutoring on TutorA means live 1:1 feedback on your specific project or assignment — a real differentiator from free tutorials and self-paced coding bootcamps, not a claim of better content. Every tutor is reviewed by our team before being matched, and pricing is shown before you book. Most of TutorA's tutors are based in India, and each one's profile shows their specific programming background and experience, so you know who you'd be working with before you book.",
    faqs: [
      { q: "Is Web Development tutoring for beginners or advanced students?", a: "Mention your current level and specific goal — course support, project help, interview prep — when requesting a tutor." },
      { q: "Does Web Development tutoring cover a specific language or framework?", a: "Coverage depends on the tutor matched to you — mention your specific language, framework, or course when requesting a tutor." },
      { q: "How much does Web Development tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
      { q: "Are TutorA's Web Development Basics tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched, and each one's profile shows their real programming background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: Kids-coding (3) — parent-facing, no invented "kids safety
  // certification"; same sitewide tutor-review process as every subject.
  // ---------------------------------------------------------------------
  "coding-for-kids": {
    template: "standard",
    differentiation:
      "Coding for Kids on TutorA is a broad entry point for parents who aren't sure which specific tool is right yet for their child — a matched tutor can help decide between Scratch, Python Basics, or another approach based on age and interest. TutorA reviews tutors before they're matched, the same review process used sitewide — sessions are live and 1:1, positioned for Grades 6-8. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "How is this different from Scratch Programming or Python Basics?", a: "This page is a broader entry point for parents who aren't sure which specific tool is right yet — a matched tutor can help decide between Scratch, Python Basics, or another approach based on your child's age and interest." },
      { q: "What age is Coding for Kids for?", a: "This subject is positioned for Grades 6-8 — mention your child's age when requesting a tutor so we match appropriately." },
      { q: "Does my child need a computer already?", a: "Sessions are held online, so a computer or tablet with internet access is needed — specific software requirements depend on the tutor and tool used." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "scratch-programming": {
    template: "standard",
    differentiation:
      "Scratch is a free, block-based visual programming language created by MIT specifically for kids — no typed code required, making it a common first step before text-based languages like Python. TutorA reviews tutors before they're matched, the same process used sitewide, and sessions are live and 1:1, positioned for Grades 6-8. Pricing is shown before you book. Most of TutorA's tutors are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience.",
    faqs: [
      { q: "What is Scratch?", a: "A free, block-based visual programming language created by MIT specifically for kids — no typed code required, which makes it a common first step before text-based languages like Python." },
      { q: "What age is Scratch Programming for?", a: "This subject is positioned for Grades 6-8, though younger and older kids can also benefit depending on prior experience." },
      { q: "What comes after Scratch?", a: "Many kids move on to Python Basics or another beginner text-based language once they're comfortable with programming concepts." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },
  "python-basics": {
    template: "standard",
    differentiation:
      "Python Basics for kids on TutorA means age-appropriate, hands-on projects — small games, simple automation scripts — rather than abstract syntax drills, distinct from our general Python page, which serves an adult and teen audience with different trust signals. TutorA reviews tutors before they're matched — most are based in India — the same process used sitewide, and sessions are live and 1:1, positioned for Grades 6-8.",
    faqs: [
      { q: "What age is Python Basics for?", a: "This subject is positioned for Grades 6-8 — mention your child's age and any prior coding experience when requesting a tutor." },
      { q: "How is this different from the general Python subject page?", a: "Python Basics serves a genuinely different, kids-coding audience than our general Python page — this page is written for parents, with age-appropriate framing throughout." },
      { q: "Does my child need any coding experience first?", a: "No — this is designed as an entry point, though a tutor can also work with kids who already know some basics." },
      { q: "Where are TutorA's tutors based?", a: "Most are based in India and reviewed by our team before being matched with your child — each tutor's profile shows their specific background and experience." },
    ],
  },

  // ---------------------------------------------------------------------
  // Standard: flagged duplicate-risk subject (1)
  // ---------------------------------------------------------------------
  "science": {
    template: "standard",
    metaDescriptionOverride: "1:1 Science tutoring with an India-based tutor, personally reviewed by our team — see their specific experience before you book.",
    differentiation:
      "Science on TutorA is a broader, ungraded option — positioned for All Levels — distinct from our more specific General Science (Grades 6-8) and GCSE Science (Combined Science) pages. If either of those matches your need better, we'd point you there first; this page covers general science tutoring requests that don't fit a specific grade band or exam. Every tutor is reviewed by our team before being matched, and pricing is shown before you book. Most of TutorA's tutors for this subject are based in India, and each one is reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Is this the same as GCSE Science or General Science (Grades 6-8)?", a: "No — those are separate, more specific pages. This page is a broader, ungraded Science tutoring option; see our GCSE Science or General Science pages if either matches your specific need better." },
      { q: "What topics does Science tutoring cover here?", a: "Coverage depends on the tutor matched to you — mention your specific grade, curriculum, and topics when requesting a tutor." },
      { q: "How much does Science tutoring cost?", a: "Pricing varies by tutor and is shown before booking." },
      { q: "Are TutorA's Science tutors based in India?", a: "Most are, yes — TutorA's tutor pool is predominantly India-based. Every tutor is reviewed by our team before being matched with a student, and each one's profile shows their specific subject background and experience, so you can see exactly who you'd be working with before you book." },
    ],
  },
};
