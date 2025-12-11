export type RegulationReference = {
  id: string
  title: string
  description: string
}

export type ReportFinding = {
  id: string
  detail: string
  regulationId?: string
  pageReference?: string
}

export type StepId = 1 | 2

export type ReportFormValues = {
  reporterName: string
  reporterEmail: string
  reportedInstitution?: string
  reportDescription?: string
  institutionName?: string
  institutionId?: string
  numerRspo?: string
  reportReason?: string
  pdf: File | null
  reportContent: {
    findings: ReportFinding[]
    comparisonNotes: string
  }
}

export type ReportModalProps = {
  open: boolean
  onClose: () => void
}

export type ReportDocumentCompareProps = {
  file: File | null
  regulations: RegulationReference[]
  findings: ReportFinding[]
  comparisonNotes: string
  fileError?: string
  referencePdfUrl: string
  onFileChange: (file: File | null) => void
  onFindingsChange: (findings: ReportFinding[]) => void
  onComparisonNotesChange: (value: string) => void
}

