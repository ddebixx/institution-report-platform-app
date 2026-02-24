import { render, screen } from "@testing-library/react";

import { Label } from "./label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label htmlFor="input-id">Name</Label>);

    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
