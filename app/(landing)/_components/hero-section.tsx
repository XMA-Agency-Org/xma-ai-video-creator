import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { HERO_CONTENT } from "@/app/(landing)/_lib/landing-content";
import { ColoredHeadline } from "./colored-headline";
import { HeroVideoGrid } from "./hero-video-grid";
import { FloatingBadges } from "./floating-badges";
import { HeroCta } from "./hero-cta";
import { HeroChoreography } from "./hero-choreography";

const FALLBACK_VIDEOS = [
  "https://ruyastudio.my.canva.site/_assets/video/efb606b771979083cbc1006435ccd03f.mp4",
  "https://ruyastudio.my.canva.site/_assets/video/51b859cec4fd8a490986949e826d81a6.mp4",
  "https://ruyastudio.my.canva.site/_assets/video/35f816e914fb41dbab06f7c157ec2df5.mp4",
];

const FALLBACK_BADGES = [
  { iconName: "Clock", text: "50% FASTER TURNAROUND", style: "accent" },
  { iconName: "Users", text: "9+ EXPERTS ON YOUR TEAM", style: "default" },
  { iconName: "Zap", text: "50% TIME SAVED VS TRADITIONAL", style: "default" },
];

export async function HeroSection() {
  const { data } = await sanityFetch({ query: HERO_QUERY });

  const headline = data?.headline ?? HERO_CONTENT.headline;
  const subheadline = data?.subheadline ?? HERO_CONTENT.subheadline;
  const primaryCta = data?.primaryCta ?? { label: HERO_CONTENT.primaryCta, href: HERO_CONTENT.primaryCtaHref, style: "primary" };
  const videos = data?.heroVideos?.map((v: { videoUrl: string }) => v.videoUrl) ?? FALLBACK_VIDEOS;
  const badges = data?.floatingBadges ?? FALLBACK_BADGES;

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
                  defaultLabel={primaryCta.label ?? HERO_CONTENT.primaryCta}
                  defaultHref={primaryCta.href ?? "#book"}
                />
              </div>
            </HeroChoreography>
          </div>

          <HeroChoreography element="media">
            <div className="relative">
              <HeroVideoGrid videos={videos} />
              <FloatingBadges badges={badges} />
            </div>
          </HeroChoreography>
        </div>
      </div>
    </section>
  );
}
