import type { Metadata } from "next";
import { getAboutPage, getHomePage } from "@/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { AreaMap } from "@/components/sections/AreaMap";
import { ImageBand } from "@/components/sections/ImageBand";
import { photos } from "@/content/photos";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutPage({ stega: false });
  return { title: seo.title, description: seo.description, alternates: { canonical: "/about" } };
}

export default async function AboutPage() {
  const [about, home] = await Promise.all([getAboutPage(), getHomePage()]);
  const [lead, ...rest] = about.story;
  return (
    <>
      <PageHero eyebrow="About us" headline={about.headline} highlight={["owns"]} />

      <section className="shell grid gap-12 pb-24 md:pb-36 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <Reveal>
          <p className="text-2xl leading-snug text-dust md:text-[2rem]">{lead}</p>
        </Reveal>
        <div className="space-y-6 text-lg text-dust-dim">
          {rest.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ImageBand photo={photos["expressway-aerial"]} />

      <section className="border-t border-line bg-asphalt py-24 md:py-36">
        <div className="shell">
          <SectionHeading index="01" eyebrow="How we work" title="Five habits you can hold us to." highlight={["habits"]} />
          <ol className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {about.principles.map((p, i) => (
              <li key={p._key} className="bg-asphalt">
                <Reveal delay={(i % 3) * 0.08} className="flex h-full flex-col gap-6 p-8 md:p-10">
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  <h3 className="display text-h3">{p.title}</h3>
                  <p className="text-dust-dim">
                    <span className="sr-only">What it means for you: </span>
                    {p.body}
                  </p>
                </Reveal>
              </li>
            ))}
            <li className="bg-signal text-charcoal md:col-span-2 lg:col-span-1">
              <Link href="/fleet" className="group flex h-full min-h-56 flex-col justify-between p-8 md:p-10">
                <span className="font-mono text-xs uppercase tracking-[0.12em]">See it for yourself</span>
                <span className="display flex items-end justify-between gap-4 text-4xl">
                  Meet the fleet
                  <ArrowUpRight aria-hidden className="size-10 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>
            </li>
          </ol>
        </div>
      </section>

      <section className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading index="02" eyebrow="Where we work" title="Odisha first. Further for the right package." />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg text-dust-dim">{about.whereWeWork}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {about.areas.map((a) => (
                <li key={a} className="border border-line px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.12em]">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <AreaMap />
        </Reveal>
      </section>

      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
