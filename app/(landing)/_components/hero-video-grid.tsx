type HeroVideoGridProps = {
  videos: string[];
};

export function HeroVideoGrid({ videos }: HeroVideoGridProps) {
  return (
    <div className="grid grid-cols-5 grid-rows-6 gap-3 h-[520px] lg:h-[580px]">
      {videos[0] && (
        <div className="col-span-3 row-span-6 rounded-2xl overflow-clip shadow-2xl border-2 border-primary-200/40">
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            suppressHydrationWarning
            src={videos[0]}
          />
        </div>
      )}

      {videos[1] && (
        <div className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40">
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            suppressHydrationWarning
            src={videos[1]}
          />
        </div>
      )}

      {videos[2] && (
        <div className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40">
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            suppressHydrationWarning
            src={videos[2]}
          />
        </div>
      )}
    </div>
  );
}
