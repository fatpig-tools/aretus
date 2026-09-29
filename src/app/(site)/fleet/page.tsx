import type { Metadata } from "next";
import { getFleetPage, getHomePage } from "@/content";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { FleetShowcase } from "@/components/sections/FleetShowcase";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getFleetPage({ stega: false });
  return { title: seo.title, description: seo.description, alternates: { canonical: "/fleet" } };
}

export default async function FleetPage() {
  const [fleet, home] = await Promise.all([getFleetPage(), getHomePage()]);
  const tippers = fleet.units.filter((u) => u.model === "tipper" || u.model === "hyva").reduce((n, u) => n + u.qty, 0);
  const movers = fleet.units.filter((u) => u.model === "primeMover").reduce((n, u) => n + u.qty, 0);
  const excavators = fleet.units.filter((u) => u.model === "excavator").reduce((n, u) => n + u.qty, 0);
  const total = tippers + movers + excavators;

  return (
    <>
      <PageHero eyebrow="Our fleet" headline={fleet.headline} intro={fleet.intro} highlight={["owned."]} />

      <FleetShowcase units={fleet.units} />

      <section aria-label="Fleet summary" className="border-y border-line bg-asphalt">
        <Reveal className="shell flex flex-wrap items-baseline gap-x-6 gap-y-4 py-16 md:py-24">
          {[
            { n: tippers, label: "tippers" },
            { n: movers, label: "prime movers" },
            { n: excavators, label: "excavator" },
          ].map((s, i) => (
            <span key={s.label} className="flex items-baseline gap-3">
              {i > 0 ? <span className="display text-5xl text-steel-light">+</span> : null}
              <span className="display text-[clamp(3.5rem,8vw,7rem)]">
                <CountUp to={s.n} display={String(s.n)} />
              </span>
              <span className="font-display text-xl font-semibold uppercase tracking-wide text-dust-dim">{s.label}</span>
            </span>
          ))}
          <span className="display text-5xl text-steel-light">=</span>
          <span className="flex items-baseline gap-3">
            <span className="display text-[clamp(3.5rem,8vw,7rem)] text-signal">
              <CountUp to={total} display={String(total)} />
            </span>
            <span className="font-display text-xl font-semibold uppercase tracking-wide text-dust-dim">owned units</span>
          </span>
          <p className="sr-only">{fleet.summary}</p>
        </Reveal>
      </section>

      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
