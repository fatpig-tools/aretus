"use client";

import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import type { MachineModel } from "@/content/types";
import { SceneCanvas } from "./SceneCanvas";
import { Excavator, Machine, Tipper } from "./Machines";

/** Studio lighting built from local light-formers (no HDR download). */
function StudioLights() {
  return (
    <>
      <hemisphereLight args={["#c9d6e2", "#111417", 0.6]} />
      <directionalLight position={[8, 12, 6]} intensity={2.2} color="#fff1d6" />
      <directionalLight position={[-10, 6, -8]} intensity={0.8} color="#8fa9bf" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 6, 6]} scale={[12, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2} position={[-8, 3, -2]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} color="#8fa9bf" />
        <Lightformer form="rect" intensity={1.5} position={[8, 2, -4]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#f2b705" />
        <Lightformer form="ring" intensity={1} position={[0, 10, -10]} scale={4} color="#ffffff" />
      </Environment>
    </>
  );
}

/** Tipper whose box rises and settles on a slow cycle. */
function CyclingTipper() {
  const [tip, setTip] = useState(0);
  const t = useRef(0);
  useFrame((_, dt) => {
    t.current += dt;
    // Hold down, raise, hold up, lower: 8 s cycle.
    const c = (t.current % 8) / 8;
    const v = c < 0.3 ? 0 : c < 0.45 ? (c - 0.3) / 0.15 : c < 0.75 ? 1 : c < 0.9 ? 1 - (c - 0.75) / 0.15 : 0;
    const eased = v * v * (3 - 2 * v);
    if (Math.abs(eased - tip) > 0.002) setTip(eased);
  });
  return <Tipper tip={tip} />;
}

/** Prime mover carrying the excavator on its trailer, as it does between package sites. */
function LoadedPrimeMover() {
  return (
    <group>
      <Machine model="primeMover" />
      <Excavator position={[0, 1.02, -3]} />
    </group>
  );
}

function Turntable({ model }: { model: MachineModel }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.12;
  });
  return (
    <group ref={group} rotation-y={-0.6}>
      {model === "tipper" ? <CyclingTipper /> : model === "primeMover" ? <LoadedPrimeMover /> : <Machine model={model} />}
    </group>
  );
}

const framing: Record<MachineModel, { position: [number, number, number]; target: number }> = {
  tipper: { position: [13, 7, 13], target: 2.4 },
  hyva: { position: [11, 5.5, 11], target: 1.8 },
  primeMover: { position: [17, 8, 17], target: 2.4 },
  excavator: { position: [11, 6, 11], target: 2.2 },
};

/** Eases the camera and orbit target to the framing for the current model when it changes. */
function Framing({ model }: { model: MachineModel }) {
  const { camera, controls } = useThree();
  const to = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    const f = framing[model];
    const k = 1 - Math.pow(0.02, dt);
    to.current.set(...f.position);
    // Keep the visitor's orbit angle; only move toward the model's distance and height.
    const dir = camera.position.clone().setY(0).normalize();
    const flat = Math.hypot(f.position[0], f.position[2]);
    to.current.set(dir.x * flat, f.position[1], dir.z * flat);
    camera.position.lerp(to.current, k);
    const target = (controls as OrbitControlsImpl | null)?.target;
    if (target) target.lerp(new THREE.Vector3(0, f.target - 1.2, 0), k);
  });
  return null;
}

type MachineViewerProps = {
  model: MachineModel;
  fallback: React.ReactNode;
  className?: string;
  /** Let visitors drag to orbit. */
  interactive?: boolean;
};

/** Turntable stage for one machine, with drag-to-orbit and a static fallback. */
export default function MachineViewer({ model, fallback, className = "relative", interactive = true }: MachineViewerProps) {
  const f = framing[model];
  return (
    <SceneCanvas className={className} fallback={fallback} camera={{ position: f.position, fov: 32 }}>
      <color attach="background" args={["#1b2026"]} />
      <fog attach="fog" args={["#1b2026", 30, 60]} />
      <StudioLights />
      <group position-y={-1.2}>
        <Turntable key={model} model={model} />
        <ContactShadows position-y={0.01} scale={24} blur={2.4} opacity={0.65} far={6} resolution={512} color="#000000" />
        <gridHelper args={[40, 40, "#3e5c76", "#262d35"]} position-y={0} />
      </group>
      <Framing model={model} />
      {interactive ? (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          target={[0, f.target - 1.2, 0]}
          minPolarAngle={0.6}
          maxPolarAngle={1.45}
          makeDefault
        />
      ) : null}
    </SceneCanvas>
  );
}
