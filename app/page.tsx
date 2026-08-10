import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TrustStrip } from "@/components/home/trust-strip";
import { HeroIllustration } from "@/components/home/hero-illustration";
import { HeroIllustrationMobile } from "@/components/home/hero-illustration-mobile";
import { HeroMobileFx } from "@/components/home/hero-mobile-fx";
import { HeroHeading, HeroCopy } from "@/components/home/hero-content";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { HowItWorksSteps } from "@/components/home/how-it-works-steps";
import { VerificationPipeline } from "@/components/home/verification-pipeline";
import type { CategoryCount } from "@/components/home/course-categories-showcase";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { courseCategories } from "@/lib/mock-courses";
import {
  tutorsRaw,
  steps,
  pipeline,
  testimonials,
  popularSubjects,
} from "@/lib/mock-data";
import { homepageFaqs } from "@/components/home/homepage-faq";

// Below-the-fold sections: split into separate chunks so their GSAP-driven JS isn't
// part of the critical bundle blocking first paint. Content still renders via SSR (ssr: true).
const CourseCategoriesShowcase = dynamic(() =>
  import("@/components/home/course-categories-showcase").then((mod) => mod.CourseCategoriesShowcase)
);
const WhoItsFor = dynamic(() => import("@/components/home/who-its-for").then((mod) => mod.WhoItsFor));
const FeaturedTutors = dynamic(() =>
  import("@/components/home/featured-tutors").then((mod) => mod.FeaturedTutors)
);
const FeaturedTutorsIllustration = dynamic(() =>
  import("@/components/home/featured-tutors-illustration").then((mod) => mod.FeaturedTutorsIllustration)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/testimonials-section").then((mod) => mod.TestimonialsSection)
);
const PopularSubjects = dynamic(() =>
  import("@/components/home/popular-subjects").then((mod) => mod.PopularSubjects)
);
const FinalCta = dynamic(() => import("@/components/home/final-cta").then((mod) => mod.FinalCta));
const HomepageFaq = dynamic(() =>
  import("@/components/home/homepage-faq").then((mod) => mod.HomepageFaq)
);

const BASE_URL = "https://www.tutora.it.com";

export const metadata: Metadata = {
  description:
    "Find a personally verified tutor or course on TutorA. Every student request and tutor listing is reviewed by our team before it's matched.",
  alternates: { canonical: "/" },
};

// Bump this when homepage copy changes materially — it's a real freshness signal for
// search/AI crawlers, not a build timestamp, so it shouldn't move on every deploy.
// Exported for reuse as the sitemap's lastmod for "/" (app/sitemap.ts) — one true value
// instead of two dates that can drift apart.
export const HOMEPAGE_LAST_UPDATED = "2026-08-03";

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "TutorA — The right tutor, personally matched",
  description:
    "TutorA sits between students and tutors so no one has to guess. Every match is personally verified by our team.",
  inLanguage: "en-US",
  dateModified: HOMEPAGE_LAST_UPDATED,
  isPartOf: { "@type": "WebSite", url: BASE_URL, name: "TutorA" },
  about: { "@type": "Organization", name: "TutorA", url: BASE_URL },
  mainEntity: { "@id": `${BASE_URL}/#faq` },
};

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
  mainEntity: homepageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      // The "how to find a tutor" answer renders as prose + a visible ordered list on the
      // page (see HomepageFaq); mirror both parts here so the schema matches what's on screen.
      text: faq.question.startsWith("How do I find")
        ? `${faq.answer} ${steps.map((s) => `${s.title}: ${s.body}`).join(" ")}`
        : faq.answer,
    },
  })),
};

// Google retired HowTo rich results in Sept 2023, so this deliberately isn't typed as
// HowTo (that markup would just be dead weight now) — a plain ItemList still gives AI/GEO
// crawlers a structured read of the three-step process without claiming a stale rich result.
const howItWorksJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${BASE_URL}/#how-it-works`,
  name: "How TutorA matches you with a tutor",
  itemListElement: steps.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.body,
  })),
};

// TutorA is the brand/Organization; this Service entity disambiguates what the brand
// actually offers, per schema.org guidance for sites without third-party profile links yet.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Online tutoring marketplace",
  provider: { "@type": "Organization", name: "TutorA", url: BASE_URL },
  // Explicit priority markets (per the client's stated international-SEO targets) alongside
  // the existing "Worldwide" claim — the latter stays accurate (TutorA does serve beyond
  // these five) but named countries give search/AI systems a concrete entity signal instead
  // of only a vague text string.
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "United Arab Emirates" },
    "Worldwide",
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Students, parents booking for their children, adult learners, and tutors",
  },
};

// A single-entry trail for the root URL — there's no parent page to link to, so this
// exists only to satisfy generic breadcrumb-schema checks, not real navigation.
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }],
};

