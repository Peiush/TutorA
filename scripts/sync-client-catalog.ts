import { prisma } from "@/lib/prisma";
import { makeSlug } from "@/lib/slug";

/**
 * One-time sync against the client's subject/course list. Two things happen here:
 *
 * 1. SUBJECTS — new rows for topics the client asked for that don't exist yet,
 *    plus gradeLevel/curriculum/rate/content fixes for rows that already existed
 *    but were either untagged (no gradeLevel, so invisible on every grade-band
 *    tile) or tagged too narrowly to reach the band the client places them in.
 *    Upserted by `name` (unique), matching the pattern in backfill-subject-content.ts.
 *    gradeLevel is free text — matchesGradeBand() (lib/grade-bands.ts) buckets it
 *    into Grade 6-8 / 8-10 / 10-12 by numeric overlap, so a range like "Grades 9-12"
 *    naturally surfaces under both the 8-10 and 10-12 tiles.
 *
 * 2. COURSES — new rows for Test Preparation / Programming & Technology / Languages
 *    course cards the client's list calls for that have no course yet. Matched by
 *    `title` (not unique in schema, but used the same way prisma/seed.ts does).
 */

type SubjectContent = {
  name: string;
  gradeLevel: string;
  curriculum: string;
  hourlyRateCents: number;
  title: string;
  subtitle: string;
  durationLabel: string;
  whatYoullLearn: string[];
};

