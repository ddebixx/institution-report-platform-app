import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );

    const button = screen.getByRole("button", { name: "Delete" });

    expect(button.className).toContain("bg-destructive");
    expect(button.className).toContain("h-10");
  });

  it("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Link" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-slot", "button");
  });
});
