import { ImageResponse } from "next/og";

// A dedicated square, solid-background brand mark for schema.org Organization.logo
// (Google's Knowledge Panel guidance wants square-ish, >=112x112px, solid background)
// — separate from opengraph-image.tsx, which is a 1200x630 social-share card, not a logo.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1E38",
        }}
      >
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 88,
            background: "#E8A33D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 200,
            fontWeight: 700,
            color: "#0F1E38",
            fontFamily: "sans-serif",
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
