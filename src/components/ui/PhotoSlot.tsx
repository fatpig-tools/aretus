import Image from "next/image";
import { Camera } from "lucide-react";
import type { PhotoSlot as PhotoSlotType } from "@/content/types";

/**
 * Shows the real photograph once one is set; until then a designed placeholder that carries
 * the shot description from the content brief, so the photographer knows what to capture.
 */
export function PhotoSlot({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
}: {
  photo: PhotoSlotType;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (photo.src) {
    return (
      <div className={`relative overflow-hidden bg-asphalt ${className}`}>
        <Image src={photo.src} alt={photo.alt ?? ""} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <figure
      className={`grain relative flex overflow-hidden bg-gradient-to-br from-graphite via-asphalt to-charcoal ${className}`}
      aria-label={`Photo to come: ${photo.brief}`}
    >
      <svg aria-hidden className="absolute inset-0 size-full opacity-[0.18]" preserveAspectRatio="none" viewBox="0 0 400 300">
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M-20 ${40 + i * 30} C 90 ${10 + i * 32}, 180 ${80 + i * 26}, 420 ${30 + i * 31}`}
            fill="none"
            stroke="var(--steel-light)"
            strokeWidth="1"
          />
        ))}
      </svg>
      <figcaption className="relative mt-auto flex items-start gap-3 p-5 text-sm text-dust-dim">
        <Camera aria-hidden className="mt-0.5 size-4 shrink-0 text-signal" />
        <span>
          <span className="eyebrow block text-[0.7rem]">Photo slot</span>
          {photo.brief}
        </span>
      </figcaption>
    </figure>
  );
}
