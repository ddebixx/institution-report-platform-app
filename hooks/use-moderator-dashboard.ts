import { useCallback, useEffect, useRef, useState } from "react"
import type { ModeratorReport } from "@/types/reports"
import type { TabId } from "@/consts/moderator-dashboard"
import {
  handleAssign as handleAssignReport,
  handlePreviewAssign as handlePreviewAssignReport,
  handleUnassign as handleUnassignReport,
  handlePreviewUnassign as handlePreviewUnassignReport,
  loadReports as loadReportsHandler,
} from "@/handlers/moderator-dashboard"
import { fetchModeratorProfile } from "@/fetchers/moderators"

type UseModeratorDashboardProps = {
  accessToken: string | null
}

export function useModeratorDashboard({ accessToken }: UseModeratorDashboardProps) {
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
  }, [accessToken, loadReports])

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

  return {
    activeTab,
    availableReports,
    assignedReports,
    completedReports,
    isLoading,
    assigningReportId,
    unassigningReportId,
    previewReport,
    reviewReport,
    showProfileModal,
    isCheckingProfile,
    handleTabChange,
    handleAssign,
    handleUnassign,
    handlePreview,
    handleReview,
    handleClosePreview,
    handleCloseReview,
    handlePreviewAssign,
    handlePreviewUnassign,
    handleReviewUpdate,
    handleProfileModalClose,
    handleProfileModalSuccess,
  }
}

