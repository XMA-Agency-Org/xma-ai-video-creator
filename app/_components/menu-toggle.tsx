"use client";

import { motion } from "motion/react";

type MenuToggleProps = {
  open: boolean;
  onToggle: () => void;
};

const topLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};

const middleLine = {
  closed: { opacity: 1, scaleX: 1 },
  open: { opacity: 0, scaleX: 0 },
};

const bottomLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

const spring = { type: "spring" as const, stiffness: 260, damping: 20 };

export function MenuToggle({ open, onToggle }: MenuToggleProps) {
  return (
    <motion.button
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full md:hidden"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        className="block h-[2px] w-5 rounded-full bg-white"
        variants={topLine}
        animate={open ? "open" : "closed"}
        transition={spring}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.span
        className="block h-[2px] w-5 rounded-full bg-white"
        variants={middleLine}
        animate={open ? "open" : "closed"}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-[2px] w-5 rounded-full bg-white"
        variants={bottomLine}
        animate={open ? "open" : "closed"}
        transition={spring}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </motion.button>
  );
}
