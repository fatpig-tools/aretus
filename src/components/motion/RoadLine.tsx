"use client";

import { motion } from "framer-motion";

/** Dashed road marking that paints itself left to right when scrolled into view. */
export function RoadLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`road-dash h-1 origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
