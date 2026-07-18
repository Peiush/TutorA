import { Tag } from "@/components/ui/tag";
import { RequestForm } from "@/components/request/request-form";
import { RequestIllustration } from "@/components/request/request-illustration";
import { stats } from "@/lib/mock-data";

export const metadata = {
  title: "Request a Tutor — TutorConnect",
};

const trustStats = [stats[1], stats[2]];

export default function RequestATutorPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <div className="grid lg:grid-cols-[1fr_480px] gap-[clamp(32px,5vw,72px)] items-start">
        <div className="hidden lg:flex flex-col gap-9 pt-4">
          <RequestIllustration />
          <div className="flex flex-col gap-5 max-w-[300px]">
            {trustStats.map((s) => (
              <div key={s.num} className="flex gap-3.5">
                <div
                  className="font-[var(--font-heading)] font-bold text-[26px] flex-none"
                  style={{ color: "var(--color-accent-2)" }}
                >
                  {s.num}
                </div>
                <div
                  className="text-[13px] leading-[1.5] pt-1"
                  style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Tag variant="accent-2" className="text-[12px] px-3.5 py-1.5">
            Request a Tutor
          </Tag>
          <h1 className="font-bold text-[clamp(30px,4vw,46px)] mt-4 mb-1">
            Tell us what you&rsquo;re looking for
          </h1>
          <p
            className="text-[16px] mb-7"
            style={{ color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}
          >
            Our team will review your request and personally match you within 24–48 hours.
          </p>
          <RequestForm />
        </div>
      </div>
    </div>
  );
}
