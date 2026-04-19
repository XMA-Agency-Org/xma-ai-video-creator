"use client";

import { RadioCardGroup } from "@/app/_components/primitives";
import { Button } from "@/app/_components/primitives";
import { TIMELINE_OPTIONS, POPUP_COPY } from "@/app/(landing)/_lib/qualification-config";
import type { Timeline } from "@/app/(landing)/_types/qualification";
import { StepProgress } from "./step-progress";

type StepTimelineProps = {
  value: Timeline | null;
  onChange: (value: Timeline) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepTimeline({ value, onChange, onNext, onBack }: StepTimelineProps) {
  const step = POPUP_COPY.steps[2];

  return (
    <div className="flex flex-col gap-5 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <StepProgress current={2} total={4} />
        <button
          onClick={onBack}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">
          {step.label}
        </span>
        <h3 className="font-heading text-lg font-bold text-foreground">{step.question}</h3>
      </div>

      <RadioCardGroup
        value={value}
        onChange={onChange}
        options={TIMELINE_OPTIONS}
        columns={2}
      />

      <Button
        intent="primary"
        size="md"
        fullWidth
        onClick={onNext}
        disabled={!value}
      >
        Continue →
      </Button>
    </div>
  );
}
