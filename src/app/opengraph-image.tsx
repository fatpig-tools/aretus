import { ImageResponse } from "next/og";

export const alt = "Aretus Enterprises: transport and construction support, from our own fleet.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function font(weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}&display=swap`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  return url ? (await fetch(url)).arrayBuffer() : null;
}

export default async function OpengraphImage() {
  const bold = await font(600).catch(() => null);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111417",
          color: "#e8e4dc",
          padding: 72,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, background: "#f2b705", color: "#111417", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 600 }}>
            A
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>Aretus Enterprises</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.5 }}>
          <span>Transport and construction support,</span>
          <span style={{ color: "#f2b705" }}>from our own fleet.</span>
        </div>
        <div style={{ display: "flex", height: 10, width: "100%", backgroundImage: "repeating-linear-gradient(90deg, #f2b705 0 56px, transparent 56px 96px)" }} />
      </div>
    ),
    { ...size, fonts: bold ? [{ name: "Archivo", data: bold, weight: 600, style: "normal" }] : [] },
  );
}
