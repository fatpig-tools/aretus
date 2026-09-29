import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { SINGLETONS } from "./schemaTypes/singletons";
import { structure } from "./structure";
import { resolve } from "./presentation";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Aretus Enterprises",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3000",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    // Singletons can't be duplicated or deleted.
    actions: (input, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action)) : input,
  },
});
