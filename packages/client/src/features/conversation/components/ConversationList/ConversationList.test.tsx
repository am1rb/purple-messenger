import React from "react";
import { renderWithStore, InitialStore } from "core/test";
import ConversationList, { ConversationListProps } from "./ConversationList";
import { OrderedMap } from "immutable";
import {
  Conversation,
  AccountStatus,
  loadConversationList,
  unloadConversationList,
} from "@purple-messenger/core";

jest.mock("../ConversationRow");

const conversations: Conversation[] = [
  {
    id: 1,
    isTyping: false,
    friend: {
      id: 1,
      bio: "759 Ujipa Parkway",
      email: "potpe@ubdop.ml",
      firstName: "Maurice",
      lastName: "Underwood",
      image: "",
      status: AccountStatus.Online,
      username: "potpe",
    },
  },
  {
    id: 2,
    isTyping: true,
    friend: {
      id: 2,
      bio: "1573 Basog Square",
      email: "gizez@odudormar.do",
      firstName: "Alan",
      lastName: "Townsend",
      image: "",
      status: AccountStatus.Online,
      username: "alan",
    },
  },
];

const sharedProps: ConversationListProps = {
  username: undefined,
};

const initialStore: InitialStore = {
  conversation: {
    list: OrderedMap(
      conversations.map((conversation) => [
        conversation.friend.username,
        conversation,
      ])
    ),
  },
};

describe("The <ConversationList /> tests", () => {
  it("Should render rows properly", () => {
    const { container } = renderWithStore(
      <ConversationList {...sharedProps} />,
      initialStore
    );
    expect(container).toMatchSnapshot();
  });

  it("Should not select any conversation", () => {
    const { queryByTestId } = renderWithStore(
      <ConversationList {...sharedProps} />,
      initialStore
    );
    expect(
      queryByTestId("mock-conversation-row-selected")
    ).not.toBeInTheDocument();
  });

  it("Should select the first conversation", () => {
    const { getByTestId } = renderWithStore(
      <ConversationList
        {...sharedProps}
        username={conversations[0].friend.username}
      />,
      initialStore
    );
    expect(getByTestId("mock-conversation-row-selected")).toBeInTheDocument();
  });

  it("Should dispatch loadConversationList and unloadConversationList actions properly", () => {
    const { unmount } = renderWithStore(
      <ConversationList {...sharedProps} />,
      initialStore
    );
    expect(loadConversationList).toHaveBeenCalled();
    unmount();
    expect(unloadConversationList).toHaveBeenCalled();
  });
});
