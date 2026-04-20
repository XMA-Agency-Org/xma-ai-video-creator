"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/app/_lib/motion-config";

type HeroElement = "eyebrow" | "headline" | "subheadline" | "cta" | "media";

const CHOREOGRAPHY: Record<HeroElement, { delay: number; duration: number; y: number; x: number; scale: number }> = {
  eyebrow:    { delay: 0.2,  duration: 0.6, y: 20,  x: 0,  scale: 1 },
  headline:   { delay: 0.05, duration: 0.8, y: 0,   x: 0,  scale: 1 },
  subheadline:{ delay: 0.6,  duration: 0.6, y: 20,  x: 0,  scale: 1 },
  cta:        { delay: 0.8,  duration: 0.7, y: 20,  x: 0,  scale: 0.95 },
  media:      { delay: 0.4,  duration: 1.0, y: 40,  x: 30, scale: 0.97 },
};

type HeroChoreographyProps = {
  element: HeroElement;
  children: ReactNode;
  className?: string;
};

export function HeroChoreography({ element, children, className }: HeroChoreographyProps) {
  const reduced = useReducedMotion();
  const config = CHOREOGRAPHY[element];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  if (element === "media") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: config.y, x: config.x, scale: config.scale }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}
