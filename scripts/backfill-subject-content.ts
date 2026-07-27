import { prisma } from "@/lib/prisma";

/**
 * One-time content backfill for the subjects that show up under the /courses
 * grade-band filters (Grade 6-8 / 8-10 / 10-12). Subject rows only carry
 * name/gradeLevel/curriculum/rate from the import spreadsheets, so the cards
 * had nothing but a price to show — this fills in title/subtitle/duration/
 * whatYoullLearn so each card reads like real content instead of raw data.
 * Matched by `name` (unique) rather than id so it's safe to re-run anywhere
 * this data was imported.
 */
const CONTENT: Record<
  string,
  { title: string; subtitle: string; durationLabel: string; whatYoullLearn: string[] }
> = {
  "11+ English": {
    title: "11+ English",
    subtitle:
      "Comprehension, creative writing and vocabulary work aimed at UK grammar and independent school entrance papers.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Unseen comprehension technique for unfamiliar texts",
      "Creative writing under timed conditions",
      "Vocabulary, spelling and punctuation drills examiners look for",
    ],
  },
  "11+ Maths": {
    title: "11+ Maths",
    subtitle:
      "Arithmetic fluency and non-verbal reasoning practice built around the paper styles grammar and independent schools set.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Mental arithmetic speed for non-calculator papers",
      "Reasoning with number sequences, shapes and codes",
      "Past-paper technique under exam timing",
    ],
  },
  "A-Level Chemistry": {
    title: "A-Level Chemistry",
    subtitle: "Organic, physical and inorganic chemistry taught to the depth AQA and Edexcel expect at A2.",
    durationLabel: "90-min sessions, weekly",
    whatYoullLearn: [
      "Mechanism-based organic chemistry reasoning",
      "Equilibrium, kinetics and thermodynamics calculations",
      "Practical write-ups and required-practical technique",
    ],
  },
  "A-Level Further Maths": {
    title: "A-Level Further Maths",
    subtitle:
      "Complex numbers, further calculus and mechanics for students taking the paper alongside standard A-Level Maths.",
    durationLabel: "90-min sessions, weekly",
    whatYoullLearn: [
      "Matrices, complex numbers and polar coordinates",
      "Further calculus and differential equations",
      "Mechanics and statistics option papers",
    ],
  },
  "A-Level Maths": {
    title: "A-Level Maths",
    subtitle: "Pure maths, mechanics and statistics modules covered in the order most exam boards teach them.",
    durationLabel: "75-min sessions, weekly",
    whatYoullLearn: [
      "Differentiation and integration technique",
      "Mechanics: forces, kinematics and moments",
      "Statistical distributions and hypothesis testing",
    ],
  },
  "A-Level Physics": {
    title: "A-Level Physics",
    subtitle:
      "Mechanics through to quantum and nuclear physics, with the maths-heavy problem solving A-Level papers demand.",
    durationLabel: "90-min sessions, weekly",
    whatYoullLearn: [
      "Multi-step mechanics and electricity problems",
      "Practical endorsement and required practicals",
      "Exam technique for 6-mark extended answers",
    ],
  },
  "ACT Math": {
    title: "ACT Math",
    subtitle: "Timed drilling across algebra, geometry and trigonometry to build the speed the 60-question section demands.",
    durationLabel: "60-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Pattern recognition for common ACT question types",
      "Time management across all 60 questions",
      "Calculator strategy for the trickier problems",
    ],
  },
  "AP Biology": {
    title: "AP Biology",
    subtitle: "College Board's full curriculum, from biochemistry to evolution, with a focus on free-response scoring.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Experimental design and data analysis questions",
      "The eight big ideas the exam is built around",
      "Free-response structure that scores full marks",
    ],
  },
  "AP Calculus AB": {
    title: "AP Calculus AB",
    subtitle: "Limits, derivatives and integrals at the pace and depth the AB exam covers.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Limits and continuity from first principles",
      "Applications of derivatives to real problems",
      "The Fundamental Theorem of Calculus",
    ],
  },
  "AP Calculus BC": {
    title: "AP Calculus BC",
    subtitle: "Everything in AB plus series, polar curves and parametric equations for the extended BC syllabus.",
    durationLabel: "75-min sessions, weekly",
    whatYoullLearn: [
      "Sequences, series and convergence tests",
      "Parametric, polar and vector-valued functions",
      "BC-specific free-response strategy",
    ],
  },
  "AP Chemistry": {
    title: "AP Chemistry",
    subtitle: "Quantitative chemistry, equilibrium and kinetics with the lab-based reasoning the exam rewards.",
    durationLabel: "75-min sessions, weekly",
    whatYoullLearn: [
      "Stoichiometry and quantitative lab calculations",
      "Equilibrium, acids and bases in depth",
      "Lab-based free-response question technique",
    ],
  },
  "AP Physics 1": {
    title: "AP Physics 1",
    subtitle: "Algebra-based mechanics, waves and basic circuits, built around the exam's experimental-design questions.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Newtonian mechanics and rotational motion",
      "Simple harmonic motion and mechanical waves",
      "Designing and justifying experiments",
    ],
  },
  "AP Physics C": {
    title: "AP Physics C",
    subtitle: "Calculus-based mechanics and electromagnetism for students taking the full Physics C sequence.",
    durationLabel: "75-min sessions, weekly",
    whatYoullLearn: [
      "Calculus applied directly to motion and forces",
      "Electric and magnetic fields, circuits",
      "Mechanics and E&M free-response technique",
    ],
  },
  "Algebra I": {
    title: "Algebra I",
    subtitle: "Linear equations, factoring and graphing — the foundation everything in high school math builds on.",
    durationLabel: "45–60 min sessions, 1–2x/week",
    whatYoullLearn: [
      "Solving and graphing linear equations",
      "Factoring and simplifying expressions",
      "Word problems translated into equations",
    ],
  },
  "Algebra II": {
    title: "Algebra II",
    subtitle:
      "Quadratics, polynomials, logarithms and sequences, taught with an eye on the algebra every later course assumes.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Quadratic and polynomial functions",
      "Exponential and logarithmic equations",
      "Sequences, series and rational expressions",
    ],
  },
  "American Curriculum": {
    title: "US Common Core Tutoring",
    subtitle: "Subject support across the standard American middle and high school sequence, mapped to grade-level standards.",
    durationLabel: "Flexible, weekly or bi-weekly",
    whatYoullLearn: [
      "Core standards for the student's current grade",
      "Bridging gaps left by a previous school year",
      "Study habits that carry across subjects",
    ],
  },
  Biology: {
    title: "Biology",
    subtitle: "Cell biology, genetics and ecology taught with diagrams and past-paper practice rather than pure memorization.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Cell structure, division and genetics",
      "Human body systems and homeostasis",
      "Ecology, evolution and data interpretation",
    ],
  },
  "British Curriculum": {
    title: "UK National Curriculum Tutoring",
    subtitle: "Key Stage 3 and 4 support across core subjects, aligned to the syllabus a student's school is actually teaching.",
    durationLabel: "Flexible, weekly or bi-weekly",
    whatYoullLearn: [
      "Key Stage topics matched to the school's scheme of work",
      "Confidence in class before moving to GCSE content",
      "Homework and coursework support",
    ],
  },
  Calculus: {
    title: "Calculus",
    subtitle: "Derivatives and integrals built from first principles, for students moving from precalculus into college-level work.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Limits, derivatives and rates of change",
      "Integration and area-under-the-curve problems",
      "Applied optimization and related rates",
    ],
  },
  "Cambridge English": {
    title: "Cambridge English Exam Prep",
    subtitle: "Reading, writing, listening and speaking practice for Cambridge qualifications like FCE and CAE.",
    durationLabel: "60-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Reading and use-of-English exam technique",
      "Writing tasks scored against the exam's criteria",
      "Speaking practice with realistic exam prompts",
    ],
  },
  Chemistry: {
    title: "Chemistry",
    subtitle: "Bonding, stoichiometry and reactions worked through with calculations, not just definitions.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Atomic structure and chemical bonding",
      "Stoichiometry and mole calculations",
      "Reaction types and rates of reaction",
    ],
  },
  "GCSE Biology": {
    title: "GCSE Biology",
    subtitle: "The AQA/Edexcel-style syllabus, taught around required practicals and the six-mark extended questions.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Cell biology and required-practical technique",
      "Human physiology and disease topics",
      "Six-mark extended-answer structure",
    ],
  },
  "GCSE Chemistry": {
    title: "GCSE Chemistry",
    subtitle: "Atomic structure through to organic chemistry, with calculation practice for the maths-based questions.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Atomic structure, bonding and the periodic table",
      "Quantitative chemistry calculations",
      "Required practicals and exam-style questions",
    ],
  },
  "GCSE English": {
    title: "GCSE English",
    subtitle: "Language and literature papers, covering unseen texts, creative writing and the set texts most boards require.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Analysis of unseen fiction and non-fiction extracts",
      "Creative and transactional writing technique",
      "Set-text quotations and essay structure",
    ],
  },
  "GCSE Maths": {
    title: "GCSE Maths",
    subtitle: "Foundation or Higher tier content, built around the non-calculator reasoning that trips students up most.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Number, ratio and algebra fundamentals",
      "Geometry, trigonometry and vectors",
      "Non-calculator method and exam technique",
    ],
  },
  "GCSE Physics": {
    title: "GCSE Physics",
    subtitle: "Forces, energy and electricity, with the equation-based problem solving GCSE papers are built around.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Forces, motion and energy calculations",
      "Electricity, circuits and waves",
      "Required practicals and command-word technique",
    ],
  },
  "GCSE Science": {
    title: "GCSE Combined Science",
    subtitle: "Combined/trilogy science across biology, chemistry and physics for students taking the double-award route.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core topics across all three sciences",
      "Required practicals for each discipline",
      "Balancing three subjects' revision efficiently",
    ],
  },
  Geometry: {
    title: "Geometry",
    subtitle: "Proofs, theorems and constructions, plus the area, volume and trigonometry that come with them.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Writing two-column and paragraph proofs",
      "Circle theorems, similarity and congruence",
      "Area, volume and right-triangle trigonometry",
    ],
  },
  "IB Chemistry": {
    title: "IB Chemistry",
    subtitle: "HL or SL content and internal assessment guidance for the IB Diploma's chemistry course.",
    durationLabel: "75-min sessions, weekly",
    whatYoullLearn: [
      "HL/SL syllabus content by topic",
      "Data-based and structured exam questions",
      "Internal assessment planning and write-up",
    ],
  },
  "IB Math": {
    title: "IB Mathematics",
    subtitle: "Analysis & Approaches or Applications & Interpretation, at HL or SL, with IA support built in.",
    durationLabel: "75-min sessions, weekly",
    whatYoullLearn: [
      "Core topics for the student's exact course and level",
      "Calculator and non-calculator paper technique",
      "Internal assessment topic selection and write-up",
    ],
  },
  "IB Physics": {
    title: "IB Physics",
    subtitle: "HL or SL mechanics through to nuclear physics, with the data-analysis skills IB papers test.",
    durationLabel: "75-min sessions, weekly",
    whatYoullLearn: [
      "Core and options topics by HL/SL level",
      "Data-based question technique",
      "Internal assessment experiment design",
    ],
  },
  "IGCSE Chemistry": {
    title: "IGCSE Chemistry",
    subtitle: "Cambridge's IGCSE syllabus, covering the practical and theory papers side by side.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core and extended syllabus content",
      "Alternative-to-practical question technique",
      "Past-paper practice by command word",
    ],
  },
  "IGCSE Maths": {
    title: "IGCSE Maths",
    subtitle: "Core or Extended tier content, with the non-calculator reasoning Cambridge papers emphasize.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Number, algebra and graph fundamentals",
      "Geometry, mensuration and trigonometry",
      "Paper 2/4 style problem solving",
    ],
  },
  "IGCSE Physics": {
    title: "IGCSE Physics",
    subtitle: "Forces, energy and waves taught to Cambridge's syllabus, with practical-paper technique included.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core and extended physics content",
      "Practical and data-handling questions",
      "Formula recall under exam conditions",
    ],
  },
  "International Baccalaureate (IB)": {
    title: "IB Diploma Programme Support",
    subtitle: "Cross-subject support for Diploma students juggling HL/SL courses, TOK, the Extended Essay and internal assessments.",
    durationLabel: "Flexible, by subject and deadline",
    whatYoullLearn: [
      "Subject-specific tutoring across the Diploma",
      "Extended Essay and TOK structure guidance",
      "Internal assessment planning across courses",
    ],
  },
  "Middle School Math": {
    title: "Middle School Math",
    subtitle: "Ratios, fractions and pre-algebra reasoning that sets up a smooth transition into Algebra I.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Fractions, ratios and proportional reasoning",
      "Negative numbers and order of operations",
      "Early algebra: variables and simple equations",
    ],
  },
  "PSLE Maths": {
    title: "PSLE Maths",
    subtitle: "Model-method problem sums and the multi-step reasoning Singapore's PSLE paper is known for.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "The bar model method for word problems",
      "Fractions, ratio and percentage in combination",
      "Timed practice on past PSLE papers",
    ],
  },
  "PSLE Science": {
    title: "PSLE Science",
    subtitle: "Diversity, systems, cycles and interactions — the four themes the PSLE science syllabus is organized around.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "The syllabus's four core themes",
      "Open-ended question technique",
      "Diagram-based and application questions",
    ],
  },
  Physics: {
    title: "Physics",
    subtitle: "Mechanics, electricity and waves, taught with worked problems rather than formula memorization alone.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Forces, motion and energy conservation",
      "Circuits, current and electrical calculations",
      "Waves, sound and basic optics",
    ],
  },
  Precalculus: {
    title: "Precalculus",
    subtitle: "Functions, trigonometry and conics, bridging Algebra II and the calculus courses that follow it.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Function behavior, transformations and inverses",
      "Trigonometric identities and unit-circle work",
      "Conics, sequences and an introduction to limits",
    ],
  },
  "SAT English": {
    title: "SAT Reading & Writing",
    subtitle: "Evidence-based reading and the grammar rules the Writing & Language section tests repeatedly.",
    durationLabel: "60-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Evidence-based reading comprehension strategy",
      "Grammar and punctuation rules the test repeats",
      "Pacing across the full digital SAT section",
    ],
  },
  "SAT Math": {
    title: "SAT Math",
    subtitle: "Algebra, data analysis and geometry drilled with the calculator and no-calculator strategies each section rewards.",
    durationLabel: "60-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Heart-of-algebra and problem-solving question types",
      "Calculator vs. no-calculator strategy",
      "Common trap answers and how to avoid them",
    ],
  },
  Statistics: {
    title: "Statistics",
    subtitle: "Probability, distributions and regression, taught through real data sets rather than abstract formulas.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Probability rules and distributions",
      "Hypothesis testing and confidence intervals",
      "Regression and correlation with real data",
    ],
  },
  Trigonometry: {
    title: "Trigonometry",
    subtitle: "The unit circle, identities and graphs that make trig click before it resurfaces in calculus.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Right-triangle and unit-circle trigonometry",
      "Trig identities and equation solving",
      "Graphing sine, cosine and tangent functions",
    ],
  },
};

async function main() {
  let updated = 0;
  let missing = 0;
  for (const [name, content] of Object.entries(CONTENT)) {
    const result = await prisma.subject.updateMany({
      where: { name },
      data: {
        title: content.title,
        subtitle: content.subtitle,
        durationLabel: content.durationLabel,
        whatYoullLearn: content.whatYoullLearn.join("\n"),
      },
    });
    if (result.count === 0) {
      console.warn(`No subject row found for "${name}"`);
      missing++;
    } else {
      updated += result.count;
    }
  }
  console.log(`Updated ${updated} subject(s), ${missing} name(s) not found.`);
}

main().finally(() => prisma.$disconnect());
