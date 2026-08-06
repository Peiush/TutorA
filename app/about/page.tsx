import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { FaqIllustration } from "@/components/about/faq-illustration";
import { studentFlow, tutorFlow, faqs, testimonials } from "@/lib/mock-data";
import { AboutHero } from "@/components/about/about-hero";
import { FlowPanels } from "@/components/about/flow-panels";
import { TrustPillars } from "@/components/about/trust-pillars";
import { TestimonialCards } from "@/components/about/testimonial-cards";
import { PricingTable } from "@/components/about/pricing-table";
import { ContactCta } from "@/components/about/contact-cta";

// Bump when this page's content changes materially — reused as the sitemap's lastmod
// (app/sitemap.ts), same convention as HOMEPAGE_LAST_UPDATED in app/page.tsx.
export const ABOUT_LAST_UPDATED = "2026-07-23";

export const metadata = {
  title: "About & How It Works",
  description:
    "See how TutorA's admin-mediated matching works, from request to verified tutor — plus pricing, FAQs, and what makes every match trustworthy.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    title: "Nothing goes live unverified",
    body: "Every tutor listing and every student request is reviewed by our team before it can be seen by the other side.",
    icon: (
      <path d="M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z" />
    ),
  },
  {
    title: "No public lead list",
    body: "Requests are never posted for tutors to scroll and pitch on. We propose the fit — quietly, and only to the right person.",
    icon: <path d="M4 5h16M4 12h16M4 19h10" />,
  },
  {
    title: "You only pay on a real match",
    body: "No listing fees, no browsing fees. A single success fee is charged once both sides confirm — never before.",
    icon: <path d="M19 5 5 19M8 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <AboutHero />

      {/* Trust pillars + Flows */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(8px,2vw,16px)] pb-[clamp(32px,4vw,48px)]">
          <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
            Why it works
          </Tag>
          <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-10 max-w-[24ch]">
            The trust is the product.
          </h2>
          <TrustPillars pillars={pillars} />
        </div>

        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,84px)]">
          <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
            Step by step
          </Tag>
          <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-10 max-w-[24ch]">
            Two sides, one careful process.
          </h2>
          <FlowPanels studentFlow={studentFlow} tutorFlow={tutorFlow} />
        </div>
      </section>

      {/* How we earn */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
        <div className="grid gap-8 items-center [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <Reveal>
            <div>
              <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
                How we earn
              </Tag>
              <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-4 max-w-[18ch]">
                Nothing before a real match. Ever.
              </h2>
              <p
                className="text-[16px] leading-[1.62] max-w-[48ch]"
                style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
              >
                TutorA charges a percentage-based success fee once a match is confirmed —
                nothing before. There are no listing fees for tutors and no charge to browse or
                request. Our incentive is simple: a good match that lasts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <PricingTable />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
          <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
            What people say
          </Tag>
          <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-9">Trusted by both sides</h2>
          <TestimonialCards testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full blur-3xl opacity-30"
          style={{ background: "var(--color-accent-200)" }}
          aria-hidden
        />
        <div className="relative max-w-[820px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
                Frequently asked
              </Tag>
              <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-9">Still curious?</h2>
            </div>
            <FaqIllustration />
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCta />
    </div>
  );
}
