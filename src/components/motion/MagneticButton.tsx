"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "signal" | "ghost" | "dark";
  className?: string;
};

const MotionLink = motion.create(Link);

/** CTA that leans toward the pointer. Falls back to a normal link on touch and reduced motion. */
export function MagneticButton({ href, children, variant = "signal", className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }

  const styles = {
    signal: "bg-signal text-charcoal hover:bg-dust",
    ghost: "border border-dust/30 text-dust hover:border-signal hover:text-signal",
    dark: "bg-charcoal text-dust hover:bg-asphalt",
  }[variant];

  return (
    <MotionLink
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={`group inline-flex min-h-12 cursor-pointer items-center gap-3 px-6 font-display text-lg font-bold uppercase tracking-wide transition-colors duration-200 ${styles} ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </MotionLink>
  );
}
