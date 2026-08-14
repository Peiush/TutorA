"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SegmentedControl } from "@/components/ui/segmented";
import { submitTutorRequest } from "@/app/lib/actions/tutor-request";

gsap.registerPlugin(useGSAP);

const STEP_LABELS = ["Subject", "Schedule", "Budget", "Notes", "Contact"];
const TOTAL_STEPS = STEP_LABELS.length;

// Covers the client's stated priority markets (US, UK, Canada, Singapore, UAE) plus the
// two that were already here (Berlin, Tokyo) and India — the tutors themselves are all
// India-based, so IST is a real, common case, not an edge case. Labels are shown to the
// user; `zones` are the real IANA identifiers matched against the visitor's browser-detected
// timezone so the default isn't a hardcoded "GMT (London)" for every visitor regardless of
// where they are. A visitor whose detected zone matches none of these still falls back to
// the London default rather than showing nothing — expand this list, don't rely on the
// fallback, whenever a new zone turns out to be common (this is how the India gap was found).
const TIMEZONE_OPTIONS: { label: string; zones: string[] }[] = [
  { label: "GMT/BST (London)", zones: ["Europe/London"] },
  { label: "EST/EDT (New York)", zones: ["America/New_York"] },
  { label: "CST/CDT (Chicago)", zones: ["America/Chicago"] },
  { label: "PST/PDT (Los Angeles)", zones: ["America/Los_Angeles"] },
  { label: "EST/EDT (Toronto)", zones: ["America/Toronto"] },
  { label: "IST (India)", zones: ["Asia/Kolkata", "Asia/Calcutta"] },
  { label: "SGT (Singapore)", zones: ["Asia/Singapore"] },
  { label: "GST (Dubai)", zones: ["Asia/Dubai"] },
  { label: "CET/CEST (Berlin)", zones: ["Europe/Berlin"] },
  { label: "JST (Tokyo)", zones: ["Asia/Tokyo"] },
];
const DEFAULT_TIMEZONE_LABEL = TIMEZONE_OPTIONS[0].label;

// A budget-reference currency for the request, not a billing currency — actual matching/
// pricing elsewhere on the site stays USD (see lib/mock-courses.ts priceLabel). Expanded
// from USD/GBP/EUR to also cover the client's stated priority markets (Canada, Singapore, UAE).
const CURRENCY_OPTIONS: { code: string; symbol: string }[] = [
  { code: "USD", symbol: "$" },
  { code: "GBP", symbol: "£" },
  { code: "EUR", symbol: "€" },
  { code: "CAD", symbol: "CA$" },
  { code: "SGD", symbol: "S$" },
  { code: "AED", symbol: "AED " },
];

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
        style={{ background: "var(--request-gold-soft)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--request-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={STEP_ICON_PATHS[step]} />
        </svg>
      </div>
      <div className="request-step-title font-[var(--font-heading)] text-[20px]">{children}</div>
    </div>
  );
}

const SUCCESS_PARTICLES = [
  { color: "var(--color-accent)", size: 8, shape: "circle" },
  { color: "var(--color-accent-2)", size: 6, shape: "square" },
  { color: "var(--color-verified)", size: 7, shape: "circle" },
  { color: "var(--color-accent-300)", size: 9, shape: "square" },
  { color: "var(--color-accent-2-300)", size: 6, shape: "circle" },
  { color: "var(--color-accent)", size: 6, shape: "square" },
  { color: "var(--color-verified)", size: 8, shape: "circle" },
  { color: "var(--color-accent-2)", size: 7, shape: "circle" },
  { color: "var(--color-accent-300)", size: 6, shape: "circle" },
  { color: "var(--color-accent-2-300)", size: 8, shape: "square" },
  { color: "var(--color-accent)", size: 7, shape: "circle" },
  { color: "var(--color-verified)", size: 6, shape: "square" },
];

