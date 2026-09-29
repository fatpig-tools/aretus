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
    "We're a transport and construction fleet company from Odisha. We own every tipper, prime mover and excavator we send out, and we work on highway, mining and infrastructure projects across the state.",
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
      "We run tippers, prime movers and earthmoving equipment for highway contractors, mining operators and infrastructure builders. Every machine we send to your site is ours, so we control when it turns up and how well it's looked after.",
    primaryCta: { label: "See our fleet", href: "/fleet" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
    photo: {
      brief:
        "Wide shot of the Tata Signa tippers lined up on a highway site, excavator loading in the background.",
    },
  },
  numbers: [
    { _key: "km", display: "250+", countTo: 250, unit: "km", label: "of national highway packages we've supported" },
    { _key: "units", display: "13", countTo: 13, label: "machines we own, all current-generation" },
    { _key: "projects", display: "8", countTo: 8, label: "major projects across highways, mines and irrigation" },
    { _key: "tonnes", display: "4-5k", unit: "t", label: "moved by each tipper in a month on highway work" },
  ],
  whatWeDo: [
    {
      _key: "haulage",
      title: "Transport & Haulage",
      body: "We move soil, sand, aggregate, GSB, WMM and mineral on your schedule with our Tata Signa and Hyva tippers. Material reaches your crew when they need it, not a day later.",
      href: "/services#haulage",
    },
    {
      _key: "earthwork",
      title: "Construction & Earthwork",
      body: "Excavation, loading, embankments and cutting. Our excavator and tippers work side by side, so you get one complete earthwork team instead of three separate vendors.",
      href: "/services#earthwork",
    },
    {
      _key: "heavy",
      title: "Heavy Equipment Transport",
      body: "Our Tata Signa 5532.S prime movers shift plant and machinery between sites and packages. You can mobilise without waiting on an outside transporter.",
      href: "/services#heavy-transport",
    },
  ],
  whyAretus: [
    { _key: "own", title: "Your machines, on time", body: "We own the fleet, so nobody else has to sign off before we send a truck." },
    { _key: "repeat", title: "Clients come back", body: "AIPL gave us three highway packages, one after another." },
    { _key: "terrain", title: "Built for Odisha's terrain", body: "We've worked on highways, in mines and on a dam across the state. We know the ground." },
    { _key: "numbers", title: "Clear numbers", body: "You get daily trip logs, measured output and bills with no surprises." },
  ],
  trustLine: "Contractors like AIPL, Gayatri Projects, Megha Engineering, ONGC and GML have trusted us on their sites.",
  closing: {
    body: "Starting a new package? Tell us the site, the volumes and the timeline. We'll tell you honestly what we can put on the ground.",
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
    "Aretus Enterprises is a transport and construction fleet company from Odisha. We started out in earthwork and haulage, and since then we've worked on national highway packages, an expressway, a dam and mineral haulage for some of eastern India's biggest operators.",
    "Our model is simple. We own our fleet, we put experienced operators on it, and we stay on site until the job is finished. When you call us, you get machines we maintain ourselves and one person to talk to, not a chain of sub-vendors.",
    "The work has taken us across Angul, Sambalpur, Hindol, Chandikhol, Barbil and Mayurbhanj, and outside Odisha to the Yamuna Expressway.",
  ],
  principles: [
    { _key: "owned", title: "Owned, not brokered", body: "Every truck and machine on our list belongs to us. No last-minute substitutions, no waiting on a third party." },
    { _key: "current", title: "Current-generation fleet", body: "Our BS-VI Tata Signa trucks break down less, run cleaner and make it easier to meet client and state norms." },
    { _key: "track", title: "Output you can track", body: "We share trip logs and quantities every day, so the bill always matches the work." },
    { _key: "window", title: "One window", body: "Haulage, earthwork and heavy transport sit under one contract, one billing cycle and one contact person." },
    { _key: "safety", title: "Safety habits from oil & gas", body: "Working for ONGC and NE Oilfield shaped how we run a site. We bring the same discipline to every road and construction job." },
  ],
  areas: ["Angul", "Sambalpur", "Hindol", "Chandikhol", "Barbil", "Mayurbhanj"],
  whereWeWork:
    "We work regularly in Angul, Sambalpur, Hindol, Chandikhol, Barbil and Mayurbhanj. We take on projects across eastern India, and we'll travel further for the right package.",
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
      body: "Our ten tippers handle the high-volume work on road and site jobs: earth, sand, stone aggregate, GSB, WMM and mined material. We run to your paving or loading schedule and share trip logs every day, so you always know what's moved and what's left. On AIPL's highway packages, each of our tippers moved 4,000 to 5,000 tonnes a month.",
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
      body: "Our Hitachi 200 LC Super Plus digs, cuts and loads, and our tippers work alongside it to clear the material. That gives you a complete earthwork unit on site, with no juggling between separate vendors. We've run everything from a single machine up to a 150-person earthwork spread on the Yamuna Expressway.",
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
      body: "Our two Tata Signa 5532.S prime movers (55 t GCW) move heavy plant and machinery between sites. Contractors use them to mobilise at the start of a package, shift equipment between work fronts, and demobilise at the end, without waiting on outside transporters.",
      bestFor: ["Package mobilisation and demobilisation", "Shifting between sites", "Plant relocation"],
      fleetDeployed: ["2 × Tata Signa 5532.S BS-VI 4×2 prime movers"],
      model: "primeMover",
      photo: { brief: "Prime mover with trailer on highway." },
    },
  ],
  engagementModels: [
    { _key: "wet", model: "Wet hire", how: "We supply the machine with an operator, fuel and maintenance. Billed monthly or by the hour.", bestFor: "Excavator on earthwork fronts, tippers on long deployments" },
    { _key: "dry", model: "Dry hire", how: "You get the machine. You supply the operator and fuel.", bestFor: "Sites with in-house operator pools" },
    { _key: "trip", model: "Per-trip / per-m³", how: "Tippers are paid on measured output, with trip logs shared every day.", bestFor: "Aggregate and earth movement tied to progress" },
    { _key: "monthly", model: "Monthly fixed + overtime", how: "Guaranteed hours each month, with extra hours at an agreed rate.", bestFor: "Long-duration package deployment" },
    { _key: "mob", model: "One-time mobilisation", how: "A lump sum to move plant from one location to another.", bestFor: "Package start-up and demobilisation" },
  ],
  rateNote:
    "We share rates for each project after a site visit. Tell us the location, the volumes and how long you need us, and we'll send a quote.",
};

