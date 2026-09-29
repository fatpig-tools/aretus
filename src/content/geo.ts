/** Real coordinates (WGS84) of the towns Aretus works in, used by the survey map and the route video. */
export const places = {
  angul: { name: "Angul", lat: 20.84, lon: 85.1 },
  sambalpur: { name: "Sambalpur", lat: 21.47, lon: 83.97 },
  hindol: { name: "Hindol", lat: 20.61, lon: 85.2 },
  chandikhol: { name: "Chandikhol", lat: 20.71, lon: 86.12 },
  barbil: { name: "Barbil", lat: 22.1, lon: 85.38 },
  mayurbhanj: { name: "Mayurbhanj", lat: 21.94, lon: 86.72 },
} as const;

export type PlaceKey = keyof typeof places;

/** Map frame around the operating area (degrees). */
export const frame = { latMin: 20.2, latMax: 22.5, lonMin: 83.4, lonMax: 87.2 };

/** Equirectangular projection into a width × height box, corrected for latitude. */
export function project(lat: number, lon: number, width: number, height: number) {
  const x = ((lon - frame.lonMin) / (frame.lonMax - frame.lonMin)) * width;
  const y = ((frame.latMax - lat) / (frame.latMax - frame.latMin)) * height;
  return { x, y };
}

/** Routes worked, as ordered place keys (highway packages run between towns). */
export const routes: { label: string; stops: PlaceKey[] }[] = [
  { label: "Angul–Sambalpur", stops: ["angul", "sambalpur"] },
  { label: "Hindol–Angul", stops: ["hindol", "angul"] },
];
