import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_SECTION_QUERY } from "@/sanity/lib/queries";
import { FAQ_ITEMS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { FaqAccordionItem } from "./faq-accordion-item";
import { AnimateIn } from "./animate-in";
import { StaggerGroup, StaggerItem } from "./stagger-group";

export async function FaqSection() {
  const { data } = await sanityFetch({ query: FAQ_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "FAQ",
    heading: "Got Questions?",
    description: "Everything you need to know about our AI video creation service.",
  };
  const contactText = data?.contactCtaText ?? "Still have questions? Contact us";
  const contactEmail = data?.contactEmail ?? "admin@xmaagency.com";

  const items = data?.displayedItems?.map((item: { _id: string; question?: string; answer?: string }) => ({
    id: item._id,
    question: item.question ?? "",
    answer: item.answer ?? "",
  })) ?? FAQ_ITEMS;

  return (
    <section id="faq" className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              subtitle={header.subtitle}
              heading={header.heading}
              description={header.description}
            />
            <AnimateIn y={15} delay={0.3}>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-600"
              >
                {contactText} &rarr;
              </a>
            </AnimateIn>
          </div>

          <StaggerGroup className="border-t border-border lg:border-t-0" stagger={0.06}>
            {items.map((item: { id: string; question: string; answer: string }) => (
              <StaggerItem key={item.id} y={15}>
                <FaqAccordionItem item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
