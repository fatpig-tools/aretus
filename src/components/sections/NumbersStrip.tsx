import type { Stat } from "@/content/types";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

export function NumbersStrip({ numbers, video }: { numbers: Stat[]; video?: { mp4: string; webm?: string; poster?: string } }) {
  return (
    <section aria-label="Aretus in numbers" className="relative overflow-hidden border-y border-line bg-asphalt">
      {video ? (
        <video
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-25"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={video.poster}
        >
          {video.webm ? <source src={video.webm} type="video/webm" /> : null}
          <source src={video.mp4} type="video/mp4" />
        </video>
      ) : null}
      <dl className="shell relative grid grid-cols-2 lg:grid-cols-4">
        {numbers.map((n, i) => (
          <Reveal
            key={n._key}
            delay={i * 0.08}
            className={`flex flex-col-reverse justify-end gap-3 border-line py-10 pr-4 md:py-14 ${i % 2 ? "pl-4 md:pl-8" : ""} ${
              i < 2 ? "border-b lg:border-b-0" : ""
            } ${i % 2 === 0 ? "border-r" : "lg:border-r"} ${i === 3 ? "lg:border-r-0" : ""} ${i === 2 ? "lg:pl-8" : ""}`}
          >
            <dt className="max-w-[22ch] text-sm text-dust-dim md:text-base">{n.label}</dt>
            <dd className="display flex items-baseline gap-2 text-[clamp(3.2rem,7vw,6.5rem)] text-signal">
              <CountUp to={n.countTo} display={n.display} />
              {n.unit ? <span className="text-[0.4em] text-dust">{n.unit}</span> : null}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
