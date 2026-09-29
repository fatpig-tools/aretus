import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getHomePage, getProjectsPage } from "@/content";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import Image from "next/image";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { photos } from "@/content/photos";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getProjectsPage({ stega: false });
  return { title: seo.title, description: seo.description, alternates: { canonical: "/projects" } };
}

export default async function ProjectsPage() {
  const [page, home] = await Promise.all([getProjectsPage(), getHomePage()]);
  return (
    <>
      <PageHero eyebrow="Projects" headline={page.headline} highlight={["again."]} />

      <section className="shell pb-10">
        <Reveal>
          <figure className="relative overflow-hidden border border-line bg-charcoal">
            <LazyVideo name="project-routes" loop={false} className="block aspect-video w-full" />
            <figcaption className="sr-only">
              Map of our work: AIPL&apos;s 160 km Angul–Sambalpur package, Gayatri&apos;s 46 km Hindol–Angul package,
              Chandikhol, mining haulage at Barbil, the Mayurbhanj dam, and the Yamuna Expressway outside Odisha.
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section aria-label="Case studies" className="shell py-16 md:py-24">
        <ol className="border-t border-line">
          {page.projects.map((p, i) => (
            <li key={p._key}>
              <Reveal delay={0.04 * i}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid gap-6 border-b border-line py-10 transition-colors md:grid-cols-[4rem_1fr_10rem_auto] md:items-center md:gap-10 md:py-12 lg:grid-cols-[4rem_14rem_1fr_10rem_auto]"
                >
                  <span className="font-mono text-sm text-steel-light">0{i + 1}</span>
                  <div className="relative hidden aspect-[4/3] overflow-hidden bg-asphalt lg:block">
                    {p.photo ? (
                      <Image
                        src={photos[p.photo].src}
                        alt=""
                        fill
                        sizes="14rem"
                        className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="grid-bg size-full" />
                    )}
                  </div>
                  <div>
                    <p className="eyebrow">
                      {p.sector} · {p.client}
                    </p>
                    <h2 className="display mt-3 text-h3 transition-colors group-hover:text-signal">
                      {p.title}
                    </h2>
                    {p.location ? <p className="mt-3 text-dust-dim">{p.location}</p> : null}
                  </div>
                  <div className="md:text-right">
                    {p.km ? (
                      <p className="display text-stat text-signal">
                        {p.km}
                        <span className="ml-1 text-2xl text-dust">km</span>
                      </p>
                    ) : null}
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="size-10 text-dust/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-signal"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
