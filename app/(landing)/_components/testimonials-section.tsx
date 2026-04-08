import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_SECTION_QUERY } from "@/sanity/lib/queries";
import { TESTIMONIALS } from "@/app/(landing)/_lib/landing-content";
import { TestimonialCard } from "./testimonial-card";

export async function TestimonialsSection() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "TRUSTED BY BRANDS",
    heading: "What Our Clients Say",
    description: null,
  };

  const items = data?.displayedItems?.map((t) => ({
    id: t._id,
    quote: t.quote ?? "",
    clientName: t.clientName ?? "",
    clientRole: t.clientRole ?? "",
    company: t.company ?? "",
  })) ?? TESTIMONIALS;

  return (
    <section className="py-[var(--section-padding-y)] bg-primary-500">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-lime-300">
          {header.subtitle}
        </p>
        <h2 className="mt-3 font-heading text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">
          {header.heading}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
