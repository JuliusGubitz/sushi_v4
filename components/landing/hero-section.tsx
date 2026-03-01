import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-foreground text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/60 mb-6">
              Premium Verpackungslösung
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
              Push Up Sushi: Ihr Design. Unsere Verpackung.
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-primary-foreground/80 leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              Die innovative Sushi-Verpackung für Ihre Marke. Vollständig
              individualisierbar.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto"
                asChild
              >
                <Link href="/customizer">
                  Jetzt Konfigurieren
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto bg-transparent"
                asChild
              >
                <Link href="/anfrage">Anfrage senden</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-96 lg:w-[500px]">
              <Image
                src="/hero-tube.png"
                alt="Push Up Sushi Tube"
                width={1024}
                height={1024}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
