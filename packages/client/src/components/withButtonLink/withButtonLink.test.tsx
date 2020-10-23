import React from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import withButtonLink from "./withButtonLink";

jest.mock("react-router-dom");

const TestComponent = jest.fn(() => <span data-testid="mock-test" />);

describe("The withButtonLink tests", () => {
  it("Should pass component and to props correctly", () => {
    const Button = withButtonLink(TestComponent);
    const link = "/sample-route";
    const children = "Click me";
    render(<Button to={link}>{children}</Button>);
    expect(TestComponent).toHaveBeenCalledWith(
      { children: children, component: Link, to: link },
      expect.anything()
    );
  });

  it("Should not pass component and to props if the to prop is not passed", () => {
    const Button = withButtonLink(TestComponent);
    const children = "Click me";
    render(<Button>{children}</Button>);
    expect(TestComponent).toHaveBeenCalledWith(
      { children: children },
      expect.anything()
    );
  });
});
