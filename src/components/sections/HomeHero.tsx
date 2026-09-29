"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { HomePage } from "@/content/types";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroPoster } from "@/components/three/HeroVisual";

const HeroVisual = dynamic(() => import("@/components/three/HeroVisual"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

export function HomeHero({ hero }: { hero: HomePage["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <HeroVisual progress={scrollYProgress} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/10" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-charcoal/80 to-transparent" />

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="shell relative flex h-full flex-col justify-end pb-24 md:pb-20">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="eyebrow flex items-center gap-3"
        >
          <span aria-hidden className="h-px w-10 bg-signal" />
          Odisha · Transport &amp; Construction Fleet
        </motion.p>
        <SplitText
          as="h1"
          immediate
          delay={0.55}
          text={hero.headline}
          highlight={["own", "fleet"]}
          className="display mt-6 max-w-[14ch] text-[clamp(3.2rem,9.5vw,9.5rem)]"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,38rem)_1fr] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-lg text-dust/85 md:text-xl"
          >
            {hero.subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25 }}
            className="flex flex-wrap gap-3 lg:justify-end"
          >
            <MagneticButton href={hero.primaryCta.href}>{hero.primaryCta.label}</MagneticButton>
            <MagneticButton href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 right-[var(--gutter)] hidden items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-steel-light md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-signal"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
