import type { Metadata } from "next";
import { SectionContainer } from "@/app/_components/primitives/section-container";
import { ConfirmationHero } from "./_components/confirmation-hero";
import { NextSteps } from "./_components/next-steps";
import { ExploreWorkCta } from "./_components/explore-work-cta";

export const metadata: Metadata = {
  title: "Call Booked — XMA Agency",
  description:
    "Your strategy call has been booked. Here's what to expect next.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Call Booked — XMA Agency",
    description:
      "Your strategy call has been booked. Here's what to expect next.",
  },
};

export default function ThankYouPage() {
  return (
    <>
      <SectionContainer className="pt-32 md:pt-40">
        <ConfirmationHero />
      </SectionContainer>

      <SectionContainer>
        <NextSteps />
      </SectionContainer>

      <SectionContainer className="pb-24 md:pb-32">
        <ExploreWorkCta />
      </SectionContainer>
    </>
  );
}
