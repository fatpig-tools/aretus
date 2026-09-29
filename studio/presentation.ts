import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

const page = (href: string, title: string) => defineLocations({ message: title, locations: [{ title, href }] });

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: [
    { route: "/", filter: `_id == "homePage"` },
    { route: "/about", filter: `_id == "aboutPage"` },
    { route: "/services", filter: `_id == "servicesPage"` },
    { route: "/fleet", filter: `_id == "fleetPage"` },
    { route: "/projects", filter: `_id == "projectsPage"` },
    { route: "/projects/:slug", filter: `_type == "project" && slug.current == $slug` },
    { route: "/clients", filter: `_id == "clientsPage"` },
    { route: "/faq", filter: `_id == "faqPage"` },
    { route: "/contact", filter: `_id == "contactPage"` },
  ],
  locations: {
    siteSettings: page("/", "Every page"),
    service: page("/services", "Services"),
    fleetUnit: page("/fleet", "Fleet"),
    client: page("/clients", "Clients"),
    faq: page("/faq", "FAQs"),
    project: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: `/projects/${doc?.slug}` },
          { title: "All projects", href: "/projects" },
        ],
      }),
    }),
  },
};
