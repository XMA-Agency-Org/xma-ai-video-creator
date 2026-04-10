import { sanityFetch } from "@/sanity/lib/live";
import { STATS_QUERY } from "@/sanity/lib/queries";

import { STATS } from "@/app/(landing)/_lib/landing-content";

const FALLBACK_STATS = STATS;

export async function StatsSection() {
  const { data } = await sanityFetch({ query: STATS_QUERY });
  const stats = data?.stats ?? FALLBACK_STATS;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className={`rounded-[var(--radius-2xl)] p-6 text-center shadow-md ${
                stat.accent
                  ? "bg-primary-500 text-white"
                  : "border-2 border-border bg-background text-foreground"
              }`}
            >
              <span className="block font-heading text-4xl font-black sm:text-5xl">
                {stat.value}
              </span>
              <span
                className={`mt-2 block text-xs font-bold uppercase tracking-wide ${
                  stat.accent ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
