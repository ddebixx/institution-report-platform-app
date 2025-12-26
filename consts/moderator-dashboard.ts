import { CheckCircleIcon, ClockIcon, FileCheckIcon } from "lucide-react"

export type TabId = "available" | "assigned" | "completed"

export type Tab = {
  id: TabId
  labelKey: string
  icon: typeof CheckCircleIcon
}

export const MODERATOR_TABS: Tab[] = [
  { id: "available", labelKey: "moderatorDashboard.tabs.available", icon: FileCheckIcon },
  { id: "assigned", labelKey: "moderatorDashboard.tabs.assigned", icon: ClockIcon },
  { id: "completed", labelKey: "moderatorDashboard.tabs.completed", icon: CheckCircleIcon },
]

