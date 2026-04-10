import { sanityFetch } from "@/sanity/lib/live";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import { PROCESS_STEPS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { getIcon } from "@/app/(landing)/_lib/icon-map";

export async function HowItWorksSection() {
  const { data } = await sanityFetch({ query: HOW_IT_WORKS_QUERY });

  const header = data?.header ?? {
    subtitle: "YOUR DEDICATED TEAM",
    heading: "How It Works",
    description: "Your project gets a full creative team, not just an AI tool:",
  };

  const steps = data?.steps ?? PROCESS_STEPS.map((s) => ({
    stepNumber: s.stepNumber,
    title: s.title,
    description: s.description,
    iconName: s.icon.displayName ?? "FileText",
    highlighted: s.stepNumber === 3,
  }));

  return (
    <section id="how-it-works" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={header.subtitle}
          heading={header.heading}
          description={header.description}
        />

        <div className="relative mt-14">
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-border md:left-1/2 md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step: { stepNumber: number; title: string; description: string; iconName?: string; highlighted?: boolean }, i: number) => {
              const Icon = getIcon(step.iconName ?? "FileText");
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.stepNumber}
                  className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16"
                >
                  <div
                    className={`absolute left-6 top-0 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full md:left-1/2 md:flex ${
                      step.highlighted
                        ? "bg-primary-500 text-white"
                        : "bg-background text-primary-500 border-2 border-border"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div
                    className={`${
                      isEven ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div className="flex items-center gap-4 md:hidden">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          step.highlighted
                            ? "bg-primary-500 text-white"
                            : "bg-primary-50 text-primary-500"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="font-heading text-5xl font-black text-neutral-200">
                        0{step.stepNumber}
                      </span>
                    </div>

                    <span
                      className={`hidden font-heading text-7xl font-black text-neutral-200 md:block ${
                        isEven ? "md:text-right" : ""
                      }`}
                    >
                      0{step.stepNumber}
                    </span>

                    <h3
                      className={`mt-3 font-heading text-xl font-bold text-foreground ${
                        isEven ? "md:text-right" : ""
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground ${
                        isEven ? "md:ml-auto md:text-right" : ""
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {isEven && <div className="hidden md:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
