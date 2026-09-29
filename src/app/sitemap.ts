import type { MetadataRoute } from "next";
import { getProjectsPage } from "@/content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getProjectsPage();
  const pages = ["", "/about", "/services", "/fleet", "/projects", "/clients", "/faq", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
