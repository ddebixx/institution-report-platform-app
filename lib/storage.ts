import { supabaseClient } from "./supabase-client"

export const getPdfUrl = (pdfPath: string | undefined | null): string | null => {
  if (!pdfPath) {
    return null
  }

  const { data } = supabaseClient.storage.from("report-files").getPublicUrl(pdfPath)

  return data.publicUrl
}