const NEW_SUBJECTS: SubjectContent[] = [
  {
    name: "General Mathematics",
    gradeLevel: "Grades 6-8",
    curriculum: "American",
    hourlyRateCents: 2000,
    title: "General Mathematics",
    subtitle:
      "Whole-number and fraction fluency, word problems and pre-algebra reasoning for middle schoolers moving toward high school math.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Fractions, decimals and percentages with real-world problems",
      "Order of operations and simple equations",
      "Building number sense for algebra ahead",
    ],
  },
  {
    name: "Pre-Algebra",
    gradeLevel: "Grades 6-8",
    curriculum: "American",
    hourlyRateCents: 2000,
    title: "Pre-Algebra",
    subtitle: "Variables, integers and one-step equations — the bridge between arithmetic and Algebra I.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Working with negative numbers and integers",
      "Solving one- and two-step equations",
      "Ratios, proportions and simple graphing",
    ],
  },
  {
    name: "Geometry Basics",
    gradeLevel: "Grades 6-8",
    curriculum: "American",
    hourlyRateCents: 2000,
    title: "Geometry Basics",
    subtitle: "Shapes, angles and measurement — hands-on geometry before formal proofs enter the picture in high school.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Perimeter, area and volume of common shapes",
      "Angle relationships and basic constructions",
      "Coordinate plane basics and plotting points",
    ],
  },
  {
    name: "General Science",
    gradeLevel: "Grades 6-8",
    curriculum: "American",
    hourlyRateCents: 2000,
    title: "General Science",
    subtitle: "An introduction to the scientific method across life, earth and physical science topics.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Designing and running simple experiments",
      "Core vocabulary across biology, chemistry and physics",
      "Reading graphs and interpreting data",
    ],
  },
  {
    name: "Physics Basics",
    gradeLevel: "Grades 6-8",
    curriculum: "American",
    hourlyRateCents: 2000,
    title: "Physics Basics",
    subtitle: "Forces, motion and energy introduced through everyday examples and simple experiments.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Forces, motion and simple machines",
      "Energy types and how they transform",
      "Hands-on experiments that build intuition",
    ],
  },
  {
    name: "Chemistry Basics",
    gradeLevel: "Grades 6-8",
    curriculum: "American",
    hourlyRateCents: 2000,
    title: "Chemistry Basics",
    subtitle: "Atoms, mixtures and reactions explained with kitchen-table experiments instead of dense theory.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "States of matter and simple mixtures",
      "Introduction to atoms and the periodic table",
      "Safe, simple reactions to observe cause and effect",
    ],
  },
  {
    name: "Biology Basics",
    gradeLevel: "Grades 6-8",
    curriculum: "American",
    hourlyRateCents: 2000,
    title: "Biology Basics",
    subtitle: "Cells, living systems and ecosystems introduced through diagrams and everyday observation.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Plant and animal cell structure",
      "Human body systems at an introductory level",
      "Food chains, habitats and ecosystems",
    ],
  },
  {
    name: "Reading Comprehension",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2000,
    title: "Reading Comprehension",
    subtitle: "Close reading strategies for fiction and non-fiction texts, building the skills every subject leans on.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Identifying main idea, theme and author's purpose",
      "Making inferences from context clues",
      "Summarizing and answering evidence-based questions",
    ],
  },
  {
    name: "Vocabulary",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 1800,
    title: "Vocabulary",
    subtitle: "Word roots, context clues and active usage to build a stronger working vocabulary.",
    durationLabel: "30-min sessions, weekly",
    whatYoullLearn: [
      "Common Greek and Latin roots",
      "Using context clues to decode unfamiliar words",
      "Applying new vocabulary in writing and speech",
    ],
  },
  {
    name: "Coding for Kids",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2200,
    title: "Coding for Kids",
    subtitle: "A playful first introduction to computational thinking, logic and simple programs.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Sequencing, loops and conditionals explained simply",
      "Breaking problems into small logical steps",
      "Building simple interactive projects",
    ],
  },
  {
    name: "Scratch Programming",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2200,
    title: "Scratch Programming",
    subtitle: "Block-based coding with MIT's Scratch — build games and animations while learning core programming logic.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Sprites, events and loops in Scratch",
      "Building simple games and animations",
      "Debugging by testing and iterating",
    ],
  },
  {
    name: "Python Basics",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2400,
    title: "Python Basics",
    subtitle: "A gentle, project-based introduction to Python syntax for absolute beginners.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Variables, input/output and simple logic",
      "Loops and conditionals through small projects",
      "Writing and running your first Python programs",
    ],
  },
  {
    name: "History",
    gradeLevel: "Grades 6-10",
    curriculum: "International",
    hourlyRateCents: 2200,
    title: "History",
    subtitle: "Civilizations, timelines and cause-and-effect thinking across world and regional history.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Reading timelines and primary sources",
      "Cause-and-effect analysis of historical events",
      "Essay and short-answer technique for history questions",
    ],
  },
  {
    name: "Geography",
    gradeLevel: "Grades 6-10",
    curriculum: "International",
    hourlyRateCents: 2200,
    title: "Geography",
    subtitle: "Maps, climate and human geography, connecting physical features to how people live.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Map reading and physical geography",
      "Climate zones and natural resources",
      "Human geography: population, trade and settlement",
    ],
  },
  {
    name: "Civics",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2000,
    title: "Civics",
    subtitle: "How government, rights and civic responsibility work — foundational knowledge for informed citizenship.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Structures of government and how laws are made",
      "Rights, responsibilities and civic participation",
      "Analyzing current events through a civics lens",
    ],
  },
  {
    name: "Hindi",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2000,
    title: "Hindi",
    subtitle: "Reading, writing and conversation in Hindi, built around the Devanagari script from the ground up.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Reading and writing the Devanagari script",
      "Everyday conversation and vocabulary",
      "Grammar fundamentals through practice sentences",
    ],
  },
  {
    name: "Arabic",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2000,
    title: "Arabic",
    subtitle: "Modern Standard Arabic reading, writing and conversation, popular with families based in the UAE and Gulf region.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Arabic script: reading and handwriting",
      "Everyday conversational phrases",
      "Grammar basics and sentence structure",
    ],
  },
  {
    name: "Environmental Science",
    gradeLevel: "Grades 9-10",
    curriculum: "International",
    hourlyRateCents: 3000,
    title: "Environmental Science",
    subtitle: "Ecosystems, sustainability and human impact, taught through real case studies and data.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Ecosystems, biomes and biodiversity",
      "Human impact: pollution, climate and resource use",
      "Interpreting environmental data and case studies",
    ],
  },
  {
    name: "Academic Writing",
    gradeLevel: "Grades 9-10",
    curriculum: "International",
    hourlyRateCents: 2600,
    title: "Academic Writing",
    subtitle: "Structuring clear, evidence-based paragraphs and essays for school assignments.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Thesis statements and paragraph structure",
      "Using evidence and citations correctly",
      "Revising drafts for clarity and flow",
    ],
  },
  {
    name: "Academic English",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3200,
    title: "Academic English",
    subtitle: "Advanced reading, writing and vocabulary for college-level coursework and standardized tests.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Analytical writing and argument structure",
      "Advanced vocabulary in academic contexts",
      "Critical reading of dense, unfamiliar texts",
    ],
  },
  {
    name: "Advanced Algebra",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3500,
    title: "Advanced Algebra",
    subtitle: "Polynomial, rational and exponential functions at the depth college-prep courses expect.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Polynomial and rational function analysis",
      "Exponential and logarithmic modeling",
      "Systems of equations and matrices",
    ],
  },
  {
    name: "Probability",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3500,
    title: "Probability",
    subtitle: "Counting methods, distributions and expected value, taught through real-world scenarios.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Counting principles, permutations and combinations",
      "Probability distributions and expected value",
      "Conditional probability and independence",
    ],
  },
  {
    name: "C++",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3800,
    title: "C++",
    subtitle: "Systems-level programming fundamentals — memory, pointers and object-oriented design in C++.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core syntax, control flow and functions",
      "Object-oriented programming in C++",
      "Pointers, memory management and debugging",
    ],
  },
  {
    name: "SQL",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3500,
    title: "SQL",
    subtitle: "Query real databases with confidence, from simple SELECTs to multi-table joins.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Writing SELECT, WHERE and ORDER BY queries",
      "Joining multiple tables correctly",
      "Aggregations, grouping and subqueries",
    ],
  },
  {
    name: "AI Basics",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3800,
    title: "Artificial Intelligence Basics",
    subtitle: "An accessible introduction to how machine learning and AI systems actually work.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core concepts: data, models and training",
      "How common ML algorithms make predictions",
      "Hands-on mini projects with beginner-friendly tools",
    ],
  },
  {
    name: "Finance Basics",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3500,
    title: "Finance Basics",
    subtitle: "Personal and business finance fundamentals — budgeting, interest and financial statements.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Budgeting, saving and compound interest",
      "Reading basic financial statements",
      "Introduction to investing concepts",
    ],
  },
  {
    name: "Literature",
    gradeLevel: "Grades 9-12",
    curriculum: "International",
    hourlyRateCents: 3200,
    title: "Literature",
    subtitle: "Close reading and analysis of novels, poetry and drama, with essay technique for exams.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Close reading and literary device analysis",
      "Comparing themes across texts",
      "Essay structure for literature exams",
    ],
  },
  {
    name: "Economics",
    gradeLevel: "Grades 9-12",
    curriculum: "International",
    hourlyRateCents: 3200,
    title: "Economics",
    subtitle: "Micro and macroeconomic principles explained through real markets and current events.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Supply, demand and market equilibrium",
      "Macroeconomic indicators and policy",
      "Applying economic reasoning to current events",
    ],
  },
];

