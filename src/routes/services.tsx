import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";
import {
  Compass, Wrench, Package, Bot, ShoppingCart, Megaphone, Cloud, Check, ArrowRight,
  Search, Map, Hammer, BarChart3, FileText, RefreshCw,
} from "lucide-react";
import strategyImg from "@/assets/strategy-illustration.webp";
import marketingImg from "@/assets/marketing-illustration.webp";
import webdevImg from "@/assets/webdev-illustration.webp";
import cloudImg from "@/assets/cloud-illustration.webp";

const TITLE = "Services | nexumfocus, growth, technology and consulting partner";
const DESC = "Consulting, AI & automation, commerce, growth marketing, platforms and cloud. nexumfocus is a growth, technology and consulting partner under one roof.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Services,
});

const offerings = [
  { icon: Compass, title: "Consulting", text: "Growth and AI audits, roadmaps and ongoing advisory.", href: "#consulting" },
  { icon: Wrench, title: "Services", text: "Hands-on delivery across commerce, marketing, AI and cloud.", href: "#services" },
  { icon: Package, title: "Products", text: "Tools we build and run, born from real client problems.", href: "#products" },
];

const consulting = [
  { title: "Growth Diagnostic", text: "A 2 to 3 week review of your funnel, channels, store and numbers.", gets: ["Clear report of where revenue leaks", "Prioritized 90-day action plan", "Channel and funnel benchmarks"] },
  { title: "AI Readiness Assessment", text: "We review your processes and find where AI and automation will save time or money.", gets: ["Use cases ranked by impact and effort", "Quick wins you can start this month", "Cost and savings estimates"] },
  { title: "Fractional Tech & Growth Lead", text: "Senior guidance on a monthly retainer, without a full-time hire.", gets: ["Weekly strategy sessions", "Vendor and team oversight", "Monthly progress reporting"] },
  { title: "Digital Transformation Roadmap", text: "A step by step plan to move manual operations onto modern systems.", gets: ["Current process map", "Target systems and architecture", "Phased rollout plan and budget"] },
];

const practices = [
  { id: "ai-automation", icon: Bot, img: strategyImg, title: "AI & Automation", promise: "Less manual work, faster decisions and fewer errors.",
    items: ["AI agents for support, operations and sales", "Workflow automation", "MCP integrations with your business systems", "Chatbots and assistants", "Internal AI tools"] },
  { id: "commerce", icon: ShoppingCart, img: webdevImg, title: "Commerce", promise: "Stores that load fast, sell more and run themselves.",
    items: ["Shopify store design and development", "Marketplace integrations (Amazon, eBay, Home Depot)", "Inventory and order sync", "Store speed and conversion optimization"] },
  { id: "growth-marketing", icon: Megaphone, img: marketingImg, title: "Growth Marketing", promise: "Be found, be chosen and keep customers coming back.",
    items: ["SEO", "GEO (Generative Engine Optimization): visibility in AI search like ChatGPT and Perplexity", "Paid social and search", "Content and social media management", "Conversion rate optimization"] },
  { id: "platforms-cloud", icon: Cloud, img: cloudImg, title: "Platforms & Cloud", promise: "Reliable platforms that scale with your demand.",
    items: ["Custom web and mobile applications", "Laravel and API development", "AWS cloud architecture", "DevOps and CI/CD", "Monitoring and analytics dashboards"],
    stack: "AWS, Kubernetes, Docker, Terraform, Ansible, Jenkins, GitHub Actions, ArgoCD, Flux, Prometheus, Grafana, Datadog, Laravel, React, Node.js" },
];

const products = [
  { icon: FileText, title: "Meeting Notes AI", text: "Turns bilingual (Urdu/English) meetings into clear English notes and action items." },
  { icon: RefreshCw, title: "Marketplace Inventory Sync", text: "Keeps stock levels in sync across multiple sales channels automatically." },
];

