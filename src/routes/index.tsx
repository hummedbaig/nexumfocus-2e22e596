import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HeroSlider } from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";
import { Cloud, Code2, Shield, GitBranch, Activity, Boxes, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "nexumfocus — Cloud, DevOps & Web Development" },
      { name: "description", content: "Advanced cloud architectures, web & application development, and DevOps engineered to power your business growth." },
    ],
  }),
  component: Home,
});

const pillars = [
  { icon: Cloud, title: "Cloud Architecture", text: "AWS, Amazon EC2, multi-region deployments and Cloud Migration done right." },
  { icon: Boxes, title: "Containerization", text: "Docker and Kubernetes orchestration that scales with your traffic." },
  { icon: Code2, title: "Infrastructure as Code", text: "Terraform and Ansible to keep environments reproducible and auditable." },
  { icon: GitBranch, title: "CI/CD & GitOps", text: "Deployment Automation with Flux and modern GitOps workflows." },
  { icon: Shield, title: "DevSecOps", text: "Cloud Security aligned to SOC 2, GDPR, HIPAA — including penetration testing." },
  { icon: Activity, title: "Monitoring & Logging", text: "Prometheus, Grafana and Datadog for real-time observability." },
];

function Home() {
  const { open } = useQuote();
  return (
    <SiteLayout>
      <HeroSlider />

      {/* Intro band */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">What we do</span>
            <h2 className="text-3xl md:text-5xl font-display mt-3 leading-tight">
              Engineering that moves <span className="text-primary">business forward</span>.
            </h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-lg text-muted-foreground">
            <p>
              nexumfocus partners with ambitious teams to design Cloud Architecture, build modern
              Web & Application platforms, and operationalize DevSecOps. From Kubernetes orchestration
              to Infrastructure as Code with Terraform, we deliver resilient systems that just work.
            </p>
            <p>
              We treat Cloud Migration, CI/CD, and Monitoring & Logging as one connected discipline —
              so your engineers ship faster, your security holds up, and your customers feel the difference.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button size="lg" onClick={open}>Get a Quote <ArrowRight className="size-4" /></Button>
              <Button asChild variant="outline" size="lg"><Link to="/services">Explore Services</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-display mt-3">Six pillars. One reliable platform.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="group bg-card border border-border rounded-xl p-6 hover:border-primary hover:-translate-y-1 transition-all">
                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <p.icon className="size-6" />
                </div>
                <h3 className="text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-display max-w-2xl mx-auto leading-tight">
              Ready to simplify your stack and ship faster?
            </h2>
            <p className="text-background/70 mt-4 max-w-xl mx-auto">
              Tell us about your project — we'll come back within 24 hours with a clear plan.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button size="lg" onClick={open}>Get a Quote</Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
