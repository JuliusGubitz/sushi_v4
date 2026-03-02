import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight">
                PUSH UP SU-SHI
              </span>
            </Link>
            <p className="mt-4 text-primary-foreground/70 max-w-md leading-relaxed">
              Modernes Sushi-Verpackungssystem für Ihre Marke. Vollständig
              individualisierbar. Design und persöhnlicher Kontakt in Deutschland.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#produkt"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Produkt
                </Link>
              </li>
              <li>
                <Link
                  href="/#vorteile"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Vorteile
                </Link>
              </li>
              <li>
                <Link
                  href="/#ablauf"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Ablauf
                </Link>
              </li>
              <li>
                <Link
                  href="/customizer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Customizer
                </Link>
              </li>
              <li>
                <Link
                  href="/anfrage"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/impressum"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} POPUPSU-SHI. Alle Rechte
            vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://www.instagram.com/popupsushi.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:info@popupsu-shi.de"
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              info@popupsu-shi.de
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
