import { clientEnv } from "@/lib/env";

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
      errorBody?.message ?? `Failed to assign report (${response.status} ${response.statusText})`;

    throw new Error(errorMessage);
  }
};
