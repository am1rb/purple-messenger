import actionTypes from "./actionTypes";

export const sendMessage = (receiverUsername: string, message: string) => ({
  type: actionTypes.message.saga.sendMessage,
  receiverUsername,
  message,
});
export type SendMessageAction = ReturnType<typeof sendMessage>;

export const startTypingMessage = (receiverUsername: string) => ({
  type: actionTypes.message.saga.startTypingMessage,
  receiverUsername,
});
export type StartTypingMessageAction = ReturnType<typeof startTypingMessage>;

export const stopTypingMessage = (receiverUsername: string) => ({
  type: actionTypes.message.saga.stopTypingMessage,
  receiverUsername,
});
export type StopTypingMessageAction = ReturnType<typeof stopTypingMessage>;
