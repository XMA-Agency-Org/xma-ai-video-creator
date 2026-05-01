"use client";

import { useQualificationPopup } from "@/app/(landing)/_hooks/use-qualification-popup";
import { Button } from "@/app/_components/primitives";

export function EndOfPostCta() {
  const { open } = useQualificationPopup();

  return (
    <div className="my-14 rounded-[var(--radius-2xl)] bg-gradient-to-br from-primary-600 to-primary-900 px-8 py-10 text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-lime-300">
        Ready to apply this?
      </p>
      <h3 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">
        Let us build your AI video engine
      </h3>
      <p className="mx-auto mb-7 max-w-md text-base leading-relaxed text-white/70">
        We handle scripting, production, and distribution — so you get a consistent
        stream of high-converting video without lifting a finger.
      </p>
      <Button
        intent="accent"
        size="lg"
        onClick={() => open("blog_end")}
      >
        Book a Free Strategy Call
      </Button>
      <p className="mt-3 text-xs text-white/40">Free · No obligation</p>
    </div>
  );
}
