"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/**
 * Paragraph whose words light up in reading order as it scrolls through the viewport.
 * Screen readers and reduced-motion users get the plain text.
 */
export function ScrubText({ text, as = "p", className = "" }: { text: string; as?: "p" | "h2"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  const Tag = as;
  const scrubbed = (
    <span aria-hidden>
      {words.map((w, i) => (
        <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </span>
  );
  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {scrubbed}
      </Tag>
    </div>
  );
}
