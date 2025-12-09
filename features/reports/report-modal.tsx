"use client"

import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react"
import { toast } from "sonner"
import { UploadIcon } from "lucide-react"

import { useAuthContext } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import {
  createReport,
  type CreateReportPayload,
} from "@/fetchers/reports"

type ReportModalProps = {
  open: boolean
  onClose: () => void
}

const initialFormState: Omit<CreateReportPayload, "pdf"> & {
  pdf: File | null
} = {
  reporterName: "",
  reporterEmail: "",
  reportedInstitution: "",
  reportDescription: "",
  reportContent: undefined,
  institutionName: "",
  institutionId: "",
  numerRspo: "",
  reportReason: "",
  pdf: null,
}

export const ReportModal = ({ open, onClose }: ReportModalProps) => {
  const { accessToken, user } = useAuthContext()
  const [formState, setFormState] = useState<typeof initialFormState>(
    initialFormState
  )
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const isAuthenticated = useMemo(() => Boolean(accessToken), [accessToken])

  const handleClose = useCallback(() => {
    setFormState(initialFormState)
    onClose()
  }, [onClose])

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setFormState((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null
      setFormState((prev) => ({ ...prev, pdf: file }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!accessToken) {
        toast.error("Please login before submitting a report.")
        return
      }

      if (!formState.pdf) {
        toast.error("A PDF file is required.")
        return
      }

      setIsSubmitting(true)
      try {
        const payload: CreateReportPayload = {
          reporterName: formState.reporterName,
          reporterEmail: formState.reporterEmail,
          reportedInstitution: formState.reportedInstitution || undefined,
          reportDescription: formState.reportDescription || undefined,
          reportContent: formState.reportContent,
          institutionName: formState.institutionName || undefined,
          institutionId: formState.institutionId || undefined,
          numerRspo: formState.numerRspo || undefined,
          reportReason: formState.reportReason || undefined,
          pdf: formState.pdf,
        }

        const result = await createReport(payload, accessToken)

        toast.success("Report submitted", {
          description: `Report ID: ${result.reportId}`,
        })
        handleClose()
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to submit report"
        toast.error(message)
      } finally {
        setIsSubmitting(false)
      }
    },
    [accessToken, formState, handleClose]
  )

  return (
    <Modal
      open={open}
      title="Submit a report"
      description={
        isAuthenticated
          ? "Provide your details and upload the PDF evidence."
          : "Login is required before you can submit a report."
      }
      onClose={handleClose}
      footer={
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {user?.email
              ? `Authenticated as ${user.email}`
              : "Please log in to enable submission"}
          </span>
          <span>PDF only, max 10MB recommended</span>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel>Reporter name</FieldLabel>
            <FieldContent>
              <Input
                name="reporterName"
                value={formState.reporterName}
                onChange={handleInputChange}
                required
                placeholder="Jane Doe"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Reporter email</FieldLabel>
            <FieldContent>
              <Input
                type="email"
                name="reporterEmail"
                value={formState.reporterEmail}
                onChange={handleInputChange}
                required
                placeholder="jane.doe@example.com"
              />
            </FieldContent>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel>Institution name</FieldLabel>
            <FieldContent>
              <Input
                name="institutionName"
                value={formState.institutionName}
                onChange={handleInputChange}
                placeholder="Springfield University"
              />
            </FieldContent>
            <FieldDescription>
              Optional: Add the institution display name.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Institution ID / Numer RSPO</FieldLabel>
            <FieldContent>
              <Input
                name="numerRspo"
                value={formState.numerRspo}
                onChange={handleInputChange}
                placeholder="123456"
              />
            </FieldContent>
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel>Report description</FieldLabel>
          <FieldContent>
            <Textarea
              name="reportDescription"
              value={formState.reportDescription}
              onChange={handleInputChange}
              placeholder="Provide a short summary of the issue."
              rows={4}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Upload PDF</FieldLabel>
          <FieldContent>
            <label
              className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-input px-3 py-3 text-sm shadow-xs transition hover:border-ring"
              htmlFor="pdfUpload"
            >
              <div className="flex flex-col">
                <span className="font-medium text-foreground">
                  {formState.pdf?.name ?? "Choose a PDF file"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Only PDF files are accepted.
                </span>
              </div>
              <UploadIcon className="size-4 text-muted-foreground" />
            </label>
            <input
              id="pdfUpload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </FieldContent>
        </Field>

        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={isSubmitting || !isAuthenticated}
        >
          {isAuthenticated ? "Submit report" : "Login required"}
        </Button>
      </form>
    </Modal>
  )
}

