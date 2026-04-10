"use client";

import { useAbVariant } from "./ab-pricing-gate";
import { posthog } from "@/app/_lib/posthog-client";

type CtaBannerCtaProps = {
  defaultLabel: string;
  defaultHref: string;
};

export function CtaBannerCta({ defaultLabel, defaultHref }: CtaBannerCtaProps) {
  const variant = useAbVariant();

  const label = variant === "test" ? "View Pricing" : defaultLabel;
  const href = variant === "test" ? "#pricing" : defaultHref;

  function handleClick() {
    posthog.capture("cta_banner_clicked", {
      label,
      href,
      ab_variant: variant,
    });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-4 text-base font-black text-foreground transition-all hover:bg-lime-400"
    >
      {label} &rarr;
    </a>
  );
}
