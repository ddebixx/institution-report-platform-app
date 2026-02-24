import { render, screen } from "@testing-library/react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";

describe("Table primitives", () => {
  it("renders table with header, body and caption", () => {
    render(
      <Table>
        <TableCaption>Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Caption")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Cell")).toBeInTheDocument();
  });
});
