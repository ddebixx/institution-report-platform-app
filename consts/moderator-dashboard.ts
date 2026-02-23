import type {
  DashboardStatCardConfig,
  DashboardStatCardTheme,
  Tab,
} from "@/types/moderator-dashboard";
import { CheckCircleIcon, ClockIcon, FileCheckIcon } from "lucide-react";

export const MODERATOR_TABS: Tab[] = [
  { id: "available", labelKey: "moderatorDashboard.tabs.available", icon: FileCheckIcon },
  { id: "assigned", labelKey: "moderatorDashboard.tabs.assigned", icon: ClockIcon },
  { id: "completed", labelKey: "moderatorDashboard.tabs.completed", icon: CheckCircleIcon },
];

export const MODERATOR_EMPTY_LIST_KEYS = {
  available: "moderatorDashboard.empty.available",
  assigned: "moderatorDashboard.empty.assigned",
  completed: "moderatorDashboard.empty.completed",
} as const;

export const THEME_CARD_CLASSES: Record<
  DashboardStatCardTheme,
  { card: string; overlay: string; iconWrapper: string; icon: string }
> = {
  primary: {
    card: "hover:border-primary/30 hover:shadow-primary/10",
    overlay: "from-primary/5 via-transparent to-primary/5",
    iconWrapper: "bg-primary/10 group-hover:bg-primary/20",
    icon: "text-primary",
  },
  blue: {
    card: "hover:border-blue-500/30 hover:shadow-blue-500/10",
    overlay: "from-blue-500/5 via-transparent to-blue-500/5",
    iconWrapper: "bg-blue-500/10 group-hover:bg-blue-500/20",
    icon: "text-blue-500",
  },
  yellow: {
    card: "hover:border-yellow-500/30 hover:shadow-yellow-500/10",
    overlay: "from-yellow-500/5 via-transparent to-yellow-500/5",
    iconWrapper: "bg-yellow-500/10 group-hover:bg-yellow-500/20",
    icon: "text-yellow-500",
  },
  green: {
    card: "hover:border-green-500/30 hover:shadow-green-500/10",
    overlay: "from-green-500/5 via-transparent to-green-500/5",
    iconWrapper: "bg-green-500/10 group-hover:bg-green-500/20",
    icon: "text-green-500",
  },
};

export const MODERATOR_EMPTY_LIST_DEFAULT_KEY = "moderatorDashboard.empty.default";

export const MODERATOR_EMPTY_LIST_TITLE_KEY = "moderatorDashboard.empty.title";

export const DASHBOARD_STAT_CARDS: DashboardStatCardConfig[] = [
  {
    labelKey: "moderatorDashboard.stats.total",
    valueKey: "total",
    icon: FileCheckIcon,
    theme: "primary",
  },
  {
    labelKey: "moderatorDashboard.tabs.available",
    valueKey: "available",
    icon: FileCheckIcon,
    theme: "blue",
  },
  {
    labelKey: "moderatorDashboard.tabs.assigned",
    valueKey: "assigned",
    icon: ClockIcon,
    theme: "yellow",
  },
  {
    labelKey: "moderatorDashboard.tabs.completed",
    valueKey: "completed",
    icon: CheckCircleIcon,
    theme: "green",
  },
];
