import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(150).optional(),
  query: z.string().trim().min(5, "Tell us a bit more").max(2000),
});

const Ctx = createContext<{ open: () => void } | null>(null);
export const useQuote = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("QuoteProvider missing");
  return c;
};

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", query: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-quote", {
        body: result.data,
      });
      if (error) throw error;
      toast.success("Quote request received! We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", company: "", query: "" });
      setOpen(false);
    } catch (err) {
      console.error("[QuoteDialog] submit failed:", err);
      toast.error(
        "Something went wrong sending your request. Please email support@nexumfocus.com directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Get a Quote</DialogTitle>
            <DialogDescription>
              Tell us about your project. We respond within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input id="name" value={form.name} maxLength={100}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} maxLength={255}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company <span className="text-muted-foreground">(optional)</span></Label>
              <Input id="company" value={form.company} maxLength={150}
                onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="query">Your Query *</Label>
              <Textarea id="query" rows={4} value={form.query} maxLength={2000}
                onChange={(e) => setForm({ ...form, query: e.target.value })} />
              {errors.query && <p className="text-xs text-destructive">{errors.query}</p>}
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? "Sending..." : "Submit Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
