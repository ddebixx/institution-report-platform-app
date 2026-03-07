"use client";

import { motion } from "framer-motion";
import { FileIcon, ShieldIcon, SparklesIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Regulation = {
  icon: typeof FileIcon;
  key: "primary" | "secondary" | "tertiary";
};

const regulations: Regulation[] = [
  { icon: FileIcon, key: "primary" },
  { icon: ShieldIcon, key: "secondary" },
  { icon: SparklesIcon, key: "tertiary" },
];

const viewport = { once: true, amount: 0.1 };

export const RegulationsSection = () => {
  const t = useTranslations("regulations");

  return (
    <motion.section
      className="relative w-full p-4 sm:p-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/3 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/3 blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 mb-8 sm:mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary sm:mb-4 sm:px-4 sm:py-2 sm:text-sm">
          <FileIcon className="size-3.5 sm:size-4" aria-hidden />
          {t("title")}
        </div>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">{t("description")}</p>
      </div>

      <div className="relative z-10 grid gap-4 sm:gap-6 md:grid-cols-3">
        {regulations.map((regulation) => {
          const Icon = regulation.icon;
          return (
            <motion.article
              key={regulation.key}
              className="group relative overflow-hidden rounded-2xl border border-border/20 bg-background/90 p-4 shadow-xs backdrop-blur-sm sm:p-6"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />

              <div className="relative z-10">
                <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2 text-primary sm:mb-4 sm:gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-xs group-hover:shadow-primary/20 sm:h-10 sm:w-10">
                    <Icon
                      className="size-4 transition-all duration-300 group-hover:scale-110 sm:size-5"
                      aria-hidden
                    />
                  </div>
                  <span className="text-base font-semibold transition-colors duration-300 group-hover:text-primary sm:text-lg">
                    {t(`${regulation.key}.name`)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {t(`${regulation.key}.desc`)}
                </p>
              </div>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]" />
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
};
