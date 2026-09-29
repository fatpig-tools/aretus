"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MachineModel } from "@/content/types";

/** Real-world length (metres) each model is scaled to, and its file. */
const SPEC: Record<MachineModel, { url: string; length: number }> = {
  tipper: { url: "/models/tipper.glb", length: 8.3 },
  hyva: { url: "/models/hyva.glb", length: 8 },
  primeMover: { url: "/models/prime-mover.glb", length: 15 },
  excavator: { url: "/models/excavator.glb", length: 9.5 },
};

export function preloadMachines(models: MachineModel[] = ["tipper", "excavator"]) {
  models.forEach((m) => useGLTF.preload(SPEC[m].url));
}

/**
 * Clones a loaded scene, scales it to `length` along its longest horizontal axis,
 * centres it on X/Z and stands it on y = 0. Returns the prepared root.
 */
function useNormalised(url: string, length: number) {
  const { scene } = useGLTF(url);
  return useMemo(() => {
    const root = scene.clone(true);
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const scale = length / Math.max(size.x, size.z);
    const wrapper = new THREE.Group();
    root.position.set(-(box.min.x + size.x / 2), -box.min.y, -(box.min.z + size.z / 2));
    const inner = new THREE.Group();
    inner.add(root);
    inner.scale.setScalar(scale);
    wrapper.add(inner);
    wrapper.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      // Some exports flag opaque paint as transparent, which breaks depth sorting.
      for (const mat of ([] as THREE.Material[]).concat(mesh.material)) {
        if (!/glass/i.test(mat.name)) {
          mat.transparent = false;
          mat.depthWrite = true;
        }
      }
    });
    return wrapper;
  }, [scene, length]);
}

let shadowTexture: THREE.Texture | null = null;
function getShadowTexture() {
  if (shadowTexture) return shadowTexture;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 8, 64, 64, 64);
  grad.addColorStop(0, "rgba(0,0,0,0.85)");
  grad.addColorStop(0.55, "rgba(0,0,0,0.45)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  shadowTexture = new THREE.CanvasTexture(c);
  return shadowTexture;
}

/** Soft elliptical shadow sized to the machine's footprint, so it sits on terrain without shadow maps. */
function GroundShadow({ object }: { object: THREE.Object3D }) {
  const size = useMemo(() => new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3()), [object]);
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={0.04} renderOrder={-1}>
      <planeGeometry args={[size.x * 1.5, size.z * 1.25]} />
      <meshBasicMaterial map={getShadowTexture()} transparent depthWrite={false} opacity={0.75} />
    </mesh>
  );
}

/** Re-parents `node` under a pivot placed at `pivotWorld`, so rotating the pivot hinges the node there. */
function hinge(node: THREE.Object3D, pivotWorld: THREE.Vector3) {
  const parent = node.parent!;
  parent.updateMatrixWorld(true);
  const pivot = new THREE.Group();
  pivot.position.copy(parent.worldToLocal(pivotWorld.clone()));
  parent.add(pivot);
  pivot.updateMatrixWorld(true);
  pivot.attach(node);
  return pivot;
}

// three.js objects are mutable scene state; these helpers keep the mutation out of render code.
function setTipAngle(pivot: THREE.Object3D | null, tip: number) {
  if (pivot) pivot.rotation.x = -tip * 0.85;
}
function turnWheels(wheels: THREE.Object3D[], radians: number) {
  for (const w of wheels) w.rotation.x += radians;
}

export type MachineHandle = {
  group: THREE.Group | null;
  /** Turns every wheel by `radians` (use for vehicles moved by code). */
  spinWheels?: (radians: number) => void;
};

type MachineProps = Omit<ThreeElements["group"], "ref"> & {
  /** 0 = box down, 1 = fully tipped (tippers only). */
  tip?: number;
  /** Wheel angular speed in radians per second. */
  wheelSpeed?: number;
};

