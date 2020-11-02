import React from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import withButtonLink from "./withButtonLink";

const TestComponent = jest.fn();

describe("The withButtonLink tests", () => {
  beforeEach(() => {
    TestComponent.mockImplementation(() => <span data-testid="mock-test" />);
  });

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
