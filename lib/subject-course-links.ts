// Cross-links between /subjects/[slug] and /courses/[slug] pages that cover near-identical
// topics (flagged by the Grade 6-12 technical SEO audit as a cannibalization risk). Rather
// than let both pages silently compete for the same query, each pair links to the other and
// the subject page's title/meta lean on its real gradeLevel/curriculum to differentiate from
// the course page's broader framing. Built from a real slug/title match against the live
// production Course and Subject tables (2026-08-07) — two heuristic false positives were
// dropped by hand: generic "English" (too broad to specifically mean "GCSE English") and
// generic "Science" (a different subject than the "Data Science" course).
export const SUBJECT_TO_COURSE_SLUG: Record<string, string> = {
  "computer-science": "computer-science-758eff7f",
  ielts: "ielts-8d4686db",
  spanish: "spanish-2dd27e6e",
  javascript: "javascript-ac5adb0a",
  french: "french-520eb7f0",
  "scratch-programming": "scratch-programming-for-kids-7fa6fba9",
  "python-basics": "python-ff654450",
  python: "python-ff654450",
  hindi: "hindi-language-course-459bc4ba",
  arabic: "arabic-bee72fa4",
  c: "c-95361960",
  sql: "sql-90d171c1",
  "ai-basics": "ai-for-beginners-0939362a",
  java: "java-48483b48",
  html: "html-css-fb9cd7a2",
  "spoken-english": "spoken-english-course-5dbc4867",
  "gcse-biology": "gcse-preparation-course-97ec8c86",
  "gcse-maths": "gcse-preparation-course-97ec8c86",
  "gcse-chemistry": "gcse-preparation-course-97ec8c86",
  "gcse-physics": "gcse-preparation-course-97ec8c86",
  "gcse-science": "gcse-preparation-course-97ec8c86",
  "gcse-english": "gcse-english-017a23a5",
  "igcse-chemistry": "igcse-preparation-course-5ed7859f",
  "igcse-maths": "igcse-preparation-course-5ed7859f",
  "igcse-physics": "igcse-preparation-course-5ed7859f",
};

// Reverse map, used on the course page to link back to its related subject(s).
export const COURSE_TO_SUBJECT_SLUGS: Record<string, string[]> = Object.entries(
  SUBJECT_TO_COURSE_SLUG
).reduce<Record<string, string[]>>((acc, [subjectSlug, courseSlug]) => {
  (acc[courseSlug] ??= []).push(subjectSlug);
  return acc;
}, {});
