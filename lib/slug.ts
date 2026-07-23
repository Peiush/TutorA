import { randomUUID } from "crypto";

const COMBINING_MARKS = /[̀-ͯ]/g;

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Generated once at creation and never changed, so published URLs stay valid even if the title/name is edited later.
export function makeSlug(base: string): string {
  const stem = slugify(base) || "listing";
  return `${stem}-${randomUUID().slice(0, 8)}`;
}
