import { render } from "@testing-library/react";

import { Separator } from "./separator";

describe("Separator", () => {
  it("renders horizontal separator by default", () => {
    const { container } = render(<Separator />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("supports vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
