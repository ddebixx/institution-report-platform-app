import { clientEnv } from "@/lib/env";
import {
  createReportPayloadSchema,
  createReportResponseSchema,
  type CreateReportPayload,
  type CreateReportResponse,
} from "@/lib/schemas/reports";

const optionalFields: Array<[keyof CreateReportPayload, string]> = [
  ["reportedInstitution", "reportedInstitution"],
  ["reportDescription", "reportDescription"],
  ["institutionName", "institutionName"],
  ["institutionId", "institutionId"],
  ["numerRspo", "numerRspo"],
  ["reportReason", "reportReason"],
];

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
  formData.append("pdf", validPayload.pdf);

  for (const [key, formKey] of optionalFields) {
    const value = validPayload[key];

    if (typeof value === "string" && value.length > 0) {
      formData.append(formKey, value);
    }
  }

  if (validPayload.reportContent) {
    formData.append("reportContent", JSON.stringify(validPayload.reportContent));
  }

  const headers: HeadersInit = {};

  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  headers["Content-Type"] = "multipart/form-data";

  const response = await fetch(`${clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")}/reports`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage =
      errorBody?.message ??
      `Failed to submit the report (${response.status} ${response.statusText})`;
    throw new Error(errorMessage);
  }

  return createReportResponseSchema.parse(await response.json());
};
