export interface TutorRaw {
  id?: string;
  name: string;
  headline: string;
  subjects: string[];
  price: string;
  rating: number;
  reviews: number;
  meta: string;
  city: string;
  mode: "Online" | "In person" | "Both";
  region: string;
  isNew?: boolean;
  languages?: string[];
  bio?: string;
}

export const tutorsRaw: TutorRaw[] = [
  {
    name: "Dr. Amara Okafor",
    headline: "Physics & Maths",
    subjects: ["Physics", "Mathematics"],
    price: "$48/hr",
    rating: 4.9,
    reviews: 127,
    meta: "Online · GMT · 12 yrs experience",
    city: "Lagos, Nigeria",
    mode: "Online",
    region: "Africa",
    languages: ["English", "Igbo"],
    bio: "I help students build genuine intuition for physics and maths, not just memorised formulas. My lessons move from first-principles reasoning to exam technique, with plenty of worked problems tailored to each student's syllabus.",
  },
  {
    name: "Liang Wei",
    headline: "Mathematics specialist",
    subjects: ["Mathematics", "Statistics"],
    price: "$35/hr",
    rating: 4.8,
    reviews: 94,
    meta: "Online · CST · 8 yrs experience",
    city: "Chicago, USA",
    mode: "Online",
    region: "United States",
    languages: ["English", "Mandarin"],
    bio: "A patient, structured teacher who specialises in turning maths anxiety into confidence. I focus on building strong fundamentals before layering on exam strategy, and share visual, step-by-step notes after every session.",
  },
  {
    name: "Sofia Marchetti",
    headline: "Spanish & Italian",
    subjects: ["Spanish", "Italian"],
    price: "€28/hr",
    rating: 5.0,
    reviews: 63,
    meta: "Online · CET · 6 yrs experience",
    city: "Milan, Italy",
    mode: "Online",
    region: "Europe",
    languages: ["Italian", "Spanish", "English"],
    bio: "Native Italian speaker with a passion for conversational fluency. Lessons blend grammar with real conversation, music and film, so language feels natural rather than academic from day one.",
  },
  {
    name: "James Halloran",
    headline: "Chemistry & Biology",
    subjects: ["Chemistry", "Biology"],
    price: "£40/hr",
    rating: 4.7,
    reviews: 81,
    meta: "In person · London · 10 yrs",
    city: "London, UK",
    mode: "In person",
    region: "United Kingdom",
    languages: ["English"],
    bio: "Former secondary school science teacher now tutoring full-time. I specialise in exam board-specific preparation (AQA, Edexcel, OCR) and love making abstract concepts click with hands-on analogies.",
  },
  {
    name: "Priya Nair",
    headline: "Computer Science",
    subjects: ["Computer Science", "Python"],
    price: "$52/hr",
    rating: 4.9,
    reviews: 110,
    meta: "Online · IST · 9 yrs experience",
    city: "Bengaluru, India",
    mode: "Online",
    region: "Asia-Pacific",
    languages: ["English", "Hindi", "Tamil"],
    bio: "Software engineer turned educator. I teach programming fundamentals, data structures and Python through project-based learning, so students leave every session with something real they built themselves.",
  },
  {
    name: "Daniel Kim",
    headline: "SAT / ACT Test Prep",
    subjects: ["Test Prep", "Mathematics"],
    price: "$60/hr",
    rating: 4.8,
    reviews: 145,
    meta: "Online · EST · 7 yrs experience",
    city: "Toronto, Canada",
    mode: "Online",
    region: "United States",
    languages: ["English", "Korean"],
    bio: "Specialist SAT/ACT coach with a track record of significant score improvements. I build a personalised study plan around each student's target schools and weak spots, with weekly timed practice.",
  },
  {
    name: "Elena Rossi",
    headline: "Piano & Music Theory",
    subjects: ["Music", "Piano"],
    price: "€45/hr",
    rating: 5.0,
    reviews: 52,
    meta: "In person · Rome · 15 yrs",
    city: "Rome, Italy",
    mode: "In person",
    region: "Europe",
    languages: ["Italian", "English", "French"],
    bio: "Conservatory-trained pianist teaching students of all ages and levels. Lessons combine technique, theory and repertoire chosen to keep practice genuinely enjoyable, not just correct.",
  },
  {
    name: "Marcus Bennett",
    headline: "English & Literature",
    subjects: ["English", "Writing"],
    price: "$38/hr",
    rating: 4.6,
    reviews: 73,
    meta: "Online · EST · 11 yrs experience",
    city: "Austin, USA",
    mode: "Online",
    region: "United States",
    languages: ["English"],
    bio: "I help students write with clarity and confidence, from essay structure to close reading of literature. Feedback is detailed and specific, aimed at building skills that carry over to every subject.",
  },
];

