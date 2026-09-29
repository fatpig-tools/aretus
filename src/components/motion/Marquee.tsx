"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Infinite horizontal ticker. Content is duplicated once; the copy is hidden from assistive tech. */
export function Marquee({ children, seconds = 40 }: { children: React.ReactNode; seconds?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex shrink-0 items-center"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: seconds, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
