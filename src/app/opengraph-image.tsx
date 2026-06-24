import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mattia Amendola - Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#0a0e1a",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(59,130,246,0.12), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: "#10b981",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#94a3b8",
            }}
          >
            Portfolio
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "84px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          <span>Mattia Amendola</span>
          <span style={{ color: "#34d399" }}>full-stack developer</span>
        </div>

        <div
          style={{
            marginTop: "40px",
            fontSize: "30px",
            color: "#cbd5e1",
            maxWidth: "850px",
          }}
        >
          Interfacce pulite, backend solidi, esperienze eleganti e performanti.
        </div>
      </div>
    ),
    { ...size }
  );
}
