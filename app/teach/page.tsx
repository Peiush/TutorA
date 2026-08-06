import type { Metadata } from "next";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { TrustPillars } from "@/components/about/trust-pillars";
import { TeachHeroIllustration } from "@/components/teach/teach-hero-illustration";
import { SubjectsShowcase } from "@/components/teach/subjects-showcase";

const BASE_URL = "https://www.tutora.it.com";
const CONTACT_EMAIL = "tutora.support@gmail.com";
const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "I'd like to teach on TutorA"
)}&body=${encodeURIComponent(
  "Hi TutorA team,\n\nI'm interested in teaching on TutorA. Here's a bit about me:\n\nSubject(s) I'd like to teach:\nYears of experience:\nA little about my background:\n\nThanks!"
)}`;

// Bump when this page's content changes materially — reused as the sitemap's lastmod
// (app/sitemap.ts), same convention as HOMEPAGE_LAST_UPDATED in app/page.tsx.
export const TEACH_LAST_UPDATED = "2026-08-06";

export const metadata: Metadata = {
  title: "Become an Online Tutor — Teach on TutorA",
  description:
    "Teach students online on TutorA. Set your own rate, get matched with students who need your subjects, and join a personally vetted roster of tutors — not an open marketplace.",
  alternates: { canonical: "/teach" },
  openGraph: {
    type: "website",
    title: "Become an Online Tutor — Teach on TutorA",
    description:
      "Teach students online on TutorA. Set your own rate, get matched with students who need your subjects, and join a personally vetted roster of tutors.",
    url: `${BASE_URL}/teach`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Become an Online Tutor — Teach on TutorA",
    description: "Set your own rate, get matched with students, and join a personally vetted roster of tutors.",
  },
};

const whyTeach = [
  {
    title: "Set your own rate and schedule",
    body: "You decide your hourly rate per subject and your own availability per student — no fixed schedule imposed on you, and no listing fees either way.",
    icon: (
      <path d="M12 3v3M12 18v3M8 8.5c0-1.7 1.8-3 4-3s4 1.1 4 2.6c0 1.6-1.6 2.2-4 2.9-2.4.7-4 1.3-4 2.9C8 15.5 9.8 16.5 12 16.5s4-1.3 4-3" />
    ),
  },
  {
    title: "Matched, not cold-pitched",
    body: "Students and parents send requests describing what they need; our team proposes you as a match instead of you competing in an open bidding feed.",
    icon: (
      <>
        <circle cx="8.5" cy="8" r="3" />
        <path d="M2.5 19.5c.8-3.4 3-5 6-5s5.2 1.6 6 5" />
        <circle cx="17" cy="8.5" r="2.4" />
        <path d="M15.8 11.2c1.9.4 3.2 1.7 3.7 3.8" />
      </>
    ),
  },
  {
    title: "A vetted roster, not an open marketplace",
    body: "Every tutor is reviewed before their profile goes live. That review is what students are trusting when they choose TutorA — and what makes your listing worth more than a self-service one.",
    icon: (
      <>
        <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </>
    ),
  },
];

const teachFaqs = [
  {
    q: "How do I actually get listed as a tutor?",
    a: "Email us using the button below with your subject(s), experience, and a bit about your background. Our team reviews every application — there's no self-service signup — and follows up directly once we've had a chance to look it over.",
  },
  {
    q: "Is there a cost to join?",
    a: "No listing fees. TutorA takes a single success fee only once a student match is confirmed — never charged upfront to tutors or students.",
  },
  {
    q: "What subjects are you looking for?",
    a: "Academic subjects and test prep, programming, languages, music, and creative skills — see the subject areas below. If your subject isn't listed, tell us anyway; the catalog grows as tutors join.",
  },
  {
    q: "Do I need to be available a fixed number of hours?",
    a: "No. You set your own availability per student once you're matched — there's no minimum hours requirement to join.",
  },
];

export default function TeachPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          ["--hero-gutter" as string]:
            "max(clamp(20px,5vw,64px), calc((100vw - 1180px) / 2 + clamp(20px,5vw,64px)))",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div
            className="hidden lg:block absolute rounded-full"
            style={{
              top: "-100px",
              right: "-120px",
              width: 480,
              height: 480,
              background: "radial-gradient(circle at 32% 32%, var(--color-accent-200), transparent 72%)",
              opacity: 0.5,
              filter: "blur(6px)",
            }}
          />
          <div
            className="hidden lg:block absolute rounded-full"
            style={{
              top: "260px",
              right: "40px",
              width: 300,
              height: 300,
              background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-200), transparent 70%)",
              opacity: 0.4,
              filter: "blur(10px)",
            }}
          />
        </div>

        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(28px,4vw,56px)] pb-[clamp(20px,4vw,40px)] relative z-[1] flex items-center justify-between gap-8">
          <Reveal y={20} className="max-w-[620px]">
            <Tag variant="accent">For tutors</Tag>
            <h1 className="text-[clamp(30px,4.5vw,44px)] leading-tight mt-4 mb-4 max-w-[18ch]">
              Teach students online, without the open-marketplace noise.
            </h1>
            <p
              className="text-[16px] leading-relaxed max-w-[62ch] mb-6"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              TutorA matches vetted tutors with students and parents who submit a request — you don&rsquo;t chase
              leads or compete in an open listings feed. Every tutor is personally reviewed by our team before
              their profile goes live, which is exactly why students trust the match.
            </p>
            <a href={MAILTO_HREF} className="btn btn-primary inline-block">
              I&rsquo;m interested — email us
            </a>
          </Reveal>

          <TeachHeroIllustration />
        </div>
      </section>

      {/* Why teach */}
      <section
        className="relative py-[clamp(32px,5vw,56px)]"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
          <Reveal y={16}>
            <h2 className="text-[clamp(22px,3vw,28px)] mb-8">Why teach on TutorA</h2>
          </Reveal>
          <TrustPillars pillars={whyTeach} />
        </div>
      </section>

      {/* Subjects */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        <Reveal y={16} className="mb-8">
          <Tag variant="accent-2">What we&rsquo;re hiring for</Tag>
          <h2 className="text-[clamp(22px,3vw,28px)] mt-4 mb-3">Subjects we&rsquo;re looking for</h2>
          <p
            className="text-[15px] leading-relaxed max-w-[56ch] m-0"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            Five broad areas, endless niches inside them. If you teach something adjacent, reach out anyway.
          </p>
        </Reveal>
        <SubjectsShowcase />
      </section>

      {/* FAQ */}
      <section
        className="py-[clamp(32px,5vw,56px)]"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-[820px] mx-auto px-[clamp(20px,5vw,64px)]">
          <Reveal y={16}>
            <h2 className="text-[clamp(22px,3vw,28px)] mb-6">Questions before you reach out</h2>
          </Reveal>
          <FaqAccordion faqs={teachFaqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,64px)]">
        <Reveal y={16}>
          <div
            className="relative flex flex-col items-center gap-4 text-center max-w-[820px] mx-auto rounded-[var(--radius-lg)] border p-8 sm:p-10 overflow-hidden"
            style={{
              background: "color-mix(in srgb, var(--color-accent-100) 70%, var(--color-surface))",
              borderColor: "var(--color-divider)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <h2 className="text-[clamp(22px,3vw,28px)] m-0">Ready to teach on TutorA?</h2>
            <p
              className="text-[15px] leading-relaxed max-w-[52ch] m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Send us a quick email with your subject, experience, and background — our team reads every one.
            </p>
            <a href={MAILTO_HREF} className="btn btn-primary inline-block">
              Email {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
