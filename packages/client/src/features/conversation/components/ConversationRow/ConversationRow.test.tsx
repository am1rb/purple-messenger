import React from "react";
import { render } from "@testing-library/react";
import {
  AccountStatus,
  MessageOwner,
  MessageStatus,
} from "@purple-messenger/core";
import ConversationRow, { ConversationRowProps } from ".";

jest.mock("features/message/components/MessageStatus");
jest.mock("features/message/components/MessageSentAt");
jest.mock("components/CardActionArea");
jest.mock("features/message/components/MessageIsTyping");
jest.mock("../ConversationNoMessage");

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
          owner: MessageOwner.Me,
          sentAt: new Date(),
          status: MessageStatus.Seen,
          unreadCount: 1,
        }}
      />
    );
    expect(getByTestId("message-status")).toBeInTheDocument();
    expect(getByTestId("message-sent-at")).toBeInTheDocument();
  });
});
