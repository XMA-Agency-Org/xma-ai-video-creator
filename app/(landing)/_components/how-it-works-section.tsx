import { sanityFetch } from "@/sanity/lib/live";
import { HOW_IT_WORKS_QUERY } from "@/sanity/lib/queries";
import { PROCESS_STEPS } from "@/app/(landing)/_lib/landing-content";
import { getIcon } from "@/app/(landing)/_lib/icon-map";

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
        <p className="text-sm font-bold uppercase tracking-widest text-primary-500">
          {header.subtitle}
        </p>
        <h2 className="mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl">
          {header.heading}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          {header.description}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = getIcon(step.iconName ?? "FileText");
            const isHighlighted = step.highlighted;

            return (
              <div
                key={step.stepNumber}
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
          })}
        </div>
      </div>
    </section>
  );
}