export function stars(rating: number) {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

export const stats = [
  {
    num: "1,200+",
    label: "Verified tutors across 40+ countries, every credential checked before listing.",
  },
  {
    num: "8,600",
    label: "Successful matches, each one reviewed by our team before contact was released.",
  },
  {
    num: "31 hrs",
    label: "Average time from a submitted request to a proposed, vetted tutor.",
  },
];

export const steps = [
  {
    n: "1",
    title: "You tell us",
    body: "Browse verified tutors or send a private request. Nothing is posted publicly and no tutor sees your details.",
    bg: "var(--color-accent-100)",
    dot: "var(--color-accent)",
  },
  {
    n: "2",
    title: "We verify & match",
    body: "Our team vets every tutor, sources the right fit and relays messages — the trusted bridge between both sides.",
    bg: "var(--color-accent-2-200)",
    dot: "var(--color-accent-2-700)",
  },
  {
    n: "3",
    title: "You connect",
    body: "Once you and the tutor both confirm, we release contact details immediately and step aside. Learning begins.",
    bg: "var(--color-accent-100)",
    dot: "var(--color-accent)",
  },
];

export const pipeline = [
  { label: "Submitted", time: "Jul 15, 9:02am", dot: "var(--color-accent-2-200)", dotText: "var(--color-accent-2-800)", pulse: false, hasNext: true },
  { label: "Verified", time: "Jul 15, 11:40am", dot: "var(--color-verified)", dotText: "#fff", pulse: true, hasNext: true },
  { label: "Matched", time: "Awaiting confirmation", dot: "var(--color-neutral-200)", dotText: "var(--color-neutral-500)", pulse: false, hasNext: false },
];

export const testimonials = [
  { quote: "I described what my daughter needed and had three vetted options in a day. No cold-calling, no guessing.", name: "Rebecca T.", role: "Parent" },
  { quote: "Knowing every tutor was verified before I ever saw them made the whole thing feel safe.", name: "Aisha M.", role: "Student" },
  { quote: "The team handles the awkward parts — matching, fees, scheduling. I just teach.", name: "Daniel K.", role: "Tutor" },
];

export const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "Computer Science", "Languages", "Music", "Economics", "Test Prep",
];

export const tutorPerks = [
  "A steady stream of matched, ready students — no marketing needed.",
  "We handle vetting, introductions and fee negotiation.",
  "Set your own rate and availability, teach online or in person.",
  "Transparent commission — you only pay on a confirmed match.",
];

export const tutorTestimonials = [
  { quote: "Three matched students in my first month, all a genuine fit. I never had to advertise.", name: "Priya N.", role: "Computer Science tutor" },
  { quote: "The vetting means students arrive serious and prepared. My time is spent teaching.", name: "James H.", role: "Chemistry tutor" },
];

export const studentFlow = [
  { n: "1.", text: "Browse tutors or submit a private request describing what you need." },
  { n: "2.", text: "Our team reviews and proposes vetted, matching tutors." },
  { n: "3.", text: "Message through us while we confirm the fit on both sides." },
  { n: "4.", text: "On confirmation, contact details are released and you begin." },
];

export const tutorFlow = [
  { n: "1.", text: "Create a listing; we verify your credentials within 24–48 hours." },
  { n: "2.", text: "Receive matched leads with the requirements, not the student's details." },
  { n: "3.", text: "Accept, decline or ask a question — all relayed by our team." },
  { n: "4.", text: "On a confirmed match, contacts release and commission is logged." },
];

export const faqs = [
  { q: "Can I contact a tutor directly?", a: "Not until a match is confirmed. Every introduction is made by our team — it keeps both sides safe and every match accountable. The moment you and the tutor both confirm, we release full contact details." },
  { q: "How much does it cost?", a: "Browsing and requesting are free. TutorConnect charges a percentage-based success fee once a match is confirmed — never before." },
  { q: "How are tutors verified?", a: "Every tutor uploads qualifications and experience, which our team reviews before a profile goes live. Reviews from students are published openly." },
  { q: "How quickly will I be matched?", a: "Most students receive proposed tutors within 24–48 hours of submitting a request." },
  { q: "Is TutorConnect available in my country?", a: "Yes — we operate internationally, with multi-currency pricing and time-zone-aware matching for online tutoring." },
];
