import type { ModeratorReport } from "@/types/reports";
import type { TabId, DashboardStatCardTheme } from "@/types/moderator-dashboard";
import type { ReportsState, ModeratorDashboardStats } from "@/types/moderator-dashboard";

import { THEME_CARD_CLASSES } from "@/consts/moderator-dashboard";

export function getDashboardStatCardThemeClasses(theme: DashboardStatCardTheme) {
  return THEME_CARD_CLASSES[theme];
}

export function getTabCount(
  tabId: TabId,
  stats: Pick<ModeratorDashboardStats, "available" | "assigned" | "completed">
): number {
  switch (tabId) {
    case "available":
      return stats.available;
    case "assigned":
      return stats.assigned;
    case "completed":
      return stats.completed;
    default:
      return 0;
  }
}

export function getCurrentReports(activeTab: TabId, reportsState: ReportsState): ModeratorReport[] {
  const { availableReports, assignedReports, completedReports } = reportsState;

  switch (activeTab) {
    case "available":
      return availableReports;
    case "assigned":
      return assignedReports.filter((report) => report.status === "assigned");
    case "completed":
      return completedReports;
    default:
      return [];
  }
}

export function calculateStats(reportsState: ReportsState): ModeratorDashboardStats {
  const { availableReports, assignedReports, completedReports } = reportsState;

  const assignedOnlyCount = assignedReports.filter((report) => report.status === "assigned").length;

  return {
    available: availableReports.length,
    assigned: assignedOnlyCount,
    completed: completedReports.length,
    total: availableReports.length + assignedOnlyCount + completedReports.length,
  };
}
