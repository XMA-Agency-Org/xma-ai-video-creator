import { sanityFetch } from "@/sanity/lib/live";
import { PORTFOLIO_SECTION_QUERY } from "@/sanity/lib/queries";
import { PORTFOLIO_ITEMS } from "@/app/(landing)/_lib/landing-content";
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
  const items = data?.featuredItems?.map((item) => ({
    id: item._id,
    title: item.title ?? "",
    category: item.category ?? "",
    videoSrc: item.videoUrl ?? "",
  })) ?? PORTFOLIO_ITEMS;

  return (
    <section id="portfolio" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-500">
              {header.subtitle}
            </p>
            <h2 className="mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl">
              {header.heading}
            </h2>
          </div>
          <a
            href="/work"
            className="inline-flex items-center gap-2 self-start rounded-full border-2 border-foreground px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background md:self-auto"
          >
            {viewAllText}
          </a>
        </div>
      </div>

      <div className="mt-8 overflow-clip">
        <div className="flex gap-3 animate-marquee whitespace-nowrap py-2">
          {[...categories, ...categories, ...categories, ...categories].map((cat, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border-2 border-primary-200 bg-white px-5 py-2 text-sm font-bold text-primary-600 whitespace-nowrap"
            >
              {cat}
            </span>
          ))}
        </div>
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
