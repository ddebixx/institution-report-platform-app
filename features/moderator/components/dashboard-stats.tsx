import { CheckCircleIcon, ClockIcon, FileCheckIcon } from "lucide-react"
import { useTranslations } from "next-intl"

type DashboardStatsProps = {
  stats: {
    total: number
    available: number
    assigned: number
    completed: number
  }
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const t = useTranslations()

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xs hover:shadow-primary/10">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("moderatorDashboard.stats.total")}
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
            <FileCheckIcon className="size-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-xs hover:shadow-blue-500/10">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("moderatorDashboard.tabs.available")}
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.available}</p>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
            <FileCheckIcon className="size-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/30 hover:shadow-xs hover:shadow-yellow-500/10">
        <div className="absolute inset-0 bg-linear-to-br from-yellow-500/5 via-transparent to-yellow-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("moderatorDashboard.tabs.assigned")}
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.assigned}</p>
          </div>
          <div className="rounded-lg bg-yellow-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500/20">
            <ClockIcon className="size-6 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:shadow-xs hover:shadow-green-500/10">
        <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-green-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("moderatorDashboard.tabs.completed")}
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.completed}</p>
          </div>
          <div className="rounded-lg bg-green-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/20">
            <CheckCircleIcon className="size-6 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

