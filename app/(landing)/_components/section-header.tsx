"use client";

import { cn } from "@/app/_lib/class-merge";
import { motion, useReducedMotion } from "motion/react";

type SectionHeaderProps = {
  subtitle: string;
  heading: string;
  description?: string | null;
  align?: "left" | "center";
  subtitleClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function SectionHeader({
  subtitle,
  heading,
  description,
  align = "left",
  subtitleClassName,
  headingClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn(align === "center" && "text-center")}>
        <p className={cn("text-sm font-bold uppercase tracking-widest text-primary-500", subtitleClassName)}>
          {subtitle}
        </p>
        <h2 className={cn("mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl", headingClassName)}>
          {heading}
        </h2>
        {description && (
          <p className={cn("mt-4 max-w-xl text-lg text-muted-foreground", align === "center" && "mx-auto max-w-lg", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(align === "center" && "text-center")}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p
        className={cn(
          "text-sm font-bold uppercase tracking-widest text-primary-500",
          subtitleClassName
        )}
        variants={itemVariants}
      >
        {subtitle}
      </motion.p>
      <motion.h2
        className={cn(
          "mt-3 font-heading text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl",
          headingClassName
        )}
        variants={itemVariants}
      >
        {heading}
      </motion.h2>
      {description && (
        <motion.p
          className={cn(
            "mt-4 max-w-xl text-lg text-muted-foreground",
            align === "center" && "mx-auto max-w-lg",
            descriptionClassName
          )}
          variants={itemVariants}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
