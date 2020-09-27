import React from "react";
import { OrderedMap } from "immutable";
import { renderWithStore, InitialStore } from "core/test";
import { sampleMessageList } from "@purple-messenger/core";
import { clearMessageList } from "@purple-messenger/core";
import MessageList from "./MessageList";

jest.mock("../MessageRow");

const initStore: InitialStore = {
  message: {
    lastMessageId: -1,
    list: OrderedMap(sampleMessageList.map((message) => [message.id, message])),
  },
};

describe("The <MessageList /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = renderWithStore(
      <MessageList username="john" />,
      initStore
    );
    expect(container).toMatchSnapshot();
  });

  it("Should call clearMessageList when the username prop is changed", () => {
    const { rerender, store } = renderWithStore(
      <MessageList username="john" />,
      initStore
    );

    expect(store.actions).toContainEqual(clearMessageList());

    store.clearActions();
    rerender(<MessageList username="sara" />);

    expect(store.actions).toContainEqual(clearMessageList());
  });
});
