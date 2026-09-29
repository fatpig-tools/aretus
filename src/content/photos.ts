/**
 * Site photography (Pexels License: free for commercial use, no attribution required).
 * Source pages are kept here for licence records; they are not shown on the site.
 * Never used for the fleet itself: fleet visuals stay 3D until real Aretus photos arrive.
 */
export type StockPhoto = { src: string; width: number; height: number; alt: string; source: string };

export const photos = {
  "highway-hills": {
    src: "/images/stock/highway-hills.jpg",
    width: 2400,
    height: 1600,
    alt: "A highway winding through green hills",
    source: "https://www.pexels.com/photo/scenic-lonavala-highway-through-the-hills-30317431/",
  },
  "earthmoving-site": {
    src: "/images/stock/earthmoving-site.jpg",
    width: 2400,
    height: 1800,
    alt: "Wheel loaders filling a tipper on an earthmoving site",
    source: "https://www.pexels.com/photo/excavators-and-truck-with-sand-15439962/",
  },
  "open-pit-haul-roads": {
    src: "/images/stock/open-pit-haul-roads.jpg",
    width: 2400,
    height: 1595,
    alt: "Haul roads winding down the benches of an open-pit mine",
    source: "https://www.pexels.com/photo/massive-open-pit-mine-with-haul-trucks-31721779/",
  },
  "grader-site": {
    src: "/images/stock/grader-site.jpg",
    width: 2400,
    height: 1600,
    alt: "A motor grader levelling ground on an Indian site",
    source: "https://www.pexels.com/photo/a-motor-grader-on-the-field-10643009/",
  },
  "excavator-loading": {
    src: "/images/stock/excavator-loading.jpg",
    width: 2400,
    height: 1600,
    alt: "An excavator loading rock into a dump truck at a quarry",
    source: "https://www.pexels.com/photo/excavator-unloading-rocks-into-dump-truck-at-quarry-39389821/",
  },
  "expressway-aerial": {
    src: "/images/stock/expressway-aerial.jpg",
    width: 2400,
    height: 1600,
    alt: "Aerial view of an expressway running through green countryside",
    source: "https://www.pexels.com/photo/scenic-aerial-view-of-indian-landscape-with-highway-31397657/",
  },
  "red-soil-highway": {
    src: "/images/stock/red-soil-highway.jpg",
    width: 2400,
    height: 1348,
    alt: "A highway running straight through red-soil farmland, seen from above",
    source: "https://www.pexels.com/photo/aerial-view-of-vibrant-indian-farmland-landscape-36946236/",
  },
  "lowbed-transport": {
    src: "/images/stock/lowbed-transport.jpg",
    width: 2400,
    height: 1797,
    alt: "A low-bed trailer carrying a motor grader on a dirt road",
    source: "https://www.pexels.com/photo/cargo-truck-transporting-a-heavy-machinery-5961982/",
  },
} satisfies Record<string, StockPhoto>;

export type PhotoKey = keyof typeof photos;
