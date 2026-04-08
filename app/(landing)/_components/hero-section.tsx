import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { HERO_CONTENT } from "@/app/(landing)/_lib/landing-content";
import { getIcon } from "@/app/(landing)/_lib/icon-map";

const FALLBACK_VIDEOS = [
  "https://ruyastudio.my.canva.site/_assets/video/15d0747cd01e85bf11581cb7ba703714.mp4",
  "https://ruyastudio.my.canva.site/_assets/video/66cb8849cb34a43c0fda09c9db05565f.mp4",
  "https://ruyastudio.my.canva.site/_assets/video/36996f557d12126b4c1bd003b62c278b.mp4",
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
  const videos = data?.heroVideos?.map((v) => v.videoUrl) ?? FALLBACK_VIDEOS;
  const badges = data?.floatingBadges ?? FALLBACK_BADGES;

  const animationClasses = ["animate-float", "animate-float-delayed", "animate-float-slow"];

  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary-500">
              AI-POWERED VIDEO CREATION
            </p>

            <h1 className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-foreground uppercase sm:text-6xl lg:text-7xl">
              {headline.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={
                    ["AI-Powered", "Modern"].includes(word)
                      ? "text-primary-500"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

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
            <div className="grid grid-cols-5 grid-rows-6 gap-3 h-[520px] lg:h-[580px]">
              {videos[0] && (
                <div className="col-span-3 row-span-6 rounded-2xl overflow-clip shadow-2xl border-2 border-primary-200/40">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay muted loop playsInline
                    src={videos[0]}
                  />
                </div>
              )}

              {videos[1] && (
                <div className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay muted loop playsInline
                    src={videos[1]}
                  />
                </div>
              )}

              {videos[2] && (
                <div className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay muted loop playsInline
                    src={videos[2]}
                  />
                </div>
              )}
            </div>

            {badges.map((badge, i) => {
              const Icon = getIcon(badge.iconName ?? "Zap");
              const isAccent = badge.style === "accent";
              const positions = [
                "-left-4 top-1/4",
                "-right-4 top-1/2",
                "left-1/3 -bottom-4",
              ];
              return (
                <div key={i} className={`absolute ${positions[i] ?? ""} ${animationClasses[i] ?? ""} z-10`}>
                  <div className={`flex items-center gap-2 rounded-full px-4 py-2.5 shadow-lg ${isAccent ? "bg-lime-300" : "bg-white border border-border"}`}>
                    <Icon size={14} className={isAccent ? "text-foreground" : "text-primary-500"} />
                    <span className="text-xs font-bold text-foreground">{badge.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
