import { InitialStore } from "core/test";
import {
  getCurrentConversationUsername,
  getConversationList,
  getConversationMap,
} from "./selectors";
import { State } from "core/redux/reducers";
import { OrderedMap } from "immutable";
import { sampleConversationList } from "@purple-messenger/core";

jest.unmock("react-router-dom");

const sharedState: InitialStore = {
  router: {
    location: {
      pathname: "/conversation/@john",
      search: "",
      state: "",
      hash: "rui3nm",
    },
    action: "POP",
  },
  conversation: {
    list: OrderedMap(
      sampleConversationList.map((conversation) => [
        conversation.friend.username,
        conversation,
      ])
    ),
  },
};

describe("The conversation selectors tests", () => {
  it("Should return the username correctly", () => {
    expect(getCurrentConversationUsername(sharedState as State)).toBe("john");
  });

  it("Should return conversation map correctly", () => {
    expect(getConversationMap(sharedState as State)).toBe(
      sharedState.conversation?.list
    );
  });

  it("Should return conversation list correctly", () => {
    expect(getConversationList(sharedState as State)).toEqual(
      sampleConversationList
    );
  });
});
