"use client";

import { type ReactNode } from "react";
import { TextReveal } from "./text-reveal";
import { AnimateIn } from "./animate-in";

type CtaBannerRevealProps = {
  headline: string;
  description: string;
  children: ReactNode;
};

export function CtaBannerReveal({ headline, description, children }: CtaBannerRevealProps) {
  return (
    <div>
      <h2 className="mx-auto max-w-4xl font-heading text-[length:var(--text-display)] font-black leading-[0.95] tracking-[-0.04em] text-white uppercase">
        <TextReveal text={headline} mode="inView" stagger={0.1} duration={0.8} />
      </h2>

      <AnimateIn y={20} delay={0.4} duration={0.6}>
        <p className="mx-auto mt-8 max-w-xl text-[length:var(--text-body-lg)] text-white/50">
          {description}
        </p>
      </AnimateIn>

      <AnimateIn y={20} delay={0.6} duration={0.7}>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {children}
        </div>
      </AnimateIn>
    </div>
  );
}
