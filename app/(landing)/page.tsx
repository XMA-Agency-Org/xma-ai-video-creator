export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { HeroSection } from "./_components/hero-section";
import { StatsSection } from "./_components/stats-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { PortfolioSection } from "./_components/portfolio-section";
import { MarqueeSection } from "./_components/marquee-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { PricingSection } from "./_components/pricing-section";
import { FaqSection } from "./_components/faq-section";
import { CtaBannerSection } from "./_components/cta-banner-section";

export default function LandingPage() {
  return (
    <>
      <Suspense>
        <HeroSection />
      </Suspense>
      <Suspense>
        <StatsSection />
      </Suspense>
      <Suspense>
        <HowItWorksSection />
      </Suspense>
      <Suspense>
        <PortfolioSection />
      </Suspense>
      <Suspense>
        <MarqueeSection />
      </Suspense>
      <Suspense>
        <TestimonialsSection />
      </Suspense>
      <Suspense>
        <PricingSection />
      </Suspense>
      <Suspense>
        <FaqSection />
      </Suspense>
      <Suspense>
        <CtaBannerSection />
      </Suspense>
    </>
  );
}
