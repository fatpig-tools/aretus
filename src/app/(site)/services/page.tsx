import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getHomePage, getServicesPage } from "@/content";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getServicesPage({ stega: false });
  return { title: seo.title, description: seo.description, alternates: { canonical: "/services" } };
}

export default async function ServicesPage() {
  const [page, home] = await Promise.all([getServicesPage(), getHomePage()]);
  return (
    <>
      <PageHero eyebrow="Services" headline={page.headline} highlight={["one"]}>
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {page.services.map((s) => (
            <a
              key={s._key}
              href={`#${s.slug}`}
              className="border border-line px-4 py-2 font-display text-base font-semibold uppercase tracking-wide transition-colors hover:border-signal hover:text-signal"
            >
              {s.number} · {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {page.services.map((s, i) => (
        <section
          key={s._key}
          id={s.slug}
          className="scroll-mt-24 border-t border-line py-20 md:py-32"
        >
          <div className={`shell grid gap-12 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <p className="display text-[clamp(5rem,12vw,10rem)] leading-none text-signal/90" aria-hidden>
                {s.number}
              </p>
              <SplitText as="h2" text={s.title} className="display mt-2 text-[clamp(2.4rem,5vw,4.5rem)]" />
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-2xl text-lg text-dust/85">{s.body}</p>
              </Reveal>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Reveal delay={0.15}>
                  <h3 className="eyebrow">Best for</h3>
                  <ul className="mt-4 space-y-2">
                    {s.bestFor.map((b) => (
                      <li key={b} className="flex gap-3">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-signal" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2}>
                  <h3 className="eyebrow">Fleet deployed</h3>
                  <ul className="mt-4 space-y-2">
                    {s.fleetDeployed.map((f) => (
                      <li key={f} className="border-l-2 border-signal pl-3">
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
            <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
              <PhotoSlot photo={s.photo} className="aspect-[4/3]" />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="border-t border-line bg-asphalt py-24 md:py-32">
        <div className="shell">
          <SectionHeading index="04" eyebrow="Engagement models" title="Hire it the way your contract works." highlight={["contract"]} />
          <Reveal delay={0.1} className="mt-14">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Engagement models, how each works, and what it suits</caption>
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-line">
                  {["Model", "How it works", "Best for"].map((h) => (
                    <th key={h} scope="col" className="eyebrow py-4 pr-6 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.engagementModels.map((m) => (
                  <tr key={m._key} className="grid border-b border-line py-6 md:table-row md:py-0">
                    <th scope="row" className="display py-1 pr-6 text-3xl md:py-7 md:align-top">
                      {m.model}
                    </th>
                    <td className="py-1 pr-6 text-dust/85 md:py-7 md:align-top">{m.how}</td>
                    <td className="py-1 text-dust-dim md:py-7 md:align-top">
                      <span className="eyebrow mr-2 md:hidden">Best for</span>
                      {m.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-10 max-w-2xl text-lg text-dust-dim">{page.rateNote}</p>
          </Reveal>
        </div>
      </section>

      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
