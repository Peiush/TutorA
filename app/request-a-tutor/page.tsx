import { RequestPageBody } from "@/components/request/request-page-body";
import { stats } from "@/lib/mock-data";

export const metadata = {
  title: "Request a Tutor",
  description:
    "Tell us what you're looking for and we'll personally match you with a verified tutor. No guessing — every request is reviewed by our team.",
  alternates: { canonical: "/request-a-tutor" },
};

const trustStats = [stats[1], stats[2]];

export default function RequestATutorPage() {
  return <RequestPageBody trustStats={trustStats} />;
}
