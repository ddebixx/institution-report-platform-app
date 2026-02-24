import { render, screen } from "@testing-library/react";

import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "./empty";

describe("Empty primitives", () => {
  it("renders basic empty layout", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Title</EmptyTitle>
          <EmptyDescription>Description</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Content</EmptyContent>
        <EmptyMedia>Icon</EmptyMedia>
      </Empty>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });
});
