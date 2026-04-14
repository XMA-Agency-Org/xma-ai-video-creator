import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_SECTION_QUERY } from "@/sanity/lib/queries";
import { TESTIMONIALS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { AnimateIn } from "./animate-in";
import { StaggerGroup, StaggerItem } from "./stagger-group";

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

  const featured = items[0];
  const sidebar = items.slice(1);

  return (
    <section className="py-[var(--section-padding-y)] bg-primary-500">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <SectionHeader
          subtitle={header.subtitle}
          heading={header.heading}
          subtitleClassName="text-lime-300"
          headingClassName="text-white"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <AnimateIn y={30} x={-15} duration={0.7}>
            <div className="flex h-full flex-col justify-center rounded-[var(--radius-2xl)] bg-white p-5 sm:p-8 md:p-12">
              <svg
                className="mb-6 h-10 w-10 text-primary-200"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
              </svg>

              <blockquote className="font-heading text-xl leading-relaxed text-foreground md:text-2xl">
                {featured.quote}
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 font-heading text-sm font-black text-white">
                  {featured.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">
                    {featured.clientName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {featured.clientRole}, {featured.company}
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          <StaggerGroup className="flex flex-col gap-6" stagger={0.12}>
            {sidebar.map((testimonial: { id: string; quote: string; clientName: string; clientRole: string; company: string }) => (
              <StaggerItem key={testimonial.id} y={25} x={15}>
                <div className="flex flex-1 flex-col justify-between rounded-[var(--radius-2xl)] bg-white/10 p-7 backdrop-blur-sm">
                  <blockquote className="text-sm leading-relaxed text-white/90">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 font-heading text-xs font-bold text-white">
                      {testimonial.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {testimonial.clientName}
                      </p>
                      <p className="text-xs text-white/60">
                        {testimonial.clientRole}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
