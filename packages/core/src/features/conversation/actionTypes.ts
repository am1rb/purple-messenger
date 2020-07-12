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
});

export default actionTypes;
