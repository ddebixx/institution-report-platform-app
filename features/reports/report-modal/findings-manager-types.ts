import type { RegulationReference, ReportFinding } from "@/types/reports";

export type PendingFinding = {
  detail: string;
  pageReference: string;
  regulationId: string;
};

export type FindingRowProps = {
  finding: ReportFinding;
  regulationLookup: Record<string, RegulationReference>;
  onRemove: (id: string) => void;
  pageLabel: (params: { page: string }) => string;
  regulationLabel: (params: { regulation: string }) => string;
  removeLabel: string;
};
