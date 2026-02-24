import { render, screen } from "@testing-library/react";

import {
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldSeparator,
  FieldError,
  FieldTitle,
} from "./field";

describe("Field primitives", () => {
  it("renders basic field structure", () => {
    render(
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <Field orientation="vertical">
          <FieldLabel>Label</FieldLabel>
          <FieldContent>
            <FieldDescription>Description</FieldDescription>
          </FieldContent>
        </Field>
      </FieldSet>
    );

    expect(screen.getByText("Legend")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders separator with content", () => {
    render(
      <FieldGroup>
        <FieldSeparator>Or</FieldSeparator>
      </FieldGroup>
    );

    expect(screen.getByText("Or")).toBeInTheDocument();
  });

  it("renders error messages from errors prop", () => {
    render(<FieldError errors={[{ message: "First error" }, { message: "Second error" }]} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("First error")).toBeInTheDocument();
    expect(screen.getByText("Second error")).toBeInTheDocument();
  });

  it("renders FieldTitle content", () => {
    render(<FieldTitle>Title</FieldTitle>);

    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
