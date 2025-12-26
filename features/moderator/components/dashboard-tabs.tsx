import { twMerge } from "tailwind-merge"
import { useTranslations } from "next-intl"
import type { TabId, Tab } from "@/consts/moderator-dashboard"

type DashboardTabsProps = {
  tabs: Tab[]
  activeTab: TabId
  stats: {
    available: number
    assigned: number
    completed: number
  }
  onTabChange: (tabId: TabId) => void
}

export const DashboardTabs = ({ tabs, activeTab, stats, onTabChange }: DashboardTabsProps) => {
  const t = useTranslations()

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-1 backdrop-blur-sm">
      <nav className="flex space-x-1" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const count =
            tab.id === "available"
              ? stats.available
              : tab.id === "assigned"
                ? stats.assigned
                : stats.completed

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={twMerge(
                "group relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
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
                  "size-4 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="relative z-10">{t(tab.labelKey)}</span>
              {count > 0 && (
                <span
                  className={twMerge(
                    "relative z-10 ml-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-primary shadow-sm"
                      : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

