// Decorative quote-and-stars motif for the Add Testimonial modal header band.
// Class names (ti-*) are GSAP animation hooks, not styling — see TestimonialModal.
export function TestimonialIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      className={className}
      aria-hidden
      style={{ width: "100%", height: "100%" }}
    >
      <circle className="ti-orbit" cx="164" cy="68" r="56" stroke="var(--color-accent-2-400)" strokeWidth="1.4" strokeDasharray="1.5 8" opacity="0.5" />
      <circle className="ti-orbit-2" cx="164" cy="68" r="70" stroke="var(--color-accent-400)" strokeWidth="1.2" strokeDasharray="1 6" opacity="0.35" />

      <g className="ti-dot" transform="translate(66 100)">
        <circle r="3" fill="var(--color-accent-500)" />
      </g>
      <g className="ti-dot" transform="translate(254 40)">
        <circle r="2.4" fill="var(--color-accent-2-500)" />
      </g>
      <g className="ti-dot" transform="translate(96 30)">
        <circle r="2" fill="var(--color-accent-600)" />
      </g>

      <g className="ti-star" transform="translate(240 96)">
        <path d="m0 -9 2.6 6 6.4 0.7 -4.8 4.5 1.3 6.4 -5.5 -3.1 -5.5 3.1 1.3 -6.4 -4.8 -4.5 6.4 -0.7Z" fill="var(--color-accent-500)" />
      </g>
      <g className="ti-star" transform="translate(78 60) scale(0.65)">
        <path d="m0 -9 2.6 6 6.4 0.7 -4.8 4.5 1.3 6.4 -5.5 -3.1 -5.5 3.1 1.3 -6.4 -4.8 -4.5 6.4 -0.7Z" fill="var(--color-accent-2-500)" />
      </g>

      <g className="ti-bubble" transform="translate(112 22) rotate(-4)">
        <rect x="0" y="0" width="150" height="78" rx="18" fill="var(--color-bg)" stroke="var(--color-accent-2-700)" strokeWidth="2.5" />
        <path d="M28 78 20 96 44 78Z" fill="var(--color-bg)" stroke="var(--color-accent-2-700)" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="16" y="42" fontFamily="var(--font-heading)" fontSize="34" fontWeight="700" fill="var(--color-accent-500)">
          &ldquo;
        </text>
        <rect x="52" y="26" width="82" height="7" rx="3.5" fill="var(--color-accent-2-200)" />
        <rect x="52" y="42" width="60" height="7" rx="3.5" fill="var(--color-accent-2-100)" />
        <g transform="translate(52 58)">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              transform={`translate(${i * 16} 0)`}
              d="m6 0 1.8 3.9 4.2 0.5 -3.1 3 0.9 4.2L6 9.5 2.1 11.6 3 7.4 -0.1 4.4l4.2-0.5Z"
              fill="var(--color-accent-500)"
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
