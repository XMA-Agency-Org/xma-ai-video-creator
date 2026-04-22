import { type ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({ children, className }: MagneticButtonProps) {
  return <div className={className}>{children}</div>;
}
