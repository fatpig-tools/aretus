"use server";

import { headers } from "next/headers";
import { createClient } from "next-sanity";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export type EnquiryResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

// Best-effort per-instance limit; put a platform firewall rule in front for production.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > MAX_PER_WINDOW;
}

export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const { website, ...data } = parsed.data;
  // Honeypot filled in: pretend success so bots learn nothing.
  if (website) return { ok: true };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return { ok: false, error: "Too many enquiries from this connection. Please call us instead, or try again later." };
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    console.error("Enquiry not stored: Sanity project or write token is not configured.");
    return { ok: false, error: "Our enquiry form is not connected yet. Please call or WhatsApp us for now." };
  }

  try {
    const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
    await client.create({
      _type: "enquiry",
      ...data,
      status: "new",
      submittedAt: new Date().toISOString(),
    });
    return { ok: true };
  } catch (err) {
    console.error("Enquiry write failed", err);
    return { ok: false, error: "Something went wrong sending your enquiry. Please try again, or call us." };
  }
}
