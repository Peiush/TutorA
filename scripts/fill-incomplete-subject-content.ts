import { prisma } from "@/lib/prisma";

/**
 * These 18 Subject rows have sat with no title/subtitle/durationLabel/
 * whatYoullLearn (and some with no curriculum/rate) since the original
 * spreadsheet import — nothing to do with this session's grade-band work.
 * They were invisible before (no gradeLevel, so no band tile ever showed
 * them), but the free-text search box surfaces any Subject by name/curriculum
 * regardless of gradeLevel, so a plain search — or the new "Frequently
 * searched" quick links — renders them as broken-looking cards ("Price on
 * request", no subtitle, no bullets). This only adds the missing content;
 * gradeLevel/curriculum that already existed (e.g. the O-Level trio) is left
 * untouched, and none of these get a NEW gradeLevel — they're general-support
 * subjects, not part of the client's per-grade Grade 6-8/9-10/11-12 lists.
 */
const CONTENT: Record<
  string,
  { title: string; subtitle: string; durationLabel: string; whatYoullLearn: string[]; curriculum?: string; hourlyRateCents?: number }
> = {
  "AP Calculus": {
    title: "AP Calculus",
    subtitle: "AP Calculus AB or BC content — limits, derivatives and integrals taught to the depth the College Board exam expects.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "AP",
    hourlyRateCents: 3500,
    whatYoullLearn: [
      "Limits, derivatives and integrals from first principles",
      "AB or BC syllabus coverage depending on your course",
      "Free-response strategy that scores full marks",
    ],
  },
  "AP Physics": {
    title: "AP Physics",
    subtitle: "AP Physics 1 or C content — mechanics, waves and circuits with the experimental-design reasoning the exam rewards.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "AP",
    hourlyRateCents: 3500,
    whatYoullLearn: [
      "Mechanics, waves and circuits by course level",
      "Algebra-based (1) or calculus-based (C) problem solving",
      "Designing and justifying experiments for free-response questions",
    ],
  },
  Algebra: {
    title: "Algebra",
    subtitle:
      "Foundational algebra skills — equations, expressions and graphing — for students who need general algebra support outside a specific course level.",
    durationLabel: "45–60 min sessions, 1–2x/week",
    curriculum: "International",
    hourlyRateCents: 2400,
    whatYoullLearn: [
      "Solving and simplifying algebraic expressions",
      "Linear equations and basic graphing",
      "Building confidence before Algebra I or II",
    ],
  },
  Algorithms: {
    title: "Algorithms",
    subtitle: "Algorithmic thinking and complexity analysis — sorting, searching and problem-solving patterns used in technical interviews.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 4000,
    whatYoullLearn: [
      "Sorting, searching and recursion patterns",
      "Time and space complexity analysis",
      "Practice problems in the style of technical interviews",
    ],
  },
  Astronomy: {
    title: "Astronomy",
    subtitle: "The solar system, stars and cosmology explained through observation and real data, not just memorization.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 2800,
    whatYoullLearn: [
      "The solar system, stars and planetary motion",
      "Reading star charts and using basic equipment",
      "Cosmology concepts explained through real data",
    ],
  },
  "Computer Science": {
    title: "Computer Science",
    subtitle:
      "Core computer science fundamentals — programming logic, data structures and systems thinking — for students building a strong CS foundation.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    whatYoullLearn: [
      "Programming fundamentals across any language",
      "Data structures and algorithmic thinking",
      "Systems and computational thinking for real problems",
    ],
  },
  English: {
    title: "English",
    subtitle: "Reading, writing and language fundamentals tailored to whichever level of English support a student needs.",
    durationLabel: "45-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 2400,
    whatYoullLearn: [
      "Reading comprehension and vocabulary building",
      "Grammar and sentence-level writing skills",
      "Confidence speaking and writing in English",
    ],
  },
  Genetics: {
    title: "Genetics",
    subtitle: "DNA, inheritance and genetic variation explained through Punnett squares, pedigrees and real case studies.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 3000,
    whatYoullLearn: [
      "DNA structure and the mechanics of inheritance",
      "Punnett squares and pedigree analysis",
      "Genetic variation, mutation and real-world case studies",
    ],
  },
  "Human Anatomy": {
    title: "Human Anatomy",
    subtitle: "Body systems and structures explained with diagrams and real clinical examples, for pre-med and biology-track students.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 3200,
    whatYoullLearn: [
      "Major body systems and their structures",
      "Diagram labeling and terminology practice",
      "Connecting anatomy to real clinical examples",
    ],
  },
  IELTS: {
    title: "IELTS Preparation",
    subtitle: "Listening, reading, writing and speaking practice for the exact band score your course or visa application needs.",
    durationLabel: "60-min sessions, 1–2x/week",
    curriculum: "IELTS",
    hourlyRateCents: 2800,
    whatYoullLearn: [
      "Band-specific strategy for all four sections",
      "Speaking practice with realistic examiner prompts",
      "Timed writing task technique for Task 1 and Task 2",
    ],
  },
  JavaScript: {
    title: "JavaScript",
    subtitle: "Core JavaScript from syntax to DOM manipulation, built around small interactive projects.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    whatYoullLearn: [
      "Variables, functions and control flow",
      "DOM manipulation and event handling",
      "Building small interactive browser projects",
    ],
  },
  Mathematics: {
    title: "Mathematics",
    subtitle: "General math support across topics and levels, tailored to whichever course or exam a student is currently working through.",
    durationLabel: "45-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 2400,
    whatYoullLearn: [
      "Diagnosing and closing specific knowledge gaps",
      "Building confidence with core problem-solving methods",
      "Support tailored to the student's current course or exam",
    ],
  },
  Mechanics: {
    title: "Mechanics",
    subtitle:
      "Forces, motion and energy problems worked through step by step, for students taking a mechanics-focused physics or maths module.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 3200,
    whatYoullLearn: [
      "Kinematics and Newton's laws of motion",
      "Work, energy and momentum problems",
      "Multi-step mechanics problem solving",
    ],
  },
  "O-Level Chemistry": {
    title: "O-Level Chemistry",
    subtitle: "Singapore's O-Level Chemistry syllabus, covering theory and practical papers with past-paper technique.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core O-Level syllabus content by topic",
      "Practical and data-based question technique",
      "Past-paper practice under exam timing",
    ],
  },
  "O-Level Maths": {
    title: "O-Level Maths",
    subtitle: "Singapore's O-Level Mathematics syllabus, built around the problem-solving style the exam rewards.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Number, algebra and geometry fundamentals",
      "Problem-solving technique for non-routine questions",
      "Past-paper practice under exam timing",
    ],
  },
  "O-Level Physics": {
    title: "O-Level Physics",
    subtitle: "Singapore's O-Level Physics syllabus, covering theory and practical papers with formula-based problem solving.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core O-Level physics topics by theme",
      "Formula application and calculation practice",
      "Practical and data-based question technique",
    ],
  },
  "Organic Chemistry": {
    title: "Organic Chemistry",
    subtitle: "Reaction mechanisms and functional groups explained through pattern recognition rather than memorization.",
    durationLabel: "60-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 3800,
    whatYoullLearn: [
      "Functional groups and naming conventions",
      "Reaction mechanisms and curved-arrow reasoning",
      "Synthesis problems worked step by step",
    ],
  },
  Science: {
    title: "Science",
    subtitle: "General science support spanning biology, chemistry and physics, tailored to whichever topic a student needs help with.",
    durationLabel: "45-min sessions, weekly",
    curriculum: "International",
    hourlyRateCents: 2200,
    whatYoullLearn: [
      "Core concepts across biology, chemistry and physics",
      "Scientific method and data interpretation",
      "Support tailored to the student's current topic",
    ],
  },
};

async function main() {
  let updated = 0;
  for (const [name, content] of Object.entries(CONTENT)) {
    const data: Record<string, unknown> = {
      title: content.title,
      subtitle: content.subtitle,
      durationLabel: content.durationLabel,
      whatYoullLearn: content.whatYoullLearn.join("\n"),
    };
    if (content.curriculum) data.curriculum = content.curriculum;
    if (content.hourlyRateCents) data.hourlyRateCents = content.hourlyRateCents;

    const result = await prisma.subject.updateMany({ where: { name }, data });
    if (result.count === 0) console.warn(`No subject row found for "${name}"`);
    else updated += result.count;
  }
  console.log(`Updated ${updated} of ${Object.keys(CONTENT).length} subjects.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
