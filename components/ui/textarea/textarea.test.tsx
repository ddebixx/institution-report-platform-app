import { render, screen } from "@testing-library/react";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders textarea with data-slot", () => {
    render(<Textarea placeholder="Write here" />);

    const textarea = screen.getByPlaceholderText("Write here");

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("data-slot", "textarea");
  });
});
