import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HeroSlider } from "@/components/HeroSlider";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";
import { ArrowRight, TrendingUp, Target, Server, LineChart } from "lucide-react";
import strategyIllustration from "@/assets/growth-graph.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "nexumfocus — Ecommerce Strategy, Cloud & Web Development" },
      { name: "description", content: "Ecommerce strategy, cloud architectures, and web & application development engineered to power business growth." },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: Target,
    n: "01",
    title: "Business growth planning",
    text: "We start with your numbers, your buyer and your funnel — then design a quarter-by-quarter growth roadmap covering positioning, ecommerce strategy, marketing channels and conversion plays you can actually execute.",
  },
  {
    icon: Server,
    n: "02",
    title: "Technology & architecture to guarantee that growth",
    text: "Modern web & application development, cloud architecture on AWS, Kubernetes orchestration, CI/CD and DevSecOps — engineered so the platform scales with demand instead of breaking under it.",
  },
  {
    icon: LineChart,
    n: "03",
    title: "Monitoring growth for better decisions",
    text: "Real-time observability and revenue analytics — Prometheus, Grafana, Datadog and product dashboards — so every decision is backed by data on what's actually moving the business forward.",
  },
];

const philosophyPoints = [
  { n: "01", title: "Listen, then map", text: "Every brand has a unique buyer. We map your funnel before touching a single ad or line of code." },
  { n: "02", title: "Compound, don't chase", text: "We build systems that compound — SEO, owned content, retention loops — not one-off spikes." },
  { n: "03", title: "Measure what matters", text: "Revenue per visitor, contribution margin, LTV. Vanity metrics get archived." },
  { n: "04", title: "Engineer for trust", text: "Fast, secure, accessible storefronts — because trust is the real conversion lever." },
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
              Engineering & strategy that move <span className="text-primary">business forward</span>.
            </h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-lg text-muted-foreground">
            <p>
              nexumfocus is an ecommerce strategy and engineering partner. We design Cloud Architecture,
              build modern Web & Application platforms, and run the marketing systems that turn stores
              into category leaders.
            </p>
            <p>
              From Kubernetes orchestration and Infrastructure as Code with Terraform to SEO, paid media
              and conversion optimization — one team, one accountable plan, real revenue outcomes.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button size="lg" onClick={open}>Get a Quote <ArrowRight className="size-4" /></Button>
              <Button asChild variant="outline" size="lg"><Link to="/services">Explore Services</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Notable clients marquee */}
      <ClientsMarquee />

      {/* Business promotion philosophy */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our philosophy</span>
            <h2 className="text-3xl md:text-5xl font-display mt-3 leading-[1.05]">
              Business promotion as a <span className="text-primary">system</span>, not a campaign.
            </h2>
            <p className="text-lg text-muted-foreground mt-6">
              At nexumfocus we treat growth as engineering. Brand, product, storefront, ads, SEO, retention
              — connected as one feedback loop. We diagnose where your funnel leaks revenue, then fix the
              cause, not the symptom. The result is a brand that compounds traffic, conversion and trust
              every quarter — not a sugar-rush of ad spend.
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {philosophyPoints.map((p) => (
                <div key={p.n} className="border-l-2 border-primary pl-4">
                  <div className="text-xs font-mono text-primary">{p.n}</div>
                  <h3 className="text-lg mt-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={open}>
                <TrendingUp className="size-4" /> Get a growth plan
              </Button>
              <Button asChild variant="outline" size="lg"><Link to="/services">See ecommerce services</Link></Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-accent to-muted/40 border border-border p-8 md:p-12 flex items-center justify-center overflow-hidden">
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-primary/10 blur-3xl" />
              <img
                src={strategyIllustration}
                alt="Quarter-over-quarter business growth chart at nexumfocus"
                className="relative w-full h-auto max-w-md"
                width={1024}
                height={1024}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-display mt-3">Strategy + engineering. One reliable platform.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="group bg-card border border-border rounded-xl p-8 hover:border-primary hover:-translate-y-1 transition-all relative">
                <div className="absolute top-6 right-6 text-xs font-mono text-primary/70">{p.n}</div>
                <div className="size-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <p.icon className="size-7" />
                </div>
                <h3 className="text-xl mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
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
