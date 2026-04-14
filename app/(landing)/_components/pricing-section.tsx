import { PRICING_PLANS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { PricingCard } from "./pricing-card";
import { StaggerGroup, StaggerItem } from "./stagger-group";

export function PricingSection() {
  return (
    <section id="pricing" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle="SIMPLE PRICING"
          heading="Choose Your Package"
          description="No hidden fees, no surprises. Pick what fits and get started today."
          align="center"
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 items-start" stagger={0.12}>
          {PRICING_PLANS.map((plan) => (
            <StaggerItem key={plan.id} y={30} scale={0.97}>
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
