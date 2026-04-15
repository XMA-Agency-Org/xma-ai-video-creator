import { type HTMLAttributes } from "react";
import { cn } from "@/app/_lib/class-merge";

type SectionContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  background?: "default" | "muted" | "accent";
};

export function SectionContainer({
  className,
  as: Element = "section",
  background = "default",
  children,
  ...props
}: SectionContainerProps) {
  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted",
    accent: "bg-primary-50",
  };

  return (
    <Element
      className={cn(
        "py-14 md:py-20",
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        {children}
      </div>
    </Element>
  );
}
