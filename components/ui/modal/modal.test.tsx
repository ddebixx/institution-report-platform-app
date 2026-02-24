import { render, screen, fireEvent } from "@testing-library/react";

import { Modal } from "./modal";

describe("Modal", () => {
  it("returns null when not open", () => {
    const { container } = render(
      <Modal open={false} title="Title">
        Content
      </Modal>
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders title, description and children when open", () => {
    render(
      <Modal open title="Title" description="Description">
        <p>Body</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("calls onClose on Escape key", () => {
    const handleClose = jest.fn();

    render(
      <Modal open title="Title" onClose={handleClose}>
        Content
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const handleClose = jest.fn();

    render(
      <Modal open title="Title" onClose={handleClose}>
        Content
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
