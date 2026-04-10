import { ArrowRight } from "lucide-react";
import { AGENCY_SERVICES_CONTENT, AGENCY_SERVICES } from "@/app/(landing)/_lib/landing-content";
import { getIcon } from "@/app/(landing)/_lib/icon-map";
import { SectionHeader } from "./section-header";
import { Button } from "@/app/_components/primitives";

export function AgencyServicesSection() {
  return (
    <section className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={AGENCY_SERVICES_CONTENT.subtitle}
          heading={AGENCY_SERVICES_CONTENT.headline}
          description={AGENCY_SERVICES_CONTENT.subheadline}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENCY_SERVICES.map((service) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                className="group rounded-[var(--radius-2xl)] border-2 border-border bg-background p-8 transition-all duration-300 hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                  <Icon size={20} />
                </div>

                <h3 className="mt-6 font-heading text-lg font-bold text-foreground">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <p className="max-w-lg text-base text-muted-foreground">
            {AGENCY_SERVICES_CONTENT.closingLine}
          </p>
          <Button
            href={AGENCY_SERVICES_CONTENT.ctaHref}
            size="lg"
            className="shrink-0 rounded-full bg-foreground text-white hover:bg-neutral-800"
          >
            {AGENCY_SERVICES_CONTENT.ctaLabel}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
