/**
 * Local copy of the website content brief (Aretus-Enterprises-Website-Content.md).
 * Used as the fallback when Sanity is not configured, and as the seed source for Sanity.
 * Anything marked [in brackets] in the brief is left out until it is confirmed.
 */
import type {
  AboutPage,
  ClientsPage,
  ContactPage,
  FaqPage,
  FleetPage,
  HomePage,
  ProjectsPage,
  ServicesPage,
  SiteSettings,
} from "./types";

export const siteSettings: SiteSettings = {
  name: "Aretus Enterprises",
  tagline: "Moving earth. Moving material. Moving projects forward.",
  footerBlurb:
    "Aretus Enterprises is an Odisha-based transport and construction fleet company supporting highway, mining and infrastructure projects with owned tippers, prime movers and earthmoving equipment.",
  copyright: "© 2026 Aretus Enterprises. All rights reserved.",
};

export const homePage: HomePage = {
  seo: {
    title: "Aretus Enterprises | Transport, Haulage & Construction Fleet, Odisha",
    description:
      "Owned fleet of Tata tippers, prime movers and a Hitachi excavator for highway, mining and construction projects. 250+ km of national highway work supported.",
  },
  hero: {
    headline: "Transport and construction support, from our own fleet.",
    subheadline:
      "Aretus Enterprises runs tippers, prime movers and earthmoving equipment for highway contractors, mining operators and infrastructure builders. Every machine we deploy is ours, so availability and maintenance are in our hands.",
    primaryCta: { label: "See our fleet", href: "/fleet" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
    photo: {
      brief:
        "Wide shot of the Tata Signa tippers lined up on a highway site, excavator loading in the background.",
    },
  },
  numbers: [
    { _key: "km", display: "250+", countTo: 250, unit: "km", label: "of national highway packages supported" },
    { _key: "units", display: "13", countTo: 13, label: "owned units, all current-generation" },
    { _key: "projects", display: "8", countTo: 8, label: "major projects across highways, mining and irrigation" },
    { _key: "tonnes", display: "4–5k", unit: "t", label: "moved per tipper per month on highway work" },
  ],
  whatWeDo: [
    {
      _key: "haulage",
      title: "Transport & Haulage",
      body: "Soil, sand, aggregate, GSB, WMM and mineral moved on schedule by our Tata Signa and Hyva tippers. Material reaches your crew when they need it, not a day later.",
      href: "/services#haulage",
    },
    {
      _key: "earthwork",
      title: "Construction & Earthwork",
      body: "Excavation, loading, embankment and cutting work. Our excavator and tippers work together as one self-contained earthwork unit.",
      href: "/services#earthwork",
    },
    {
      _key: "heavy",
      title: "Heavy Equipment Transport",
      body: "Tata Signa 5532.S prime movers shift plant and machinery between sites and packages, so you can mobilise without waiting on outside transporters.",
      href: "/services#heavy-transport",
    },
  ],
  whyAretus: [
    { _key: "own", title: "Your machines, on time", body: "We own the fleet, so we don't need outside approval to send a truck." },
    { _key: "repeat", title: "Clients come back", body: "AIPL gave us three highway packages in a row." },
    { _key: "terrain", title: "Built for Odisha's terrain", body: "We've worked on highways, in mines and on a dam across the state." },
    { _key: "numbers", title: "Clear numbers", body: "You get daily trip logs, measured output and billing without surprises." },
  ],
  trustLine: "Trusted on site by AIPL, Gayatri Projects, Megha Engineering, ONGC, GML and others.",
  closing: {
    body: "Starting a new package? Tell us the site, the volumes and the timeline, and we'll tell you what we can put on the ground.",
    cta: { label: "Get a Quote", href: "/contact" },
  },
};

export const aboutPage: AboutPage = {
  seo: {
    title: "About Aretus Enterprises | Owned Fleet, Odisha",
    description:
      "An Odisha-based fleet company that owns every machine it deploys. Highway, mining, dam and expressway experience.",
  },
  headline: "A fleet company that owns what it sends.",
  story: [
    "Aretus Enterprises is an Odisha-based transport and construction fleet company. We began in earthwork and haulage. Since then we've worked on national highway packages, an expressway, a dam and mineral haulage for some of eastern India's largest operators.",
    "We keep our model simple. We own our fleet, we put experienced operators on it, and we stay on site until the job is done. When a contractor calls us, they get machines maintained by us and managed by one point of contact, not a chain of sub-vendors.",
    "Our work has taken us across Angul, Sambalpur, Hindol, Chandikhol, Barbil and Mayurbhanj in Odisha, and outside the state to the Yamuna Expressway.",
  ],
  principles: [
    { _key: "owned", title: "Owned, not brokered", body: "Every truck and machine on our list belongs to us. No surprise substitutions, no waiting on a third party." },
    { _key: "current", title: "Current-generation fleet", body: "Our BS-VI Tata Signa trucks give better uptime, lower emissions and easier compliance with client and state norms." },
    { _key: "track", title: "Output you can track", body: "Trip logs and quantities are shared daily, so billing matches the work done." },
    { _key: "window", title: "One window", body: "Haulage, earthwork and heavy transport run under one contract, one billing cycle and one contact person." },
    { _key: "safety", title: "Safety habits from oil & gas", body: "Our work for ONGC and NE Oilfield set our site discipline. We carry the same standards onto every road and construction site." },
  ],
  areas: ["Angul", "Sambalpur", "Hindol", "Chandikhol", "Barbil", "Mayurbhanj"],
  whereWeWork:
    "Regular operating areas: Angul, Sambalpur, Hindol, Chandikhol, Barbil and Mayurbhanj. We take projects across eastern India and will mobilise further for the right package.",
};

export const servicesPage: ServicesPage = {
  seo: {
    title: "Haulage, Earthwork & Equipment Transport | Aretus",
    description:
      "Tipper haulage, excavation and loading, and heavy equipment transport on wet hire, dry hire, per-trip or monthly terms.",
  },
  headline: "Three kinds of work, one fleet, one contract.",
  services: [
    {
      _key: "haulage",
      slug: "haulage",
      number: "01",
      title: "Material Transport & Haulage",
      body: "Our ten tippers handle high-volume movement for road and site work: earth, sand, stone aggregate, GSB, WMM and mined material. We run to your paving or loading schedule and share trip logs every day, so you always know what has moved and what is left. On AIPL's highway packages, each of our tippers moved 4,000–5,000 tonnes a month.",
      bestFor: ["Highway and expressway packages", "Borrow-area haulage", "Mining and mineral transport", "Bulk site material movement"],
      fleetDeployed: ["5 × Tata Signa 2823.K BS-VI (16 m³ box)", "5 × Tata tippers with Hyva hydraulics"],
      model: "tipper",
      photo: { brief: "Loaded Signa tipper on a haul road." },
    },
    {
      _key: "earthwork",
      slug: "earthwork",
      number: "02",
      title: "Earthwork & Excavation",
      body: "Our Hitachi 200 LC Super Plus handles excavation, cutting and loading, and our tippers work alongside it to clear material. That pairing gives you a self-contained earthwork unit on site, with no coordination between separate vendors. We have run earthwork from single-machine deployments up to a 150-person spread on the Yamuna Expressway.",
      bestFor: ["Embankments", "Road formation", "Canal and dam work", "Cutting", "Site preparation", "Borrow-area loading"],
      fleetDeployed: ["1 × Hitachi 200 LC Super Plus (20 t class)", "Tippers as required"],
      model: "excavator",
      photo: { brief: "Excavator loading a tipper." },
    },
    {
      _key: "heavy",
      slug: "heavy-transport",
      number: "03",
      title: "Heavy Equipment Transport",
      body: "Two Tata Signa 5532.S prime movers (55 t GCW) move heavy plant and machinery between sites. Contractors use them to mobilise at package start, shift equipment between fronts, and demobilise at completion without waiting on outside transporters.",
      bestFor: ["Package mobilisation and demobilisation", "Shifting between sites", "Plant relocation"],
      fleetDeployed: ["2 × Tata Signa 5532.S BS-VI 4×2 prime movers"],
      model: "primeMover",
      photo: { brief: "Prime mover with trailer on highway." },
    },
  ],
  engagementModels: [
    { _key: "wet", model: "Wet hire", how: "Machine with operator, fuel and maintenance by Aretus. Billed monthly or hourly.", bestFor: "Excavator on earthwork fronts, tippers on long deployments" },
    { _key: "dry", model: "Dry hire", how: "Machine only. Client supplies operator and fuel.", bestFor: "Sites with in-house operator pools" },
    { _key: "trip", model: "Per-trip / per-m³", how: "Tippers paid on measured output, with trip logs shared daily.", bestFor: "Aggregate and earth movement tied to progress" },
    { _key: "monthly", model: "Monthly fixed + overtime", how: "Guaranteed hours per month, extra hours at an agreed rate.", bestFor: "Long-duration package deployment" },
    { _key: "mob", model: "One-time mobilisation", how: "Lump-sum movement of plant between locations.", bestFor: "Package start-up and demobilisation" },
  ],
  rateNote:
    "Rates are shared per project after a site assessment. Tell us the location, volumes and duration to get a quote.",
};

export const fleetPage: FleetPage = {
  seo: {
    title: "Our Fleet | Tata Signa Tippers, Prime Movers, Hitachi Excavator",
    description:
      "13 owned units: Tata Signa 2823.K and Hyva tippers, Tata Signa 5532.S prime movers and a Hitachi 200 LC Super Plus.",
  },
  headline: "13 units. All owned. All maintained by us.",
  intro:
    "Every unit below belongs to Aretus Enterprises. We don't rent machines from others to fill orders, so the fleet you see here is the fleet you get. The fleet is available for inspection at our yard or at your site.",
  units: [
    {
      _key: "signa-tipper",
      slug: "tata-signa-2823k",
      name: "Tata Signa 2823.K BS-VI Tipper",
      qty: 5,
      keySpecs: "28-tonne GVW class, 16 m³ box body, BS-VI engine. Built for high-cycle site haulage.",
      typicalUse: "Aggregate, earth, GSB/WMM and mineral haulage on highway and mining sites.",
      model: "tipper",
      photo: { brief: "Side profile of a Signa 2823.K with raised box." },
    },
    {
      _key: "hyva-tipper",
      slug: "tata-hyva-tipper",
      name: "Tata Tipper with Hyva Hydraulics",
      qty: 5,
      keySpecs: "Hyva hydraulic rear-tipping system for fast, reliable unloading.",
      typicalUse: "Site haulage, embankment filling and earthwork support.",
      model: "hyva",
      photo: { brief: "Hyva tipper unloading at a fill site." },
    },
    {
      _key: "prime-mover",
      slug: "tata-signa-5532s",
      name: "Tata Signa 5532.S BS-VI 4×2 Prime Mover",
      qty: 2,
      keySpecs: "55-tonne GCW tractor head, BS-VI engine, for use with trailers.",
      typicalUse: "Heavy equipment and plant transport between sites and packages.",
      model: "primeMover",
      photo: { brief: "Prime mover hauling an excavator on a low-bed." },
    },
    {
      _key: "excavator",
      slug: "hitachi-200lc",
      name: "Hitachi 200 LC Super Plus Excavator",
      qty: 1,
      keySpecs: "20-tonne class hydraulic excavator. Suited to digging, cutting and truck loading.",
      typicalUse: "Excavation, cutting, trenching and loading tippers.",
      model: "excavator",
      photo: { brief: "Excavator loading a tipper on a highway site." },
    },
  ],
  summary: "10 tippers · 2 prime movers · 1 excavator = 13 owned units.",
};

export const projectsPage: ProjectsPage = {
  seo: {
    title: "Projects | Highway, Mining & Dam Work | Aretus",
    description:
      "AIPL highway packages, Gayatri Package 11, Yamuna Expressway earthwork, mining haulage and dam work.",
  },
  headline: "Work we have done, and the people who hired us again.",
  projects: [
    {
      _key: "aipl",
      slug: "aipl-highway-packages",
      title: "AIPL: three consecutive highway packages",
      client: "AIPL",
      location: "Angul–Sambalpur (160 km), Chandikhol (18 km), GBRP (17 km)",
      scope: "Material haulage for national highway construction",
      sector: "Highways",
      km: 195,
      body: "We started on AIPL's 160 km Angul–Sambalpur package and stayed with them through two more: Chandikhol and GBRP. Our tippers ran steady volumes to the paving and earthwork fronts through all three.",
      result: "4,000–5,000 tonnes moved per tipper per month, and repeat work across three packages.",
      place: "angul",
    },
    {
      _key: "gayatri",
      slug: "gayatri-package-11",
      title: "Gayatri Projects: Package 11, Hindol–Angul",
      client: "Gayatri Projects",
      location: "Hindol–Angul, Odisha (46 km)",
      scope: "Material haulage and earthwork support",
      sector: "Highways",
      km: 46,
      body: "Haulage and earthwork support on a 46 km national highway package through central Odisha.",
      place: "hindol",
    },
    {
      _key: "yamuna",
      slug: "yamuna-expressway",
      title: "Yamuna Expressway earthwork package",
      client: "Sai Balaji Construction",
      location: "Yamuna Expressway (11 km)",
      scope: "Full earthwork spread",
      sector: "Expressway",
      km: 11,
      body: "Our largest single earthwork job: 11 km on a ₹108 Cr package, with a 150-person team on site.",
      result: "Delivered a full-spread earthwork package outside Odisha.",
    },
    {
      _key: "mining",
      slug: "barbil-mining-haulage",
      title: "Mining haulage: TCL & Jindal",
      client: "TCL, Jindal",
      location: "Barbil mining belt, Odisha",
      scope: "Mineral transport",
      sector: "Mining",
      body: "Steady daily haulage in the Barbil belt, where haul roads, loading cycles and safety rules are all tougher than on a highway.",
      place: "barbil",
    },
    {
      _key: "dam",
      slug: "mayurbhanj-dam",
      title: "Dam project: Laxminarayan Infra",
      client: "Laxminarayan Infra",
      location: "Mayurbhanj, Odisha",
      scope: "Earthwork and haulage for irrigation infrastructure",
      sector: "Irrigation",
      body: "Earthwork and material haulage in support of dam construction in Mayurbhanj.",
      place: "mayurbhanj",
    },
    {
      _key: "oil-gas",
      slug: "ongc-ne-oilfield",
      title: "Oil & gas: ONGC and NE Oilfield",
      client: "ONGC, NE Oilfield",
      sector: "Oil & gas",
      body: "Work in the oil and gas sector shaped our safety and documentation habits, and we bring the same discipline to every construction site.",
    },
  ],
};

export const clientsPage: ClientsPage = {
  seo: {
    title: "Clients | Aretus Enterprises",
    description:
      "AIPL, Gayatri Projects, Megha Engineering, ONGC, Jindal and other contractors and operators who have trusted the Aretus fleet on their sites.",
  },
  headline: "The companies that have trusted our fleet on their sites.",
  clients: [
    { _key: "aipl", name: "AIPL", sector: "Highways", line: "Three consecutive national highway packages in Odisha." },
    { _key: "gayatri", name: "Gayatri Projects", sector: "Highways", line: "Package 11, Hindol–Angul." },
    { _key: "megha", name: "Megha Engineering", sector: "Infrastructure" },
    { _key: "ongc", name: "ONGC", sector: "Oil & gas" },
    { _key: "ne-oilfield", name: "NE Oilfield", sector: "Oil & gas" },
    { _key: "gml", name: "GML", sector: "Infrastructure" },
    { _key: "usha", name: "Usha Carrier", sector: "Logistics" },
    { _key: "svt", name: "SVT Logistics", sector: "Logistics" },
    { _key: "jindal", name: "Jindal", sector: "Mining", line: "Mineral haulage, Barbil belt." },
    { _key: "laxminarayan", name: "Laxminarayan Infra", sector: "Irrigation", line: "Dam project, Mayurbhanj." },
  ],
};

export const faqPage: FaqPage = {
  seo: {
    title: "FAQs | Aretus Enterprises",
    description:
      "Answers to the questions contractors ask before hiring tippers, prime movers or an excavator from Aretus Enterprises.",
  },
  headline: "Questions contractors ask before hiring us.",
  faqs: [
    {
      _key: "own",
      question: "Do you own all the equipment you supply?",
      answer: "Yes. Every tipper, prime mover and excavator we list is owned by Aretus Enterprises. We don't sub-hire to fill orders.",
    },
    {
      _key: "areas",
      question: "Which areas do you work in?",
      answer: "We are based in Odisha and work regularly in Angul, Sambalpur, Hindol, Chandikhol, Barbil and Mayurbhanj. We also mobilise outside the state for the right project, as we did on the Yamuna Expressway.",
    },
    {
      _key: "operators",
      question: "Do you provide operators and fuel?",
      answer: "Yes, on wet hire. We supply trained operators, fuel and maintenance. Dry hire is available if you prefer to use your own operators.",
    },
    {
      _key: "billing",
      question: "How is haulage billed?",
      answer: "You can choose per-trip, per-m³, monthly fixed with overtime, or hourly billing. Trip logs are shared daily, so billing matches measured work.",
    },
    {
      _key: "inspect",
      question: "Can we inspect the fleet before signing?",
      answer: "Yes. We can arrange an inspection at our yard or bring units to your site.",
    },
    {
      _key: "emissions",
      question: "Are your vehicles compliant with current emission norms?",
      answer: "Our Tata Signa trucks are BS-VI. Registration, fitness, insurance and permit documents are shared with the client before deployment.",
    },
  ],
};

export const contactPage: ContactPage = {
  seo: {
    title: "Contact Aretus Enterprises | Get a Fleet Quote",
    description:
      "Tell us your site, volumes and timeline. We will suggest the right fleet mix and share rates after a site assessment.",
  },
  headline: "Let's talk about your next project.",
  intro:
    "Tell us about your site, the material volumes and the timeline. We'll suggest the right fleet mix and share rates after a site assessment.",
  services: ["Transport & Haulage", "Earthwork & Excavation", "Heavy Equipment Transport"],
  durations: ["Under 1 month", "1–3 months", "3–6 months", "6+ months"],
  submitLabel: "Send enquiry",
  successMessage: "Thanks. We've received your enquiry and will call you within one working day.",
};
