/**
 * Content accessors. Every page reads through these, so the source can switch from the
 * local brief (./data) to Sanity without touching page code.
 */
import * as local from "./data";

export async function getSiteSettings() {
  return local.siteSettings;
}
export async function getHomePage() {
  return local.homePage;
}
export async function getAboutPage() {
  return local.aboutPage;
}
export async function getServicesPage() {
  return local.servicesPage;
}
export async function getFleetPage() {
  return local.fleetPage;
}
export async function getProjectsPage() {
  return local.projectsPage;
}
export async function getProject(slug: string) {
  return local.projectsPage.projects.find((p) => p.slug === slug) ?? null;
}
export async function getClientsPage() {
  return local.clientsPage;
}
export async function getFaqPage() {
  return local.faqPage;
}
export async function getContactPage() {
  return local.contactPage;
}
