export function formatReportDate(
  dateString: string | undefined,
  options?: { locale?: string; emptyLabel?: string }
): string {
  if (!dateString) return options?.emptyLabel ?? "N/A";
  return new Date(dateString).toLocaleDateString(options?.locale ?? "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatReportDateShort(
  dateString: string | undefined,
  options?: { locale?: string; emptyLabel?: string }
): string {
  if (!dateString) return options?.emptyLabel ?? "N/A";

  return new Date(dateString).toLocaleDateString(options?.locale ?? "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
