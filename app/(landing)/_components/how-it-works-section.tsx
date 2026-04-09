import { sanityFetch } from "@/sanity/lib/live";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import { PROCESS_STEPS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { StepCard } from "./step-card";

export async function HowItWorksSection() {
  const { data } = await sanityFetch({ query: HOW_IT_WORKS_QUERY });

  const header = data?.header ?? {
    subtitle: "THE COMPLETE AI VIDEO SYSTEM",
    heading: "How It Works",
    description: "We combine creative strategy with cutting-edge AI to deliver:",
  };

  const steps = data?.steps ?? PROCESS_STEPS.map((s) => ({
    stepNumber: s.stepNumber,
    title: s.title,
    description: s.description,
    iconName: s.icon.displayName ?? "FileText",
    highlighted: s.stepNumber === 2,
  }));

  return (
    <section id="how-it-works" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={header.subtitle}
          heading={header.heading}
          description={header.description}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step: { stepNumber: number; title: string; description: string; iconName?: string; highlighted?: boolean }) => (
            <StepCard key={step.stepNumber} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
