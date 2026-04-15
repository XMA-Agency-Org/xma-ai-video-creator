"use client";

import { motion, useReducedMotion } from "motion/react";

type GrowingLineProps = {
  className?: string;
  delay?: number;
  duration?: number;
};

export function GrowingLine({
  className,
  delay = 0.3,
  duration = 0.8,
}: GrowingLineProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ transformOrigin: "left" }}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
