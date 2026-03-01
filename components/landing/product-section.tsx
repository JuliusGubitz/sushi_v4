import { Printer, ShieldCheck, Package } from "lucide-react";

const features = [
  {
    icon: Printer,
    title: "Vollflächig bedruckbar",
    description:
      "Ihre Marke im Fokus. Die gesamte Hülle kann individuell gestaltet werden.",
  },
  {
    icon: ShieldCheck,
    title: "Lebensmittelecht",
    description:
      "Zertifiziert nach deutschem Lebensmittelrecht. Geeignet für den direkten Kontakt mit Speisen.",
  },
  {
    icon: Package,
    title: "Geringe Stückzahl",
    description:
      "Bereits ab 1.000 Stück individualisiert. Perfekt für Events und limitierte Editionen.",
  },
];

export function ProductSection() {
  return (
    <section id="produkt" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Das Produkt
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Technische Details
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Product Dimensions Visual */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Dimension Lines */}
              <div className="absolute -left-16 top-0 bottom-0 flex flex-col items-center justify-center">
                <div className="h-full w-px bg-border" />
                <div className="absolute top-0 w-3 h-px bg-border" />
                <div className="absolute bottom-0 w-3 h-px bg-border" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono text-muted-foreground whitespace-nowrap bg-background px-2">
                  220mm
                </span>
              </div>

              <div className="absolute -bottom-12 left-0 right-0 flex flex-col items-center">
                <div className="w-full h-px bg-border" />
                <div className="absolute left-0 h-3 w-px bg-border" />
                <div className="absolute right-0 h-3 w-px bg-border" />
                <span className="mt-4 text-xs font-mono text-muted-foreground">
                  50mm
                </span>
              </div>

              {/* Product Visualization */}
              <div className="w-20 h-80 relative">
                <div className="absolute inset-0 rounded-full border-2 border-border bg-card shadow-lg overflow-hidden">
                  {/* Top opening */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 border-border bg-muted/30" />

                  {/* Sleeve area - printable */}
                  <div className="absolute top-20 left-0 right-0 h-44 bg-foreground/5 border-y border-border flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground tracking-wider uppercase rotate-90">
                      Bedruckbar
                    </span>
                  </div>

                  {/* Push mechanism */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-14 bg-muted rounded-b-full border-t border-border" />
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-10">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-foreground flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
