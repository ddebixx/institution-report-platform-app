import { render, screen, fireEvent } from "@testing-library/react";

import { Accordion } from "./accordion";

describe("Accordion", () => {
  const items = [
    { id: "one", title: "Item One", content: "Content One" },
    { id: "two", title: "Item Two", content: "Content Two" },
  ];

  it("toggles item content on click (single open)", () => {
    render(<Accordion items={items} />);

    const firstHeader = screen.getByText("Item One");
    fireEvent.click(firstHeader);

    expect(screen.getByText("Content One")).toBeInTheDocument();

    fireEvent.click(firstHeader);
    expect(screen.queryByText("Content One")).not.toBeInTheDocument();
  });

  it("allows multiple open items when allowMultiple is true", () => {
    render(<Accordion items={items} allowMultiple />);

    const firstHeader = screen.getByText("Item One");
    const secondHeader = screen.getByText("Item Two");

    fireEvent.click(firstHeader);
    fireEvent.click(secondHeader);

    expect(screen.getByText("Content One")).toBeInTheDocument();
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });
});
