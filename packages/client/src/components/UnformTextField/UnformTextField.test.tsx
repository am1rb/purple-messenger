import { render } from "@testing-library/react";
import React from "react";
import UnformTextField from "./UnformTextField";

describe("UnformTextField Component Tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<UnformTextField name="myField" />);
    expect(container).toMatchSnapshot();
  });
});
