"use client";

import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ROAD_HALF_WIDTH, random, roadX, terrainHeight } from "./terrain";

const FOG = new THREE.Color("#111417");
const LENGTH = 420;
const WIDTH = 260;

/* Topographic terrain: height-banded contour lines over a dark, softly lit surface. */
const terrainVertex = /* glsl */ `
  varying float vHeight;
  varying vec3 vNormal;
  varying float vDepth;
  varying vec3 vWorld;
  void main() {
    vHeight = position.y;
    vNormal = normalize(normalMatrix * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const terrainFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uLine;
  uniform vec3 uSun;
  uniform vec3 uFog;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uTime;
  varying float vHeight;
  varying vec3 vNormal;
  varying float vDepth;
  varying vec3 vWorld;
  void main() {
    vec3 n = normalize(vNormal);
    float light = clamp(dot(n, normalize(vec3(-0.5, 0.55, -0.6))), 0.0, 1.0);
    vec3 col = uBase * (0.35 + 0.65 * light) + uSun * pow(light, 6.0) * 0.18;

    // Contour lines every 1.6 units of height, anti-aliased with fwidth.
    float h = vHeight / 1.6;
    float f = abs(fract(h - 0.5) - 0.5) / fwidth(h);
    float contour = 1.0 - min(f, 1.0);
    float hm = vHeight / 8.0;
    float major = 1.0 - min(abs(fract(hm - 0.5) - 0.5) / fwidth(hm), 1.0);
    col = mix(col, uLine, contour * 0.28 + major * 0.55);

    // Survey scan line sweeping across the terrain.
    float scan = smoothstep(1.2, 0.0, abs(mod(vWorld.z + uTime * 18.0, 140.0) - 70.0));
    col += uLine * scan * 0.08 * step(0.4, vHeight);

    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    gl_FragColor = vec4(mix(col, uFog, fog), 1.0);
  }
`;

function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(WIDTH, LENGTH, 220, 360);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, -LENGTH / 2 + 40);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, terrainHeight(pos.getX(i), pos.getZ(i)));
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: terrainVertex,
        fragmentShader: terrainFragment,
        uniforms: {
          uBase: { value: new THREE.Color("#2c3742") },
          uLine: { value: new THREE.Color("#8fa9bf") },
          uSun: { value: new THREE.Color("#f2b705") },
          uFog: { value: FOG },
          uFogNear: { value: 60 },
          uFogFar: { value: 260 },
          uTime: { value: 0 },
        },
      }),
    [],
  );

  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.material.uniforms.uTime.value += dt;
  });

  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

/** Road surface ribbon following the curve, with lane dashes that stream toward the camera. */
function Road() {
  const surface = useMemo(() => {
    const segments = 400;
    const positions: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const z = 40 - (i / segments) * LENGTH;
      const cx = roadX(z);
      positions.push(cx - ROAD_HALF_WIDTH, 0.02, z, cx + ROAD_HALF_WIDTH, 0.02, z);
      if (i < segments) {
        const a = i * 2;
        indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  }, []);

  const DASHES = 90;
  const SPACING = 4.6;
  const dashes = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const mesh = dashes.current;
    if (!mesh) return;
    const offset = (state.clock.elapsedTime * 7) % SPACING;
    for (let i = 0; i < DASHES; i++) {
      const z = 38 - i * SPACING + offset;
      const x = roadX(z);
      const ahead = roadX(z - 1);
      dummy.position.set(x, 0.05, z);
      dummy.rotation.set(-Math.PI / 2, 0, Math.atan2(ahead - x, 1));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={surface}>
        <meshStandardMaterial color="#15191e" roughness={0.95} />
      </mesh>
      <instancedMesh ref={dashes} args={[undefined, undefined, DASHES]} frustumCulled={false}>
        <planeGeometry args={[0.28, 2.2]} />
        <meshBasicMaterial color="#f2b705" toneMapped={false} fog />
      </instancedMesh>
    </group>
  );
}

/** Warm dust motes hanging in the low evening light. */
function Dust({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const z = 30 - random(i, 1) * 200;
      arr[i * 3] = roadX(z) + (random(i, 2) - 0.5) * 70;
      arr[i * 3 + 1] = random(i, 3) * 14;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#e8c872"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Low sun behind the ridgeline: a large additive radial gradient far down the road. */
function HorizonGlow() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color("#f2b705") } },
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader:
          "uniform vec3 uColor; varying vec2 vUv; void main(){ vec2 p = vUv - vec2(0.5, 0.35); p.x *= 0.55; float d = length(p); float g = exp(-d * 5.5) * 0.55 + exp(-d * 18.0) * 0.35; gl_FragColor = vec4(uColor * g, g); }",
      }),
    [],
  );
  return (
    <mesh position={[roadX(-300) + 40, 18, -330]} material={material}>
      <planeGeometry args={[520, 180]} />
    </mesh>
  );
}

/** Camera dolly: glides down the haul road as the page scrolls, with a little pointer parallax. */
function CameraRig({ progress }: { progress?: MotionValue<number> }) {
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, pointer }, dt) => {
    const p = progress?.get() ?? 0;
    const z = 26 - p * 60;
    const x = roadX(z) - 9 + pointer.x * 1.5;
    const y = 7.5 - p * 2.5 + pointer.y * 0.8;
    const k = 1 - Math.pow(0.001, dt);
    camera.position.x += (x - camera.position.x) * k;
    camera.position.y += (y - camera.position.y) * k;
    camera.position.z += (z - camera.position.z) * k;
    const lz = z - 40;
    look.set(roadX(lz) - 6, 1, lz);
    camera.lookAt(look);
  });

  return null;
}

export function HaulRoadScene({ progress, children }: { progress?: MotionValue<number>; children?: React.ReactNode }) {
  return (
    <>
      <color attach="background" args={[FOG]} />
      <fog attach="fog" args={[FOG, 40, 230]} />
      <hemisphereLight args={["#8fa9bf", "#111417", 0.8]} />
      <directionalLight position={[-40, 30, -60]} intensity={2.2} color="#ffcf73" />
      <Terrain />
      <Road />
      <HorizonGlow />
      <Dust />
      {children}
      <CameraRig progress={progress} />
    </>
  );
}
