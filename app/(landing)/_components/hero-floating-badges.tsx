"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO, EASE_IN_OUT_QUINT } from "@/app/_lib/motion-config";

const BADGES = [
  {
    label: "Unlimited Creativity",
    position: "top-4 -left-6 lg:-left-10",
    colors: "border-primary-300/40 bg-primary-500/90 shadow-primary-500/25",
  },
  {
    label: "500+ Creatives Produced",
    position: "top-1/3 -right-4 lg:-right-8",
    colors: "border-accent-light/40 bg-accent-light/90 shadow-accent-light/25 text-foreground",
  },
  {
    label: "4x Faster Than Typical Agency",
    position: "bottom-8 -left-4 lg:-left-6",
    colors: "border-orange-300/40 bg-orange-500/90 shadow-orange-500/25",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 1.2,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
    },
  },
};

function FloatKeyframes({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3.5 + index * 0.4,
        repeat: Infinity,
        ease: EASE_IN_OUT_QUINT,
        delay: index * 0.6,
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroFloatingBadges() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <>
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            className={`absolute z-10 ${badge.position}`}
          >
            <div className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg backdrop-blur-md ${badge.colors}`}>
              {badge.label}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pointer-events-none"
    >
      {BADGES.map((badge, i) => (
        <motion.div
          key={badge.label}
          className={`absolute z-10 ${badge.position}`}
          variants={badgeVariants}
        >
          <FloatKeyframes index={i}>
            <div className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg backdrop-blur-md ${badge.colors}`}>
              {badge.label}
            </div>
          </FloatKeyframes>
        </motion.div>
      ))}
    </motion.div>
  );
}
