import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  conversation: {
    reducer: {
      setConversationList: '' as 'setConversationList',
    },
    saga: {
      loadConversationList: '' as 'loadConversationList',
      unloadConversationList: '' as 'unloadConversationList',
    },
  },
} as const);

export default actionTypes;
