"use client";

import { Button } from "@/app/_components/primitives";
import { POPUP_COPY } from "@/app/(landing)/_lib/qualification-config";

type StepNotAFitProps = {
  onClose: () => void;
};

export function StepNotAFit({ onClose }: StepNotAFitProps) {
  const { notAFit } = POPUP_COPY;

  return (
    <div className="flex flex-col items-center gap-6 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
        <span className="text-3xl">✉️</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-muted-foreground">{notAFit.eyebrow}</span>
        <h3 className="font-heading text-xl font-bold text-foreground">{notAFit.headline}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{notAFit.body}</p>
      </div>

      <Button intent="secondary" size="md" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
