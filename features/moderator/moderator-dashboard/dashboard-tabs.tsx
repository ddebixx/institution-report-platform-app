import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

import { getTabCount } from "@/lib/moderator-dashboard";
import type { DashboardTabsProps } from "@/types/moderator-dashboard";

export const DashboardTabs = ({ tabs, activeTab, stats, onTabChange }: DashboardTabsProps) => {
  const t = useTranslations();

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-1 backdrop-blur-sm">
      <nav
        className="flex gap-1 overflow-x-auto overflow-y-hidden md:overflow-visible"
        aria-label="Tabs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const count = getTabCount(tab.id, stats);

          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={twMerge(
                "group relative flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:gap-2 sm:px-4 sm:py-3 md:min-w-0 md:flex-1",
                "whitespace-nowrap",
                isActive
                  ? "bg-primary/10 text-primary shadow-xs shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/5 via-primary/10 to-primary/5" />
              )}
              <Icon
                className={twMerge(
                  "size-4 shrink-0 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="relative z-10 truncate">{t(tab.labelKey)}</span>
              {count > 0 && (
                <span
                  className={twMerge(
                    "relative z-10 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold transition-all duration-300 sm:ml-1 sm:px-2.5",
                    isActive
                      ? "bg-primary/20 text-primary shadow-sm"
                      : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
