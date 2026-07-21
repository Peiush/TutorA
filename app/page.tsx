import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TutorStrip } from "@/components/home/tutor-strip";
import { HeroIllustration } from "@/components/home/hero-illustration";
import { HeroContent } from "@/components/home/hero-content";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { FeaturedTutors } from "@/components/home/featured-tutors";
import { RequestIcon, ShieldMatchIcon, HandshakeIcon, FlowArrowIcon } from "@/components/home/step-icons";
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

const STEP_ICONS = [RequestIcon, ShieldMatchIcon, HandshakeIcon];

function StepIcon({ index }: { index: number }) {
  const Icon = STEP_ICONS[index] ?? RequestIcon;
  return <Icon />;
}

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
      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
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
          <div className="flex flex-col lg:flex-row items-stretch gap-5">
            {steps.map((st, i) => (
              <div key={st.title} className="contents lg:flex lg:flex-1 lg:items-center lg:gap-5">
                <Reveal delay={i * 100} className="flex-1 h-full">
                  <div
                    className="rounded-[var(--radius-lg)] p-7 relative h-full"
                    style={{ background: st.bg }}
                  >
                    <div
                      className="w-11 h-11 rounded-full grid place-content-center relative"
                      style={{ background: st.dot, color: "var(--color-bg)" }}
                    >
                      <StepIcon index={i} />
                      <span
                        className="absolute -bottom-1 -right-1 w-[18px] h-[18px] rounded-full grid place-content-center text-[10px] font-bold font-[var(--font-heading)]"
                        style={{
                          background: "var(--color-bg)",
                          color: "var(--color-text)",
                          border: "1.5px solid var(--color-divider)",
                        }}
                      >
                        {st.n}
                      </span>
                    </div>
                    <h3 className="text-[21px] mt-4.5 mb-2">{st.title}</h3>
                    <p
                      className="text-[15px] leading-[1.55] m-0"
                      style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
                    >
                      {st.body}
                    </p>
                  </div>
                </Reveal>
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center flex-none"
                    style={{ color: "var(--color-accent-2-300)" }}
                    aria-hidden
                  >
                    <FlowArrowIcon />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Reveal delay={200} className="card elev-sm mt-9 gap-3" style={{ background: "var(--color-bg)" }}>
            <VerificationPipeline items={pipeline} requestId="R-1042" />
          </Reveal>
        </div>
      </section>

      {/* Featured tutors */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
        <div className="flex justify-between items-end flex-wrap gap-3 mb-7">
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
          <Link href="/find-a-tutor" className="btn btn-ghost">
            Browse all tutors →
          </Link>
        </div>
        <FeaturedTutors tutors={featured} requestedTutorProfileIds={requestedTutorProfileIds} />
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
