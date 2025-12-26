"use client"

import { useAuthContext } from "@/components/auth/auth-provider"
import { MODERATOR_TABS } from "@/consts/moderator-dashboard"
import { useModeratorDashboard } from "@/hooks/use-moderator-dashboard"
import { calculateStats, getCurrentReports } from "@/lib/moderator-dashboard"
import { DashboardLoading } from "./components/dashboard-loading"
import { DashboardStats } from "./components/dashboard-stats"
import { DashboardTabs } from "./components/dashboard-tabs"
import { ModeratorProfileModal } from "./components/moderator-profile-modal"
import { ReportPreviewModal } from "./components/report-preview-modal"
import { ReportReviewModal } from "./components/report-review-modal"
import { ReportsList } from "./components/reports-list"

export const ModeratorDashboard = () => {
  const { accessToken } = useAuthContext()

  const {
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
  } = useModeratorDashboard({ accessToken })

  const stats = calculateStats({
    availableReports,
    assignedReports,
    completedReports,
  })

  const currentReports = getCurrentReports(activeTab, {
    availableReports,
    assignedReports,
    completedReports,
  })

  if (isCheckingProfile) {
    return <DashboardLoading message="admin.loading" />
  }

  if (isLoading) {
    return <DashboardLoading message="admin.loadingReports" />
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <DashboardStats stats={stats} />

      <DashboardTabs
        tabs={MODERATOR_TABS}
        activeTab={activeTab}
        stats={stats}
        onTabChange={handleTabChange}
      />
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

