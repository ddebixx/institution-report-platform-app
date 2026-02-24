import { render, screen, fireEvent } from "@testing-library/react";

import { InteractiveStepper } from "./interactive-stepper";

describe("InteractiveStepper", () => {
  const steps = [
    { number: 1, title: "Step 1", description: "First" },
    { number: 2, title: "Step 2", description: "Second" },
  ];

  it("renders current step information", () => {
    render(<InteractiveStepper steps={steps} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
  });

  it("navigates between steps", () => {
    render(<InteractiveStepper steps={steps} />);

    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });
});
