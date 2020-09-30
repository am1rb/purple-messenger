import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  message: {
    reducer: {
      decreaseLastMessageId: '',
      addMessage: '',
      clearMessageList: '',
      
      sentMessageAck: '',
      receivedMessageAck: '',
      seenMessageAck: '',
      
    },
    saga: {
      submitMessage: '',
      startTypingMessage: '',
      stopTypingMessage: '',
      sendMessage: '',
    },
  },
} as const);

export default actionTypes;
