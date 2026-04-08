import { sanityFetch } from "@/sanity/lib/live";
import { CTA_BANNER_QUERY } from "@/sanity/lib/queries";

export async function CtaBannerSection() {
  const { data } = await sanityFetch({ query: CTA_BANNER_QUERY });

  const headline = data?.headline ?? "Lower Your CAC With AI-Driven Video Ads";
  const description = data?.description ?? "Build a creative system that scales your revenue";
  const cta = data?.cta ?? { label: "Let's Do This", href: "#pricing", style: "accent" };

  return (
    <section className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="relative overflow-clip rounded-[2rem] bg-foreground px-8 py-20 text-center md:px-16">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20" />
          <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-lime-300/20" />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl font-heading text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">
              {headline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              {description}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={cta.href ?? "#pricing"}
                className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-4 text-base font-black text-foreground transition-all hover:bg-lime-400"
              >
                {cta.label} &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
