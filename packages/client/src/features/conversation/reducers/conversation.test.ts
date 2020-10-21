import {
  MessagePhase,
  MessageStatus,
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

  it("Should not set isTyping to true for the target conversation", () => {
    const conversation = sampleConversationList[0];
    const state1 = reducer(
      undefined,
      setConversationList([{ ...conversation, isTyping: false }])
    );
    const state2 = reducer(
      state1,
      startTypingMessage(conversation.friend.username, MessagePhase.Send)
    );
    expect(state2.list.get(conversation.friend.username)?.isTyping).toBeFalsy();
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

  it("Should not set isTyping to false for the target conversation", () => {
    const conversation = sampleConversationList[0];
    const state1 = reducer(
      undefined,
      setConversationList([{ ...conversation, isTyping: true }])
    );
    const state2 = reducer(
      state1,
      stopTypingMessage(conversation.friend.username, MessagePhase.Send)
    );
    expect(
      state2.list.get(conversation.friend.username)?.isTyping
    ).toBeTruthy();
  });

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

  it("Should not update the message info if the temp id is invalid", () => {
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
      sentMessageAck(receiverUsername, -999, newMessageId)
    );

    expect(state3.list.get(receiverUsername)?.message).toMatchObject({
      status: MessageStatus.Pending,
      id: message.id,
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

  it("Should not mark the message as received if the id is invalid", () => {
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
    const state3 = reducer(state2, receivedMessageAck(receiverUsername, 999));

    expect(state3.list.get(receiverUsername)?.message?.status).not.toBe(
      MessageStatus.Received
    );
  });

  it("Should set the message status as seen properly", () => {
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

  it("Should not set the message status as seen if the id is invalid", () => {
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
    const state3 = reducer(state2, seenMessageAck(receiverUsername, 999));

    expect(state3.list.get(receiverUsername)?.message?.status).not.toBe(
      MessageStatus.Seen
    );
  });
});
