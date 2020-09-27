import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  conversation: {
    reducer: {
      setConversationList: '',
    },
    saga: {
      loadConversationList: '',
      unloadConversationList: '',
    },
  },
} as const);

export default actionTypes;
