export const COURSE_STATUS_META = {
  OPEN: { label: "Open", variant: "accent" as const },
  CLOSED: { label: "Closed", variant: "neutral" as const },
};

export type CourseRequestRowData = {
  id: string;
  courseId: string;
  courseTitle: string;
  instructor: string;
  priceCents: number | null;
  status: "OPEN" | "CLOSED";
  createdAt: Date;
};
