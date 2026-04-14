"use client";

import { motion, useReducedMotion } from "motion/react";

type HeroVideoGridProps = {
  videos: string[];
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroVideoGrid({ videos }: HeroVideoGridProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="grid grid-cols-5 grid-rows-6 gap-3 h-[520px] lg:h-[580px]">
        {videos[0] && (
          <div className="col-span-3 row-span-6 rounded-2xl overflow-clip shadow-2xl border-2 border-primary-200/40">
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline suppressHydrationWarning src={videos[0]} />
          </div>
        )}
        {videos[1] && (
          <div className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40">
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline suppressHydrationWarning src={videos[1]} />
          </div>
        )}
        {videos[2] && (
          <div className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40">
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline suppressHydrationWarning src={videos[2]} />
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-5 grid-rows-6 gap-3 h-[520px] lg:h-[580px]"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {videos[0] && (
        <motion.div
          className="col-span-3 row-span-6 rounded-2xl overflow-clip shadow-2xl border-2 border-primary-200/40"
          variants={cellVariants}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            suppressHydrationWarning
            src={videos[0]}
          />
        </motion.div>
      )}

      {videos[1] && (
        <motion.div
          className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40"
          variants={cellVariants}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            suppressHydrationWarning
            src={videos[1]}
          />
        </motion.div>
      )}

      {videos[2] && (
        <motion.div
          className="col-span-2 row-span-3 rounded-2xl overflow-clip shadow-xl border-2 border-primary-200/40"
          variants={cellVariants}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline
            suppressHydrationWarning
            src={videos[2]}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
