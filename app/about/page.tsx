import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { CheckBadge } from "@/components/ui/verified-badge";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { studentFlow, tutorFlow, faqs, testimonials } from "@/lib/mock-data";
import { AboutIllustration } from "@/components/about/about-illustration";

export const metadata = {
  title: "About & How It Works — TutorConnect",
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

export default function AboutPage() {
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
              top: "-140px",
              right: "-120px",
              width: 480,
              height: 480,
              background: "radial-gradient(circle at 32% 32%, var(--color-accent-200), transparent 72%)",
              opacity: 0.55,
              filter: "blur(6px)",
            }}
          />
          <div
            className="hidden lg:block absolute rounded-full"
            style={{
              top: "160px",
              right: "40px",
              width: 300,
              height: 300,
              background: "radial-gradient(circle at 60% 40%, var(--color-accent-2-200), transparent 70%)",
              opacity: 0.45,
              filter: "blur(10px)",
            }}
          />
        </div>

        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(52px,7vw,96px)] pb-[clamp(40px,5vw,64px)] relative z-[1]">
          <div className="max-w-[680px]">
            <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5 animate-hero-up">
              About &amp; How It Works
            </Tag>
            <h1
              className="font-bold text-[clamp(34px,4.6vw,54px)] mt-4 max-w-[18ch] animate-hero-up"
              style={{ animationDelay: "0.05s" }}
            >
              A tutoring platform built on{" "}
              <span 
                style={{
                  fontFamily: "var(--font-accent)",
                  fontWeight: 600,
                  color: "var(--color-accent-700)",
                  fontSize: "1.1em",
                  transform: "rotate(-2deg)",
                  display: "inline-block",
                }}
              >
                trust
              </span>
              , not a lead list.
            </h1>
            <p
              className="text-[17px] leading-[1.62] mt-6 max-w-[56ch] animate-hero-up"
              style={{ color: "color-mix(in srgb, var(--color-text) 76%, transparent)", animationDelay: "0.1s" }}
            >
              We started TutorConnect because good tutoring is a relationship, and relationships
              deserve a careful introduction. Every student request and every tutor listing passes
              through our team before anyone connects.
            </p>
            <div className="flex gap-3 flex-wrap mt-8 animate-hero-up" style={{ animationDelay: "0.15s" }}>
              <Link href="/find-a-tutor" className="btn btn-primary">
                Find a Tutor
              </Link>
              <Link href="/become-a-tutor" className="btn btn-secondary">
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
        <AboutIllustration />
      </section>

      {/* Trust pillars */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(8px,2vw,16px)] pb-[clamp(48px,6vw,84px)]">
        <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
          Why it works
        </Tag>
        <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-10 max-w-[24ch]">
          The trust is the product.
        </h2>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="card elev-sm gap-4 h-full">
                <div
                  className="w-11 h-11 rounded-full grid place-content-center flex-none"
                  style={{ background: "var(--color-accent-2-100)" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent-2-700)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {p.icon}
                  </svg>
                </div>
                <h3 className="text-[19px] m-0">{p.title}</h3>
                <p
                  className="text-[14.5px] leading-[1.55] m-0"
                  style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Flows */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
          <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
            Step by step
          </Tag>
          <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-10 max-w-[24ch]">
            Two sides, one careful process.
          </h2>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
            <Reveal>
              <div className="rounded-[var(--radius-lg)] p-7 h-full" style={{ background: "var(--color-accent-100)" }}>
                <h3 className="text-[21px] mb-5">For students</h3>
                <div className="grid gap-4">
                  {studentFlow.map((f) => (
                    <div key={f.n} className="flex gap-3.5">
                      <span
                        className="font-[var(--font-heading)] font-semibold text-[14px] w-7 h-7 rounded-full grid place-content-center flex-none"
                        style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}
                      >
                        {f.n.replace(".", "")}
                      </span>
                      <span className="text-[15px] leading-[1.55] pt-0.5">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-[var(--radius-lg)] p-7 h-full" style={{ background: "var(--color-accent-2-200)" }}>
                <h3 className="text-[21px] mb-5">For tutors</h3>
                <div className="grid gap-4">
                  {tutorFlow.map((f) => (
                    <div key={f.n} className="flex gap-3.5">
                      <span
                        className="font-[var(--font-heading)] font-semibold text-[14px] w-7 h-7 rounded-full grid place-content-center flex-none"
                        style={{ background: "var(--color-accent-2-700)", color: "#fff" }}
                      >
                        {f.n.replace(".", "")}
                      </span>
                      <span className="text-[15px] leading-[1.55] pt-0.5">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
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
                TutorConnect charges a percentage-based success fee once a match is confirmed —
                nothing before. There are no listing fees for tutors and no charge to browse or
                request. Our incentive is simple: a good match that lasts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card elev-md gap-0 p-0 overflow-hidden">
              {[
                { label: "Browse tutors", value: "Free" },
                { label: "Submit a request", value: "Free" },
                { label: "List as a tutor", value: "Free" },
                { label: "Confirmed match", value: "Success fee" },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-6 py-4"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px solid var(--color-divider)" : "none",
                    background: i === arr.length - 1 ? "var(--color-accent-2-100)" : "transparent",
                  }}
                >
                  <span className="text-[15px] font-medium">{row.label}</span>
                  <span
                    className="font-[var(--font-heading)] font-semibold text-[14px]"
                    style={{ color: i === arr.length - 1 ? "var(--color-accent-2-700)" : "var(--color-verified)" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
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
          <div className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {testimonials.map((q, i) => (
              <Reveal key={q.name} delay={i * 80}>
                <figure className="card m-0 gap-4 justify-between h-full" style={{ background: "var(--color-bg)" }}>
                  <p className="font-[var(--font-heading)] text-[18px] leading-[1.4] m-0">
                    <span style={{ color: "var(--color-accent-2-300)" }}>&ldquo;</span>
                    {q.quote}
                    <span style={{ color: "var(--color-accent-2-300)" }}>&rdquo;</span>
                  </p>
                  <figcaption className="flex items-center gap-2.5">
                    <TutorAvatar name={q.name} index={i} size={36} />
                    <div className="text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}>
                      {q.name} · {q.role}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[820px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,84px)]">
        <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
          Frequently asked
        </Tag>
        <h2 className="text-[clamp(26px,3.2vw,36px)] mt-4 mb-9">Still curious?</h2>
        <FaqAccordion faqs={faqs} />
      </section>

      {/* Contact CTA */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(48px,6vw,84px)]">
        <Reveal>
          <div
            className="rounded-[24px] p-[clamp(28px,4vw,48px)] grid gap-10 grid-cols-1 lg:[grid-template-columns:1.1fr_1fr]"
            style={{ background: "var(--color-accent-2-900)", color: "#fff" }}
          >
            <div className="flex flex-col justify-between gap-8">
              <div>
                <Tag variant="accent" className="text-[12px] px-3.5 py-1.5">
                  Get in touch
                </Tag>
                <h2 className="text-[clamp(26px,3.4vw,36px)] mt-4 max-w-[16ch]" style={{ color: "#fff" }}>
                  Have a question we haven&rsquo;t answered?
                </h2>
                <p
                  className="text-[15.5px] leading-[1.6] mt-4 max-w-[42ch]"
                  style={{ color: "color-mix(in srgb, #fff 74%, transparent)" }}
                >
                  Send us a note and our team will get back to you personally — usually within one
                  business day.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckBadge size={34} />
                <span className="text-[13.5px]" style={{ color: "color-mix(in srgb, #fff 80%, transparent)" }}>
                  Every message is read by a real person on our team.
                </span>
              </div>
            </div>

            <form className="card elev-lg gap-4 p-[clamp(20px,3vw,28px)]" style={{ background: "var(--color-bg)" }}>
              <div className="grid grid-cols-2 gap-3">
                <div className="field">
                  <label>Name</label>
                  <input className="input" placeholder="Your name" required />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input className="input" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="field">
                <label>Message</label>
                <textarea className="input" rows={4} placeholder="How can we help?" />
              </div>
              <button type="submit" className="btn btn-primary justify-self-start">
                Send message
              </button>
            </form>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
