import { ShieldCheck } from "lucide-react";
import { GUARANTEE_PILLARS } from "@/app/(landing)/_lib/landing-content";
import { getIcon } from "@/app/(landing)/_lib/icon-map";
import { AnimateIn } from "./animate-in";
import { StaggerGroup, StaggerItem } from "./stagger-group";
import { GuaranteeCounter } from "./guarantee-counter";
import { Button } from "@/app/_components/primitives";

export function GuaranteeSection() {
  const pillars = GUARANTEE_PILLARS;

  return (
    <section id="guarantee" className="bg-primary-600 py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
        <AnimateIn y={20}>
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 md:h-20 md:w-20">
            <ShieldCheck className="h-8 w-8 text-white md:h-10 md:w-10" />
          </div>
        </AnimateIn>

        <AnimateIn y={20} delay={0.1}>
          <p className="text-sm font-bold uppercase tracking-widest text-primary-200">
            Our Promise
          </p>
        </AnimateIn>

        <div className="mt-6">
          <GuaranteeCounter />
        </div>

        <AnimateIn y={20} delay={0.3}>
          <h2 className="mt-2 font-heading text-[length:var(--text-title-lg)] font-black uppercase tracking-[-0.03em] text-white">
            Satisfaction Guarantee
          </h2>
        </AnimateIn>

        <AnimateIn y={15} delay={0.4}>
          <p className="mx-auto mt-5 max-w-lg text-lg text-primary-100">
            Your satisfaction is non-negotiable. We stand behind every frame we
            deliver — no asterisks, no fine print.
          </p>
        </AnimateIn>

        <StaggerGroup
          className="mt-14 flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-10"
          stagger={0.1}
          amount={0.15}
        >
          {pillars.map((pillar) => {
            const Icon = getIcon(pillar.iconName);
            return (
              <StaggerItem key={pillar.title} y={20}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-heading text-sm font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-primary-200">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <AnimateIn y={15} delay={0.2} className="mt-12">
          <Button href="https://link.xmaboost.com/widget/booking/xbKo8dQfKzvGRRu4Gy0B" intent="secondary" size="xl">
            Book Your Free Strategy Call
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
