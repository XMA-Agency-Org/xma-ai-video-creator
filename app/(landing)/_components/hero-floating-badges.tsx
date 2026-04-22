const BADGES = [
  {
    label: "Unlimited Creativity",
    position: "top-4 -left-6 lg:-left-10",
    colors: "border-primary-300/40 bg-primary-600 shadow-primary-500/25",
  },
  {
    label: "500+ Creatives Produced",
    position: "top-1/3 -right-4 lg:-right-8",
    colors: "border-accent-light/40 bg-accent-light shadow-accent-light/25 text-foreground",
  },
  {
    label: "4x Faster Than Typical Agency",
    position: "bottom-8 -left-4 lg:-left-6",
    colors: "border-orange-300/40 bg-orange-500 shadow-orange-500/25",
  },
];

export function HeroFloatingBadges() {
  return (
    <>
      {BADGES.map((badge) => (
        <div key={badge.label} className={`absolute z-10 ${badge.position}`}>
          <div className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg ${badge.colors}`}>
            {badge.label}
          </div>
        </div>
      ))}
    </>
  );
}
