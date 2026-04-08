import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_SECTION_QUERY } from "@/sanity/lib/queries";
import { FAQ_ITEMS } from "@/app/(landing)/_lib/landing-content";
import { FaqAccordionItem } from "./faq-accordion-item";

export async function FaqSection() {
  const { data } = await sanityFetch({ query: FAQ_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "FAQ",
    heading: "Got Questions?",
    description: "Everything you need to know about our AI video creation service.",
  };
  const contactText = data?.contactCtaText ?? "Still have questions? Contact us";
  const contactEmail = data?.contactEmail ?? "admin@xmaagency.com";

  const items = data?.displayedItems?.map((item) => ({
    id: item._id,
    question: item.question ?? "",
    answer: item.answer ?? "",
  })) ?? FAQ_ITEMS;

  return (
    <section id="faq" className="py-[var(--section-padding-y)] bg-white">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-500">
              {header.subtitle}
            </p>
            <h2 className="mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl">
              {header.heading}
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              {header.description}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-600"
            >
              {contactText} &rarr;
            </a>
          </div>

          <div className="border-t border-border lg:border-t-0">
            {items.map((item) => (
              <FaqAccordionItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
