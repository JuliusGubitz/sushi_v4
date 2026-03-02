"use client";

import { UserCircle, Tag, Truck } from "lucide-react";

const trustPoints = [
  {
    icon: UserCircle,
    title: "Persönlicher Kontakt",
    description:
      "Direkte Kommunikation und Design-Beratung aus Deutschland. Ihr persönlicher Kontakt für jedes Projekt.",
  },
  {
    icon: Tag,
    title: "White Label",
    description:
      "Ihr Logo, nicht unseres. Vollständig neutrales Produkt für Ihre Markenidentität.",
  },
  {
    icon: Truck,
    title: "Flexible Lieferung",
    description:
      "Schnelle Lieferung zum gewünschten Termin. Bundesweiter Versand für Ihre Bestellung.",
  },
];

export function TrustSection() {
  return (
    <section id="vorteile" className="py-24 lg:py-32 bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/60 mb-4">
            Warum wir
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            B2B Vorteile auf einen Blick
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {trustPoints.map((point, index) => (
            <div
              key={point.title}
              className="relative p-8 lg:p-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
            >
              <span className="absolute top-6 right-6 text-6xl font-bold text-primary-foreground/5">
                {index + 1}
              </span>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                  <point.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{point.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
