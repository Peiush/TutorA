import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { TrustPillars } from "@/components/about/trust-pillars";
import { GuaranteeHeroIllustration } from "@/components/guarantee/guarantee-hero-illustration";

const BASE_URL = "https://www.tutora.it.com";

// Bump when this page's policy/copy changes materially — reused as the sitemap's lastmod
// (app/sitemap.ts), same convention as TEACH_LAST_UPDATED in app/teach/page.tsx.
export const GUARANTEE_LAST_UPDATED = "2026-08-07";

export const metadata: Metadata = {
  title: "Tutor Match Guarantee — TutorA",
  description:
    "If your first tutor isn't the right fit, TutorA matches you with someone else for the same subject at no extra cost. See how our rematch guarantee works.",
  alternates: { canonical: "/guarantee" },
  openGraph: {
    type: "website",
    title: "Tutor Match Guarantee — TutorA",
    description:
      "If your first tutor isn't the right fit, we match you with someone else for the same subject at no extra cost.",
    url: `${BASE_URL}/guarantee`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutor Match Guarantee — TutorA",
    description: "If your first tutor isn't the right fit, we fix it — free.",
  },
};

const howItWorks = [
  {
    title: "Start with a considered match",
    body: "Every request is reviewed by our team before a tutor is proposed — not an open board where anyone can pitch you. Your first match is already a considered choice, not a guess.",
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
    title: "Tell us if it's not the right fit",
    body: "After your first session, if the tutor isn't right for your subject, pace, or style, tell us. No lengthy justification required — your read on the fit is what matters.",
    icon: (
      <>
        <path d="M4 5h16v11H8l-4 4V5Z" />
        <path d="M9 9h6M9 12.5h4" />
      </>
    ),
  },
  {
    title: "We match you again — free",
    body: "We'll propose a different tutor for the same subject at no additional cost from TutorA's side. Repeat as many times as it takes to find the right fit.",
    icon: (
      <>
        <path d="M12 3.5 19.5 6.5v5.3c0 4.6-3.2 7.9-7.5 9-4.3-1.1-7.5-4.4-7.5-9V6.5L12 3.5Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </>
    ),
  },
];

const coveredItems = [
  "A free rematch to a different tutor for the same subject if your first tutor isn't the right fit",
  "As many rematches as it takes to find the right fit for that subject — there's no cap",
  "Applies to every subject and course listed on TutorA, not a limited list",
];

const notCoveredItems = [
  "TutorA doesn't process payment between you and your tutor directly today, so this is a rematching commitment, not a cash refund",
  "A guaranteed test score, grade, or outcome — no one can honestly promise that regardless of tutor quality",
  "Changes of mind after several sessions with a tutor you were previously happy with — for that, use the normal request flow to find someone new",
];

const guaranteeFaqs = [
  {
    q: "How many times can I request a rematch?",
    a: "As many as it takes to find the right fit for that subject — there's no cap on rematch requests.",
  },
  {
    q: "Does a rematch cost anything?",
    a: "No. Matching you with a new tutor after your first session isn't the right fit costs nothing extra from TutorA's side.",
  },
  {
    q: "What if I've already had several sessions, not just one?",
    a: "This guarantee is aimed at your very first session with a tutor. If you've been working with someone for a while and want a change for other reasons, use the normal request flow and our team will help you find someone new.",
  },
  {
    q: "Does this apply to test-prep subjects like SAT or GMAT?",
    a: "Yes — the guarantee applies to every subject and course listed on TutorA, including test-prep subjects.",
  },
  {
    q: "How do I actually request a rematch?",
    a: "Reply to your match confirmation or use the request flow on the subject's page to tell us it isn't the right fit. Our team handles the rest.",
  },
];

const guaranteeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/guarantee#webpage`,
  url: `${BASE_URL}/guarantee`,
  name: "Tutor Match Guarantee — TutorA",
  description:
    "If your first tutor isn't the right fit, TutorA matches you with someone else for the same subject at no extra cost.",
  inLanguage: "en-US",
  dateModified: GUARANTEE_LAST_UPDATED,
  isPartOf: { "@type": "WebSite", url: BASE_URL, name: "TutorA" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/guarantee#faq`,
  mainEntity: guaranteeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Tutor Match Guarantee", item: `${BASE_URL}/guarantee` },
  ],
};