/** Tata Signa 2823.K stand-in: white cab-over tipper with a separately hinged box. */
export const Tipper = forwardRef<MachineHandle, MachineProps>(function Tipper({ tip = 0, wheelSpeed = 0, ...props }, ref) {
  const root = useNormalised(SPEC.tipper.url, SPEC.tipper.length);
  const group = useRef<THREE.Group>(null);

  const rig = useMemo(() => {
    root.updateMatrixWorld(true);
    // GLTFLoader sanitises names: spaces become underscores.
    let box: THREE.Object3D | undefined;
    root.traverse((o) => {
      if (!box && /^Dump_?Box/.test(o.name)) box = o;
    });
    const wheels: THREE.Object3D[] = [];
    root.traverse((o) => {
      if (/^Wheel[_ ]/.test(o.name) && o.children.length) wheels.push(o);
    });
    let pivot: THREE.Group | null = null;
    if (box) {
      const dumpBox = box;
      // Paint the box in signal yellow so the machine reads as Aretus at a glance.
      const paint = new THREE.MeshStandardMaterial({ color: "#d9a404", roughness: 0.55, metalness: 0.25 });
      dumpBox.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh && !/glass/i.test((mesh.material as THREE.Material).name)) mesh.material = paint;
      });
      const b = new THREE.Box3().setFromObject(dumpBox);
      // Hinge along the rear-bottom edge of the box.
      pivot = hinge(dumpBox, new THREE.Vector3((b.min.x + b.max.x) / 2, b.min.y, b.min.z));
    }
    return { pivot, wheels };
  }, [root]);

  useImperativeHandle(ref, () => ({
    group: group.current,
    spinWheels: (radians: number) => turnWheels(rig.wheels, radians),
  }));

  useLayoutEffect(() => {
    setTipAngle(rig.pivot, tip);
  }, [tip, rig]);

  useFrame((_, dt) => {
    if (!wheelSpeed) return;
    turnWheels(rig.wheels, wheelSpeed * dt);
  });

  return (
    <group ref={group} {...props}>
      <primitive object={root} />
      <GroundShadow object={root} />
    </group>
  );
});

/** Tata tipper with Hyva hydraulics. */
export const HyvaTipper = forwardRef<MachineHandle, MachineProps>(function HyvaTipper(props, ref) {
  const root = useNormalised(SPEC.hyva.url, SPEC.hyva.length);
  const group = useRef<THREE.Group>(null);
  useMemo(() => {
    // Repaint the load body (the source model carries third-party signwriting).
    const paint = new THREE.MeshStandardMaterial({ color: "#3e5c76", roughness: 0.6, metalness: 0.2 });
    root.traverse((o) => {
      if (!/^(backmain|bacl=k_dala|back_side|back_down)/.test(o.name)) return;
      o.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = paint;
      });
    });
  }, [root]);
  useImperativeHandle(ref, () => ({ group: group.current }));
  return (
    <group ref={group} {...props}>
      <primitive object={root} />
      <GroundShadow object={root} />
    </group>
  );
});

/** Tata Signa 5532.S prime mover with its trailer bed. */
export const PrimeMover = forwardRef<MachineHandle, MachineProps>(function PrimeMover(props, ref) {
  const root = useNormalised(SPEC.primeMover.url, SPEC.primeMover.length);
  const group = useRef<THREE.Group>(null);
  useImperativeHandle(ref, () => ({ group: group.current }));
  return (
    <group ref={group} {...props}>
      <primitive object={root} />
      <GroundShadow object={root} />
    </group>
  );
});

/** Hitachi 200 LC class excavator. */
export const Excavator = forwardRef<MachineHandle, MachineProps>(function Excavator(props, ref) {
  const root = useNormalised(SPEC.excavator.url, SPEC.excavator.length);
  const group = useRef<THREE.Group>(null);
  useImperativeHandle(ref, () => ({ group: group.current }));
  return (
    <group ref={group} {...props}>
      <primitive object={root} />
      <GroundShadow object={root} />
    </group>
  );
});

export function Machine({ model, ...props }: MachineProps & { model: MachineModel }) {
  switch (model) {
    case "tipper":
      return <Tipper {...props} />;
    case "hyva":
      return <HyvaTipper {...props} />;
    case "primeMover":
      return <PrimeMover {...props} />;
    case "excavator":
      return <Excavator {...props} />;
  }
}