export const fleetPage: FleetPage = {
  seo: {
    title: "Our Fleet | Tata Signa Tippers, Prime Movers, Hitachi Excavator",
    description:
      "13 owned units: Tata Signa 2823.K and Hyva tippers, Tata Signa 5532.S prime movers and a Hitachi 200 LC Super Plus.",
  },
  headline: "13 units. All owned. All maintained by us.",
  intro:
    "Every machine below belongs to Aretus Enterprises. We don't rent from others to fill an order, so the fleet you see here is the fleet you get. You're welcome to inspect it at our yard, or we can bring units to your site.",
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
  summary: "10 tippers, 2 prime movers and 1 excavator: 13 machines, all our own.",
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
      location: "Angul-Sambalpur (160 km), Chandikhol (18 km), GBRP (17 km)",
      scope: "Material haulage for national highway construction",
      sector: "Highways",
      km: 195,
      body: "We started on AIPL's 160 km Angul-Sambalpur package and stayed with them for two more, Chandikhol and GBRP. Our tippers kept steady volumes moving to the paving and earthwork fronts on all three.",
      result: "Each tipper moved 4,000 to 5,000 tonnes a month, and AIPL kept bringing us back.",
      place: "angul",
      photo: "red-soil-highway",
    },
    {
      _key: "gayatri",
      slug: "gayatri-package-11",
      title: "Gayatri Projects: Package 11, Hindol-Angul",
      client: "Gayatri Projects",
      location: "Hindol-Angul, Odisha (46 km)",
      scope: "Material haulage and earthwork support",
      sector: "Highways",
      km: 46,
      body: "Haulage and earthwork support on a 46 km stretch of national highway through central Odisha.",
      place: "hindol",
      photo: "highway-hills",
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
      body: "Our biggest single earthwork job: 11 km of a ₹108 crore package, with a 150-person team on site.",
      result: "A full earthwork spread, delivered outside Odisha.",
      photo: "earthmoving-site",
    },
    {
      _key: "mining",
      slug: "barbil-mining-haulage",
      title: "Mining haulage: TCL & Jindal",
      client: "TCL, Jindal",
      location: "Barbil mining belt, Odisha",
      scope: "Mineral transport",
      sector: "Mining",
      body: "Daily haulage in the Barbil belt, where the haul roads, loading cycles and safety rules are all tougher than on a highway.",
      place: "barbil",
      photo: "open-pit-haul-roads",
    },
    {
      _key: "dam",
      slug: "mayurbhanj-dam",
      title: "Dam project: Laxminarayan Infra",
      client: "Laxminarayan Infra",
      location: "Mayurbhanj, Odisha",
      scope: "Earthwork and haulage for irrigation infrastructure",
      sector: "Irrigation",
      body: "Earthwork and material haulage for dam construction in Mayurbhanj.",
      place: "mayurbhanj",
      photo: "grader-site",
    },
    {
      _key: "oil-gas",
      slug: "ongc-ne-oilfield",
      title: "Oil & gas: ONGC and NE Oilfield",
      client: "ONGC, NE Oilfield",
      sector: "Oil & gas",
      body: "Our work in oil and gas shaped how we handle safety and paperwork, and we bring that same discipline to every construction site.",
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
    { _key: "aipl", name: "AIPL", fullName: "Agrawal Infrabuild (AIPL)", logo: "/images/clients/aipl.png", sector: "Highways", line: "Three national highway packages in Odisha, back to back." },
    { _key: "gayatri", name: "Gayatri Projects", logo: "/images/clients/gayatri.png", sector: "Highways", line: "Package 11, Hindol-Angul." },
    { _key: "megha", name: "Megha Engineering", fullName: "Megha Engineering & Infrastructures (MEIL)", logo: "/images/clients/megha.png", sector: "Infrastructure" },
    { _key: "ongc", name: "ONGC", fullName: "Oil and Natural Gas Corporation (ONGC)", logo: "/images/clients/ongc.svg", sector: "Oil & gas" },
    { _key: "ne-oilfield", name: "NE Oilfield", sector: "Oil & gas" },
    { _key: "gml", name: "GML", sector: "Infrastructure" },
    { _key: "usha", name: "Usha Carrier", sector: "Logistics" },
    { _key: "svt", name: "SVT Logistics", logo: "/images/clients/svt.png", sector: "Logistics" },
    { _key: "jindal", name: "Jindal Steel", fullName: "Jindal Steel & Power", logo: "/images/clients/jindal.svg", sector: "Mining", line: "Mineral haulage, Barbil belt." },
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
      answer: "Yes. Every tipper, prime mover and excavator we list is owned by Aretus Enterprises. We never sub-hire to fill an order.",
    },
    {
      _key: "areas",
      question: "Which areas do you work in?",
      answer: "We're based in Odisha and work regularly in Angul, Sambalpur, Hindol, Chandikhol, Barbil and Mayurbhanj. We'll also travel outside the state for the right project, like we did for the Yamuna Expressway.",
    },
    {
      _key: "operators",
      question: "Do you provide operators and fuel?",
      answer: "Yes. On wet hire we provide trained operators, fuel and maintenance. If you'd rather use your own operators, dry hire works too.",
    },
    {
      _key: "billing",
      question: "How is haulage billed?",
      answer: "Whichever suits you: per trip, per m³, monthly fixed with overtime, or hourly. We share trip logs every day, so the bill matches the measured work.",
    },
    {
      _key: "inspect",
      question: "Can we inspect the fleet before signing?",
      answer: "Of course. We can show you the fleet at our yard or bring units to your site.",
    },
    {
      _key: "emissions",
      question: "Are your vehicles compliant with current emission norms?",
      answer: "Yes. Our Tata Signa trucks are BS-VI, and we share registration, fitness, insurance and permit papers with you before we deploy.",
    },
  ],
};

export const contactPage: ContactPage = {
  seo: {
    title: "Contact Aretus Enterprises | Get a Fleet Quote",
    description:
      "Tell us your site, volumes and timeline. We'll suggest the right mix of machines and share rates after a site visit.",
  },
  headline: "Let's talk about your next project.",
  intro:
    "Tell us about your site, the material volumes and your timeline. We'll suggest the right mix of machines and share rates after a site visit.",
  services: ["Transport & Haulage", "Earthwork & Excavation", "Heavy Equipment Transport"],
  durations: ["Under 1 month", "1 to 3 months", "3 to 6 months", "6+ months"],
  submitLabel: "Send enquiry",
  successMessage: "Thanks, we've got your enquiry. We'll call you within one working day.",
};
