import { getIcon } from "@/app/(landing)/_lib/icon-map";

type StepCardProps = {
  step: {
    stepNumber: number;
    title: string;
    description: string;
    iconName?: string;
    highlighted?: boolean;
  };
};

export function StepCard({ step }: StepCardProps) {
  const Icon = getIcon(step.iconName ?? "FileText");
  const isHighlighted = step.highlighted;

  return (
    <div
      className={`group relative rounded-[var(--radius-2xl)] p-7 transition-all duration-300 ${
        isHighlighted
          ? "bg-primary-500 text-white shadow-lg"
          : "bg-foreground/[0.03] border-2 border-foreground/10 shadow-sm hover:border-primary-300 hover:shadow-md"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-black ${
          isHighlighted
            ? "bg-white/20 text-white"
            : "bg-primary-50 text-primary-600"
        }`}
      >
        <Icon size={22} />
      </div>

      <span
        className={`mt-5 block font-heading text-6xl font-black ${
          isHighlighted ? "text-white/20" : "text-neutral-200"
        }`}
      >
        0{step.stepNumber}
      </span>

      <h3
        className={`mt-2 font-heading text-xl font-bold ${
          isHighlighted ? "text-white" : "text-foreground"
        }`}
      >
        {step.title}
      </h3>

      <p
        className={`mt-2 text-sm leading-relaxed ${
          isHighlighted ? "text-white/75" : "text-muted-foreground"
        }`}
      >
        {step.description}
      </p>
    </div>
  );
}
