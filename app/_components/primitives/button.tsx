import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/_lib/class-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary:
          "bg-gradient-to-r from-primary-500 to-primary-600 text-accent-foreground shadow-sm hover:from-primary-600 hover:to-primary-700 active:from-primary-700 active:to-primary-800",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300",
        ghost:
          "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
        outline:
          "border border-border bg-transparent text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100",
        accent:
          "bg-lime-300 font-black text-foreground hover:bg-lime-400 active:bg-lime-500",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-[var(--radius-base)] gap-1.5",
        md: "h-10 px-5 text-sm rounded-[var(--radius-lg)] gap-2",
        lg: "h-12 px-7 text-base rounded-[var(--radius-lg)] gap-2.5",
        xl: "h-14 px-9 text-lg rounded-[var(--radius-xl)] gap-3",
        full: "h-14 px-9 text-lg rounded-full gap-3",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    href?: never;
  };

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonVariantProps & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ className, intent, size, fullWidth, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ intent, size, fullWidth }), className);

  if ("href" in props && props.href) {
    return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}

export { buttonVariants };
