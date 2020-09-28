import {
  MessagePhase,
  MessageStatus,
  newMessage,
  receivedMessageAck,
  sampleConversationList,
  sampleMessage3,
  seenMessageAck,
  sendMessage,
  sentMessageAck,
  setConversationList,
  startTypingMessage,
  stopTypingMessage,
} from "@purple-messenger/core";
import reducer from "./conversation";

describe("The conversation reducer tests", () => {
  it("Should set the conversation list correctly", () => {
    const state = reducer(
      undefined,
      setConversationList(sampleConversationList)
    );
    expect(state.list.toArray().map((item) => item[1])).toEqual(
      sampleConversationList
    );
  });

  it("Should set isTyping to true for the target conversation", () => {
    const conversation = sampleConversationList[0];
    const state1 = reducer(
      undefined,
      setConversationList([{ ...conversation, isTyping: false }])
    );
    const state2 = reducer(
      state1,
      startTypingMessage(conversation.friend.username, MessagePhase.Receive)
    );
    expect(
      state2.list.get(conversation.friend.username)?.isTyping
    ).toBeTruthy();
  });

  it("Should set isTyping to false for the target conversation", () => {
    const conversation = sampleConversationList[0];
    const state1 = reducer(
      undefined,
      setConversationList([{ ...conversation, isTyping: true }])
    );
    const state2 = reducer(
      state1,
      stopTypingMessage(conversation.friend.username, MessagePhase.Receive)
    );
    expect(state2.list.get(conversation.friend.username)?.isTyping).toBeFalsy();
  });

  // it('Should append a new conversation if there is a newMessage action', () => {})

  it("Should update the conversation when a message received", () => {
    const conversation = sampleConversationList[1];
    const username = conversation.friend.username;
    const state1 = reducer(
      undefined,
      setConversationList(sampleConversationList)
    );
    const state2 = reducer(state1, sendMessage(username, sampleMessage3));
    expect(state2.list.get(username)?.message).toMatchObject(sampleMessage3);
  });

  it("Should mark the message as sent properly", () => {
    const conversation = sampleConversationList[1];
    const receiverUsername = conversation.friend.username;
    const message = {
      ...sampleMessage3,
      id: -1,
      status: MessageStatus.Pending,
    };
    const newMessageId = 10;
    const state1 = reducer(
      undefined,
      setConversationList(sampleConversationList)
    );
    const state2 = reducer(state1, sendMessage(receiverUsername, message));
    const state3 = reducer(
      state2,
      sentMessageAck(receiverUsername, message.id, newMessageId)
    );

    expect(state3.list.get(receiverUsername)?.message).toMatchObject({
      status: MessageStatus.Sent,
      id: newMessageId,
    });
  });

  it("Should mark the message as received properly", () => {
    const conversation = sampleConversationList[1];
    const receiverUsername = conversation.friend.username;
    const message = {
      ...sampleMessage3,
      id: 10,
      status: MessageStatus.Sent,
    };
    const state1 = reducer(
      undefined,
      setConversationList(sampleConversationList)
    );
    const state2 = reducer(state1, sendMessage(receiverUsername, message));
    const state3 = reducer(
      state2,
      receivedMessageAck(receiverUsername, message.id)
    );

    expect(state3.list.get(receiverUsername)?.message?.status).toBe(
      MessageStatus.Received
    );
  });

  it("Should the message status as seen properly", () => {
    const conversation = sampleConversationList[1];
    const receiverUsername = conversation.friend.username;
    const message = {
      ...sampleMessage3,
      id: 10,
      status: MessageStatus.Sent,
    };
    const state1 = reducer(
      undefined,
      setConversationList(sampleConversationList)
    );
    const state2 = reducer(state1, sendMessage(receiverUsername, message));
    const state3 = reducer(
      state2,
      seenMessageAck(receiverUsername, message.id)
    );

    expect(state3.list.get(receiverUsername)?.message?.status).toBe(
      MessageStatus.Seen
    );
  });
});
