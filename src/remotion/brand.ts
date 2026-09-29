import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

export const { fontFamily: display } = loadArchivo("normal", { weights: ["500", "600"], subsets: ["latin"] });
export const { fontFamily: body } = loadArchivo("normal", { weights: ["400", "500"], subsets: ["latin"] });
export const { fontFamily: mono } = loadPlexMono("normal", { weights: ["500"], subsets: ["latin"] });

export const color = {
  charcoal: "#111417",
  asphalt: "#1b2026",
  steel: "#3e5c76",
  steelLight: "#8fa9bf",
  dust: "#e8e4dc",
  signal: "#f2b705",
  line: "rgba(232,228,220,0.12)",
};
