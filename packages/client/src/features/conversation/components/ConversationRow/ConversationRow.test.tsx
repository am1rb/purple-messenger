import React from "react";
import { render } from "@testing-library/react";
import { AccountStatus, Owner, MessageStatus } from "@purple-messenger/core";
import ConversationRow, { ConversationRowProps } from "./ConversationRow";

jest.mock("features/message/components/MessageStatus");
jest.mock("features/message/components/MessageSentAt");
jest.mock("components/CardActionArea");
jest.mock("features/message/components/MessageIsTyping");
jest.mock("../ConversationNoMessage");
jest.mock("../ConversationMessageBody");

const sharedProps: ConversationRowProps = {
  selected: true,
  id: 1,
  isTyping: true,
  friend: {
    id: 1,
    username: "user1",
    bio: "lumuiwuamielgiwonorrapkufpicagfevusevagivcistopkag",
    email: "jubsinbam@lej.uk",
    firstName: "Lydia",
    lastName: "Guzman",
    image: "",
    status: AccountStatus.Online,
  },
};

describe("The <ConversationRow /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<ConversationRow {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should render the sent at and status if a message object is passed", () => {
    const { getByTestId } = render(
      <ConversationRow
        {...sharedProps}
        message={{
          id: 1,
          body: "This is the message body",
          owner: Owner.Me,
          sentAt: new Date(),
          status: MessageStatus.Seen,
          unreadCount: 1,
        }}
      />
    );
    expect(getByTestId("mock-message-status")).toBeInTheDocument();
    expect(getByTestId("mock-message-sent-at")).toBeInTheDocument();
  });

  it("Should render <MessageIsTyping /> component properly", () => {
    const { getByTestId } = render(
      <ConversationRow
        {...sharedProps}
        isTyping
        message={{
          id: 1,
          body: "This is the message body",
          owner: Owner.Me,
          sentAt: new Date(),
          status: MessageStatus.Seen,
          unreadCount: 1,
        }}
      />
    );
    expect(getByTestId("mock-message-is-typing")).toBeInTheDocument();
  });

  it("Should render <ConversationNoMessage /> component properly", () => {
    const { getByTestId } = render(
      <ConversationRow
        {...sharedProps}
        isTyping={false}
        message={{
          id: 1,
          body: "",
          owner: Owner.Me,
          sentAt: new Date(),
          status: MessageStatus.Seen,
          unreadCount: 1,
        }}
      />
    );
    expect(getByTestId("mock-conversation-no-message")).toBeInTheDocument();
  });

  it("Should render the message body if it is not in typing mode and has a message body", () => {
    const messageBody = "This is sample message body";
    const { getByTestId } = render(
      <ConversationRow
        {...sharedProps}
        isTyping={false}
        message={{
          id: 1,
          body: messageBody,
          owner: Owner.Me,
          sentAt: new Date(),
          status: MessageStatus.Seen,
          unreadCount: 1,
        }}
      />
    );
    expect(getByTestId("mock-conversation-message-body")).toBeInTheDocument();
  });
});
