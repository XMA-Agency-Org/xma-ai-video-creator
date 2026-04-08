import { sanityFetch } from "@/sanity/lib/live";
import { MARQUEE_QUERY } from "@/sanity/lib/queries";

export async function MarqueeSection() {
  const { data } = await sanityFetch({ query: MARQUEE_QUERY });
  const text = data?.text ?? "YOUR AI VIDEO PARTNER";
  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <section className="overflow-clip border-y-2 border-border bg-white py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((i) => (
          <span
            key={i}
            className="mx-6 font-heading text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl"
          >
            {text}
            <span className="mx-6 text-primary-500">&bull;</span>
          </span>
        ))}
      </div>
    </section>
  );
}
