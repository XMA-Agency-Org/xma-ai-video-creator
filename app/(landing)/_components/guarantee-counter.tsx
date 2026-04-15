"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { useEffect } from "react";
import { EASE_OUT_EXPO } from "@/app/_lib/motion-config";

export function GuaranteeCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      count.set(100);
      return;
    }

    const controls = animate(count, 100, {
      duration: 1.6,
      ease: EASE_OUT_EXPO,
    });

    return controls.stop;
  }, [isInView, reduced, count]);

  if (reduced) {
    return (
      <div ref={ref} className="flex items-baseline justify-center gap-1">
        <span className="font-heading text-[length:var(--text-display)] font-black leading-none tracking-[-0.04em] text-foreground">
          100
        </span>
        <span className="font-heading text-[length:var(--text-title-lg)] font-black leading-none text-primary-500">
          %
        </span>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="flex items-baseline justify-center gap-1"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      <motion.span className="font-heading text-[length:var(--text-display)] font-black leading-none tracking-[-0.04em] text-foreground">
        {rounded}
      </motion.span>
      <motion.span
        className="font-heading text-[length:var(--text-title-lg)] font-black leading-none text-primary-500"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8, ease: EASE_OUT_EXPO }}
      >
        %
      </motion.span>
    </motion.div>
  );
}
