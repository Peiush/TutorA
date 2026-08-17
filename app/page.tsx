import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { HeroAmbient } from "@/components/home/hero-ambient";
import { HeroPortraitTiles } from "@/components/home/hero-portrait-tiles";
import { HeroMobileIllustration } from "@/components/home/hero-mobile-illustration";
import { HeroMobileFx } from "@/components/home/hero-mobile-fx";
import { HeroHeading, HeroCopy, HeroSecondaryLink } from "@/components/home/hero-content";
import { HeroSearchBar } from "@/components/home/hero-search-bar";
import type { CategoryCount } from "@/components/home/course-categories-showcase";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getSubjects } from "@/app/lib/subject-listings";
import { getHomepageTestimonials } from "@/app/lib/testimonials";
import { AddTestimonialButton } from "@/components/testimonials/testimonial-launcher";
import type { Testimonial as TestimonialCard } from "@/components/home/testimonials-section";
import { courseCategories } from "@/lib/mock-courses";
import { GRADE_BANDS, matchesGradeBand } from "@/lib/grade-bands";
import { POPULAR_SUBJECT_NAMES } from "@/lib/featured-subjects";
import {
  tutorsRaw,
  steps,
  testimonials,
  popularSubjects,
} from "@/lib/mock-data";
import { homepageFaqs } from "@/components/home/homepage-faq";

// Below-the-fold sections: split into separate chunks so their GSAP-driven JS isn't
// part of the critical bundle blocking first paint. Content still renders via SSR (ssr: true).
const CourseCategoriesShowcase = dynamic(() =>
  import("@/components/home/course-categories-showcase").then((mod) => mod.CourseCategoriesShowcase)
);
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
const ContactCta = dynamic(() => import("@/components/about/contact-cta").then((mod) => mod.ContactCta));
const HomepageFaq = dynamic(() =>
  import("@/components/home/homepage-faq").then((mod) => mod.HomepageFaq)
);

const BASE_URL = "https://www.tutora.it.com";

export const metadata: Metadata = {
  description:
    "Live 1-on-1 and small group classes for Grades 6–12, SAT, Coding & more. Learn from experienced, personally verified Indian teachers — wherever you are in the world.",
  alternates: { canonical: "/" },
};

