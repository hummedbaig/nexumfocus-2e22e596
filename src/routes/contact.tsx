import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuote, Field } from "@/components/QuoteDialog";
import { Turnstile, type TurnstileHandle } from "@/components/Turnstile";
import { Phone, Mail, Building2, Clock, CheckCircle2 } from "lucide-react";
import {
  contactSchema, fieldErrors, sendInquiry, SUBJECT_OPTIONS, SUCCESS_MESSAGE, CONTACT_EMAIL,
} from "@/lib/inquiry";

const searchSchema = z.object({ type: z.enum(["call", "waitlist"]).optional().catch(undefined) });

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact nexumfocus | Book a Free 20-min Call" },
      { name: "description", content: "Contact nexumfocus: call +92 (312) 8422 259, email info@nexumfocus.com or book a free 20-minute strategy call." },
      { property: "og:title", content: "Contact nexumfocus | Book a Free 20-min Call" },
      { property: "og:description", content: "Talk to a growth, technology and consulting partner. We reply within 24 hours." },
    ],
  }),
  component: Contact,
});

const selectCls = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Contact() {
  const { open } = useQuote();
  const { type } = Route.useSearch();
  const preset = type === "call" ? "Strategy call" : type === "waitlist" ? "Product waitlist" : "General inquiry";
  const empty = { name: "", email: "", phone: "", company: "", subject: preset as string, message: "" };
  const [form, setForm] = useState(empty);
  const [hp, setHp] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const ts = useRef<TurnstileHandle>(null);

  useEffect(() => { setForm((f) => ({ ...f, subject: preset })); }, [preset]);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = contactSchema.safeParse(form);
    if (!r.success) { setErrors(fieldErrors(r.error)); return; }
    if (!token) return;
    setErrors({});
    setStatus("sending");
    try {
      await sendInquiry({ formType: "contact", data: r.data, token, honeypot: hp });
      setStatus("success");
      setForm({ ...empty, subject: preset });
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Sending failed");
      setStatus("error");
    } finally {
      ts.current?.reset();
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Contact</span>
            <h1 className="text-4xl md:text-6xl font-display mt-4 leading-[1.05]">
              Let's build <span className="text-primary">what's next</span>.
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-md">
              Whether you need a growth plan, an AI automation or a brand-new platform, we'd love to hear about it.
            </p>
            <div className="space-y-4 mt-10">
              <ContactCard icon={Building2} label="Company" value="nexumfocus" />
              <ContactCard icon={Phone} label="Phone" value="+92 (312) 8422 259" href="tel:+923128422259" />
              <ContactCard icon={Mail} label="Email" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} />
              <ContactCard icon={Clock} label="Response time" value="Within 24 hours, Mon to Fri" />
            </div>
            <Button size="lg" variant="outline" className="mt-8" onClick={open}>Need a detailed quote instead?</Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-2xl font-display mb-6">Send us a message</h2>
            {status === "success" ? (
              <div className="py-10 text-center space-y-4" role="status">
                <CheckCircle2 className="size-12 text-primary mx-auto" />
                <p className="text-lg">{SUCCESS_MESSAGE}</p>
                <Button variant="outline" onClick={() => setStatus("idle")}>Send another message</Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="c-hp">Leave this field empty</label>
                  <input id="c-hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="c-name" label="Name *" error={errors.name}>
                    <Input id="c-name" value={form.name} maxLength={100} onChange={set("name")} />
                  </Field>
                  <Field id="c-email" label="Email *" error={errors.email}>
                    <Input id="c-email" type="email" value={form.email} maxLength={255} onChange={set("email")} />
                  </Field>
                  <Field id="c-phone" label="Phone" error={errors.phone}>
                    <Input id="c-phone" type="tel" value={form.phone} maxLength={40} onChange={set("phone")} />
                  </Field>
                  <Field id="c-company" label="Company" error={errors.company}>
                    <Input id="c-company" value={form.company} maxLength={150} onChange={set("company")} />
                  </Field>
                </div>
                <Field id="c-subject" label="Subject *" error={errors.subject}>
                  <select id="c-subject" className={selectCls} value={form.subject} onChange={set("subject")}>
                    {SUBJECT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field id="c-message" label="Message *" error={errors.message}>
                  <Textarea id="c-message" rows={5} value={form.message} maxLength={5000} onChange={set("message")} />
                </Field>
                <Turnstile ref={ts} action="contact" onToken={setToken} />
                {status === "error" && (
                  <p className="text-sm text-destructive" role="alert">
                    {errMsg}. Please try again or email us at{" "}
                    <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={status === "sending" || !token}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactCard({ icon: Icon, label, value, href }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary transition-colors">
      <div className="size-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold mt-1 break-all">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{inner}</a> : inner;
}
