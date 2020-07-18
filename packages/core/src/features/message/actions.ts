import actionTypes from "./actionTypes";
import { NewMessage, Message, TypingMessagePhase } from "./types";

export const submitMessage = (
  receiverUsername: string,
  message: NewMessage["body"]
) => ({
  type: actionTypes.message.saga.submitMessage,
  receiverUsername,
  message,
});
export type SubmitMessageAction = ReturnType<typeof submitMessage>;

export const sendMessage = (receiverUsername: string, message: NewMessage) => ({
  type: actionTypes.message.reducer.sendMessage,
  receiverUsername,
  message,
});
export type SendMessageAction = ReturnType<typeof sendMessage>;

export const newMessage = (
  senderUsername: string,
  receiverUsername: string,
  message: Message
) => ({
  type: actionTypes.message.reducer.newMessage,
  senderUsername,
  receiverUsername,
  message,
});
export type NewMessageAction = ReturnType<typeof newMessage>;

export const startTypingMessage = (
  username: string,
  phase = TypingMessagePhase.Send
) => ({
  type: actionTypes.message.reducer.startTypingMessage,
  username,
  phase,
});
export type StartTypingMessageAction = ReturnType<typeof startTypingMessage>;

export const stopTypingMessage = (
  username: string,
  phase = TypingMessagePhase.Send
) => ({
  type: actionTypes.message.reducer.stopTypingMessage,
  username,
  phase,
});
export type StopTypingMessageAction = ReturnType<typeof stopTypingMessage>;

export const sentMessageAck = (tempMessageId: number, messageId: number) => ({
  type: actionTypes.message.reducer.sentMessageAck,
  tempMessageId,
  messageId,
});
export type SentMessageAckAction = ReturnType<typeof sentMessageAck>;

export const receivedMessageAck = (
  senderUsername: string,
  messageId: number
) => ({
  type: actionTypes.message.reducer.receivedMessageAck,
  senderUsername,
  messageId,
});
export type ReceivedMessageAckAction = ReturnType<typeof receivedMessageAck>;

export const seenMessageAck = (senderUsername: string, messageId: number) => ({
  type: actionTypes.message.reducer.seenMessageAck,
  senderUsername,
  messageId,
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
