/** Stock photography. Representative only: never used for the fleet itself. */
export type StockPhoto = { src: string; width: number; height: number; alt: string; credit: { author: string; license: string; url: string; source: string } };

export const photos = {
  "bypass-earthwork": {
    src: "/images/stock/bypass-earthwork.jpg",
    width: 2400,
    height: 1600,
    alt: "Earthwork and plant beneath a highway flyover under construction",
    credit: { author: "iMahesh", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/w/index.php?curid=148611781", source: "Wikimedia Commons" },
  },
  "highway-curve": {
    src: "/images/stock/highway-curve.jpg",
    width: 2400,
    height: 1800,
    alt: "A two-lane Indian highway curving through green countryside",
    credit: { author: "Ms Sarah Welch", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/w/index.php?curid=98965836", source: "Wikimedia Commons" },
  },
  "iron-ore-mine": {
    src: "/images/stock/iron-ore-mine.jpg",
    width: 2400,
    height: 1800,
    alt: "Terraced red iron ore mine in Keonjhar district, Odisha",
    credit: { author: "Bikashkumargiri1997", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/w/index.php?curid=81700763", source: "Wikimedia Commons" },
  },
  "road-cutting": {
    src: "/images/stock/road-cutting.jpg",
    width: 2400,
    height: 1080,
    alt: "A new road being cut through forested hills",
    credit: { author: "Shyamal", license: "CC0", url: "https://commons.wikimedia.org/w/index.php?curid=116036548", source: "Wikimedia Commons" },
  },
  "excavator-loading": {
    src: "/images/stock/excavator-loading.jpg",
    width: 2400,
    height: 1600,
    alt: "An excavator loading rock into a dump truck at a quarry",
    credit: { author: "Harshal  .", license: "Pexels License", url: "https://www.pexels.com/photo/excavator-unloading-rocks-into-dump-truck-at-quarry-39389821/", source: "Pexels" },
  },
  "expressway-aerial": {
    src: "/images/stock/expressway-aerial.jpg",
    width: 2400,
    height: 1600,
    alt: "Aerial view of an expressway running through green Indian landscape",
    credit: { author: "Vikram Aditya", license: "Pexels License", url: "https://www.pexels.com/photo/scenic-aerial-view-of-indian-landscape-with-highway-31397657/", source: "Pexels" },
  },
  "red-soil-highway": {
    src: "/images/stock/red-soil-highway.jpg",
    width: 2400,
    height: 1348,
    alt: "A highway running straight through red-soil farmland, seen from above",
    credit: { author: "Anil  Sharma", license: "Pexels License", url: "https://www.pexels.com/photo/aerial-view-of-vibrant-indian-farmland-landscape-36946236/", source: "Pexels" },
  },
  "lowbed-transport": {
    src: "/images/stock/lowbed-transport.jpg",
    width: 2400,
    height: 1797,
    alt: "A low-bed trailer carrying a motor grader on a dirt road",
    credit: { author: "CONSTRUCCIÓN  TOTAL", license: "Pexels License", url: "https://www.pexels.com/photo/cargo-truck-transporting-a-heavy-machinery-5961982/", source: "Pexels" },
  },
} satisfies Record<string, StockPhoto>;

export type PhotoKey = keyof typeof photos;
