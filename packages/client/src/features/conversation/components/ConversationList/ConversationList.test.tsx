import React from "react";
import { renderWithStore, InitialStore } from "core/test";
import ConversationList, { ConversationListProps } from "./ConversationList";
import { OrderedMap } from "immutable";
import {
  loadConversationList,
  unloadConversationList,
  sampleConversationList,
} from "@purple-messenger/core";
import { act } from "@testing-library/react";

jest.mock("../ConversationRow");

const sharedProps: ConversationListProps = {
  username: undefined,
};

const initialStore: InitialStore = {
  conversation: {
    list: OrderedMap(
      sampleConversationList.map((conversation) => [
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
        username={sampleConversationList[0].friend.username}
      />,
      initialStore
    );
    expect(getByTestId("mock-conversation-row-selected")).toBeInTheDocument();
  });

  it("Should dispatch loadConversationList and unloadConversationList actions properly", () => {
    const { unmount, store } = renderWithStore(
      <ConversationList {...sharedProps} />,
      initialStore
    );
    expect(store.actions).toContainEqual(loadConversationList());
    act(() => {
      unmount();
    });
    expect(store.actions).toContainEqual(unloadConversationList());
  });
});
