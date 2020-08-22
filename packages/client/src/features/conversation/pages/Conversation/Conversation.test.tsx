import React from "react";
import { render } from "@testing-library/react";
import Conversation from "./Conversation";
import useConversationInfo from "features/conversation/components/useConversationInfo";

jest.mock("features/layout/components/Layout");
jest.mock("features/conversation/components/ConversationList");
jest.mock("features/message/components/MessageZone");
jest.mock("features/conversation/components/useConversationInfo");

describe("The <Conversation /> tests", () => {
  it("Should match the snapshot", () => {
    const username = "john";
    (useConversationInfo as jest.Mock).mockReturnValue({ username });
    const { container } = render(<Conversation />);
    expect(container).toMatchSnapshot();
  });
});
