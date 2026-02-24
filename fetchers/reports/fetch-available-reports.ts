import { clientEnv } from "@/lib/env";
import {
  moderatorReportsResponseSchema,
  type ModeratorReport,
} from "@/lib/schemas/reports";

export const fetchAvailableReports = async (
  accessToken: string
): Promise<ModeratorReport[]> => {
  const baseUrl = clientEnv.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const apiUrl = `${baseUrl}/reports/available`;

  const response = await fetch(apiUrl, {
    method: "GET",
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
          : `Failed to fetch available reports (${response.status} ${response.statusText})`;
    throw new Error(errorMessage);
  }

  const responseData = await response.json();
  const parsed = moderatorReportsResponseSchema.safeParse(responseData);

  if (!parsed.success) {
    throw new Error("Unexpected response from the reports API");
  }

  return parsed.data;
};
