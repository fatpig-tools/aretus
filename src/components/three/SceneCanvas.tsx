"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";

let webgl: boolean | undefined;
function hasWebGL() {
  if (webgl === undefined) {
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}
const noopSubscribe = () => () => {};

type SceneCanvasProps = {
  children: React.ReactNode;
  /** Rendered when WebGL is unavailable or the visitor prefers reduced motion. */
  fallback: React.ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  /** Must establish a positioning context (e.g. "relative h-96" or "absolute inset-0"). */
  className?: string;
};

/**
 * Shared R3F canvas: pauses rendering when offscreen, drops resolution on slow devices,
 * and shows a static fallback when WebGL or motion is not wanted.
 */
export function SceneCanvas({ children, fallback, camera, className = "relative" }: SceneCanvasProps) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const supported = useSyncExternalStore(noopSubscribe, hasWebGL, () => false);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showCanvas = supported && !reduce;

  return (
    <div ref={wrap} className={className}>
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${showCanvas && ready ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      >
        {fallback}
      </div>
      {showCanvas ? (
        <Canvas
          className={`absolute! inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          frameloop={visible ? "always" : "never"}
          dpr={[1, dpr]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: camera?.position ?? [8, 7, 26], fov: camera?.fov ?? 42, near: 0.1, far: 400 }}
          onCreated={() => requestAnimationFrame(() => setReady(true))}
          aria-hidden
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
