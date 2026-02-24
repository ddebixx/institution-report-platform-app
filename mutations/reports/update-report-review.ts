import { clientEnv } from "@/lib/env";
import {
  updateReportReviewPayloadSchema,
  type UpdateReportReviewPayload,
} from "@/lib/schemas/reports";

export const updateReportReview = async (
  reportId: string,
  payload: UpdateReportReviewPayload,
  accessToken: string
): Promise<void> => {
  const parsed = updateReportReviewPayloadSchema.safeParse(payload);
  if (!parsed.success || !parsed.data) {
    throw new Error("Invalid report review payload");
  }

  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const apiUrl = `${baseUrl}/reports/${reportId}/review`;

  const response = await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reportContent: {
        findings: parsed.data.findings,
        comparisonNotes: parsed.data.comparisonNotes,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to update report review (${response.status} ${response.statusText})`;
    throw new Error(errorMessage);
  }
};
