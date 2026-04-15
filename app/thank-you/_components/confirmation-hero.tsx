"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/app/_lib/motion-config";

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO },
  },
};

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export function ConfirmationHero() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        className="relative flex items-center justify-center"
        initial={reduced ? false : "hidden"}
        animate="visible"
      >
        <motion.div
          className="size-24 rounded-full bg-success-100 md:size-28"
          variants={circleVariants}
        />
        <motion.svg
          className="absolute size-12 md:size-14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            className="text-success-600"
            variants={checkmarkVariants}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-4 text-center"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_EXPO }}
      >
        <h1 className="font-heading text-[var(--text-title-lg)] font-bold uppercase tracking-tight">
          You&apos;re All Set
        </h1>
        <p className="max-w-lg text-[var(--text-body-lg)] text-neutral-600">
          Your strategy call has been booked. We&apos;re looking forward to
          learning about your brand and showing you how AI video can transform
          your content.
        </p>
      </motion.div>
    </div>
  );
}
