import { HeroSection } from "@/components/landing/hero-section";
import { ProductSection } from "@/components/landing/product-section";
import { TrustSection } from "@/components/landing/trust-section";
import { StepsSection } from "@/components/landing/steps-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <TrustSection />
      <StepsSection />
    </main>
  );
}
