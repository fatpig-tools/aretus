import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl },
});
