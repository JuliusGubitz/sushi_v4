import Link from "next/link";
import { Printer, ShieldCheck, Package, Layers } from "lucide-react";

const features = [
  {
    icon: Printer,
    title: "Vollflächig bedruckbar",
    description:
      "Ihre Marke im Fokus. Die gesamte Hülle kann individuell gestaltet werden – in allen CMYK-Farben.",
  },
  {
    icon: ShieldCheck,
    title: "Lebensmittelecht",
    description:
      "Zertifiziert nach deutschem Lebensmittelrecht. Geeignet für den direkten Kontakt mit Speisen.",
    note: (
      <>
        Genauere Informationen finden Sie im Datenblatt, das Sie{" "}
        <Link href="/anfrage" className="text-accent hover:underline">
          hier
        </Link>{" "}
        anfordern können.
      </>
    ),
  },
  {
    icon: Package,
    title: "Geringe Stückzahl",
    description:
      "Vom lokalen Sushi-Spot bis zur internationalen Kette: Unsere Push-Up Tubes sind bereits ab 1.000 Stück erhältlich und flexibel für größere Ketten skalierbar.",
  },
  {
    icon: Layers,
    title: "Materialien",
    description:
      "Die Tube besteht aus Karton-Alu-Verbund, die Deckel aus PE und der Strohhalm sowie Stopfen aus PP. Alle Komponenten sind lebensmittelecht. Alle Materialien wurden nach EU-Standards getestet, Testunterlagen liegen vor.",
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
            <div className="relative flex flex-col items-center">
              {/* Height dimension (220mm) - left of sketch */}
              <div className="absolute -left-14 top-0 bottom-8 flex flex-col items-center" style={{ height: "26rem" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-px bg-border" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-px bg-border" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono text-muted-foreground whitespace-nowrap bg-background px-2">
                  220mm
                </span>
              </div>

              {/* Product sketch - Two cylinders */}
              <div className="relative flex items-end justify-center gap-3 pt-0 pb-2">
                {/* Transparent straw tube (left) */}
                <div className="flex flex-col items-center" style={{ height: "26rem" }}>
                  <div className="w-4 h-3 flex-shrink-0 rounded-t-full border border-border bg-muted/40" />
                  <div className="w-3 flex-1 min-h-0 rounded-sm border border-border bg-muted/20" />
                  <div className="w-4 h-3 flex-shrink-0 rounded-b-full border border-border bg-muted/40" />
                </div>
                {/* Main cylinder */}
                <div className="relative" style={{ height: "26rem" }}>
                  <div className="w-20 h-full rounded-full border-2 border-border bg-card shadow-lg flex items-center justify-center overflow-hidden">
                    <span className="text-[10px] text-muted-foreground tracking-wider uppercase -rotate-90 whitespace-nowrap">
                      individuell bedruckbar
                    </span>
                  </div>
                  {/* Width dimension (50mm) - under main cylinder only */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ width: "5rem" }}>
                    <div className="w-full h-px bg-border" />
                    <div className="absolute top-0 left-0 h-3 w-px bg-border" />
                    <div className="absolute top-0 right-0 h-3 w-px bg-border" />
                    <span className="mt-2 text-xs font-mono text-muted-foreground">50mm</span>
                  </div>
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
                  {feature.note && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {feature.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
