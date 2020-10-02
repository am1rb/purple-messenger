import { OrderedMap } from "immutable";
import {
  addMessage,
  decreaseLastMessageId,
  MessageStatus,
  sampleMessageList,
  sentMessageAck,
  sampleMessage4,
  clearMessageList,
  receivedMessageAck,
  seenMessageAck,
  signOut,
} from "@purple-messenger/core";
import reducer, { MessageState, initialState } from "./message";

const sharedStore = {
  lastMessageId: 0,
  list: OrderedMap(sampleMessageList.map((message) => [message.id, message])),
} as MessageState;

describe("The message reducer tests", () => {
  it("Should decrease the message id properly", () => {
    expect(sharedStore.lastMessageId).toBe(0);
    expect(reducer(sharedStore, decreaseLastMessageId()).lastMessageId).toBe(
      -1
    );
  });

  it("Should set the message status to Sent", () => {
    const tempMessageId = sampleMessageList[0].id;
    const messageId = 10;
    expect(
      reducer(
        sharedStore,
        sentMessageAck("john.doe", tempMessageId, messageId)
      ).list.get(messageId)?.status
    ).toBe(MessageStatus.Sent);
  });

  it("Should add a new message correctly", () => {
    expect(
      reducer(sharedStore, addMessage(sampleMessage4)).list.get(
        sampleMessage4.id
      )
    ).toBe(sampleMessage4);
  });

  it("Should clear the message list properly", () => {
    expect(reducer(sharedStore, clearMessageList()).list.count()).toBe(0);
  });

  it("Should set the message status to Received", () => {
    const messageId = sampleMessageList[0].id;
    expect(
      reducer(sharedStore, receivedMessageAck("john.doe", messageId)).list.get(
        messageId
      )?.status
    ).toBe(MessageStatus.Received);
  });

  it("Should set the message status to Seen", () => {
    const messageId = sampleMessageList[0].id;
    expect(
      reducer(sharedStore, seenMessageAck("john.doe", messageId)).list.get(
        messageId
      )?.status
    ).toBe(MessageStatus.Seen);
  });

  it("Should reset to initial state correctly", () => {
    expect(reducer(sharedStore, signOut())).toEqual(initialState);
  });
});
