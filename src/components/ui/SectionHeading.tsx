import { SplitText } from "@/components/motion/SplitText";
import { DrawLine } from "@/components/motion/DrawLine";

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
        <DrawLine className="h-px w-8 bg-current opacity-40" />
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
