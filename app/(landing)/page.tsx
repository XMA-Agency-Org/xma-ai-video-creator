export const dynamic = "force-dynamic";

import { HeroSection } from "./_components/hero-section";
import { LogoStripSection } from "./_components/logo-strip-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { PortfolioSection } from "./_components/portfolio-section";
import { MarqueeSection } from "./_components/marquee-section";
import { WhyXmaSection } from "./_components/why-xma-section";
import { WhatWeNeedSection } from "./_components/what-we-need-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { FaqSection } from "./_components/faq-section";
import { CtaBannerSection } from "./_components/cta-banner-section";
import { GuaranteeSection } from "./_components/guarantee-section";
import { LocationStripSection } from "./_components/location-strip-section";
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <LogoStripSection />
      <PortfolioSection />
      <MarqueeSection />
      <LocationStripSection />
      <HowItWorksSection />
      <WhyXmaSection />
      <GuaranteeSection />
      <WhatWeNeedSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  );
}
