export type CourseCategory =
  | "Mathematics"
  | "Science"
  | "Computer Science"
  | "Languages"
  | "Music"
  | "Test Prep"
  | "Writing";

export type CourseLevel = "Beginner" | "Intermediate" | "All Levels";

export interface CourseRaw {
  id: string;
  title: string;
  instructor: string;
  instructorId: string;
  category: CourseCategory;
  level: CourseLevel;
  rating: number;
  reviews: number;
  priceCents: number;
  originalPriceCents: number;
  durationHours: number;
  lectureCount: number;
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
  "Mathematics",
  "Science",
  "Computer Science",
  "Languages",
  "Music",
  "Test Prep",
  "Writing",
];

export const CATEGORY_DB_TO_LABEL: Record<string, CourseCategory> = {
  MATHEMATICS: "Mathematics",
  SCIENCE: "Science",
  COMPUTER_SCIENCE: "Computer Science",
  LANGUAGES: "Languages",
  MUSIC: "Music",
  TEST_PREP: "Test Prep",
  WRITING: "Writing",
};

export const CATEGORY_LABEL_TO_DB: Record<CourseCategory, string> = {
  Mathematics: "MATHEMATICS",
  Science: "SCIENCE",
  "Computer Science": "COMPUTER_SCIENCE",
  Languages: "LANGUAGES",
  Music: "MUSIC",
  "Test Prep": "TEST_PREP",
  Writing: "WRITING",
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
