export const GRADE_BANDS = [
  { key: "GRADE_6_8", label: "Grade 6-8", min: 6, max: 8 },
  { key: "GRADE_9_10", label: "Grade 9-10", min: 9, max: 10 },
  { key: "GRADE_11_12", label: "Grade 11-12", min: 11, max: 12 },
] as const;

export type GradeBandKey = (typeof GRADE_BANDS)[number]["key"];
export type GradeBand = (typeof GRADE_BANDS)[number];

export const GRADE_BAND_COLORS: Record<GradeBandKey, { solid: string; light: string; text: string }> = {
  GRADE_6_8: { solid: "#4A7C82", light: "#EAF3F3", text: "#25474B" },
  GRADE_9_10: { solid: "#A65A6B", light: "#F6EAEC", text: "#5C2E38" },
  GRADE_11_12: { solid: "#5B6EA8", light: "#ECEFF7", text: "#2E3A63" },
};

// Subject.gradeLevel is free text imported from spreadsheets ("Grades 6–8",
// "Ages 10–11", "Years 12–13", "Secondary", "All Levels"...), not a clean enum,
// so band membership is inferred: pull every number out of the string and
// check whether that range overlaps the band's [min, max]. "all"/"all levels"
// always matches; strings with no digits (e.g. "Secondary") match nothing.
export function matchesGradeBand(gradeLevel: string | null | undefined, band: GradeBand): boolean {
  if (!gradeLevel) return false;
  if (/\ball\b/i.test(gradeLevel)) return true;
  const nums = gradeLevel.match(/\d+/g);
  if (!nums || !nums.length) return false;
  const values = nums.map(Number);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  return lo <= band.max && hi >= band.min;
}
