import { prisma } from "@/lib/prisma";

const DUMMY_TUTORS = [
  {
    name: "Dr. Amara Okafor",
    email: "amara.okafor.demo@tutorconnect.dev",
    phone: "+234 802 345 6781",
    country: "Lagos, Nigeria",
    subjects: "Physics, Mathematics",
    yearsExperience: 12,
    hourlyRateCents: 4800,
    bio: "I help students build genuine intuition for physics and maths, not just memorised formulas. My lessons move from first-principles reasoning to exam technique, with plenty of worked problems tailored to each student's syllabus.",
  },
  {
    name: "Liang Wei",
    email: "liang.wei.demo@tutorconnect.dev",
    phone: "+1 312 555 0142",
    country: "Chicago, USA",
    subjects: "Mathematics, Statistics",
    yearsExperience: 8,
    hourlyRateCents: 3500,
    bio: "A patient, structured teacher who specialises in turning maths anxiety into confidence. I focus on building strong fundamentals before layering on exam strategy, and share visual, step-by-step notes after every session.",
  },
  {
    name: "Sofia Marchetti",
    email: "sofia.marchetti.demo@tutorconnect.dev",
    phone: "+39 345 678 9012",
    country: "Milan, Italy",
    subjects: "Spanish, Italian",
    yearsExperience: 6,
    hourlyRateCents: 2800,
    bio: "Native Italian speaker with a passion for conversational fluency. Lessons blend grammar with real conversation, music and film, so language feels natural rather than academic from day one.",
  },
  {
    name: "James Halloran",
    email: "james.halloran.demo@tutorconnect.dev",
    phone: "+44 7700 900123",
    country: "London, UK",
    subjects: "Chemistry, Biology",
    yearsExperience: 10,
    hourlyRateCents: 4000,
    bio: "Former secondary school science teacher now tutoring full-time. I specialise in exam board-specific preparation (AQA, Edexcel, OCR) and love making abstract concepts click with hands-on analogies.",
  },
  {
    name: "Priya Nair",
    email: "priya.nair.demo@tutorconnect.dev",
    phone: "+91 98765 43210",
    country: "Bengaluru, India",
    subjects: "Computer Science, Python",
    yearsExperience: 9,
    hourlyRateCents: 5200,
    bio: "Software engineer turned educator. I teach programming fundamentals, data structures and Python through project-based learning, so students leave every session with something real they built themselves.",
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim.demo@tutorconnect.dev",
    phone: "+1 416 555 0198",
    country: "Toronto, Canada",
    subjects: "Test Prep, Mathematics",
    yearsExperience: 7,
    hourlyRateCents: 6000,
    bio: "SAT/ACT specialist who has helped hundreds of students raise their scores through targeted practice, timing strategy and honest diagnostic feedback rather than generic worksheets.",
  },
  {
    name: "Isabelle Laurent",
    email: "isabelle.laurent.demo@tutorconnect.dev",
    phone: "+33 6 12 34 56 78",
    country: "Paris, France",
    subjects: "French, English",
    yearsExperience: 5,
    hourlyRateCents: 2600,
    bio: "Bilingual language coach focused on speaking confidence. My sessions are conversation-heavy from lesson one, with grammar taught in context instead of isolated drills.",
  },
  {
    name: "Marcus Webb",
    email: "marcus.webb.demo@tutorconnect.dev",
    phone: "+1 512 555 0176",
    country: "Austin, USA",
    subjects: "Guitar, Music Theory",
    yearsExperience: 15,
    hourlyRateCents: 4500,
    bio: "Professional session guitarist and music theory tutor. I teach players of every level, from first chords to improvisation and songwriting, with a practical, play-along approach.",
  },
  {
    name: "Hana Suzuki",
    email: "hana.suzuki.demo@tutorconnect.dev",
    phone: "+81 90 1234 5678",
    country: "Tokyo, Japan",
    subjects: "Japanese, Art History",
    yearsExperience: 4,
    hourlyRateCents: 3000,
    bio: "I teach Japanese for real-world use, plus a course on Japanese art history for students who want cultural context alongside the language.",
  },
  {
    name: "Oliver Bennett",
    email: "oliver.bennett.demo@tutorconnect.dev",
    phone: "+61 412 345 678",
    country: "Sydney, Australia",
    subjects: "Economics, Business Studies",
    yearsExperience: 11,
    hourlyRateCents: 4200,
    bio: "Ex-management consultant teaching economics and business studies with real case studies. Strong track record preparing students for IB and A-Level exams.",
  },
  {
    name: "Fatima Al-Sayed",
    email: "fatima.alsayed.demo@tutorconnect.dev",
    phone: "+971 50 123 4567",
    country: "Dubai, UAE",
    subjects: "Arabic, English Literature",
    yearsExperience: 6,
    hourlyRateCents: 3200,
    bio: "I help students fall in love with reading and writing, whether that's classical Arabic poetry or English literature analysis for exam boards.",
  },
  {
    name: "Carlos Mendes",
    email: "carlos.mendes.demo@tutorconnect.dev",
    phone: "+351 912 345 678",
    country: "Lisbon, Portugal",
    subjects: "Portuguese, Geography",
    yearsExperience: 3,
    hourlyRateCents: 2200,
    bio: "Recent graduate offering energetic, discussion-based lessons in Portuguese and geography, tailored around each student's interests to keep motivation high.",
  },
];

