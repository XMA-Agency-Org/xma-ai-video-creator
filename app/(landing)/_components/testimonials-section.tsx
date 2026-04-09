import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_SECTION_QUERY } from "@/sanity/lib/queries";
import { TESTIMONIALS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { TestimonialCard } from "./testimonial-card";

export async function TestimonialsSection() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "TRUSTED BY BRANDS",
    heading: "What Our Clients Say",
    description: null,
  };

  const items = data?.displayedItems?.map((t: { _id: string; quote?: string; clientName?: string; clientRole?: string; company?: string }) => ({
    id: t._id,
    quote: t.quote ?? "",
    clientName: t.clientName ?? "",
    clientRole: t.clientRole ?? "",
    company: t.company ?? "",
  })) ?? TESTIMONIALS;

  return (
    <section className="py-[var(--section-padding-y)] bg-primary-500">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={header.subtitle}
          heading={header.heading}
          subtitleClassName="text-lime-300"
          headingClassName="text-white"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((testimonial: { id: string; quote: string; clientName: string; clientRole: string; company: string }) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
