"use client";

import { CheckCircleIcon } from "lucide-react";

import { ComparisonNotesField } from "@/features/reports/report-modal/comparison-notes-field";
import { FindingsManager } from "@/features/reports/report-modal/findings-manager";
import type { RegulationReference } from "@/types/reports";
import type { ReportFinding } from "@/types/reports";

type ReportReviewFormSectionProps = {
  title: string;
  regulations: RegulationReference[];
  findings: ReportFinding[];
  onFindingsChange: (findings: ReportFinding[]) => void;
  comparisonNotes: string;
  onComparisonNotesChange: (value: string) => void;
};

export const ReportReviewFormSection = ({
  title,
  regulations,
  findings,
  onFindingsChange,
  comparisonNotes,
  onComparisonNotesChange,
}: ReportReviewFormSectionProps) => (
  <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
    <div className="flex items-center gap-2">
      <CheckCircleIcon className="size-5 text-primary" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    </div>

    <FindingsManager
      regulations={regulations}
      findings={findings}
      onFindingsChange={onFindingsChange}
    />

    <ComparisonNotesField value={comparisonNotes} onChange={onComparisonNotesChange} />
  </div>
);