// Existing rows that were either untagged (invisible on every grade-band tile)
// or tagged too narrowly to reach the band the client's list places them in.
const SUBJECT_FIXES: SubjectContent[] = [
  {
    name: "Grammar",
    gradeLevel: "Grades 6-10",
    curriculum: "International",
    hourlyRateCents: 2200,
    title: "Grammar",
    subtitle: "Sentence structure, punctuation and parts of speech practiced until they're second nature.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Parts of speech and sentence structure",
      "Common punctuation and usage rules",
      "Editing your own writing for grammar errors",
    ],
  },
  {
    name: "Creative Writing",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 2000,
    title: "Creative Writing",
    subtitle: "Story structure, character and voice — writing workshops that make imagination concrete on the page.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Building characters, setting and plot",
      "Finding your own voice and style",
      "Workshopping and revising short stories",
    ],
  },
  {
    name: "Essay Writing",
    gradeLevel: "Grades 6-12",
    curriculum: "International",
    hourlyRateCents: 2400,
    title: "Essay Writing",
    subtitle:
      "Structuring persuasive, well-argued essays for any subject or grade level, from first paragraph to conclusion.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Thesis statements and paragraph structure",
      "Persuasive and analytical essay technique",
      "Editing and strengthening arguments with evidence",
    ],
  },
  {
    name: "French",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 3500,
    title: "French",
    subtitle: "Conversational and grammar fundamentals for young learners starting their French journey.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Everyday conversation and vocabulary",
      "Core grammar: verbs, tenses and agreement",
      "Listening practice with native pronunciation",
    ],
  },
  {
    name: "Spanish",
    gradeLevel: "Grades 6-8",
    curriculum: "International",
    hourlyRateCents: 3500,
    title: "Spanish",
    subtitle: "Conversational Spanish and grammar basics designed for middle-school beginners.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Everyday conversation and vocabulary",
      "Core grammar: verbs, tenses and agreement",
      "Listening and speaking practice from day one",
    ],
  },
  {
    name: "Python",
    gradeLevel: "Grades 9-12",
    curriculum: "International",
    hourlyRateCents: 4500,
    title: "Python",
    subtitle: "Programming fundamentals through data structures, built around real projects rather than isolated exercises.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Core syntax: variables, loops and functions",
      "Data structures: lists, dicts and sets",
      "Building real projects from scratch",
    ],
  },
  {
    name: "Java",
    gradeLevel: "Grades 9-12",
    curriculum: "International",
    hourlyRateCents: 4500,
    title: "Java",
    subtitle: "Object-oriented programming fundamentals in Java, from syntax to small real-world applications.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Classes, objects and OOP principles",
      "Control flow, collections and error handling",
      "Building and debugging small Java applications",
    ],
  },
  {
    name: "HTML",
    gradeLevel: "Grades 9-10",
    curriculum: "International",
    hourlyRateCents: 3000,
    title: "HTML & CSS",
    subtitle: "Structure and style real web pages from scratch — the building blocks behind every website.",
    durationLabel: "45-min sessions, weekly",
    whatYoullLearn: [
      "Semantic HTML structure and best practices",
      "CSS layout: flexbox, grid and responsive design",
      "Building and styling a complete web page",
    ],
  },
  {
    name: "Web Development",
    gradeLevel: "Grades 9-10",
    curriculum: "International",
    hourlyRateCents: 3200,
    title: "Web Development Basics",
    subtitle: "An introduction to how websites are built, from HTML/CSS through basic interactivity with JavaScript.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "HTML, CSS and JavaScript working together",
      "Building a simple multi-page website",
      "Basic debugging and browser developer tools",
    ],
  },
  {
    name: "Accounting",
    gradeLevel: "Grades 9-12",
    curriculum: "International",
    hourlyRateCents: 3200,
    title: "Accounting",
    subtitle: "Bookkeeping fundamentals and financial statements, taught through realistic business scenarios.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Debits, credits and the accounting equation",
      "Preparing income statements and balance sheets",
      "Applying accounting principles to case studies",
    ],
  },
  {
    name: "Business Studies",
    gradeLevel: "Grades 9-12",
    curriculum: "International",
    hourlyRateCents: 3200,
    title: "Business Studies",
    subtitle: "Core business concepts — marketing, operations and strategy — grounded in real company examples.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Business functions: marketing, operations, HR",
      "Reading and interpreting case studies",
      "Exam technique for business studies papers",
    ],
  },
  {
    name: "Data Structures",
    gradeLevel: "Grades 11-12",
    curriculum: "International",
    hourlyRateCents: 3800,
    title: "Data Structures",
    subtitle: "Arrays, trees, graphs and the algorithmic thinking behind efficient code.",
    durationLabel: "60-min sessions, weekly",
    whatYoullLearn: [
      "Arrays, linked lists, stacks and queues",
      "Trees, graphs and traversal algorithms",
      "Analyzing time and space complexity",
    ],
  },
  {
    name: "Spoken English",
    gradeLevel: "All Levels",
    curriculum: "International",
    hourlyRateCents: 2500,
    title: "Spoken English",
    subtitle: "Conversation-first coaching to build fluency, confidence and natural pronunciation.",
    durationLabel: "45-min sessions, 1–2x/week",
    whatYoullLearn: [
      "Building fluency through guided conversation",
      "Pronunciation, intonation and natural pacing",
      "Confidence speaking in real-world scenarios",
    ],
  },
];

