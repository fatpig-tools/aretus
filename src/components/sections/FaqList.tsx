"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Faq } from "@/content/types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?._key ?? null);
  return (
    <Stagger as="ul" className="border-t border-line">
      {faqs.map((f) => {
        const isOpen = open === f._key;
        return (
          <StaggerItem as="li" key={f._key} className="border-b border-line">
            <h2>
              <button
                type="button"
                id={`faq-q-${f._key}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${f._key}`}
                onClick={() => setOpen(isOpen ? null : f._key)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left display text-h3 leading-snug transition-colors hover:text-signal"
              >
                {f.question}
                <Plus
                  aria-hidden
                  className={`size-7 shrink-0 text-signal transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${f._key}`}
                  role="region"
                  aria-labelledby={`faq-q-${f._key}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-8 text-lg text-dust-dim">{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
