import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";
import { ArrowRight, TrendingUp, Target, Server, LineChart } from "lucide-react";
import strategyIllustration from "@/assets/growth-graph.webp";
import heroBg from "@/assets/hero-build-big-bg.webp";

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
      {/* Hero */}
      <section className="relative w-full h-[70vh] min-h-[480px] md:h-[80vh] md:min-h-[600px] overflow-hidden border-b border-border">
        <img
          src={heroBg}
          alt="Abstract business growth illustration with upward arrow and city skyline"
          className="absolute inset-0 w-full h-full object-cover"
          width={1600}
          height={900}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-primary-foreground">
              Build <span className="text-primary">Big!</span>
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-primary-foreground/90 max-w-xl">
              You got a business and you want to make big? We are here for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={open}>Get a Quote <ArrowRight className="size-4" /></Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro band */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
          <div className="md:col-span-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">What we do</span>
            <h2 className="text-[1.75rem] md:text-[2rem] lg:text-5xl font-display mt-3 leading-[1.1] text-balance">
              Engineering & strategy that move <span className="text-primary">business forward</span>.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-base md:text-[1.0625rem] lg:text-lg text-muted-foreground">
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
      <section className="bg-foreground text-background border-y border-border relative overflow-hidden">
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-display mt-3 leading-[1.05]">
              Strategy + engineering. <span className="text-primary">One reliable platform.</span>
            </h2>
            <p className="text-background/70 mt-5 text-base md:text-lg max-w-2xl">
              Three connected disciplines, run by one accountable team — so growth, the technology that
              powers it, and the data that proves it stay in lockstep.
            </p>
          </div>

          <div className="relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
              {pillars.map((p, idx) => (
                <div key={p.title} className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="size-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 ring-8 ring-foreground">
                      <p.icon className="size-6" />
                    </div>
                    <div className="text-xs font-mono tracking-widest text-primary">PILLAR {p.n}</div>
                  </div>
                  <h3 className="text-2xl md:text-[1.65rem] font-display leading-tight mb-4 text-background">
                    {p.title}
                  </h3>
                  <p className="text-sm md:text-base text-background/70 leading-relaxed">{p.text}</p>
                  {idx < pillars.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-7 size-2 rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </div>
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