const SUCCESS_TAGS = ["Personally reviewed", "Matched in 24–48h", "Confirmation sent"];

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

        const particles = gsap.utils.toArray<HTMLElement>(".success-particle");
        gsap.set(particles, { autoAlpha: 0, x: 0, y: 0, scale: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".success-glow", { scale: 0.3, autoAlpha: 0, duration: 0.6, ease: "power2.out" })
          .from(".success-badge", { scale: 0, rotation: -25, duration: 0.55, ease: "back.out(2.4)" }, "-=0.4");

        if (path) {
          tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "-=0.15");
        }

        tl.to(
          particles,
          {
            autoAlpha: 1,
            scale: 1,
            x: () => gsap.utils.random(-95, 95),
            y: () => gsap.utils.random(-85, -15),
            rotation: () => gsap.utils.random(-120, 120),
            duration: 0.65,
            ease: "power3.out",
            stagger: { each: 0.025, from: "center" },
          },
          "-=0.35"
        ).to(
          particles,
          { autoAlpha: 0, y: "+=36", duration: 0.55, ease: "power1.in" },
          "-=0.05"
        );

        tl.from(".success-heading", { autoAlpha: 0, y: 10, duration: 0.35 }, "-=1.05")
          .from(".success-copy", { autoAlpha: 0, y: 10, duration: 0.35 }, "-=0.2")
          .from(
            ".success-tag",
            { autoAlpha: 0, y: 8, scale: 0.9, stagger: 0.08, duration: 0.35, ease: "back.out(2.2)" },
            "-=0.15"
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
      className="request-success-card card gap-4 p-6 sm:p-8 text-center relative overflow-hidden shadow-md"
      style={{ background: "var(--request-ink)" }}
    >
      <div
        className="success-glow absolute rounded-full pointer-events-none"
        style={{
          top: -60,
          left: "50%",
          width: 260,
          height: 260,
          marginLeft: -130,
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative w-14 h-14 mx-auto">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {SUCCESS_PARTICLES.map((p, i) => (
            <span
              key={i}
              className="success-particle absolute top-1/2 left-1/2 block"
              style={{
                width: p.size,
                height: p.size,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                background: p.color,
                borderRadius: p.shape === "circle" ? "50%" : "3px",
                opacity: 0,
              }}
            />
          ))}
        </div>
        <div
          className="success-badge w-14 h-14 rounded-full grid place-content-center relative"
          style={{ background: "color-mix(in srgb, var(--color-verified) 18%, transparent)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-verified)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path ref={circlePathRef} d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      </div>
      <h2 className="success-heading font-[var(--font-heading)] text-[24px]">Request received</h2>
      <p
        className="success-copy text-[15px] leading-[1.6] max-w-[46ch] mx-auto"
        style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
      >
        Our team will review your request and personally match you with the right tutor within
        24–48 hours. We&rsquo;ve sent a confirmation to your email.
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {SUCCESS_TAGS.map((label) => (
          <span
            key={label}
            className="success-tag text-[12px] font-medium"
            style={{
              background: "var(--color-accent-2-100)",
              color: "var(--color-accent-2-800)",
              borderRadius: 999,
              padding: "5px 12px",
            }}
          >
            {label}
          </span>
        ))}
      </div>
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
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE_LABEL);
  const [budget, setBudget] = useState(45);
  const [currency, setCurrency] = useState("USD");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const cardRef = useRef<HTMLFormElement>(null);

  // Auto-detect the visitor's real timezone instead of defaulting every visitor — Indian
  // tutors serve US/UK/Canada/Singapore/UAE families alike — to "GMT (London)" regardless
  // of where they actually are. Falls back to the London default (already the initial
  // state) if the browser's zone doesn't match a listed market; the select stays editable.
  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = TIMEZONE_OPTIONS.find((t) => t.zones.includes(detected));
    if (match) setTimezone(match.label);
  }, []);

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
    return (
      <div className="request-form-module">
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div className="request-form-module">
      <div
        className="request-mobile-step text-[12px] font-semibold sm:hidden mb-2"
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
                className="request-progress-track h-1.5 rounded-full overflow-hidden"
              >
                <div
                  className="h-full rounded-full transition-transform duration-300 ease-out origin-left"
                  style={{
                    background: "var(--request-gold)",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </div>
              <div
                className="flex items-center gap-1.5 text-[11px] uppercase mt-2"
                style={{
                  letterSpacing: "0.03em",
                  color: n === step ? "var(--request-gold)" : "var(--request-muted)",
                }}
              >
                {done && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--request-gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
                {label}
              </div>
            </div>
          );
        })}
      </div>
      <div className="request-progress-track sm:hidden h-1.5 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-out"
          style={{ background: "var(--request-gold)", width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <form
        ref={cardRef}
        className="request-form-shell card gap-4 p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
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
                className="request-input input"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics"
              />
            </div>
            <div className="field">
              <label>Level</label>
              <select className="request-input input" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>Secondary / GCSE</option>
                <option>A-Level / IB</option>
                <option>University</option>
                <option>Adult / professional</option>
              </select>
            </div>
            <div className="field">
              <label>What are the goals?</label>
              <textarea
                className="request-input input"
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
              <select className="request-input input" value={sessionsPerWeek} onChange={(e) => setSessionsPerWeek(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </div>
            <div className="field">
              <label>Time zone</label>
              <select className="request-input input" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                {TIMEZONE_OPTIONS.map((tz) => (
                  <option key={tz.label}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <StepHeading step={3}>Budget</StepHeading>
            <div className="field">
              <label>Currency</label>
              <select className="request-input input w-auto" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c.code}>{c.code}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Budget per hour</label>
              <input
                className="request-input request-range input p-0"
                type="range"
                min={10}
                max={120}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
              <div
                className="text-[13px] mt-1.5"
                style={{ color: "var(--request-muted)" }}
              >
                Around {CURRENCY_OPTIONS.find((c) => c.code === currency)?.symbol ?? "$"}
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
                className="request-input input"
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
                className="request-input input"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                className="request-input input"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Phone (optional)</label>
            <input className="request-input input" placeholder="+44 …" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <p
              className="text-[13px] m-0"
              style={{ color: "var(--request-muted)" }}
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
          <button type="button" className="request-back-button btn btn-secondary" onClick={back} disabled={step === 1}>
            Back
          </button>
          <button type="submit" className="request-next-button btn btn-primary" disabled={pending}>
            {step === TOTAL_STEPS ? (pending ? "Submitting…" : "Submit request") : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
