import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getHomePage, getProject, getProjectsPage } from "@/content";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { AreaMap } from "@/components/sections/AreaMap";

export async function generateStaticParams() {
  const { projects } = await getProjectsPage();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject((await params).slug, { stega: false });
  if (!project) return {};
  return {
    title: `${project.title} | Aretus Projects`,
    description: project.body,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [project, { projects }, home] = await Promise.all([getProject(slug), getProjectsPage(), getHomePage()]);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "Client", value: project.client },
    { label: "Location", value: project.location },
    { label: "Scope", value: project.scope },
    { label: "Sector", value: project.sector },
  ].filter((f) => f.value);

  return (
    <>
      <PageHero eyebrow={`Project · ${project.sector}`} headline={project.title}>
        <Link href="/projects" className="mt-10 inline-flex items-center gap-2 text-dust-dim transition-colors hover:text-signal">
          <ArrowLeft aria-hidden className="size-4" /> All projects
        </Link>
      </PageHero>

      <section className="shell grid gap-14 pb-24 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <Reveal>
          <dl className="border-t border-line">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5">
                <dt className="eyebrow pt-1">{f.label}</dt>
                <dd className="text-lg">{f.value}</dd>
              </div>
            ))}
          </dl>
          {project.km ? (
            <p className="display mt-10 text-[clamp(5rem,10vw,8rem)] text-signal">
              {project.km}
              <span className="ml-2 text-[0.35em] text-dust">km of highway</span>
            </p>
          ) : null}
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <p className="text-2xl leading-snug md:text-3xl">{project.body}</p>
          </Reveal>
          {project.result ? (
            <Reveal delay={0.2} className="mt-12 border-l-4 border-signal bg-asphalt p-8">
              <p className="eyebrow">Result</p>
              <p className="mt-3 text-xl">{project.result}</p>
            </Reveal>
          ) : null}
          {project.place ? (
            <Reveal delay={0.25} className="mt-12">
              <AreaMap highlight={project.place} />
            </Reveal>
          ) : null}
        </div>
      </section>

      {next && next.slug !== slug ? (
        <Link href={`/projects/${next.slug}`} className="group block border-t border-line">
          <div className="shell flex items-center justify-between gap-8 py-14 md:py-20">
            <div>
              <p className="eyebrow">Next project</p>
              <p className="display mt-3 text-[clamp(2rem,5vw,4.5rem)] transition-colors group-hover:text-signal">{next.title}</p>
            </div>
            <ArrowRight aria-hidden className="size-12 shrink-0 text-signal transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </Link>
      ) : null}

      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
