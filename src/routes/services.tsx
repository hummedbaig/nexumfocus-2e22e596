import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — nexumfocus" },
      { name: "description", content: "Kubernetes, Terraform, AWS, Docker, CI/CD, DevSecOps, GitOps, monitoring with Prometheus and Grafana — full-stack cloud and DevOps services." },
    ],
  }),
  component: Services,
});

const groups = [
  {
    title: "Cloud Architecture & Migration",
    intro: "We design Cloud Architecture on AWS that's secure, observable, and cost-aware — then handle the Cloud Migration end-to-end.",
    skills: ["AWS", "Amazon EC2", "Cloud Architecture", "Cloud Migration", "Virtual Desktop Infrastructure"],
  },
  {
    title: "Containers & Orchestration",
    intro: "Docker and Kubernetes done properly — declarative, reproducible, and ready for production traffic.",
    skills: ["Kubernetes", "Docker", "Containerization", "Orchestration"],
  },
  {
    title: "Infrastructure as Code",
    intro: "Terraform and Ansible to make every environment reproducible. No more snowflake servers.",
    skills: ["Terraform", "Ansible", "Infrastructure as Code", "System Administration"],
  },
  {
    title: "CI/CD & GitOps",
    intro: "Modern Deployment Automation with CI/CD pipelines and GitOps practices using tools like Flux — the 2026 standard.",
    skills: ["CI/CD", "Deployment Automation", "GitOps", "Flux"],
  },
  {
    title: "DevSecOps & Compliance",
    intro: "Cloud Security baked in — including SOC 2, GDPR, HIPAA alignment and penetration testing for real-world threats.",
    skills: ["DevSecOps", "Cloud Security", "SOC 2", "GDPR", "HIPAA", "Penetration Testing"],
  },
  {
    title: "Monitoring & Logging",
    intro: "Real-time observability with Prometheus, Grafana, and Datadog — so issues surface before customers do.",
    skills: ["Prometheus", "Grafana", "Datadog", "Monitoring & Logging"],
  },
  {
    title: "Web & Application Development",
    intro: "Advanced web platforms and product engineering — built on modern stacks, designed for conversion.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "API Design", "Microservices", "PostgreSQL"],
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
            Every capability you need to <span className="text-primary">ship and scale</span>.
          </h1>
          <p className="text-lg text-muted-foreground mt-6">
            From Kubernetes orchestration and Terraform-backed Infrastructure as Code to GitOps with
            Flux and DevSecOps compliance — nexumfocus delivers the full cloud stack under one roof.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 space-y-6">
        {groups.map((g, idx) => (
          <article key={g.title}
            className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 border-t border-border pt-8 group">
            <div>
              <span className="text-sm text-muted-foreground font-mono">0{idx + 1}</span>
              <h2 className="text-2xl md:text-3xl font-display mt-2 leading-tight">{g.title}</h2>
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
