export const STATUS_META = {
  OPEN: { label: "Open", variant: "accent" as const },
  MATCHED: { label: "Matched", variant: "success" as const },
  CLOSED: { label: "Closed", variant: "neutral" as const },
};

const CURRENCY_SYMBOLS: Record<string, string> = { USD: "$", GBP: "£", EUR: "€" };

export function currencySymbol(currency: string | null) {
  return (currency && CURRENCY_SYMBOLS[currency]) || "$";
}

const MODE_LABELS: Record<string, string> = {
  Online: "Online",
  "In person": "Home",
  Both: "Online and Home",
  Either: "Online and Home",
};

export function modeLabel(mode: string | null) {
  if (!mode) return null;
  return MODE_LABELS[mode] ?? mode;
}

export function relativeDate(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export type RequestRowData = {
  id: string;
  subject: string;
  level: string | null;
  mode: string | null;
  sessionsPerWeek: string | null;
  status: "OPEN" | "MATCHED" | "CLOSED";
  budgetPerHour: number | null;
  currency: string | null;
  notes: string | null;
  createdAt: Date;
  requestedTutorName: string | null;
  requestedTutorRate: string | null;
  matchedTutor: {
    name: string | null;
    email: string;
    tutorProfile: { hourlyRateCents: number | null } | null;
  } | null;
};
