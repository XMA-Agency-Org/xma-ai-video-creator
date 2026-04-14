import { getIcon } from "@/app/(landing)/_lib/icon-map";

type Badge = {
  iconName?: string;
  text: string;
  style?: string;
};

type FloatingBadgesProps = {
  badges: Badge[];
};

const POSITIONS = [
  "-left-4 top-1/4",
  "-right-4 top-1/2",
  "left-1/3 -bottom-4",
];

const ANIMATION_CLASSES = [
  "animate-float",
  "animate-float-delayed",
  "animate-float-slow",
];

export function FloatingBadges({ badges }: FloatingBadgesProps) {
  return (
    <>
      {badges.map((badge, i) => {
        const Icon = getIcon(badge.iconName ?? "Zap");
        const isAccent = badge.style === "accent";

        return (
          <div
            key={i}
            className={`absolute hidden lg:block ${POSITIONS[i] ?? ""} ${ANIMATION_CLASSES[i] ?? ""} z-10`}
          >
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 shadow-lg ${
                isAccent
                  ? "bg-lime-300"
                  : "bg-white border border-border"
              }`}
            >
              <Icon
                size={14}
                className={isAccent ? "text-foreground" : "text-primary-500"}
              />
              <span className="text-xs font-bold text-foreground">
                {badge.text}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
