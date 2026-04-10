import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { HERO_CONTENT } from "@/app/(landing)/_lib/landing-content";
import { ColoredHeadline } from "./colored-headline";
import { HeroVideoGrid } from "./hero-video-grid";
import { FloatingBadges } from "./floating-badges";

const FALLBACK_VIDEOS = [
  "https://ruyastudio.my.canva.site/_assets/video/efb606b771979083cbc1006435ccd03f.mp4",
  "https://ruyastudio.my.canva.site/_assets/video/51b859cec4fd8a490986949e826d81a6.mp4",
  "https://ruyastudio.my.canva.site/_assets/video/35f816e914fb41dbab06f7c157ec2df5.mp4",
];

const FALLBACK_BADGES = [
  { iconName: "Zap", text: "3X FASTER", style: "default" },
  { iconName: "TrendingUp", text: "40% MORE ENGAGEMENT", style: "default" },
  { iconName: "Clock", text: "DAYS, NOT WEEKS", style: "accent" },
];

export async function HeroSection() {
  const { data } = await sanityFetch({ query: HERO_QUERY });

  const headline = data?.headline ?? HERO_CONTENT.headline;
  const subheadline = data?.subheadline ?? HERO_CONTENT.subheadline;
  const primaryCta = data?.primaryCta ?? { label: HERO_CONTENT.primaryCta, href: HERO_CONTENT.primaryCtaHref, style: "primary" };
  const videos = data?.heroVideos?.map((v: { videoUrl: string }) => v.videoUrl) ?? FALLBACK_VIDEOS;
  const badges = data?.floatingBadges ?? FALLBACK_BADGES;

  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary-500">
              AI-POWERED VIDEO CREATION
            </p>

            <ColoredHeadline text={headline} />

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {subheadline}
            </p>

            <div className="mt-10">
              <a
                href={primaryCta.href ?? "#pricing"}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs md:text-base font-bold text-background transition-all duration-200 hover:bg-primary-600 hover:text-white"
              >
                {primaryCta.label}
                <span className="ml-1">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <HeroVideoGrid videos={videos} />
            <FloatingBadges badges={badges} />
          </div>
        </div>
      </div>
    </section>
  );
}
