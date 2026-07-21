export const CATEGORY_ACCENTS = {
  stem: { bar: "var(--color-accent-2-500)", tag: "accent-2" as const },
  language: { bar: "var(--color-verified)", tag: "accent" as const },
  arts: { bar: "var(--color-accent)", tag: "accent" as const },
};
const FALLBACK_ACCENTS = [CATEGORY_ACCENTS.arts, CATEGORY_ACCENTS.stem, CATEGORY_ACCENTS.language];

const STEM_KEYWORDS = ["math", "physic", "chemistry", "biology", "computer", "python", "statistic", "test prep", "econom", "science", "calculus", "algebra", "engineering"];
const LANGUAGE_KEYWORDS = ["language", "spanish", "italian", "portuguese", "arabic", "mandarin", "french", "german", "hindi", "tamil", "korean", "chinese", "japanese", "russian"];
const ARTS_KEYWORDS = ["music", "piano", "guitar", "english", "writing", "literature", "geography", "history", "art", "drama", "theatre", "theater"];

export function subjectAccent(subjects: string[], index: number) {
  const text = subjects.join(" ").toLowerCase();
  if (STEM_KEYWORDS.some((k) => text.includes(k))) return CATEGORY_ACCENTS.stem;
  if (LANGUAGE_KEYWORDS.some((k) => text.includes(k))) return CATEGORY_ACCENTS.language;
  if (ARTS_KEYWORDS.some((k) => text.includes(k))) return CATEGORY_ACCENTS.arts;
  return FALLBACK_ACCENTS[index % FALLBACK_ACCENTS.length];
}