// Existing rows with good content already — just widen the numeric grade range
// so matchesGradeBand() also picks them up under Grade 8-10 (Statistics/Precalculus
// were tagged 11-only/11-college-only, but the client lists both under Grades 9-10 too).
const GRADE_LEVEL_WIDENING: { name: string; gradeLevel: string }[] = [
  { name: "Statistics", gradeLevel: "Grades 9-12" },
  { name: "Precalculus", gradeLevel: "Grades 9-11" },
];

type NewCourse = {
  title: string;
  category: "PROGRAMMING_TECHNOLOGY" | "TEST_PREPARATION" | "LANGUAGES";
  gradeBand: "GRADE_6_8" | "GRADE_8_10" | "GRADE_11_12" | "ALL_GRADES";
  level: "BEGINNER" | "INTERMEDIATE" | "ALL_LEVELS";
  priceCents: number;
  durationHours: number;
  subtitle: string;
  whatYoullLearn: string[];
};

const NEW_COURSES: NewCourse[] = [
  // Test Preparation
  {
    title: "AP Exam Preparation Course",
    category: "TEST_PREPARATION",
    gradeBand: "GRADE_11_12",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 40,
    subtitle: "Subject-specific AP prep with practice free-response questions and full-length released exams.",
    whatYoullLearn: [
      "Core content review for your specific AP subject",
      "Free-response and multiple-choice scoring strategy",
      "Full-length practice exams under timed conditions",
    ],
  },
  {
    title: "IB Diploma Preparation Course",
    category: "TEST_PREPARATION",
    gradeBand: "GRADE_11_12",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 45,
    subtitle: "Cross-subject IB Diploma support, including Extended Essay, TOK and internal assessment guidance.",
    whatYoullLearn: [
      "HL/SL subject content aligned to your courses",
      "Extended Essay and TOK structure guidance",
      "Internal assessment planning and write-up support",
    ],
  },
  {
    title: "IGCSE Preparation Course",
    category: "TEST_PREPARATION",
    gradeBand: "GRADE_8_10",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 30,
    subtitle: "Cambridge IGCSE exam preparation across core and extended tiers, with past-paper practice built in.",
    whatYoullLearn: [
      "Core and extended syllabus content by subject",
      "Command-word technique for Cambridge mark schemes",
      "Timed past-paper practice with feedback",
    ],
  },
  {
    title: "GCSE Preparation Course",
    category: "TEST_PREPARATION",
    gradeBand: "GRADE_8_10",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 30,
    subtitle: "Foundation or Higher tier GCSE preparation across core subjects, built around exam board mark schemes.",
    whatYoullLearn: [
      "Foundation or Higher tier content by subject",
      "Exam board-specific technique (AQA, Edexcel, OCR)",
      "Six-mark and extended-answer structure",
    ],
  },
  {
    title: "A Level Preparation Course",
    category: "TEST_PREPARATION",
    gradeBand: "GRADE_11_12",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 40,
    subtitle: "A-Level exam preparation with the depth and problem-solving A2 papers demand.",
    whatYoullLearn: [
      "Full syllabus coverage for your chosen subject",
      "Multi-step, exam-style problem solving",
      "Past-paper practice against real mark schemes",
    ],
  },
  {
    title: "PSAT Preparation Course",
    category: "TEST_PREPARATION",
    gradeBand: "GRADE_8_10",
    level: "ALL_LEVELS",
    priceCents: 3000,
    durationHours: 20,
    subtitle: "Early SAT-style practice that also builds National Merit Scholarship qualifying skills.",
    whatYoullLearn: [
      "Reading, writing and math section strategy",
      "Timed practice on official PSAT-style questions",
      "A study plan that carries into full SAT prep",
    ],
  },
  {
    title: "Duolingo English Test Preparation Course",
    category: "TEST_PREPARATION",
    gradeBand: "GRADE_11_12",
    level: "ALL_LEVELS",
    priceCents: 25000,
    durationHours: 15,
    subtitle: "Fast, focused prep for the adaptive Duolingo English Test used by universities worldwide.",
    whatYoullLearn: [
      "Format and scoring of every adaptive question type",
      "Timed practice under real test conditions",
      "Speaking and writing sample strategy",
    ],
  },
  // Programming & Technology
  {
    title: "Scratch Programming for Kids",
    category: "PROGRAMMING_TECHNOLOGY",
    gradeBand: "GRADE_6_8",
    level: "BEGINNER",
    priceCents: 4500,
    durationHours: 15,
    subtitle: "Block-based coding with MIT's Scratch — a playful first step into programming logic.",
    whatYoullLearn: [
      "Sprites, events, loops and conditionals",
      "Building simple games and animations",
      "Debugging by testing and iterating",
    ],
  },
  {
    title: "React for Beginners",
    category: "PROGRAMMING_TECHNOLOGY",
    gradeBand: "ALL_GRADES",
    level: "BEGINNER",
    priceCents: 4500,
    durationHours: 30,
    subtitle: "Build real interactive interfaces with React, from components to state management.",
    whatYoullLearn: [
      "Components, props and JSX fundamentals",
      "State, hooks and handling user events",
      "Building and deploying a small React app",
    ],
  },
  {
    title: "AI for Beginners",
    category: "PROGRAMMING_TECHNOLOGY",
    gradeBand: "ALL_GRADES",
    level: "BEGINNER",
    priceCents: 4500,
    durationHours: 25,
    subtitle: "An approachable first course in AI and machine learning concepts, no heavy math required.",
    whatYoullLearn: [
      "How machine learning models learn from data",
      "Everyday examples of AI in action",
      "Hands-on mini projects with beginner-friendly tools",
    ],
  },
  {
    title: "Robotics for Kids",
    category: "PROGRAMMING_TECHNOLOGY",
    gradeBand: "GRADE_6_8",
    level: "BEGINNER",
    priceCents: 4500,
    durationHours: 20,
    subtitle: "Hands-on robotics fundamentals — sensors, motors and simple programmed behavior.",
    whatYoullLearn: [
      "How sensors and motors work together",
      "Programming simple robot behaviors",
      "Building and testing a small robotics project",
    ],
  },
  // Languages
  {
    title: "Spoken English Course",
    category: "LANGUAGES",
    gradeBand: "ALL_GRADES",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 50,
    subtitle: "Conversation-first coaching to build fluency, confidence and natural pronunciation.",
    whatYoullLearn: [
      "Building fluency through guided conversation",
      "Pronunciation, intonation and natural pacing",
      "Confidence speaking in real-world scenarios",
    ],
  },
  {
    title: "Business English Course",
    category: "LANGUAGES",
    gradeBand: "ALL_GRADES",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 40,
    subtitle: "Professional English for meetings, emails and presentations in the workplace.",
    whatYoullLearn: [
      "Professional email and report writing",
      "Meeting and presentation language",
      "Workplace vocabulary across industries",
    ],
  },
  {
    title: "Hindi Language Course",
    category: "LANGUAGES",
    gradeBand: "ALL_GRADES",
    level: "ALL_LEVELS",
    priceCents: 3500,
    durationHours: 60,
    subtitle: "Reading, writing and conversation in Hindi, built around the Devanagari script from the ground up.",
    whatYoullLearn: [
      "Reading and writing the Devanagari script",
      "Everyday conversation and vocabulary",
      "Grammar fundamentals through practice sentences",
    ],
  },
];

