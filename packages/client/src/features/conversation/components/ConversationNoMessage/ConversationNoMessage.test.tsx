import React from "react";
import { render } from "@testing-library/react";
import ConversationNoMessage from "./ConversationNoMessage";

describe("The <ConversationNoMessage /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<ConversationNoMessage />);
    expect(container).toMatchSnapshot();
  });
});
