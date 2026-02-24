import { render } from "@testing-library/react";

import { Toaster } from "./sonner";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

describe("Toaster", () => {
  it("renders without crashing", () => {
    const { container } = render(<Toaster />);

    expect(container.firstChild).toBeTruthy();
  });
});
