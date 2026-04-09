import { sanityFetch } from "@/sanity/lib/live";
import { PORTFOLIO_SECTION_QUERY } from "@/sanity/lib/queries";
import { PORTFOLIO_ITEMS } from "@/app/(landing)/_lib/landing-content";
import { SectionHeader } from "./section-header";
import { CategoryPillsMarquee } from "./category-pills-marquee";
import { PortfolioCarousel } from "./portfolio-carousel";
import { PortfolioGrid } from "./portfolio-grid";

const FALLBACK_CATEGORIES = ["Haircare", "Food & Beverage", "Product Ads", "UGC", "CGI & 3D", "Skincare", "Fragrance", "Fashion & Lifestyle"];

export async function PortfolioSection() {
  const { data } = await sanityFetch({ query: PORTFOLIO_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "OUR WORK",
    heading: "Ship Creative That Converts",
    description: null,
  };
  const viewAllText = data?.viewAllLinkText ?? "View All Work";
  const categories = data?.categoryPills ?? FALLBACK_CATEGORIES;
  const items = data?.featuredItems?.map((item: { _id: string; title?: string; category?: string; videoUrl?: string }) => ({
    id: item._id,
    title: item.title ?? "",
    category: item.category ?? "",
    videoSrc: item.videoUrl ?? "",
  })) ?? PORTFOLIO_ITEMS;

  return (
    <section id="portfolio" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            subtitle={header.subtitle}
            heading={header.heading}
          />
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 self-start rounded-full border-2 border-foreground px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background md:self-auto"
          >
            {viewAllText}
          </a>
        </div>
      </div>

      <div className="mt-8">
        <CategoryPillsMarquee categories={categories} />
      </div>

      <div className="mt-8 hidden px-6 lg:block">
        <PortfolioGrid items={items} />
      </div>
      <div className="mx-auto mt-8 max-w-[var(--container-max-width)] px-6 lg:hidden">
        <PortfolioCarousel items={items} />
      </div>
    </section>
  );
}
