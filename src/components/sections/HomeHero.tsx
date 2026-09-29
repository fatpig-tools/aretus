"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import type { Feature, HomePage } from "@/content/types";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroPoster } from "@/components/three/HeroVisual";

const HeroVisual = dynamic(() => import("@/components/three/HeroVisual"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

const ease = [0.16, 1, 0.3, 1] as const;
const MotionLink = motion.create(Link);

export function HomeHero({ hero, services }: { hero: HomePage["hero"]; services: Feature[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <HeroVisual progress={scrollYProgress} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-charcoal/85 via-charcoal/40 to-transparent lg:w-2/3" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/80 to-transparent" />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="shell relative flex h-full flex-col pb-24 pt-24 md:pt-28 lg:pb-8"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="eyebrow flex items-center gap-3"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-signal" />
          Odisha, India · Transport &amp; construction fleet
        </motion.p>

        <div className="mt-auto grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SplitText
              as="h1"
              immediate
              delay={0.5}
              text={hero.headline}
              highlight={["own", "fleet"]}
              className="display max-w-[17ch] text-hero"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.9, ease }}
              className="mt-6 max-w-[34rem] text-base leading-relaxed text-dust/75 md:text-lg"
            >
              {hero.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.9, ease }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <MagneticButton href={hero.primaryCta.href}>{hero.primaryCta.label}</MagneticButton>
              <MagneticButton href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Title-block rail: the three services as an index, plus a scroll cue. */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { delayChildren: 1.3, staggerChildren: 0.1 } } }}
          className="relative mt-12 hidden pt-5 md:grid md:grid-cols-4 md:gap-8 lg:mt-16"
        >
          <motion.span
            aria-hidden
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease } } }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-dust/15"
          />
          {services.map((s, i) => (
            <MotionLink
              key={s._key}
              href={s.href ?? "/services"}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              className="group flex items-baseline gap-3 text-sm text-dust/70 transition-colors hover:text-dust"
            >
              <span className="font-mono text-xs text-signal">0{i + 1}</span>
              <span className="relative">
                {s.title}
                <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </MotionLink>
          ))}
          <motion.span
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-[0.14em] text-steel-light"
          >
            Scroll
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown aria-hidden className="size-3.5" />
            </motion.span>
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
