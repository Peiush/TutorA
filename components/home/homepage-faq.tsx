import { ComparisonShowdown } from "@/components/home/comparison-showdown";
import { FaqShowcase } from "@/components/home/faq-showcase";
import { PlatformStats } from "@/components/home/platform-stats";
import { steps } from "@/lib/mock-data";

export type Faq = { question: string; answer: string };

// Rendered as an accordion (see FaqShowcase) — question + answer still exist in the
// static HTML (just visually collapsed), and the full text also feeds the FAQPage
// JSON-LD in app/page.tsx, so crawlers and AI answer engines can read it either way.
export const homepageFaqs: Faq[] = [
  {
    question: "What is TutorA?",
    answer:
      "TutorA is an online tutoring marketplace in the e-learning / education-technology space. It matches students, parents booking for their kids, and adult learners with personally vetted tutors and courses — spanning programming, test prep, languages, music, and academic subjects like math and science. Every tutor listing and course is reviewed by our team before it goes live, so you're never guessing who you're working with.",
  },
  {
    question: "How do I find a tutor on TutorA?",
    answer:
      "Browse verified tutors on the Find a Tutor page, or send a private request describing what you need — nothing is posted publicly. From there:",
  },
  {
    question: "How does TutorA verify its tutors?",
    answer:
      "Every tutor application is manually reviewed by our team before the profile is approved and published — we check subject expertise and experience, and no listing goes live unvetted. That review step is what separates TutorA from an open marketplace where anyone can list themselves.",
  },
  {
    question: "Is there a fee to browse tutors or submit a request?",
    answer:
      "No — browsing tutors and courses, and submitting a request, doesn't cost anything upfront. Tutors set their own hourly rates, shown directly on each profile, so you know the price before you ever connect.",
  },
  {
    question: "How long does it take to get matched with a tutor?",
    answer:
      "On average, TutorA proposes a vetted tutor within 31 hours of a submitted request. For example: a parent requesting an AP Calculus tutor for their 11th grader typically gets a reviewed, vetted match proposed within a day or two — no cold-messaging strangers and no unverified listings to sort through.",
  },
  {
    question: "What subjects and courses does TutorA cover?",
    answer:
      "TutorA covers academic subjects (math, sciences, test prep like AP courses) alongside programming, languages, and music — both as one-on-one tutor matches and structured courses. High-dosage, personally-vetted tutoring is well documented as one of the more effective interventions for accelerating student learning outcomes.",
  },
];

export function HomepageFaq() {
  return (
    <>
      {/* Stats — structured, dated, and separated from prose so it's easy for both readers and AI extraction to lift */}
      <PlatformStats />

      {/* Comparison — decision-support content: open marketplace vs. TutorA's reviewed model */}
      <ComparisonShowdown />

      {/* FAQ */}
      <FaqShowcase faqs={homepageFaqs} steps={steps} />
    </>
  );
}
