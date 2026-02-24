import { render, screen } from "@testing-library/react";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select";

describe("Select", () => {
  it("renders trigger and items without crashing", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText("Choose")).toBeInTheDocument();
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
