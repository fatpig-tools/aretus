import { AbsoluteFill, Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { color } from "./brand";

/**
 * Seamless background loop for the numbers strip: drifting survey contours, lane dashes and a
 * scan line. Every motion is periodic over the composition length, so the last frame meets the first.
 */
export const SurveyLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const t = frame / durationInFrames; // 0 → 1 over one loop
  const phase = t * Math.PI * 2;

  const contours = Array.from({ length: 22 }, (_, i) => {
    const base = (i / 21) * height * 1.2 - height * 0.1;
    const amp = 40 + (i % 5) * 14;
    const pts: string[] = [];
    for (let x = -40; x <= width + 40; x += 40) {
      const y =
        base +
        Math.sin(x * 0.0021 + i * 0.7 + phase) * amp +
        Math.sin(x * 0.0057 - i * 0.3 - phase * 2) * amp * 0.25;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return { d: `M${pts.join(" L")}`, major: i % 4 === 0 };
  });

  const dashPeriod = 140;
  const dashOffset = -t * dashPeriod * 3; // three whole periods per loop

  return (
    <AbsoluteFill name="Survey loop" style={{ backgroundColor: color.charcoal }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {contours.map((c, i) => (
          <path
            key={i}
            d={c.d}
            fill="none"
            stroke={c.major ? color.steelLight : color.steel}
            strokeOpacity={c.major ? 0.55 : 0.35}
            strokeWidth={c.major ? 2 : 1.2}
          />
        ))}
        <line
          x1={-100}
          y1={height * 0.78}
          x2={width + 100}
          y2={height * 0.52}
          stroke={color.signal}
          strokeWidth={10}
          strokeDasharray={`90 ${dashPeriod - 90}`}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <Interactive.Div
        name="Scan line"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 240,
          left: -240,
          translate: `${t * (width + 480)}px 0px`,
          background: `linear-gradient(90deg, transparent, ${color.steelLight}33, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
