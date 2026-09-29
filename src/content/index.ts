/**
 * Content accessors. Every page reads through these. With a Sanity project connected they
 * fetch live content; otherwise (or for any document not yet published) they fall back to the
 * local content brief in ./data, so the site always renders.
 */
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/live";
import * as q from "@/sanity/lib/queries";
import * as local from "./data";
import type {
  AboutPage,
  ClientsPage,
  ContactPage,
  FaqPage,
  FleetPage,
  HomePage,
  Project,
  ProjectsPage,
  ServicesPage,
  SiteSettings,
} from "./types";

type Options = { stega?: boolean };

/** Removes nulls so optional fields fall back cleanly and match the local types. */
function clean<T>(value: T): T {
  if (Array.isArray(value)) return value.map(clean) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== null)
        .map(([k, v]) => [k, clean(v)]),
    ) as T;
  }
  return value;
}

async function fromSanity<T>(query: string, fallback: T, params: Record<string, string> = {}, opts: Options = {}): Promise<T> {
  if (!isSanityConfigured) return fallback;
  const { data } = await sanityFetch({ query, params, stega: opts.stega });
  if (!data) return fallback;
  return { ...fallback, ...clean(data as object) } as T;
}

export const getSiteSettings = (opts?: Options) => fromSanity<SiteSettings>(q.SETTINGS_QUERY, local.siteSettings, {}, opts);
export const getHomePage = (opts?: Options) => fromSanity<HomePage>(q.HOME_QUERY, local.homePage, {}, opts);
export const getAboutPage = (opts?: Options) => fromSanity<AboutPage>(q.ABOUT_QUERY, local.aboutPage, {}, opts);
export const getServicesPage = (opts?: Options) => fromSanity<ServicesPage>(q.SERVICES_QUERY, local.servicesPage, {}, opts);
export const getFleetPage = (opts?: Options) => fromSanity<FleetPage>(q.FLEET_QUERY, local.fleetPage, {}, opts);
export const getProjectsPage = (opts?: Options) => fromSanity<ProjectsPage>(q.PROJECTS_QUERY, local.projectsPage, {}, opts);
export const getClientsPage = (opts?: Options) => fromSanity<ClientsPage>(q.CLIENTS_QUERY, local.clientsPage, {}, opts);
export const getFaqPage = (opts?: Options) => fromSanity<FaqPage>(q.FAQ_QUERY, local.faqPage, {}, opts);

export async function getContactPage(opts?: Options): Promise<ContactPage> {
  // Form options (services, durations) are fixed by the enquiry schema, so only copy comes from Sanity.
  return fromSanity<ContactPage>(q.CONTACT_QUERY, local.contactPage, {}, opts);
}

export async function getProject(slug: string, opts?: Options): Promise<Project | null> {
  const fallback = local.projectsPage.projects.find((p) => p.slug === slug) ?? null;
  if (!isSanityConfigured) return fallback;
  const { data } = await sanityFetch({ query: q.PROJECT_QUERY, params: { slug }, stega: opts?.stega });
  return data ? clean(data as Project) : fallback;
}
