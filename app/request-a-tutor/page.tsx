import { RequestPageBody } from "@/components/request/request-page-body";
import { stats } from "@/lib/mock-data";

export const metadata = {
  title: "Request a Tutor — TutorA",
};

const trustStats = [stats[1], stats[2]];

export default function RequestATutorPage() {
  return <RequestPageBody trustStats={trustStats} />;
}
