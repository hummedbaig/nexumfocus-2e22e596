import edifier from "@/assets/client-edifier.png";
import neoza from "@/assets/client-neoza.png";
import habibi from "@/assets/client-3dhabibi.png";
import halalboys from "@/assets/client-halalboys.png";

const clients = [
  { name: "Edifier Pakistan", logo: edifier, url: "https://edifier.pk" },
  { name: "Neoza", logo: neoza, url: "https://neoza.co" },
  { name: "3D Habibi", logo: habibi, url: "https://3dhabibi.ae" },
  { name: "Halal Boys PK", logo: halalboys, url: "https://www.halalboyspk.com" },
];

export function ClientsMarquee() {
  // Duplicate list so the marquee loops seamlessly
  const loop = [...clients, ...clients];

  return (
    <section className="bg-background border-y border-border py-16">
      <div className="container mx-auto px-4 mb-10 text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">Notable clients</span>
        <h2 className="text-3xl md:text-4xl font-display mt-3">
          Brands trusting <span className="text-primary">nexumfocus</span> to grow.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          From consumer electronics to fashion, food and 3D printing — we power ecommerce strategy
          across categories and geographies.
        </p>
      </div>

      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 md:gap-24 items-center">
          {loop.map((c, i) => (
            <a
              key={`${c.name}-${i}`}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.name}
              className="shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all"
            >
              <img
                src={c.logo}
                alt={c.name}
                className="h-16 md:h-20 w-auto object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
