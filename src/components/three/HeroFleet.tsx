"use client";

import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";
import type * as THREE from "three";
import { Excavator, HyvaTipper, PrimeMover, Tipper, type MachineHandle } from "./Machines";
import { PADS, roadX, terrainHeight } from "./terrain";

const LANE = 2.3;
const WHEEL_RADIUS = 0.55;

/** Yaw that points a model (forward = +Z) along the road, heading toward -Z or +Z. */
function roadYaw(z: number, towardNegativeZ: boolean) {
  const step = towardNegativeZ ? -1 : 1;
  const dx = roadX(z + step) - roadX(z);
  return Math.atan2(dx, step);
}

function placeOnRoad(obj: THREE.Object3D, z: number, laneOffset: number, towardNegativeZ: boolean) {
  const yaw = roadYaw(z, towardNegativeZ);
  obj.position.set(roadX(z) + laneOffset, 0, z);
  obj.rotation.set(0, yaw, 0);
}

const LOAD_Z = -6;

/**
 * The machines on the hero haul road. Scroll progress drives the loaded tipper away from the
 * excavator; a second tipper keeps a steady cycle in the opposite lane.
 */
export function HeroFleet({ progress }: { progress?: MotionValue<number> }) {
  const loaded = useRef<MachineHandle>(null);
  const returning = useRef<MachineHandle>(null);
  const lastZ = useRef(LOAD_Z);

  useFrame((state) => {
    const p = progress?.get() ?? 0;

    // Loaded tipper: waits at the excavator, then drives off as the visitor scrolls.
    const tipper = loaded.current;
    if (tipper?.group) {
      // Pulls away faster than the camera follows (camera travels 50 m over the hero).
      const z = LOAD_Z - p * 50 - p * p * 45;
      placeOnRoad(tipper.group, z, LANE, true);
      tipper.spinWheels?.((lastZ.current - z) / WHEEL_RADIUS);
      lastZ.current = z;
    }

    // Returning tipper: a 22 s loop coming up the far lane toward the camera.
    const back = returning.current;
    if (back?.group) {
      const t = (state.clock.elapsedTime % 20) / 20;
      const z = -200 + t * 190;
      placeOnRoad(back.group, z, -LANE, false);
      // Never let it pass right beside the camera; it reappears far down the road.
      back.group.visible = z < state.camera.position.z - 18;
    }
  });

  const { loading, layby } = PADS;

  return (
    <group>
      {/* Excavator on the right shoulder, arm swung toward the waiting tipper. */}
      <Excavator
        position={[loading.x, terrainHeight(loading.x, loading.z), loading.z]}
        rotation-y={-Math.PI / 2 - 0.55}
      />
      <Tipper ref={loaded} />
      <HyvaTipper ref={returning} />
      {/* Prime mover with the second excavator load, parked on the left shoulder. */}
      <group
        position={[layby.x, terrainHeight(layby.x, layby.z), layby.z]}
        rotation-y={roadYaw(layby.z, false) + 0.08}
      >
        <PrimeMover />
        <Excavator position={[0, 1.02, -3]} />
      </group>
    </group>
  );
}
