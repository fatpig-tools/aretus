import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Feature } from "@/content/types";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhatWeDo({ items }: { items: Feature[] }) {
  return (
    <section className="shell py-24 md:py-36">
      <SectionHeading index="01" eyebrow="What we do" title="Haulage, earthwork and heavy transport." highlight={["earthwork"]} />
      <Stagger as="ul" stagger={0.12} className="mt-16 border-t border-line">
        {items.map((item, i) => (
          <StaggerItem as="li" key={item._key}>
              <Link
                href={item.href ?? "/services"}
                className="group relative grid gap-4 overflow-hidden border-b border-line py-10 md:grid-cols-[6rem_1fr_1.1fr_auto] md:items-center md:gap-10 md:py-12"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <span className="relative font-mono text-sm text-steel-light transition-colors group-hover:text-charcoal">
                  0{i + 1}
                </span>
                <h3 className="display relative text-h3 transition-colors group-hover:text-charcoal">
                  {item.title}
                </h3>
                <p className="relative max-w-xl text-dust-dim transition-colors group-hover:text-charcoal">{item.body}</p>
                <ArrowUpRight
                  aria-hidden
                  className="relative size-10 text-signal transition-all duration-500 group-hover:rotate-45 group-hover:text-charcoal"
                />
              </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