export default async function Home() {
  const [approvedTutors, allCourses] = await Promise.all([
    getApprovedTutorListings(),
    getPublishedCourses(),
  ]);

  const categoryCounts: CategoryCount[] = courseCategories.map((label) => ({
    label,
    count: allCourses.filter((c) => c.category === label).length,
  }));
  const featured = [...approvedTutors, ...tutorsRaw].slice(0, 3);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howItWorksJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section
        className="relative"
        style={{
          ["--hero-gutter" as string]:
            "max(clamp(20px,5vw,64px), calc((100vw - 1180px) / 2 + clamp(20px,5vw,64px)))",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div
            className="hidden lg:block absolute rounded-full"
            style={{
              top: "-120px",
              right: "-140px",
              width: 520,
              height: 520,
              background: "radial-gradient(circle at 32% 32%, var(--color-accent-200), transparent 72%)",
              opacity: 0.55,
              filter: "blur(6px)",
            }}
          />
          <div
            className="hidden lg:block absolute rounded-full"
            style={{
              top: "220px",
              right: "60px",
              width: 340,
              height: 340,
              background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-200), transparent 70%)",
              opacity: 0.45,
              filter: "blur(10px)",
            }}
          />
        </div>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(28px,4vw,56px)] pb-[clamp(20px,4vw,48px)] relative z-[1]">
          <HeroMobileFx>
            <HeroHeading />
            <HeroIllustrationMobile />
            <HeroCopy />
          </HeroMobileFx>
        </div>
        <HeroIllustration />
        <TrustStrip />
      </section>

      {/* Top summary — a direct, self-contained answer for search snippets and AI answer engines */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-6 pb-2">
        <Reveal y={16}>
          <div
            className="relative flex flex-col items-center gap-4 text-center max-w-[820px] mx-auto rounded-[var(--radius-lg)] border p-6 sm:p-8 overflow-hidden"
            style={{
              background: "color-mix(in srgb, var(--color-accent-100) 70%, var(--color-surface))",
              borderColor: "var(--color-divider)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <span
              className="flex-none grid place-content-center w-10 h-10 rounded-full"
              style={{ background: "var(--color-bg)", color: "var(--color-accent-700)", boxShadow: "var(--shadow-sm)" }}
              aria-hidden
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 6.5L21 11l-6.6 2.5L12 20l-2.4-6.5L3 11l6.6-2.5L12 2Z" />
              </svg>
            </span>
            <p
              className="text-[15px] leading-relaxed m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}
            >
              <strong style={{ color: "var(--color-accent-700)" }}>In short:</strong> TutorA is an online tutoring
              marketplace that personally matches students, parents booking for their kids, and adult learners with
              a vetted tutor or reviewed course — never an open, unverified listing. Every tutor passes ID
              verification, a background check, and a live video interview before being matched.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <div className="mt-9 sm:mt-11">
        <StatsMarquee />
      </div>

       {/* How it works */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
        <div
          className="pointer-events-none absolute -top-16 right-[8%] w-[360px] h-[360px] rounded-full blur-3xl opacity-25"
          style={{ background: "var(--color-accent-2-200)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-[4%] w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-accent-200)" }}
          aria-hidden
        />
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,84px)]">
          <Reveal>
            <div>
              <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
                How it works
              </Tag>
              <h2 className="text-[clamp(28px,3.6vw,40px)] mt-4 mb-1.5 max-w-[20ch]">
                We stand in the middle — on purpose.
              </h2>
              <p
                className="text-[16px] max-w-[50ch] mb-10"
                style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
              >
                Our team is the only bridge between the two sides. That is the trust, not a limitation.
              </p>
            </div>
          </Reveal>

          <HowItWorksSteps steps={steps} />

          <Reveal delay={200}>
            <div
              className="card elev-sm mt-9 gap-3 border"
              style={{ background: "var(--color-bg)", borderColor: "var(--color-divider)" }}
            >
              <VerificationPipeline items={pipeline} requestId="R-1042" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <WhoItsFor />

      {/* Course categories */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 left-[6%] w-[320px] h-[320px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-accent-200)"  }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-[8%] w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-accent-2-200)" }}
          aria-hidden
        />
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,84px)]">
          <Reveal>
            <div className="flex justify-between items-end flex-wrap gap-5 mb-9">
              <div>
                <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
                  Explore courses
                </Tag>
                <h2 className="text-[clamp(28px,3.6vw,40px)] mt-4 mb-1.5 max-w-[24ch]">
                  Every subject, one holistic view.
                </h2>
                <p
                  className="text-[16px] max-w-[52ch]"
                  style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
                >
                  From code to canvas to scales — browse our full course catalog by category.
                </p>
              </div>
              <Link href="/courses" className="btn btn-ghost group">
                Browse all courses
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <CourseCategoriesShowcase
            categories={categoryCounts}
            total={allCourses.length}
          />
        </div>
      </section>

     

      {/* Featured tutors */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 right-0 w-[420px] h-[320px] rounded-full blur-3xl opacity-25"
          style={{ background: "var(--color-accent-2-200)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-40 left-0 w-[280px] h-[280px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-accent-200)" }}
          aria-hidden
        />
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,84px)]">
          <div className="flex justify-between items-end flex-wrap gap-5 mb-7">
            <Reveal>
              <div>
                <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
                  Freshly vetted
                </Tag>
                <h2 className="text-[clamp(28px,3.4vw,38px)] mt-4">Verified and ready to teach</h2>
                <div
                  className="text-[12.5px] mt-1.5"
                  style={{ color: "color-mix(in srgb, var(--color-text) 67%, transparent)" }}
                >
                  Rates shown in each tutor&apos;s local currency.
                </div>
              </div>
            </Reveal>

            <div className="flex items-center gap-4">
              <FeaturedTutorsIllustration tutors={featured} />
              <Link href="/find-a-tutor" className="btn btn-ghost group">
                Browse all tutors
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
          <FeaturedTutors tutors={featured} />
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,84px)]">
          <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
            What people say
          </Tag>
          <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-9">Trusted by both sides</h2>
          <TestimonialsSection testimonials={testimonials} />
        </div>
      </section>

      {/* Subjects */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,80px)]">
        <div className="flex justify-between items-end flex-wrap gap-3 mb-5.5">
          <div>
            <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
              In demand
            </Tag>
            <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4">Popular subjects</h2>
          </div>
          <Link href="/find-a-tutor" className="btn btn-ghost">
            Browse all tutors →
          </Link>
        </div>
        <PopularSubjects subjects={popularSubjects} />
      </section>

      {/* FAQ */}
      <HomepageFaq />

      {/* CTA */}
      <FinalCta />
    </div>
  );
}
