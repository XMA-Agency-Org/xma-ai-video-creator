import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/_lib/class-merge";

const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-100 text-neutral-700 border border-neutral-200",
        accent:
          "bg-primary-50 text-primary-700 border border-primary-200",
        outline:
          "bg-transparent text-neutral-600 border border-border",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-[var(--radius-base)]",
        md: "px-2.5 py-1 text-xs rounded-[var(--radius-base)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { badgeVariants };
