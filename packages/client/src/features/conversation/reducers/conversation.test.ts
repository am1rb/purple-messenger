import {
  sampleConversationList,
  setConversationList,
} from "@purple-messenger/core";
import { OrderedMap } from "immutable";
import reducer from "./conversation";

describe("The conversation reducer tests", () => {
  it("Should set the conversation list correctly", () => {
    const store = reducer(
      undefined,
      setConversationList(sampleConversationList)
    );
    expect(store.list.toArray().map((item) => item[1])).toEqual(
      sampleConversationList
    );
  });
  // 'Should call startTypingMessage'
  // 'Should call stopTypingMessage'
  // 'Should call newMessage'
  // 'Should call sendMessage properly'
  // 'Should call sentMessageAck properly'
  // 'Should call receivedMessageAck properly'
  // 'Should call seenMessageAck properly'
});
