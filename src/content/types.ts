export type Cta = { label: string; href: string };

export type Seo = { title: string; description: string };

export type PhotoSlot = {
  /** Shot description from the content brief; shown until a real photo is uploaded. */
  brief: string;
  src?: string;
  alt?: string;
};

export type MachineModel = "tipper" | "hyva" | "primeMover" | "excavator";

export type SiteSettings = {
  name: string;
  tagline: string;
  footerBlurb: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  hours?: string;
  mapEmbedUrl?: string;
  copyright: string;
};

export type Stat = {
  _key: string;
  display: string;
  countTo?: number;
  unit?: string;
  label: string;
};

export type Feature = { _key: string; title: string; body: string; href?: string };

export type HomePage = {
  seo: Seo;
  hero: { headline: string; subheadline: string; primaryCta: Cta; secondaryCta: Cta; photo: PhotoSlot };
  numbers: Stat[];
  whatWeDo: Feature[];
  whyAretus: Feature[];
  trustLine: string;
  closing: { body: string; cta: Cta };
};

export type AboutPage = {
  seo: Seo;
  headline: string;
  story: string[];
  principles: Feature[];
  areas: string[];
  whereWeWork: string;
};

export type Service = {
  _key: string;
  slug: string;
  number: string;
  title: string;
  body: string;
  bestFor: string[];
  fleetDeployed: string[];
  model: MachineModel;
  photo: PhotoSlot;
};

export type EngagementModel = { _key: string; model: string; how: string; bestFor: string };

export type ServicesPage = {
  seo: Seo;
  headline: string;
  services: Service[];
  engagementModels: EngagementModel[];
  rateNote: string;
};

export type FleetUnit = {
  _key: string;
  slug: string;
  name: string;
  qty: number;
  keySpecs: string;
  typicalUse: string;
  model: MachineModel;
  photo: PhotoSlot;
};

export type FleetPage = {
  seo: Seo;
  headline: string;
  intro: string;
  units: FleetUnit[];
  summary: string;
};

export type Project = {
  _key: string;
  slug: string;
  title: string;
  client: string;
  location?: string;
  scope?: string;
  sector: string;
  km?: number;
  body: string;
  result?: string;
  /** Where the work was, for the survey map. */
  place?: import("./geo").PlaceKey;
};

export type ProjectsPage = { seo: Seo; headline: string; projects: Project[] };

export type Client = { _key: string; name: string; sector: string; line?: string; logo?: string };

export type ClientsPage = { seo: Seo; headline: string; clients: Client[] };

export type Faq = { _key: string; question: string; answer: string };

export type FaqPage = { seo: Seo; headline: string; faqs: Faq[] };

export type ContactPage = {
  seo: Seo;
  headline: string;
  intro: string;
  services: string[];
  durations: string[];
  submitLabel: string;
  successMessage: string;
};
