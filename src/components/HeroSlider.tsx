import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mindmap from "@/assets/hero-mindmap.jpg";
import webdev from "@/assets/hero-webdev.jpg";
import cloud from "@/assets/hero-cloud.jpg";

const slides = [
  { image: mindmap, alt: "nexumfocus business growth mindmap: strategy, marketing, ecommerce, cloud, web, analytics" },
  { image: webdev, alt: "Advanced web and application development — React, Next.js, Node, APIs" },
  { image: cloud, alt: "Advanced cloud architectures — Kubernetes, AWS, security and observability" },
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
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

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
