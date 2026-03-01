"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-0 lg:px-8" style={{ height: "4.5rem" }}>
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Pop Up Su-Shi"
              width={320}
              height={320}
              className="h-36 w-auto"
              priority
              unoptimized
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menü öffnen</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          <Link
            href="/#produkt"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Produkt
          </Link>
          <Link
            href="/#vorteile"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Vorteile
          </Link>
          <Link
            href="/#ablauf"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ablauf
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/anfrage">Anfrage senden</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/customizer">Jetzt Konfigurieren</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="space-y-1 px-6 pb-6">
            <Link
              href="/#produkt"
              className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Produkt
            </Link>
            <Link
              href="/#vorteile"
              className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vorteile
            </Link>
            <Link
              href="/#ablauf"
              className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ablauf
            </Link>
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/anfrage">Anfrage senden</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/customizer">Jetzt Konfigurieren</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
