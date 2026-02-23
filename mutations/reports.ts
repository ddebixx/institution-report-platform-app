import { z } from "zod";

import { clientEnv } from "@/lib/env";
import {
  createReportPayloadSchema,
  updateReportReviewPayloadSchema,
  type CreateReportPayload,
  type UpdateReportReviewPayload,
} from "@/lib/schemas/reports";

export type { CreateReportPayload };

const createReportResponseSchema = z.object({
  reportId: z.string(),
  pdfPath: z.string().optional(),
  institutionId: z.string().optional(),
});

export type CreateReportResponse = z.infer<typeof createReportResponseSchema>;

export const createReport = async (
  payload: CreateReportPayload,
  accessToken?: string
): Promise<CreateReportResponse> => {
  const parsed = createReportPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("Invalid create report payload");
  }
  const validPayload = parsed.data;

  const formData = new FormData();
  formData.append("reporterName", validPayload.reporterName);
  formData.append("reporterEmail", validPayload.reporterEmail);

  if (validPayload.reportedInstitution) {
    formData.append("reportedInstitution", validPayload.reportedInstitution);
  }

  if (validPayload.reportDescription) {
    formData.append("reportDescription", validPayload.reportDescription);
  }

  if (validPayload.reportContent) {
    formData.append("reportContent", JSON.stringify(validPayload.reportContent));
  }

  if (validPayload.institutionName) {
    formData.append("institutionName", validPayload.institutionName);
  }

  if (validPayload.institutionId) {
    formData.append("institutionId", validPayload.institutionId);
  }

  if (validPayload.numerRspo) {
    formData.append("numerRspo", validPayload.numerRspo);
  }

  if (validPayload.reportReason) {
    formData.append("reportReason", validPayload.reportReason);
  }

  formData.append("pdf", validPayload.pdf);

  const headers: HeadersInit = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const apiUrl = `${baseUrl}/reports`;

  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("[createReport] Attempting to connect to:", apiUrl);
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const errorMessage =
        typeof errorBody?.message === "string"
          ? errorBody.message
          : Array.isArray(errorBody?.message)
            ? errorBody.message.join(", ")
            : `Failed to submit the report (${response.status} ${response.statusText})`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    const parsed = createReportResponseSchema.safeParse(responseData);

    if (!parsed.success) {
      throw new Error("Unexpected response from the reports API");
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      const errorMessage = `Unable to connect to the API at ${apiUrl}.`;

      if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
        console.error("[createReport] Connection failed:", {
          apiUrl,
          baseUrl,
          error: error instanceof Error ? error.message : String(error),
          envVar: process.env.NEXT_PUBLIC_API_BASE_URL,
        });
      }

      throw new Error(errorMessage);
    }

    throw error;
  }
};

export const assignReportToSelf = async (reportId: string, accessToken: string): Promise<void> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const apiUrl = `${baseUrl}/reports/${reportId}/assign`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to assign report (${response.status} ${response.statusText})`;
    throw new Error(errorMessage);
  }
};

export const unassignReportFromSelf = async (
  reportId: string,
  accessToken: string
): Promise<void> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const apiUrl = `${baseUrl}/reports/${reportId}/assign`;

  const response = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : `Failed to unassign report (${response.status} ${response.statusText})`;
    throw new Error(errorMessage);
  }
};

export const updateReportReview = async (
  reportId: string,
  payload: UpdateReportReviewPayload,
  accessToken: string
): Promise<void> => {
  const parsed = updateReportReviewPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("Invalid report review payload");
  }
  const validPayload = parsed.data;

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
        findings: validPayload.findings,
        comparisonNotes: validPayload.comparisonNotes,
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