async function upsertSubject(s: SubjectContent) {
  await prisma.subject.upsert({
    where: { name: s.name },
    create: {
      name: s.name,
      gradeLevel: s.gradeLevel,
      curriculum: s.curriculum,
      hourlyRateCents: s.hourlyRateCents,
      title: s.title,
      subtitle: s.subtitle,
      durationLabel: s.durationLabel,
      whatYoullLearn: s.whatYoullLearn.join("\n"),
    },
    update: {
      gradeLevel: s.gradeLevel,
      curriculum: s.curriculum,
      hourlyRateCents: s.hourlyRateCents,
      title: s.title,
      subtitle: s.subtitle,
      durationLabel: s.durationLabel,
      whatYoullLearn: s.whatYoullLearn.join("\n"),
    },
  });
}

async function main() {
  let subjectsCreated = 0;
  let subjectsUpdated = 0;

  for (const s of [...NEW_SUBJECTS, ...SUBJECT_FIXES]) {
    const existing = await prisma.subject.findUnique({ where: { name: s.name } });
    await upsertSubject(s);
    if (existing) subjectsUpdated++;
    else subjectsCreated++;
  }

  for (const { name, gradeLevel } of GRADE_LEVEL_WIDENING) {
    const result = await prisma.subject.updateMany({ where: { name }, data: { gradeLevel } });
    if (result.count > 0) subjectsUpdated++;
  }

  console.log(`Subjects: ${subjectsCreated} created, ${subjectsUpdated} updated.`);

  let coursesCreated = 0;
  let coursesUpdated = 0;

  for (const c of NEW_COURSES) {
    const existing = await prisma.course.findFirst({ where: { title: c.title } });
    const data = {
      title: c.title,
      subtitle: c.subtitle,
      category: c.category as never,
      level: c.level as never,
      gradeBand: c.gradeBand as never,
      rating: 4.8,
      reviewCount: 0,
      priceCents: c.priceCents,
      durationHours: c.durationHours,
      whatYoullLearn: c.whatYoullLearn.join("\n"),
      isNew: true,
      published: true,
    };

    if (existing) {
      await prisma.course.update({ where: { id: existing.id }, data });
      coursesUpdated++;
    } else {
      await prisma.course.create({ data: { ...data, slug: makeSlug(c.title) } });
      coursesCreated++;
    }
  }

  console.log(`Courses: ${coursesCreated} created, ${coursesUpdated} updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
