// Phase 3 / Step 3c: subject-specific "why a TutorA tutor" differentiation copy and FAQs
// for the 38 non-test-prep course pages (Programming & Technology, Languages, Creative
// Skills, Music & Instruments). Keyed by production course slug — cross-checked against
// docs/seo-audit-tutora/phase3-clustering/cluster-plan.json's hub_slug values, which match
// the docs/seo-audit-tutora/phase3-content-briefs/cluster-briefs/*.md filenames exactly.
//
// The 15 Test Preparation slugs are now included too (see the bottom of this file). Their
// tutor bios are NOT static content — those are live-queried from real approved
// TutorProfile rows (app/lib/tutor-listings.ts's getTutorsMatchingPrefixes) so a page
// never shows a tutor who's since been unapproved. Their guarantee claims are generic
// (no invented numeric guarantee) and point to the real /guarantee page. No testimonials
// section exists anywhere in this codebase — deliberately skipped per business decision,
// not an oversight. Any slug not present in this map renders with no differentiation
// section, no FAQ section, and no FAQPage JSON-LD — see app/courses/[slug]/page.tsx.
//
// Every claim below is grounded in facts already established elsewhere in this codebase:
// live 1:1 sessions (not pre-recorded video), tutors reviewed by TutorA's team before being
// matched, pricing shown before booking (never a flat number), no certificate of completion
// (see lib/course-faqs.ts), and requests routed through /request-a-tutor or /find-a-tutor.
// No invented student counts, satisfaction stats, tutor names/credentials, review quotes,
// or TutorA-specific curricula. Named competitor platforms (Udemy, Skillshare, Coursera,
// freeCodeCamp, Duolingo, JustinGuitar, etc.) are real, well-known self-paced platforms —
// referencing what they generically are (pre-recorded, fixed-curriculum) is not a claim
// about TutorA, and the platform mix is varied per subject cluster rather than reused
// verbatim, per each brief's own FAQ note that the free-content competitor set differs
// "depending on subject" (e.g. Duolingo/Babbel for languages, JustinGuitar/Flowkey for music).

export interface CourseSubjectContent {
  differentiation: string;
  faqs: { q: string; a: string }[];
  /** Optional, page-specific curriculum/skill depth beyond the "why a TutorA tutor" pitch —
   *  see docs/seo-audit-tutora/findings/content-depth-audit-2026-08-10.md, section 5. */
  courseDetail?: string;
}

// Maps each test-prep course slug to the real Subject.name prefixes that identify tutors
// teaching it, for the live query in app/lib/tutor-listings.ts's getTutorsMatchingPrefixes.
// Prefixes (not exact strings) so a newly added "ACT English" or "GMAT Verbal" subject is
// picked up automatically without a code change. "GCSE" deliberately does not match
// "IGCSE ..." (different prefix) or "GCSE English ..." (excluded, since that's its own
// page/course) — verified against the live Subject table's actual naming (2026-08-07).
export const TEST_PREP_TUTOR_MATCH: Record<string, { include: string[]; exclude?: string[] }> = {
  "sat-c5d2749b": { include: ["SAT"] },
  "act-dccdc694": { include: ["ACT"] },
  "psat-preparation-course-4b552b9e": { include: ["PSAT"] },
  "gre-a2b8cace": { include: ["GRE"] },
  "gmat-d7e5eb9d": { include: ["GMAT"] },
  "toefl-3a2e48ed": { include: ["TOEFL"] },
  "ielts-8d4686db": { include: ["IELTS"] },
  "pte-302557b2": { include: ["PTE"] },
  "duolingo-english-test-preparation-course-3e98dca7": { include: ["DUOLINGO"] },
  "gcse-preparation-course-97ec8c86": { include: ["GCSE"], exclude: ["GCSE ENGLISH"] },
  "gcse-english-017a23a5": { include: ["GCSE ENGLISH"] },
  "igcse-preparation-course-5ed7859f": { include: ["IGCSE"] },
  "a-level-preparation-course-6ede4ec7": { include: ["A LEVEL", "A-LEVEL"] },
  "ib-diploma-preparation-course-9e537a20": { include: ["IB"] },
  "ap-exam-preparation-course-cceffa19": { include: ["AP"] },
};

