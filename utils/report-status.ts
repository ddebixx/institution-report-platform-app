import type { ReportStatus } from "@/types/reports";

export function getReportStatusLabelKey(status: ReportStatus): string {
  switch (status) {
    case "pending":
      return "status.pending";
    case "assigned":
      return "status.assigned";
    case "completed":
      return "status.completed";
    default:
      return status;
  }
}

export function getReportStatusBadgeClass(status: ReportStatus): string {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "assigned":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
}
