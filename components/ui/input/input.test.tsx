import { render, screen } from "@testing-library/react";

import { Input } from "./input";

describe("Input", () => {
  it("renders an input with data-slot", () => {
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText("Type here");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("supports type and other native props", () => {
    render(<Input type="email" defaultValue="test@example.com" />);

    const input = screen.getByDisplayValue("test@example.com");

    expect(input).toHaveAttribute("type", "email");
  });
});
