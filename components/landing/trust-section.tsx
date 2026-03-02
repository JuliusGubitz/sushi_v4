"use client";

import Link from "next/link";
import { UserCircle, Tag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const pricingData = [
  { menge: "1.000", stueckkosten: 1.59, aufAnfrage: false },
  { menge: "2.500", stueckkosten: 1.29, aufAnfrage: false },
  { menge: "5.000", stueckkosten: 0.99, aufAnfrage: false },
  { menge: "10.000", stueckkosten: 0.90, aufAnfrage: false },
  { menge: "25.000", stueckkosten: 0.85, aufAnfrage: false },
  { menge: "50.000", stueckkosten: 0.80, aufAnfrage: true },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload?: { aufAnfrage?: boolean } }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const isAufAnfrage = payload[0]?.payload?.aufAnfrage;
  return (
    <div className="bg-white text-foreground rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold">{label} Stück</p>
      <p className="text-accent font-mono">
        {isAufAnfrage ? "auf Anfrage" : `${payload[0].value.toFixed(2).replace(".", ",")} € / Stück`}
      </p>
    </div>
  );
}

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

        {/* Pricing Chart */}
        <div className="mt-16 lg:mt-20 p-8 lg:p-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5">
          <h3 className="text-xl font-semibold mb-2 text-center">Preisstaffelung</h3>
          <p className="text-primary-foreground/60 text-sm text-center mb-8">
            Je größer die Bestellung, desto günstiger der Stückpreis
          </p>
          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pricingData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="menge"
                  type="category"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  label={{ value: "Menge (Stück)", position: "insideBottom", offset: -5, fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  domain={[0.5, 1.8]}
                  ticks={[0.5, 0.75, 1.0, 1.25, 1.5, 1.75]}
                  tickFormatter={(v: number) => `${v.toFixed(2).replace(".", ",")} €`}
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  label={{ value: "Stückkosten", angle: -90, position: "center", dx: -25, fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="linear"
                  dataKey="stueckkosten"
                  stroke="#f97316"
                  strokeWidth={3}
                  connectNulls
                  dot={{ r: 6, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground">
              <Link href="/anfrage">Produktkatalog anfordern</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
