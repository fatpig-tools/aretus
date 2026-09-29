export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-02-01";
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3333";

/** True once a Sanity project is connected; until then the site reads the local content brief. */
export const isSanityConfigured = Boolean(projectId);
