import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { frame as mapFrame, places, project, type PlaceKey } from "../content/geo";
import { body, color, display, mono } from "./brand";
import { AretusMark } from "../components/ui/AretusMark";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const MAP = { x: 120, y: 150, w: 1180, h: 800 };

const pins: { key: PlaceKey; at: number; note: string }[] = [
  { key: "sambalpur", at: 40, note: "" },
  { key: "angul", at: 52, note: "" },
  { key: "hindol", at: 64, note: "" },
  { key: "chandikhol", at: 76, note: "18 km · AIPL" },
  { key: "barbil", at: 88, note: "Mining · TCL, Jindal" },
  { key: "mayurbhanj", at: 100, note: "Dam · Laxminarayan Infra" },
];

const routes: { from: PlaceKey; to: PlaceKey; start: number; label: string; sub: string; dx: number; dy: number }[] = [
  { from: "angul", to: "sambalpur", start: 120, label: "160 km", sub: "Angul-Sambalpur · AIPL", dx: -360, dy: 30 },
  { from: "hindol", to: "angul", start: 175, label: "46 km", sub: "Package 11 · Gayatri Projects", dx: -430, dy: 40 },
];

function pos(key: PlaceKey) {
  const p = places[key];
  const { x, y } = project(p.lat, p.lon, MAP.w, MAP.h);
  return { x: MAP.x + x, y: MAP.y + y };
}

