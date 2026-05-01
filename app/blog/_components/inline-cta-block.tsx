"use client";

import { useQualificationPopup } from "@/app/(landing)/_hooks/use-qualification-popup";
import { Button } from "@/app/_components/primitives";

type InlineCtaBlockProps = {
  headline: string;
  description?: string;
  buttonLabel: string;
};

export function InlineCtaBlock({ headline, description, buttonLabel }: InlineCtaBlockProps) {
  const { open } = useQualificationPopup();

  return (
    <div className="my-10 rounded-[var(--radius-xl)] bg-gradient-to-br from-primary-600 to-primary-900 px-7 py-8">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-lime-300">
        Free Strategy Call
      </p>
      <h4 className="mb-2 font-heading text-xl font-bold text-white">{headline}</h4>
      {description && (
        <p className="mb-5 text-sm leading-relaxed text-white/70">{description}</p>
      )}
      <Button intent="accent" size="md" onClick={() => open("blog_inline")}>
        {buttonLabel}
      </Button>
    </div>
  );
}
