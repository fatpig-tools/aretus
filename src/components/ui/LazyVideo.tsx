"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type LazyVideoProps = {
  name: string;
  loop?: boolean;
  className?: string;
};

/**
 * Muted, inline video from /public/video/<name>.{webm,mp4} with a poster. Starts downloading only
 * when it nears the viewport, plays when visible, pauses when not, and stays on the poster for
 * visitors who prefer reduced motion.
 */
export function LazyVideo({ name, loop = true, className = "" }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, { once: true, margin: "400px 0px" });
  const visible = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce || !near) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, near, reduce]);

  return (
    <video
      ref={ref}
      aria-hidden
      className={className}
      muted
      playsInline
      loop={loop}
      preload="none"
      poster={`/video/${name}-poster.jpg`}
    >
      {near && !reduce ? (
        <>
          <source src={`/video/${name}.webm`} type="video/webm" />
          <source src={`/video/${name}.mp4`} type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
