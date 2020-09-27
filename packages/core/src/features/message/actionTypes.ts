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
      
      sendMessage: '',
    },
    saga: {
      submitMessage: '',
      startTypingMessage: '',
      stopTypingMessage: '',
      newMessage: '',
    },
  },
} as const);

export default actionTypes;