const DUMMY_COURSES = [
  {
    title: "Calculus Foundations: From Limits to Integrals",
    instructorEmail: "amara.okafor.demo@tutorconnect.dev",
    category: "PROGRAMMING_TECHNOLOGY",
    level: "BEGINNER",
    priceCents: 4599,
    originalPriceCents: 7999,
    durationHours: 9.5,
    lectureCount: 64,
    rating: 4.8,
    reviewCount: 1204,
    bestseller: true,
    subtitle: "Build a rock-solid foundation in calculus with worked problems and visual intuition.",
    whatYoullLearn: [
      "Master limits, derivatives and integrals from first principles",
      "Solve real exam-style problems with step-by-step reasoning",
      "Build visual intuition instead of memorising formulas",
    ].join("\n"),
  },
  {
    title: "Physics Mechanics: Motion, Forces & Energy",
    instructorEmail: "james.halloran.demo@tutorconnect.dev",
    category: "PROGRAMMING_TECHNOLOGY",
    level: "INTERMEDIATE",
    priceCents: 3999,
    originalPriceCents: 6499,
    durationHours: 8,
    lectureCount: 52,
    rating: 4.7,
    reviewCount: 856,
    premium: true,
    subtitle: "Exam-board aligned mechanics with hands-on analogies and past-paper practice.",
    whatYoullLearn: [
      "Apply Newton's laws to real-world motion problems",
      "Work through energy, momentum and circular motion",
      "Practice with AQA, Edexcel and OCR style questions",
    ].join("\n"),
  },
  {
    title: "Python Programming: Zero to Projects",
    instructorEmail: "priya.nair.demo@tutorconnect.dev",
    category: "PROGRAMMING_TECHNOLOGY",
    level: "BEGINNER",
    priceCents: 4499,
    originalPriceCents: 8999,
    durationHours: 14,
    lectureCount: 98,
    rating: 4.9,
    reviewCount: 3120,
    bestseller: true,
    subtitle: "Learn to code through project-based lessons — build something real every session.",
    whatYoullLearn: [
      "Write clean Python from variables to functions and classes",
      "Build 5 real projects, including a data-driven app",
      "Understand data structures and algorithm basics",
    ].join("\n"),
  },
  {
    title: "Conversational Spanish: Speak with Confidence",
    instructorEmail: "sofia.marchetti.demo@tutorconnect.dev",
    category: "LANGUAGES",
    level: "ALL_LEVELS",
    priceCents: 2999,
    originalPriceCents: 5499,
    durationHours: 11,
    lectureCount: 70,
    rating: 4.9,
    reviewCount: 642,
    subtitle: "Grammar meets real conversation, music and film — fluency that feels natural.",
    whatYoullLearn: [
      "Hold real conversations from your very first lessons",
      "Pick up natural phrasing through music and film clips",
      "Build grammar intuitively, not through rote drills",
    ].join("\n"),
  },
  {
    title: "Guitar & Music Theory Essentials",
    instructorEmail: "marcus.webb.demo@tutorconnect.dev",
    category: "MUSIC_INSTRUMENTS",
    level: "BEGINNER",
    priceCents: 3499,
    originalPriceCents: 5999,
    durationHours: 10,
    lectureCount: 58,
    rating: 5.0,
    reviewCount: 318,
    isNew: true,
    subtitle: "Technique, theory and repertoire from a professional session guitarist.",
    whatYoullLearn: [
      "Read chord charts and understand core music theory",
      "Develop proper technique and rhythm",
      "Play along with real songs from your first lessons",
    ].join("\n"),
  },
  {
    title: "SAT / ACT Test Prep Mastery",
    instructorEmail: "daniel.kim.demo@tutorconnect.dev",
    category: "TEST_PREPARATION",
    level: "INTERMEDIATE",
    priceCents: 5999,
    originalPriceCents: 9999,
    durationHours: 16,
    lectureCount: 110,
    rating: 4.8,
    reviewCount: 1567,
    bestseller: true,
    premium: true,
    subtitle: "A personalised study plan with weekly timed practice and score tracking.",
    whatYoullLearn: [
      "Master every section: reading, writing, and math",
      "Practice with full-length timed mock exams",
      "Learn targeted strategies for your weak spots",
    ].join("\n"),
  },
  {
    title: "Essay Writing: Structure, Style & Clarity",
    instructorEmail: "fatima.alsayed.demo@tutorconnect.dev",
    category: "CREATIVE_SKILLS",
    level: "ALL_LEVELS",
    priceCents: 2499,
    originalPriceCents: 4499,
    durationHours: 7,
    lectureCount: 41,
    rating: 4.6,
    reviewCount: 439,
    subtitle: "Write with confidence, from essay structure to close reading of literature.",
    whatYoullLearn: [
      "Structure persuasive, well-argued essays",
      "Sharpen close-reading and analysis skills",
      "Get feedback frameworks you can reuse for any subject",
    ].join("\n"),
  },
  {
    title: "Statistics for Data Analysis",
    instructorEmail: "liang.wei.demo@tutorconnect.dev",
    category: "PROGRAMMING_TECHNOLOGY",
    level: "INTERMEDIATE",
    priceCents: 3999,
    originalPriceCents: 6999,
    durationHours: 9,
    lectureCount: 55,
    rating: 4.7,
    reviewCount: 512,
    subtitle: "Turn maths anxiety into confidence with structured, visual statistics lessons.",
    whatYoullLearn: [
      "Understand distributions, probability and hypothesis testing",
      "Apply statistics to real datasets step by step",
      "Build visual, exam-ready notes for every topic",
    ].join("\n"),
  },
  {
    title: "Chemistry Fundamentals: Atoms to Reactions",
    instructorEmail: "james.halloran.demo@tutorconnect.dev",
    category: "PROGRAMMING_TECHNOLOGY",
    level: "BEGINNER",
    priceCents: 2999,
    originalPriceCents: 5299,
    durationHours: 7.5,
    lectureCount: 46,
    rating: 4.6,
    reviewCount: 287,
    isNew: true,
    subtitle: "Abstract concepts made concrete with hands-on analogies and demonstrations.",
    whatYoullLearn: [
      "Understand atomic structure and the periodic table",
      "Balance equations and predict reaction outcomes",
      "Prepare for exam board practicals and written papers",
    ].join("\n"),
  },
] as const;

