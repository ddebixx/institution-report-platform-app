import { render, screen, fireEvent } from "@testing-library/react";

import { FeatureCard } from "./feature-card";
import type { LucideIcon } from "lucide-react";

const TestIcon = () => <svg data-testid="icon" data-slot="icon" />;

describe("FeatureCard", () => {
  it("renders icon, title and description", () => {
    render(
      <FeatureCard
        icon={TestIcon as unknown as LucideIcon}
        title="Title"
        description="Description"
      />
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("reacts to hover state", () => {
    const { container } = render(
      <FeatureCard icon={TestIcon as unknown as LucideIcon} title="Hover" description="Test" />
    );

    const card = container.querySelector("article");
    expect(card).toBeInTheDocument();

    if (!card) return;

    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
  });
});
