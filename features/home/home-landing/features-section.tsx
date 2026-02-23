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
      className="relative w-full p-6"
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

      <div className="relative z-10 mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <ShieldCheckIcon className="size-4" />
          {t("title")}
        </div>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.key}
              className="group relative overflow-hidden rounded-2xl border border-border/20 bg-background/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-700"
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
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-xs group-hover:shadow-primary/20">
                  <Icon className="size-6 transition-all duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
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
