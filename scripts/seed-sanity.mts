/**
 * Seeds Sanity with the website content brief (src/content/data.ts).
 *
 *   node --env-file=.env.local scripts/seed-sanity.mts            # write
 *   node scripts/seed-sanity.mts --dry-run                         # print what would be written
 *
 * Idempotent: singletons use fixed IDs; collection documents are matched by slug/name and
 * updated in place, so re-running never creates duplicates.
 */
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { createClient } from "@sanity/client";
import * as data from "../src/content/data.ts";

const dryRun = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!dryRun && (!projectId || !token)) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (e.g. in .env.local).");
  process.exit(1);
}

const client = createClient({
  projectId: projectId || "dryrun",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const slug = (current: string) => ({ _type: "slug", current });
const withKeys = <T extends object>(items: T[], prefix: string) =>
  items.map((item, i) => ({ _key: (item as { _key?: string })._key ?? `${prefix}${i}`, ...item }));
const strings = (items: string[]) => items;
const photo = (p: { brief: string }) => ({ _type: "photoSlot", brief: p.brief });

type Doc = { _id?: string; _type: string; [k: string]: unknown };

const singletons: Doc[] = [
  { _id: "siteSettings", _type: "siteSettings", ...data.siteSettings },
  {
    _id: "homePage",
    _type: "homePage",
    seo: { _type: "seo", ...data.homePage.seo },
    hero: {
      ...data.homePage.hero,
      primaryCta: { _type: "callToAction", ...data.homePage.hero.primaryCta },
      secondaryCta: { _type: "callToAction", ...data.homePage.hero.secondaryCta },
      photo: photo(data.homePage.hero.photo),
    },
    numbers: withKeys(data.homePage.numbers.map((n) => ({ _type: "stat", ...n })), "n"),
    whatWeDo: withKeys(data.homePage.whatWeDo.map((f) => ({ _type: "feature", ...f })), "w"),
    whyAretus: withKeys(data.homePage.whyAretus.map((f) => ({ _type: "feature", ...f })), "y"),
    trustLine: data.homePage.trustLine,
    closing: { body: data.homePage.closing.body, cta: { _type: "callToAction", ...data.homePage.closing.cta } },
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    seo: { _type: "seo", ...data.aboutPage.seo },
    headline: data.aboutPage.headline,
    story: data.aboutPage.story,
    principles: withKeys(data.aboutPage.principles.map((f) => ({ _type: "feature", ...f })), "p"),
    areas: strings(data.aboutPage.areas),
    whereWeWork: data.aboutPage.whereWeWork,
  },
  {
    _id: "servicesPage",
    _type: "servicesPage",
    seo: { _type: "seo", ...data.servicesPage.seo },
    headline: data.servicesPage.headline,
    engagementModels: withKeys(data.servicesPage.engagementModels.map((m) => ({ _type: "engagementModel", ...m })), "e"),
    rateNote: data.servicesPage.rateNote,
  },
  { _id: "fleetPage", _type: "fleetPage", seo: { _type: "seo", ...data.fleetPage.seo }, headline: data.fleetPage.headline, intro: data.fleetPage.intro, summary: data.fleetPage.summary },
  { _id: "projectsPage", _type: "projectsPage", seo: { _type: "seo", ...data.projectsPage.seo }, headline: data.projectsPage.headline },
  { _id: "clientsPage", _type: "clientsPage", seo: { _type: "seo", ...data.clientsPage.seo }, headline: data.clientsPage.headline },
  { _id: "faqPage", _type: "faqPage", seo: { _type: "seo", ...data.faqPage.seo }, headline: data.faqPage.headline },
  {
    _id: "contactPage",
    _type: "contactPage",
    seo: { _type: "seo", ...data.contactPage.seo },
    headline: data.contactPage.headline,
    intro: data.contactPage.intro,
    submitLabel: data.contactPage.submitLabel,
    successMessage: data.contactPage.successMessage,
  },
];

// Collections: [type, match field, docs]
const collections: [string, string, Doc[]][] = [
  [
    "service",
    "slug.current",
    data.servicesPage.services.map((s, i) => ({
      _type: "service",
      title: s.title,
      slug: slug(s.slug),
      body: s.body,
      bestFor: s.bestFor,
      fleetDeployed: s.fleetDeployed,
      model: s.model,
      photo: photo(s.photo),
      order: (i + 1) * 10,
    })),
  ],
  [
    "fleetUnit",
    "slug.current",
    data.fleetPage.units.map((u, i) => ({
      _type: "fleetUnit",
      name: u.name,
      slug: slug(u.slug),
      qty: u.qty,
      keySpecs: u.keySpecs,
      typicalUse: u.typicalUse,
      model: u.model,
      photo: photo(u.photo),
      order: (i + 1) * 10,
    })),
  ],
  [
    "project",
    "slug.current",
    data.projectsPage.projects.map(({ _key, slug: s, ...p }, i) => ({ _type: "project", ...p, slug: slug(s), order: (i + 1) * 10 })),
  ],
  [
    "client",
    "name",
    data.clientsPage.clients.map(({ _key, logo, ...c }, i) => ({
      _type: "client",
      ...c,
      logoPermission: Boolean(logo),
      logoFile: logo,
      order: (i + 1) * 10,
    })),
  ],
  ["faq", "question", data.faqPage.faqs.map(({ _key, ...f }, i) => ({ _type: "faq", ...f, order: (i + 1) * 10 }))],
];

function get(doc: Doc, path: string) {
  return path.split(".").reduce<unknown>((v, k) => (v as Record<string, unknown>)?.[k], doc);
}

/** Uploads a logo from public/ and returns an image field value (dry run: a placeholder). */
async function uploadLogo(path: string) {
  if (dryRun) return { _type: "image", asset: { _type: "reference", _ref: `dry-run:${path}` } };
  const file = await readFile(`public${path}`);
  const asset = await client.assets.upload("image", file, { filename: basename(path) });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  for (const [type, , docs] of collections) {
    if (type !== "client") continue;
    for (const doc of docs) {
      const path = doc.logoFile as string | undefined;
      delete doc.logoFile;
      if (path) doc.logo = await uploadLogo(path);
    }
  }

  const tx = client.transaction();
  for (const doc of singletons) tx.createOrReplace(doc as Doc & { _id: string });

  for (const [type, field, docs] of collections) {
    const existing: { _id: string; key: string }[] = dryRun
      ? []
      : await client.fetch(`*[_type == $type && !(_id in path("drafts.**"))]{ _id, "key": ${field} }`, { type });
    for (const doc of docs) {
      const match = existing.find((e) => e.key === get(doc, field));
      if (match) tx.createOrReplace({ ...doc, _id: match._id });
      else tx.create(doc);
    }
  }

  const total = singletons.length + collections.reduce((n, [, , d]) => n + d.length, 0);
  if (dryRun) {
    console.log(`Dry run: ${total} documents would be written.`);
    for (const [type, , docs] of collections) console.log(`  ${type}: ${docs.length}`);
    console.log(`  singletons: ${singletons.map((d) => d._id).join(", ")}`);
    return;
  }
  const res = await tx.commit();
  console.log(`Seeded ${res.results.length} documents into ${client.config().dataset}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
