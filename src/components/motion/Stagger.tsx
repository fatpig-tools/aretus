"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

type StaggerProps = HTMLMotionProps<"div"> & { stagger?: number; as?: "div" | "ul" | "ol" | "dl" | "tbody" };

/** Reveals its StaggerItem children one after another when scrolled into view. */
export function Stagger({ stagger = 0.08, as = "div", children, ...rest }: StaggerProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & { as?: "div" | "li" | "tr" };

export function StaggerItem({ as = "div", children, ...rest }: StaggerItemProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag variants={item} {...rest}>
      {children}
    </Tag>
  );
}
