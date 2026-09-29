import Link from "next/link";

/** Wordmark: expanded grotesk with a mono descriptor. Replace with the real logo when supplied. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Aretus Enterprises, home" className={`group inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="grid size-8 place-items-center bg-signal text-charcoal">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
          <path d="M12 3 3 21h4.2l1.7-3.8h6.2l1.7 3.8H21L12 3Zm-1.6 11 1.6-3.7 1.6 3.7h-3.2Z" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="display block text-[1.15rem] tracking-[-0.02em]">Aretus</span>
        <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.28em] text-steel-light">Enterprises</span>
      </span>
    </Link>
  );
}
