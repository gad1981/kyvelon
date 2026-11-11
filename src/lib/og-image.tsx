import { ImageResponse } from "next/og";

export const OG_ALT = "Kyvelon — Digital systems built as cubes";
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #020612 0%, #0a1638 48%, #0038f8 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "linear-gradient(145deg, #5b84ff, #0038f8)",
              transform: "rotate(45deg)",
              border: "2px solid rgba(255,255,255,0.35)",
            }}
          />
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            Kyvelon
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Digital systems built as cubes.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 780,
              lineHeight: 1.35,
            }}
          >
            Software, websites, automation, and digital services from Athens.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>www.kyvelon.com</span>
          <span>Athens</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
