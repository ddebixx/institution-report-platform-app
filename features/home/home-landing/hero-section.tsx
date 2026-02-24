"use client";

import { motion } from "framer-motion";
import { FileTextIcon, ShieldIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import type { HeroSectionProps } from "./types";

export const HeroSection = ({ isAuthenticated, onOpenReportModal }: HeroSectionProps) => {
  const t = useTranslations();

  return (
    <motion.section
      className="relative w-full p-6"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="space-y-8">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-primary/20 hover:shadow-xs hover:shadow-primary/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ShieldIcon className="size-4 transition-all duration-300" />
            {t("hero.badge")}
          </motion.div>
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {!isAuthenticated && (
              <Button
                size="lg"
                className="group relative overflow-hidden font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xs hover:shadow-primary/30"
                onClick={onOpenReportModal}
              >
                <FileTextIcon className="size-5 transition-all duration-300" />
                {t("hero.cta.submit")}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
