import { CheckBadge } from "@/components/ui/verified-badge";

export function AboutIllustration() {
  return (
    <div
      className="hidden lg:block absolute pointer-events-none"
      style={{ top: 30, right: 10, width: 420, height: 470 }}
      aria-hidden
    >
      <svg width="420" height="470" viewBox="0 0 420 470" className="absolute inset-0" style={{ overflow: "visible" }}>
        <path
          d="M170 158 C 230 172, 270 185, 300 225 C 260 300, 210 355, 155 398"
          fill="none"
          stroke="var(--color-accent-2-300)"
          strokeWidth="3"
          strokeDasharray="1 12"
          strokeLinecap="round"
        />
      </svg>

      {/* Review card mockup */}
      <div
        className="absolute"
        style={{
          top: 10,
          left: 40,
          width: 260,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "18px 20px",
        }}
      >
        <div
          className="text-[11px] uppercase font-[var(--font-heading)] font-semibold"
          style={{ letterSpacing: "0.06em", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
        >
          Tutor application
        </div>
        <div className="grid gap-2.5 mt-3.5">
          {["Identity verified", "Credentials checked", "References confirmed"].map((label) => (
            <div key={label} className="flex items-center gap-2.5">
              <div
                className="w-[18px] h-[18px] rounded-full grid place-content-center flex-none"
                style={{ background: "var(--color-verified)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span className="text-[13px] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified stamp */}
      <div
        className="absolute grid place-content-center"
        style={{
          top: 225,
          left: 255,
          width: 138,
          height: 138,
          borderRadius: "50%",
          background: "var(--color-accent-2-800)",
          boxShadow: "var(--shadow-lg)",
          border: "6px solid var(--color-bg)",
          transform: "rotate(-8deg)",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-300)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z" />
          </svg>
          <span
            className="font-[var(--font-heading)] font-bold text-[13px] uppercase"
            style={{ letterSpacing: "0.05em", color: "var(--color-bg)" }}
          >
            Verified
          </span>
        </div>
      </div>

      {/* Team review badge sitting on the connector */}
      <div
        className="absolute flex items-center gap-2"
        style={{
          top: 170,
          left: 60,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 999,
          boxShadow: "var(--shadow-md)",
          padding: "10px 18px 10px 10px",
        }}
      >
        <CheckBadge size={30} />
        <span className="font-[var(--font-heading)] font-semibold text-[14px]" style={{ color: "var(--color-text)" }}>
          Reviewed by our team
        </span>
      </div>

      {/* Handwritten note */}
      <div
        className="absolute"
        style={{
          top: 405,
          left: 100,
          fontFamily: "var(--font-accent)",
          fontSize: 22,
          fontWeight: 600,
          color: "var(--color-accent-800)",
          transform: "rotate(-3deg)",
        }}
      >
        no guesswork
      </div>
    </div>
  );
}
