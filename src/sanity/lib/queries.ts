import { defineQuery } from "next-sanity";

const photo = `{ brief, "src": image.asset->url, alt }`;
const seo = `"seo": { "title": seo.title, "description": seo.description }`;

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  name, tagline, footerBlurb, phone, whatsapp, email, address, hours, mapEmbedUrl, copyright
}`);

export const HOME_QUERY = defineQuery(`*[_id == "homePage"][0]{
  ${seo},
  hero{ headline, subheadline, primaryCta{label, href}, secondaryCta{label, href}, photo${photo} },
  numbers[]{ _key, display, countTo, unit, label },
  whatWeDo[]{ _key, title, body, href },
  whyAretus[]{ _key, title, body },
  trustLine,
  closing{ body, cta{label, href} }
}`);

export const ABOUT_QUERY = defineQuery(`*[_id == "aboutPage"][0]{
  ${seo}, headline, story, principles[]{ _key, title, body }, areas, whereWeWork
}`);

export const SERVICES_QUERY = defineQuery(`*[_id == "servicesPage"][0]{
  ${seo}, headline, rateNote,
  engagementModels[]{ _key, model, how, bestFor },
  "services": *[_type == "service"] | order(order asc){
    "_key": _id, "slug": slug.current, title, body, bestFor, fleetDeployed, model, photo${photo}
  }
}`);

export const FLEET_QUERY = defineQuery(`*[_id == "fleetPage"][0]{
  ${seo}, headline, intro, summary,
  "units": *[_type == "fleetUnit"] | order(order asc){
    "_key": _id, "slug": slug.current, name, qty, keySpecs, typicalUse, model, photo${photo}
  }
}`);

const projectFields = `"_key": _id, "slug": slug.current, title, client, location, scope, sector, km, body, result, place`;

export const PROJECTS_QUERY = defineQuery(`*[_id == "projectsPage"][0]{
  ${seo}, headline,
  "projects": *[_type == "project"] | order(order asc){ ${projectFields} }
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{ ${projectFields} }`);

export const CLIENTS_QUERY = defineQuery(`*[_id == "clientsPage"][0]{
  ${seo}, headline,
  "clients": *[_type == "client"] | order(order asc){
    "_key": _id, name, sector, line, "logo": select(logoPermission == true => logo.asset->url)
  }
}`);

export const FAQ_QUERY = defineQuery(`*[_id == "faqPage"][0]{
  ${seo}, headline,
  "faqs": *[_type == "faq"] | order(order asc){ "_key": _id, question, answer }
}`);

export const CONTACT_QUERY = defineQuery(`*[_id == "contactPage"][0]{
  ${seo}, headline, intro, submitLabel, successMessage
}`);