export const courseSubjectContent: Record<string, CourseSubjectContent> = {
  // ---------------------------------------------------------------------
  // Programming & Technology (13)
  // ---------------------------------------------------------------------
  "python-ff654450": {
    differentiation:
      "Python has an enormous self-paced catalog — Udemy courses, Coursera specializations, freeCodeCamp, Codecademy tracks. Those are fine for watching someone else code, but they can't tell you why your specific script is throwing an error right now. A TutorA Python tutor works with you live, 1:1, looking at your actual code and pacing lessons to what you're stuck on, rather than moving everyone through the same fixed video curriculum. Every tutor is reviewed by TutorA's team before being matched — most are based in India, with each profile showing their specific programming background — and pricing is shown up front rather than bundled into a subscription.",
    faqs: [
      {
        q: "Do I need to know anything about programming before starting Python lessons?",
        a: "No — Python tutoring on TutorA is matched to your level, so complete beginners and learners with some coding background both work. Your tutor adjusts pace and material to where you're actually starting from, not a fixed syllabus.",
      },
      {
        q: "What can a Python tutor help with beyond following a course?",
        a: "A live tutor can debug the code you're actually writing, explain errors as they happen, and answer follow-up questions a pre-recorded video can't — useful whether you're learning fundamentals, working on a school project, or picking up Python for data work.",
      },
      {
        q: "Is Python hard to learn?",
        a: "Python is generally considered approachable to start with because of its readable syntax, but how quickly it clicks depends on your background and how consistently you practice — a 1:1 tutor can help you move at a pace that fits you rather than a one-size-fits-all course schedule.",
      },
      {
        q: "Do I get a certificate after completing Python tutoring?",
        a: "No. TutorA sessions are live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion — the focus is on real progress with your tutor.",
      },
      {
        q: "How much does a Python tutor cost?",
        a: "Pricing varies by tutor and is shown on this page before you request a session — there's no flat platform-wide rate.",
      },
      {
        q: "Are TutorA's Python tutors based in India?",
        a: "In most cases, yes. Our tutor pool skews heavily India-based, and every profile lists that tutor's actual programming background rather than a generic bio.",
      },
    ],
  },
  "javascript-ac5adb0a": {
    differentiation:
      "JavaScript has no shortage of self-paced options — Udemy bootcamp bundles, freeCodeCamp's curriculum, Codecademy's browser exercises. Those work well for typing along with a video, but they don't adapt when your code behaves differently than the instructor's. A TutorA JavaScript tutor reviews your actual project or assignment in a live 1:1 session and adjusts explanations to where you're stuck, instead of moving everyone through the same fixed track. Every tutor is reviewed by TutorA before being matched, with pricing shown upfront rather than folded into a subscription. The JavaScript tutor you're matched with is usually India-based — their profile lists real project and language experience, not just a generic bio.",
    faqs: [
      {
        q: "Can a JavaScript tutor help me build a specific project, not just follow a course?",
        a: "Yes — live 1:1 sessions can focus on whatever you're actually working on, whether that's a class assignment, a personal project, or fixing a specific bug, rather than a fixed video syllabus.",
      },
      {
        q: "Do I need prior coding experience to start JavaScript tutoring?",
        a: "No. Sessions are matched to your current level, from complete beginners to learners who already know another language and want to pick up JavaScript.",
      },
      {
        q: "What's the difference between learning JavaScript from a tutor versus a platform like Udemy?",
        a: "Udemy-style courses are pre-recorded and the same for everyone; a TutorA tutor works with you live, can see your actual code, and adjusts the pace and explanations in real time.",
      },
      {
        q: "Is there a certificate after finishing JavaScript tutoring on TutorA?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "How is pricing set for JavaScript lessons?",
        a: "Pricing depends on the tutor and is shown before you request a session — there's no single fixed rate across all tutors.",
      },
      { q: "Are TutorA's JavaScript tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },
  "sql-90d171c1": {
    differentiation:
      "SQL tutorials are everywhere for free, and structured SQL courses on Udemy or Coursera can walk you through the syntax. What they can't do is look at your actual query and your actual database schema and explain why a join isn't returning what you expect. A TutorA SQL tutor works with your real queries in live 1:1 sessions, and every tutor is reviewed by TutorA before being matched, so you're not guessing which unverified instructor to trust. Pricing is shown before you book, not hidden behind a subscription. Most SQL tutoring on TutorA comes from India-based tutors with real, verifiable programming experience listed on their own profile.",
    faqs: [
      {
        q: "Do I need a specific database (MySQL, PostgreSQL, etc.) before starting SQL tutoring?",
        a: "Not necessarily — let your tutor know which database or use case you're working with (schoolwork, a job requirement, a personal project) and sessions can be matched to it.",
      },
      {
        q: "Can SQL tutoring help with a specific class assignment or work project?",
        a: "Yes — live 1:1 sessions can focus on the actual queries or schema you're working with, rather than a generic pre-recorded curriculum.",
      },
      {
        q: "Is SQL hard to learn?",
        a: "The basics (SELECT, WHERE, JOIN) are usually approachable; it's applying them to real, messy data that trips people up — which is exactly where 1:1 feedback helps more than a fixed video course.",
      },
      {
        q: "Is there a certificate for completing SQL tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      {
        q: "How much does an SQL tutor cost?",
        a: "Pricing varies by tutor and is shown on this page before you request a session.",
      },
      { q: "Are TutorA's SQL tutors based in India?", a: "Yes, most of them. TutorA's coding tutors are predominantly India-based, with real project and language experience listed on their own profile — reviewed by our team before ever being matched." },
    ],
  },
  "java-48483b48": {
    differentiation:
      "Java has long-established self-paced tracks on Udemy, Coursera, and elsewhere. They're fine for a first pass at syntax, but they can't debug the actual compiler error on your screen or explain why your class isn't behaving the way you expect. A TutorA Java tutor works through your real code with you in live 1:1 sessions, matched to your level rather than a fixed cohort schedule. Every tutor is reviewed before being matched, and pricing is shown upfront. TutorA's Java tutors are predominantly based in India, reviewed before being matched rather than assigned automatically — their profile shows their actual coding background.",
    faqs: [
      {
        q: "Do I need Java installed already, or will my tutor help with setup?",
        a: "Your tutor can help you get your development environment (JDK, an IDE) set up as part of your sessions if you haven't already.",
      },
      {
        q: "Is Java tutoring useful for exam or coursework prep specifically?",
        a: "Yes — sessions can focus on the actual assignments, projects, or exam material you're working through, not just generic syntax lessons.",
      },
      {
        q: "How is this different from a Udemy Java course?",
        a: "A Udemy course is pre-recorded and identical for every student; a TutorA tutor works with your real code live and adjusts explanations to what you're actually stuck on.",
      },
      {
        q: "Is there a certificate after Java tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "How much do Java lessons cost?",
        a: "Pricing depends on the tutor and is shown before you request a session.",
      },
      { q: "Are TutorA's Java tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },
  "c-95361960": {
    differentiation:
      "C++ is taught on plenty of self-paced platforms, but its trickier concepts — pointers, memory management, compiler errors that don't explain themselves — are exactly where a fixed video course tends to lose people. A TutorA C++ tutor can walk through your actual code and error messages with you in a live 1:1 session, at your pace, rather than moving on regardless of whether it clicked. Every tutor is reviewed by TutorA before being matched, with pricing shown before you book. Most C++ tutoring on TutorA comes from India-based tutors with real, verifiable programming experience listed on their own profile.",
    faqs: [
      {
        q: "Is C++ tutoring only for computer science students?",
        a: "No — it's useful for coursework, competitive programming, or anyone who wants a solid foundation in the language, matched to your specific goal.",
      },
      {
        q: "Can a tutor help me understand pointers and memory management specifically?",
        a: "Yes — that's exactly the kind of concept live 1:1 explanation tends to help with more than a fixed video, since your tutor can adjust the explanation until it clicks for you.",
      },
      {
        q: "Is C++ harder to learn than other languages?",
        a: "Many learners find it more demanding than higher-level languages like Python because it requires more manual memory management — a 1:1 tutor can help you work through that at a pace that fits you rather than a fixed course schedule.",
      },
      {
        q: "Do I get a certificate for completing C++ tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      {
        q: "How much does a C++ tutor cost?",
        a: "Pricing varies by tutor and is shown on this page before you request a session.",
      },
      { q: "Are TutorA's C++ tutors based in India?", a: "Yes, most of them. TutorA's coding tutors are predominantly India-based, with real project and language experience listed on their own profile — reviewed by our team before ever being matched." },
    ],
  },
  "html-css-fb9cd7a2": {
    differentiation:
      "HTML and CSS have some of the largest free self-paced libraries online — freeCodeCamp, W3Schools, Codecademy — because the basics are genuinely easy to find for free. Where a TutorA tutor adds value is live feedback on your actual layout: why a flexbox isn't behaving, why your page looks different on mobile, why your CSS specificity is fighting itself. Sessions are 1:1 and matched to your level, and every tutor is reviewed before being paired with you. TutorA's HTML & CSS tutors are predominantly based in India, reviewed before being matched rather than assigned automatically — their profile shows their actual coding background.",
    faqs: [
      {
        q: "Is HTML & CSS tutoring useful if I already know some basics?",
        a: "Yes — sessions are matched to your level, so you can focus on layout, responsiveness, or specific problems in a real project rather than starting from scratch.",
      },
      {
        q: "Can a tutor help debug my actual website or project?",
        a: "Yes — live 1:1 sessions can work directly with the code and layout you're building, not just generic examples.",
      },
      {
        q: "Do I need any software installed before starting?",
        a: "Just a code editor and a browser — your tutor can point you to free options if you don't already have one set up.",
      },
      {
        q: "Is there a certificate after HTML & CSS tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "How much do HTML & CSS lessons cost?",
        a: "Pricing depends on the tutor and is shown before you request a session.",
      },
      { q: "Are TutorA's HTML & CSS tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },
  "computer-science-758eff7f": {
    differentiation:
      "Computer science has no shortage of free and paid self-paced material — MOOCs, textbook-based Coursera specializations, YouTube lecture series. They're a reasonable first exposure to concepts like algorithms or data structures, but they don't stop to answer your specific question about why a proof or a piece of code isn't working. A TutorA computer science tutor works through the actual material you're studying — coursework, interview prep, a specific topic — in live 1:1 sessions matched to your level. Every tutor is reviewed before being matched, and pricing is shown before you book. The Computer Science tutor you're matched with is usually India-based — their profile lists real project and language experience, not just a generic bio.",
    faqs: [
      {
        q: "Is computer science tutoring for a specific course, or general concepts?",
        a: "Both — sessions can be matched to a specific class or curriculum you're following, or used to work through general concepts like algorithms and data structures at your own pace.",
      },
      {
        q: "Can a tutor help with technical interview or coding-challenge prep?",
        a: "Yes — that's a common reason students request computer science tutoring, and sessions can be focused on the specific topics you need.",
      },
      {
        q: "Do I need prior programming experience?",
        a: "It depends on what you want to cover — let your tutor know your background so sessions can be matched appropriately, whether you're starting from fundamentals or going deeper into a specific area.",
      },
      {
        q: "Is there a certificate for completing computer science tutoring?",
        a: "No — TutorA courses are live 1:1 tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      {
        q: "How much does a computer science tutor cost?",
        a: "Pricing varies by tutor and is shown on this page before you request a session.",
      },
      { q: "Are TutorA's Computer Science tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },
  "data-science-6209e272": {
    differentiation:
      "Data science has become a crowded self-paced category — Coursera specializations, Udemy bootcamp bundles, exercise-driven courses on other platforms. They're useful for a structured first pass, but they can't look at your actual dataset or explain why your model isn't behaving the way a textbook example does. A TutorA data science tutor works with you live and 1:1, adapting to the tools and problems you're actually using — Python, statistics, a specific project — rather than a fixed curriculum. Every tutor is reviewed before being matched, with pricing shown upfront. The Data Science tutor you're matched with is usually India-based — their profile lists real project and language experience, not just a generic bio.",
    faqs: [
      {
        q: "Does data science tutoring cover both the statistics and the programming side?",
        a: "Sessions can be matched to what you actually need — statistics fundamentals, Python/pandas work, a specific project, or a mix — based on your goals.",
      },
      {
        q: "Can a tutor help with a real dataset or project I'm working on?",
        a: "Yes — live 1:1 sessions can work directly with your actual data and code rather than generic textbook examples.",
      },
      {
        q: "Do I need to already know Python or statistics to start?",
        a: "No — tutoring is matched to your current level, whether you're a complete beginner or already have some background and want to go further.",
      },
      {
        q: "Is there a certificate after data science tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "How much does a data science tutor cost?",
        a: "Pricing depends on the tutor and is shown before you request a session.",
      },
      { q: "Are TutorA's Data Science tutors based in India?", a: "In most cases, yes. Our tutor pool skews heavily India-based, and every profile lists that tutor's actual programming background rather than a generic bio." },
    ],
  },
  "ai-machine-learning-advanced-e4eabe28": {
    differentiation:
      "Advanced AI and machine learning courses on Coursera, Udemy, or standalone MOOCs can walk you through the math and code at a fixed pace, but they can't debug why your specific model isn't converging or answer a follow-up question about your actual project. A TutorA tutor works with you live and 1:1 on the material you're actually stuck on — a specific architecture, a paper, a project — rather than a one-size-fits-all syllabus. Every tutor is reviewed before being matched, and pricing is shown before you book. Most AI & Machine Learning tutoring on TutorA comes from India-based tutors with real, verifiable programming experience listed on their own profile.",
    faqs: [
      {
        q: "Is this tutoring for complete beginners or people with an ML background already?",
        a: "This course is aimed at more advanced learners — sessions are matched to your existing background so you can go deeper into specific topics rather than repeating fundamentals.",
      },
      {
        q: "Can a tutor help me with a specific research project or model I'm building?",
        a: "Yes — live 1:1 sessions can focus on the actual project, paper, or problem you're working on.",
      },
      {
        q: "What topics can advanced AI/ML tutoring cover?",
        a: "It depends on your goals and background — let your tutor know what you're working on (a specific architecture, a research area, applied projects) so sessions can be matched to it.",
      },
      {
        q: "Is there a certificate for completing this tutoring?",
        a: "No — TutorA courses are live 1:1 tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      {
        q: "How much does an AI/ML tutor cost?",
        a: "Pricing varies by tutor and is shown on this page before you request a session.",
      },
      { q: "Are TutorA's AI & Machine Learning tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },
  "ai-for-beginners-0939362a": {
    differentiation:
      "There's no shortage of beginner-friendly AI content online — YouTube explainers, Coursera's introductory specializations, short Udemy courses. They're a fine starting point, but they move at the same pace for everyone and can't answer your specific follow-up question. A TutorA AI for Beginners tutor works with you live, 1:1, explaining concepts at your pace rather than a fixed video timeline. Every tutor is reviewed before being matched, and pricing is shown before you book — no bundled subscription. TutorA's AI tutors are predominantly based in India, reviewed before being matched rather than assigned automatically — their profile shows their actual coding background.",
    faqs: [
      {
        q: "Do I need any programming or math background to start?",
        a: "No — this course is aimed at beginners, so sessions can start from the fundamentals and build up based on what you already know.",
      },
      {
        q: "What does \"AI for Beginners\" tutoring actually cover?",
        a: "Sessions are matched to your goals and current level — this could mean core concepts, hands-on tools, or a mix, depending on what you're trying to learn.",
      },
      {
        q: "How is this different from a free YouTube series on AI?",
        a: "A YouTube series is the same for every viewer; a live 1:1 tutor can answer your specific questions and adjust pacing as you go.",
      },
      {
        q: "Is there a certificate after completing this course?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "How much does AI for Beginners tutoring cost?",
        a: "Pricing depends on the tutor and is shown before you request a session.",
      },
      { q: "Are TutorA's AI tutors based in India?", a: "In most cases, yes. Our tutor pool skews heavily India-based, and every profile lists that tutor's actual programming background rather than a generic bio." },
    ],
  },
  "react-for-beginners-327c29e1": {
    differentiation:
      "React tutorials and bootcamp-style courses are everywhere — Udemy, freeCodeCamp, the official docs' own walkthrough. They're a reasonable way to see the syntax once, but they can't debug why your specific component isn't re-rendering or explain a concept a second way if the first explanation didn't land. A TutorA React tutor works with your actual code in live 1:1 sessions, adjusting to what you're building rather than a fixed course outline. Every tutor is reviewed before being matched, with pricing shown before you book. Most of TutorA's React tutors are based in India, and each profile shows their specific programming background, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Do I need to know JavaScript before starting React tutoring?",
        a: "Some JavaScript familiarity helps, but let your tutor know your background — sessions can be matched to fill in gaps as needed.",
      },
      {
        q: "Can a tutor help debug my actual React project?",
        a: "Yes — live 1:1 sessions can work directly with the component or project you're building, not just generic examples.",
      },
      {
        q: "Is React tutoring useful for a specific class or bootcamp I'm already taking?",
        a: "Yes — sessions can be used alongside another course or bootcamp to work through whatever's actually confusing you.",
      },
      {
        q: "Is there a certificate after React tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      {
        q: "How much do React lessons cost?",
        a: "Pricing varies by tutor and is shown on this page before you request a session.",
      },
      { q: "Are TutorA's React tutors based in India?", a: "Yes, most of them. TutorA's coding tutors are predominantly India-based, with real project and language experience listed on their own profile — reviewed by our team before ever being matched." },
    ],
  },
  "scratch-programming-for-kids-7fa6fba9": {
    differentiation:
      "Scratch has plenty of free tutorials built for kids, from the Scratch website's own guides to YouTube channels. They're a fine way to poke around on your own, but a child working alone can get stuck on a small logic problem and lose interest fast. A TutorA Scratch tutor works with your child live and 1:1, guiding them through the specific project they're building rather than a generic, one-size-fits-all lesson. Every tutor is reviewed before being matched, and pricing is shown before you book. Your child's tutor is, in most cases, based in India and already vetted by our team beforehand — you can check their profile and real background before the first session.",
    faqs: [
      {
        q: "What age is Scratch programming tutoring suitable for?",
        a: "Scratch is generally designed for children and young learners; let your tutor know your child's age and experience so sessions can be paced appropriately.",
      },
      {
        q: "Does my child need any prior coding experience?",
        a: "No — Scratch is designed as an introductory, visual way to learn programming logic, and sessions can start from the basics.",
      },
      {
        q: "Can a tutor help with a specific Scratch project my child is building?",
        a: "Yes — live 1:1 sessions can focus on whatever project or assignment your child is working on, with real-time feedback and encouragement.",
      },
      {
        q: "Is there a certificate after finishing Scratch tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      {
        q: "How much does Scratch tutoring cost?",
        a: "Pricing depends on the tutor and is shown before you request a session.",
      },
      { q: "Where are TutorA's tutors based?", a: "Most of TutorA's tutors are India-based, vetted by our team beforehand — you can check their profile for their actual background before the first session." },
    ],
  },
  "robotics-for-kids-3b988a24": {
    differentiation:
      "Robotics kits for kids increasingly come with their own self-paced video content, and there are general robotics tutorials online too. Those are fine for a first look, but robotics is hands-on by nature — a child working through a build or a coding step alone can get stuck in a way a video can't help with. A TutorA robotics tutor works with your child live and 1:1, troubleshooting the actual build or code in real time rather than a fixed lesson sequence. Every tutor is reviewed before being matched, with pricing shown before you book. Most tutors matched for this subject are based in India, with our team reviewing them first — their profile is there for you to check before booking.",
    faqs: [
      {
        q: "Does my child need a specific robotics kit before starting?",
        a: "It depends on the tutor and what you already have — mention any kit or equipment you own when requesting a tutor so sessions can be matched to it.",
      },
      {
        q: "What age range is robotics tutoring suitable for?",
        a: "Let your tutor know your child's age and experience level; sessions can be paced for younger beginners or older kids who already know some basics.",
      },
      {
        q: "Does robotics tutoring cover coding as well as building?",
        a: "It can — robotics often combines physical building with programming, and sessions can be matched to whichever part your child needs more help with.",
      },
      {
        q: "Is there a certificate after robotics tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "How much does robotics tutoring cost?",
        a: "Pricing varies by tutor and is shown on this page before you request a session.",
      },
      { q: "Where are TutorA's tutors based?", a: "Generally, yes — most of TutorA's tutors are based in India, and every one is reviewed by our team before being matched with your child. Their profile shows their real background and experience." },
    ],
  },

  // ---------------------------------------------------------------------
  // Languages (14)
  // ---------------------------------------------------------------------
  "spanish-2dd27e6e": {
    differentiation:
      "Spanish is one of the most-covered languages on self-paced apps like Duolingo and Babbel, plus structured courses on Coursera. Those are useful for vocabulary drills, but they can't hold a real conversation with you or correct your pronunciation in the moment. A TutorA Spanish tutor gives you live 1:1 conversation and correction, matched to your actual level and goals — exam prep, travel, conversational fluency — rather than a fixed app curriculum. Every tutor is reviewed before being matched, and pricing is shown before you book.",
    faqs: [
      {
        q: "Do I need any prior Spanish knowledge to start?",
        a: "No — tutoring is matched to your level, from complete beginners to learners who want to refine fluency.",
      },
      {
        q: "Can Spanish tutoring focus on conversation practice specifically?",
        a: "Yes — let your tutor know your goal (conversation, grammar, exam prep, a specific dialect) and sessions can be matched accordingly.",
      },
      {
        q: "Is Spanish tutoring available for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor so sessions can be paced appropriately.",
      },
      {
        q: "How is this different from using Duolingo or Babbel?",
        a: "Apps are self-paced and can't hold a real conversation with you; a live tutor listens, corrects pronunciation, and adapts to what you're actually struggling with.",
      },
      {
        q: "Is there a certificate for completing Spanish tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "french-520eb7f0": {
    differentiation:
      "French has a deep self-paced ecosystem too — Duolingo, Babbel, and structured Coursera courses all cover grammar and vocabulary. What they can't do is have an actual conversation with you or catch a pronunciation habit before it sets in. A TutorA French tutor works with you live and 1:1, correcting and conversing in real time and adjusting to your specific goals, whether that's exam prep, travel, or general fluency. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need to already know some French to start?",
        a: "No — tutoring is matched to your level, whether you're starting from zero or want to build on existing knowledge.",
      },
      {
        q: "Can a tutor help with French pronunciation specifically?",
        a: "Yes — live conversation is one of the main advantages over an app, since your tutor can hear and correct pronunciation in real time.",
      },
      {
        q: "Is French tutoring suitable for kids?",
        a: "Yes — let your tutor know your child's age and level so sessions can be paced appropriately.",
      },
      {
        q: "How does this compare to using an app like Duolingo?",
        a: "Apps are useful for vocabulary drills but can't converse with you; a live tutor adapts to your actual mistakes and goals in real time.",
      },
      {
        q: "Is there a certificate for French tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
    ],
  },
  "german-a83fb505": {
    differentiation:
      "Free and paid self-paced German content is easy to find, from Duolingo's gamified lessons to Babbel's structured courses. They're fine for building vocabulary on your own time, but German's case system and word order trip up a lot of self-taught learners in ways an app doesn't catch. A TutorA German tutor works through your actual mistakes with you live, 1:1, at a pace matched to your level rather than a fixed app track. Every tutor is reviewed before being matched, and pricing is shown before you book.",
    faqs: [
      {
        q: "Do I need prior German knowledge before starting?",
        a: "No — sessions are matched to your level, from complete beginners to learners working on more advanced grammar.",
      },
      {
        q: "Can a tutor help specifically with German grammar, like cases and word order?",
        a: "Yes — that's exactly the kind of thing live, 1:1 correction tends to help with more than a self-paced app.",
      },
      {
        q: "Is German tutoring available for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is tutoring different from an app like Babbel?",
        a: "An app repeats the same exercises for everyone; a tutor listens to you speak, corrects mistakes as they happen, and adjusts to your actual goals.",
      },
      {
        q: "Is there a certificate for German tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "italian-0bce3f0c": {
    differentiation:
      "Italian has plenty of self-paced options — Duolingo, Babbel, Coursera-style courses — that cover vocabulary and basic grammar well. What they can't offer is real conversation practice or pronunciation correction in the moment. A TutorA Italian tutor works with you live and 1:1, matched to your actual goals, whether that's travel conversation, grammar, or exam preparation. Every tutor is reviewed before being matched, with pricing shown before you book.",
    courseDetail:
      "Italian tutoring on TutorA typically moves through stages, though your tutor adjusts based on where you're actually starting: early sessions focus on core verb conjugation (present tense first, since irregular verbs like essere, avere, and andare show up constantly in real conversation), noun-gender agreement, and everyday vocabulary for situations you actually need — travel, family, work. Once that's solid, sessions usually shift toward past tenses — passato prossimo vs. imperfetto is the classic sticking point for English speakers, since Italian splits what English treats as a single past tense — and more natural sentence structure. Later sessions lean conversation-driven: your tutor pushes you to answer in full sentences rather than single words, and corrects pronunciation live, including double-consonant sounds (nonno vs. nono) that self-paced apps rarely catch. If your goal is a specific trip, exam, or work requirement rather than general fluency, mention it when requesting a tutor — sessions can be weighted toward that instead of following a fixed order. Between sessions, most tutors suggest some form of spaced repetition (flashcard apps work fine for this) to hold onto new vocabulary — the live session is best spent on the things a flashcard app can't do, like conversation and pronunciation, rather than rote memorization your tutor doesn't need to sit and watch.",
    faqs: [
      {
        q: "Do I need any Italian background to start tutoring?",
        a: "No — sessions are matched to your level, from complete beginners onward.",
      },
      {
        q: "Can Italian tutoring focus on conversation for an upcoming trip?",
        a: "Yes — let your tutor know your goal and sessions can be matched to practical conversation rather than just grammar drills.",
      },
      {
        q: "Is Italian tutoring suitable for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is this different from an app-based course?",
        a: "Apps can't hold a real conversation or correct your pronunciation live; a tutor does both, in real time.",
      },
      {
        q: "Is there a certificate for completing Italian tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      {
        q: "How long does it typically take to become conversational in Italian?",
        a: "It varies a lot by how often you practice, but many learners reach basic conversational ability (roughly CEFR A2-B1) after around 100-150 hours of active practice split between lessons and self-study — a live tutor tends to speed that up by catching mistakes immediately instead of letting them become habits.",
      },
      {
        q: "Does a TutorA Italian tutor follow the CEFR framework?",
        a: "Tutors generally reference CEFR levels (A1 through C2) informally to gauge where you're starting and set goals, though sessions are shaped around your actual conversation and grammar gaps rather than a fixed CEFR curriculum.",
      },
      {
        q: "Can Italian tutoring help me prepare for a certification exam like CILS or CELI?",
        a: "Yes — mention which certification (CILS, CELI, or another) and your target level when requesting a tutor, so sessions can focus on that exam's specific format rather than general conversation practice.",
      },
    ],
  },
  "portuguese-4702233f": {
    differentiation:
      "Portuguese self-paced options exist — Duolingo, Babbel, and general online courses — but they cover a fairly generic version of the language and can't tell you whether you're picking up European or Brazilian pronunciation habits that don't fit your goal. A TutorA Portuguese tutor works with you live, matched to what you actually need — a specific variant, conversation practice, or grammar — rather than a fixed app track. Every tutor is reviewed before being matched, and pricing is shown before you book.",
    faqs: [
      {
        q: "Can I request a tutor for a specific variant of Portuguese (Brazilian or European)?",
        a: "Yes — mention your preference when requesting a tutor so you can be matched accordingly.",
      },
      {
        q: "Do I need prior Portuguese experience to start?",
        a: "No — sessions are matched to your level, from complete beginners to more advanced learners.",
      },
      {
        q: "Is Portuguese tutoring available for kids?",
        a: "Yes — let your tutor know your child's age and level.",
      },
      {
        q: "How does this compare to a self-paced app?",
        a: "An app can't have a real conversation with you or adjust to a specific goal the way a live tutor can.",
      },
      {
        q: "Is there a certificate for Portuguese tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "russian-7692b797": {
    differentiation:
      "Russian is covered by the usual self-paced apps and Coursera-style courses, but its alphabet, case system, and pronunciation are exactly the kind of thing that benefits from a real person listening and correcting you, not a repeat-after-the-recording exercise. A TutorA Russian tutor works with you live, 1:1, matched to your level and goals. Every tutor is reviewed before being matched, and pricing is shown before you book — no bundled subscription.",
    faqs: [
      {
        q: "Do I need to already know the Cyrillic alphabet to start?",
        a: "No — if you're starting from zero, let your tutor know and sessions can begin with the alphabet and pronunciation basics.",
      },
      {
        q: "Can a tutor help with Russian's case system specifically?",
        a: "Yes — grammar concepts like cases are exactly where live, 1:1 explanation tends to help more than a self-paced app.",
      },
      {
        q: "Is Russian tutoring suitable for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is this different from an app like Duolingo?",
        a: "An app repeats fixed exercises; a tutor listens to your actual speech and adapts explanations to what's confusing you.",
      },
      {
        q: "Is there a certificate for Russian tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
    ],
  },
  "chinese-mandarin-81d5f035": {
    differentiation:
      "Mandarin has a huge self-paced footprint — Duolingo, dedicated language apps, and structured online courses. They're useful for characters and vocabulary, but Mandarin's tones are genuinely hard to self-correct from an app; you need someone listening to tell you when a tone is off. A TutorA Mandarin tutor works with you live, 1:1, correcting pronunciation and tone in real time and adjusting to your goals — conversation, characters, or exam prep. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need to already know Chinese characters to start?",
        a: "No — sessions are matched to your level, whether you're starting from pinyin and basic characters or already reading and want to go further.",
      },
      {
        q: "Can a tutor help specifically with Mandarin tones and pronunciation?",
        a: "Yes — that's one of the clearest advantages of live tutoring over an app, since your tutor can hear and correct your tones in real time.",
      },
      {
        q: "Is Mandarin tutoring available for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is this different from an app-based course?",
        a: "An app can't listen to your pronunciation and correct it live; a tutor can, and adjusts to your actual goals.",
      },
      {
        q: "Is there a certificate for Mandarin tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "japanese-34b5d228": {
    differentiation:
      "Japanese has a large self-paced following — Duolingo, dedicated apps, and structured online courses covering hiragana, katakana, and kanji. They're fine for memorization drills, but conversation practice and pronunciation feedback are hard to get from an app alone. A TutorA Japanese tutor works with you live, 1:1, matched to your level — whether that's starting with the writing systems or working on conversational fluency. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need to know hiragana or katakana before starting?",
        a: "No — if you're starting from scratch, your tutor can begin with the writing systems before moving to vocabulary and conversation.",
      },
      {
        q: "Can a tutor help with conversation practice specifically?",
        a: "Yes — let your tutor know your goal and sessions can focus on speaking practice rather than just written exercises.",
      },
      {
        q: "Is Japanese tutoring suitable for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is this different from a self-paced app?",
        a: "An app repeats the same drills for everyone; a tutor listens to your actual speech and adjusts pacing and correction to you specifically.",
      },
      {
        q: "Is there a certificate for Japanese tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
    ],
  },
  "korean-3be8ff00": {
    differentiation:
      "Korean has grown into a well-covered self-paced category — Duolingo, dedicated apps, and YouTube channels all offer structured lessons. They're a reasonable way to pick up vocabulary, but conversation practice and pronunciation feedback are hard to get without a real person listening. A TutorA Korean tutor works with you live, 1:1, matched to your goals, whether that's Hangul basics, grammar, or conversational fluency. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need to already know Hangul before starting?",
        a: "No — your tutor can start with the Korean alphabet if you're new, then build up from there.",
      },
      {
        q: "Can Korean tutoring focus on conversation practice?",
        a: "Yes — let your tutor know your goal and sessions can prioritize speaking and listening over written drills.",
      },
      {
        q: "Is Korean tutoring available for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is this different from an app-based course?",
        a: "An app can't hold a conversation with you or correct pronunciation live; a tutor does both and adapts to your actual pace.",
      },
      {
        q: "Is there a certificate for Korean tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "arabic-bee72fa4": {
    differentiation:
      "Arabic self-paced options exist, but the language varies significantly by dialect and register in ways a generic app course often glosses over. A TutorA Arabic tutor can work with you on the specific variant you need — Modern Standard Arabic, a regional dialect, or a mix — in live 1:1 sessions, correcting pronunciation and adapting to your goals as you go. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Can I choose Modern Standard Arabic or a specific dialect?",
        a: "Yes — mention your goal when requesting a tutor so you can be matched to someone who covers what you actually need.",
      },
      {
        q: "Do I need prior Arabic knowledge to start?",
        a: "No — sessions are matched to your level, from complete beginners onward.",
      },
      {
        q: "Is Arabic tutoring suitable for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is this different from a self-paced app?",
        a: "An app teaches a fixed, generic version of the language; a tutor can adjust to the specific dialect, pace, and goals you actually have.",
      },
      {
        q: "Is there a certificate for Arabic tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
    ],
  },
  "hindi-language-course-459bc4ba": {
    differentiation:
      "Hindi has some self-paced coverage on general language apps, but it's far thinner than the catalog for languages like Spanish or French — which makes structured, real conversation practice even more valuable. A TutorA Hindi tutor works with you live, 1:1, matched to your goals, whether that's conversational fluency, reading Devanagari script, or preparing for a specific context like family or travel. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need to know the Devanagari script before starting?",
        a: "No — your tutor can start with the script if you're new, or work on conversation first if reading isn't your priority.",
      },
      {
        q: "Is Hindi tutoring suitable for kids or heritage learners?",
        a: "Yes — mention your goal and background (a young learner, a heritage speaker wanting to improve fluency, a complete beginner) when requesting a tutor.",
      },
      {
        q: "Can Hindi tutoring focus on conversation rather than grammar?",
        a: "Yes — let your tutor know your priority and sessions can be matched accordingly.",
      },
      {
        q: "How is this different from a general language app?",
        a: "Hindi content on general apps tends to be limited; a live tutor can adapt directly to your goals in a way a thin app catalog can't.",
      },
      {
        q: "Is there a certificate for Hindi tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "sanskrit-5eea98ab": {
    differentiation:
      "Sanskrit has very little dedicated coverage on mainstream self-paced apps compared to modern spoken languages — most free content is scattered across forums, textbooks, and academic sites rather than a structured course. A TutorA Sanskrit tutor gives you live, 1:1 guidance matched to your actual goal, whether that's grammar, reading classical texts, or a specific academic or personal interest. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Is Sanskrit tutoring aimed at academic study, text study, or spoken conversation?",
        a: "It can be any of these — let your tutor know your specific goal so sessions can be matched to it.",
      },
      {
        q: "Do I need prior knowledge of Devanagari script to start?",
        a: "No — your tutor can start with the script and basic grammar if you're new to it.",
      },
      {
        q: "Is Sanskrit tutoring suitable for students studying it as part of a course?",
        a: "Yes — sessions can be matched to a specific curriculum, textbook, or exam you're working through.",
      },
      {
        q: "Why choose a tutor over free online Sanskrit resources?",
        a: "Free resources for Sanskrit are scattered and inconsistent in quality; a live tutor gives you consistent, 1:1 guidance matched to your specific goal.",
      },
      {
        q: "Is there a certificate for Sanskrit tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
    ],
  },
  "spoken-english-course-5dbc4867": {
    differentiation:
      "Spoken English practice is available through apps and generic conversation-practice tools, but they mostly work from scripted prompts rather than a real, responsive conversation. A TutorA Spoken English tutor gives you live 1:1 conversation practice, correcting pronunciation, fluency, and confidence in real time and adapting to your specific goals — everyday conversation, workplace communication, or general confidence. Every tutor is reviewed before being matched, with pricing shown before you book. For Spoken English, most TutorA tutors are based in India and go through our team's review process before ever being matched — their profile lists their actual background.",
    faqs: [
      {
        q: "Is Spoken English tutoring for beginners or people who already speak some English?",
        a: "Both — sessions are matched to your current level, whether you're building basic conversational skills or refining fluency and confidence.",
      },
      {
        q: "Can tutoring focus on a specific goal, like interviews or everyday conversation?",
        a: "Yes — let your tutor know your goal so sessions can be matched to it rather than generic conversation drills.",
      },
      {
        q: "Is Spoken English tutoring available for kids?",
        a: "Yes — mention your child's age and level when requesting a tutor.",
      },
      {
        q: "How is this different from an app-based conversation practice tool?",
        a: "An app works from scripted prompts; a live tutor has a real, responsive conversation with you and corrects mistakes as they happen.",
      },
      {
        q: "Is there a certificate for Spoken English tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      { q: "Are TutorA's Spoken English tutors based in India?", a: "In most cases, yes. India is where the majority of TutorA's tutor pool is based, and every tutor is vetted by our team beforehand — check their individual profile for their specific experience before you book." },
    ],
  },
  "business-english-course-e6a73822": {
    differentiation:
      "Business English content online tends to be generic — templated email phrases, canned presentation scripts — rather than tailored to your actual role or industry. A TutorA Business English tutor works with you live, 1:1, on the specific communication situations you deal with, whether that's emails, meetings, presentations, or negotiation, rather than a fixed set of templates. Every tutor is reviewed before being matched, with pricing shown before you book. Most of TutorA's Business English tutors are based in India and reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      {
        q: "Can Business English tutoring focus on my specific industry or role?",
        a: "Yes — let your tutor know your field and typical communication situations (emails, meetings, presentations) so sessions can be matched to them.",
      },
      {
        q: "Is this suitable for intermediate English speakers, or do I need to be advanced?",
        a: "Sessions are matched to your current level — Business English tutoring works for intermediate speakers building professional vocabulary as well as advanced speakers polishing fluency.",
      },
      {
        q: "Can a tutor help me prepare for a specific presentation or meeting?",
        a: "Yes — live 1:1 sessions can focus on real, upcoming situations rather than generic scripted examples.",
      },
      {
        q: "How is this different from generic Business English templates online?",
        a: "Templates are the same for everyone; a tutor adapts to your actual role, industry, and communication style.",
      },
      {
        q: "Is there a certificate for Business English tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      { q: "Are TutorA's Business English tutors based in India?", a: "Yes, for most tutors on TutorA. Our team reviews every tutor before they're matched with a student, regardless of location, and their profile shows their real background — most happen to be India-based." },
    ],
  },

  // ---------------------------------------------------------------------
  // Creative Skills (5)
  // ---------------------------------------------------------------------
  "adobe-photoshop-394813c4": {
    differentiation:
      "Photoshop has a massive self-paced footprint — Udemy bundles, Skillshare classes, YouTube tutorials for nearly every technique. They're good for watching someone else work, but they can't look at your actual file and tell you why your layer isn't blending the way you expect. A TutorA Photoshop tutor works with your real project live, 1:1, adjusting to what you're actually trying to make rather than a fixed tutorial sequence. Every tutor is reviewed before being matched, with pricing shown before you book. Most of TutorA's Adobe Photoshop tutors are based in India, and each profile shows their specific programming background, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Do I need a Photoshop license before starting tutoring?",
        a: "Yes, you'll need access to Photoshop yourself; your tutor can work with you on techniques and projects but sessions don't include the software.",
      },
      {
        q: "Can a tutor help with a specific project I'm working on?",
        a: "Yes — live 1:1 sessions can focus on the actual file or project you're building, not just generic tutorial examples.",
      },
      {
        q: "Is Photoshop tutoring suitable for complete beginners?",
        a: "Yes — sessions are matched to your level, from complete beginners to learners refining more advanced techniques.",
      },
      {
        q: "How is this different from a Skillshare or YouTube tutorial?",
        a: "Those are pre-recorded and the same for everyone; a live tutor looks at your actual work and answers your specific questions in real time.",
      },
      {
        q: "Is there a certificate for completing Photoshop tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      { q: "Are TutorA's Adobe Photoshop tutors based in India?", a: "Yes, most of them. TutorA's coding tutors are predominantly India-based, with real project and language experience listed on their own profile — reviewed by our team before ever being matched." },
    ],
  },
  "adobe-illustrator-51e96821": {
    differentiation:
      "Illustrator tutorials are common on Skillshare, Udemy, and YouTube, and they're fine for learning a specific technique in isolation. What they can't do is look at your actual vector artwork and explain why your paths or anchor points aren't behaving. A TutorA Illustrator tutor works with your real file in live 1:1 sessions, adapting to your project and skill level rather than a fixed course order. Every tutor is reviewed before being matched, with pricing shown before you book. The Adobe Illustrator tutor you're matched with is usually India-based — their profile lists real project and language experience, not just a generic bio.",
    faqs: [
      {
        q: "Do I need my own Illustrator license?",
        a: "Yes, you'll need access to Illustrator yourself; your tutor works with you on technique and your actual project, but sessions don't include the software.",
      },
      {
        q: "Can a tutor help with a specific design project I'm working on?",
        a: "Yes — live 1:1 sessions can focus on your actual artwork rather than generic tutorial exercises.",
      },
      {
        q: "Is Illustrator tutoring suitable for beginners?",
        a: "Yes — sessions are matched to your level, from complete beginners to learners working on more advanced vector techniques.",
      },
      {
        q: "How is this different from a Udemy or Skillshare course?",
        a: "Those courses are fixed and pre-recorded; a tutor looks at your actual file and answers your specific questions live.",
      },
      {
        q: "Is there a certificate for Illustrator tutoring?",
        a: "No — TutorA is live 1:1 tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      { q: "Are TutorA's Adobe Illustrator tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },
  "graphic-design-a6240a94": {
    differentiation:
      "Graphic design has an enormous self-paced catalog — Skillshare classes, Domestika courses, Udemy bundles covering everything from typography to branding. They're a fine way to see principles explained once, but design feedback is inherently personal, and a fixed video can't critique your actual portfolio piece. A TutorA graphic design tutor reviews your real work live, 1:1, and gives feedback matched to your specific project and goals. Every tutor is reviewed before being matched, with pricing shown before you book. The Graphic Design tutor you're matched with is usually India-based — their profile lists real project and language experience, not just a generic bio.",
    faqs: [
      {
        q: "Can a tutor give feedback on my actual portfolio or project?",
        a: "Yes — live 1:1 sessions can focus on reviewing and improving your real work, not just generic design exercises.",
      },
      {
        q: "Do I need specific design software before starting?",
        a: "It depends on your project — mention what tools you're using (Illustrator, Photoshop, Canva, etc.) when requesting a tutor.",
      },
      {
        q: "Is graphic design tutoring suitable for beginners?",
        a: "Yes — sessions are matched to your level, from design fundamentals to more advanced portfolio work.",
      },
      {
        q: "How is this different from a Skillshare or Domestika course?",
        a: "Those are pre-recorded and generic; a tutor gives live, personalized feedback on your actual work.",
      },
      {
        q: "Is there a certificate for graphic design tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      { q: "Are TutorA's Graphic Design tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },
  "ui-ux-design-85bad5a6": {
    differentiation:
      "UI/UX has a crowded self-paced market — Coursera's UX certificate programs, Udemy bootcamp-style bundles, Skillshare classes on specific tools like Figma. They're useful for learning process and terminology, but good UX feedback depends on someone actually looking at your flows and critiquing your decisions. A TutorA UI/UX tutor reviews your real designs or portfolio live, 1:1, matched to your specific project and goals rather than a fixed curriculum. Every tutor is reviewed before being matched, with pricing shown before you book. Most of TutorA's UI/UX Design tutors are based in India, and each profile shows their specific programming background, so you know who you'd be working with before you book.",
    faqs: [
      {
        q: "Can a tutor review my actual portfolio or a specific design project?",
        a: "Yes — live 1:1 sessions can focus on critiquing and improving your real work, not just generic exercises.",
      },
      {
        q: "Do I need to already know a tool like Figma before starting?",
        a: "No — sessions are matched to your level, and your tutor can help with tools as well as design principles depending on what you need.",
      },
      {
        q: "Is UI/UX tutoring suitable for career changers with no design background?",
        a: "Yes — let your tutor know your background and goals so sessions can be paced from the fundamentals if needed.",
      },
      {
        q: "How is this different from a UX certificate program?",
        a: "Certificate programs are fixed-curriculum and self-paced; a tutor gives live, 1:1 feedback tailored to your actual work and goals.",
      },
      {
        q: "Is there a certificate for UI/UX tutoring on TutorA?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
      { q: "Are TutorA's UI/UX Design tutors based in India?", a: "Yes, most of them. TutorA's coding tutors are predominantly India-based, with real project and language experience listed on their own profile — reviewed by our team before ever being matched." },
    ],
  },
  "video-editing-55a060cd": {
    differentiation:
      "Video editing tutorials are everywhere for free — YouTube walkthroughs, Skillshare classes, Udemy bundles for specific software. They're useful for learning a tool's interface, but they can't look at your actual footage or project file and tell you why your cut isn't working. A TutorA video editing tutor works with your real project live, 1:1, adapting to your software and the specific problem you're solving. Every tutor is reviewed before being matched, with pricing shown before you book. The Video Editing tutor you're matched with is usually India-based — their profile lists real project and language experience, not just a generic bio.",
    faqs: [
      {
        q: "Do I need specific editing software before starting?",
        a: "Yes, you'll need access to the software you want to learn (Premiere Pro, Final Cut, DaVinci Resolve, etc.); mention which one when requesting a tutor.",
      },
      {
        q: "Can a tutor help with a specific video project I'm editing?",
        a: "Yes — live 1:1 sessions can focus on your actual footage and project rather than generic tutorial clips.",
      },
      {
        q: "Is video editing tutoring suitable for complete beginners?",
        a: "Yes — sessions are matched to your level, from software basics to more advanced editing techniques.",
      },
      {
        q: "How is this different from a YouTube tutorial?",
        a: "A YouTube video is fixed and generic; a tutor looks at your actual project and answers your specific questions live.",
      },
      {
        q: "Is there a certificate for video editing tutoring?",
        a: "No — TutorA is live tutoring, not a self-paced video course, so there's no certificate of completion.",
      },
      { q: "Are TutorA's Video Editing tutors based in India?", a: "Generally, yes — most of TutorA's coding tutors are based in India. Each one is reviewed by our team before being matched, and their profile lists their actual programming background rather than a generic bio." },
    ],
  },

  // ---------------------------------------------------------------------
  // Music & Instruments (6)
  // ---------------------------------------------------------------------
  "guitar-a7d7f6aa": {
    differentiation:
      "Guitar has some of the best free self-paced content online — JustinGuitar's full course, Yousician's app-based lessons, countless YouTube channels. They're genuinely good for the basics, but they can't watch your hand position or hear that your chord is buzzing because of one misplaced finger. A TutorA guitar tutor watches and listens to you play live, 1:1, correcting technique in real time rather than leaving you to guess from a video. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need my own guitar before starting lessons?",
        a: "Yes, you'll need access to a guitar for sessions; your tutor can help advise on gear if you're just starting out.",
      },
      {
        q: "Is guitar tutoring suitable for complete beginners?",
        a: "Yes — sessions are matched to your level, from complete beginners to more advanced players working on specific techniques or styles.",
      },
      {
        q: "Can a tutor help correct my technique, not just teach new songs?",
        a: "Yes — live 1:1 sessions let your tutor watch your hand position and hear your playing in real time, which is hard to get from a video or app.",
      },
      {
        q: "Is guitar tutoring available for kids?",
        a: "Yes — mention your child's age and experience level when requesting a tutor.",
      },
      {
        q: "Is there a certificate for completing guitar lessons?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "piano-02656f00": {
    differentiation:
      "Piano has strong self-paced options — apps like Simply Piano and Flowkey use your device's camera or audio input to give automated feedback, and there's plenty of free sheet music and tutorials online. They're useful for practice between sessions, but automated feedback isn't the same as a real teacher hearing your dynamics and phrasing. A TutorA piano tutor listens and watches you play live, 1:1, and adjusts lessons to your actual progress and goals. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need my own piano or keyboard before starting?",
        a: "Yes, you'll need access to a piano or keyboard for sessions; let your tutor know what you have so they can plan accordingly.",
      },
      {
        q: "Is piano tutoring suitable for complete beginners?",
        a: "Yes — sessions are matched to your level, from first lessons to more advanced repertoire and technique work.",
      },
      {
        q: "How is this different from an app like Simply Piano?",
        a: "Those apps give automated feedback based on the notes you play; a live tutor hears your actual dynamics, phrasing, and technique and can correct things an app can't detect.",
      },
      {
        q: "Is piano tutoring available for kids?",
        a: "Yes — mention your child's age and experience level when requesting a tutor.",
      },
      {
        q: "Is there a certificate for completing piano lessons?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "violin-c7b9774e": {
    differentiation:
      "Violin has fewer strong self-paced options than guitar or piano, and for good reason — bow technique and intonation are genuinely hard to self-correct without someone listening and watching closely. A TutorA violin tutor works with you live, 1:1, hearing your intonation and watching your bow hold and posture in real time, rather than leaving you to guess from a video. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need my own violin before starting lessons?",
        a: "Yes, you'll need access to a violin and bow for sessions; your tutor can advise on gear if you're just starting out.",
      },
      {
        q: "Is violin tutoring suitable for complete beginners?",
        a: "Yes — sessions are matched to your level, from first lessons in posture and bow hold to more advanced repertoire.",
      },
      {
        q: "Can a tutor help correct my intonation and technique?",
        a: "Yes — that's one of the clearest advantages of live tutoring for violin, since your tutor can hear pitch issues and watch your form in real time.",
      },
      {
        q: "Is violin tutoring available for kids?",
        a: "Yes — mention your child's age and experience level when requesting a tutor.",
      },
      {
        q: "Is there a certificate for completing violin lessons?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "singing-2d883ea7": {
    differentiation:
      "Singing has some self-paced apps and YouTube vocal warm-up channels, but vocal technique is one of the hardest things to safely self-teach — bad habits can strain your voice, and an app can't reliably hear whether your breath support or pitch is actually correct. A TutorA singing tutor listens to you live, 1:1, and gives real-time feedback on technique, breathing, and pitch, adjusted to your voice and goals. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Is singing tutoring suitable for complete beginners?",
        a: "Yes — sessions are matched to your level, from basic breathing and pitch work to more advanced vocal technique.",
      },
      {
        q: "Can a tutor help with a specific genre or song I want to sing?",
        a: "Yes — let your tutor know your goals and preferred style so sessions can be matched to them.",
      },
      {
        q: "Why does live feedback matter more for singing than an app?",
        a: "Vocal technique is easy to get wrong in ways that strain your voice; a live tutor can hear issues with breath support or pitch and correct them safely, which a pre-recorded app can't do.",
      },
      {
        q: "Is singing tutoring available for kids?",
        a: "Yes — mention your child's age and experience level when requesting a tutor.",
      },
      {
        q: "Is there a certificate for completing singing lessons?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "music-theory-88e94e5a": {
    differentiation:
      "Music theory has decent free coverage online — YouTube explainers, dedicated theory sites, and structured Coursera courses. They're fine for learning the rules in isolation, but applying theory to your own playing or composition is where a fixed course tends to fall short. A TutorA music theory tutor works with you live, 1:1, connecting concepts to the instrument or music you're actually working on. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Do I need to already play an instrument to study music theory?",
        a: "Not necessarily — let your tutor know your background and goals, whether you're a beginner or want to apply theory to an instrument you already play.",
      },
      {
        q: "Can music theory tutoring connect to a specific instrument or composition I'm working on?",
        a: "Yes — live 1:1 sessions can be matched to your actual playing or composing rather than generic theory exercises.",
      },
      {
        q: "Is music theory tutoring suitable for exam or coursework prep?",
        a: "Yes — sessions can be matched to a specific curriculum or exam you're studying for.",
      },
      {
        q: "How is this different from a free music theory website?",
        a: "Those sites offer fixed, generic exercises; a tutor connects theory concepts to your specific questions and musical goals.",
      },
      {
        q: "Is there a certificate for music theory tutoring?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },
  "dance-8f1859ae": {
    differentiation:
      "Dance tutorials are widely available on YouTube and apps, and they're fine for learning a routine in isolation. What they can't do is watch your actual form and correct your posture, timing, or technique in real time — which matters a lot in dance. A TutorA dance tutor works with you live, 1:1, watching you move and adjusting to your style and goals rather than a fixed video routine. Every tutor is reviewed before being matched, with pricing shown before you book.",
    faqs: [
      {
        q: "Is dance tutoring suitable for complete beginners?",
        a: "Yes — sessions are matched to your level, from foundational movement and posture to more advanced technique in a specific style.",
      },
      {
        q: "Can I request a tutor for a specific dance style?",
        a: "Yes — mention your preferred style when requesting a tutor so you can be matched accordingly.",
      },
      {
        q: "Why does live feedback matter more for dance than a video tutorial?",
        a: "A video can't watch your actual posture, timing, or technique; a live tutor can correct these in real time, which matters for both progress and avoiding injury.",
      },
      {
        q: "Is dance tutoring available for kids?",
        a: "Yes — mention your child's age and experience level when requesting a tutor.",
      },
      {
        q: "Is there a certificate for completing dance lessons?",
        a: "No — TutorA courses are live tutoring, not self-paced video lessons, so there's no certificate of completion.",
      },
    ],
  },

  // --- Test Preparation (15) ---
  // Service/Hybrid framing per the SXO finding: the real competitor set here is tutoring
  // companies (Kaplan, Princeton Review, Manhattan Review) and independent tutor
  // marketplaces (Wyzant), not self-paced course platforms — so the differentiation angle
  // is 1:1 personal matching + the guarantee, not "live tutor vs. video course."
  "sat-c5d2749b": {
    differentiation:
      "SAT prep is dominated by big test-prep companies with fixed curricula and class-sized cohorts, or open marketplaces where you're picking a stranger's profile yourself. TutorA does neither: your request is personally reviewed and matched with an individual SAT tutor for 1:1 sessions built around your actual weak spots. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for SAT at no extra cost. The tutor you're matched with for SAT Prep is, in most cases, based in India and already vetted by our team — check their profile for their real background before you book.",
    faqs: [
      { q: "How much does SAT tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my SAT tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different SAT tutor at no extra cost. See the full policy on our guarantee page." },
      { q: "Is SAT tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "When should I start SAT prep?", a: "It depends on your target test date and current level — mention both when requesting a tutor so sessions can be paced accordingly." },
      { q: "Is there a certificate for completing SAT tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's SAT Prep tutors based in India?", a: "Generally, yes — the majority of TutorA's tutors are based in India. Each one goes through our team's review process before being matched, and their individual profile lists their real subject background rather than a generic bio." },
    ],
  },
  "act-dccdc694": {
    differentiation:
      "ACT prep is dominated by big test-prep companies with fixed curricula and class-sized cohorts, or open marketplaces where you're picking a stranger's profile yourself. TutorA does neither: your request is personally reviewed and matched with an individual ACT tutor for 1:1 sessions built around your actual weak spots. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for ACT at no extra cost. The tutor you're matched with for ACT Prep is, in most cases, based in India and already vetted by our team — check their profile for their real background before you book.",
    faqs: [
      { q: "How much does ACT tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my ACT tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different ACT tutor at no extra cost. See the full policy on our guarantee page." },
      { q: "Is ACT tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "When should I start ACT prep?", a: "It depends on your target test date and current level — mention both when requesting a tutor so sessions can be paced accordingly." },
      { q: "Is there a certificate for completing ACT tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's ACT Prep tutors based in India?", a: "Generally, yes — the majority of TutorA's tutors are based in India. Each one goes through our team's review process before being matched, and their individual profile lists their real subject background rather than a generic bio." },
    ],
  },
  "psat-preparation-course-4b552b9e": {
    differentiation:
      "PSAT prep often gets treated as an afterthought bundled into SAT courses. TutorA matches you with a tutor specifically for the PSAT — its own format, timing, and scoring — through personally reviewed 1:1 sessions rather than a repurposed SAT curriculum. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for PSAT at no extra cost. For PSAT Preparation, most TutorA tutors are based in India and go through our team's review process before ever being matched — their profile lists their actual background.",
    faqs: [
      { q: "Is PSAT tutoring the same as SAT tutoring?", a: "It's related but not identical — the PSAT has its own format and scoring, so sessions are matched to that specifically rather than reused SAT material." },
      { q: "How much does PSAT tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my PSAT tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor at no extra cost." },
      { q: "Does PSAT prep help with the SAT later?", a: "It can — many of the underlying skills overlap, though your tutor will focus sessions on the PSAT's specific format if that's your near-term goal." },
      { q: "Is there a certificate for completing PSAT tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's PSAT Preparation tutors based in India?", a: "In most cases, yes. India is where the majority of TutorA's tutor pool is based, and every tutor is vetted by our team beforehand — check their individual profile for their specific experience before you book." },
    ],
  },
  "gre-a2b8cace": {
    differentiation:
      "GRE prep is dominated by big test-prep companies with fixed curricula and class-sized cohorts, or open marketplaces where you're picking a stranger's profile yourself. TutorA does neither: your request is personally reviewed and matched with an individual GRE tutor for 1:1 sessions built around your actual weak spots — quant, verbal, or the analytical writing section specifically. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for GRE at no extra cost. TutorA matches most GRE Preparation students with an India-based tutor, reviewed by our team beforehand, with a profile that shows their specific experience before you commit.",
    faqs: [
      { q: "How much does GRE tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my GRE tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different GRE tutor at no extra cost." },
      { q: "Can a tutor focus on just one GRE section, like quant?", a: "Yes — let your tutor know which section you want to focus on so sessions can be matched to it." },
      { q: "Is GRE tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing GRE tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's GRE Preparation tutors based in India?", a: "Yes, most of them. TutorA's tutors are predominantly based in India and go through our team's review process before ever being matched — their profile lists their real background, so nothing about who you're working with is a guess." },
    ],
  },
  "gmat-d7e5eb9d": {
    differentiation:
      "GMAT prep is dominated by big test-prep companies with fixed curricula and class-sized cohorts, or open marketplaces where you're picking a stranger's profile yourself. TutorA does neither: your request is personally reviewed and matched with an individual GMAT tutor for 1:1 sessions built around your actual weak spots — quant, verbal, data insights, or the full test. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for GMAT at no extra cost. For GMAT Preparation, most TutorA tutors are based in India and go through our team's review process before ever being matched — their profile lists their actual background.",
    faqs: [
      { q: "How much does GMAT tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my GMAT tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different GMAT tutor at no extra cost." },
      { q: "Can a tutor help with a specific GMAT section?", a: "Yes — let your tutor know which section (quant, verbal, data insights) you want to focus on." },
      { q: "Is GMAT tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing GMAT tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's GMAT Preparation tutors based in India?", a: "In most cases, yes. India is where the majority of TutorA's tutor pool is based, and every tutor is vetted by our team beforehand — check their individual profile for their specific experience before you book." },
    ],
  },
  "toefl-3a2e48ed": {
    differentiation:
      "TOEFL prep is dominated by big test-prep companies with fixed curricula, or open marketplaces where you're picking a stranger's profile yourself. TutorA does neither: your request is personally reviewed and matched with an individual TOEFL tutor for 1:1 sessions built around your actual weak spots — reading, listening, speaking, or writing. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for TOEFL at no extra cost. The tutor you're matched with for TOEFL Preparation is, in most cases, based in India and already vetted by our team — check their profile for their real background before you book.",
    faqs: [
      { q: "How much does TOEFL tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my TOEFL tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different TOEFL tutor at no extra cost." },
      { q: "Can a tutor focus on just the speaking section?", a: "Yes — let your tutor know which section you're weakest in so sessions can be matched to it." },
      { q: "Is TOEFL tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing TOEFL tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's TOEFL Preparation tutors based in India?", a: "Generally, yes — the majority of TutorA's tutors are based in India. Each one goes through our team's review process before being matched, and their individual profile lists their real subject background rather than a generic bio." },
    ],
  },
  "ielts-8d4686db": {
    differentiation:
      "IELTS prep is dominated by big test-prep companies with fixed curricula, or open marketplaces where you're picking a stranger's profile yourself. TutorA does neither: your request is personally reviewed and matched with an individual IELTS tutor for 1:1 sessions built around your actual weak spots — reading, listening, speaking, or writing, Academic or General Training. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for IELTS at no extra cost. Most of TutorA's IELTS Preparation tutors are based in India and reviewed by our team before being matched — their profile shows their specific background before you book.",
    courseDetail:
      "IELTS sessions on TutorA are usually organized around the exam's four sections, since each rewards a different skill. Listening and Reading are scored against a 40-question format, so tutors often focus on prediction techniques and the common trap-question patterns that cost easy marks. Writing — Task 1 (a report or letter, depending on Academic or General Training) and Task 2 (a full essay) — is scored against specific band-score criteria covering task achievement, coherence, vocabulary, and grammar, so a tutor reviewing your actual drafts against those criteria matters more than generic essay advice. Speaking is a live 11-14 minute interview, which is exactly the format a 1:1 tutor can rehearse with you far more realistically than a script or app. Most students come in stronger on some sections than others, so a tutor can weight session time toward your actual weak section instead of repeating a fixed syllabus. If you're retaking the test and already know your previous band-score breakdown, share it when requesting a tutor so sessions start from your specific gap rather than the basics.",
    faqs: [
      { q: "How much does IELTS tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my IELTS tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different IELTS tutor at no extra cost." },
      { q: "Does this cover Academic or General Training IELTS?", a: "Both — mention which version you're taking when requesting a tutor so sessions are matched correctly." },
      { q: "Is IELTS tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing IELTS tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's IELTS Preparation tutors based in India?", a: "Yes, for most tutors on TutorA. Our team reviews every tutor before they're matched with a student, regardless of location, and their profile shows their real background — most happen to be India-based." },
      {
        q: "What IELTS band score should I aim for?",
        a: "It depends entirely on what you need it for — many university programs ask for 6.0-7.0 overall, and some skilled-migration visas set specific minimums per section, not just an overall average. Tell your tutor your target score and purpose (study, work, immigration) so sessions are paced to it.",
      },
      {
        q: "Is there a difference between preparing for Academic and General Training IELTS?",
        a: "Yes — Listening and Speaking are the same for both, but Reading and Writing differ: Academic uses more complex, academic-style texts and an analytical Task 1 (describing a chart or graph), while General Training uses everyday-context texts and a letter-writing Task 1. Mention which version you're taking so your tutor prepares the right material.",
      },
    ],
  },
  "pte-302557b2": {
    differentiation:
      "PTE Academic prep is dominated by big test-prep companies with fixed curricula, or open marketplaces where you're picking a stranger's profile yourself. TutorA does neither: your request is personally reviewed and matched with an individual PTE tutor for 1:1 sessions built around the test's specific computer-based format. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else for PTE at no extra cost. TutorA matches most PTE Academic Preparation students with an India-based tutor, reviewed by our team beforehand, with a profile that shows their specific experience before you commit.",
    faqs: [
      { q: "How much does PTE Academic tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my PTE tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different PTE tutor at no extra cost." },
      { q: "Is PTE tutoring different from IELTS or TOEFL tutoring?", a: "Yes — PTE is a computer-based test with its own question types and scoring, so sessions are matched to that format specifically." },
      { q: "Is PTE tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing PTE tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's PTE Academic Preparation tutors based in India?", a: "Yes, most of them. TutorA's tutors are predominantly based in India and go through our team's review process before ever being matched — their profile lists their real background, so nothing about who you're working with is a guess." },
    ],
  },
  "duolingo-english-test-preparation-course-3e98dca7": {
    differentiation:
      "Duolingo English Test prep is a newer category with far less dedicated tutoring coverage than SAT or IELTS. TutorA matches you with a tutor for 1:1 sessions built around the test's specific adaptive, computer-based format rather than generic English-language material. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else at no extra cost. TutorA matches most Duolingo English Test Preparation students with an India-based tutor, reviewed by our team beforehand, with a profile that shows their specific experience before you commit.",
    faqs: [
      { q: "How is the Duolingo English Test different from IELTS or TOEFL?", a: "It's a shorter, computer-based, adaptive test — your tutor can walk you through its specific format if you're more familiar with traditional English tests." },
      { q: "How much does Duolingo English Test tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor at no extra cost." },
      { q: "Is this tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing this tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's Duolingo English Test Preparation tutors based in India?", a: "Yes, most of them. TutorA's tutors are predominantly based in India and go through our team's review process before ever being matched — their profile lists their real background, so nothing about who you're working with is a guess." },
    ],
  },
  "gcse-preparation-course-97ec8c86": {
    differentiation:
      "GCSE tutoring often comes from either large tutoring agencies assigning whichever tutor is available, or open marketplaces where you're vetting a stranger's profile yourself. TutorA matches you with a tutor personally reviewed by our team, for live 1:1 sessions matched to your specific GCSE subject and exam board where possible. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else at no extra cost. TutorA matches most GCSE Preparation students with an India-based tutor, reviewed by our team beforehand, with a profile that shows their specific experience before you commit.",
    faqs: [
      { q: "Does this cover all GCSE subjects?", a: "We match by specific subject (e.g. GCSE Maths, GCSE Physics) — mention your subject and exam board when requesting a tutor." },
      { q: "How much does GCSE tutoring cost?", a: "Pricing varies by tutor and subject, and is shown before you book — there's no flat rate." },
      { q: "What if my GCSE tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor for that subject at no extra cost." },
      { q: "Is GCSE tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing GCSE tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's GCSE Preparation tutors based in India?", a: "Yes, most of them. TutorA's tutors are predominantly based in India and go through our team's review process before ever being matched — their profile lists their real background, so nothing about who you're working with is a guess." },
    ],
  },
  "gcse-english-017a23a5": {
    differentiation:
      "GCSE English is its own subject with its own exam structure — language and literature papers, coursework conventions, exam-board-specific texts. TutorA matches you with a tutor personally reviewed by our team for live 1:1 sessions built around your specific exam board and paper, rather than generic English tutoring. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else at no extra cost. Most of TutorA's GCSE English tutors are based in India and reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Does this cover GCSE English Language, Literature, or both?", a: "Both — mention which paper (or both) and your exam board when requesting a tutor so sessions are matched correctly." },
      { q: "How much does GCSE English tutoring cost?", a: "Pricing varies by tutor and is shown before you book — there's no flat rate." },
      { q: "What if my GCSE English tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor at no extra cost." },
      { q: "Is GCSE English tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing GCSE English tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's GCSE English tutors based in India?", a: "Yes, for most tutors on TutorA. Our team reviews every tutor before they're matched with a student, regardless of location, and their profile shows their real background — most happen to be India-based." },
    ],
  },
  "igcse-preparation-course-5ed7859f": {
    differentiation:
      "IGCSE tutoring often comes from either large tutoring agencies assigning whichever tutor is available, or open marketplaces where you're vetting a stranger's profile yourself. TutorA matches you with a tutor personally reviewed by our team, for live 1:1 sessions matched to your specific IGCSE subject and exam board (Cambridge, Edexcel, etc.) where possible. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else at no extra cost. For IGCSE Preparation, most TutorA tutors are based in India and go through our team's review process before ever being matched — their profile lists their actual background.",
    faqs: [
      { q: "Does this cover all IGCSE subjects and exam boards?", a: "We match by specific subject and exam board — mention both when requesting a tutor." },
      { q: "How much does IGCSE tutoring cost?", a: "Pricing varies by tutor and subject, and is shown before you book — there's no flat rate." },
      { q: "What if my IGCSE tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor for that subject at no extra cost." },
      { q: "Is IGCSE tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing IGCSE tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's IGCSE Preparation tutors based in India?", a: "In most cases, yes. India is where the majority of TutorA's tutor pool is based, and every tutor is vetted by our team beforehand — check their individual profile for their specific experience before you book." },
    ],
  },
  "a-level-preparation-course-6ede4ec7": {
    differentiation:
      "A Level tutoring often comes from either large tutoring agencies assigning whichever tutor is available, or open marketplaces where you're vetting a stranger's profile yourself. TutorA matches you with a tutor personally reviewed by our team, for live 1:1 sessions matched to your specific A Level subject and exam board where possible. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else at no extra cost. Most of TutorA's A-Level Preparation tutors are based in India and reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Does this cover all A Level subjects?", a: "We match by specific subject and exam board — mention both when requesting a tutor." },
      { q: "How much does A Level tutoring cost?", a: "Pricing varies by tutor and subject, and is shown before you book — there's no flat rate." },
      { q: "What if my A Level tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor for that subject at no extra cost." },
      { q: "Is A Level tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing A Level tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's A-Level Preparation tutors based in India?", a: "Yes, for most tutors on TutorA. Our team reviews every tutor before they're matched with a student, regardless of location, and their profile shows their real background — most happen to be India-based." },
    ],
  },
  "ib-diploma-preparation-course-9e537a20": {
    differentiation:
      "IB Diploma tutoring often comes from either large tutoring agencies assigning whichever tutor is available, or open marketplaces where you're vetting a stranger's profile yourself. TutorA matches you with a tutor personally reviewed by our team, for live 1:1 sessions matched to your specific IB subject, level (HL/SL), and — where relevant — the Extended Essay or Internal Assessment. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else at no extra cost. For IB Diploma Preparation, most TutorA tutors are based in India and go through our team's review process before ever being matched — their profile lists their actual background.",
    faqs: [
      { q: "Does this cover Higher Level and Standard Level?", a: "Yes — mention your subject and level (HL or SL) when requesting a tutor so sessions are matched correctly." },
      { q: "Can a tutor help with my Extended Essay or Internal Assessment?", a: "Yes — mention this specifically when requesting a tutor so you're matched with someone who can support that work." },
      { q: "How much does IB tutoring cost?", a: "Pricing varies by tutor and subject, and is shown before you book — there's no flat rate." },
      { q: "What if my IB tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor for that subject at no extra cost." },
      { q: "Is there a certificate for completing IB tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's IB Diploma Preparation tutors based in India?", a: "In most cases, yes. India is where the majority of TutorA's tutor pool is based, and every tutor is vetted by our team beforehand — check their individual profile for their specific experience before you book." },
    ],
  },
  "ap-exam-preparation-course-cceffa19": {
    differentiation:
      "AP prep often comes from either large tutoring agencies assigning whichever tutor is available, or open marketplaces where you're vetting a stranger's profile yourself. TutorA matches you with a tutor personally reviewed by our team, for live 1:1 sessions matched to your specific AP subject and exam format. Every match is backed by our Tutor Match Guarantee — if your first tutor isn't right, we match you with someone else at no extra cost. Most of TutorA's AP Exam Preparation tutors are based in India and reviewed by our team before being matched — their profile shows their specific background before you book.",
    faqs: [
      { q: "Which AP subjects does this cover?", a: "We match by specific AP subject — mention which exam(s) you're preparing for when requesting a tutor." },
      { q: "How much does AP tutoring cost?", a: "Pricing varies by tutor and subject, and is shown before you book — there's no flat rate." },
      { q: "What if my AP tutor isn't the right fit?", a: "You're covered by our Tutor Match Guarantee — tell us and we'll match you with a different tutor for that subject at no extra cost." },
      { q: "Is AP tutoring 1:1 or a class?", a: "1:1. Every session is live and personal to you, not a cohort class." },
      { q: "Is there a certificate for completing AP tutoring?", a: "No — TutorA is live tutoring, not a self-paced course, so there's no certificate of completion." },
      { q: "Are TutorA's AP Exam Preparation tutors based in India?", a: "Yes, for most tutors on TutorA. Our team reviews every tutor before they're matched with a student, regardless of location, and their profile shows their real background — most happen to be India-based." },
    ],
  },
};
