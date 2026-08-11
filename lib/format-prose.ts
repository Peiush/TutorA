// Breaks a long, single-paragraph string into shorter, more scannable paragraphs.
// Respects manually-authored "\n\n" breaks as hard boundaries first, then auto-chunks
// any remaining long stretch by sentence so a wall of text never renders as one block.

const ABBREVIATIONS = ["e.g.", "i.e.", "etc.", "vs.", "mr.", "mrs.", "dr.", "st."];

function splitIntoSentences(text: string): string[] {
  const parts = text.split(/(?<=[.!?])\s+(?=[A-Z0-9"])/);
  const sentences: string[] = [];
  for (const part of parts) {
    const prevIndex = sentences.length - 1;
    const prev = sentences[prevIndex];
    const prevEndsWithAbbreviation =
      prev && ABBREVIATIONS.some((abbr) => prev.toLowerCase().endsWith(abbr));
    if (prevEndsWithAbbreviation) {
      sentences[prevIndex] = `${prev} ${part}`;
    } else {
      sentences.push(part);
    }
  }
  return sentences;
}

const TARGET_PARAGRAPH_LENGTH = 320;
const MIN_TRAILING_PARAGRAPH_LENGTH = 120;

function autoChunk(paragraph: string): string[] {
  const sentences = splitIntoSentences(paragraph);
  if (sentences.length <= 2) return [paragraph];

  const chunks: string[] = [];
  let current: string[] = [];
  let currentLength = 0;

  for (const sentence of sentences) {
    current.push(sentence);
    currentLength += sentence.length;
    if (currentLength >= TARGET_PARAGRAPH_LENGTH) {
      chunks.push(current.join(" "));
      current = [];
      currentLength = 0;
    }
  }

  if (current.length > 0) {
    const trailing = current.join(" ");
    if (chunks.length > 0 && trailing.length < MIN_TRAILING_PARAGRAPH_LENGTH) {
      chunks[chunks.length - 1] += ` ${trailing}`;
    } else {
      chunks.push(trailing);
    }
  }

  return chunks;
}

export function paragraphize(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .flatMap(autoChunk);
}
