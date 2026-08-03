import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";

export type Faq = { question: string; answer: string };

// Kept as plain, always-visible Q&A (no collapse/JS) so both search crawlers and
// AI answer engines can read question + answer as adjacent, static HTML.
export const homepageFaqs: Faq[] = [
  {
    question: "What is TutorA?",
    answer:
      "TutorA is an online tutoring marketplace that matches students with personally vetted tutors and courses — spanning programming, test prep, languages, music, and academic subjects like math and science. Every tutor listing and course is reviewed by our team before it goes live, so you're never guessing who you're working with.",
  },
  {
    question: "How do I find a tutor on TutorA?",
    answer:
      "Browse verified tutors on the Find a Tutor page, or send a private request describing what you need — nothing is posted publicly. Our team reviews the request, sources a vetted match, and relays messages between both sides until contact details are released and you connect directly.",
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
      "On average, TutorA proposes a vetted tutor within 31 hours of a submitted request. That's possible because every tutor is pre-verified ahead of time rather than reviewed on demand.",
  },
  {
    question: "What subjects and courses does TutorA cover?",
    answer:
      "TutorA covers academic subjects (math, sciences, test prep like AP courses) alongside programming, languages, and music — both as one-on-one tutor matches and structured courses. High-dosage, personally-vetted tutoring is well documented as one of the more effective interventions for accelerating student learning outcomes.",
  },
];

export function HomepageFaq() {
  return (
    <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,80px)]">
      <Reveal>
        <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
          Common questions
        </Tag>
        <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-8 max-w-[24ch]">
          Frequently asked questions
        </h2>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {homepageFaqs.map((faq) => (
          <div key={faq.question} className="card elev-sm p-5" style={{ borderColor: "var(--color-divider)" }}>
            <h3 className="text-[16px] font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              {faq.question}
            </h3>
            <p
              className="text-[14.5px] leading-relaxed m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
            >
              {faq.answer}
              {faq.question.startsWith("What subjects") && (
                <>
                  {" "}
                  <a
                    href="https://ies.ed.gov/learn/blog/how-high-quality-small-group-tutoring-can-accelerate-learning"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                    style={{ color: "var(--color-accent-2-700)" }}
                  >
                    Read the IES research on high-quality tutoring
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
