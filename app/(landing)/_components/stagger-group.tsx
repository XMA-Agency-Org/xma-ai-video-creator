"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
};

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
  amount = 0.2,
}: StaggerGroupProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  scale?: number;
};

const itemVariants = (y: number, x: number, scale: number) => ({
  hidden: { opacity: 0, y, x, scale },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export function StaggerItem({
  children,
  className,
  y = 30,
  x = 0,
  scale = 1,
}: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants(y, x, scale)}>
      {children}
    </motion.div>
  );
}
