import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { contactSchema, quoteSchema, CONTACT_EMAIL } from "@/lib/inquiry";

const VERIFY_FAIL = "Verification failed, please try again.";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const envelope = z.object({
  formType: z.enum(["contact", "quote"]),
  data: z.record(z.string(), z.unknown()),
  "cf-turnstile-response": z.string().optional(),
  hp_field: z.string().optional(),
  page: z.string().max(500).optional(),
});

function hostnameAllowed(h: string) {
  return (
    h === "nexumfocus.com" ||
    h === "www.nexumfocus.com" ||
    h === "localhost" ||
    h.endsWith(".lovable.app") ||
    h.endsWith(".lovableproject.com")
  );
}

async function verifyTurnstile(token: string, ip: string | null, action: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const out = (await res.json()) as { success?: boolean; action?: string; hostname?: string };
    return out.success === true && out.action === action && !!out.hostname && hostnameAllowed(out.hostname);
  } catch {
    return false;
  }
}

const line = "----------------------------";
const karachiNow = () =>
  new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "full", timeStyle: "short" }) + " (Asia/Karachi)";

export const Route = createFileRoute("/api/public/send-inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try { raw = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
        const env = envelope.safeParse(raw);
        if (!env.success) return json({ error: "Invalid request." }, 400);
        const { formType, data, hp_field, page } = env.data;

        // Honeypot: silently succeed
        if (hp_field && hp_field.trim() !== "") return json({ ok: true });

        const token = env.data["cf-turnstile-response"];
        if (!token || token.length > 2048) return json({ error: VERIFY_FAIL }, 403);
        const ip =
          request.headers.get("CF-Connecting-IP") ||
          request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
          null;
        if (!(await verifyTurnstile(token, ip, formType))) return json({ error: VERIFY_FAIL }, 403);

        let subject: string;
        let text: string;
        let replyTo: string;
        const footer = `${line}\nSubmitted: ${karachiNow()}\nPage: ${page || "unknown"}`;

        if (formType === "contact") {
          const p = contactSchema.safeParse(data);
          if (!p.success) return json({ error: "Please check the form fields." }, 400);
          const d = p.data;
          replyTo = d.email;
          subject = `[Contact] ${d.name} - ${d.subject}`;
          text = [
            "New Contact Form Submission", line,
            `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || "-"}`,
            `Company: ${d.company || "-"}`, `Subject: ${d.subject}`, "Message:", d.message, footer,
          ].join("\n");
        } else {
          const p = quoteSchema.safeParse(data);
          if (!p.success) return json({ error: "Please check the form fields." }, 400);
          const d = p.data;
          replyTo = d.email;
          subject = `[Quote Request] ${d.name} - ${d.company || "Individual"}`;
          text = [
            "New Quote Request", line,
            `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || "-"}`,
            `Company: ${d.company || "-"}`, `Website: ${d.website || "-"}`,
            `Services needed: ${d.services.length ? d.services.join(", ") : "-"}`,
            `Budget range: ${d.budget}`, `Timeline: ${d.timeline}`, "Project details:", d.message, footer,
          ].join("\n");
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) return json({ error: "Email service is not configured." }, 500);
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "nexumfocus Website <noreply@nexumfocus.com>",
              to: [CONTACT_EMAIL],
              reply_to: replyTo,
              subject,
              text,
            }),
          });
          if (!res.ok) {
            console.error("[send-inquiry] Resend error", res.status, await res.text());
            return json({ error: "Could not send your message." }, 502);
          }
        } catch (e) {
          console.error("[send-inquiry] network error", e);
          return json({ error: "Could not send your message." }, 502);
        }
        return json({ ok: true });
      },
    },
  },
});
