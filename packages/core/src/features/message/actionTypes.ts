import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  message: {
    reducer: {},
    saga: {
      sendMessage: '',
      startTypingMessage: '',
      stopTypingMessage: '',
    },
  },
});

export default actionTypes;
