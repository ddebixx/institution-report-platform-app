import type { ModeratorReport } from "@/types/reports";
import type { CheckCircleIcon, FileCheckIcon } from "lucide-react";

export type ModeratorDashboardStats = {
  total: number;
  available: number;
  assigned: number;
  completed: number;
};

export type DashboardStatsProps = {
  stats: ModeratorDashboardStats;
};

export type UseModeratorProfileFormParams = {
  open: boolean;
  accessToken: string;
  onSuccess: () => void;
  onClose: () => void;
};

export type DashboardTabsStats = {
  available: number;
  assigned: number;
  completed: number;
};

export type DashboardTabsProps = {
  tabs: Tab[];
  activeTab: TabId;
  stats: DashboardTabsStats;
  onTabChange: (tabId: TabId) => void;
};

export type ModeratorProfileModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  accessToken: string;
};

export type DashboardLoadingProps = {
  message: string;
};

export type ReportsState = {
  availableReports: ModeratorReport[];
  assignedReports: ModeratorReport[];
  completedReports: ModeratorReport[];
};

export type UseModeratorDashboardProps = {
  accessToken: string | null;
};

export type DashboardStatValueKey = "total" | "available" | "assigned" | "completed";

export type DashboardStatCardTheme = "primary" | "blue" | "yellow" | "green";

export type DashboardStatCardConfig = {
  labelKey: string;
  valueKey: DashboardStatValueKey;
  icon: typeof FileCheckIcon;
  theme: DashboardStatCardTheme;
};

export type TabId = "available" | "assigned" | "completed";

export type Tab = {
  id: TabId;
  labelKey: string;
  icon: typeof CheckCircleIcon;
};
