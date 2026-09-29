type Credit = { name: string; author?: string; license?: string; url?: string; note?: string };

/** CC-BY 3D models must be credited here (added when the GLBs are downloaded). */
export const credits: { title: string; items: Credit[] }[] = [
  { title: "3D models", items: [] },
  {
    title: "Typefaces",
    items: [{ name: "Barlow and Barlow Condensed", author: "Jeremy Tribby", license: "SIL Open Font License", url: "https://fonts.google.com/specimen/Barlow" }],
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
