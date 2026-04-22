import { readFileSync } from "fs";
import { join } from "path";
import { sanityFetch } from "@/sanity/lib/live";
import { PORTFOLIO_SECTION_QUERY } from "@/sanity/lib/queries";
import { SectionHeader } from "./section-header";
import { CategoryPillsMarquee } from "./category-pills-marquee";
import { MagneticButton } from "@/app/_components/magnetic-button";
import { PortfolioMedia } from "./portfolio-media";

const FALLBACK_CATEGORIES = ["Haircare", "Food & Beverage", "Product Ads", "UGC", "CGI & 3D", "Skincare", "Fragrance", "Fashion & Lifestyle"];

type CloudinaryVideoEntry = {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  featured: boolean;
};

function getFeaturedItems() {
  const raw = readFileSync(join(process.cwd(), "public/videos/cloudinary-videos.json"), "utf-8");
  return (JSON.parse(raw) as CloudinaryVideoEntry[])
    .filter((e) => e.featured)
    .map((e) => ({ id: e.id, title: e.title, category: e.category, videoSrc: e.videoUrl }));
}

export async function PortfolioSection() {
  const { data } = await sanityFetch({ query: PORTFOLIO_SECTION_QUERY });

  const header = data?.header ?? {
    subtitle: "OUR WORK",
    heading: "Ship Creative That Converts",
    description: null,
  };
  const viewAllText = data?.viewAllLinkText ?? "View All Work";
  const categories = data?.categoryPills ?? FALLBACK_CATEGORIES;
  const items = getFeaturedItems();

  return (
    <section id="portfolio" className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            subtitle={header.subtitle}
            heading={header.heading}
          />
          <MagneticButton className="self-start md:self-auto">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {viewAllText}
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="mt-8">
        <CategoryPillsMarquee categories={categories} />
      </div>

      <PortfolioMedia items={items} />
    </section>
  );
}
