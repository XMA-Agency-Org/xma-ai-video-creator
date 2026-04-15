import { sanityFetch } from "@/sanity/lib/live";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import { PROCESS_STEPS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { getIcon } from "@/app/(landing)/_lib/icon-map";
import { StaggerGroup, StaggerItem } from "./stagger-group";
import { GrowingLine } from "./growing-line";

export async function HowItWorksSection() {
  const { data } = await sanityFetch({ query: HOW_IT_WORKS_QUERY });

  const header = data?.header ?? {
    subtitle: "ROADMAP",
    heading: "From Brief to Launch in 7 Days",
    description:
      "Your project gets a full creative team, not just an AI tool:",
  };

  const steps =
    data?.steps ??
    PROCESS_STEPS.map((s) => ({
      stepNumber: s.stepNumber,
      title: s.title,
      description: s.description,
      iconName: s.icon.displayName ?? "FileText",
      highlighted: s.stepNumber === 7,
    }));

  return (
    <section id="how-it-works" className="py-14 md:py-20">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={header.subtitle}
          heading={header.heading}
          description={header.description}
        />

        {/* Mobile: vertical timeline */}
        <StaggerGroup className="mt-10 md:hidden" stagger={0.1}>
          <div className="relative md:ml-8">
            <div
              className="absolute left-[2.4rem] top-0 bottom-0 w-1 rounded-full bg-primary-500 z-0"
              aria-hidden="true"
            />

            <div className="space-y-6 z-10">
              {steps.map(
                (
                  step: {
                    stepNumber: number;
                    title: string;
                    description: string;
                    iconName?: string;
                    highlighted?: boolean;
                  },
                ) => {
                  const Icon = getIcon(step.iconName ?? "FileText");
                  const isLast = step.stepNumber === 7;

                  return (
                    <StaggerItem key={step.stepNumber} y={20}>
                      <div className="relative flex items-center gap-4">
                        <div className="relative z-10 shrink-0">
                          <div
                            className={`flex size-20 md:size-12 items-center justify-center rounded-full border-4 font-heading md:text-[10px] font-black uppercase ${
                              isLast
                                ? "border-lime-300 bg-lime-300 text-foreground shadow-[0_0_0_4px_oklch(0.85_0.18_120/0.3)]"
                                : "border-primary-700 bg-primary-500 text-white shadow-[0_0_0_4px_oklch(0.49_0.27_290/0.2)]"
                            }`}
                          >
                            Day {step.stepNumber}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <Icon size={20} className="text-primary-700" strokeWidth={2.5} />
                            <p className="md:text-sm text-base font-bold text-foreground">{step.title}</p>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                },
              )}
            </div>
          </div>
        </StaggerGroup>

        {/* Desktop: horizontal timeline */}
        <div className="mt-14 hidden md:block">
          <div className="relative mx-auto">
            <GrowingLine
              className="pointer-events-none absolute bottom-[2.25rem] left-[calc(100%/14)] right-[calc(100%/14)] h-1.5 rounded-full bg-primary-500 sm:bottom-10"
              delay={0.3}
              duration={0.8}
            />

            <StaggerGroup className="relative z-10 grid grid-cols-7" stagger={0.08}>
              {steps.map(
                (
                  step: {
                    stepNumber: number;
                    title: string;
                    description: string;
                    iconName?: string;
                    highlighted?: boolean;
                  },
                ) => {
                  const Icon = getIcon(step.iconName ?? "FileText");
                  const isLast = step.stepNumber === 7;

                  return (
                    <StaggerItem
                      key={step.stepNumber}
                      y={25}
                      scale={0.95}
                    >
                      <div className="relative flex flex-col items-center gap-3 px-1">
                        <div className="flex flex-col items-center gap-2">
                          <Icon
                            size={22}
                            className="text-primary-700"
                            strokeWidth={2.5}
                          />
                          <p className="h-8 text-center text-xs font-bold leading-tight text-foreground sm:text-sm">
                            {step.title}
                          </p>
                        </div>

                        <div>
                          <div
                            className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[5px] font-heading text-xs font-black uppercase sm:h-20 sm:w-20 sm:text-sm ${
                              isLast
                                ? "border-lime-300 bg-lime-300 text-foreground shadow-[0_0_0_6px_oklch(0.85_0.18_120/0.3)]"
                                : "border-primary-700 bg-primary-500 text-white shadow-[0_0_0_5px_oklch(0.49_0.27_290/0.2)]"
                            }`}
                          >
                            Day {step.stepNumber}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                },
              )}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
