import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/components/QuoteDialog";
import { Search, Hammer, Package, Users, Clock, TrendingUp, Bot, Timer, Linkedin, User } from "lucide-react";

const TITLE = "About Us | nexumfocus, growth, technology and consulting partner";
const DESC = "nexumfocus connects strategy, technology and growth. A growth, technology and consulting partner for businesses in Pakistan, the Middle East, the UK and North America.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: About,
});

/** Set to true once real team details are filled in below. */
const SHOW_TEAM = false;
const team = [
  { name: "Team Member", role: "Founder & Strategy Lead", photo: "", linkedin: "#" },
  { name: "Team Member", role: "Head of Engineering", photo: "", linkedin: "#" },
  { name: "Team Member", role: "Growth Marketing Lead", photo: "", linkedin: "#" },
];

const whatWeDo = [
  { icon: Search, title: "Consult", text: "We find what's holding growth back.", hash: "consulting" },
  { icon: Hammer, title: "Build", text: "We deliver the technology and marketing to fix it.", hash: "services" },
  { icon: Package, title: "Create", text: "We turn proven solutions into products.", hash: "products" },
];

const principles = [
  { n: "01", title: "Listen, then map", text: "Every brand has a unique buyer. We map your funnel before touching a single ad or line of code." },
  { n: "02", title: "Compound, don't chase", text: "We build systems that compound, like SEO, owned content and retention loops, not one-off spikes." },
  { n: "03", title: "Measure what matters", text: "Revenue per visitor, contribution margin, LTV. Vanity metrics get archived." },
  { n: "04", title: "Engineer for trust", text: "Fast, secure, accessible storefronts, because trust is the real conversion lever." },
];

const why = [
  { icon: Users, text: "One accountable team from strategy to delivery" },
  { icon: Clock, text: "Senior talent with strong time-zone overlap with the Gulf, UK and Europe" },
  { icon: TrendingUp, text: "Outcome-focused: we report on revenue, not vanity metrics" },
  { icon: Bot, text: "Real hands-on experience with AI agents and automation" },
  { icon: Timer, text: "Response within 24 hours" },
];

function About() {
  const { open } = useQuote();
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">About Us</span>
          <h1 className="text-4xl md:text-6xl font-display mt-4 leading-[1.05]">
            We connect strategy, technology and <span className="text-primary">growth</span>.
          </h1>
          <p className="text-lg text-muted-foreground mt-6">
            The name nexumfocus comes from the Latin 'nexum', meaning a bond or connection, and 'focus', our
            commitment to outcomes. We connect the parts of a business that usually work in silos: planning,
            technology, marketing and data, and focus them on one goal: measurable growth.
          </p>
        </div>
      </section>

      <section className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-20 grid md:grid-cols-12 gap-8">
          <h2 className="md:col-span-4 text-3xl md:text-4xl font-display">Who we are</h2>
          <p className="md:col-span-8 text-lg text-muted-foreground">
            nexumfocus is a team of engineers, marketers and strategists based in Pakistan, working with businesses
            across Pakistan, the Middle East, the UK and North America. We have built ecommerce stores, marketplace
            integrations, AI agents and cloud platforms for brands in consumer electronics, fashion, food and 3D printing.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-display">What we do</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {whatWeDo.map((w) => (
            <Link key={w.title} to="/services" hash={w.hash} className="rounded-2xl border border-border bg-card p-6 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <w.icon className="size-8 text-primary" />
              <h3 className="text-xl font-display mt-4">{w.title}</h3>
              <p className="text-muted-foreground mt-2">{w.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-display">Our principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {principles.map((p) => (
              <div key={p.n} className="rounded-2xl border border-background/15 p-6">
                <div className="text-xs font-mono text-primary">{p.n}</div>
                <h3 className="text-lg mt-2">{p.title}</h3>
                <p className="text-sm text-background/70 mt-2">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-display">Why work with us</h2>
        <ul className="grid md:grid-cols-2 gap-5 mt-10">
          {why.map((w) => (
            <li key={w.text} className="flex items-start gap-4">
              <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><w.icon className="size-5" /></div>
              <span className="text-lg pt-1.5">{w.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {SHOW_TEAM && (
        <section className="container mx-auto px-4 pb-20">
          <h2 className="text-3xl md:text-4xl font-display">Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {team.map((m, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 text-center">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="size-28 rounded-full object-cover mx-auto" />
                ) : (
                  <div className="size-28 rounded-full bg-muted mx-auto flex items-center justify-center"><User className="size-10 text-muted-foreground" /></div>
                )}
                <h3 className="text-lg font-display mt-4">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                <a href={m.linkedin} aria-label={`${m.name} on LinkedIn`} className="inline-flex mt-3 text-primary"><Linkedin className="size-5" /></a>
              </div>
            ))}
          </div>
        </section>
      )}

      <div>
        <h2 className="sr-only">Brands we've worked with</h2>
        <ClientsMarquee title="Brands we've worked with" />
      </div>

      <section className="container mx-auto px-4 py-24">
        <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display">Let's build something big together.</h2>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Button size="lg" onClick={open}>Get a Quote</Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
