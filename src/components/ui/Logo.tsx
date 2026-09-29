import Link from "next/link";
import { AretusMark } from "./AretusMark";

/** Lockup: the road-marking "A" mark beside an expanded wordmark and mono descriptor. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Aretus Enterprises, home" className={`group inline-flex items-center gap-3 ${className}`}>
      <AretusMark className="size-9 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-3 group-hover:scale-105" />
      <span className="leading-none">
        <span className="display block text-[1.2rem] tracking-[-0.02em]">Aretus</span>
        <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-steel-light">Enterprises</span>
      </span>
    </Link>
  );
}
