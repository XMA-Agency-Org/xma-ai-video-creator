import { Camera } from "lucide-react";
import { CHECKLIST_ITEMS, CHECKLIST_ICON_MAP } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";

export function WhatWeNeedSection() {
  const items = CHECKLIST_ITEMS;

  return (
    <section className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle="GETTING STARTED"
          heading="What We Need From You"
          description="Share these with us and we'll handle the rest."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = CHECKLIST_ICON_MAP[item.iconName] ?? Camera;

            return (
              <div
                key={item.id}
                className="rounded-[var(--radius-2xl)] border-2 border-foreground/10 p-7 transition-all duration-300 hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[var(--radius-2xl)] bg-primary-500 p-8 text-center md:p-10">
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
      </div>
    </section>
  );
}
