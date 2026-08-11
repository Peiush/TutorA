// Shared high-chroma color system for the homepage's "important" browse sections
// (course categories, featured tutors) — six saturated hues that read as energetic
// rather than pastel, each with a light tint (card backgrounds) and a dark shade
// (text/icons) that keeps 4.5:1+ contrast against its own tint and against white.
export interface VibrantAccent {
  solid: string;
  light: string;
  text: string;
}

export const VIBRANT_ACCENTS: VibrantAccent[] = [
  { solid: "#0D9488", light: "#CCFBF1", text: "#0B4A44" }, // teal
  { solid: "#E2497A", light: "#FCE1EB", text: "#7A1140" }, // rose
  { solid: "#5B5FE0", light: "#E6E6FC", text: "#2A2A73" }, // indigo
  { solid: "#1F9D55", light: "#D9F5E3", text: "#0F5C30" }, // emerald
  { solid: "#D2540E", light: "#FBE3D0", text: "#7A2E08" }, // terracotta
  { solid: "#9333B0", light: "#F5E0FA", text: "#571C69" }, // violet
];

export function vibrantAccent(index: number): VibrantAccent {
  return VIBRANT_ACCENTS[index % VIBRANT_ACCENTS.length];
}
