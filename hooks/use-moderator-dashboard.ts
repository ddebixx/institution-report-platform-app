import { useCallback, useEffect, useState } from "react";
import type { ModeratorReport } from "@/types/reports";
import type { TabId } from "@/types/moderator-dashboard";
import {
  handleAssign as handleAssignReport,
  handlePreviewAssign as handlePreviewAssignReport,
  handleUnassign as handleUnassignReport,
  handlePreviewUnassign as handlePreviewUnassignReport,
} from "@/handlers/moderator-dashboard";
import { useModeratorProfileQuery } from "@/hooks/use-moderator-profile-query";
import { useReportsQueries } from "@/hooks/use-reports-queries";
import type { UseModeratorDashboardProps } from "@/types/moderator-dashboard";

export function useModeratorDashboard({ accessToken }: UseModeratorDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("available");
  const [assigningReportId, setAssigningReportId] = useState<string | null>(null);
  const [unassigningReportId, setUnassigningReportId] = useState<string | null>(null);
  const [previewReport, setPreviewReport] = useState<ModeratorReport | null>(null);
  const [reviewReport, setReviewReport] = useState<ModeratorReport | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const {
    profile,
    isLoading: isCheckingProfile,
    refetch: refetchProfile,
  } = useModeratorProfileQuery({
    accessToken,
  });

  const {
    availableReports,
    assignedReports,
    completedReports,
    isLoading: isReportsLoading,
    refetchAll: refetchReports,
  } = useReportsQueries({
    accessToken: accessToken && profile !== undefined && profile !== null ? accessToken : null,
  });

  const isLoading = isCheckingProfile || isReportsLoading;

  useEffect(() => {
    function showProfileModalWhenNoProfile() {
      if (!accessToken || isCheckingProfile) return;
      if (profile === null) {
        setShowProfileModal(true);
      }
    }

    showProfileModalWhenNoProfile();
  }, [accessToken, isCheckingProfile, profile]);

  const loadReports = useCallback(async () => {
    await refetchReports();
  }, [refetchReports]);

  const handleAssign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return;

      await handleAssignReport({
        reportId,
        accessToken,
        setAssigningReportId,
        loadReports,
      });
    },
    [accessToken, loadReports]
  );

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

  const handlePreview = useCallback((report: ModeratorReport) => {
    setPreviewReport(report);
  }, []);

  const handleReview = useCallback((report: ModeratorReport) => {
    setReviewReport(report);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewReport(null);
  }, []);

  const handleCloseReview = useCallback(() => {
    setReviewReport(null);
  }, []);

  const handlePreviewAssign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return;

      await handlePreviewAssignReport({
        reportId,
        accessToken,
        setAssigningReportId,
        setPreviewReport,
        loadReports,
      });
    },
    [accessToken, loadReports]
  );

  const handleUnassign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return;

      await handleUnassignReport({
        reportId,
        accessToken,
        setUnassigningReportId,
        loadReports,
      });
    },
    [accessToken, loadReports]
  );

  const handlePreviewUnassign = useCallback(
    async (reportId: string) => {
      if (!accessToken) return;

      await handlePreviewUnassignReport({
        reportId,
        accessToken,
        setUnassigningReportId,
        setPreviewReport,
        loadReports,
      });
    },
    [accessToken, loadReports]
  );

  const handleReviewUpdate = useCallback(async () => {
    await loadReports();
  }, [loadReports]);

  const handleProfileModalClose = useCallback(() => {
    setShowProfileModal(false);
  }, []);

  const handleProfileModalSuccess = useCallback(async () => {
    setShowProfileModal(false);
    await refetchProfile();
    await refetchReports();
  }, [refetchProfile, refetchReports]);

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
  };
}
