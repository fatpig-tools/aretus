import type { StockPhoto } from "@/content/photos";

/** Caption that marks a photo as representative and credits it, as its licence requires. */
export function PhotoCredit({ photo, className = "" }: { photo: StockPhoto; className?: string }) {
  return (
    <p className={`font-mono text-[0.65rem] uppercase tracking-[0.12em] text-dust/55 ${className}`}>
      Representative photo ·{" "}
      <a href={photo.credit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-dust hover:underline">
        {photo.credit.author}
      </a>{" "}
      / {photo.credit.source}, {photo.credit.license}
    </p>
  );
}
