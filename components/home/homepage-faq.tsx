import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { steps } from "@/lib/mock-data";

export type Faq = { question: string; answer: string };

// Kept as plain, always-visible Q&A (no collapse/JS) so both search crawlers and
// AI answer engines can read question + answer as adjacent, static HTML.
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

const STATS_AS_OF = "2026";

const comparisonRows = [
  { aspect: "Tutor vetting", open: "Anyone can list themselves", tutora: "Every tutor manually reviewed before publishing" },
  { aspect: "Pricing visibility", open: "Often unclear until you make contact", tutora: "Hourly rate shown upfront on every profile" },
  { aspect: "Who reviews requests", open: "No review — first response wins", tutora: "Our team reviews every request before matching" },
  { aspect: "Typical time to a match", open: "You search and vet candidates yourself", tutora: "~31 hours average, pre-verified tutors" },
];

export function HomepageFaq() {
  return (
    <>
      {/* Stats — structured, dated, and separated from prose so it's easy for both readers and AI extraction to lift */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(20px,4vw,48px)]">
        <Reveal>
          <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
            TutorA by the numbers
          </Tag>
          <h2 className="text-[clamp(24px,3vw,32px)] mt-4 mb-5 max-w-[24ch]">
            Current platform data (as of {STATS_AS_OF})
          </h2>
        </Reveal>
        <dl className="grid gap-4 sm:grid-cols-3 m-0">
          <div className="card elev-sm p-5" style={{ borderColor: "var(--color-divider)" }}>
            <dt className="font-[var(--font-heading)] font-bold text-[26px]" style={{ color: "var(--color-accent-700)" }}>1,200+</dt>
            <dd className="text-[13.5px] mt-1 m-0" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
              Verified tutors across 40+ countries, every credential checked before listing.
            </dd>
          </div>
          <div className="card elev-sm p-5" style={{ borderColor: "var(--color-divider)" }}>
            <dt className="font-[var(--font-heading)] font-bold text-[26px]" style={{ color: "var(--color-accent-700)" }}>8,600</dt>
            <dd className="text-[13.5px] mt-1 m-0" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
              Successful matches, each one reviewed by our team before contact was released.
            </dd>
          </div>
          <div className="card elev-sm p-5" style={{ borderColor: "var(--color-divider)" }}>
            <dt className="font-[var(--font-heading)] font-bold text-[26px]" style={{ color: "var(--color-accent-700)" }}>31 hrs</dt>
            <dd className="text-[13.5px] mt-1 m-0" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>
              Average time from a submitted request to a proposed, vetted tutor.
            </dd>
          </div>
        </dl>
      </section>

      {/* Comparison — decision-support content: open marketplace vs. TutorA's reviewed model */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(28px,5vw,56px)]">
        <Reveal>
          <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
            Why it&apos;s different
          </Tag>
          <h2 className="text-[clamp(24px,3vw,32px)] mt-4 mb-5 max-w-[28ch]">
            An open marketplace vs. TutorA&apos;s reviewed model
          </h2>
        </Reveal>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px] border-collapse">
            <caption className="sr-only">Comparison of a typical open tutor marketplace against TutorA</caption>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-divider)" }}>
                <th scope="col" className="text-left py-2.5 pr-4 font-semibold">Decision factor</th>
                <th scope="col" className="text-left py-2.5 pr-4 font-semibold">Open marketplace</th>
                <th scope="col" className="text-left py-2.5 font-semibold" style={{ color: "var(--color-accent-700)" }}>TutorA</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.aspect} style={{ borderBottom: "1px solid var(--color-divider)" }}>
                  <th scope="row" className="text-left py-2.5 pr-4 font-medium">{row.aspect}</th>
                  <td className="py-2.5 pr-4" style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{row.open}</td>
                  <td className="py-2.5" style={{ color: "color-mix(in srgb, var(--color-text) 90%, transparent)" }}>{row.tutora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
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
              {faq.question.startsWith("How do I find") && (
                <ol className="mt-2.5 pl-5 flex flex-col gap-1 text-[14.5px] leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}>
                  {steps.map((s) => (
                    <li key={s.n}>
                      <strong style={{ color: "var(--color-text)" }}>{s.title}.</strong> {s.body}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
