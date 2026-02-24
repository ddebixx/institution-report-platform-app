import { render, screen } from "@testing-library/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
  it("renders trigger and menu item without crashing", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });
});
