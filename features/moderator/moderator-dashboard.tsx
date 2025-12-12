"use client"

import { useCallback, useEffect, useState } from "react"
import { CheckCircleIcon, ClockIcon, FileCheckIcon, LoaderIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

import { useAuthContext } from "@/components/auth/auth-provider"
import {
  assignReportToSelf,
  fetchAssignedReports,
  fetchAvailableReports,
  fetchCompletedReports,
} from "@/fetchers/reports"
import type { ModeratorReport } from "@/types/reports"
import { ReportsList } from "./components/reports-list"

type TabId = "available" | "assigned" | "completed"

type Tab = {
  id: TabId
  label: string
  icon: typeof CheckCircleIcon
}

const tabs: Tab[] = [
  { id: "available", label: "Available", icon: FileCheckIcon },
  { id: "assigned", label: "Assigned", icon: ClockIcon },
  { id: "completed", label: "Completed", icon: CheckCircleIcon },
]

export const ModeratorDashboard = () => {
  const { accessToken } = useAuthContext()
  const [activeTab, setActiveTab] = useState<TabId>("available")
  const [availableReports, setAvailableReports] = useState<ModeratorReport[]>([])
  const [assignedReports, setAssignedReports] = useState<ModeratorReport[]>([])
  const [completedReports, setCompletedReports] = useState<ModeratorReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [assigningReportId, setAssigningReportId] = useState<string | null>(null)

  const loadReports = useCallback(async () => {
    if (!accessToken) return

    setIsLoading(true)
    try {
      const [available, assigned, completed] = await Promise.all([
        fetchAvailableReports(accessToken),
        fetchAssignedReports(accessToken),
        fetchCompletedReports(accessToken),
      ])

      setAvailableReports(available)
      setAssignedReports(assigned)
      setCompletedReports(completed)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load reports"
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    function initializeDashboard() {
      loadReports()
    }

    initializeDashboard()
  }, [loadReports])

  const handleAssign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return

      setAssigningReportId(reportId)
      try {
        await assignReportToSelf(reportId, accessToken)
        toast.success("Report assigned successfully")
        await loadReports()
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to assign report"
        toast.error(errorMessage)
      } finally {
        setAssigningReportId(null)
      }
    },
    [accessToken, loadReports]
  )

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId)
  }, [])

  const getCurrentReports = useCallback(() => {
    switch (activeTab) {
      case "available":
        return availableReports
      case "assigned":
        return assignedReports
      case "completed":
        return completedReports
      default:
        return []
    }
  }, [activeTab, availableReports, assignedReports, completedReports])

  const getStats = useCallback(() => {
    return {
      available: availableReports.length,
      assigned: assignedReports.length,
      completed: completedReports.length,
      total: availableReports.length + assignedReports.length + completedReports.length,
    }
  }, [availableReports.length, assignedReports.length, completedReports.length])

  const stats = getStats()
  const currentReports = getCurrentReports()

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <FileCheckIcon className="size-8 text-muted-foreground" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {stats.available}
              </p>
            </div>
            <FileCheckIcon className="size-8 text-blue-500" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assigned</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {stats.assigned}
              </p>
            </div>
            <ClockIcon className="size-8 text-yellow-500" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {stats.completed}
              </p>
            </div>
            <CheckCircleIcon className="size-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-1" aria-label="Tabs">
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
                onClick={() => handleTabChange(tab.id)}
                className={twMerge(
                  "group relative flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
                {count > 0 && (
                  <span
                    className={twMerge(
                      "ml-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
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

      {/* Reports List */}
      <div>
        {activeTab === "available" && (
          <ReportsList
            reports={currentReports}
            onAssign={handleAssign}
            assigningReportId={assigningReportId}
            showAssignButton={true}
            emptyMessage="No available reports to assign"
          />
        )}
        {activeTab === "assigned" && (
          <ReportsList
            reports={currentReports}
            emptyMessage="No assigned reports"
          />
        )}
        {activeTab === "completed" && (
          <ReportsList
            reports={currentReports}
            emptyMessage="No completed reports"
          />
        )}
      </div>
    </div>
  )
}

