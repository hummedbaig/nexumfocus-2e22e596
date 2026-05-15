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
  | { kind: "image"; image: string; alt: string }
  | { kind: "chalk"; title: string; bubbles: string[] };

const slides: Slide[] = [
  { kind: "image", image: mindmap, alt: "Business growth mindmap by nexumfocus" },
  { kind: "chalk", title: "Advanced Web & Application Development", bubbles: webDevSkills },
  { kind: "chalk", title: "Advanced Cloud Architectures", bubbles: cloudSkills },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const next = () => setI((x) => (x + 1) % slides.length);
  const prev = () => setI((x) => (x - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full border-b border-border bg-background">
      <div className="relative w-full h-[60vh] min-h-[420px] md:h-[78vh] md:min-h-[560px] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            aria-hidden={idx !== i}
          >
            {slide.kind === "image" ? (
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ) : (
              <ChalkboardBubbles bubbles={slide.bubbles} title={slide.title} />
            )}
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-12 bg-primary" : "w-6 bg-foreground/30 hover:bg-foreground/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChalkboardBubbles({ bubbles, title }: { bubbles: string[]; title: string }) {
  return (
    <div className="chalkboard w-full h-full p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-6 left-8 md:top-10 md:left-16 chalk-text text-3xl md:text-5xl opacity-90 max-w-2xl leading-tight">
        {title}
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-8 pt-28 md:pt-40">
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center max-w-6xl">
          {bubbles.map((b, idx) => (
            <span
              key={b}
              className="bubble bubble-drift"
              style={{ animationDelay: `${(idx % 6) * 0.4}s`, fontSize: b.length > 18 ? "1rem" : "1.2rem" }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
