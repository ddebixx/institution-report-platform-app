import type { ReportFormValues } from "@/types/reports";
import type { UseFormReturn } from "react-hook-form";

type StepOneSubmitContext = {
  event: React.FormEvent<HTMLFormElement>;
  form: UseFormReturn<ReportFormValues>;
  setValue: UseFormReturn<ReportFormValues>["setValue"];
  trigger: UseFormReturn<ReportFormValues>["trigger"];
};

export const validateFirstStepAndSyncReporterFields = async ({
  event,
  form,
  setValue,
  trigger,
}: StepOneSubmitContext): Promise<boolean> => {
  const formValues = form.getValues();

  const formElement = event.currentTarget;
  const allInputs = formElement.querySelectorAll<HTMLInputElement>("input");

  const nameInput = Array.from(allInputs).find(
    (input) =>
      input.name === "reporterName" ||
      input.getAttribute("name") === "reporterName" ||
      input.placeholder?.toLowerCase().includes("name")
  );

  const emailInput = Array.from(allInputs).find(
    (input) =>
      input.name === "reporterEmail" ||
      input.getAttribute("name") === "reporterEmail" ||
      input.type === "email"
  );

  if (nameInput?.value && !formValues.reporterName) {
    setValue("reporterName", nameInput.value, { shouldValidate: true });
  }

  if (emailInput?.value && !formValues.reporterEmail) {
    setValue("reporterEmail", emailInput.value, { shouldValidate: true });
  }

  const isStepValid = await trigger(["reporterName", "reporterEmail", "institutionName"]);

  return isStepValid;
};
