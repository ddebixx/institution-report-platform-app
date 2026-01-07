import type { ReportFormValues } from "@/types/reports"

export const REFERENCE_REGULATION_URL =
  "https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20170000059/U/D20170059Lj.pdf"

export const MIN_SCHOOL_SEARCH_CHARACTERS = 5

export const VIEWER_HEIGHT_CLASS = "h-[65vh] min-h-[360px]"

export const DEFAULT_REPORT_FORM_VALUES: ReportFormValues = {
  reporterName: "",
  reporterEmail: "",
  reportedInstitution: "",
  reportDescription: "",
  reportContent: {
    findings: [],
    comparisonNotes: "",
  },
  institutionName: "",
  institutionId: "",
  numerRspo: "",
  reportReason: "",
  pdf: null,
}

