"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type Step = {
  number: number
  title: string
  description: string
}

type InteractiveStepperProps = {
  steps: Step[]
  className?: string
}

export const InteractiveStepper = ({ steps, className }: InteractiveStepperProps) => {
  const [activeStep, setActiveStep] = useState(0)

  function handleNextStep() {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  function handlePreviousStep() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  function handleStepClick(index: number) {
    setActiveStep(index)
  }

  return (
    <div className={twMerge("space-y-6 w-full", className)}>
      <div className="flex items-center justify-between gap-2 w-full">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center w-full">
            <button
              onClick={() => handleStepClick(index)}
              className={twMerge(
                "group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110",
                index === activeStep &&
                  "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                index < activeStep &&
                  "border-primary bg-primary text-primary-foreground",
                index > activeStep &&
                  "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
              aria-label={`Go to ${step.title}`}
            >
              {index < activeStep ? (
                <CheckIcon className="size-5" />
              ) : (
                <span className="text-sm font-semibold">{step.number}</span>
              )}
              
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {step.title}
              </div>
            </button>

            {index < steps.length - 1 && (
              <div
                className={twMerge(
                  "mx-2 h-0.5 flex-1 transition-all duration-500",
                  index < activeStep ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[200px] rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={twMerge(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300",
                "animate-in fade-in-0 zoom-in-75 slide-in-from-left-4"
              )}
            >
              <span className="text-xl font-bold">{steps[activeStep].number}</span>
            </div>
            <h3
              className={twMerge(
                "text-2xl font-semibold text-foreground transition-all duration-300",
                "animate-in fade-in-0 slide-in-from-right-4"
              )}
            >
              {steps[activeStep].title}
            </h3>
          </div>
          <p
            className={twMerge(
              "ml-15 leading-relaxed text-muted-foreground transition-all duration-300",
              "animate-in fade-in-0 slide-in-from-bottom-4"
            )}
          >
            {steps[activeStep].description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handlePreviousStep}
          disabled={activeStep === 0}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <ChevronLeftIcon className="size-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Step {activeStep + 1} of {steps.length}
        </div>

        <Button
          onClick={handleNextStep}
          disabled={activeStep === steps.length - 1}
          size="lg"
          className="gap-2"
        >
          Next
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}

