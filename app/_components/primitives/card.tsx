import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/_lib/class-merge";

const cardVariants = cva(
  "rounded-[var(--radius-xl)] border border-border bg-background transition-all duration-200",
  {
    variants: {
      hoverable: {
        true: "hover:shadow-lg hover:-translate-y-0.5",
        false: "",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      hoverable: false,
      padding: "md",
    },
  }
);

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export function Card({ className, hoverable, padding, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ hoverable, padding }), className)} {...props} />
  );
}

export { cardVariants };
