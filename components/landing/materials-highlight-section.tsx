import Image from "next/image";

export function MaterialsHighlightSection() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8">
        <div className="relative order-2 max-w-xl lg:order-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Materialien im Detail
          </p>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Was in jeder Push Up Sushi Tube steckt
          </h2>
          <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Tube
              </h3>
              <p>Karton-Alu-Verbund für Stabilität, Lebensmittelsicherheit und hochwertigen Druck.</p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Deckel
              </h3>
              <p>PE-Kunststoff, sicher für den Kontakt mit Lebensmitteln und dicht im Verschluss.</p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Strohhalm &amp; Stopfen
              </h3>
              <p>PP-Kunststoff, robust, lebensmittelecht und für den direkten Einsatz entwickelt.</p>
            </div>
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Geprüfte Qualität
              </h3>
              <p>Alle Materialien nach EU-Standards getestet – Testunterlagen können auf Anfrage bereitgestellt werden.</p>
            </div>
          </div>
        </div>

        <div className="relative order-1 mx-auto max-w-md lg:order-2 lg:max-w-none">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-background to-background/60 p-4 shadow-2xl ring-1 ring-black/5">
            <div className="overflow-hidden rounded-2xl bg-background">
              <Image
                src="/materials-tube.png"
                alt="Push Up Sushi Tube mit frischen Zutaten und Sojasauce arrangiert"
                width={768}
                height={768}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

