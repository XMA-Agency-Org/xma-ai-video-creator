import { sanityFetch } from "@/sanity/lib/live";
import { CTA_BANNER_QUERY } from "@/sanity/lib/queries";
import { CtaBannerCta } from "./cta-banner-cta";
import { AnimateIn } from "./animate-in";

export async function CtaBannerSection() {
  const { data } = await sanityFetch({ query: CTA_BANNER_QUERY });

  const headline = data?.headline ?? "Ready to Scale Your Video Content?";
  const description = data?.description ?? "Book a free strategy call and see how our team can transform your content pipeline.";
  const cta = data?.cta ?? { label: "Book Your Free Strategy Call", href: "#book", style: "accent" };

  return (
    <section className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimateIn y={40} scale={0.97} duration={0.7}>
          <div className="relative overflow-clip rounded-[2rem] bg-foreground px-6 py-12 text-center sm:px-8 md:px-16 md:py-20">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20" />
            <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-lime-300/20" />

            <div className="relative z-10">
              <AnimateIn y={20} delay={0.15}>
                <h2 className="mx-auto max-w-2xl font-heading text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">
                  {headline}
                </h2>
              </AnimateIn>
              <AnimateIn y={15} delay={0.25}>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
                  {description}
                </p>
              </AnimateIn>
              <AnimateIn y={15} delay={0.35}>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <CtaBannerCta
                    defaultLabel={cta.label ?? "Book Your Free Strategy Call"}
                    defaultHref={cta.href ?? "#book"}
                  />
                </div>
              </AnimateIn>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
