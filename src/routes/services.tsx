import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";
import strategyIllustration from "@/assets/strategy-illustration.png";
import marketingIllustration from "@/assets/marketing-illustration.png";
import cloudIllustration from "@/assets/cloud-illustration.png";
import webdevIllustration from "@/assets/webdev-illustration.png";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — nexumfocus" },
      { name: "description", content: "Ecommerce strategy, marketing, web & application development, Kubernetes, Terraform, AWS, CI/CD, DevSecOps and monitoring — full-stack growth services." },
    ],
  }),
  component: Services,
});

type Group = {
  title: string;
  intro: string;
  skills: string[];
  illustration?: string;
};

const featured: Group[] = [
  {
    title: "Ecommerce & Business Strategy",
    intro:
      "We design the storefront strategy that turns visitors into repeat buyers — funnel mapping, pricing architecture, merchandising, retention, and a roadmap your team can actually execute.",
    skills: ["Shopify", "WooCommerce", "Headless Commerce", "Funnel Mapping", "Conversion Optimization", "Merchandising", "Pricing Strategy", "Retention & LTV", "Loyalty Programs", "Subscriptions"],
    illustration: strategyIllustration,
  },
  {
    title: "Marketing & Brand Promotion",
    intro:
      "Performance marketing without the bloat. SEO, paid social, Google Ads, email, content systems and analytics — wired together so every dollar is measurable.",
    skills: ["SEO", "Technical SEO", "Google Ads", "Meta Ads", "TikTok Ads", "Email & SMS", "Content Marketing", "Social Media", "Analytics & GA4", "Influencer Campaigns"],
    illustration: marketingIllustration,
  },
  {
    title: "Web & Application Development",
    intro:
      "High-performance storefronts and custom platforms built on modern stacks. Designed for speed, conversion, and a beautiful experience on every device.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "API Design", "Microservices", "GraphQL", "PostgreSQL", "MongoDB", "Tailwind CSS", "Stripe Payments", "Real-time Apps"],
    illustration: webdevIllustration,
  },
  {
    title: "Cloud & DevOps Infrastructure",
    intro:
      "Production-grade infrastructure for stores and SaaS. Kubernetes, Terraform, GitOps and DevSecOps — engineered for scale, security and 24/7 uptime.",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Ansible", "CI/CD", "GitOps", "Flux", "DevSecOps", "Prometheus", "Grafana", "Datadog", "SOC 2", "GDPR", "HIPAA"],
    illustration: cloudIllustration,
  },
];

const supporting: Group[] = [
  {
    title: "Cloud Architecture & Migration",
    intro: "Cloud Architecture on AWS that's secure, observable and cost-aware — Cloud Migration handled end-to-end.",
    skills: ["AWS", "Amazon EC2", "Cloud Architecture", "Cloud Migration", "Virtual Desktop Infrastructure"],
  },
  {
    title: "Containers & Orchestration",
    intro: "Docker and Kubernetes done properly — declarative, reproducible, ready for production traffic.",
    skills: ["Kubernetes", "Docker", "Containerization", "Orchestration"],
  },
  {
    title: "Infrastructure as Code",
    intro: "Terraform and Ansible to make every environment reproducible. No more snowflake servers.",
    skills: ["Terraform", "Ansible", "Infrastructure as Code", "System Administration"],
  },
  {
    title: "CI/CD & GitOps",
    intro: "Modern Deployment Automation with CI/CD pipelines and GitOps using tools like Flux — the 2026 standard.",
    skills: ["CI/CD", "Deployment Automation", "GitOps", "Flux"],
  },
  {
    title: "DevSecOps & Compliance",
    intro: "Cloud Security baked in — SOC 2, GDPR, HIPAA alignment and penetration testing for real-world threats.",
    skills: ["DevSecOps", "Cloud Security", "SOC 2", "GDPR", "HIPAA", "Penetration Testing"],
  },
  {
    title: "Monitoring & Logging",
    intro: "Real-time observability with Prometheus, Grafana and Datadog — so issues surface before customers do.",
    skills: ["Prometheus", "Grafana", "Datadog", "Monitoring & Logging"],
  },
];

function Services() {
  const { open } = useQuote();
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Services</span>
          <h1 className="text-4xl md:text-6xl font-display mt-4 leading-[1.05]">
            Ecommerce strategy, marketing & engineering — <span className="text-primary">end to end</span>.
          </h1>
          <p className="text-lg text-muted-foreground mt-6">
            From Shopify storefronts and SEO to Kubernetes, Terraform-backed Infrastructure as Code, GitOps
            with Flux and DevSecOps compliance — nexumfocus delivers the full growth stack under one roof.
          </p>
        </div>
      </section>

      {/* Featured services with illustrations */}
      <section className="container mx-auto px-4 pb-8 space-y-24">
        {featured.map((g, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <article key={g.title} className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={reverse ? "md:order-2" : ""}>
                <span className="text-sm font-mono text-primary">0{idx + 1}</span>
                <h2 className="text-3xl md:text-4xl font-display mt-2 leading-tight">{g.title}</h2>
                <p className="text-muted-foreground text-lg mt-5">{g.intro}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {g.skills.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm border border-border">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className={reverse ? "md:order-1" : ""}>
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-accent to-muted/40 border border-border p-8 md:p-12 flex items-center justify-center overflow-hidden">
                  <div className="absolute -top-10 -right-10 size-40 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-primary/10 blur-3xl" />
                  {g.illustration && (
                    <img
                      src={g.illustration}
                      alt={`${g.title} illustration`}
                      className="relative w-full h-auto max-w-md"
                      width={1024}
                      height={1024}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Supporting services list */}
      <section className="container mx-auto px-4 py-24 mt-12">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Specialist capabilities</span>
          <h2 className="text-3xl md:text-4xl font-display mt-3">Every layer of the cloud stack.</h2>
        </div>
        <div className="space-y-6">
          {supporting.map((g, idx) => (
            <article key={g.title}
              className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 border-t border-border pt-8">
              <div>
                <span className="text-sm text-muted-foreground font-mono">0{idx + 1}</span>
                <h3 className="text-2xl font-display mt-2 leading-tight">{g.title}</h3>
              </div>
              <div>
                <p className="text-muted-foreground text-lg">{g.intro}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {g.skills.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm border border-border">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-display max-w-2xl mx-auto">Need a custom scope?</h2>
          <p className="opacity-90 mt-3 max-w-xl mx-auto">Tell us your goals — we'll map the right services and a clear timeline.</p>
          <Button size="lg" variant="secondary" className="mt-6" onClick={open}>Get a Quote</Button>
        </div>
      </section>
    </SiteLayout>
  );
}
