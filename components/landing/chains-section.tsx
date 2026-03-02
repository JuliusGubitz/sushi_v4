import Link from "next/link";
import { Building2, Truck, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Building2,
    title: "Direkter Support",
    description: "Wir bieten gezielten Ansprechpartner-Support für größere Ketten und begleiten Sie von der ersten Anfrage bis zur Lieferung.",
  },
  {
    icon: Truck,
    title: "Distribution in alle Filialen",
    description: "Wir organisieren die Logistik und Distribution Ihrer individuellen Tubes in alle Ihre Filialen – bundesweit und darüber hinaus.",
  },
  {
    icon: Palette,
    title: "Design & Vermarktung",
    description: "Wir unterstützen Sie bei der Gestaltung und Vermarktung – vom Konzept bis zur finalen Druckvorlage für Ihre Marke.",
  },
];

export function ChainsSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Für Großabnehmer
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Lösungen für große Ketten
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Vom Sushi-Restaurant bis zur internationalen Kette: Wir bieten direkten Support, organisieren die Distribution in alle Filialen und unterstützen Sie bei Design und Vermarktung.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/anfrage">Jetzt anfragen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
