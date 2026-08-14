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
      "TutorA is an online tutoring marketplace in the e-learning / education-technology space. It matches students, parents booking for their kids, and adult learners with personally vetted tutors and courses — spanning programming, test prep, languages, music, and academic subjects like math and science. Every tutor listing and course is reviewed by our team before it goes live, so you're never guessing who you're working with. For example, a parent booking AP Calculus help for a 9th grader and an adult learner picking up Python both go through the same private request flow, matched with a tutor our team has personally reviewed rather than an open listing anyone could post themselves. TutorA is admin-mediated end to end: our team sources the match and relays the first messages, and only charges a single success fee once both sides confirm — never a subscription, and never before a match is actually made.",
  },
  {
    question: "How do I find a tutor on TutorA?",
    answer:
      "Browse verified tutors on the Find a Tutor page, or send a private request describing what you need — nothing is posted publicly, and no tutor sees your contact details until you're matched. For example, a parent looking for a weekend SAT tutor can either scroll pre-vetted profiles directly, or describe the grade, subject, and availability in a request and let our team do the matching instead. Both paths lead to the same reviewed pool of tutors, not an open board where anyone can self-list without our team checking their background first. Browsing and requesting are both free — there's no account fee, no subscription, and no charge until a match is actually confirmed on both sides. Whichever path you pick, our team stays involved as the go-between rather than leaving you to message strangers cold. Here's what happens after you submit a request:",
  },
  {
    question: "How does TutorA verify its tutors?",
    answer:
      "Every tutor application is manually reviewed by our team before the profile is approved and published — we check subject expertise and teaching experience against what's claimed on the application, and no listing goes live unvetted. That review step is what separates TutorA from an open marketplace where anyone can list themselves with no one checking their background first. For example, an applicant claiming AP Chemistry experience is reviewed against that specific subject before being approved to teach it, rather than being approved generically and left to self-report expertise later. If a tutor doesn't hold up under review, the profile simply never gets published — there's no \"pending, unverified\" listing sitting live on the site in the meantime, which is the gap most open marketplaces leave open by letting anyone self-list with no one else checking their claims first.",
  },
  {
    question: "Is there a fee to browse tutors or submit a request?",
    answer:
      "No — browsing tutors and courses, and submitting a request, doesn't cost anything upfront, no matter how many tutors you message or requests you send. Tutors set their own hourly rates, shown directly on each profile, so you know the price before you ever connect with anyone. TutorA doesn't charge a subscription or a browsing fee at any point in that process. For example, a parent comparing three AP Calculus tutors' rates and availability before requesting one pays nothing until a match is actually confirmed on both sides — at which point TutorA charges a single success fee, not the tutor's hourly rate itself. That success-fee-only model is also why tutor profiles stay honest about pricing: nothing is hidden behind a paywall or a \"contact for rates\" placeholder you have to message someone just to see.",
  },
  {
    question: "How long does it take to get matched with a tutor?",
    answer:
      "On average, TutorA proposes a vetted tutor within 31 hours of a submitted request. For example: a parent requesting an AP Calculus tutor for their 11th grader typically gets a reviewed, vetted match proposed within a day or two — no cold-messaging strangers and no unverified listings to sort through in the meantime. That timeline holds whether the request is for a one-off exam-prep session or an ongoing weekly subject, because the review step (checking the tutor's subject expertise and experience) happens before a match is proposed, not after — so the 31-hour average already includes vetting, not just a scheduling reply. If the first proposed match isn't the right fit, TutorA rematches at no extra cost, with no cap on how many times — so the 31-hour figure describes the first proposal, not a one-shot guess you're stuck with.",
  },
  {
    question: "What subjects and courses does TutorA cover?",
    answer:
      "TutorA covers academic subjects (math, sciences, test prep like AP courses) alongside programming, languages, and music — both as one-on-one tutor matches and structured courses. For example, a student can get live 1:1 help with AP Chemistry, take a self-paced Python course, or book weekly guitar lessons, all through the same reviewed pool of tutors and courses. Every course listing goes through the same manual review as tutor applications before it publishes, so a course appearing on the site has already been checked rather than uploaded and left live unvetted. High-dosage, personally-vetted tutoring is well documented as one of the more effective interventions for accelerating student learning outcomes, which is the same reasoning behind reviewing every course and tutor before it goes live rather than after — the review step isn't paperwork, it's what makes the \"personally vetted\" claim actually true.",
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
