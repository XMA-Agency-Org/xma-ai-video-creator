"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
  amount?: number;
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  scale = 1,
  once = true,
  amount = 0.3,
}: AnimateInProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
