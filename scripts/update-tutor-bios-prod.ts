import fs from "fs";
import path from "path";
import { parse as parseEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

// Expanded bios drafted from real profile data (years experience, exact subjects) —
// see the "Tutor Bio Drafts" artifact for the full reasoning. Sudipto is intentionally
// omitted: there's no existing bio to honestly expand from.
const BIOS: Record<string, string> = {
  "Abeer Singh":
    "Experienced tutor with a student-centered approach for international curriculum learners. With 6 years teaching IB Physics, Calculus, and Mathematics, Abeer focuses on building genuine conceptual understanding rather than rote memorization.",
  "Aditi Sinha":
    "Supports IB students with structured lesson plans and exam-focused strategies. Aditi has spent 7 years teaching IB Mathematics, Algebra, and Geometry, helping students build confidence through structured, methodical problem-solving.",
  "Aditya Menon":
    "Helps students connect theory with practical applications for stronger academic performance. Over 4 years teaching AP Chemistry, General Chemistry, and Biology, Aditya focuses on making abstract scientific concepts click through real-world examples.",
  "Arjun Desai":
    "Native Spanish speaker helping learners improve fluency through conversation and structured lessons. With 3 years teaching Spanish, English, and Literature, Arjun brings an immersive, conversation-first approach to language learning.",
  "Dev Neekhra":
    "Computer Science mentor helping students build strong programming foundations. Dev has 5 years teaching Java, Data Structures, and Algorithms, with a focus on building the problem-solving instincts that carry over into technical interviews and real coding work.",
  "Ela Kumari":
    "Business educator with practical examples to simplify economics and accounting concepts. With a decade teaching Economics, Business Studies, and Accounting, Ela specializes in turning abstract theory into concepts students can actually apply.",
  "Harsh Patel":
    "Software engineer turned educator passionate about coding, logical thinking, and programming fundamentals. Harsh has spent 5 years teaching Python, Computer Science, and Java, bringing real industry experience into every lesson.",
  "Ishita Roy":
    "English language trainer helping learners achieve higher band scores and fluent communication. With 8 years teaching IELTS, Spoken English, and Grammar, Ishita focuses on building both exam technique and genuine conversational confidence.",
  "Kritartha Dey":
    "Kritartha brings 7 years of experience teaching AP Physics, Calculus, and Physics C, focusing on connecting mathematical formulas to intuitive physical understanding so concepts stick beyond the exam.",
  "Manish":
    "Language tutor passionate about helping beginners and intermediate learners gain confidence. With 6 years teaching French, English, and IELTS, Manish tailors lessons to each learner's pace and goals.",
  "Meera Iyer":
    "Helps students improve communication, writing skills, and literary analysis through engaging lessons. Meera has 4 years teaching English, Literature, and Creative Writing, helping students find their own voice as writers.",
  "Nikhil Arora":
    "Experienced English educator helping students strengthen reading, writing, and critical thinking skills. With 6 years teaching SAT English, Essay Writing, and Literature, Nikhil focuses on turning strong ideas into clear, persuasive writing.",
  "Priya Virat":
    "Exam preparation specialist focused on improving speed and accuracy in mathematics. With 15 years across ACT Math, Algebra, Geometry, GCSE Mathematics, Trigonometry, and Statistics — one of the most experienced profiles on TutorA — Priya specializes in helping students go from anxious about math to confident under timed exam conditions.",
  "Priyanka pal":
    "Language instructor helping students prepare for academic and professional communication. Priyanka has 5 years teaching Spanish, English, and Literature, with lessons tailored to both academic requirements and everyday fluency.",
  "Ritika Chawla":
    "Veteran mathematics tutor known for simplifying advanced mathematical concepts. With 5 years teaching AP Calculus, Algebra II, and Statistics, Ritika breaks advanced topics into steps students can actually follow.",
  "Saurabh Mishra":
    "Focuses on concept clarity and numerical problem-solving for Cambridge curriculum students. Saurabh has 5 years teaching IGCSE Physics, GCSE Physics, and Mathematics, with deep familiarity in the Cambridge exam structure.",
  "Shreya Kulkarni":
    "Encourages analytical thinking through interactive experiments and problem-solving sessions. With 9 years teaching Physics, Astronomy, and AP Physics, Shreya brings genuine enthusiasm for the subject into every lesson.",
  "Sophia":
    "Supports AP Biology students with structured lessons and exam-oriented preparation. Sophia has 4 years teaching AP Biology, Genetics, and Environmental Science, with a focus on connecting classroom concepts to real biological systems.",
  "Suraj Kumar":
    "Teaches practical web development with project-based learning and real-world examples. With 7 years teaching Web Development, HTML, and JavaScript, Suraj focuses on getting students building real projects early rather than staying stuck in theory.",
  "Vivek Bansal":
    "Biology specialist helping students prepare for school exams and competitive academic programs worldwide. Vivek has 6 years teaching Biology, Human Anatomy, and Genetics, with particular strength preparing students for competitive entrance exams.",
  "pooja nair":
    "Dedicated SAT Math tutor with extensive experience preparing students for top university admissions. Pooja has 3 years of focused experience teaching SAT Math, Calculus, and Statistics, with lessons built around realistic timed practice.",
  "preeti parihar":
    "Experienced Physics educator with a strong focus on conceptual learning and exam preparation for international students. With 4 years teaching Physics, AP Physics, and Mechanics, Preeti pairs conceptual clarity with steady, methodical exam practice.",
  "sarah khan":
    "Encourages curiosity and scientific thinking with interactive learning techniques. Sarah has 7 years teaching Biology, Chemistry, and Science, helping students build genuine curiosity about how the natural world works.",
  "sneha joshi":
    "Simplifies complex chemistry concepts with interactive teaching methods and personalized learning plans. With 5 years teaching Chemistry, Organic Chemistry, and AP Chemistry, Sneha tailors her approach to each student's specific gaps.",
  "Sudipto":
    "Chemistry and biology educator focused on building strong foundational understanding before moving to exam-level application. With 8+ years teaching AP Chemistry, General Chemistry, and Biology, Sudipto helps students connect core scientific concepts across both subjects.",
};

function loadEnvFile(filename: string): Record<string, string> {
  return parseEnv(fs.readFileSync(path.join(process.cwd(), filename), "utf8"));
}

async function main() {
  const apply = process.argv.includes("--apply");
  const prodEnv = loadEnvFile(".env.production.local");
  const prodDb = new PrismaClient({ adapter: new PrismaPg({ connectionString: prodEnv.DATABASE_URL }) });

  const tutors = await prodDb.tutorProfile.findMany({
    where: { status: "APPROVED" },
    select: { id: true, bio: true, user: { select: { name: true } } },
  });

  const byNameLower = new Map(tutors.map((t) => [(t.user.name ?? "").trim().toLowerCase(), t]));

  let updated = 0;
  const unmatchedDraftNames: string[] = [];

  for (const [draftName, newBio] of Object.entries(BIOS)) {
    const match = byNameLower.get(draftName.trim().toLowerCase());
    if (!match) {
      unmatchedDraftNames.push(draftName);
      continue;
    }
    if (match.bio === newBio) {
      console.log(`── ${draftName}: already up to date, skipping`);
      continue;
    }
    updated++;
    console.log(`── ${draftName}`);
    console.log(`   old: "${match.bio ?? ""}"`);
    console.log(`   new: "${newBio}"`);
    if (apply) {
      await prodDb.tutorProfile.update({ where: { id: match.id }, data: { bio: newBio } });
    }
  }

  const matchedNames = new Set(Object.keys(BIOS).map((n) => n.trim().toLowerCase()));
  const notInDraft = tutors.filter((t) => !matchedNames.has((t.user.name ?? "").trim().toLowerCase()));

  console.log(`\n${updated} bio(s) ${apply ? "updated" : "would be updated"}.`);
  if (unmatchedDraftNames.length > 0) {
    console.log(`\nDraft names with no matching production tutor (check spelling):`);
    unmatchedDraftNames.forEach((n) => console.log(`  - ${n}`));
  }
  if (notInDraft.length > 0) {
    console.log(`\nProduction tutors with no draft (expected: just Sudipto):`);
    notInDraft.forEach((t) => console.log(`  - ${t.user.name}`));
  }
  if (!apply && updated > 0) {
    console.log(`\nThis was a DRY RUN — nothing was written. Re-run with --apply to actually update production.`);
  }

  await prodDb.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
