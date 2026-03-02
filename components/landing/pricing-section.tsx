"use client";

import Link from "next/link";
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

const pricingData = [
  { menge: "1.000", stueckkosten: 1.59, aufAnfrage: false },
  { menge: "2.500", stueckkosten: 1.29, aufAnfrage: false },
  { menge: "5.000", stueckkosten: 0.99, aufAnfrage: true },
  { menge: "10.000", stueckkosten: 0.90, aufAnfrage: true },
  { menge: "25.000", stueckkosten: 0.85, aufAnfrage: true },
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

export function PricingSection() {
  return (
    <section className="py-24 lg:py-32 bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="p-8 lg:p-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5">
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