export const ProjectRoutes: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const lats = [20.5, 21, 21.5, 22];
  const lons = [84, 84.5, 85, 85.5, 86, 86.5, 87];

  return (
    <AbsoluteFill name="Project routes" style={{ backgroundColor: color.charcoal, fontFamily: body, color: color.dust }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {/* Graticule draws in */}
        {lats.map((lat, i) => {
          const y = MAP.y + project(lat, mapFrame.lonMin, MAP.w, MAP.h).y;
          const len = interpolate(f, [i * 4, i * 4 + 30], [0, MAP.w], { ...clamp, easing: ease });
          return <line key={lat} x1={MAP.x} x2={MAP.x + len} y1={y} y2={y} stroke={color.line} strokeWidth={1.5} />;
        })}
        {lons.map((lon, i) => {
          const x = MAP.x + project(mapFrame.latMin, lon, MAP.w, MAP.h).x;
          const len = interpolate(f, [8 + i * 3, 38 + i * 3], [0, MAP.h], { ...clamp, easing: ease });
          return <line key={lon} y1={MAP.y} y2={MAP.y + len} x1={x} x2={x} stroke={color.line} strokeWidth={1.5} />;
        })}

        {/* Routes draw along their length */}
        {routes.map((r) => {
          const a = pos(r.from);
          const b = pos(r.to);
          const length = Math.hypot(b.x - a.x, b.y - a.y);
          const drawn = interpolate(f, [r.start, r.start + 40], [0, length], { ...clamp, easing: ease });
          return (
            <g key={r.label}>
              <defs>
                <mask id={`m-${r.from}`}>
                  <line x1={a.x} y1={a.y} x2={a.x + ((b.x - a.x) * drawn) / length} y2={a.y + ((b.y - a.y) * drawn) / length} stroke="white" strokeWidth={14} />
                </mask>
              </defs>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={color.signal}
                strokeWidth={7}
                strokeDasharray="22 14"
                strokeDashoffset={-f * 1.2}
                mask={`url(#m-${r.from})`}
              />
            </g>
          );
        })}

        {/* Pins */}
        {pins.map((p) => {
          const { x, y } = pos(p.key);
          const s = interpolate(f, [p.at, p.at + 18], [0, 1], { ...clamp, easing: Easing.spring({ damping: 12 }) });
          const pulse = ((f - p.at) % 45) / 45;
          return (
            <g key={p.key} opacity={s > 0 ? 1 : 0}>
              <circle cx={x} cy={y} r={14 + pulse * 26} fill="none" stroke={color.signal} strokeOpacity={f > p.at ? (1 - pulse) * 0.6 : 0} strokeWidth={2} />
              <circle cx={x} cy={y} r={9 * s} fill={color.signal} />
            </g>
          );
        })}
      </svg>

      {pins.map((p) => {
        const { x, y } = pos(p.key);
        const flip = x > MAP.x + MAP.w * 0.75;
        return (
          <Interactive.Div
            key={p.key}
            name={`Label ${places[p.key].name}`}
            style={{
              position: "absolute",
              left: flip ? undefined : x + 22,
              right: flip ? width - x + 22 : undefined,
              top: y - 44,
              textAlign: flip ? "right" : "left",
              opacity: interpolate(f, [p.at + 6, p.at + 22], [0, 1], clamp),
              translate: interpolate(f, [p.at + 6, p.at + 22], ["0px 12px", "0px 0px"], { ...clamp, easing: ease }),
            }}
          >
            <div style={{ fontFamily: display, fontWeight: 600, fontSize: 32, letterSpacing: -0.5 }}>
              {places[p.key].name}
            </div>
            {p.note ? <div style={{ fontSize: 20, color: color.steelLight }}>{p.note}</div> : null}
          </Interactive.Div>
        );
      })}

      {/* Route callouts */}
      {routes.map((r) => {
        const a = pos(r.from);
        const b = pos(r.to);
        return (
          <Interactive.Div
            key={r.label}
            name={`Callout ${r.label}`}
            style={{
              position: "absolute",
              left: (a.x + b.x) / 2 + r.dx,
              top: (a.y + b.y) / 2 + r.dy,
              opacity: interpolate(f, [r.start + 25, r.start + 45], [0, 1], clamp),
              translate: interpolate(f, [r.start + 25, r.start + 45], ["0px 16px", "0px 0px"], { ...clamp, easing: ease }),
            }}
          >
            <div style={{ fontFamily: display, fontWeight: 600, fontSize: 80, lineHeight: 0.95, letterSpacing: -2, color: color.signal }}>{r.label}</div>
            <div style={{ fontSize: 22, color: color.dust }}>{r.sub}</div>
          </Interactive.Div>
        );
      })}

      {/* Title */}
      <Interactive.Div
        name="Title"
        style={{
          position: "absolute",
          left: MAP.x,
          top: 56,
          fontFamily: mono,
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: color.steelLight,
          opacity: interpolate(f, [10, 30], [0, 1], clamp),
        }}
      >
        Where our fleet has worked · Odisha
      </Interactive.Div>

      <Interactive.Div
        name="Mark"
        style={{
          position: "absolute",
          right: 90,
          top: 44,
          width: 56,
          height: 56,
          opacity: interpolate(f, [10, 30], [0, 1], clamp),
        }}
      >
        <AretusMark style={{ display: "block", width: "100%", height: "100%" }} />
      </Interactive.Div>

      {/* Yamuna Expressway inset */}
      <Interactive.Div
        name="Yamuna inset"
        style={{
          position: "absolute",
          right: 90,
          bottom: 110,
          width: 440,
          padding: "30px 34px",
          backgroundColor: color.asphalt,
          borderTop: `6px solid ${color.signal}`,
          opacity: interpolate(f, [240, 262], [0, 1], clamp),
          translate: interpolate(f, [240, 262], ["40px 0px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        <div style={{ fontFamily: mono, fontWeight: 500, fontSize: 18, letterSpacing: 3, color: color.steelLight, textTransform: "uppercase" }}>
          Outside Odisha
        </div>
        <div style={{ fontFamily: display, fontWeight: 600, fontSize: 48, lineHeight: 1.05, letterSpacing: -1, marginTop: 12 }}>
          Yamuna Expressway
        </div>
        <div style={{ fontSize: 24, marginTop: 12, color: color.dust }}>11 km earthwork · ₹108 Cr package · 150-person spread</div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
