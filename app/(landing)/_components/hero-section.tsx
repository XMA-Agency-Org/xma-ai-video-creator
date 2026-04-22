import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { HERO_CONTENT } from "@/app/(landing)/_lib/landing-content";
import { ColoredHeadline } from "./colored-headline";
import { HeroCta } from "./hero-cta";

export async function HeroSection() {
  const { data } = await sanityFetch({ query: HERO_QUERY });

  const headline = data?.headline ?? HERO_CONTENT.headline;
  const subheadline = data?.subheadline ?? HERO_CONTENT.subheadline;
  const primaryCta = data?.primaryCta ?? { label: HERO_CONTENT.primaryCta, href: HERO_CONTENT.primaryCtaHref, style: "primary" };

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full text-xs font-bold uppercase tracking-widest text-primary-600">
            AI-Powered Video Creation
          </span>

          <div className="mt-6">
            <ColoredHeadline text={headline} />
          </div>

          <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-relaxed text-foreground/60">
            {subheadline}
          </p>

          <div className="mt-12">
            <HeroCta
              label={primaryCta.label ?? HERO_CONTENT.primaryCta}
              href={primaryCta.href ?? "https://link.xmaboost.com/widget/booking/xbKo8dQfKzvGRRu4Gy0B"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
