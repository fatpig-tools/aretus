"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { StockPhoto } from "@/content/photos";
import { Reveal } from "@/components/motion/Reveal";

type ImageBandProps = {
  photo: StockPhoto;
  eyebrow?: string;
  statement?: string;
};

/** Full-bleed photograph with slow parallax and an optional statement over a dark gradient. */
export function ImageBand({ photo, eyebrow, statement }: ImageBandProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Opens from an inset frame to full bleed as it arrives, while the photo settles from a slight zoom.
  const clipPath = useTransform(scrollYProgress, [0, 0.4], ["inset(14% 10% 14% 10%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [1.18, 1]);

  return (
    <section ref={ref} className="relative h-[70svh] min-h-[420px] overflow-hidden bg-charcoal md:h-[80svh]">
      <motion.div style={{ clipPath }} className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute -inset-y-[10%] inset-x-0">
          <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10" />
      </motion.div>
      <div className="shell relative flex h-full flex-col justify-end pb-12 md:pb-16">
        {statement ? (
          <Reveal className="max-w-3xl">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <p className="display mt-4 text-h2">{statement}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
