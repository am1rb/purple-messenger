import React from "react";
import { render } from "@testing-library/react";
import MessageIsTyping from "./MessageIsTyping";

describe("The <MessageIsTyping /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<MessageIsTyping />);
    expect(container).toMatchSnapshot();
  });
});
