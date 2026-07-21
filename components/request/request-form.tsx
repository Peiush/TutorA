"use client";

import { useRef, useState, useTransition } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SegmentedControl } from "@/components/ui/segmented";
import { submitTutorRequest } from "@/app/lib/actions/tutor-request";

gsap.registerPlugin(useGSAP);

const STEP_LABELS = ["Subject", "Schedule", "Budget", "Notes", "Contact"];
const TOTAL_STEPS = STEP_LABELS.length;

const STEP_ICON_PATHS: Record<number, string> = {
  1: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z",
  2: "M8 2v4 M16 2v4 M3.5 9h17 M4 4.5h16A1.5 1.5 0 0 1 21.5 6v14a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 20V6A1.5 1.5 0 0 1 4 4.5Z",
  3: "M12 2v20 M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.4-5 3.4 2.2 3.1 5 3.6 5 1.6 5 3.6-2.2 3.4-5 3.4-5-1.6-5-3.5",
  4: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z M14 2v6h6 M9 13h6 M9 17h6",
  5: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z",
};

function StepHeading({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="step-icon w-8 h-8 rounded-full grid place-content-center flex-none"
        style={{ background: "var(--color-accent-100)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={STEP_ICON_PATHS[step]} />
        </svg>
      </div>
      <div className="font-[var(--font-heading)] text-[20px]">{children}</div>
    </div>
  );
}

function SuccessScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const circlePathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = circlePathRef.current;
        const length = path?.getTotalLength() ?? 0;
        if (path) {
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".success-badge", { scale: 0, rotation: -20, duration: 0.5, ease: "back.out(2)" });
        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "-=0.15");
        }
        tl.from(".success-heading", { autoAlpha: 0, y: 10, duration: 0.35 }, "-=0.1").from(
          ".success-copy",
          { autoAlpha: 0, y: 10, duration: 0.35 },
          "-=0.2"
        );
        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="card gap-4 p-[var(--space-6)] text-center"
      style={{ background: "var(--color-surface)" }}
    >
      <div
        className="success-badge w-14 h-14 rounded-full grid place-content-center mx-auto"
        style={{ background: "color-mix(in srgb, var(--color-verified) 18%, transparent)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-verified)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path ref={circlePathRef} d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 className="success-heading font-[var(--font-heading)] text-[24px]">Request received</h2>
      <p
        className="success-copy text-[15px] leading-[1.6] max-w-[46ch] mx-auto"
        style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
      >
        Our team will review your request and personally match you with the right tutor within
        24–48 hours. We&rsquo;ve sent a confirmation to your email.
      </p>
    </div>
  );
}

