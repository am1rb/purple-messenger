import { OrderedMap } from "immutable";
import { sampleMessageList } from "@purple-messenger/core";
import { InitialStore } from "core/test";
import { State } from "core/redux/reducers";
import {
  getLastMessageId,
  getMessageListMap,
  getMessageList,
} from "./selectors";

jest.unmock("react-router");

const sharedState: InitialStore = {
  message: {
    lastMessageId: -10,
    list: OrderedMap(sampleMessageList.map((message) => [message.id, message])),
  },
};

describe("The message selectors tests", () => {
  it("Should return the last message id properly", () => {
    expect(getLastMessageId(sharedState as State)).toBe(
      sharedState.message?.lastMessageId
    );
  });

  it("Should return the messages map properly", () => {
    expect(getMessageListMap(sharedState as State)).toBe(
      sharedState.message?.list
    );
  });

  it("Should return the messages list properly", () => {
    expect(getMessageList(sharedState as State)).toEqual(sampleMessageList);
  });
});
