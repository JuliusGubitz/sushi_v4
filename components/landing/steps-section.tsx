import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Upload, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Palette,
    title: "Design wählen",
    description:
      "Wählen Sie aus unseren Vorlagen oder starten Sie mit einem leeren Entwurf. Bestimmen Sie Farben und Layout.",
  },
  {
    number: "02",
    icon: Upload,
    title: "Logo hochladen",
    description:
      "Laden Sie Ihr Logo und Ihre Grafiken hoch. Unser Customizer zeigt Ihnen eine Live-Vorschau.",
  },
  {
    number: "03",
    icon: Package,
    title: "Produktion & Versand",
    description:
      "Nach Ihrer Freigabe beginnt die Produktion. Versand erfolgt pünktlich zu Ihrem Wunschtermin.",
  },
];

export function StepsSection() {
  return (
    <section id="ablauf" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            So funktioniert es
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            In 3 Schritten zu Ihrem Produkt
          </h2>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-px bg-border" />

          <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Step indicator */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center relative z-10">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <Button size="lg" asChild>
            <Link href="/customizer">
              Jetzt starten
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
