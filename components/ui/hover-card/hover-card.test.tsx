import { render, screen } from "@testing-library/react";

import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";

describe("HoverCard", () => {
  it("renders trigger and content without crashing", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Trigger</HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    );

    expect(screen.getByText("Trigger")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