export function RequestForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("Secondary / GCSE");
  const [goals, setGoals] = useState("");
  const [mode, setMode] = useState("Online");
  const [sessionsPerWeek, setSessionsPerWeek] = useState("1");
  const [timezone, setTimezone] = useState("GMT (London)");
  const [budget, setBudget] = useState(45);
  const [currency, setCurrency] = useState("USD");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const cardRef = useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();
        tl.fromTo(
          el,
          { autoAlpha: 0, x: 16 },
          { autoAlpha: 1, x: 0, duration: 0.35, ease: "power2.out" }
        ).fromTo(
          el.querySelectorAll(".field"),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
          "-=0.2"
        );

        const icon = el.querySelector(".step-icon");
        if (icon) {
          gsap.fromTo(icon, { scale: 0.6, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2.5)" });
        }

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { dependencies: [step], scope: cardRef }
  );

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <>
      <div
        className="text-[12px] font-medium sm:hidden mb-2"
        style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
      >
        Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step - 1]}
      </div>
      <div className="hidden sm:flex gap-2 mb-8">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const active = n <= step;
          const done = n < step;
          return (
            <div key={label} className="flex-1">
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "var(--color-neutral-300)" }}
              >
                <div
                  className="h-full rounded-full transition-transform duration-300 ease-out origin-left"
                  style={{
                    background: "var(--color-accent)",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </div>
              <div
                className="flex items-center gap-1.5 text-[11px] uppercase mt-2"
                style={{
                  letterSpacing: "0.03em",
                  color: n === step ? "var(--color-accent-700)" : "color-mix(in srgb, var(--color-text) 55%, transparent)",
                }}
              >
                {done && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
                {label}
              </div>
            </div>
          );
        })}
      </div>
      <div className="sm:hidden h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: "var(--color-neutral-300)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-out"
          style={{ background: "var(--color-accent)", width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <form
        ref={cardRef}
        className="card gap-4 p-[var(--space-6)]"
        style={{ background: "var(--color-surface)" }}
        onSubmit={(e) => {
          e.preventDefault();
          if (step !== TOTAL_STEPS) {
            next();
            return;
          }
          setError(null);
          startTransition(async () => {
            const result = await submitTutorRequest({
              name,
              email,
              phone,
              subject,
              level,
              goals,
              mode,
              sessionsPerWeek,
              timezone,
              currency,
              budgetPerHour: budget,
              notes,
            });
            if (result.ok) {
              setSubmitted(true);
            } else {
              setError(result.message ?? "Something went wrong. Please try again.");
            }
          });
        }}
      >
        {step === 1 && (
          <div className="grid gap-4">
            <StepHeading step={1}>Subject &amp; level</StepHeading>
            <div className="field">
              <label>Subject</label>
              <input
                className="input"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
              />
            </div>
            <div className="field">
              <label>Level</label>
              <select className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>Secondary / GCSE</option>
                <option>A-Level / IB</option>
                <option>University</option>
                <option>Adult / professional</option>
              </select>
            </div>
            <div className="field">
              <label>What are the goals?</label>
              <textarea
                className="input"
                placeholder="e.g. Rebuild confidence before May exams, focus on mechanics"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <StepHeading step={2}>Schedule &amp; mode</StepHeading>
            <div className="field">
              <label>Mode</label>
              <SegmentedControl
                name="rmode"
                value={mode}
                onChange={setMode}
                options={[
                  { label: "Online", value: "Online" },
                  { label: "In person", value: "In person" },
                  { label: "Either", value: "Either" },
                ]}
              />
            </div>
            <div className="field">
              <label>Sessions per week</label>
              <select className="input" value={sessionsPerWeek} onChange={(e) => setSessionsPerWeek(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </div>
            <div className="field">
              <label>Time zone</label>
              <select className="input" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option>GMT (London)</option>
                <option>EST (New York)</option>
                <option>CET (Berlin)</option>
                <option>JST (Tokyo)</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <StepHeading step={3}>Budget</StepHeading>
            <div className="field">
              <label>Currency</label>
              <select className="input w-auto" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option>USD</option>
                <option>GBP</option>
                <option>EUR</option>
              </select>
            </div>
            <div className="field">
              <label>Budget per hour</label>
              <input
                className="input p-0"
                type="range"
                min={10}
                max={120}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
              <div
                className="text-[13px] mt-1.5"
                style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}
              >
                Around {currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}
                {budget} / hour
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4">
            <StepHeading step={4}>Anything else?</StepHeading>
            <div className="field">
              <label>Additional notes</label>
              <textarea
                className="input"
                rows={5}
                placeholder="Preferred teaching style, availability, past tutoring, anything we should know"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-4">
            <StepHeading step={5}>Your contact details</StepHeading>
            <div className="field">
              <label>Full name</label>
              <input
                className="input"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Phone (optional)</label>
              <input className="input" placeholder="+44 …" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <p
              className="text-[13px] m-0"
              style={{ color: "color-mix(in srgb, var(--color-text) 66%, transparent)" }}
            >
              Your details are only ever seen by our team — never shared with a tutor until you
              confirm a match.
            </p>
            {error && (
              <p className="text-[13.5px] m-0" style={{ color: "#d92d20" }}>
                {error}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between gap-3 mt-2">
          <button type="button" className="btn btn-secondary" onClick={back} disabled={step === 1}>
            Back
          </button>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {step === TOTAL_STEPS ? (pending ? "Submitting…" : "Submit request") : "Continue"}
          </button>
        </div>
      </form>
    </>
  );
}
