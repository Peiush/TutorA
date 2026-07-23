import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          The right tutor, personally matched
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 24, maxWidth: 800, color: "#C9D5E5" }}>
          Every match is personally verified by our team.
        </div>
      </div>
    ),
    { ...size }
  );
}
