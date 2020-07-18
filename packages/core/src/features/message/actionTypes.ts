import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  message: {
    reducer: {
      decreaseLastMessageId: '',
      newMessage: '',
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
    },
  },
});

export default actionTypes;
