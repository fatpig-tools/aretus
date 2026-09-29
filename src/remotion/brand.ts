import { loadFont as loadCondensed } from "@remotion/google-fonts/BarlowCondensed";
import { loadFont as loadBarlow } from "@remotion/google-fonts/Barlow";

export const { fontFamily: display } = loadCondensed("normal", { weights: ["600", "800"], subsets: ["latin"] });
export const { fontFamily: body } = loadBarlow("normal", { weights: ["500"], subsets: ["latin"] });

export const color = {
  charcoal: "#111417",
  asphalt: "#1b2026",
  steel: "#3e5c76",
  steelLight: "#8fa9bf",
  dust: "#e8e4dc",
  signal: "#f2b705",
  line: "rgba(232,228,220,0.12)",
};
