export const SUBJECT_STATUS_META = {
  OPEN: { label: "Open", variant: "accent" as const },
  CLOSED: { label: "Closed", variant: "neutral" as const },
};

export type SubjectRequestRowData = {
  id: string;
  subjectId: string;
  title: string;
  gradeLevel: string | null;
  hourlyRateCents: number | null;
  status: "OPEN" | "CLOSED";
  createdAt: Date;
};
