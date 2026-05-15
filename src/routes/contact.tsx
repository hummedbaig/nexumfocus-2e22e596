import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";
import { Phone, Mail, Building2, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — nexumfocus" },
      { name: "description", content: "Get in touch with nexumfocus — call +92 (312) 8422 259 or email support@nexumfocus.com." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { open } = useQuote();
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Contact</span>
            <h1 className="text-4xl md:text-6xl font-display mt-4 leading-[1.05]">
              Let's build <span className="text-primary">what's next</span>.
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-md">
              Whether you need Cloud Migration, a CI/CD overhaul, or a brand-new product platform —
              we'd love to hear about it.
            </p>
            <Button size="lg" className="mt-8" onClick={open}>Get a Quote</Button>
          </div>

          <div className="space-y-4">
            <ContactCard icon={Building2} label="Company" value="nexumfocus" />
            <ContactCard icon={Phone} label="Phone" value="+92 (312) 8422 259" href="tel:+923128422259" />
            <ContactCard icon={Mail} label="Email" value="support@nexumfocus.com" href="mailto:support@nexumfocus.com" />
            <ContactCard icon={Clock} label="Response time" value="Within 24 hours, Mon–Fri" />
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
    <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors">
      <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}
