type Credit = { name: string; author?: string; license?: string; url?: string; note?: string };

/** CC-BY 3D models must be credited here (added when the GLBs are downloaded). */
export const credits: { title: string; items: Credit[] }[] = [
  {
    title: "3D models",
    items: [
      {
        name: "Hitachi excavator",
        author: "Lassi Kaukonen",
        license: "CC BY 4.0",
        url: "https://sketchfab.com/3d-models/3dde2c846cc54a4d9fabcc821c9b9caa",
        note: "Simplified for the web.",
      },
      {
        name: "Japanese Dump Truck",
        author: "Pavel Gorbachev",
        license: "CC BY 4.0",
        url: "https://sketchfab.com/3d-models/bdd68dcc73be430dbffff61017c95fb8",
        note: "Dump body repainted; used to represent the Tata Signa 2823.K tipper.",
      },
      {
        name: "tata bangladashi truck",
        author: "taeemtasbi",
        license: "CC BY 4.0",
        url: "https://sketchfab.com/3d-models/1d46922d2a0b4aa688349dd005fe5ee1",
        note: "Simplified and load body repainted.",
      },
      {
        name: "Tata Signa Cargo Truck | Low Poly Game Ready PBR",
        author: "kevin_k_5124",
        license: "CC BY 4.0",
        url: "https://sketchfab.com/3d-models/a5c03c1a1c2c4b21b7db6192b1ef8718",
        note: "Container removed.",
      },
    ],
  },
  {
    title: "Typefaces",
    items: [
      { name: "Archivo", author: "Omnibus-Type", license: "SIL Open Font License", url: "https://fonts.google.com/specimen/Archivo" },
      { name: "IBM Plex Mono", author: "IBM", license: "SIL Open Font License", url: "https://fonts.google.com/specimen/IBM+Plex+Mono" },
    ],
  },
  {
    title: "Built with",
    items: [
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "three.js and React Three Fiber", url: "https://threejs.org" },
      { name: "Framer Motion", url: "https://motion.dev" },
      { name: "Remotion", url: "https://www.remotion.dev" },
      { name: "Sanity", url: "https://www.sanity.io" },
    ],
  },
];
