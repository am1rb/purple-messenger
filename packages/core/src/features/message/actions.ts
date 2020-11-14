import { Phase } from "@purple-messenger/core/core/type";
import actionTypes from "./actionTypes";
import { NewMessage, Message } from "./types";

export const submitMessage = (
  receiverUsername: string,
  message: NewMessage["body"]
) => ({
  type: actionTypes.message.saga.submitMessage,
  receiverUsername,
  message,
});
export type SubmitMessageAction = ReturnType<typeof submitMessage>;

export const sendMessage = (
  username: string,
  message: NewMessage,
  phase = Phase.Send
) => ({
  type: actionTypes.message.saga.sendMessage,
  username,
  message,
  phase,
});
export type SendMessageAction = ReturnType<typeof sendMessage>;

export const addMessage = (message: Message) => ({
  type: actionTypes.message.reducer.addMessage,
  message,
});
export type AddMessageAction = ReturnType<typeof addMessage>;

export const startTypingMessage = (username: string, phase = Phase.Send) => ({
  type: actionTypes.message.saga.startTypingMessage,
  username,
  phase,
});
export type StartTypingMessageAction = ReturnType<typeof startTypingMessage>;

export const stopTypingMessage = (username: string, phase = Phase.Send) => ({
  type: actionTypes.message.saga.stopTypingMessage,
  username,
  phase,
});
export type StopTypingMessageAction = ReturnType<typeof stopTypingMessage>;

export const sentMessageAck = (
  receiverUsername: string,
  tempMessageId: number,
  messageId: number
) => ({
  type: actionTypes.message.reducer.sentMessageAck,
  receiverUsername,
  tempMessageId,
  messageId,
});
export type SentMessageAckAction = ReturnType<typeof sentMessageAck>;

export const receivedMessageAck = (
  username: string,
  messageId: number,
  phase = Phase.Send
) => ({
  type: actionTypes.message.reducer.receivedMessageAck,
  username,
  messageId,
  phase,
});
export type ReceivedMessageAckAction = ReturnType<typeof receivedMessageAck>;

export const seenMessageAck = (
  username: string,
  messageId: number,
  phase = Phase.Send
) => ({
  type: actionTypes.message.reducer.seenMessageAck,
  username,
  messageId,
  phase,
});
export type SeenMessageAckAction = ReturnType<typeof seenMessageAck>;

export const decreaseLastMessageId = () => ({
  type: actionTypes.message.reducer.decreaseLastMessageId,
});
export type DecreaseLastMessageIdAction = ReturnType<
  typeof decreaseLastMessageId
>;

export const clearMessageList = () => ({
  type: actionTypes.message.reducer.clearMessageList,
});
export type ClearMessageListAction = ReturnType<typeof clearMessageList>;