// Bump this when homepage copy changes materially — it's a real freshness signal for
// search/AI crawlers, not a build timestamp, so it shouldn't move on every deploy.
// Exported for reuse as the sitemap's lastmod for "/" (app/sitemap.ts) — one true value
// instead of two dates that can drift apart.
export const HOMEPAGE_LAST_UPDATED = "2026-08-11";

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "TutorA — Personalized Online Learning with Expert Indian Teachers",
  description:
    "Live 1-on-1 and small group classes for Grades 6–12, SAT, Coding & more. Learn from experienced Indian teachers, personally verified by our team — wherever you are in the world.",
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
  const [approvedTutors, allCourses, subjectListings, realTestimonials] = await Promise.all([
    getApprovedTutorListings(),
    getPublishedCourses(),
    getSubjects(),
    getHomepageTestimonials(),
  ]);

  const ROLE_LABEL = { PARENT: "Parent", STUDENT: "Student", TUTOR: "Tutor" } as const;
  const homepageTestimonials: TestimonialCard[] = [
    ...realTestimonials.map((t) => ({
      quote: t.quote,
      name: t.name,
      role: ROLE_LABEL[t.role],
      rating: t.rating,
    })),
    ...(testimonials.slice(0, Math.max(0, 6 - realTestimonials.length)) as TestimonialCard[]),
  ];

  const categoryCounts: CategoryCount[] = courseCategories.map((label) => ({
    label,
    count: allCourses.filter((c) => c.category === label).length,
  }));
  const gradeBandCounts = Object.fromEntries(
    GRADE_BANDS.map((band) => [band.key, subjectListings.filter((s) => matchesGradeBand(s.gradeLevel, band)).length])
  ) as Record<(typeof GRADE_BANDS)[number]["key"], number>;
  const allTutors = [...approvedTutors, ...tutorsRaw];

  // The homepage's "Featured tutors" showcase pulls 6 tutors teaching popular subjects
  // (deduped by identity) instead of just the first 3 in listing order — that previously
  // surfaced the same duplicate-named seed tutor 3x whenever a handful of approved
  // profiles shared a name.
  const popularNamesLower = POPULAR_SUBJECT_NAMES.map((s) => s.toLowerCase());
  const seenTutorKeys = new Set<string>();
  const featured: typeof allTutors = [];
  for (const t of allTutors) {
    const key = t.id ?? t.listingId ?? t.name;
    if (seenTutorKeys.has(key)) continue;
    const matchesPopular = t.subjects.some((s) =>
      popularNamesLower.some((p) => s.toLowerCase().includes(p) || p.includes(s.toLowerCase()))
    );
    if (!matchesPopular) continue;
    seenTutorKeys.add(key);
    featured.push(t);
    if (featured.length === 6) break;
  }
  if (featured.length < 6) {
    for (const t of allTutors) {
      const key = t.id ?? t.listingId ?? t.name;
      if (seenTutorKeys.has(key)) continue;
      seenTutorKeys.add(key);
      featured.push(t);
      if (featured.length === 6) break;
    }
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howItWorksJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-x-clip">
        <HeroAmbient />
        <HeroPortraitTiles />
        <HeroMobileIllustration />

        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(48px,6vw,68px)] pb-[clamp(44px,5vw,56px)] relative z-[1]">
          <div className="max-w-[880px] mx-auto">
            <HeroMobileFx>
              <HeroHeading />
              <HeroCopy />
              <HeroSecondaryLink />
            </HeroMobileFx>
            <HeroSearchBar tutors={allTutors} courses={allCourses} subjectListings={subjectListings} />
          </div>
        </div>
      </section>

      {/* Course categories — the primary browse/conversion path, so it sits right after
          the hero rather than several scrolls down, with a bolder, more saturated
          ambient treatment than the rest of the page to make it the visual anchor. */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 left-[6%] w-[380px] h-[380px] rounded-full blur-3xl opacity-35"
          style={{ background: "var(--color-accent-300)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-[8%] w-[340px] h-[340px] rounded-full blur-3xl opacity-30"
          style={{ background: "var(--color-accent-2-300)" }}
          aria-hidden
        />
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(28px,4vw,48px)] pb-[clamp(32px,6vw,84px)]">
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
              <Link
                href="/courses"
                className="group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-bold transition-transform hover:-translate-y-0.5"
                style={{
                  color: "var(--color-accent-800)",
                  background: "var(--color-accent-100)",
                  boxShadow: "0 1px 2px color-mix(in srgb, var(--color-accent-600) 25%, transparent)",
                }}
              >
                Browse all courses
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <CourseCategoriesShowcase
            categories={categoryCounts}
            gradeBandCounts={gradeBandCounts}
          />
        </div>
      </section>

      {/* Featured tutors — the other half of the homepage's primary browse path
          (courses, then who'll teach you), so it follows Course categories
          immediately rather than being buried after How it works/Stats/Who it's for. */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 right-0 w-[460px] h-[360px] rounded-full blur-3xl opacity-35"
          style={{ background: "var(--color-accent-2-300)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-48 left-0 w-[320px] h-[320px] rounded-full blur-3xl opacity-30"
          style={{ background: "#0D948833" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-[30%] w-[280px] h-[280px] rounded-full blur-3xl opacity-25"
          style={{ background: "#E2497A26" }}
          aria-hidden
        />
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,84px)]">
          <div className="flex justify-between items-end flex-wrap gap-4 sm:gap-5 mb-5 sm:mb-7">
            <Reveal>
              <div>
                <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
                  Freshly vetted
                </Tag>
                <h2 className="text-[clamp(24px,3.4vw,38px)] mt-3 sm:mt-4">Verified and ready to teach</h2>
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
              <Link
                href="/find-a-tutor"
                className="group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-bold transition-transform hover:-translate-y-0.5"
                style={{
                  color: "var(--color-accent-800)",
                  background: "var(--color-accent-100)",
                  boxShadow: "0 1px 2px color-mix(in srgb, var(--color-accent-600) 25%, transparent)",
                }}
              >
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

      {/* Popular subjects — sits right after Featured tutors so the "browse a subject"
          exit ramp is available immediately, with the same vivid ambient treatment. */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-16 right-[10%] w-[340px] h-[340px] rounded-full blur-3xl opacity-30"
          style={{ background: "#5B5FE033" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-[4%] w-[300px] h-[300px] rounded-full blur-3xl opacity-25"
          style={{ background: "#D2540E29" }}
          aria-hidden
        />
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,80px)]">
          <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
            <div>
              <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
                In demand
              </Tag>
              <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4">Popular subjects</h2>
            </div>
            <Link
              href="/find-a-tutor"
              className="group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-bold transition-transform hover:-translate-y-0.5"
              style={{
                color: "var(--color-accent-800)",
                background: "var(--color-accent-100)",
                boxShadow: "0 1px 2px color-mix(in srgb, var(--color-accent-600) 25%, transparent)",
              }}
            >
              Browse all tutors
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </div>
          <PopularSubjects subjects={popularSubjects} />
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,84px)]">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-9">
            <div>
              <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
                What people say
              </Tag>
              <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-0">Trusted by both sides</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <AddTestimonialButton />
            </div>
          </div>
          <TestimonialsSection testimonials={homepageTestimonials} />
        </div>
      </section>

      {/* FAQ */}
      <HomepageFaq />

      {/* CTA */}
      <ContactCta />
    </div>
  );
}
