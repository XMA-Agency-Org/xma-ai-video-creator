import type { ProcessStep } from "@/app/(landing)/_types/landing-types";

type ProcessStepCardProps = {
  step: ProcessStep;
  isLast: boolean;
};

export function ProcessStepCard({ step, isLast }: ProcessStepCardProps) {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-1 flex-col items-center text-center">
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] bg-primary-50 text-primary-600 border border-primary-200">
        <Icon size={24} />
      </div>

      {!isLast && (
        <div className="absolute left-[calc(50%+2rem)] top-7 hidden h-px w-[calc(100%-4rem)] bg-border lg:block" />
      )}

      <span className="mt-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-600">
        {step.stepNumber}
      </span>
      <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
        {step.title}
      </h3>
      <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>
    </div>
  );
}
