import { SplitText } from "@/components/motion/SplitText";

export function SectionHeading({
  index,
  eyebrow,
  title,
  highlight,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  highlight?: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow flex items-center gap-3">
        {index ? <span className="text-signal">{index}</span> : null}
        <span aria-hidden className="h-px w-8 bg-line" />
        {eyebrow}
      </p>
      <SplitText
        text={title}
        highlight={highlight}
        className="display mt-5 max-w-4xl text-h2"
      />
    </div>
  );
}
