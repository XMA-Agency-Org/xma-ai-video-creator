"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import { EASE_OUT_EXPO } from "@/app/_lib/motion-config";

type Stat = {
  value: string;
  label: string;
  accent: boolean;
};

type AnimatedStatsProps = {
  stats: Stat[];
  isDark?: boolean;
};

function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseFloat(match[1]), suffix: match[2] };
}

function AnimatedNumber({
  value,
  inView,
  reduced,
}: {
  value: string;
  inView: boolean;
  reduced: boolean | null;
}) {
  const { number, suffix } = parseStatValue(value);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => {
    if (Number.isInteger(number)) return Math.round(v);
    return Math.round(v * 10) / 10;
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setDisplay(String(number));
      return;
    }

    const controls = animate(motionVal, number, {
      duration: 1.8,
      ease: EASE_OUT_EXPO,
    });

    const unsub = rounded.on("change", (v) => setDisplay(String(v)));

    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, number, motionVal, rounded, reduced]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function AnimatedStats({ stats, isDark = false }: AnimatedStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  const getDelay = useCallback(
    (i: number) => (reduced ? 0 : i * 0.1),
    [reduced],
  );

  return (
    <div ref={containerRef}>
      {/* Mobile: 2x2 dark card grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {stats.map((stat: Stat, i: number) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{
              duration: 0.5,
              delay: getDelay(i),
              ease: EASE_OUT_EXPO,
            }}
            className={`rounded-2xl px-5 py-6 ${isDark ? "bg-white/5" : "bg-[oklch(0.88_0.03_80)]"}`}
          >
            <span
              className={`block font-heading text-4xl font-black tracking-[-0.04em] tabular-nums ${
                stat.accent ? "text-lime-300" : isDark ? "text-white" : "text-foreground"
              }`}
            >
              <AnimatedNumber
                value={stat.value}
                inView={inView}
                reduced={reduced}
              />
            </span>
            <span className={`mt-1 block text-xs font-medium leading-snug ${isDark ? "text-white/40" : "text-foreground/50"}`}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Desktop: horizontal with animated dividers */}
      <div className="hidden md:flex md:items-center md:justify-between">
        {stats.map((stat: Stat, i: number) => (
          <div key={stat.value} className="flex items-center">
            {i > 0 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: getDelay(i) + 0.2,
                  ease: EASE_OUT_EXPO,
                }}
                className={`mr-10 h-16 w-px origin-top lg:mr-14 ${isDark ? "bg-white/10" : "bg-border"}`}
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: getDelay(i),
                ease: EASE_OUT_EXPO,
              }}
              className="flex items-center gap-5"
            >
              <span
                className={`font-heading text-5xl font-black tracking-[-0.03em] tabular-nums leading-none lg:text-6xl ${
                  stat.accent ? "text-lime-300" : isDark ? "text-white" : "text-foreground"
                }`}
              >
                <AnimatedNumber
                  value={stat.value}
                  inView={inView}
                  reduced={reduced}
                />
              </span>
              <span className={`max-w-[8rem] text-sm font-medium leading-snug ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
                {stat.label}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
