"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Stat = {
  key: "reportsSubmitted" | "activeModerators" | "avgResponseTime" | "complianceRate";
  value: string;
  suffix?: string;
};

const stats: Stat[] = [
  { key: "reportsSubmitted", value: "10K+", suffix: "" },
  { key: "activeModerators", value: "50+", suffix: "" },
  { key: "avgResponseTime", value: "24", suffix: "h" },
  { key: "complianceRate", value: "99.9", suffix: "%" },
];

const viewport = { once: true, amount: 0.1 };

const COUNT_UP_DURATION_MS = 2000;
const COUNT_UP_STEPS = 60;

function formatStatDisplayValue(stat: Stat, count: number, numericValue: number): string {
  const isValidNumber = !Number.isNaN(numericValue) && numericValue > 0;
  const hasCountStarted = stat.suffix === "%" ? count > 0 : count >= 0;
  const isAnimating = isValidNumber && hasCountStarted;

  if (!isAnimating) return stat.value;

  const decimals = stat.suffix === "%" ? 1 : 0;
  const formatted = count.toFixed(decimals);

  if (stat.value.includes("K")) return `${(count / 1000).toFixed(0)}K+`;
  if (stat.value.includes("+")) return `${formatted}+`;
  return formatted;
}

function useCountUp(end: number, isInView: boolean, delayMs: number): number {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isInView || end <= 0) return;

    const timeoutId = setTimeout(() => {
      const stepMs = COUNT_UP_DURATION_MS / COUNT_UP_STEPS;
      const increment = end / COUNT_UP_STEPS;
      let value = 0;

      function tick(): void {
        value += increment;
        const reachedEnd = value >= end;
        setCurrent(reachedEnd ? end : value);

        if (!reachedEnd) return;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      intervalRef.current = setInterval(tick, stepMs);
    }, delayMs);

    function cleanup(): void {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return cleanup;
  }, [end, isInView, delayMs]);

  return current;
}

export const StatsSection = () => {
  const t = useTranslations("stats");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full p-4 sm:p-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/15 animate-ping"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 h-2 w-2 rounded-full bg-primary/15 animate-ping"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 h-2 w-2 rounded-full bg-primary/15 animate-ping"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 mb-8 text-center sm:mb-12">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-4xl">
          {t("title")}
        </h2>
      </div>

      <div className="relative z-10 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.key}
            stat={stat}
            index={index}
            isInView={isInView}
            label={t(stat.key)}
          />
        ))}
      </div>
    </motion.section>
  );
};

type StatCardProps = {
  stat: Stat;
  index: number;
  isInView: boolean;
  label: string;
};

function StatCard({ stat, index, isInView, label }: StatCardProps) {
  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const target = Number.isNaN(numericValue) ? 0 : numericValue;
  const count = useCountUp(target, isInView, index * 100);
  const displayValue = formatStatDisplayValue(stat, count, numericValue);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/90 p-4 text-center shadow-xs backdrop-blur-sm transition-all duration-700 sm:p-6 lg:p-8"
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6 },
        },
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

      <div className="relative z-10">
        <div className="mb-2 text-3xl font-bold text-primary transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.3)] sm:text-4xl lg:text-5xl">
          {displayValue}
          {stat.suffix ? <span className="text-2xl sm:text-3xl">{stat.suffix}</span> : null}
        </div>
        <div className="text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:text-sm">
          {label}
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]" />
    </motion.div>
  );
}
