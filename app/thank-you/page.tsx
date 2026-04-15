import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { SectionContainer } from "@/app/_components/primitives/section-container";
import { sendMetaEvent, generateEventId } from "@/app/_lib/meta-capi";
import { ConfirmationHero } from "./_components/confirmation-hero";
import { NextSteps } from "./_components/next-steps";
import { ExploreWorkCta } from "./_components/explore-work-cta";
import { MetaLeadTracker } from "./_components/meta-lead-tracker";

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

export default async function ThankYouPage() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const eventId = generateEventId();

  await sendMetaEvent({
    eventName: "Lead",
    eventId,
    sourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
    userAgent: headerStore.get("user-agent") ?? undefined,
    clientIpAddress:
      headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerStore.get("x-real-ip") ??
      undefined,
    fbp: cookieStore.get("_fbp")?.value,
    fbc: cookieStore.get("_fbc")?.value,
  });

  return (
    <>
      <MetaLeadTracker eventId={eventId} />

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
