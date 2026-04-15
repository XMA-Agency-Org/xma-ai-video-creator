import { Camera } from "lucide-react";
import { CHECKLIST_ITEMS, CHECKLIST_ICON_MAP } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { StaggerGroup, StaggerItem } from "./stagger-group";
import { AnimateIn } from "./animate-in";

export function WhatWeNeedSection() {
  const items = CHECKLIST_ITEMS;

  return (
    <section className="bg-primary-50/30 py-14 md:py-20">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle="GETTING STARTED"
          heading="What We Need From You"
          description="Share these with us and we'll handle the rest."
        />

        <StaggerGroup className="mt-14 divide-y divide-border" stagger={0.08}>
          {items.map((item) => {
            const Icon = CHECKLIST_ICON_MAP[item.iconName] ?? Camera;

            return (
              <StaggerItem key={item.id} y={20}>
                <div className="group py-8 transition-colors duration-300 md:grid md:grid-cols-[3rem_14rem_1fr] md:items-center md:gap-8">
                  <div className="flex items-center gap-4 md:contents">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-0 md:max-w-md">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <AnimateIn y={30} delay={0.1} className="mt-12">
          <div className="rounded-[var(--radius-2xl)] bg-primary-500 p-8 text-center md:p-10">
            <p className="text-lg font-bold text-white">
              Don't have product photos?
            </p>
            <p className="mt-2 text-white/70">
              Our content team can shoot them for you in our studio — just ask during your strategy call.
            </p>
            <a
              href="#book"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-3 text-sm font-bold text-foreground transition-all hover:bg-lime-400"
            >
              Book Your Strategy Call &rarr;
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
