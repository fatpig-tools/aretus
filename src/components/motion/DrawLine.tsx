"use client";

import { motion } from "framer-motion";

/** Short rule that draws itself from the left when it scrolls into view. */
export function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    />
  );
}
