import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mindmap from "@/assets/business-growth-mindmap.png";

const webDevSkills = [
  "React", "Next.js", "TypeScript", "Node.js", "API Design",
  "Microservices", "GraphQL", "PostgreSQL", "MongoDB", "Tailwind CSS",
  "Web Performance", "Responsive UI", "Authentication", "Stripe Payments", "Real-time Apps",
];

const cloudSkills = [
  "Kubernetes", "Terraform", "AWS", "Docker", "Containerization",
  "Orchestration", "Amazon EC2", "CI/CD", "Cloud Migration", "Cloud Architecture",
  "Infrastructure as Code", "Deployment Automation", "DevSecOps", "SOC 2", "GDPR", "HIPAA",
  "Penetration Testing", "Ansible", "System Administration", "Virtual Desktop Infrastructure",
  "Prometheus", "Grafana", "Datadog", "GitOps", "Flux",
];

type Slide =
  | { kind: "image"; title: string; subtitle: string; tagline: string; image: string }
  | { kind: "chalk"; title: string; subtitle: string; bubbles: string[] };

const slides: Slide[] = [
  {
    kind: "image",
    title: "From Confusion to Conversion",
    subtitle: "We Build the Digital Path. We Define the Direction. You See the Results.",
    tagline: "Business Growth Mindmap",
    image: mindmap,
  },
  {
    kind: "chalk",
    title: "Advanced Web & Application Development",
    subtitle: "Modern stacks engineered for speed, scale, and beautiful experiences.",
    bubbles: webDevSkills,
  },
  {
    kind: "chalk",
    title: "Advanced Cloud Architectures",
    subtitle: "From Kubernetes to GitOps — production-grade infrastructure done right.",
    bubbles: cloudSkills,
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const next = () => setI((x) => (x + 1) % slides.length);
  const prev = () => setI((x) => (x - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[i];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center min-h-[480px]">
          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary">
              {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <h1 className="text-4xl md:text-6xl font-display leading-[1.05]">
              {slide.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">{slide.subtitle}</p>
            <div className="flex gap-3 pt-2">
              <button onClick={prev} aria-label="Previous"
                className="size-12 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center">
                <ChevronLeft className="size-5" />
              </button>
              <button onClick={next} aria-label="Next"
                className="size-12 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center">
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="flex gap-2 pt-2">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-12 bg-primary" : "w-6 bg-border"}`} />
              ))}
            </div>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-border">
            {slide.kind === "image" ? (
              <img src={slide.image} alt={slide.tagline} className="w-full h-full object-cover" />
            ) : (
              <ChalkboardBubbles bubbles={slide.bubbles} title={slide.title} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChalkboardBubbles({ bubbles, title }: { bubbles: string[]; title: string }) {
  return (
    <div className="chalkboard w-full h-full p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-4 left-6 chalk-text text-2xl opacity-70">{title}</div>
      <div className="absolute inset-0 flex items-center justify-center p-8 pt-16">
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center max-w-full">
          {bubbles.map((b, idx) => (
            <span key={b} className="bubble bubble-drift"
              style={{ animationDelay: `${(idx % 6) * 0.4}s`, fontSize: b.length > 18 ? "0.95rem" : "1.1rem" }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
