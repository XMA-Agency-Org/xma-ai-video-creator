import { sanityFetch } from "@/sanity/lib/live";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import { PROCESS_STEPS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { getIcon } from "@/app/(landing)/_lib/icon-map";

export async function HowItWorksSection() {
  const { data } = await sanityFetch({ query: HOW_IT_WORKS_QUERY });

  const header = data?.header ?? {
    subtitle: "YOUR DEDICATED TEAM",
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
    <section id="how-it-works" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={header.subtitle}
          heading={header.heading}
          description={header.description}
        />

        <div className="mt-14 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="relative mx-auto min-w-[720px]">
            <div className="grid grid-cols-7">
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
                    <div
                      key={step.stepNumber}
                      className="relative flex flex-col items-center gap-3 px-1"
                    >
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

                      <div className="relative z-10">
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
                  );
                },
              )}
            </div>

            <div
              className="pointer-events-none absolute bottom-[2.25rem] left-[calc(100%/14)] right-[calc(100%/14)] z-0 h-1.5 rounded-full bg-primary-500 sm:bottom-10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
