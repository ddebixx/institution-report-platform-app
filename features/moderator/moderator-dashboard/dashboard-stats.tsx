import { useTranslations } from "next-intl";

import { DASHBOARD_STAT_CARDS } from "@/consts/moderator-dashboard";
import { getDashboardStatCardThemeClasses } from "@/lib/moderator-dashboard";
import type { DashboardStatsProps } from "@/types/moderator-dashboard";

const CARD_BASE =
  "group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:shadow-xs";
const OVERLAY_BASE =
  "absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100";
const ICON_BOX_BASE = "rounded-lg p-3 transition-all duration-300 group-hover:scale-110";

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const t = useTranslations();

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {DASHBOARD_STAT_CARDS.map((config) => {
        const value = stats[config.valueKey] as number;
        const themeClasses = getDashboardStatCardThemeClasses(config.theme);
        const Icon = config.icon;

        return (
          <div key={config.valueKey} className={`${CARD_BASE} ${themeClasses.card}`}>
            <div className={`${OVERLAY_BASE} ${themeClasses.overlay}`} />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t(config.labelKey)}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
              </div>
              <div className={`${ICON_BOX_BASE} ${themeClasses.iconWrapper}`}>
                <Icon className={`size-6 ${themeClasses.icon}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
