"use client";

import { motion } from "framer-motion";
import {
  FileTextIcon,
  ShieldCheckIcon,
  SearchIcon,
  CheckCircleIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Feature = {
  icon: typeof FileTextIcon;
  key: "pdf" | "regulations" | "moderation" | "dashboard";
};

const features: Feature[] = [
  { icon: FileTextIcon, key: "pdf" },
  { icon: SearchIcon, key: "regulations" },
  { icon: CheckCircleIcon, key: "moderation" },
  { icon: LayoutDashboardIcon, key: "dashboard" },
];

const viewport = { once: true, amount: 0.1 };

export const FeaturesSection = () => {
  const t = useTranslations("features");

  return (
    <motion.section
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/2 via-transparent to-primary/2 opacity-30 animate-pulse" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />

      <div className="relative z-10 mb-8 text-center sm:mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary sm:mb-4 sm:px-4 sm:py-2 sm:text-sm">
          <ShieldCheckIcon className="size-3.5 sm:size-4" aria-hidden />
          {t("title")}
        </div>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl px-2 text-base text-muted-foreground sm:px-0 sm:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative z-10 grid gap-4 sm:gap-6 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.key}
              className="group relative overflow-hidden rounded-2xl border border-border/20 bg-background/80 p-4 shadow-xs backdrop-blur-sm transition-all duration-700 sm:p-6"
              variants={{
                hidden: { opacity: 0, y: 48, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5" />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]" />

              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-primary/10 p-2.5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-xs group-hover:shadow-primary/20 sm:mb-4 sm:p-3">
                  <Icon
                    className="size-5 transition-all duration-300 group-hover:scale-110 sm:size-6"
                    aria-hidden
                  />
                </div>
                <h3 className="mb-1.5 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:mb-2 sm:text-xl">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {t(`${feature.key}.desc`)}
                </p>
              </div>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
