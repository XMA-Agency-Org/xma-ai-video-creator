import { type ReactNode } from "react";

type HeroChoreographyProps = {
  element: "eyebrow" | "headline" | "subheadline" | "cta" | "media";
  children: ReactNode;
  className?: string;
};

export function HeroChoreography({ children, className }: HeroChoreographyProps) {
  return <div className={className}>{children}</div>;
}
