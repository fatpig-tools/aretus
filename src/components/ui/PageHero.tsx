import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { RoadLine } from "@/components/motion/RoadLine";

type PageHeroProps = {
  eyebrow: string;
  headline: string;
  intro?: string;
  highlight?: string[];
  children?: React.ReactNode;
};

/** Heading block for inner pages. */
export function PageHero({ eyebrow, headline, intro, highlight, children }: PageHeroProps) {
  return (
    <section className="grid-bg relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/40 to-charcoal" />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-signal" />
            {eyebrow}
          </p>
        </Reveal>
        <SplitText
          as="h1"
          immediate
          delay={0.3}
          text={headline}
          highlight={highlight}
          className="display mt-6 max-w-6xl text-[clamp(3rem,9vw,8.5rem)]"
        />
        {intro ? (
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-2xl text-lg text-dust-dim md:text-xl">{intro}</p>
          </Reveal>
        ) : null}
        {children}
        <RoadLine className="mt-14 w-40" />
      </div>
    </section>
  );
}
