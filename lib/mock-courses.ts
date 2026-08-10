export type CourseCategory =
  | "Programming & Technology"
  | "Test Preparation"
  | "Languages"
  | "Creative Skills"
  | "Music & Instruments";

export type CourseLevel = "Beginner" | "Intermediate" | "All Levels";

export interface CourseRaw {
  id: string;
  slug: string;
  title: string;
  instructor: string | null;
  instructorId: string | null;
  category: CourseCategory;
  level: CourseLevel;
  rating: number;
  reviews: number;
  priceCents: number | null;
  originalPriceCents: number | null;
  durationHours: number | null;
  lectureCount: number | null;
  lectureCountLabel: string | null;
  bestseller?: boolean;
  premium?: boolean;
  isNew?: boolean;
  subtitle: string;
  whatYoullLearn: string[];
  updatedAt: Date;
}

export function priceLabel(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

// Kept separate from priceLabel() rather than baking "USD" into it directly: priceLabel()
// also backs admin form `defaultValue`s (components/admin/course-form-modal.tsx), which need
// a clean numeric-looking string, not display text. Use this one for visitor-facing primary
// price displays only — international visitors (US/UK/Canada/Singapore/UAE) shouldn't have
// to guess what currency a bare "$" symbol means.
export function priceLabelUSD(cents: number) {
  return `${priceLabel(cents)} USD`;
}

// Guards against a real data-entry mistake seen in production: an instructor pastes the
// course title into the first "what you'll learn" outcome instead of an actual outcome
// phrase, which then reads as broken prose wherever outcomes are spliced into a sentence
// (e.g. "you'll be able to Python Programming for Beginners"). Filtering it out here
// protects every course page from this class of bug, not just the one it was caught on.
export function learningOutcomes(course: Pick<CourseRaw, "title" | "whatYoullLearn">): string[] {
  const title = course.title.trim().toLowerCase();
  return course.whatYoullLearn.filter((item) => item.trim().toLowerCase() !== title);
}

// ISO 8601 duration for Course.hasCourseInstance.courseWorkload (e.g. 33.5 -> "PT33H30M").
export function courseWorkloadISO8601(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return minutes > 0 ? `PT${wholeHours}H${minutes}M` : `PT${wholeHours}H`;
}

export const courseCategories: CourseCategory[] = [
  "Programming & Technology",
  "Test Preparation",
  "Languages",
  "Creative Skills",
  "Music & Instruments",
];

export const CATEGORY_DB_TO_LABEL: Record<string, CourseCategory> = {
  PROGRAMMING_TECHNOLOGY: "Programming & Technology",
  TEST_PREPARATION: "Test Preparation",
  LANGUAGES: "Languages",
  CREATIVE_SKILLS: "Creative Skills",
  MUSIC_INSTRUMENTS: "Music & Instruments",
};

export const CATEGORY_LABEL_TO_DB: Record<CourseCategory, string> = {
  "Programming & Technology": "PROGRAMMING_TECHNOLOGY",
  "Test Preparation": "TEST_PREPARATION",
  Languages: "LANGUAGES",
  "Creative Skills": "CREATIVE_SKILLS",
  "Music & Instruments": "MUSIC_INSTRUMENTS",
};

export const courseLevels: CourseLevel[] = ["Beginner", "Intermediate", "All Levels"];

export const LEVEL_DB_TO_LABEL: Record<string, CourseLevel> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ALL_LEVELS: "All Levels",
};

export const LEVEL_LABEL_TO_DB: Record<CourseLevel, string> = {
  Beginner: "BEGINNER",
  Intermediate: "INTERMEDIATE",
  "All Levels": "ALL_LEVELS",
};
