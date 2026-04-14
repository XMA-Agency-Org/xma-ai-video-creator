import { Check, X } from "lucide-react";
import { COMPARISON_FEATURES } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";

export function WhyXmaSection() {
  const features = COMPARISON_FEATURES;

  return (
    <section id="why-xma" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle="WHY XMA"
          heading="More Than Just AI Software"
          description="You'll never get this with Higgsfield or any other DIY tool."
        />

        <div className="mt-14 overflow-clip rounded-[var(--radius-2xl)] border-2 border-border shadow-sm">
          <div className="grid grid-cols-[1fr_auto_auto] items-center border-b border-border bg-muted px-4 py-4 sm:px-6 sm:py-5 md:px-10">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground sm:text-sm">
              Feature
            </span>
            <span className="w-16 text-center text-xs font-bold uppercase tracking-widest text-primary-500 sm:w-24 md:w-32 sm:text-sm">
              XMA
            </span>
            <span className="w-16 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground sm:w-24 md:w-32 sm:text-sm">
              DIY Tools
            </span>
          </div>

          {features.map((item, i) => (
            <div
              key={item.feature}
              className={`grid grid-cols-[1fr_auto_auto] items-center px-4 py-3 sm:px-6 sm:py-4 md:px-10 ${
                i < features.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-xs font-medium text-foreground sm:text-sm md:text-base">
                {item.feature}
              </span>

              <div className="flex w-16 items-center justify-center sm:w-24 md:w-32">
                {item.xma === true ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50">
                    <Check size={16} className="text-primary-500" />
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground sm:text-sm">{String(item.xma)}</span>
                )}
              </div>

              <div className="flex w-16 items-center justify-center sm:w-24 md:w-32">
                {item.diy === true ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50">
                    <Check size={16} className="text-primary-500" />
                  </div>
                ) : item.diy === false ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100">
                    <X size={16} className="text-neutral-300" />
                  </div>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">{String(item.diy)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
