import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/constants";

export const runtime = "nodejs";
export const alt = `${BUSINESS.shortName} — ${BUSINESS.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0e4d7f 0%, #1f8fa8 50%, #0e4d7f 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            opacity: 0.85,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span>KNB</span>
          <span
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#1f8fa8",
            }}
          />
          <span>Detailing</span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {BUSINESS.tagline}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 32,
            opacity: 0.9,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Mobile auto, boat, RV &amp; motorcycle detailing — Lake Wawasee &amp;
          Kosciusko County, IN
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            opacity: 0.85,
          }}
        >
          <span>knbdetailing.com</span>
          <span>{BUSINESS.phone}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
