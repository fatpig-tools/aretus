"use client";

import type { MotionValue } from "framer-motion";
import { SceneCanvas } from "./SceneCanvas";
import { HaulRoadScene } from "./HaulRoadScene";

/** Static stand-in used before WebGL loads, and for reduced motion. */
export function HeroPoster() {
  return (
    <div className="grid-bg absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#3e5c76_0%,#1b2026_45%,#111417_75%)]">
      <svg aria-hidden className="absolute inset-0 size-full opacity-25" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 14 }, (_, i) => (
          <path
            key={i}
            d={`M-50 ${420 + i * 38} C 380 ${340 + i * 44}, 900 ${520 + i * 30}, 1650 ${380 + i * 40}`}
            fill="none"
            stroke="#8fa9bf"
            strokeWidth="1"
          />
        ))}
        <path d="M760 900 C 820 700, 900 600, 1000 480" stroke="#f2b705" strokeWidth="4" strokeDasharray="28 20" fill="none" />
      </svg>
    </div>
  );
}

export default function HeroVisual({ progress }: { progress: MotionValue<number> }) {
  return (
    <SceneCanvas className="absolute inset-0" fallback={<HeroPoster />}>
      <HaulRoadScene progress={progress} />
    </SceneCanvas>
  );
}
