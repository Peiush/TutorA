export type CourseCategory =
  | "Programming & Technology"
  | "Test Preparation"
  | "Languages"
  | "Creative Skills"
  | "Music & Instruments";

export type CourseLevel = "Beginner" | "Intermediate" | "All Levels";

export interface CourseRaw {
  id: string;
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
}

export function priceLabel(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
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
