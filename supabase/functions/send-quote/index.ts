// Receives a quote request from the website, stores it, and emails support@.
// Deploy: supabase functions deploy send-quote --no-verify-jwt
import { createClient } from "jsr:@supabase/supabase-js@2";

const TO_EMAIL = "support@nexumfocus.com";
const FROM_EMAIL = Deno.env.get("QUOTE_FROM_EMAIL") ?? "website@nexumfocus.com";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const ALLOWED_ORIGINS = [
  "https://nexumfocus.com",
  "https://www.nexumfocus.com",
  "http://localhost:8080",
  "http://localhost:5173",
];

function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

function isValid(b: Record<string, unknown>) {
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const query = typeof b.query === "string" ? b.query.trim() : "";
  if (name.length < 1 || name.length > 100) return null;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 255) return null;
  if (company.length > 150) return null;
  if (query.length < 5 || query.length > 2000) return null;
  return { name, email, company: company || null, query };
}

function buildEmail(d: { name: string; email: string; company: string | null; query: string }) {
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18181b">
  <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e4e4e7">
    <tr><td style="padding:28px 32px;border-bottom:1px solid #e4e4e7">
      <p style="margin:0;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#71717a">nexumfocus &middot; website</p>
      <h1 style="margin:8px 0 0;font-size:22px">New quote request</h1>
    </td></tr>
    <tr><td style="padding:24px 32px">
      <table role="presentation" width="100%" style="font-size:14px;line-height:1.6">
        <tr><td style="padding:6px 0;color:#71717a;width:110px">Name</td><td style="padding:6px 0;font-weight:600">${esc(d.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a">Email</td><td style="padding:6px 0"><a href="mailto:${esc(d.email)}" style="color:#dc2626">${esc(d.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#71717a">Company</td><td style="padding:6px 0">${esc(d.company ?? "—")}</td></tr>
      </table>
      <p style="margin:20px 0 6px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#71717a">Query</p>
      <div style="padding:14px 16px;background:#fafafa;border:1px solid #e4e4e7;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap">${esc(d.query)}</div>
      <p style="margin:24px 0 0;font-size:13px;color:#71717a">Reply directly to this email to respond to ${esc(d.name)}.</p>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...cors, "content-type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const data = isValid(body);
    if (!data) {
      return new Response(JSON.stringify({ error: "Invalid submission" }), {
        status: 400, headers: { ...cors, "content-type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ ...data, user_agent: req.headers.get("user-agent") })
      .select("id")
      .single();

    if (dbError) console.error("[send-quote] insert failed:", dbError.message);

    let emailSent = false;
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: `nexumfocus website <${FROM_EMAIL}>`,
          to: [TO_EMAIL],
          reply_to: data.email,
          subject: `Quote request — ${data.name}${data.company ? ` (${data.company})` : ""}`,
          html: buildEmail(data),
        }),
      });
      emailSent = res.ok;
      if (!res.ok) console.error("[send-quote] resend failed:", await res.text());
    } else {
      console.error("[send-quote] RESEND_API_KEY not set; stored only");
    }

    if (row?.id && emailSent) {
      await supabase.from("contact_submissions")
        .update({ email_sent: true }).eq("id", row.id);
    }

    // Stored or emailed is enough to call it received.
    if (!row && !emailSent) throw new Error("Both storage and email failed");

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...cors, "content-type": "application/json" },
    });
  } catch (err) {
    console.error("[send-quote]", err);
    return new Response(JSON.stringify({ error: "Could not send" }), {
      status: 500, headers: { ...cors, "content-type": "application/json" },
    });
  }
});
