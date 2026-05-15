import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Target, Compass, Rocket, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — nexumfocus" },
      { name: "description", content: "nexumfocus is a cloud, DevOps, and web engineering studio simplifying business solutions and powering progress." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Target, title: "Outcome-first", text: "We measure success in shipped systems and business KPIs — not tickets closed." },
  { icon: Compass, title: "Direction over noise", text: "We define the digital path so your team stops guessing and starts shipping." },
  { icon: Rocket, title: "Built to scale", text: "Cloud Architecture, CI/CD, and Infrastructure as Code engineered for tomorrow." },
  { icon: Users, title: "Embedded partnership", text: "We work alongside your engineers — knowledge transfer is part of every engagement." },
];

function About() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">About nexumfocus</span>
          <h1 className="text-4xl md:text-6xl font-display mt-4 leading-[1.05]">
            Simplifying business solutions, <span className="text-primary">powering progress</span>.
          </h1>
          <p className="text-lg text-muted-foreground mt-6">
            nexumfocus is a cloud, DevOps, and product-engineering studio. We help teams escape the
            chaos of fragmented tooling and stand up advanced Cloud Architecture, modern Web &
            Application platforms, and DevSecOps pipelines that hold up under real load.
          </p>
        </div>
      </section>

      {/* Illustration band */}
      <section className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-display">Our services in one picture.</h2>
            <p className="text-muted-foreground">
              From Research to Sales, we build the digital path. Strategy, Website, SEO, Social Media,
              Software Development, Operations, SOPs and Software Technology Stacks — connected as a
              system, not a checklist.
            </p>
            <p className="text-muted-foreground">
              Underneath it all sits Kubernetes, Terraform, AWS, Docker, CI/CD, GitOps with Flux and
              monitoring through Prometheus, Grafana and Datadog. Reliable foundations, then growth.
            </p>
            <Button asChild size="lg"><Link to="/services">See full service list</Link></Button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
            <img src="/src/assets/business-growth-mindmap.png" alt="Business growth mindmap covering research, website, SEO, software development, operations and sales"
              className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">How we work</span>
          <h2 className="text-3xl md:text-4xl font-display mt-3">Principles that shape every engagement.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="border border-border rounded-xl p-6 bg-card">
              <div className="size-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
                <v.icon className="size-6" />
              </div>
              <h3 className="text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
