import { toast } from "sonner";

import { assignReportToSelf, unassignReportFromSelf } from "@/mutations/reports";
import type { ModeratorReport } from "@/types/reports";

type HandleAssignParams = {
  reportId: string;
  accessToken: string;
  setAssigningReportId: (id: string | null) => void;
  loadReports: () => Promise<void>;
};

export const handleAssign = async ({
  reportId,
  accessToken,
  setAssigningReportId,
  loadReports,
}: HandleAssignParams): Promise<void> => {
  setAssigningReportId(reportId);
  try {
    await assignReportToSelf(reportId, accessToken);
    toast.success("Report assigned successfully");
    await loadReports();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to assign report";
    toast.error(errorMessage);
  } finally {
    setAssigningReportId(null);
  }
};

type HandlePreviewAssignParams = {
  reportId: string;
  accessToken: string;
  setAssigningReportId: (id: string | null) => void;
  setPreviewReport: (report: ModeratorReport | null) => void;
  loadReports: () => Promise<void>;
};

export const handlePreviewAssign = async ({
  reportId,
  accessToken,
  setAssigningReportId,
  setPreviewReport,
  loadReports,
}: HandlePreviewAssignParams): Promise<void> => {
  setAssigningReportId(reportId);
  try {
    await assignReportToSelf(reportId, accessToken);

    toast.success("Report assigned successfully");

    setPreviewReport(null);

    await loadReports();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to assign report";

    toast.error(errorMessage);
  } finally {
    setAssigningReportId(null);
  }
};

type HandleUnassignParams = {
  reportId: string;
  accessToken: string;
  setUnassigningReportId: (id: string | null) => void;
  loadReports: () => Promise<void>;
};

export const handleUnassign = async ({
  reportId,
  accessToken,
  setUnassigningReportId,
  loadReports,
}: HandleUnassignParams): Promise<void> => {
  setUnassigningReportId(reportId);
  try {
    await unassignReportFromSelf(reportId, accessToken);
    toast.success("Report unassigned successfully");
    await loadReports();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to unassign report";
    toast.error(errorMessage);
  } finally {
    setUnassigningReportId(null);
  }
};

type HandlePreviewUnassignParams = {
  reportId: string;
  accessToken: string;
  setUnassigningReportId: (id: string | null) => void;
  setPreviewReport: (report: ModeratorReport | null) => void;
  loadReports: () => Promise<void>;
};

export const handlePreviewUnassign = async ({
  reportId,
  accessToken,
  setUnassigningReportId,
  setPreviewReport,
  loadReports,
}: HandlePreviewUnassignParams): Promise<void> => {
  setUnassigningReportId(reportId);
  try {
    await unassignReportFromSelf(reportId, accessToken);

    toast.success("Report unassigned successfully");

    setPreviewReport(null);

    await loadReports();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to unassign report";

    toast.error(errorMessage);
  } finally {
    setUnassigningReportId(null);
  }
};
