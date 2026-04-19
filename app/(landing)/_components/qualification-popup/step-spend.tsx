"use client";

import { RadioCardGroup } from "@/app/_components/primitives";
import { Button } from "@/app/_components/primitives";
import { SPEND_OPTIONS, POPUP_COPY } from "@/app/(landing)/_lib/qualification-config";
import type { SpendBracket } from "@/app/(landing)/_types/qualification";
import { StepProgress } from "./step-progress";

type StepSpendProps = {
  value: SpendBracket | null;
  onChange: (value: SpendBracket) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepSpend({ value, onChange, onNext, onBack }: StepSpendProps) {
  const step = POPUP_COPY.steps[1];

  return (
    <div className="flex flex-col gap-5 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <StepProgress current={1} total={4} />
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
        options={SPEND_OPTIONS}
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
