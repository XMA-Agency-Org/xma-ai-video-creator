import { Check } from "lucide-react";
import type { PricingPlan } from "@/app/(landing)/_types/landing-types";
import { PricingCheckoutButton } from "./pricing-checkout-button";

type PricingCardProps = {
  plan: PricingPlan;
};

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-[var(--radius-2xl)] p-8 transition-all duration-300 ${
        plan.highlighted
          ? "bg-foreground text-white border-2 border-foreground scale-[1.02] shadow-xl"
          : "bg-foreground/[0.03] border-2 border-foreground/10 shadow-sm hover:border-primary-300 hover:shadow-lg"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex rounded-full bg-lime-300 px-5 py-1.5 text-xs font-black uppercase text-foreground">
            Most Popular
          </span>
        </div>
      )}

      <div>
        <h3
          className={`font-heading text-lg font-bold ${
            plan.highlighted ? "text-white" : "text-foreground"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-1 text-sm ${
            plan.highlighted ? "text-white/60" : "text-muted-foreground"
          }`}
        >
          {plan.description}
        </p>
      </div>

      <div className="mt-6">
        <span
          className={`font-heading text-5xl font-black ${
            plan.highlighted ? "text-white" : "text-foreground"
          }`}
        >
          ${plan.price.toLocaleString()}
        </span>
        <span
          className={`ml-1 text-sm ${
            plan.highlighted ? "text-white/50" : "text-muted-foreground"
          }`}
        >
          one-time
        </span>
      </div>

      <ul className="mt-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 text-sm ${
              plan.highlighted ? "text-white/80" : "text-neutral-600"
            }`}
          >
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${
                plan.highlighted ? "text-lime-300" : "text-primary-500"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <PricingCheckoutButton
          stripePriceId={plan.stripePriceId}
          highlighted={plan.highlighted}
        />
      </div>
    </div>
  );
}
