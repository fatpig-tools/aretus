import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const HelloAretus: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white", fontSize: 120, fontFamily: "sans-serif", opacity }}>
        Aretus Enterprises
      </h1>
    </AbsoluteFill>
  );
};
