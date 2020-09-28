import { InitialStore } from "core/test";
import { getConversationList, getConversationMap } from "./selectors";
import { State } from "core/redux/reducers";
import { OrderedMap } from "immutable";
import { sampleConversationList } from "@purple-messenger/core";

const sharedState: InitialStore = {
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
