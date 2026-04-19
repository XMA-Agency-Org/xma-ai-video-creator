"use client";

import { Button } from "@/app/_components/primitives";
import { POPUP_COPY } from "@/app/(landing)/_lib/qualification-config";

type StepIntroProps = {
  onStart: () => void;
  onClose: () => void;
};

export function StepIntro({ onStart, onClose }: StepIntroProps) {
  const { intro } = POPUP_COPY;

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex flex-col gap-3">
        <span className="inline-block rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-600 w-fit">
          {intro.eyebrow}
        </span>
        <h2 className="font-heading text-[var(--text-title)] font-black tracking-tight leading-tight text-foreground">
          {intro.headline}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">{intro.body}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Button intent="primary" size="lg" fullWidth onClick={onStart}>
          {intro.cta}
        </Button>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
