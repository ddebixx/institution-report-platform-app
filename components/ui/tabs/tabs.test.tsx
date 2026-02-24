import { render, screen, fireEvent } from "@testing-library/react";

import { Tabs } from "./tabs";

describe("Tabs", () => {
  const tabs = [
    { id: "one", label: "One", content: <p>Tab One</p> },
    { id: "two", label: "Two", content: <p>Tab Two</p> },
  ];

  it("renders tab labels and default content", () => {
    render(<Tabs tabs={tabs} defaultTab="one" />);

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByText("Tab One")).toBeInTheDocument();
  });

  it("changes active tab on click", () => {
    render(<Tabs tabs={tabs} defaultTab="one" />);

    fireEvent.click(screen.getByText("Two"));

    expect(screen.getByText("Tab Two")).toBeInTheDocument();
  });
});
