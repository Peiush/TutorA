"use client";

import { useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "@/components/ui/tag";
import { CheckBadge } from "@/components/ui/verified-badge";
import { MailIcon, UserIcon, ChatDotsIcon } from "@/components/auth/auth-icons";
import { scrollRevealSafetyNet, isGsapHidden } from "@/lib/scroll-reveal-safety-net";
import { submitContactMessage } from "@/app/lib/actions/contact";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContactCta() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reveal = root.querySelectorAll(".cc-reveal");
      const fields = root.querySelectorAll(".cc-field");
      const plane = root.querySelector(".cc-plane");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(reveal, { autoAlpha: 0, y: 22 });
        gsap.set(fields, { autoAlpha: 0, y: 14 });
        gsap.set(plane, { autoAlpha: 0, scale: 0.5, rotate: -22 });

        gsap
          .timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } })
          .to(reveal, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" })
          .to(fields, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }, 0.25)
          .to(plane, { autoAlpha: 1, scale: 1, rotate: -8, duration: 0.6, ease: "back.out(2.2)" }, 0.5);

        const float = gsap.to(plane, { y: -8, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });

        const safetyCleanup = scrollRevealSafetyNet(
          root,
          () => isGsapHidden(reveal[0]),
          () => {
            gsap.set([reveal, fields], { autoAlpha: 1, y: 0 });
            gsap.set(plane, { autoAlpha: 1, scale: 1, rotate: -8 });
          }
        );

        return () => {
          float.kill();
          safetyCleanup();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([reveal, fields], { autoAlpha: 1, y: 0 });
        gsap.set(plane, { autoAlpha: 1, scale: 1, rotate: -8 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const result = await submitContactMessage({ name, email, message });
    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      setError(result.message ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(48px,6vw,84px)]">
      <div
        ref={rootRef}
        className="relative overflow-hidden rounded-[24px] p-[clamp(28px,4vw,48px)] grid gap-10 grid-cols-1 lg:[grid-template-columns:1.1fr_1fr]"
        style={{ background: "var(--color-accent-2-900)", color: "#fff" }}
      >
        <div
          className="pointer-events-none absolute -top-24 -left-20 w-[380px] h-[380px] rounded-full blur-3xl opacity-25"
          style={{ background: "var(--color-accent-2-500)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-28 right-[22%] w-[300px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: "var(--color-accent-400)" }}
          aria-hidden
        />

        <div className="relative flex flex-col justify-between gap-8">
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <Tag variant="accent" className="cc-reveal text-[12px] px-3.5 py-1.5">
                Get in touch
              </Tag>

              {/* floating reply-time illustration */}
              <div
                className="cc-plane hidden md:flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 flex-none"
                style={{
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.16)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl grid place-content-center flex-none"
                  style={{ background: "linear-gradient(135deg, var(--color-accent-500), var(--color-accent-300))" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-2-900)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m3 11 18-8-8 18-2.2-7.8L3 11Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[12px] font-semibold leading-tight">Avg. reply time</div>
                  <div className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,.7)" }}>
                    Under 24 hours
                  </div>
                </div>
              </div>
            </div>

            <h2 className="cc-reveal text-[clamp(26px,3.4vw,36px)] mt-4 max-w-[16ch]" style={{ color: "#fff" }}>
              Have a question we haven&rsquo;t answered?
            </h2>
            <p
              className="cc-reveal text-[15.5px] leading-[1.6] mt-4 max-w-[42ch]"
              style={{ color: "color-mix(in srgb, #fff 74%, transparent)" }}
            >
              Send us a note and our team will get back to you personally — usually within one
              business day.
            </p>
          </div>

          <div className="cc-reveal group flex items-center gap-3 cursor-default w-fit">
            <span className="transition-transform duration-300 group-hover:scale-110">
              <CheckBadge size={34} />
            </span>
            <span className="text-[13.5px]" style={{ color: "color-mix(in srgb, #fff 80%, transparent)" }}>
              Every message is read by a real person on our team.
            </span>
          </div>
        </div>

        <div
          className="relative rounded-[var(--radius-lg)] p-[clamp(20px,3vw,28px)] overflow-hidden"
          style={{ background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", color: "var(--color-text)" }}
        >
          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center text-center gap-3 py-12">
              <div
                className="w-14 h-14 rounded-full grid place-content-center"
                style={{ background: "var(--color-verified)", boxShadow: "0 0 0 8px color-mix(in srgb, var(--color-verified) 16%, transparent)" }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-[19px] m-0" style={{ color: "var(--color-text)" }}>
                Message sent
              </h3>
              <p className="text-[14px] m-0 max-w-[32ch]" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                Thanks for reaching out — our team will get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="cc-field field">
                  <label>Name</label>
                  <div className="field-icon">
                    <UserIcon />
                    <input
                      className="input"
                      placeholder="Your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="cc-field field">
                  <label>Email</label>
                  <div className="field-icon">
                    <MailIcon />
                    <input
                      className="input"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="cc-field field">
                <label>Message</label>
                <div className="field-icon">
                  <ChatDotsIcon />
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="How can we help?"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              {error ? (
                <p className="cc-field text-[13px] m-0" style={{ color: "var(--color-danger, #dc2626)" }}>
                  {error}
                </p>
              ) : null}
              <button type="submit" className="cc-field btn btn-primary justify-self-start" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
