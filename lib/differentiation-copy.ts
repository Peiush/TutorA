// Subject/course "Why a TutorA tutor" prose (lib/subject-content.ts, lib/course-subject-content.ts)
// is written assuming a tutor is actually available for that page, e.g. "TutorA matches most
// A-Level Maths students with an India-based tutor." When a page has zero currently-approved
// tutors, that sentence sits directly above an honest "we don't have a tutor actively teaching
// this yet" disclosure — a real contradiction flagged in RE-AUDIT-REPORT.md (2026-08-10).
//
// Rewriting ~103 hand-written entries individually risks introducing errors across content
// nobody has re-reviewed line by line. Instead, filter out just the sentences asserting current
// tutor-matching/availability when the page has no live tutors, leaving the rest of the "why
// choose us" prose (live 1:1 sessions, team review process in general, pricing shown up front,
// rematch guarantee) intact — those claims are true regardless of this page's current tutor count.
// Real corpus phrasing varies too much for one exact pattern ("India-based tutor", "tutors
// are based in India", "predominantly/primarily based in India", "your tutor... India", etc.)
// — instead, drop any sentence that combines a matching-claim word with an India mention,
// since that combination is specifically what asserts an existing, available tutor.
const MATCH_WORD = /\bmatch(ed|es|ing)?\b/i;
const INDIA_WORD = /\bindia\b/i;

export function sanitizeDifferentiation(text: string, hasTutors: boolean): string {
  if (hasTutors) return text;
  const sentences = text.split(/(?<=[.!?])\s+/);
  const kept = sentences.filter((s) => !(MATCH_WORD.test(s) && INDIA_WORD.test(s)));
  return kept.join(" ").trim();
}
