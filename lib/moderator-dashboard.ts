import type { ModeratorReport } from "@/types/reports"
import type { TabId } from "@/consts/moderator-dashboard"

type ReportsState = {
  availableReports: ModeratorReport[]
  assignedReports: ModeratorReport[]
  completedReports: ModeratorReport[]
}

export function getCurrentReports(
  activeTab: TabId,
  reportsState: ReportsState
): ModeratorReport[] {
  const { availableReports, assignedReports, completedReports } = reportsState

  switch (activeTab) {
    case "available":
      return availableReports
    case "assigned":
      return assignedReports.filter((report) => report.status === "assigned")
    case "completed":
      return completedReports
    default:
      return []
  }
}

export function calculateStats(reportsState: ReportsState) {
  const { availableReports, assignedReports, completedReports } = reportsState

  const assignedOnlyCount = assignedReports.filter(
    (report) => report.status === "assigned"
  ).length

  return {
    available: availableReports.length,
    assigned: assignedOnlyCount,
    completed: completedReports.length,
    total: availableReports.length + assignedOnlyCount + completedReports.length,
  }
}

