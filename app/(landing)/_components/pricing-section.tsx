import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_SECTION_QUERY } from "@/sanity/lib/queries";
import { PRICING_PLANS } from "@/app/(landing)/_lib/landing-content";
import { PricingCard } from "./pricing-card";

export async function PricingSection() {
  const { data } = await sanityFetch({ query: PRICING_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "SIMPLE PRICING",
    heading: "Choose Your Package",
    description: "No hidden fees, no surprises. Pick what fits and get started today.",
  };

  const plans = data?.displayedPlans?.map((p) => ({
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
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-500">
            {header.subtitle}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl">
            {header.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            {header.description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
