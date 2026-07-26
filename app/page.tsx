import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TutorStrip } from "@/components/home/tutor-strip";
import { HeroIllustration } from "@/components/home/hero-illustration";
import { HeroIllustrationMobile } from "@/components/home/hero-illustration-mobile";
import { HeroScrollCue } from "@/components/home/hero-scroll-cue";
import { HeroMobileFx } from "@/components/home/hero-mobile-fx";
import { HeroHeading, HeroCopy } from "@/components/home/hero-content";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { FeaturedTutors } from "@/components/home/featured-tutors";
import { FeaturedTutorsIllustration } from "@/components/home/featured-tutors-illustration";
import { HowItWorksSteps } from "@/components/home/how-it-works-steps";
import { VerificationPipeline } from "@/components/home/verification-pipeline";
import type { CategoryCount } from "@/components/home/course-categories-showcase";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { courseCategories } from "@/lib/mock-courses";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  tutorsRaw,
  steps,
  pipeline,
  testimonials,
  subjects,
} from "@/lib/mock-data";

// Below-the-fold sections: split into separate chunks so their GSAP-driven JS isn't
// part of the critical bundle blocking first paint. Content still renders via SSR (ssr: true).
const CourseCategoriesShowcase = dynamic(() =>
  import("@/components/home/course-categories-showcase").then((mod) => mod.CourseCategoriesShowcase)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/testimonials-section").then((mod) => mod.TestimonialsSection)
);
const PopularSubjects = dynamic(() =>
  import("@/components/home/popular-subjects").then((mod) => mod.PopularSubjects)
);
const FinalCta = dynamic(() => import("@/components/home/final-cta").then((mod) => mod.FinalCta));

export const metadata: Metadata = {
  description:
    "Find a personally verified tutor or course on TutorA. Every student request and tutor listing is reviewed by our team before it's matched.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [approvedTutors, allCourses, session] = await Promise.all([
    getApprovedTutorListings(),
    getPublishedCourses(),
    auth(),
  ]);

  const categoryCounts: CategoryCount[] = courseCategories.map((label) => ({
    label,
    count: allCourses.filter((c) => c.category === label).length,
  }));
  const featured = [...approvedTutors, ...tutorsRaw].slice(0, 3);

  const requestedTutors = session?.user?.id
    ? await prisma.tutorRequest.findMany({
        where: {
          userId: session.user.id,
          status: { in: ["OPEN", "MATCHED"] },
          requestedTutorProfileId: { not: null },
        },
        select: { requestedTutorProfileId: true },
      })
    : [];
  const requestedTutorProfileIds = requestedTutors
    .map((r) => r.requestedTutorProfileId)
    .filter((id): id is string => Boolean(id));

  return (
    <div>
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
            <HeroScrollCue />
          </HeroMobileFx>
        </div>
        <HeroIllustration />
        <TutorStrip />
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
                  Rates shown in each tutor's local currency.
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
          <FeaturedTutors tutors={featured} requestedTutorProfileIds={requestedTutorProfileIds} />
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
        <PopularSubjects subjects={subjects} />
      </section>

      {/* CTA */}
      <FinalCta />
    </div>
  );
}