export default function GuaranteePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guaranteeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
              top: "280px",
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
            <Tag variant="accent">Our guarantee</Tag>
            <h1 className="text-[clamp(30px,4.5vw,44px)] leading-tight mt-4 mb-4 max-w-[16ch]">
              If your tutor isn&rsquo;t the right fit, we fix it — free.
            </h1>
            <p
              className="text-[16px] leading-relaxed max-w-[58ch] mb-6"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Every TutorA match is personally reviewed before it happens. If your first session isn&rsquo;t
              right, we&rsquo;ll match you with someone else for the same subject — at no extra cost, and no
              runaround.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/request-a-tutor" className="btn btn-primary inline-block">
                Request a tutor
              </Link>
              <a href="#how-it-works" className="btn btn-ghost inline-block">
                See how it works
              </a>
            </div>
          </Reveal>

          <GuaranteeHeroIllustration />
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative py-[clamp(32px,5vw,56px)] scroll-mt-20"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
          <Reveal y={16}>
            <h2 className="text-[clamp(22px,3vw,28px)] mb-8">How the guarantee works</h2>
          </Reveal>
          <TrustPillars pillars={howItWorks} />
        </div>
      </section>

      {/* What's covered / not covered — honesty as the trust signal */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        <Reveal y={16}>
          <h2 className="text-[clamp(22px,3vw,28px)] mb-2">What this guarantee covers</h2>
          <p
            className="text-[15px] leading-relaxed max-w-[62ch] mb-8"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            We&rsquo;d rather be precise about what we commit to than vague about it.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal y={16}>
            <div
              className="card elev-sm h-full p-6 border"
              style={{ borderColor: "var(--color-divider)" }}
            >
              <h3
                className="text-[14px] font-semibold mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-verified)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Covered
              </h3>
              <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                {coveredItems.map((item) => (
                  <li key={item} className="text-[14px] leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal y={16} delay={120}>
            <div
              className="card elev-sm h-full p-6 border"
              style={{ borderColor: "var(--color-divider)" }}
            >
              <h3
                className="text-[14px] font-semibold mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-heading)", color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
                Not covered
              </h3>
              <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                {notCoveredItems.map((item) => (
                  <li key={item} className="text-[14px] leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why we do it this way — the transparency-as-trust section */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,64px)]">
          <Reveal y={16}>
            <div
              className="max-w-[780px] mx-auto text-center rounded-[var(--radius-lg)] border p-8 sm:p-10"
              style={{
                background: "var(--color-bg)",
                borderColor: "var(--color-divider)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h2 className="text-[clamp(20px,2.8vw,26px)] mb-4">Why we do it this way</h2>
              <p
                className="text-[15.5px] leading-relaxed m-0"
                style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}
              >
                TutorA is a growing platform — we don&rsquo;t have thousands of reviews to point to yet, and we&rsquo;d
                rather not pretend otherwise. So instead of asking you to take a match on faith, we built a policy
                that makes a bad first match cost you nothing extra. If it isn&rsquo;t the right fit, that&rsquo;s
                on us to fix — not on you to live with.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[clamp(32px,5vw,56px)]">
        <div className="max-w-[820px] mx-auto px-[clamp(20px,5vw,64px)]">
          <Reveal y={16}>
            <h2 className="text-[clamp(22px,3vw,28px)] mb-6">Questions about the guarantee</h2>
          </Reveal>
          <FaqAccordion faqs={guaranteeFaqs} />
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
            <h2 className="text-[clamp(22px,3vw,28px)] m-0">Ready to get matched?</h2>
            <p
              className="text-[15px] leading-relaxed max-w-[52ch] m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
            >
              Tell us what you&rsquo;re looking for, and if the first match isn&rsquo;t right, we&rsquo;ll fix
              it — free.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/request-a-tutor" className="btn btn-primary inline-block">
                Request a tutor
              </Link>
              <Link href="/find-a-tutor" className="btn btn-ghost inline-block">
                Browse tutors
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
