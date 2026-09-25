import { z } from "zod";

export const CONTACT_EMAIL = "info@nexumfocus.com";
export const SUCCESS_MESSAGE = "Thanks, we've received your message and will reply within 24 hours.";

export const SERVICE_OPTIONS = ["Consulting", "AI & Automation", "Commerce", "Growth Marketing", "Platforms & Cloud"] as const;
export const BUDGET_OPTIONS = ["Under $1k", "$1k to $5k", "$5k to $15k", "$15k+", "Not sure"] as const;
export const TIMELINE_OPTIONS = ["ASAP", "1 to 3 months", "3+ months"] as const;
export const SUBJECT_OPTIONS = ["General inquiry", "Strategy call", "Product waitlist", "Partnership", "Support"] as const;

export const stripHtml = (s: string) => s.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
const clean = (max: number) => z.string().transform(stripHtml).pipe(z.string().max(max));
const req = (max: number, msg: string) => z.string().transform(stripHtml).pipe(z.string().min(1, msg).max(max));

export const contactSchema = z.object({
  name: req(100, "Name is required"),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: clean(40).optional().default(""),
  company: clean(150).optional().default(""),
  subject: z.enum(SUBJECT_OPTIONS),
  message: req(5000, "Message is required"),
});

export const quoteSchema = z.object({
  name: req(100, "Name is required"),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: clean(40).optional().default(""),
  company: clean(150).optional().default(""),
  website: clean(300).optional().default(""),
  services: z.array(z.enum(SERVICE_OPTIONS)).max(5).default([]),
  budget: z.enum(BUDGET_OPTIONS, { message: "Select a budget range" }),
  timeline: z.enum(TIMELINE_OPTIONS, { message: "Select a timeline" }),
  message: req(5000, "Project details are required"),
});

export type ContactInput = z.input<typeof contactSchema>;
export type QuoteInput = z.input<typeof quoteSchema>;

export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  err.issues.forEach((i) => { const k = String(i.path[0]); if (!out[k]) out[k] = i.message; });
  return out;
}

export async function sendInquiry(payload: {
  formType: "contact" | "quote";
  data: Record<string, unknown>;
  token: string;
  honeypot: string;
}): Promise<void> {
  const res = await fetch("/api/public/send-inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formType: payload.formType,
      data: payload.data,
      "cf-turnstile-response": payload.token,
      hp_field: payload.honeypot,
      page: window.location.href,
    }),
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j.error || "Sending failed");
  }
}
