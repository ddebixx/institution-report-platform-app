import { useTranslations } from "next-intl";

import { DASHBOARD_STAT_CARDS } from "@/consts/moderator-dashboard";
import { getDashboardStatCardThemeClasses } from "@/lib/moderator-dashboard";
import type { DashboardStatsProps } from "@/types/moderator-dashboard";

const CARD_BASE =
  "group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-4 shadow-xs backdrop-blur-sm transition-all duration-300 hover:shadow-xs sm:p-5 md:p-6";
const OVERLAY_BASE =
  "absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100";
const ICON_BOX_BASE = "rounded-lg p-2 transition-all duration-300 group-hover:scale-110 sm:p-3";

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
      {DASHBOARD_STAT_CARDS.map((config) => {
        const value = stats[config.valueKey] as number;
        const themeClasses = getDashboardStatCardThemeClasses(config.theme);
        const Icon = config.icon;

        return (
          <div key={config.valueKey} className={`${CARD_BASE} ${themeClasses.card}`}>
            <div className={`${OVERLAY_BASE} ${themeClasses.overlay}`} />
            <div className="relative flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
                  {t(config.labelKey)}
                </p>
                <p className="mt-0.5 text-xl font-bold text-foreground sm:mt-2 sm:text-3xl">
                  {value}
                </p>
              </div>
              <div
                className={`${ICON_BOX_BASE} ${themeClasses.iconWrapper} self-start sm:self-auto`}
              >
                <Icon className={`size-5 sm:size-6 ${themeClasses.icon}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
