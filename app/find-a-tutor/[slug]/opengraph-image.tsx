import { ImageResponse } from "next/og";
import { getTutorProfileBySlug } from "@/app/lib/tutor-listings";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutor = await getTutorProfileBySlug(slug);
  const subjectNames = tutor?.subjects.map((s) => s.subjectName).join(", ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0F1E38 0%, #223D66 100%)",
          color: "#F7F5F0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#E8A33D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#0F1E38",
            }}
          >
            T
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>TutorA</div>
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, marginTop: 48, maxWidth: 900, lineHeight: 1.15 }}>
          {tutor?.name ?? "Verified Tutor"}
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 24, maxWidth: 800, color: "#C9D5E5" }}>
          {tutor
            ? `${subjectNames || "Multiple subjects"}${tutor.country ? ` · ${tutor.country}` : ""} · Personally verified by TutorA`
            : "Personally verified tutor on TutorA."}
        </div>
      </div>
    ),
    { ...size }
  );
}
