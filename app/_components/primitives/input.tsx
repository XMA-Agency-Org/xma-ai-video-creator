import { type InputHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/_lib/class-merge";

const inputVariants = cva(
  "w-full border transition-colors duration-200 text-foreground placeholder:text-muted-foreground focus:outline-2 focus:outline-offset-0 focus:outline-ring disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border-border bg-background hover:border-neutral-300 focus:border-primary-500",
        ghost: "border-transparent bg-neutral-100 hover:bg-neutral-200 focus:bg-background focus:border-primary-500",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-[var(--radius-base)]",
        md: "h-10 px-4 text-sm rounded-[var(--radius-lg)]",
        lg: "h-12 px-5 text-base rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { inputVariants };
