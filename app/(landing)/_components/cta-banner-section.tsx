import { sanityFetch } from "@/sanity/lib/live";
import { CTA_BANNER_QUERY } from "@/sanity/lib/queries";
import { CtaBannerCta } from "./cta-banner-cta";
import { CtaBannerReveal } from "./cta-banner-reveal";

export async function CtaBannerSection() {
  const { data } = await sanityFetch({ query: CTA_BANNER_QUERY });

  const headline = data?.headline ?? "Ready to Scale Your Video Content?";
  const description = data?.description ?? "Book a free strategy call and see how our team can transform your content pipeline.";
  const cta = data?.cta ?? { label: "Book Your Free Strategy Call", href: "https://link.xmaboost.com/widget/booking/xbKo8dQfKzvGRRu4Gy0B", style: "accent" };

  return (
    <section className="bg-gradient-to-b from-primary-900 to-foreground py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
        <CtaBannerReveal headline={headline} description={description}>
          <CtaBannerCta
            label={cta.label ?? "Book Your Free Strategy Call"}
            href={cta.href ?? "https://link.xmaboost.com/widget/booking/xbKo8dQfKzvGRRu4Gy0B"}
          />
        </CtaBannerReveal>
      </div>
    </section>
  );
}
