"use client";

import { posthog } from "@/app/_lib/posthog-client";
import { MagneticButton } from "@/app/_components/magnetic-button";

type CtaBannerCtaProps = {
  label: string;
  href: string;
};

export function CtaBannerCta({ label, href }: CtaBannerCtaProps) {
  function handleClick() {
    posthog.capture("cta_banner_clicked", { label, href });
  }

  return (
    <MagneticButton>
      <a
        href={href}
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-4 text-base font-black text-foreground transition-all hover:bg-lime-400"
      >
        {label} &rarr;
      </a>
    </MagneticButton>
  );
}
