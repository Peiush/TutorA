export const STATUS_META = {
  OPEN: { label: "Open", variant: "accent" as const },
  MATCHED: { label: "Matched", variant: "success" as const },
  CLOSED: { label: "Closed", variant: "neutral" as const },
};

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
  matchedTutor: { name: string | null; email: string } | null;
};
