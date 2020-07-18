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
      startTypingMessage: '',
      stopTypingMessage: '',
    },
    saga: {
      submitMessage: '',
    },
  },
});

export default actionTypes;
