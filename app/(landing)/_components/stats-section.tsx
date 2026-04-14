import { sanityFetch } from "@/sanity/lib/live";
import { STATS_QUERY } from "@/sanity/lib/queries";
import { STATS } from "@/app/(landing)/_lib/landing-content";
import { AnimatedStats } from "./animated-stats";

const FALLBACK_STATS = STATS;

export async function StatsSection() {
  const { data } = await sanityFetch({ query: STATS_QUERY });
  const stats = data?.stats ?? FALLBACK_STATS;

  return (
    <section className="py-8 md:py-14">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimatedStats stats={stats} />
      </div>
    </section>
  );
}
