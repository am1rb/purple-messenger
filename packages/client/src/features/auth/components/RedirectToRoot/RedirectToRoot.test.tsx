import React from "react";
import { render } from "@testing-library/react";
import RedirectToRoot from "./RedirectToRoot";

describe("The <RedirectToRoot /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<RedirectToRoot />);
    expect(container).toMatchSnapshot();
  });
});
