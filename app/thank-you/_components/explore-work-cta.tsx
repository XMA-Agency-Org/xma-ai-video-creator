"use client";

import { AnimateIn } from "@/app/(landing)/_components/animate-in";
import { Button } from "@/app/_components/primitives/button";

export function ExploreWorkCta() {
  return (
    <AnimateIn delay={0.2}>
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="max-w-md text-neutral-600">
          While you wait, explore some of the work we&apos;ve done for brands
          like yours.
        </p>
        <Button href="/portfolio" intent="primary" size="lg">
          View Our Portfolio
        </Button>
      </div>
    </AnimateIn>
  );
}
