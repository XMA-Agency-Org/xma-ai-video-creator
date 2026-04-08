import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/_lib/class-merge";

const linkVariants = cva("transition-colors duration-200", {
  variants: {
    variant: {
      default: "text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline",
      muted: "text-muted-foreground hover:text-foreground",
      nav: "text-neutral-600 hover:text-neutral-900 font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LinkProps = NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants>;

export function Link({ className, variant, ...props }: LinkProps) {
  return (
    <NextLink className={cn(linkVariants({ variant }), className)} {...props} />
  );
}

export { linkVariants };
