"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FleetUnit } from "@/content/types";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

type FleetShowcaseProps = {
  units: FleetUnit[];
  /** Optional 3D stage; receives the active unit. Falls back to the unit's photo slot. */
  stage?: (unit: FleetUnit) => React.ReactNode;
};

/**
 * Sticky stage on the left, unit specs scrolling on the right. Whichever spec block is
 * nearest the middle of the viewport drives the stage.
 */
export function FleetShowcase({ units, stage }: FleetShowcaseProps) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const unit = units[active];

  return (
    <div className="shell grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div className="relative hidden lg:block">
        <div className="sticky top-24 h-[calc(100vh-8rem)]">
          <div className="relative h-full overflow-hidden border border-line bg-asphalt">
            {stage ? (
              stage(unit)
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={unit._key}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <PhotoSlot photo={unit.photo} className="size-full" />
                </motion.div>
              </AnimatePresence>
            )}
            <div className="pointer-events-none absolute left-6 top-6 flex items-baseline gap-3">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.qty + unit._key}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  className="display text-8xl text-signal"
                >
                  ×{unit.qty}
                </motion.span>
              </AnimatePresence>
            </div>
            <ol className="absolute bottom-6 left-6 flex gap-2" aria-hidden>
              {units.map((u, i) => (
                <li key={u._key} className={`h-1 w-8 transition-colors duration-300 ${i === active ? "bg-signal" : "bg-dust/20"}`} />
              ))}
            </ol>
          </div>
        </div>
      </div>

      <ol className="lg:py-[18vh]">
        {units.map((u, i) => (
          <li
            key={u._key}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            className="border-t border-line py-12 transition-opacity duration-500 lg:min-h-[70vh] lg:py-16 lg:[&:not([data-active=true])]:opacity-35"
            data-active={i === active}
          >
            <p className="eyebrow">
              Qty <span className="text-signal">{u.qty}</span>
            </p>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.5vw,4rem)]">{u.name}</h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="eyebrow">Key specs</dt>
                <dd className="mt-2 text-lg text-dust/85">{u.keySpecs}</dd>
              </div>
              <div>
                <dt className="eyebrow">Typical use</dt>
                <dd className="mt-2 text-lg text-dust/85">{u.typicalUse}</dd>
              </div>
            </dl>
            <div className="mt-8 lg:hidden">{stage ? <div className="relative aspect-[4/3] border border-line bg-asphalt">{stage(u)}</div> : <PhotoSlot photo={u.photo} className="aspect-[4/3]" />}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
