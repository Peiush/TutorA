// Decorative identity-card motif for the Edit Profile modal header band.
// Class names (pi-*) are GSAP animation hooks, not styling — see EditProfileModal.
export function ProfileIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      className={className}
      aria-hidden
      style={{ width: "100%", height: "100%" }}
    >
      <circle className="pi-orbit" cx="164" cy="70" r="54" stroke="var(--color-accent-2-400)" strokeWidth="1.4" strokeDasharray="1.5 8" opacity="0.55" />
      <circle className="pi-orbit-2" cx="164" cy="70" r="66" stroke="var(--color-accent-400)" strokeWidth="1.2" strokeDasharray="1 6" opacity="0.35" />

      <g className="pi-dot" transform="translate(72 32)">
        <circle r="3.2" fill="var(--color-accent-500)" />
      </g>
      <g className="pi-dot" transform="translate(250 100)">
        <circle r="2.4" fill="var(--color-accent-2-500)" />
      </g>
      <g className="pi-dot" transform="translate(238 34)">
        <circle r="2" fill="var(--color-accent-600)" />
      </g>

      <g className="pi-spark" transform="translate(96 96)">
        <path d="M0 -8 L1.8 -1.8 L8 0 L1.8 1.8 L0 8 L-1.8 1.8 L-8 0 L-1.8 -1.8 Z" fill="var(--color-accent-500)" />
      </g>
      <g className="pi-spark" transform="translate(232 46) scale(0.7)">
        <path d="M0 -8 L1.8 -1.8 L8 0 L1.8 1.8 L0 8 L-1.8 1.8 L-8 0 L-1.8 -1.8 Z" fill="var(--color-accent-2-500)" />
      </g>

      <g className="pi-card" transform="translate(120 24) rotate(-6)">
        <rect x="0" y="0" width="132" height="88" rx="16" fill="var(--color-bg)" stroke="var(--color-accent-2-700)" strokeWidth="2.5" />
        <rect x="0" y="0" width="132" height="26" rx="16" fill="var(--color-accent-2-700)" />
        <rect x="0" y="14" width="132" height="12" fill="var(--color-accent-2-700)" />
        <circle cx="28" cy="54" r="16" fill="var(--color-accent-200)" stroke="var(--color-accent-600)" strokeWidth="2" />
        <path d="M17 66c2.5-6 6.5-9 11-9s8.5 3 11 9" stroke="var(--color-accent-700)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="54" y="46" width="60" height="6" rx="3" fill="var(--color-accent-2-200)" />
        <rect x="54" y="58" width="42" height="6" rx="3" fill="var(--color-accent-2-100)" />
      </g>

      <g className="pi-pencil" transform="translate(196 88)">
        <circle r="21" fill="var(--color-accent-500)" stroke="var(--color-bg)" strokeWidth="3" />
        <g transform="translate(-8 -8) rotate(45)" stroke="var(--color-accent-2-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M2 14.5 2 18 5.5 18 15 8.5 11.5 5 2 14.5Z" fill="var(--color-bg)" />
          <path d="M9.5 6.5 13 10" />
        </g>
      </g>
    </svg>
  );
}
