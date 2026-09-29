import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBanner({ body, cta }: { body: string; cta: { label: string; href: string } }) {
  const [lead, ...rest] = body.split("? ");
  return (
    <section className="relative overflow-hidden bg-signal text-charcoal">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2 bg-[repeating-linear-gradient(90deg,var(--charcoal)_0_48px,transparent_48px_80px)]" />
      <div className="shell relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <Reveal>
          <h2 className="display text-h2">{rest.length ? `${lead}?` : lead}</h2>
          {rest.length ? <p className="mt-6 max-w-2xl text-lg font-medium md:text-xl">{rest.join("? ")}</p> : null}
        </Reveal>
        <Reveal delay={0.15} className="lg:justify-self-end">
          <MagneticButton href={cta.href} variant="dark">
            {cta.label}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
