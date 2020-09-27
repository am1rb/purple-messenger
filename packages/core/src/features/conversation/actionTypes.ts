import uniqueActionTypes from "../../core/helper/uniqueActionTypes";

const actionTypes = uniqueActionTypes({
  conversation: {
    reducer: {
      setConversationList: '' as 'conversation_R_conversation_setConversationList',
    },
    saga: {
      loadConversationList: '' as 'conversation_S_conversation_loadConversationList',
      unloadConversationList: '' as 'conversation_S_conversation_unloadConversationList',
    },
  },
} as const);

export default actionTypes;
