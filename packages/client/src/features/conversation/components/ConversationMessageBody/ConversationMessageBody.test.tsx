import React from "react";
import { render } from "@testing-library/react";
import ConversationMessageBody, {
  ConversationMessageBodyProps,
} from "./ConversationMessageBody";

const sharedProps: ConversationMessageBodyProps = {
  children: "the message body",
};

describe("The <ConversationMessageBody /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<ConversationMessageBody {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });
});
