"use client";

import dynamic from "next/dynamic";
import type { MachineModel, PhotoSlot as PhotoSlotType } from "@/content/types";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

const MachineViewer = dynamic(() => import("@/components/three/MachineViewer"), { ssr: false });

/** A real photograph when one has been uploaded, otherwise the machine in 3D (photo brief as fallback). */
export function MachineVisual({ photo, model, className = "" }: { photo: PhotoSlotType; model: MachineModel; className?: string }) {
  if (photo.src) return <PhotoSlot photo={photo} className={className} />;
  return (
    <div className={`relative overflow-hidden border border-line bg-asphalt ${className}`}>
      <MachineViewer model={model} className="absolute inset-0" fallback={<PhotoSlot photo={photo} className="size-full" />} />
      <p className="pointer-events-none absolute bottom-4 right-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-steel-light">
        Drag to rotate
      </p>
    </div>
  );
}
