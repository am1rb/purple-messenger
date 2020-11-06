import React from "react";
import { render } from "@testing-library/react";
import PageRouter from "./PageRouter";

describe("PageRouter Component Tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<PageRouter />);
    expect(container).toMatchSnapshot();
  });
});
