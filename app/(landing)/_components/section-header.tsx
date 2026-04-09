import { cn } from "@/app/_lib/class-merge";

type SectionHeaderProps = {
  subtitle: string;
  heading: string;
  description?: string | null;
  align?: "left" | "center";
  subtitleClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  subtitle,
  heading,
  description,
  align = "left",
  subtitleClassName,
  headingClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      <p
        className={cn(
          "text-sm font-bold uppercase tracking-widest text-primary-500",
          subtitleClassName
        )}
      >
        {subtitle}
      </p>
      <h2
        className={cn(
          "mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl",
          headingClassName
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-lg text-muted-foreground",
            align === "center" && "mx-auto max-w-lg",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
