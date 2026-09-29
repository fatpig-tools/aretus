import { defineField, defineType } from "sanity";
import { WrenchIcon } from "@sanity/icons/Wrench";
import { RocketIcon } from "@sanity/icons/Rocket";
import { ProjectsIcon } from "@sanity/icons/Projects";
import { UsersIcon } from "@sanity/icons/Users";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { InboxIcon } from "@sanity/icons/Inbox";
import { stringList } from "../objects";

const order = defineField({ name: "order", type: "number", description: "Lower numbers show first.", initialValue: 10 });
const orderings = [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" as const }] }];

const machineModels = [
  { title: "Tata Signa tipper", value: "tipper" },
  { title: "Hyva tipper", value: "hyva" },
  { title: "Prime mover", value: "primeMover" },
  { title: "Excavator", value: "excavator" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: WrenchIcon,
  orderings,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, description: "Used for links such as /services#haulage", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 6, validation: (r) => r.required() }),
    stringList("bestFor", "Best for"),
    stringList("fleetDeployed", "Fleet deployed"),
    defineField({ name: "model", title: "3D machine", type: "string", options: { list: machineModels, layout: "radio" } }),
    defineField({ name: "photo", type: "photoSlot" }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

export const fleetUnit = defineType({
  name: "fleetUnit",
  title: "Fleet unit",
  type: "document",
  icon: RocketIcon,
  orderings,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "qty", title: "Quantity", type: "number", validation: (r) => r.required().integer().min(0) }),
    defineField({ name: "keySpecs", title: "Key specs", type: "text", rows: 3 }),
    defineField({ name: "typicalUse", title: "Typical use", type: "text", rows: 2 }),
    defineField({ name: "model", title: "3D machine", type: "string", options: { list: machineModels, layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "photo", type: "photoSlot" }),
    order,
  ],
  preview: { select: { title: "name", qty: "qty" }, prepare: ({ title, qty }) => ({ title, subtitle: `Qty ${qty ?? "?"}` }) },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  orderings,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", title: "Client (as shown)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sector", type: "string", options: { list: ["Highways", "Expressway", "Mining", "Irrigation", "Oil & gas", "Infrastructure", "Logistics"] } }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "scope", type: "string" }),
    defineField({ name: "km", title: "Length (km)", type: "number" }),
    defineField({ name: "body", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "result", type: "text", rows: 2, description: "Leave empty until confirmed; the result box is hidden when empty." }),
    defineField({
      name: "place",
      title: "Map pin",
      type: "string",
      options: { list: ["angul", "sambalpur", "hindol", "chandikhol", "barbil", "mayurbhanj"] },
    }),
    defineField({
      name: "photo",
      title: "Representative photo",
      type: "string",
      description: "Stock photo shown with a 'Representative photo' credit. Leave empty once real site photos are added.",
      options: { list: ["red-soil-highway", "highway-curve", "bypass-earthwork", "iron-ore-mine", "road-cutting", "excavator-loading", "expressway-aerial", "lowbed-transport"] },
    }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "client" } },
});

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  icon: UsersIcon,
  orderings,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sector", type: "string", options: { list: ["Highways", "Infrastructure", "Oil & gas", "Logistics", "Mining", "Irrigation"] } }),
    defineField({ name: "line", title: "Line for the logo wall", type: "string" }),
    defineField({ name: "logoPermission", title: "We have permission to show their logo", type: "boolean", initialValue: false }),
    defineField({ name: "logo", type: "image", hidden: ({ parent }) => !parent?.logoPermission }),
    order,
  ],
  preview: { select: { title: "name", subtitle: "sector", media: "logo" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  orderings,
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
    order,
  ],
  preview: { select: { title: "question" } },
});

export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  icon: InboxIcon,
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["new", "contacted", "quoted", "won", "lost"], layout: "radio" }, initialValue: "new" }),
    defineField({ name: "name", type: "string", readOnly: true }),
    defineField({ name: "company", type: "string", readOnly: true }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "location", title: "Project location", type: "string", readOnly: true }),
    { ...stringList("services", "Services needed"), readOnly: true },
    defineField({ name: "duration", type: "string", readOnly: true }),
    defineField({ name: "message", type: "text", readOnly: true }),
    defineField({ name: "submittedAt", type: "datetime", readOnly: true }),
    defineField({ name: "notes", title: "Internal notes", type: "text" }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: {
    select: { title: "company", name: "name", status: "status", date: "submittedAt" },
    prepare: ({ title, name, status, date }) => ({
      title: `${title ?? "Unknown"} — ${name ?? ""}`,
      subtitle: `${(status ?? "new").toUpperCase()} · ${date ? new Date(date).toLocaleDateString("en-IN") : ""}`,
    }),
  },
});

export const documentTypes = [service, fleetUnit, project, client, faq, enquiry];
