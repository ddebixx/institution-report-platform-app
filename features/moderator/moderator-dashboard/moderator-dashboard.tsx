"use client";

import { MODERATOR_EMPTY_LIST_KEYS, MODERATOR_TABS } from "@/consts/moderator-dashboard";
import { useModeratorDashboard } from "@/hooks/use-moderator-dashboard";
import { calculateStats, getCurrentReports } from "@/lib/moderator-dashboard";
import { useAuthContext } from "@/providers/auth-provider";
import { DashboardLoading } from "./dashboard-loading";
import { DashboardStats } from "./dashboard-stats";
import { DashboardTabs } from "./dashboard-tabs";
import { ModeratorProfileModal } from "@/features/moderator/moderator-dashboard/moderator-profile-modal/moderator-profile-modal";
import { ReportPreviewModal } from "@/features/moderator/moderator-dashboard/report-preview-modal";
import { ReportReviewModal } from "./report-review-modal";
import { ReportsList } from "./reports-list";

export const ModeratorDashboard = () => {
  const { accessToken } = useAuthContext();

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
  } = useModeratorDashboard({ accessToken });

  const stats = calculateStats({
    availableReports,
    assignedReports,
    completedReports,
  });

  const currentReports = getCurrentReports(activeTab, {
    availableReports,
    assignedReports,
    completedReports,
  });

  if (isCheckingProfile) return <DashboardLoading message="admin.loading" />;

  if (isLoading) return <DashboardLoading message="admin.loadingReports" />;

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8">
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
            emptyMessageKey={MODERATOR_EMPTY_LIST_KEYS.available}
          />
        )}
        {activeTab === "assigned" && (
          <ReportsList
            reports={currentReports}
            onPreview={handlePreview}
            onReview={handleReview}
            onUnassign={handleUnassign}
            unassigningReportId={unassigningReportId}
            emptyMessageKey={MODERATOR_EMPTY_LIST_KEYS.assigned}
          />
        )}
        {activeTab === "completed" && (
          <ReportsList
            reports={currentReports}
            onPreview={handlePreview}
            emptyMessageKey={MODERATOR_EMPTY_LIST_KEYS.completed}
          />
        )}
      </div>

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
  );
};
