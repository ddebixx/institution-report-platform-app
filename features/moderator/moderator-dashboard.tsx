"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { CheckCircleIcon, ClockIcon, FileCheckIcon, LoaderIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { useTranslations } from "next-intl"

import { useAuthContext } from "@/components/auth/auth-provider"
import type { ModeratorReport } from "@/types/reports"
import {
  handleAssign as handleAssignReport,
  handlePreviewAssign as handlePreviewAssignReport,
  handleUnassign as handleUnassignReport,
  handlePreviewUnassign as handlePreviewUnassignReport,
  loadReports as loadReportsHandler,
} from "@/handlers/moderator-dashboard"
import { ReportsList } from "./components/reports-list"
import { ReportPreviewModal } from "./components/report-preview-modal"
import { ReportReviewModal } from "./components/report-review-modal"
import { ModeratorProfileModal } from "./components/moderator-profile-modal"
import { fetchModeratorProfile } from "@/fetchers/moderators"

type TabId = "available" | "assigned" | "completed"

type Tab = {
  id: TabId
  labelKey: string
  icon: typeof CheckCircleIcon
}

const tabs: Tab[] = [
  { id: "available", labelKey: "moderatorDashboard.tabs.available", icon: FileCheckIcon },
  { id: "assigned", labelKey: "moderatorDashboard.tabs.assigned", icon: ClockIcon },
  { id: "completed", labelKey: "moderatorDashboard.tabs.completed", icon: CheckCircleIcon },
]

