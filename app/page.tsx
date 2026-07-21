import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TutorStrip } from "@/components/home/tutor-strip";
import { HeroIllustration } from "@/components/home/hero-illustration";
import { HeroContent } from "@/components/home/hero-content";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { FeaturedTutors } from "@/components/home/featured-tutors";
import { FeaturedTutorsIllustration } from "@/components/home/featured-tutors-illustration";
import { HowItWorksSteps } from "@/components/home/how-it-works-steps";
import { VerificationPipeline } from "@/components/home/verification-pipeline";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PopularSubjects } from "@/components/home/popular-subjects";
import { FinalCta } from "@/components/home/final-cta";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  tutorsRaw,
  steps,
  pipeline,
  testimonials,
  subjects,
} from "@/lib/mock-data";

export default async function Home() {
  const approvedTutors = await getApprovedTutorListings();
  const featured = [...approvedTutors, ...tutorsRaw].slice(0, 3);

  const session = await auth();
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
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(52px,7vw,96px)] pb-[clamp(32px,4vw,48px)] relative z-[1]">
          <HeroContent />
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
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
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
        <div className="relative max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
          <div className="flex justify-between items-end flex-wrap gap-5 mb-7">
            <Reveal>
              <div>
                <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
                  Freshly vetted
                </Tag>
                <h2 className="text-[clamp(28px,3.4vw,38px)] mt-4">Verified and ready to teach</h2>
                <div
                  className="text-[12.5px] mt-1.5"
                  style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
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
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
          <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
            What people say
          </Tag>
          <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-9">Trusted by both sides</h2>
          <TestimonialsSection testimonials={testimonials} />
        </div>
      </section>

      {/* Subjects */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
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