const steps = [
  { icon: Search, title: "Discover", text: "We learn your business, numbers and goals." },
  { icon: Map, title: "Plan", text: "We agree on a clear, prioritized roadmap." },
  { icon: Hammer, title: "Build", text: "We deliver the technology and marketing." },
  { icon: BarChart3, title: "Measure & improve", text: "We track results and keep improving." },
];

function Services() {
  const { open } = useQuote();
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 md:py-24">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">Services</span>
        <h1 className="text-4xl md:text-6xl font-display mt-4 leading-[1.05] max-w-4xl">
          Everything your business needs to grow, <span className="text-primary">under one roof.</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-6 max-w-2xl">
          We work in three ways: we advise, we build and we create products. Pick what you need today and grow into the rest.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {offerings.map((o) => (
            <a key={o.title} href={o.href} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><o.icon className="size-6" /></div>
              <h2 className="text-xl font-display mt-4">{o.title}</h2>
              <p className="text-muted-foreground mt-2">{o.text}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold mt-4">Learn more <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" /></span>
            </a>
          ))}
        </div>
      </section>

      <section id="consulting" className="bg-muted/40 border-y border-border scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-5xl font-display">Consulting & Advisory</h2>
          <p className="text-lg text-muted-foreground mt-4">Not sure where to start? We diagnose first, then recommend.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {consulting.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-display">{c.title}</h3>
                <p className="text-muted-foreground mt-2">{c.text}</p>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mt-5">What you get</p>
                <ul className="mt-2 space-y-2">
                  {c.gets.map((g) => (
                    <li key={g} className="flex gap-2 text-sm"><Check className="size-4 text-primary mt-0.5 shrink-0" />{g}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="container mx-auto px-4 py-20 scroll-mt-24">
        <h2 className="text-3xl md:text-5xl font-display">Delivery Services</h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl">Four practices, one accountable team.</p>
        <div className="space-y-16 mt-12">
          {practices.map((p, i) => (
            <div key={p.id} id={p.id} className="grid md:grid-cols-2 gap-10 items-center scroll-mt-24">
              <div className={i % 2 ? "md:order-2" : ""}>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><p.icon className="size-6" /></div>
                  <h3 className="text-2xl md:text-3xl font-display">{p.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground mt-4">{p.promise}</p>
                <ul className="mt-5 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2"><Check className="size-5 text-primary mt-0.5 shrink-0" />{it}</li>
                  ))}
                </ul>
                {p.stack && (
                  <details className="mt-5 text-sm">
                    <summary className="cursor-pointer font-semibold text-primary rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Tech stack</summary>
                    <p className="text-muted-foreground mt-2">{p.stack}</p>
                  </details>
                )}
              </div>
              <div className="rounded-3xl bg-accent/40 border border-border p-6">
                <img src={p.img} alt={`${p.title} illustration`} className="w-full h-auto rounded-2xl" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="bg-foreground text-background scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-5xl font-display">Products</h2>
          <p className="text-lg text-background/70 mt-4 max-w-2xl">Some problems come up again and again. When they do, we turn the solution into a product.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {products.map((p) => (
              <div key={p.title} className="rounded-2xl border border-background/15 p-6">
                <p.icon className="size-8 text-primary" />
                <h3 className="text-xl font-display mt-4">{p.title}</h3>
                <p className="text-background/70 mt-2">{p.text}</p>
                <Button asChild className="mt-6">
                  <Link to="/contact" search={{ type: "waitlist" }}>Coming soon, join the waitlist</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-display">How we work</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {steps.map((s, i) => (
            <li key={s.title} className="border-l-2 border-primary pl-4">
              <div className="text-xs font-mono text-primary">0{i + 1}</div>
              <h3 className="text-lg mt-1 flex items-center gap-2"><s.icon className="size-4 text-primary" />{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display">Not sure which service fits? Let's talk.</h2>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Button asChild size="lg"><Link to="/contact" search={{ type: "call" }}>Book a Free 20-min Call</Link></Button>
            <Button size="lg" variant="outline" onClick={open} className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground">Get a Quote</Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
