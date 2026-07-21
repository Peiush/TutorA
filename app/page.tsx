import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { TutorStrip } from "@/components/home/tutor-strip";
import { HeroIllustration } from "@/components/home/hero-illustration";
import { HeroContent } from "@/components/home/hero-content";
import { StatsMarquee } from "@/components/home/stats-marquee";
import { FeaturedTutors } from "@/components/home/featured-tutors";
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
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {steps.map((st, i) => (
              <Reveal key={st.title} delay={i * 100}>
                <div
                  className="rounded-[var(--radius-lg)] p-7 relative h-full"
                  style={{ background: st.bg }}
                >
                  <div
                    className="w-11 h-11 rounded-full grid place-content-center font-[var(--font-heading)] text-[20px]"
                    style={{ background: st.dot, color: "var(--color-bg)" }}
                  >
                    {st.n}
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
            ))}
          </div>

          <Reveal delay={200} className="card elev-sm mt-9 gap-3" style={{ background: "var(--color-bg)" }}>
            <div
              className="text-[12px] uppercase"
              style={{ letterSpacing: "0.04em", color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}
            >
              Live verification pipeline · Request #R-1042
            </div>
            <StaggerReveal className="flex items-center gap-0 mt-1.5 flex-wrap" stagger={0.14} y={0}>
              {pipeline.map((p, i) => (
                <div key={p.label} className="flex items-center">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-[30px] h-[30px] rounded-full grid place-content-center flex-none relative"
                      style={{ background: p.dot, color: p.dotText }}
                    >
                      {p.pulse && (
                        <span
                          className="absolute -inset-1 rounded-full opacity-50"
                          style={{ border: "2px solid var(--color-verified)" }}
                        />
                      )}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-[var(--font-heading)] font-semibold text-[14.5px]">{p.label}</div>
                      <div className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                        {p.time}
                      </div>
                    </div>
                  </div>
                  {p.hasNext && (
                    <div
                      className="w-[clamp(24px,4vw,56px)] h-0.5 mx-3"
                      style={{ background: "var(--color-divider)" }}
                    />
                  )}
                </div>
              ))}
            </StaggerReveal>
          </Reveal>
        </div>
      </section>

      {/* Featured tutors */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
        <div className="flex justify-between items-end flex-wrap gap-3 mb-7">
          <div>
            <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
              Top-rated tutors
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
          <StaggerReveal className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {testimonials.map((q, i) => (
              <figure
                key={q.name}
                className="card m-0 gap-4 justify-between"
                style={{ background: "var(--color-bg)" }}
              >
                <p className="font-[var(--font-heading)] text-[18px] leading-[1.4] m-0">
                  <span style={{ color: "var(--color-accent-2-300)" }}>“</span>
                  {q.quote}
                  <span style={{ color: "var(--color-accent-2-300)" }}>”</span>
                </p>
                <figcaption className="flex items-center gap-2.5">
                  <TutorAvatar name={q.name} index={i} size={36} />
                  <div className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
                    {q.name} · {q.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </StaggerReveal>
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
        <StaggerReveal className="flex flex-wrap gap-2.5" stagger={0.03} y={12}>
          {subjects.map((s) => (
            <Link key={s} href="/find-a-tutor" className="tag tag-outline text-[16px] px-5 py-2.5">
              {s}
            </Link>
          ))}
        </StaggerReveal>
      </section>

      {/* CTA */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(48px,6vw,80px)]">
        <Reveal
          className="rounded-[20px] p-[clamp(32px,5vw,56px)]"
          style={{ background: "var(--color-accent-2-100)" }}
        >
          <h2 className="text-[clamp(26px,3.4vw,38px)] max-w-[18ch]">
            Tell us what you need. We&rsquo;ll find who fits.
          </h2>
          <p
            className="text-[16px] max-w-[48ch] mt-4"
            style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)" }}
          >
            Our team reviews every request and matches you personally, usually within 24–48 hours.
          </p>
          <div className="flex gap-3 flex-wrap mt-7">
            <Link href="/request-a-tutor" className="btn btn-primary">
              Request a Tutor
            </Link>
            <Link href="/find-a-tutor" className="btn btn-secondary">
              Browse first
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
