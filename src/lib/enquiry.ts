import { z } from "zod";
import { contactPage } from "@/content/data";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  company: z.string().trim().min(2, "Please enter your company").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,17}$/, "Enter a valid phone number"),
  email: z.union([z.literal(""), z.email("Enter a valid email address")]).optional(),
  location: z.string().trim().min(2, "Tell us where the project is").max(200),
  services: z.array(z.enum(contactPage.services as [string, ...string[]])).default([]),
  duration: z.union([z.literal(""), z.enum(contactPage.durations as [string, ...string[]])]).optional(),
  message: z.string().trim().max(3000).optional(),
  /** Honeypot: real visitors never see or fill this. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
