import React from "react";
import { OrderedMap } from "immutable";
import { renderWithStore, InitialStore } from "core/test";
import { Message, MessageOwner, MessageStatus } from "@purple-messenger/core";
import { clearMessageList } from "@purple-messenger/core";
import MessageList from "./MessageList";

jest.mock("../MessageRow");

const messages: Message[] = [
  {
    id: 1,
    body: "496 Veic Lane 1662 Ezeler Manor",
    owner: MessageOwner.Friend,
    sentAt: new Date(),
    status: MessageStatus.Pending,
  },
  {
    id: 2,
    body: "496 Veic Lane 1662 Ezeler Manor",
    owner: MessageOwner.Me,
    sentAt: new Date(),
    status: MessageStatus.Received,
  },
  {
    id: 3,
    body: "496 Veic Lane 1662 Ezeler Manor",
    owner: MessageOwner.Me,
    sentAt: new Date(),
    status: MessageStatus.Sent,
  },
];

const initStore: InitialStore = {
  message: {
    lastMessageId: -1,
    list: OrderedMap(messages.map((message) => [message.id, message])),
  },
};

describe("The <MessageList /> tests", () => {
  afterEach(() => jest.clearAllMocks());

  it("Should match the snapshot", () => {
    const { container } = renderWithStore(
      <MessageList username="john" />,
      initStore
    );
    expect(container).toMatchSnapshot();
  });

  it("Should call clearMessageList when the username prop is changed", () => {
    const { rerender } = renderWithStore(
      <MessageList username="john" />,
      initStore
    );
    expect(clearMessageList).toHaveBeenCalledTimes(1);

    rerender(<MessageList username="sara" />);

    expect(clearMessageList).toHaveBeenCalledTimes(2);
  });
});
