"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ZapIcon, FileCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Benefit = {
  icon: LucideIcon;
  key: "efficiency" | "compliance";
};

const benefits: Benefit[] = [
  { icon: ZapIcon, key: "efficiency" },
  { icon: FileCheckIcon, key: "compliance" },
];

const viewport = { once: true, amount: 0.1 };

export const BenefitsSection = () => {
  const t = useTranslations("benefits");

  return (
    <motion.section
      className="relative w-full p-4 sm:p-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        visible: {
          transition: { staggerChildren: 0.12 },
        },
      }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.03),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.03),transparent_50%)]" />
      </div>

      <div className="relative z-10 mb-8 text-center sm:mb-12">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl px-2 text-base text-muted-foreground sm:px-0 sm:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative z-10 grid gap-4 sm:gap-6 md:grid-cols-2">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.key}
              className="group relative overflow-hidden rounded-2xl border border-border/20 bg-background/90 p-4 shadow-xs backdrop-blur-sm sm:p-6 lg:p-8"
              variants={{
                hidden: {
                  opacity: 0,
                  x: index % 2 === 0 ? -24 : 24,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8 },
                },
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]" />

              <div className="relative z-10 flex min-w-0 gap-4 sm:gap-6">
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:shadow-xs group-hover:shadow-primary/30 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                    <Icon
                      className="size-6 transition-all duration-300 group-hover:scale-110 sm:size-7 lg:size-8"
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1.5 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:mb-2 sm:text-xl">
                    {t(`${benefit.key}.title`)}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {t(`${benefit.key}.desc`)}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
