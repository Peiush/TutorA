// The "Are TutorA's X tutors based in India?" FAQ answer is reused near-verbatim (~10
// template variants) across ~97 subject/course pages' `FAQPage` JSON-LD (RE-AUDIT-REPORT.md,
// 2026-08-10). Rewriting all ~97 hand-written entries individually risks introducing errors
// across content nobody has re-reviewed line by line; instead, personalize the one answer at
// the single point every page assembles its FAQ JSON-LD, so the emitted `text` is never
// byte-identical across pages even when it's sourced from a shared template. Applied only to
// this specific question — every other FAQ entry is untouched.
const INDIA_QUESTION_PATTERN = /based in india/i;

export function personalizeFaqs<T extends { q: string; a: string }>(
  faqs: T[],
  subjectOrCourseName: string
): T[] {
  return faqs.map((f) => {
    if (!INDIA_QUESTION_PATTERN.test(f.q)) return f;
    if (f.a.includes(subjectOrCourseName)) return f;
    return { ...f, a: `For ${subjectOrCourseName}: ${f.a}` };
  });
}
