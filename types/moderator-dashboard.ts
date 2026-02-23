import type { ModeratorReport } from "@/types/reports";
import type { TabId, Tab } from "@/consts/moderator-dashboard";

export type ModeratorDashboardStats = {
  total: number;
  available: number;
  assigned: number;
  completed: number;
};

export type DashboardStatsProps = {
  stats: ModeratorDashboardStats;
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
