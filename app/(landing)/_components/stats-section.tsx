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
        <div className="flex flex-wrap items-center justify-between gap-y-8">
          {stats.map((stat: { value: string; label: string; accent: boolean }, i: number) => (
            <div
              key={stat.value}
              className={`flex items-center gap-5 ${
                i > 0 ? "border-l-2 border-border pl-8 md:pl-12" : ""
              }`}
            >
              <span
                className={`font-heading text-5xl font-black tracking-tighter sm:text-6xl ${
                  stat.accent ? "text-primary-500" : "text-foreground"
                }`}
              >
                {stat.value}
              </span>
              <span className="max-w-[8rem] text-sm font-medium leading-snug text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
