import { createContext, useContext, useRef, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { Turnstile, type TurnstileHandle } from "./Turnstile";
import {
  quoteSchema, fieldErrors, sendInquiry, SERVICE_OPTIONS, BUDGET_OPTIONS, TIMELINE_OPTIONS,
  SUCCESS_MESSAGE, CONTACT_EMAIL,
} from "@/lib/inquiry";

const Ctx = createContext<{ open: () => void } | null>(null);
export const useQuote = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("QuoteProvider missing");
  return c;
};

const empty = { name: "", email: "", phone: "", company: "", website: "", services: [] as string[], budget: "", timeline: "", message: "" };
const selectCls = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [hp, setHp] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const ts = useRef<TurnstileHandle>(null);

  const openDialog = () => { setStatus("idle"); setErrMsg(""); setOpen(true); };

  const toggleService = (s: string) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = quoteSchema.safeParse(form);
    if (!result.success) { setErrors(fieldErrors(result.error)); return; }
    if (!token) return;
    setErrors({});
    setStatus("sending");
    try {
      await sendInquiry({ formType: "quote", data: result.data, token, honeypot: hp });
      setStatus("success");
      setForm(empty);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Sending failed");
      setStatus("error");
    } finally {
      ts.current?.reset();
    }
  };

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <Ctx.Provider value={{ open: openDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Get a Quote</DialogTitle>
            <DialogDescription>Tell us about your project. We respond within 24 hours.</DialogDescription>
          </DialogHeader>
          {status === "success" ? (
            <div className="py-8 text-center space-y-4" role="status">
              <CheckCircle2 className="size-12 text-primary mx-auto" />
              <p className="text-lg">{SUCCESS_MESSAGE}</p>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="q-hp">Leave this field empty</label>
                <input id="q-hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="q-name" label="Name *" error={errors.name}>
                  <Input id="q-name" value={form.name} maxLength={100} onChange={set("name")} />
                </Field>
                <Field id="q-email" label="Email *" error={errors.email}>
                  <Input id="q-email" type="email" value={form.email} maxLength={255} onChange={set("email")} />
                </Field>
                <Field id="q-phone" label="Phone" error={errors.phone}>
                  <Input id="q-phone" type="tel" value={form.phone} maxLength={40} onChange={set("phone")} />
                </Field>
                <Field id="q-company" label="Company" error={errors.company}>
                  <Input id="q-company" value={form.company} maxLength={150} onChange={set("company")} />
                </Field>
                <Field id="q-website" label="Website" error={errors.website}>
                  <Input id="q-website" value={form.website} maxLength={300} placeholder="https://" onChange={set("website")} />
                </Field>
                <Field id="q-budget" label="Budget range *" error={errors.budget}>
                  <select id="q-budget" className={selectCls} value={form.budget} onChange={set("budget")}>
                    <option value="">Select...</option>
                    {BUDGET_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
                <Field id="q-timeline" label="Timeline *" error={errors.timeline}>
                  <select id="q-timeline" className={selectCls} value={form.timeline} onChange={set("timeline")}>
                    <option value="">Select...</option>
                    {TIMELINE_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium mb-2">Services needed</legend>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox checked={form.services.includes(s)} onCheckedChange={() => toggleService(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field id="q-message" label="Project details *" error={errors.message}>
                <Textarea id="q-message" rows={4} value={form.message} maxLength={5000} onChange={set("message")} />
              </Field>
              <Turnstile ref={ts} action="quote" onToken={setToken} />
              {status === "error" && (
                <p className="text-sm text-destructive" role="alert">
                  {errMsg}. Please try again or email us at{" "}
                  <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}
              <Button type="submit" className="w-full" size="lg" disabled={status === "sending" || !token}>
                {status === "sending" ? "Sending..." : "Submit Request"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

export function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
