import { MagneticButton } from "@/components/motion/MagneticButton";

export default function NotFound() {
  return (
    <section className="grid-bg flex min-h-[80vh] items-center pt-24">
      <div className="shell">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3.5rem,11vw,10rem)]">
          Road <span className="text-signal">closed.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-dust-dim">This page has moved or never existed. Head back and we will get you where you need to go.</p>
        <div className="mt-10">
          <MagneticButton href="/">Back to home</MagneticButton>
        </div>
      </div>
    </section>
  );
}
