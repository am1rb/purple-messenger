import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  message: {
    reducer: {
      decreaseLastMessageId: "" as "decreaseLastMessageId",
      addMessage: "" as "addMessage",
      clearMessageList: "" as "clearMessageList",
      sentMessageAck: "" as "sentMessageAck",
      receivedMessageAck: "" as "receivedMessageAck",
      seenMessageAck: "" as "seenMessageAck",
    },
    saga: {
      submitMessage: "" as "submitMessage",
      startTypingMessage: "" as "startTypingMessage",
      stopTypingMessage: "" as "stopTypingMessage",
      sendMessage: "" as "sendMessage",
    },
  },
} as const);

export default actionTypes;
