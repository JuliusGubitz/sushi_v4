import { HeroSection } from "@/components/landing/hero-section";
import { ProductSection } from "@/components/landing/product-section";
import { TrustSection } from "@/components/landing/trust-section";
import { StepsSection } from "@/components/landing/steps-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ChainsSection } from "@/components/landing/chains-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <TrustSection />
      <StepsSection />
      <PricingSection />
      <ChainsSection />
    </main>
  );
}
