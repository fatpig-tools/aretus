import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { DocumentIcon } from "@sanity/icons/Document";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { stringList } from "../objects";

const seoField = defineField({ name: "seo", type: "seo", group: "seo" });
const groups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "name", title: "Company name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "footerBlurb", title: "Footer blurb", type: "text", rows: 3 }),
    defineField({ name: "phone", type: "string", description: "Shown in the header bar, footer and contact page. Include the country code, e.g. +91 98765 43210." }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string", description: "Leave empty to use the phone number." }),
    defineField({ name: "email", type: "string", validation: (r) => r.email() }),
    defineField({ name: "address", type: "text", rows: 3 }),
    defineField({ name: "hours", title: "Working hours", type: "string", description: "e.g. Mon to Sat, 9:00 to 19:00" }),
    defineField({ name: "mapEmbedUrl", title: "Google Maps embed URL", type: "url", description: "From Google Maps → Share → Embed a map → copy the src URL." }),
    defineField({ name: "copyright", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups,
  fields: [
    defineField({
      name: "hero",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "headline", type: "string", validation: (r) => r.required() }),
        defineField({ name: "subheadline", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary button", type: "callToAction" }),
        defineField({ name: "secondaryCta", title: "Secondary button", type: "callToAction" }),
        defineField({ name: "photo", type: "photoSlot" }),
      ],
    }),
    defineField({ name: "numbers", title: "Numbers strip", type: "array", group: "content", of: [defineArrayMember({ type: "stat" })], validation: (r) => r.max(4) }),
    defineField({ name: "whatWeDo", title: "What we do", type: "array", group: "content", of: [defineArrayMember({ type: "feature" })] }),
    defineField({ name: "whyAretus", title: "Why Aretus", type: "array", group: "content", of: [defineArrayMember({ type: "feature" })] }),
    defineField({ name: "trustLine", title: "Trust line", type: "string", group: "content" }),
    defineField({
      name: "closing",
      title: "Closing banner",
      type: "object",
      group: "content",
      description: "Shown at the bottom of most pages.",
      fields: [
        defineField({ name: "body", type: "text", rows: 3 }),
        defineField({ name: "cta", title: "Button", type: "callToAction" }),
      ],
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: DocumentIcon,
  groups,
  fields: [
    defineField({ name: "headline", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "story", type: "array", group: "content", of: [defineArrayMember({ type: "text", rows: 4 })], description: "One paragraph per item. The first is shown larger." }),
    defineField({ name: "principles", title: "How we work", type: "array", group: "content", of: [defineArrayMember({ type: "feature" })] }),
    { ...stringList("areas", "Operating areas"), group: "content" },
    defineField({ name: "whereWeWork", title: "Where we work", type: "text", rows: 3, group: "content" }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

const listingPage = (name: string, title: string, extra: ReturnType<typeof defineField>[] = []) =>
  defineType({
    name,
    title,
    type: "document",
    icon: DocumentIcon,
    groups,
    fields: [defineField({ name: "headline", type: "string", group: "content", validation: (r) => r.required() }), ...extra, seoField],
    preview: { prepare: () => ({ title }) },
  });

export const servicesPage = listingPage("servicesPage", "Services page", [
  defineField({ name: "engagementModels", title: "Engagement models", type: "array", group: "content", of: [defineArrayMember({ type: "engagementModel" })] }),
  defineField({ name: "rateNote", title: "Line under the table", type: "text", rows: 2, group: "content" }),
]);
export const fleetPage = listingPage("fleetPage", "Fleet page", [
  defineField({ name: "intro", type: "text", rows: 3, group: "content" }),
  defineField({ name: "summary", type: "string", group: "content" }),
]);
export const projectsPage = listingPage("projectsPage", "Projects page");
export const clientsPage = listingPage("clientsPage", "Clients page");
export const faqPage = listingPage("faqPage", "FAQ page");

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  groups,
  fields: [
    defineField({ name: "headline", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "text", rows: 3, group: "content" }),
    defineField({ name: "submitLabel", title: "Form button", type: "string", group: "content" }),
    defineField({ name: "successMessage", title: "Success message", type: "string", group: "content" }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});

export const singletonTypes = [siteSettings, homePage, aboutPage, servicesPage, fleetPage, projectsPage, clientsPage, faqPage, contactPage];
export const SINGLETONS = singletonTypes.map((t) => t.name);
