import { useCallback, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import type {
  ReportFormValues,
  StepId,
  UseReportFormOptions,
  UseReportFormReturn,
} from "@/types/reports";
import type { UniversalSearchOption } from "@/components/universal-search/universal-search";
import { DEFAULT_REPORT_FORM_VALUES } from "@/consts/reports";
import { createReportFormSchema } from "@/lib/schemas/report-form";
import { buildReportPayload } from "@/lib/reports";
import { useCreateReportMutation } from "@/hooks/use-create-report-mutation";
import { validateFirstStepAndSyncReporterFields } from "@/hooks/use-report-form/helpers";

export function useReportForm({
  accessToken,
  onSuccess,
}: UseReportFormOptions): UseReportFormReturn {
  const t = useTranslations("reportModal");
  const [activeStep, setActiveStep] = useState<StepId>(1);

  const createReportMutation = useCreateReportMutation({
    accessToken,
    onSuccess,
  });

  const reportFormSchema = useMemo(() => createReportFormSchema(t), [t]);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: DEFAULT_REPORT_FORM_VALUES,
    mode: "onChange",
  });

  const { setValue, setError, watch, trigger, handleSubmit, reset } = form;

  const pdfFile = watch("pdf");
  const isSubmitting = createReportMutation.isPending;

  const handleInstitutionSelect = useCallback(
    (option: UniversalSearchOption) => {
      setValue("institutionName", option.title, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue("reportedInstitution", option.title, { shouldDirty: true });

      const rspoNumber = option.meta || option.id;
      if (rspoNumber) {
        setValue("numerRspo", rspoNumber, { shouldDirty: true });
        setValue("institutionId", rspoNumber, { shouldDirty: true });
      }
    },
    [setValue]
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      setValue("pdf", file, { shouldDirty: true, shouldValidate: activeStep === 2 });
    },
    [activeStep, setValue]
  );

  const handleFindingsChange = useCallback(
    (findings: ReportFormValues["reportContent"]["findings"]) => {
      setValue("reportContent.findings", findings, { shouldDirty: true });
    },
    [setValue]
  );

  const handleComparisonNotesChange = useCallback(
    (value: string) => {
      setValue("reportContent.comparisonNotes", value, { shouldDirty: true });
    },
    [setValue]
  );

  const submitReport = useCallback(
    async (values: ReportFormValues) => {
      if (!values.pdf) {
        setError("pdf", { type: "manual", message: t("errors.pdfRequired") });
        setActiveStep(2);
        toast.error(t("errors.pdfRequired"));
        return;
      }

      const payload = buildReportPayload(values);
      await createReportMutation.mutateAsync(payload);
    },
    [createReportMutation, setError, t]
  );

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (activeStep === 1) {
        const isStepValid = await validateFirstStepAndSyncReporterFields({
          event,
          form,
          setValue,
          trigger,
        });

        if (!isStepValid) {
          return;
        }

        setActiveStep(2);

        return;
      }

      await handleSubmit(submitReport)(event);
    },
    [activeStep, form, handleSubmit, submitReport, trigger, setValue]
  );

  const handleClose = useCallback(() => {
    reset(DEFAULT_REPORT_FORM_VALUES);
    setActiveStep(1);
  }, [reset]);

  const primaryActionLabel = useMemo(() => {
    if (activeStep === 1) {
      return t("actions.continue");
    }

    return t("actions.submit");
  }, [activeStep, t]);

  const isPrimaryDisabled = useMemo(
    () => isSubmitting || (activeStep === 2 && !pdfFile),
    [activeStep, isSubmitting, pdfFile]
  );

  const modalPanelClassName = useMemo(
    () => (activeStep === 2 ? "max-w-[1200px]" : "max-w-xl"),
    [activeStep]
  );

  return {
    form,
    activeStep,
    setActiveStep,
    handleInstitutionSelect,
    handleFileChange,
    handleFindingsChange,
    handleComparisonNotesChange,
    handleFormSubmit,
    handleClose,
    primaryActionLabel,
    isPrimaryDisabled,
    modalPanelClassName,
  };
}
