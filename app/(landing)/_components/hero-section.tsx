import { readFileSync } from "fs";
import { join } from "path";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { HERO_CONTENT } from "@/app/(landing)/_lib/landing-content";
import { ColoredHeadline } from "./colored-headline";
import { HeroVideoGrid } from "./hero-video-grid";
import { HeroCta } from "./hero-cta";
import { HeroChoreography } from "./hero-choreography";
import { HeroFloatingBadges } from "./hero-floating-badges";

type CloudinaryVideoEntry = {
  id: string;
  videoUrl: string;
  hero: boolean;
};

function getHeroVideos(): string[] {
  const raw = readFileSync(join(process.cwd(), "public/videos/cloudinary-videos.json"), "utf-8");
  return (JSON.parse(raw) as CloudinaryVideoEntry[])
    .filter((e) => e.hero)
    .slice(0, 3)
    .map((e) => e.videoUrl);
}

export async function HeroSection() {
  const { data } = await sanityFetch({ query: HERO_QUERY });

  const headline = data?.headline ?? HERO_CONTENT.headline;
  const subheadline = data?.subheadline ?? HERO_CONTENT.subheadline;
  const primaryCta = data?.primaryCta ?? { label: HERO_CONTENT.primaryCta, href: HERO_CONTENT.primaryCtaHref, style: "primary" };
  const videos = getHeroVideos();

  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-12">
          <div>
            <HeroChoreography element="eyebrow">
              <span className="inline-flex rounded-full text-xs font-bold uppercase tracking-widest text-primary-600">
                AI-Powered Video Creation
              </span>
            </HeroChoreography>

            <HeroChoreography element="headline">
              <div className="mt-6">
                <ColoredHeadline text={headline} />
              </div>
            </HeroChoreography>

            <HeroChoreography element="subheadline">
              <p className="mt-8 max-w-lg text-[length:var(--text-body-lg)] leading-relaxed text-foreground/60">
                {subheadline}
              </p>
            </HeroChoreography>

            <HeroChoreography element="cta">
              <div className="mt-12">
                <HeroCta
                  label={primaryCta.label ?? HERO_CONTENT.primaryCta}
                  href={primaryCta.href ?? "https://link.xmaboost.com/widget/booking/xbKo8dQfKzvGRRu4Gy0B"}
                />
              </div>
            </HeroChoreography>
          </div>

          <HeroChoreography element="media">
            <div className="relative">
              <HeroFloatingBadges />
              <HeroVideoGrid videos={videos} />
            </div>
          </HeroChoreography>
        </div>
      </div>
    </section>
  );
}
