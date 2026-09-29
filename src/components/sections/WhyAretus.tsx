"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Feature } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * Desktop: the section pins while its cards travel sideways along a road line.
 * Mobile and reduced motion: a plain vertical list (the pin is desktop-only via CSS).
 */
export function WhyAretus({ items }: { items: Feature[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-58%"]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={ref} className="relative bg-dust text-charcoal lg:h-[320vh]">
      <div className="overflow-hidden py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Why Aretus"
            title="Four reasons contractors call us back."
            className="[&_.eyebrow]:text-steel"
          />
        </div>
        <div className="relative mt-14 lg:mt-20">
          <motion.div aria-hidden className="road-dash absolute left-0 right-0 top-0 hidden h-1 origin-left lg:block" style={{ scaleX: lineScale }} />
          <motion.ol
            style={{ x }}
            className="shell flex flex-col gap-6 lg:w-max lg:flex-row lg:gap-8 lg:pt-12 max-lg:!transform-none"
          >
            {items.map((item, i) => (
              <li key={item._key} className="lg:w-[30rem]">
                <TiltCard className="flex h-full flex-col justify-between border-t-4 border-charcoal bg-[#dcd7cd] p-8 shadow-[0_30px_60px_-30px_rgba(17,20,23,0.35)] lg:h-[24rem] lg:p-10">
                <span className="font-mono text-sm text-charcoal/50">0{i + 1} / 04</span>
                <div>
                  <h3 className="display text-h3">{item.title}</h3>
                  <p className="mt-4 max-w-sm text-lg text-charcoal/75">{item.body}</p>
                </div>
                </TiltCard>
              </li>
            ))}
            <li className="hidden w-[20vw] lg:block" aria-hidden />
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
