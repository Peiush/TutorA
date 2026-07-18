import { initialsOf } from "@/components/ui/tutor-avatar";
import { CheckBadge } from "@/components/ui/verified-badge";

export function HeroIllustration() {
  return (
    <div
      className="hidden lg:block absolute pointer-events-none"
      style={{ top: 40, right: 10, width: 440, height: 480 }}
      aria-hidden
    >
      <svg width="440" height="480" viewBox="0 0 440 480" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          d="M100 120 C 220 60, 260 300, 340 340"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
        />
      </svg>

      {/* Student avatar */}
      <div
        className="absolute grid place-content-center"
        style={{
          top: 60,
          left: 30,
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: "var(--color-accent-2-200)",
          color: "var(--color-accent-2-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 34,
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
        }}
      >
        {initialsOf("Amara Okafor")}
      </div>

      {/* Tutor avatar */}
      <div
        className="absolute grid place-content-center"
        style={{
          top: 300,
          left: 300,
          width: 132,
          height: 132,
          borderRadius: "50%",
          background: "var(--color-accent-200)",
          color: "var(--color-accent-800)",
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 40,
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
        }}
      >
        {initialsOf("Liang Wei")}
      </div>

      {/* Match badge sitting on the connector */}
      <div
        className="absolute flex items-center gap-2"
        style={{
          top: 190,
          left: 150,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "10px 18px 10px 10px",
        }}
      >
        <CheckBadge size={30} />
        <span className="font-[var(--font-heading)] font-semibold text-[14px]" style={{ color: "var(--color-text)" }}>
          Matched
        </span>
      </div>

      {/* Chat bubble accent */}
      <div
        className="absolute"
        style={{
          top: 30,
          left: 220,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: "18px 18px 18px 4px",
          boxShadow: "var(--shadow-sm)",
          padding: "12px 16px",
        }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-accent-2-400)",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </div>

      {/* Handwritten note */}
      <div
        className="absolute"
        style={{
          top: 400,
          left: 60,
          fontFamily: "var(--font-accent)",
          fontSize: 22,
          fontWeight: 600,
          color: "var(--color-accent-800)",
          transform: "rotate(-4deg)",
        }}
      >
        it just clicked!
      </div>
    </div>
  );
}
