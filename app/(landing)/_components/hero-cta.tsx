"use client";

import { posthog } from "@/app/_lib/posthog-client";
import { MagneticButton } from "@/app/_components/magnetic-button";

type HeroCtaProps = {
  label: string;
  href: string;
};

export function HeroCta({ label, href }: HeroCtaProps) {
  function handleClick() {
    posthog.capture("hero_cta_clicked", { label, href });
  }

  return (
    <MagneticButton>
      <a
        href={href}
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-xs md:text-base font-bold text-white transition-all duration-200 hover:bg-primary-600"
      >
        {label}
        <span className="ml-1">&rarr;</span>
      </a>
    </MagneticButton>
  );
}