async function main() {
  for (const t of DUMMY_TUTORS) {
    await prisma.user.upsert({
      where: { email: t.email },
      update: { phone: t.phone },
      create: {
        name: t.name,
        email: t.email,
        phone: t.phone,
        role: "TUTOR",
        tutorProfile: {
          create: {
            country: t.country,
            subjects: t.subjects,
            yearsExperience: t.yearsExperience,
            hourlyRateCents: t.hourlyRateCents,
            bio: t.bio,
            status: "APPROVED",
          },
        },
      },
    });
  }
  console.log(`Seeded ${DUMMY_TUTORS.length} demo tutors.`);

  for (const c of DUMMY_COURSES) {
    const instructor = await prisma.tutorProfile.findFirst({
      where: { user: { email: c.instructorEmail } },
    });
    if (!instructor) continue;

    const existing = await prisma.course.findFirst({ where: { title: c.title } });
    const data = {
      title: c.title,
      subtitle: c.subtitle,
      category: c.category as never,
      level: c.level as never,
      rating: c.rating,
      reviewCount: c.reviewCount,
      priceCents: c.priceCents,
      originalPriceCents: c.originalPriceCents,
      durationHours: c.durationHours,
      lectureCount: c.lectureCount,
      whatYoullLearn: c.whatYoullLearn,
      bestseller: "bestseller" in c ? c.bestseller : false,
      premium: "premium" in c ? c.premium : false,
      isNew: "isNew" in c ? c.isNew : false,
    };

    if (existing) {
      await prisma.course.update({
        where: { id: existing.id },
        data: { ...data, instructor: { connect: { id: instructor.id } } },
      });
    } else {
      await prisma.course.create({ data: { ...data, instructorId: instructor.id } });
    }
  }
  console.log(`Seeded ${DUMMY_COURSES.length} demo courses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
