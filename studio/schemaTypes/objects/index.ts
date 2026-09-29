import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";
import { LinkIcon } from "@sanity/icons/Link";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "Meta title", type: "string", validation: (r) => r.required().max(70).warning("Keep under 70 characters") }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (r) => r.required().max(170).warning("Keep under 170 characters") }),
  ],
});

export const photoSlot = defineType({
  name: "photoSlot",
  title: "Photo",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "brief",
      title: "Shot brief",
      type: "string",
      description: "What the photo should show. Displayed on the site as a placeholder until an image is uploaded.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      hidden: ({ parent }) => !parent?.image,
      validation: (r) => r.custom((alt, ctx) => ((ctx.parent as { image?: unknown })?.image && !alt ? "Describe the photo for screen readers" : true)),
    }),
  ],
});

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", description: "Internal path such as /fleet or /contact", validation: (r) => r.required() }),
  ],
});

export const feature = defineType({
  name: "feature",
  title: "Point",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link (optional)", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const stat = defineType({
  name: "stat",
  title: "Number",
  type: "object",
  fields: [
    defineField({ name: "display", title: "Figure as shown", type: "string", description: "e.g. 250+ or 4-5k", validation: (r) => r.required() }),
    defineField({ name: "countTo", title: "Count up to", type: "number", description: "Optional. The animation counts to this, then shows the figure above." }),
    defineField({ name: "unit", type: "string", description: "e.g. km or t" }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "display", subtitle: "label" } },
});

export const engagementModel = defineType({
  name: "engagementModel",
  title: "Engagement model",
  type: "object",
  fields: [
    defineField({ name: "model", type: "string", validation: (r) => r.required() }),
    defineField({ name: "how", title: "How it works", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "bestFor", title: "Best for", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "model", subtitle: "how" } },
});

export const stringList = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })] });

export const objectTypes = [seo, photoSlot, callToAction, feature, stat, engagementModel];
