import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_SECTION_QUERY } from "@/sanity/lib/queries";
import { PRICING_PLANS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { PricingCard } from "./pricing-card";

export async function PricingSection() {
  const { data } = await sanityFetch({ query: PRICING_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "SIMPLE PRICING",
    heading: "Choose Your Package",
    description: "No hidden fees, no surprises. Pick what fits and get started today.",
  };

  const plans = data?.displayedPlans?.map((p: { _id: string; name?: string; price?: number; description?: string; features?: string[]; highlighted?: boolean; stripePriceId?: string }) => ({
    id: p._id,
    name: p.name ?? "",
    price: p.price ?? 0,
    description: p.description ?? "",
    features: p.features ?? [],
    highlighted: p.highlighted ?? false,
    stripePriceId: p.stripePriceId ?? "",
  })) ?? PRICING_PLANS;

  return (
    <section id="pricing" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={header.subtitle}
          heading={header.heading}
          description={header.description}
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 items-start">
          {plans.map((plan: { id: string; name: string; price: number; description: string; features: string[]; highlighted: boolean; stripePriceId: string }) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
