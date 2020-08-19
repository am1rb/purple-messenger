import React from "react";
import { renderWithStore, InitialStore } from "core/test";
import ConversationList, { ConversationListProps } from "./ConversationList";
import { OrderedMap } from "immutable";
import { Conversation, AccountStatus } from "@purple-messenger/core";

jest.mock("@material-ui/core");
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
  selectedUsername: undefined,
};

describe("The <ConversationList /> tests", () => {
  it("Should render rows properly", () => {
    const store: InitialStore = {
      conversation: {
        list: OrderedMap(
          conversations.map((conversation) => [
            conversation.friend.username,
            conversation,
          ])
        ),
      },
    };
    const { container } = renderWithStore(
      <ConversationList {...sharedProps} />,
      store
    );
    expect(container).toMatchSnapshot();
  });
});
