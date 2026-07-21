export function HeroMatchIllustration(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 320"
      fill="none"
      className={props.className}
      role="img"
      aria-label="A tutor and student matched through TutorConnect"
    >
      <ellipse cx="180" cy="285" rx="130" ry="16" fill="var(--color-accent-2-100)" />

      <circle cx="70" cy="70" r="34" fill="var(--color-accent-200)" opacity="0.7" />
      <circle cx="308" cy="60" r="22" fill="var(--color-accent-2-200)" opacity="0.7" />
      <circle cx="320" cy="230" r="16" fill="var(--color-accent-300)" opacity="0.6" />

      <path
        d="M96 96 L172 150"
        stroke="var(--color-accent-2-300)"
        strokeWidth="2.5"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      <path
        d="M264 96 L188 150"
        stroke="var(--color-accent-2-300)"
        strokeWidth="2.5"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />

      <g>
        <rect x="40" y="52" width="88" height="88" rx="24" fill="var(--color-surface)" stroke="var(--color-divider)" />
        <circle cx="84" cy="90" r="22" fill="var(--color-accent-2-200)" />
        <circle cx="84" cy="82" r="9" fill="var(--color-accent-2-600)" />
        <path d="M67 106c0-11 8-18 17-18s17 7 17 18" fill="var(--color-accent-2-600)" />
      </g>

      <g>
        <rect x="232" y="52" width="88" height="88" rx="24" fill="var(--color-surface)" stroke="var(--color-divider)" />
        <circle cx="276" cy="90" r="22" fill="var(--color-accent-200)" />
        <circle cx="276" cy="82" r="9" fill="var(--color-accent-700)" />
        <path d="M259 106c0-11 8-18 17-18s17 7 17 18" fill="var(--color-accent-700)" />
      </g>

      <g transform="translate(130,150)">
        <rect x="0" y="0" width="100" height="76" rx="20" fill="var(--color-accent-2-700)" />
        <path d="M18 30h64M18 46h44" stroke="var(--color-accent-2-100)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="14" r="6" fill="var(--color-accent)" />
      </g>

      <g transform="translate(150,238)">
        <circle r="20" fill="var(--color-verified)" />
        <path d="m-8 0 5 5 11-11" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      <g transform="translate(214,246) rotate(-14)">
        <rect x="-16" y="-16" width="32" height="32" rx="10" fill="var(--color-accent)" />
        <path d="M-7 2h14M-7-3h14M0-3v10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function SearchEmptyIllustration(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      className={props.className}
      role="img"
      aria-label="No tutors found for these filters"
    >
      <ellipse cx="100" cy="140" rx="70" ry="10" fill="var(--color-accent-2-200)" opacity="0.5" />

      <rect x="40" y="30" width="70" height="86" rx="14" fill="var(--color-surface)" stroke="var(--color-divider)" transform="rotate(-6 75 73)" />
      <rect x="70" y="24" width="70" height="86" rx="14" fill="var(--color-surface)" stroke="var(--color-divider)" transform="rotate(4 105 67)" />

      <g transform="translate(105,67)">
        <path d="M-18 4h36M-18 16h24" stroke="var(--color-neutral-300)" strokeWidth="4" strokeLinecap="round" />
        <circle cy="-18" r="7" fill="var(--color-accent-200)" />
      </g>

      <g transform="translate(140,100)">
        <circle r="22" fill="none" stroke="var(--color-accent-2-600)" strokeWidth="6" />
        <line x1="16" y1="16" x2="32" y2="32" stroke="var(--color-accent-2-600)" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function RequestSendIllustration(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      className={props.className}
      role="img"
      aria-label="Request a personal tutor match"
    >
      <ellipse cx="100" cy="140" rx="70" ry="10" fill="var(--color-accent-2-200)" opacity="0.5" />

      <rect x="30" y="46" width="70" height="70" rx="16" fill="var(--color-surface)" stroke="var(--color-divider)" />
      <path d="M46 68h38M46 82h26" stroke="var(--color-neutral-300)" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="65" cy="60" r="1" fill="none" />

      <g transform="translate(112,40) rotate(18)">
        <path
          d="M0 20 L64 0 L34 46 L26 30 Z"
          fill="var(--color-accent)"
        />
        <path d="M0 20 L26 30 L34 46Z" fill="var(--color-accent-600)" />
      </g>

      <path
        d="M96 90c22-6 42-2 58 14"
        stroke="var(--color-accent-2-300)"
        strokeWidth="2.5"
        strokeDasharray="1 8"
        strokeLinecap="round"
        fill="none"
      />

      <circle cx="164" cy="112" r="26" fill="var(--color-accent-2-100)" />
      <circle cx="164" cy="104" r="10" fill="var(--color-accent-2-600)" />
      <path d="M148 126c0-12 8-19 16-19s16 7 16 19" fill="var(--color-accent-2-600)" />
    </svg>
  );
}
