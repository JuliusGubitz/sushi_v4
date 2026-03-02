export default function ImpressumPage() {
  return (
    <main className="flex-1 pt-24 pb-16 px-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Impressum
        </h1>

        <div className="space-y-4 text-foreground">
          <p>
            POP UP SU-SHI eine Marke der Society Outsiders GbR
          </p>

          <p>
            Vertretungsberechtigte Gesellschafter: Noah Richter, Julius Gubitz
          </p>

          <p>
            Gartenstraße 1<br />
            91242 Ottensoos<br />
            Deutschland
          </p>

          <p>
            Telefon: +49 176 60980118
          </p>

          <p>
            E-Mail:{" "}
            <a href="mailto:info@society-outsiders.com" className="text-accent hover:underline">
              info@society-outsiders.com
            </a>
          </p>

          <p>
            USt-IdNr.: DE332070407
          </p>

          <p>
            Kleinunternehmer gemäß § 19 UStG
          </p>

          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden:{" "}
            <a 
              href="https://ec.europa.eu/consumers/odr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
          </p>
        </div>
      </div>
    </main>
  );
}
