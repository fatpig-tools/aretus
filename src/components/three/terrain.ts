/** Deterministic value noise + road helpers shared by the terrain mesh and props placed on it. */

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

/** Stable pseudo-random number in [0, 1) for index `i`, channel `c`. */
export function random(i: number, c = 0) {
  return hash(i * 1.618 + c * 17.3, c * 9.1 + i * 0.37);
}

export function fbm(x: number, y: number) {
  let total = 0;
  let amp = 1;
  let freq = 1;
  for (let i = 0; i < 5; i++) {
    total += valueNoise(x * freq, y * freq) * amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return total / 1.9375;
}

export function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}

/** Centre-line of the haul road: a lazy S-curve running along -Z. */
export function roadX(z: number) {
  return Math.sin(z * 0.018) * 9 + Math.sin(z * 0.047 + 1.3) * 3;
}

export const ROAD_HALF_WIDTH = 5;

/** Levelled working areas beside the road where machines stand (graded site pads). */
export const PADS = {
  /** Excavator loading bay on the right shoulder. */
  loading: { x: roadX(-8) + 11, z: -8, radius: 12 },
  /** Prime mover lay-by on the left shoulder. */
  layby: { x: roadX(-48) - 9, z: -48, radius: 13 },
} as const;

/** Terrain height at (x, z); flattened into a cutting where the road runs and at the site pads. */
export function terrainHeight(x: number, z: number) {
  const n = fbm(x * 0.018 + 40, z * 0.018 + 12);
  const ridges = Math.pow(n, 2.2) * 38;
  const dist = Math.abs(x - roadX(z));
  let flat = smoothstep(ROAD_HALF_WIDTH + 1, ROAD_HALF_WIDTH + 16, dist);
  for (const pad of Object.values(PADS)) {
    const d = Math.hypot(x - pad.x, z - pad.z);
    flat = Math.min(flat, smoothstep(pad.radius * 0.7, pad.radius * 1.8, d));
  }
  return ridges * flat - 0.2;
}
