"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = { to?: number; display: string; className?: string };

/** Counts from 0 to `to` when visible, then settles on the exact `display` string (e.g. "250+"). */
export function CountUp({ to, display, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to === undefined ? display : "0");

  useEffect(() => {
    if (to === undefined || !inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v).toString()),
      onComplete: () => setValue(display),
    });
    return () => controls.stop();
  }, [inView, to, display, reduce]);

  return (
    <span ref={ref} className={className} aria-label={display}>
      <span aria-hidden className="tabular-nums">
        {reduce ? display : value}
      </span>
    </span>
  );
}
