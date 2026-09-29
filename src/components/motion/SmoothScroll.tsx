"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -80 } });
    let frame = requestAnimationFrame(function raf(time) {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      lenis?.scrollTo(0, { immediate: true });
      return;
    }
    // Deep links such as /services#haulage: wait for the new page to paint.
    const id = requestAnimationFrame(() => lenis?.scrollTo(hash, { offset: -80 }));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