export const ModeratorDashboard = () => {
  const { accessToken } = useAuthContext()
  const t = useTranslations()
  const [activeTab, setActiveTab] = useState<TabId>("available")
  const [availableReports, setAvailableReports] = useState<ModeratorReport[]>([])
  const [assignedReports, setAssignedReports] = useState<ModeratorReport[]>([])
  const [completedReports, setCompletedReports] = useState<ModeratorReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [assigningReportId, setAssigningReportId] = useState<string | null>(null)
  const [unassigningReportId, setUnassigningReportId] = useState<string | null>(null)
  const [previewReport, setPreviewReport] = useState<ModeratorReport | null>(null)
  const [reviewReport, setReviewReport] = useState<ModeratorReport | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [isCheckingProfile, setIsCheckingProfile] = useState(true)
  const profileCheckTokenRef = useRef<string | null>(null)

  const loadReports = useCallback(async () => {
    if (!accessToken) return

    await loadReportsHandler({
      accessToken,
      setAvailableReports,
      setAssignedReports,
      setCompletedReports,
      setIsLoading,
    })
  }, [accessToken])

  useEffect(() => {
    async function checkModeratorProfileAndLoadReports() {
      if (!accessToken) {
        setIsCheckingProfile(false)
        profileCheckTokenRef.current = null
        return
      }

      if (profileCheckTokenRef.current === accessToken) {
        return
      }

      profileCheckTokenRef.current = accessToken

      try {
        const profile = await fetchModeratorProfile(accessToken)
        setIsCheckingProfile(false)

        if (!profile) {
          console.log("[ModeratorDashboard] No profile found, showing modal")
          setShowProfileModal(true)
          setIsLoading(false)
        } else {
          console.log("[ModeratorDashboard] Profile found, loading reports")
          await loadReports()
        }
      } catch (error) {
        console.error("[ModeratorDashboard] Failed to check moderator profile:", error)
        
        setIsCheckingProfile(false)
        setIsLoading(false)
        
        const errorMessage = error instanceof Error ? error.message : String(error)
        
        console.log("[ModeratorDashboard] Error occurred, showing modal. Error:", errorMessage)
        
        setShowProfileModal(true)
        
        profileCheckTokenRef.current = null
      }
    }

    checkModeratorProfileAndLoadReports()
  }, [accessToken])

  const handleAssign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return

      await handleAssignReport({
        reportId,
        accessToken,
        setAssigningReportId,
        loadReports,
      })
    },
    [accessToken, loadReports]
  )

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId)
  }, [])

  const handlePreview = useCallback((report: ModeratorReport) => {
    setPreviewReport(report)
  }, [])

  const handleReview = useCallback((report: ModeratorReport) => {
    setReviewReport(report)
  }, [])

  const handleClosePreview = useCallback(() => {
    setPreviewReport(null)
  }, [])

  const handleCloseReview = useCallback(() => {
    setReviewReport(null)
  }, [])

  const handlePreviewAssign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return

      await handlePreviewAssignReport({
        reportId,
        accessToken,
        setAssigningReportId,
        setPreviewReport,
        loadReports,
      })
    },
    [accessToken, loadReports]
  )

  const handleUnassign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return

      await handleUnassignReport({
        reportId,
        accessToken,
        setUnassigningReportId,
        loadReports,
      })
    },
    [accessToken, loadReports]
  )

  const handlePreviewUnassign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return

      await handlePreviewUnassignReport({
        reportId,
        accessToken,
        setUnassigningReportId,
        setPreviewReport,
        loadReports,
      })
    },
    [accessToken, loadReports]
  )

  const handleReviewUpdate = useCallback(async () => {
    await loadReports()
  }, [loadReports])

  const handleProfileModalClose = useCallback(() => {
    setShowProfileModal(false)
  }, [])

  const handleProfileModalSuccess = useCallback(async () => {
    setShowProfileModal(false)
    profileCheckTokenRef.current = null
    setIsLoading(true)
    await loadReports()
  }, [loadReports])

  const getCurrentReports = useCallback(() => {
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
  }, [activeTab, availableReports, assignedReports, completedReports])

  const getStats = useCallback(() => {
    const assignedOnlyCount = assignedReports.filter(
      (report) => report.status === "assigned"
    ).length
    return {
      available: availableReports.length,
      assigned: assignedOnlyCount,
      completed: completedReports.length,
      total: availableReports.length + assignedOnlyCount + completedReports.length,
    }
  }, [availableReports.length, assignedReports, completedReports.length])

  const stats = getStats()
  const currentReports = getCurrentReports()

  if (isCheckingProfile) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t("admin.loading")}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t("admin.loadingReports")}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xs hover:shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("moderatorDashboard.stats.total")}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
              <FileCheckIcon className="size-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-xs hover:shadow-blue-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("moderatorDashboard.tabs.available")}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.available}
              </p>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
              <FileCheckIcon className="size-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/30 hover:shadow-xs hover:shadow-yellow-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("moderatorDashboard.tabs.assigned")}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.assigned}
              </p>
            </div>
            <div className="rounded-lg bg-yellow-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500/20">
              <ClockIcon className="size-6 text-yellow-500" />
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:shadow-xs hover:shadow-green-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("moderatorDashboard.tabs.completed")}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stats.completed}
              </p>
            </div>
            <div className="rounded-lg bg-green-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/20">
              <CheckCircleIcon className="size-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-1 backdrop-blur-sm">
        <nav className="flex space-x-1" aria-label="Tabs">
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
                  "group relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary/10 text-primary shadow-xs shadow-primary/10"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
                )}
                <Icon className={twMerge("size-4 transition-transform duration-300", isActive && "scale-110")} />
                <span className="relative z-10">{t(tab.labelKey)}</span>
                {count > 0 && (
                  <span
                    className={twMerge(
                      "relative z-10 ml-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300",
                      isActive
                        ? "bg-primary/20 text-primary shadow-sm"
                        : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
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
      <div className="space-y-4">
        {activeTab === "available" && (
          <ReportsList
            reports={currentReports}
            onAssign={handleAssign}
            onPreview={handlePreview}
            assigningReportId={assigningReportId}
            showAssignButton={true}
            emptyMessage="No available reports to assign"
          />
        )}
        {activeTab === "assigned" && (
          <ReportsList
            reports={currentReports}
            onPreview={handlePreview}
            onReview={handleReview}
            onUnassign={handleUnassign}
            unassigningReportId={unassigningReportId}
            emptyMessage="No assigned reports"
          />
        )}
        {activeTab === "completed" && (
          <ReportsList
            reports={currentReports}
            onPreview={handlePreview}
            emptyMessage="No completed reports"
          />
        )}
      </div>

      {/* Modals */}
      <ReportPreviewModal
        open={previewReport !== null}
        report={previewReport}
        onClose={handleClosePreview}
        onAssign={handlePreviewAssign}
        onUnassign={handlePreviewUnassign}
        isAssigning={assigningReportId !== null}
        isUnassigning={unassigningReportId !== null}
      />
      <ReportReviewModal
        open={reviewReport !== null}
        report={reviewReport}
        onClose={handleCloseReview}
        onUpdate={handleReviewUpdate}
      />
      {accessToken && (
        <ModeratorProfileModal
          open={showProfileModal}
          onClose={handleProfileModalClose}
          onSuccess={handleProfileModalSuccess}
          accessToken={accessToken}
        />
      )}
    </div>
  )
}

