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
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <PortfolioSection />
      <MarqueeSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  );
}
