export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { HeroSection } from "../_components/hero-section";
import { LogoStripSection } from "../_components/logo-strip-section";
import { StatsSection } from "../_components/stats-section";
import { HowItWorksSection } from "../_components/how-it-works-section";
import { PortfolioSection } from "../_components/portfolio-section";
import { MarqueeSection } from "../_components/marquee-section";
import { WhyXmaSection } from "../_components/why-xma-section";
import { WhatWeNeedSection } from "../_components/what-we-need-section";
import { TestimonialsSection } from "../_components/testimonials-section";
import { PricingSection } from "../_components/pricing-section";
import { FaqSection } from "../_components/faq-section";
import { CtaBannerSection } from "../_components/cta-banner-section";

export default function LandingPageB() {
  return (
    <>
      <Suspense>
        <HeroSection />
      </Suspense>
      <LogoStripSection />
      <Suspense>
        <StatsSection />
      </Suspense>
      <Suspense>
        <PortfolioSection />
      </Suspense>
      <Suspense>
        <MarqueeSection />
      </Suspense>
      <WhyXmaSection />
      <Suspense>
        <HowItWorksSection />
      </Suspense>
      <WhatWeNeedSection />
      <Suspense>
        <TestimonialsSection />
      </Suspense>
      <PricingSection />
      <Suspense>
        <FaqSection />
      </Suspense>
      <Suspense>
        <CtaBannerSection />
      </Suspense>
    </>
  );
}
