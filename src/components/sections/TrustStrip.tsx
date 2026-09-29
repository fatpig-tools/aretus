import type { Client } from "@/content/types";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { ClientLogo } from "@/components/ui/ClientLogo";

/** Client names as text (logos only with permission, per the brief). */
export function TrustStrip({ line, clients }: { line: string; clients: Client[] }) {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Reveal className="shell">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-signal">03</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          On site with
        </p>
        <ScrubText text={line} className="display mt-5 max-w-4xl text-h2" />
      </Reveal>
      <div className="mt-14">
        <Marquee seconds={45}>
          {clients.map((c) => (
            <span key={c._key} className="group mr-4 flex shrink-0">
              <ClientLogo client={c} size="sm" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
