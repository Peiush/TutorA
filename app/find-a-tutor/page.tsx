import { Tag } from "@/components/ui/tag";
import { TutorBrowser } from "@/components/find/tutor-browser";

export const metadata = {
  title: "Find a Tutor — TutorConnect",
};

export default function FindATutorPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
        Find a Tutor
      </Tag>
      <h1 className="font-bold text-[clamp(30px,4vw,48px)] mt-4 mb-1">Browse verified tutors</h1>
      <p
        className="text-[16px] mb-8"
        style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
      >
        Contact details stay private. Request a tutor and our team makes the introduction.
      </p>
      <TutorBrowser />
    </div>
  );
}
