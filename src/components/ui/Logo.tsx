import Link from "next/link";

/** Wordmark: condensed caps with a road-marking dash. Replace with the real logo when supplied. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Aretus Enterprises, home" className={`group inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="grid size-9 place-items-center bg-signal font-display text-xl font-extrabold text-charcoal">
        A
      </span>
      <span className="font-display text-xl font-extrabold uppercase leading-none tracking-wide">
        Aretus
        <span className="block text-[0.62rem] font-semibold tracking-[0.32em] text-steel-light">Enterprises</span>
      </span>
    </Link>
  );
}
