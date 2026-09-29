"use client";

import { motion } from "framer-motion";
import { createElement } from "react";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  /** Words to paint in the signal colour. */
  highlight?: string[];
};

/** Headline that rises word by word out of a mask. Screen readers get the plain sentence. */
export function SplitText({ text, as = "h2", className, delay = 0, immediate, highlight = [] }: SplitTextProps) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return createElement(
    as,
    { className, "aria-label": text },
    <motion.span aria-hidden initial="hidden" {...trigger} className="inline">
      {words.map((word, i) => {
        const bare = word.replace(/[.,:;!?]/g, "");
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${highlight.includes(bare) ? "text-signal" : ""}`}
              variants={{
                hidden: { y: "110%" },
                show: { y: "0%", transition: { duration: 0.9, delay: delay + i * 0.055, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </motion.span>,
  );
}
