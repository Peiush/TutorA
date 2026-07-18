const PALETTES = [
  ["var(--color-accent-2-200)", "var(--color-accent-2-800)"],
  ["var(--color-accent-200)", "var(--color-accent-800)"],
  ["var(--color-neutral-200)", "var(--color-neutral-700)"],
];

export function initialsOf(name: string) {
  const clean = name.replace(/^Dr\.?\s+/, "");
  return clean
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TutorAvatar({
  name,
  index = 0,
  size = 52,
  withBadge = false,
}: {
  name: string;
  index?: number;
  size?: number;
  withBadge?: boolean;
}) {
  const [bg, text] = PALETTES[index % PALETTES.length];
  return (
    <div style={{ position: "relative", flex: "none" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: bg,
          color: text,
          display: "grid",
          placeContent: "center",
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: size * 0.33,
        }}
      >
        {initialsOf(name)}
      </div>
      {withBadge && (
        <div
          style={{
            position: "absolute",
            right: -3,
            bottom: -3,
            width: size * 0.36,
            height: size * 0.36,
            borderRadius: "50%",
            background: "var(--color-verified)",
            border: "2px solid var(--color-bg)",
            display: "grid",
            placeContent: "center",
          }}
        >
          <svg
            width={size * 0.18}
            height={size * 0.18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      )}
    </div>
  );
}

export function starsOf(rating: number) {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

export function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex gap-0.5" style={{ verticalAlign: "middle" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < full ? "var(--color-accent)" : "none"}
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <path d="m12 2.5 2.9 6.35 6.85.72-5.1 4.83 1.4 6.85L12 17.9l-6.05 3.35 1.4-6.85-5.1-4.83 6.85-.72Z" />
        </svg>
      ))}
    </span>
  );
}
